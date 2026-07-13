import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Send, MessageCircle, Loader2 } from "lucide-react";
import { SITE } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


const schema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().max(1000).optional(),
});

export function InquiryForm({
  context,
  compact = false,
  dark = false,
}: {
  context?: string;
  compact?: boolean;
  dark?: boolean;
}) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const inputCls = dark
    ? "w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
    : "w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";

  if (sent) {
    return (
      <div className={`rounded-3xl p-8 text-center ${dark ? "bg-white/10 text-white" : "bg-card shadow-sm"}`}>
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold">Inquiry received — thank you!</h3>
        <p className={`mt-2 text-sm ${dark ? "text-white/70" : "text-muted-foreground"}`}>
          We'll reply within one business hour. Want an instant answer?
        </p>
        <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-accent mt-5">
          <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const result = schema.safeParse(values);
        if (!result.success) {
          const errs: Record<string, string> = {};
          for (const issue of result.error.issues) errs[String(issue.path[0])] = issue.message;
          setErrors(errs);
          return;
        }
        setErrors({});
        setSubmitting(true);
        const { data: sessionData } = await supabase.auth.getSession();
        const { error } = await supabase.from("trip_requests").insert({
          full_name: result.data.name,
          email: result.data.email,
          message: result.data.message || null,
          source: context || "inquiry-form",
          user_id: sessionData.session?.user.id ?? null,
        });
        setSubmitting(false);
        if (error) {
          toast.error("Could not send inquiry. Please try again or WhatsApp us.");
          return;
        }
        setSent(true);
      }}
      className={compact ? "space-y-3" : "space-y-4"}
    >
      {context && <input type="hidden" name="context" value={context} />}
      <div>
        <label htmlFor={`inq-name-${context ?? "gen"}`} className="sr-only">Your name</label>
        <input
          id={`inq-name-${context ?? "gen"}`}
          className={inputCls}
          placeholder="Your name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        />
        {errors.name && <p className="mt-1 text-xs font-semibold text-destructive">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={`inq-email-${context ?? "gen"}`} className="sr-only">Email address</label>
        <input
          id={`inq-email-${context ?? "gen"}`}
          type="email"
          className={inputCls}
          placeholder="Email address"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        />
        {errors.email && <p className="mt-1 text-xs font-semibold text-destructive">{errors.email}</p>}
      </div>
      {!compact && (
        <div>
          <label htmlFor={`inq-msg-${context ?? "gen"}`} className="sr-only">Your message</label>
          <textarea
            id={`inq-msg-${context ?? "gen"}`}
            rows={4}
            className={inputCls}
            placeholder="Tell us about your dream trip — dates, interests, travellers…"
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          />
        </div>
      )}
      <button type="submit" disabled={submitting} className="btn-accent w-full disabled:opacity-60">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? "Sending…" : "Get my free consultation"}
      </button>
      <p className={`text-center text-xs ${dark ? "text-white/60" : "text-muted-foreground"}`}>
        No spam, no obligation. Average reply time: under 1 hour.
      </p>
    </form>
  );
}
