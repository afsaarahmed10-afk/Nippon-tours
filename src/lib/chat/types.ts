export type ChatRole = "user" | "assistant";

export interface ChatHistoryTurn {
  role: ChatRole;
  text: string;
}

export interface ChatTourSummary {
  slug: string;
  title: string;
  category: string;
  summary: string;
  price: number;
  days: number;
  image: string;
}

export type ChatCtaType = "plan-trip" | "tours" | "contact" | "none";

export interface ChatCta {
  type: ChatCtaType;
  label: string;
}

export interface ChatReplyEnvelope {
  reply: string;
  quickReplies: string[];
  tours: ChatTourSummary[];
  cta: ChatCta | null;
  leadIntent: boolean;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
  envelope?: ChatReplyEnvelope;
  isError?: boolean;
}
