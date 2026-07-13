// Customer dashboard layout — protected by parent _authenticated gate.
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/customer/DashboardShell";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My account — Nippon Tours" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  ),
});
