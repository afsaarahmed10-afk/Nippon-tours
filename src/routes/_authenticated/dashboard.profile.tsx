import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
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
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardPage title="My Profile" description="Update your personal details.">
      <form onSubmit={save} className="max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</label>
          <input value={email} disabled className="w-full rounded-xl border border-input bg-muted px-4 py-2.5 text-sm text-muted-foreground" />
          <p className="mt-1 text-[11px] text-muted-foreground">Contact support to change your email.</p>
        </div>
        <button type="submit" disabled={saving} className="btn-accent">
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </DashboardPage>
  );
}
