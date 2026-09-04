import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { toast } from "sonner";
import { useLocale, type Locale } from "@/i18n";

const COPY: Record<Locale, {
  title: string;
  description: string;
  fullName: string;
  email: string;
  emailHint: string;
  saving: string;
  save: string;
  success: string;
  errGeneric: string;
}> = {
  en: {
    title: "My Profile",
    description: "Update your personal details.",
    fullName: "Full name",
    email: "Email",
    emailHint: "Contact support to change your email.",
    saving: "Saving…",
    save: "Save changes",
    success: "Profile updated",
    errGeneric: "Could not save",
  },
  ja: {
    title: "プロフィール",
    description: "ご登録情報を更新します。",
    fullName: "氏名",
    email: "メールアドレス",
    emailHint: "メールアドレスの変更はサポートまでご連絡ください。",
    saving: "保存中…",
    save: "変更を保存",
    success: "プロフィールを更新しました",
    errGeneric: "保存できませんでした",
  },
};

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  component: ProfilePage,
});

export function ProfilePage() {
  const { user } = useAuth();
  const locale = useLocale();
  const c = COPY[locale];
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setEmail(user.email ?? "");
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setFullName(data?.full_name ?? (user.user_metadata?.full_name as string) ?? ""));
  }, [user]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, email: user.email, full_name: fullName }, { onConflict: "id" });
      if (error) throw error;
      await supabase.auth.updateUser({ data: { full_name: fullName } });
      toast.success(c.success);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : c.errGeneric);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardPage title={c.title} description={c.description}>
      <form onSubmit={save} className="max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.fullName}</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.email}</label>
          <input value={email} disabled className="w-full rounded-xl border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground" />
          <p className="mt-1 text-[11px] text-muted-foreground">{c.emailHint}</p>
        </div>
        <button type="submit" disabled={saving} className="btn-accent">
          {saving ? c.saving : c.save}
        </button>
      </form>
    </DashboardPage>
  );
}
