import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthCard, inputCls, labelCls } from "@/components/auth/AuthCard";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set a new password — Nippon Tours" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (password.length < 8) return toast.error("Minimum 8 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Set a new password"
      subtitle={ready ? "Choose a strong new password" : "Waiting for the reset link…"}
      footer={
        <Link to="/login" className="font-bold text-accent underline-offset-2 hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="rp-pass" className={labelCls}>New password</label>
          <input id="rp-pass" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} disabled={!ready} />
        </div>
        <div>
          <label htmlFor="rp-conf" className={labelCls}>Confirm new password</label>
          <input id="rp-conf" type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} disabled={!ready} />
        </div>
        <button type="submit" disabled={loading || !ready} className="btn-accent w-full">
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
    </AuthCard>
  );
}
