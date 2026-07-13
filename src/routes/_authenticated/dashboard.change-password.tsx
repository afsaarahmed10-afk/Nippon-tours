import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard/change-password")({
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Minimum 8 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) return toast.error(error.message);
    setPassword("");
    setConfirm("");
    toast.success("Password updated");
  };

  return (
    <DashboardPage title="Change password" description="Choose a strong new password.">
      <form onSubmit={save} className="max-w-md space-y-4 rounded-2xl border border-border bg-card p-6">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">New password</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Confirm new password</label>
          <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm" />
        </div>
        <button type="submit" disabled={saving} className="btn-accent">
          {saving ? "Saving…" : "Update password"}
        </button>
      </form>
    </DashboardPage>
  );
}
