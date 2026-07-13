import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { AuthCard, inputCls, labelCls } from "@/components/auth/AuthCard";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Administrator sign-in — Nippon Tours" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(1, "Password required").max(72),
});

function AdminLoginPage() {
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
      if (role) navigate({ to: "/admin" });
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
      if (!role) {
        await supabase.auth.signOut();
        toast.error("This account is not an administrator.");
        return;
      }
      toast.success("Signed in as administrator.");
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Administrator sign-in"
      subtitle="Restricted access. This portal is for Nippon Tours staff only."
      footer={
        <Link to="/login" className="font-bold text-accent underline-offset-2 hover:underline">
          Customer sign-in →
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="al-email" className={labelCls}>Email</label>
          <input id="al-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="al-pass" className={labelCls}>Password</label>
          <input id="al-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthCard>
  );
}
