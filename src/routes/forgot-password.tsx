import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { AuthCard, inputCls, labelCls } from "@/components/auth/AuthCard";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Nippon Tours" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      toast.error("Enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send email");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard title="Check your inbox" subtitle="We sent you a password reset link">
        <p className="text-center text-sm text-muted-foreground">
          If an account exists for <span className="font-semibold text-foreground">{email}</span>, you'll receive an
          email with a link to reset your password.
        </p>
        <Link to="/login" className="btn-accent mt-6 w-full">Back to sign in</Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-bold text-accent underline-offset-2 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="fp-email" className={labelCls}>Email</label>
          <input id="fp-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </AuthCard>
  );
}
