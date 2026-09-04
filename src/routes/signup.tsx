import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  fullNameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  passwordHint: string;
  create: string;
  creating: string;
  alreadyHaveAccount: string;
  signIn: string;
  accountCreated: string;
  errorName: string;
  errorEmail: string;
  errorPassword: string;
  errorSignupFailed: string;
}> = {
  en: {
    title: "Create your account",
    subtitle: "Save tours, track trip requests and message us",
    description: "Create your Nippon Tours account to save tours and manage trip requests.",
    checkInboxTitle: "Check your inbox",
    checkInboxSubtitle: "Verify your email to activate your account",
    sentBody: (email) => `We sent a verification link to ${email}. Click it to finish creating your account, then sign in.`,
    backToSignIn: "Back to sign in",
    fullNameLabel: "Full name",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordHint: "Minimum 8 characters.",
    create: "Create account",
    creating: "Creating…",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign in",
    accountCreated: "Account created.",
    errorName: "Enter your name",
    errorEmail: "Enter a valid email",
    errorPassword: "At least 8 characters",
    errorSignupFailed: "Signup failed",
  },
  ja: {
    title: "アカウントを作成",
    subtitle: "ツアーの保存、旅行リクエストの確認、メッセージのやり取りができます",
    description: "ツアーの保存や旅行リクエストの管理ができる、Nippon Toursのアカウントを作成しましょう。",
    checkInboxTitle: "メールをご確認ください",
    checkInboxSubtitle: "アカウントを有効にするには、メールアドレスの確認が必要です",
    sentBody: (email) => `確認用のリンクを ${email} 宛に送信しました。リンクをクリックしてアカウント作成を完了し、ログインしてください。`,
    backToSignIn: "ログイン画面へ戻る",
    fullNameLabel: "お名前",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    passwordHint: "8文字以上で入力してください。",
    create: "アカウントを作成",
    creating: "作成中…",
    alreadyHaveAccount: "すでにアカウントをお持ちですか？",
    signIn: "ログイン",
    accountCreated: "アカウントを作成しました。",
    errorName: "お名前を入力してください",
    errorEmail: "有効なメールアドレスを入力してください",
    errorPassword: "8文字以上で入力してください",
    errorSignupFailed: "アカウント作成に失敗しました",
  },
};

export const signupHead = (locale: Locale = "en") => {
  const c = COPY[locale];
  const result = seo({ title: `${c.title} — Nippon Tours`, description: c.description, path: "/signup", locale });
  return { ...result, meta: [...result.meta, { name: "robots", content: "noindex" }] };
};

export const Route = createFileRoute("/signup")({
  head: () => signupHead("en"),
  component: () => <SignupPage locale="en" />,
});

export function SignupPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const schema = z.object({
    fullName: z.string().trim().min(2, c.errorName).max(200),
    email: z.string().trim().email(c.errorEmail).max(255),
    password: z.string().min(8, c.errorPassword).max(72),
  });

  const dashboardPath = locale === "ja" ? "/ja/dashboard" : "/dashboard";

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: dashboardPath });
    });
  }, [navigate, dashboardPath]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${dashboardPath}`,
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      if (data.session) {
        toast.success(c.accountCreated);
        navigate({ to: dashboardPath });
      } else {
        setSent(true);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : c.errorSignupFailed);
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
          {c.alreadyHaveAccount}{" "}
          <LocaleLink to="/login" className="font-bold text-accent underline-offset-2 hover:underline">
            {c.signIn}
          </LocaleLink>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="su-name" className={labelCls}>{c.fullNameLabel}</label>
          <input id="su-name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="su-email" className={labelCls}>{c.emailLabel}</label>
          <input id="su-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="su-pass" className={labelCls}>{c.passwordLabel}</label>
          <input id="su-pass" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
          <p className="mt-1 text-[11px] text-muted-foreground">{c.passwordHint}</p>
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? c.creating : c.create}
        </button>
      </form>
    </AuthCard>
  );
}
