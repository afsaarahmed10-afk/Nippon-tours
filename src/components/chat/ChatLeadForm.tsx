import { useState } from "react";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { useCommon } from "@/i18n";

export function ChatLeadForm({
  onSubmit,
  onDismiss,
  submitted,
}: {
  onSubmit: (lead: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  onDismiss: () => void;
  submitted: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const t = useCommon().chat;

  if (submitted) {
    return (
      <div className="mx-4 mb-3 rounded-2xl border border-border bg-secondary/60 p-4 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-accent" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-foreground">{t.leadFormThanks}</p>
      </div>
    );
  }

  return (
    <div className="relative mx-4 mb-3 rounded-2xl border border-accent/30 bg-secondary/60 p-4">
      <button
        type="button"
        onClick={onDismiss}
        aria-label={t.leadFormDismissAria}
        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <p className="pr-6 text-sm font-bold text-foreground">{t.leadFormTitle}</p>
      <p className="mt-1 text-xs text-muted-foreground">{t.leadFormSubtitle}</p>
      <form
        className="mt-3 space-y-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!name.trim() || !email.trim()) {
            setError(t.leadFormErrorRequired);
            return;
          }
          setError(null);
          setSubmitting(true);
          const result = await onSubmit({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
          });
          setSubmitting(false);
          if (!result.success) setError(result.error || t.leadFormErrorGeneric);
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.leadFormNamePlaceholder}
          autoComplete="name"
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.leadFormEmailPlaceholder}
          autoComplete="email"
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.leadFormPhonePlaceholder}
          autoComplete="tel"
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
        />
        {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="btn-accent w-full !py-2 text-xs disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {submitting ? t.leadFormSending : t.leadFormSubmit}
        </button>
      </form>
    </div>
  );
}
