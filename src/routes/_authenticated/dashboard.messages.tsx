import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { myMessagesQueryOptions } from "@/lib/customer-queries";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Locale } from "@/i18n";

const COPY: Record<Locale, {
  title: string;
  description: string;
  newMessage: string;
  subjectPlaceholder: string;
  bodyPlaceholder: string;
  sending: string;
  send: string;
  sentMessages: string;
  noMessages: string;
  noSubject: string;
  errTooShort: string;
  success: string;
}> = {
  en: {
    title: "Messages",
    description: "Send us a note and we'll get back to you within one business day.",
    newMessage: "New message",
    subjectPlaceholder: "Subject (optional)",
    bodyPlaceholder: "How can we help?",
    sending: "Sending…",
    send: "Send message",
    sentMessages: "Sent messages",
    noMessages: "No messages yet.",
    noSubject: "(no subject)",
    errTooShort: "Message is too short",
    success: "Message sent — we'll reply by email shortly.",
  },
  ja: {
    title: "メッセージ",
    description: "ご質問やご要望をお送りください。1営業日以内にご返信いたします。",
    newMessage: "新規メッセージ",
    subjectPlaceholder: "件名（任意）",
    bodyPlaceholder: "どのようなご用件でしょうか？",
    sending: "送信中…",
    send: "メッセージを送信",
    sentMessages: "送信済みメッセージ",
    noMessages: "まだメッセージはありません。",
    noSubject: "（件名なし）",
    errTooShort: "メッセージが短すぎます",
    success: "メッセージを送信しました。まもなくメールでご返信いたします。",
  },
};

export const Route = createFileRoute("/_authenticated/dashboard/messages")({
  component: () => <MessagesPage locale="en" />,
});

export function MessagesPage({ locale = "en" }: { locale?: Locale }) {
  const { user } = useAuth();
  const c = COPY[locale];
  const qc = useQueryClient();
  const { data: msgs } = useSuspenseQuery(myMessagesQueryOptions(user?.id ?? null));
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (body.trim().length < 3) return toast.error(c.errTooShort);
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      user_id: user.id,
      name: (user.user_metadata?.full_name as string) ?? user.email ?? "Customer",
      email: user.email ?? "",
      subject: subject || null,
      body,
      source: "dashboard",
    });
    setSending(false);
    if (error) return toast.error(error.message);
    setSubject("");
    setBody("");
    qc.invalidateQueries({ queryKey: ["me", "messages"] });
    toast.success(c.success);
  };

  return (
    <DashboardPage title={c.title} description={c.description}>
      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <form onSubmit={send} className="space-y-3 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">{c.newMessage}</h2>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={c.subjectPlaceholder}
            maxLength={200}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={c.bodyPlaceholder}
            required
            rows={6}
            maxLength={5000}
            className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
          />
          <button type="submit" disabled={sending} className="btn-accent">
            {sending ? c.sending : c.send}
          </button>
        </form>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">{c.sentMessages}</h2>
          {msgs.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">{c.noMessages}</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {msgs.map((m) => (
                <li key={m.id} className="py-3">
                  <p className="text-sm font-semibold">{m.subject || c.noSubject}</p>
                  <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{m.body}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{new Date(m.created_at).toLocaleString()} • {m.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardPage>
  );
}
