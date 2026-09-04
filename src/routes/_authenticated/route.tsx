// Integration-style authenticated layout: gates /admin behind Supabase session.
// ssr:false because the browser owns the Supabase session (localStorage).
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: () => requireAuth("/login"),
  component: () => <Outlet />,
});
