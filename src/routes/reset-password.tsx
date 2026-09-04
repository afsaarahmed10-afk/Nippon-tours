import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthCard, inputCls, labelCls } from "@/components/auth/AuthCard";
import { LocaleLink } from "@/components/site/LocaleLink";
import { seo } from "@/lib/seo";
import type { Locale } from "@/i18n";

const COPY: Record<Locale, {
  title: string;
  subtitleReady: string;
  subtitleWaiting: string;
  description: string;
  backToSignIn: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  update: string;
  updating: string;
  updated: string;
  errorMinLength: string;
  errorMismatch: string;
  errorUpdateFailed: string;
}> = {
  en: {
    title: "Set a new password",
    subtitleReady: "Choose a strong new password",
    subtitleWaiting: "Waiting for the reset link…",
    description: "Set a new password for your Nippon Tours account.",
    backToSignIn: "Back to sign in",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm new password",
    update: "Update password",
    updating: "Updating…",
    updated: "Password updated",
    errorMinLength: "Minimum 8 characters",
    errorMismatch: "Passwords don't match",
    errorUpdateFailed: "Could not update password",
  },
  ja: {
    title: "新しいパスワードを設定",
    subtitleReady: "強力な新しいパスワードを設定してください",
    subtitleWaiting: "リセットリンクの確認をお待ちください…",
    description: "Nippon Toursアカウントの新しいパスワードを設定します。",
    backToSignIn: "ログイン画面へ戻る",
    newPasswordLabel: "新しいパスワード",
    confirmPasswordLabel: "新しいパスワード（確認）",
    update: "パスワードを更新",
    updating: "更新中…",
    updated: "パスワードを更新しました",
    errorMinLength: "8文字以上で入力してください",
    errorMismatch: "パスワードが一致しません",
    errorUpdateFailed: "パスワードを更新できませんでした",
  },
};

export const resetPasswordHead = (locale: Locale = "en") => {
  const c = COPY[locale];
  const result = seo({ title: `${c.title} — Nippon Tours`, description: c.description, path: "/reset-password", locale });
  return { ...result, meta: [...result.meta, { name: "robots", content: "noindex" }] };
};

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => resetPasswordHead("en"),
  component: () => <ResetPage locale="en" />,
});

export function ResetPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const dashboardPath = locale === "ja" ? "/ja/dashboard" : "/dashboard";

  useEffect(() => {
    // Supabase parses the URL hash and fires PASSWORD_RECOVERY when the recovery link is opened
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error(c.errorMinLength);
    if (password !== confirm) return toast.error(c.errorMismatch);
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success(c.updated);
      navigate({ to: dashboardPath });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : c.errorUpdateFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title={c.title}
      subtitle={ready ? c.subtitleReady : c.subtitleWaiting}
      footer={
        <LocaleLink to="/login" className="font-bold text-accent underline-offset-2 hover:underline">
          {c.backToSignIn}
        </LocaleLink>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="rp-pass" className={labelCls}>{c.newPasswordLabel}</label>
          <input id="rp-pass" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} disabled={!ready} />
        </div>
        <div>
          <label htmlFor="rp-conf" className={labelCls}>{c.confirmPasswordLabel}</label>
          <input id="rp-conf" type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} disabled={!ready} />
        </div>
        <button type="submit" disabled={loading || !ready} className="btn-accent w-full">
          {loading ? c.updating : c.update}
        </button>
      </form>
    </AuthCard>
  );
}
