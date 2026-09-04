// Server-only: reads the Groq API key and (optionally) calls Supabase with the
// anon key. Never import this module from client code — see client.server.ts for the
// project's convention on *.server.ts files.
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import Groq from "groq-sdk";
import { z } from "zod";
import { TOURS } from "@/data/tours";
import { supabase } from "@/integrations/supabase/client";
import { buildSystemPrompt, REAL_TOUR_SLUGS } from "./system-prompt";
import { checkRateLimit } from "./rate-limit";
import { getCommon } from "@/i18n";
import type { ChatReplyEnvelope, ChatTourSummary } from "./types";

const MODEL = process.env.AI_MODEL || "openai/gpt-oss-120b";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 10;

let _client: Groq | undefined;
function getClient(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY environment variable. Add it to your .env file.");
  }
  if (!_client) {
    _client = new Groq({ apiKey, timeout: 15_000, maxRetries: 1 });
  }
  return _client;
}

const historyTurnSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().max(4000),
});

const chatRequestSchema = z.object({
  sessionId: z.string().trim().min(8).max(100),
  message: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
  history: z.array(historyTurnSchema).max(30).default([]),
  locale: z.enum(["en", "ja"]).default("en"),
});

const leadCaptureSchema = z.object({
  sessionId: z.string().trim().min(8).max(100),
  name: z.string().trim().min(1, "Please share your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(60).optional(),
  notes: z.string().trim().max(2000).optional(),
  locale: z.enum(["en", "ja"]).default("en"),
});

const RESPOND_TOOL_NAME = "respond_to_traveler";

const RESPOND_TOOL: Groq.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: RESPOND_TOOL_NAME,
    description: "Send a structured reply to the traveler in the Nippon Tours website chat widget.",
    parameters: {
      type: "object",
      properties: {
        reply: {
          type: "string",
          minLength: 1,
          description:
            "The conversational reply. Never empty — always include at least one sentence directly answering the traveler, even if a tour/CTA is also attached. 2-6 sentences or a short list. Warm, concise, expert travel-consultant tone.",
        },
        quickReplies: {
          type: "array",
          items: { type: "string" },
          maxItems: 4,
          description:
            "Up to 4 short, contextual follow-up suggestions the traveler might tap next.",
        },
        recommendedTourSlugs: {
          type: "array",
          items: { type: "string" },
          maxItems: 3,
          description:
            "Slugs from AVAILABLE TOURS most relevant right now. Empty array if none fit well.",
        },
        ctaType: {
          type: "string",
          enum: ["plan-trip", "tours", "contact", "none"],
          description: "Primary call-to-action to show below the reply, or 'none'.",
        },
        ctaLabel: {
          type: "string",
          description:
            "Button label for the CTA, e.g. 'Plan My Japan Trip →'. Empty string if ctaType is 'none'.",
        },
        leadIntent: {
          type: "boolean",
          description:
            "true if the traveler is showing clear trip-planning/booking intent right now.",
        },
      },
      required: [
        "reply",
        "quickReplies",
        "recommendedTourSlugs",
        "ctaType",
        "ctaLabel",
        "leadIntent",
      ],
      additionalProperties: false,
    },
  },
};

const toolOutputSchema = z.object({
  reply: z.string().trim().min(1),
  quickReplies: z.array(z.string()).max(4),
  recommendedTourSlugs: z.array(z.string()).max(3),
  ctaType: z.enum(["plan-trip", "tours", "contact", "none"]),
  ctaLabel: z.string(),
  leadIntent: z.boolean(),
});

const TOPIC_KEYWORDS = [
  "tokyo",
  "kyoto",
  "osaka",
  "nara",
  "hiroshima",
  "hakone",
  "fuji",
  "hokkaido",
  "okinawa",
  "takayama",
  "itinerary",
  "budget",
  "cost",
  "price",
  "jr pass",
  "shinkansen",
  "visa",
  "family",
  "honeymoon",
  "solo",
  "group",
  "mice",
  "car rental",
  "cherry blossom",
  "sakura",
  "autumn",
  "winter",
  "ski",
  "food",
  "vegetarian",
  "vegan",
  "halal",
  "anime",
  "shopping",
];

function extractTopics(message: string): string[] {
  const lower = message.toLowerCase();
  return TOPIC_KEYWORDS.filter((k) => lower.includes(k));
}

function fallbackEnvelope(reply: string, locale: "en" | "ja" = "en"): ChatReplyEnvelope {
  const t = getCommon(locale).chat;
  return {
    reply,
    quickReplies: t.defaultQuickReplies,
    tours: [],
    cta: { type: "contact", label: t.defaultCtaLabel },
    leadIntent: false,
  };
}

function resolveTours(slugs: string[]): ChatTourSummary[] {
  return slugs
    .filter((slug) => REAL_TOUR_SLUGS.has(slug))
    .slice(0, 3)
    .map((slug) => {
      const tour = TOURS.find((t) => t.slug === slug)!;
      return {
        slug: tour.slug,
        title: tour.title,
        category: tour.category,
        summary: tour.summary,
        price: tour.price,
        days: tour.days,
        image: tour.image,
      };
    });
}

const chatbotConversations = () => supabase.from("chatbot_conversations");

function clientIp(): string {
  try {
    const request = getRequest();
    const forwarded = request?.headers?.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return request?.headers?.get("cf-connecting-ip") || "unknown";
  } catch {
    return "unknown";
  }
}

// Best-effort — never throws, never blocks the chat response.
async function logConversation(
  sessionId: string,
  userMessage: string,
  envelope: ChatReplyEnvelope,
) {
  try {
    const topics = extractTopics(userMessage);
    const { data: existing } = await chatbotConversations()
      .select("id, message_count, topics")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (existing) {
      const mergedTopics = Array.from(new Set([...(existing.topics ?? []), ...topics])).slice(
        0,
        20,
      );
      await chatbotConversations()
        .update({
          message_count: (existing.message_count ?? 0) + 1,
          topics: mergedTopics,
          ...(envelope.cta?.type === "plan-trip" && { clicked_plan_trip: true }),
          ...(envelope.cta?.type === "tours" && { clicked_tours: true }),
          ...(envelope.cta?.type === "contact" && { clicked_contact: true }),
        })
        .eq("id", existing.id);
    } else {
      await chatbotConversations().insert({
        session_id: sessionId,
        message_count: 1,
        topics,
        clicked_plan_trip: envelope.cta?.type === "plan-trip",
        clicked_tours: envelope.cta?.type === "tours",
        clicked_contact: envelope.cta?.type === "contact",
      });
    }
  } catch (error) {
    console.error("[chatbot analytics] non-fatal logging error:", error);
  }
}

export const sendChatMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => chatRequestSchema.parse(data))
  .handler(async ({ data }): Promise<ChatReplyEnvelope & { rateLimited?: boolean }> => {
    const t = getCommon(data.locale).chat;
    const rate = checkRateLimit(clientIp());
    if (!rate.allowed) {
      return {
        ...fallbackEnvelope(t.rateLimited, data.locale),
        rateLimited: true,
      };
    }

    const recentHistory = data.history.slice(-MAX_HISTORY_TURNS);
    const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: buildSystemPrompt(data.locale) },
      ...recentHistory.map((turn): Groq.Chat.Completions.ChatCompletionMessageParam => ({
        role: turn.role,
        content: turn.text,
      })),
      { role: "user", content: data.message },
    ];

    try {
      const client = getClient();
      const response = await client.chat.completions.create({
        model: MODEL,
        max_completion_tokens: 1500,
        messages,
        tools: [RESPOND_TOOL],
        tool_choice: { type: "function", function: { name: RESPOND_TOOL_NAME } },
      });

      const message = response.choices[0]?.message;
      const toolCall = message?.tool_calls?.find(
        (call) => call.function.name === RESPOND_TOOL_NAME,
      );

      if (!toolCall) {
        // The model ignored the tool and replied in plain text — use that text rather
        // than discard it, so the traveler still gets a real answer.
        if (message?.content) {
          const envelope = fallbackEnvelope(message.content, data.locale);
          void logConversation(data.sessionId, data.message, envelope);
          return envelope;
        }
        return fallbackEnvelope(t.parseFailure, data.locale);
      }

      let rawArgs: unknown;
      try {
        rawArgs = JSON.parse(toolCall.function.arguments);
      } catch {
        return fallbackEnvelope(t.parseFailure, data.locale);
      }

      const parsed = toolOutputSchema.parse(rawArgs);
      const envelope: ChatReplyEnvelope = {
        reply: parsed.reply,
        quickReplies: parsed.quickReplies,
        tours: resolveTours(parsed.recommendedTourSlugs),
        cta:
          parsed.ctaType === "none"
            ? null
            : { type: parsed.ctaType, label: parsed.ctaLabel || t.learnMore },
        leadIntent: parsed.leadIntent,
      };

      void logConversation(data.sessionId, data.message, envelope);

      return envelope;
    } catch (error) {
      console.error("[chatbot] Groq request failed:", error);
      if (error instanceof Groq.AuthenticationError) {
        return fallbackEnvelope(t.authNotSetUp, data.locale);
      }
      if (error instanceof Groq.RateLimitError) {
        return fallbackEnvelope(t.groqRateLimited, data.locale);
      }
      return fallbackEnvelope(t.connectionError, data.locale);
    }
  });

export const submitChatLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadCaptureSchema.parse(data))
  .handler(
    async ({
      data,
    }): Promise<{ success: true; id: string } | { success: false; error: string }> => {
      const { data: sessionData } = await supabase.auth.getSession();

      const { data: trip, error } = await supabase
        .from("trip_requests")
        .insert({
          full_name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.notes || null,
          source: "chatbot",
          user_id: sessionData.session?.user.id ?? null,
        })
        .select("id")
        .single();

      if (error || !trip) {
        console.error("[chatbot] lead insert failed:", error);
        return {
          success: false,
          error: getCommon(data.locale).chat.leadInsertError,
        };
      }

      try {
        await chatbotConversations()
          .update({ lead_captured: true, trip_request_id: trip.id })
          .eq("session_id", data.sessionId);
      } catch (analyticsError) {
        console.error("[chatbot analytics] non-fatal lead-link error:", analyticsError);
      }

      return { success: true, id: trip.id as string };
    },
  );
