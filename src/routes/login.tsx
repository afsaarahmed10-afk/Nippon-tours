import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  emailLabel: string;
  passwordLabel: string;
  forgotPassword: string;
  signIn: string;
  signingIn: string;
  newHere: string;
  createAccount: string;
  administrator: string;
  useAdminPortal: string;
  welcomeBack: string;
  errorInvalidEmail: string;
  errorPasswordRequired: string;
  errorSignInFailed: string;
}> = {
  en: {
    title: "Sign in",
    subtitle: "Access your trips, favourites and messages",
    description: "Sign in to your Nippon Tours customer account.",
    emailLabel: "Email",
    passwordLabel: "Password",
    forgotPassword: "Forgot password?",
    signIn: "Sign in",
    signingIn: "Signing in…",
    newHere: "New here?",
    createAccount: "Create an account",
    administrator: "Administrator?",
    useAdminPortal: "Use the admin portal",
    welcomeBack: "Welcome back.",
    errorInvalidEmail: "Enter a valid email",
    errorPasswordRequired: "Password required",
    errorSignInFailed: "Sign-in failed",
  },
  ja: {
    title: "ログイン",
    subtitle: "旅の予約、お気に入り、メッセージにアクセス",
    description: "Nippon Toursのお客様アカウントにログインしてください。",
    emailLabel: "メールアドレス",
    passwordLabel: "パスワード",
    forgotPassword: "パスワードをお忘れですか？",
    signIn: "ログイン",
    signingIn: "ログイン中…",
    newHere: "初めてご利用の方は？",
    createAccount: "アカウントを作成",
    administrator: "管理者の方",
    useAdminPortal: "管理画面はこちら",
    welcomeBack: "おかえりなさい。",
    errorInvalidEmail: "有効なメールアドレスを入力してください",
    errorPasswordRequired: "パスワードを入力してください",
    errorSignInFailed: "ログインに失敗しました",
  },
};

export const loginHead = (locale: Locale = "en") => {
  const c = COPY[locale];
  const result = seo({ title: `${c.title} — Nippon Tours`, description: c.description, path: "/login", locale });
  return { ...result, meta: [...result.meta, { name: "robots", content: "noindex" }] };
};

export const Route = createFileRoute("/login")({
  head: () => loginHead("en"),
  component: () => <LoginPage locale="en" />,
});

export function LoginPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    email: z.string().trim().email(c.errorInvalidEmail).max(255),
    password: z.string().min(1, c.errorPasswordRequired).max(72),
  });

  const dashboardPath = locale === "ja" ? "/ja/dashboard" : "/dashboard";

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      navigate({ to: role ? "/admin" : dashboardPath });
    });
  }, [navigate, dashboardPath]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();
      toast.success(c.welcomeBack);
      navigate({ to: role ? "/admin" : dashboardPath });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : c.errorSignInFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title={c.title}
      subtitle={c.subtitle}
      footer={
        <>
          {c.newHere}{" "}
          <LocaleLink to="/signup" className="font-bold text-accent underline-offset-2 hover:underline">
            {c.createAccount}
          </LocaleLink>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="li-email" className={labelCls}>{c.emailLabel}</label>
          <input id="li-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="li-pass" className={labelCls}>{c.passwordLabel}</label>
          <input id="li-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        <div className="text-right text-xs">
          <LocaleLink to="/forgot-password" className="font-semibold text-muted-foreground hover:text-accent">
            {c.forgotPassword}
          </LocaleLink>
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? c.signingIn : c.signIn}
        </button>
        <p className="text-center text-[11px] text-muted-foreground">
          {c.administrator}{" "}
          <Link to="/admin/login" className="font-semibold underline-offset-2 hover:underline">
            {c.useAdminPortal}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
