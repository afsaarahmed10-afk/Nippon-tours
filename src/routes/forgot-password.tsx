import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { AuthCard, inputCls, labelCls } from "@/components/auth/AuthCard";
import { LocaleLink } from "@/components/site/LocaleLink";
import { seo } from "@/lib/seo";
import type { Locale } from "@/i18n";

const COPY: Record<Locale, {
  title: string;
  subtitle: string;
  description: string;
  checkInboxTitle: string;
  checkInboxSubtitle: string;
  sentBody: (email: string) => string;
  backToSignIn: string;
  emailLabel: string;
  sendLink: string;
  sending: string;
  rememberedIt: string;
  signIn: string;
  errorEmail: string;
  errorSend: string;
}> = {
  en: {
    title: "Forgot password?",
    subtitle: "Enter your email and we'll send you a reset link",
    description: "Reset your Nippon Tours account password.",
    checkInboxTitle: "Check your inbox",
    checkInboxSubtitle: "We sent you a password reset link",
    sentBody: (email) => `If an account exists for ${email}, you'll receive an email with a link to reset your password.`,
    backToSignIn: "Back to sign in",
    emailLabel: "Email",
    sendLink: "Send reset link",
    sending: "Sending…",
    rememberedIt: "Remembered it?",
    signIn: "Sign in",
    errorEmail: "Enter a valid email",
    errorSend: "Could not send email",
  },
  ja: {
    title: "パスワードをお忘れですか？",
    subtitle: "メールアドレスを入力すると、リセット用のリンクをお送りします",
    description: "Nippon Toursアカウントのパスワードをリセットします。",
    checkInboxTitle: "メールをご確認ください",
    checkInboxSubtitle: "パスワードリセット用のリンクを送信しました",
    sentBody: (email) => `${email} 宛のアカウントが存在する場合、パスワードリセット用リンクを記載したメールをお送りします。`,
    backToSignIn: "ログイン画面へ戻る",
    emailLabel: "メールアドレス",
    sendLink: "リセットリンクを送信",
    sending: "送信中…",
    rememberedIt: "パスワードを思い出しましたか？",
    signIn: "ログイン",
    errorEmail: "有効なメールアドレスを入力してください",
    errorSend: "メールを送信できませんでした",
  },
};

export const forgotPasswordHead = (locale: Locale = "en") => {
  const c = COPY[locale];
  const result = seo({ title: `${c.title.replace("?", "")} — Nippon Tours`, description: c.description, path: "/forgot-password", locale });
  return { ...result, meta: [...result.meta, { name: "robots", content: "noindex" }] };
};

export const Route = createFileRoute("/forgot-password")({
  head: () => forgotPasswordHead("en"),
  component: () => <ForgotPage locale="en" />,
});

export function ForgotPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const resetPasswordPath = locale === "ja" ? "/ja/reset-password" : "/reset-password";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      toast.error(c.errorEmail);
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${resetPasswordPath}`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : c.errorSend);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard title={c.checkInboxTitle} subtitle={c.checkInboxSubtitle}>
        <p className="text-center text-sm text-muted-foreground">{c.sentBody(email)}</p>
        <LocaleLink to="/login" className="btn-accent mt-6 w-full">{c.backToSignIn}</LocaleLink>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title={c.title}
      subtitle={c.subtitle}
      footer={
        <>
          {c.rememberedIt}{" "}
          <LocaleLink to="/login" className="font-bold text-accent underline-offset-2 hover:underline">
            {c.signIn}
          </LocaleLink>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="fp-email" className={labelCls}>{c.emailLabel}</label>
          <input id="fp-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? c.sending : c.sendLink}
        </button>
      </form>
    </AuthCard>
  );
}
