import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Password updated");
      setPassword("");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <AdminPage title="Settings" description="Manage your admin account.">
      <div className="max-w-xl space-y-6">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Your account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Signed in as <span className="font-semibold text-foreground">{email}</span></p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Change password</h2>
          <form onSubmit={savePassword} className="mt-4 space-y-3">
            <input
              type="password"
              placeholder="New password (min 8 chars)"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button type="submit" disabled={saving} className="btn-accent">
              {saving ? "Saving…" : "Update password"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Sign out</h2>
          <p className="mt-1 text-sm text-muted-foreground">You'll be returned to the sign-in screen.</p>
          <button onClick={signOut} className="btn-outline mt-4">Sign out</button>
        </section>
      </div>
    </AdminPage>
  );
}
