import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { toast } from "sonner";
import type { Locale } from "@/i18n";

const COPY: Record<Locale, {
  title: string;
  description: string;
  newPassword: string;
  confirmPassword: string;
  saving: string;
  update: string;
  errMinLength: string;
  errMismatch: string;
  success: string;
}> = {
  en: {
    title: "Change password",
    description: "Choose a strong new password.",
    newPassword: "New password",
    confirmPassword: "Confirm new password",
    saving: "Saving…",
    update: "Update password",
    errMinLength: "Minimum 8 characters",
    errMismatch: "Passwords don't match",
    success: "Password updated",
  },
  ja: {
    title: "パスワード変更",
    description: "強力な新しいパスワードを設定してください。",
    newPassword: "新しいパスワード",
    confirmPassword: "新しいパスワード（確認）",
    saving: "保存中…",
    update: "パスワードを更新",
    errMinLength: "8文字以上で入力してください",
    errMismatch: "パスワードが一致しません",
    success: "パスワードを更新しました",
  },
};

export const Route = createFileRoute("/_authenticated/dashboard/change-password")({
  component: () => <ChangePasswordPage locale="en" />,
});

export function ChangePasswordPage({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error(c.errMinLength);
    if (password !== confirm) return toast.error(c.errMismatch);
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) return toast.error(error.message);
    setPassword("");
    setConfirm("");
    toast.success(c.success);
  };

  return (
    <DashboardPage title={c.title} description={c.description}>
      <form onSubmit={save} className="max-w-md space-y-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.newPassword}</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.confirmPassword}</label>
          <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
        <button type="submit" disabled={saving} className="btn-accent">
          {saving ? c.saving : c.update}
        </button>
      </form>
    </DashboardPage>
  );
}
