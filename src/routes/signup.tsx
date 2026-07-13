import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { AuthCard, inputCls, labelCls } from "@/components/auth/AuthCard";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create an account — Nippon Tours" },
      { name: "description", content: "Create your Nippon Tours account to save tours and manage trip requests." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(200),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(72),
});

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      if (data.session) {
        toast.success("Account created.");
        navigate({ to: "/dashboard" });
      } else {
        setSent(true);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthCard title="Check your inbox" subtitle="Verify your email to activate your account">
        <p className="text-center text-sm text-muted-foreground">
          We sent a verification link to <span className="font-semibold text-foreground">{email}</span>. Click it to
          finish creating your account, then sign in.
        </p>
        <Link to="/login" className="btn-accent mt-6 w-full">Back to sign in</Link>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Save tours, track trip requests and message us"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-accent underline-offset-2 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="su-name" className={labelCls}>Full name</label>
          <input id="su-name" type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="su-email" className={labelCls}>Email</label>
          <input id="su-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="su-pass" className={labelCls}>Password</label>
          <input id="su-pass" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
          <p className="mt-1 text-[11px] text-muted-foreground">Minimum 8 characters.</p>
        </div>
        <button type="submit" disabled={loading} className="btn-accent w-full">
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>
    </AuthCard>
  );
}
