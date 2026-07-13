// Admin layout with role check. /admin/* is only accessible to users with the 'admin' role.
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const user = (context as { user?: { id: string } }).user;
    if (!user) throw redirect({ to: "/admin/login" });
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!data) throw redirect({ to: "/dashboard" });
  },
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
});
