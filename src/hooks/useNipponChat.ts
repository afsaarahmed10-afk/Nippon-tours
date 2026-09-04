import { useCallback, useEffect, useRef, useState } from "react";
import { sendChatMessage, submitChatLead } from "@/lib/chat/chat.server";
import { useCommon, useLocale, type Locale } from "@/i18n";
import type { ChatMessage, ChatReplyEnvelope, ChatHistoryTurn } from "@/lib/chat/types";

const SESSION_KEY = "nippon-ai-session-id";
const MESSAGES_KEY = "nippon-ai-messages-v2";

function makeId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function welcomeMessage(locale: Locale, welcomeText: string, quickSuggestions: readonly string[]): ChatMessage {
  return {
    id: makeId(),
    role: "assistant",
    text: welcomeText,
    createdAt: Date.now(),
    envelope: {
      reply: welcomeText,
      quickReplies: [...quickSuggestions],
      tours: [],
      cta: null,
      leadIntent: false,
    },
  };
}

function loadSessionId(): string {
  if (typeof window === "undefined") return makeId();
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh = makeId();
    window.sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return makeId();
  }
}

// Messages are cached per-locale (key suffixed with locale) so switching languages
// mid-session starts a fresh, correctly-localized welcome rather than mixing languages.
function loadMessages(locale: Locale, welcome: () => ChatMessage): ChatMessage[] {
  if (typeof window === "undefined") return [welcome()];
  try {
    const raw = window.sessionStorage.getItem(`${MESSAGES_KEY}-${locale}`);
    if (!raw) return [welcome()];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return parsed.length > 0 ? parsed : [welcome()];
  } catch {
    return [welcome()];
  }
}

export function useNipponChat() {
  const locale = useLocale();
  const t = useCommon().chat;
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadMessages(locale, () => welcomeMessage(locale, t.welcomeText, t.quickSuggestions)),
  );
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const sessionIdRef = useRef<string>(loadSessionId());
  const lastFailedTextRef = useRef<string | null>(null);

  // Re-seed the conversation when the locale changes (e.g. via the language switcher).
  useEffect(() => {
    setMessages(loadMessages(locale, () => welcomeMessage(locale, t.welcomeText, t.quickSuggestions)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(`${MESSAGES_KEY}-${locale}`, JSON.stringify(messages.slice(-40)));
    } catch {
      // sessionStorage unavailable (private mode, etc.) — conversation just won't persist across reloads.
    }
  }, [messages, locale]);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const minimize = useCallback(() => setIsMinimized(true), []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || trimmed.length > 1000) return;

      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        text: trimmed,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      lastFailedTextRef.current = null;

      try {
        const history: ChatHistoryTurn[] = messages
          .filter((m) => !m.isError)
          .slice(-10)
          .map((m) => ({ role: m.role, text: m.text }));

        const envelope: ChatReplyEnvelope = await sendChatMessage({
          data: { sessionId: sessionIdRef.current, message: trimmed, history, locale },
        });

        const assistantMessage: ChatMessage = {
          id: makeId(),
          role: "assistant",
          text: envelope.reply,
          createdAt: Date.now(),
          envelope,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        if (envelope.leadIntent) setShowLeadForm(true);
      } catch {
        lastFailedTextRef.current = trimmed;
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            text: t.connectionError,
            createdAt: Date.now(),
            isError: true,
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, locale, t.connectionError],
  );

  const retry = useCallback(() => {
    const text = lastFailedTextRef.current;
    if (text) void sendMessage(text);
  }, [sendMessage]);

  const submitLead = useCallback(
    async (lead: { name: string; email: string; phone?: string; notes?: string }) => {
      // Auto-summarize what was discussed so the travel designer has context, even
      // though the lead form itself only asks for contact details.
      const conversationSummary = messages
        .filter((m) => m.role === "user")
        .slice(-5)
        .map((m) => m.text)
        .join(" / ")
        .slice(0, 500);
      const notes = [lead.notes, conversationSummary && `Chat conversation: ${conversationSummary}`]
        .filter(Boolean)
        .join("\n\n");

      const result = await submitChatLead({
        data: { sessionId: sessionIdRef.current, ...lead, notes: notes || undefined, locale },
      });
      if (result.success) {
        setLeadSubmitted(true);
        setShowLeadForm(false);
      }
      return result;
    },
    [messages, locale],
  );

  return {
    isOpen,
    isMinimized,
    messages,
    isTyping,
    showLeadForm,
    leadSubmitted,
    open,
    close,
    minimize,
    sendMessage,
    retry,
    submitLead,
    dismissLeadForm: () => setShowLeadForm(false),
  };
}
