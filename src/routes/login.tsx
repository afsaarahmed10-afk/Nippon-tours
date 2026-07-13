import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { AuthCard, inputCls, labelCls } from "@/components/auth/AuthCard";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Nippon Tours" },
      { name: "description", content: "Sign in to your Nippon Tours customer account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(1, "Password required").max(72),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      navigate({ to: role ? "/admin" : "/dashboard" });
    });
  }, [navigate]);

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
      toast.success("Welcome back.");
      navigate({ to: role ? "/admin" : "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Sign in"
      subtitle="Access your trips, favourites and messages"
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="font-bold text-accent underline-offset-2 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="li-email" className={labelCls}>Email</label>
          <input id="li-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="li-pass" className={labelCls}>Password</label>
          <input id="li-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        <div className="text-right text-xs">
          <Link to="/forgot-password" className="font-semibold text-muted-foreground hover:text-accent">
            Forgot password?
          </Link>
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-[11px] text-muted-foreground">
          Administrator?{" "}
          <Link to="/admin/login" className="font-semibold underline-offset-2 hover:underline">
            Use the admin portal
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
