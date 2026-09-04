import { useEffect, useRef, useState } from "react";
import { Minus, Send, X } from "lucide-react";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatLeadForm } from "./ChatLeadForm";
import { useCommon } from "@/i18n";
import type { ChatMessage } from "@/lib/chat/types";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs"
        aria-hidden="true"
      >
        🇯🇵
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-secondary px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatPanel({
  messages,
  isTyping,
  showLeadForm,
  leadSubmitted,
  onSend,
  onQuickReply,
  onRetry,
  onSubmitLead,
  onDismissLead,
  onMinimize,
  onClose,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  showLeadForm: boolean;
  leadSubmitted: boolean;
  onSend: (text: string) => void;
  onQuickReply: (text: string) => void;
  onRetry: () => void;
  onSubmitLead: (lead: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onDismissLead: () => void;
  onMinimize: () => void;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastIndex = messages.length - 1;
  const t = useCommon().chat;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping, showLeadForm]);

  const submit = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-t-3xl bg-card sm:rounded-3xl">
      <div className="flex items-center justify-between bg-ink px-5 py-4 text-ink-foreground sm:rounded-t-3xl">
        <div>
          <p className="font-display text-base font-semibold">{t.label} 🇯🇵</p>
          <p className="text-xs text-ink-foreground/70">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMinimize}
            aria-label={t.minimizeAria}
            className="grid h-8 w-8 place-items-center rounded-full text-ink-foreground/80 hover:bg-white/10 hover:text-ink-foreground"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeAria}
            className="grid h-8 w-8 place-items-center rounded-full text-ink-foreground/80 hover:bg-white/10 hover:text-ink-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => (
          <ChatMessageBubble
            key={message.id}
            message={message}
            showQuickReplies={index === lastIndex && !isTyping}
            onQuickReply={onQuickReply}
            onRetry={onRetry}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {showLeadForm && (
        <ChatLeadForm onSubmit={onSubmitLead} onDismiss={onDismissLead} submitted={leadSubmitted} />
      )}

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder={t.inputPlaceholder}
            maxLength={1000}
            className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
          <button
            type="button"
            onClick={submit}
            disabled={!input.trim() || isTyping}
            aria-label={t.sendAria}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
