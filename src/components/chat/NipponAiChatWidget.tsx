import { Bot, MessageSquareText } from "lucide-react";
import { useNipponChat } from "@/hooks/useNipponChat";
import { useCommon } from "@/i18n";
import { ChatPanel } from "./ChatPanel";

export function NipponAiChatWidget() {
  const chat = useNipponChat();
  const t = useCommon().chat;

  return (
    <>
      {!chat.isOpen && (
        <button
          type="button"
          onClick={chat.open}
          aria-label={t.openAria}
          className="fixed bottom-40 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 lg:bottom-24 lg:right-8"
          style={{ boxShadow: "var(--shadow-accent)" }}
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {chat.isOpen && chat.isMinimized && (
        <button
          type="button"
          onClick={chat.open}
          className="fixed bottom-40 right-4 z-50 flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-ink-foreground shadow-lg transition-transform hover:scale-105 lg:bottom-24 lg:right-8"
        >
          <MessageSquareText className="h-4 w-4" />
          <span className="text-sm font-semibold">{t.label}</span>
        </button>
      )}

      {chat.isOpen && !chat.isMinimized && (
        <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-24 sm:right-4 sm:h-[min(640px,80vh)] sm:w-[400px] lg:bottom-24 lg:right-8">
          <div className="h-full w-full sm:rounded-3xl sm:shadow-2xl sm:ring-1 sm:ring-border">
            <ChatPanel
              messages={chat.messages}
              isTyping={chat.isTyping}
              showLeadForm={chat.showLeadForm}
              leadSubmitted={chat.leadSubmitted}
              onSend={chat.sendMessage}
              onQuickReply={chat.sendMessage}
              onRetry={chat.retry}
              onSubmitLead={chat.submitLead}
              onDismissLead={chat.dismissLeadForm}
              onMinimize={chat.minimize}
              onClose={chat.close}
            />
          </div>
        </div>
      )}
    </>
  );
}
