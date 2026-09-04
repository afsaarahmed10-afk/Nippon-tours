// Customer dashboard layout — protected by parent _authenticated gate.
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/customer/DashboardShell";
import type { Locale } from "@/i18n";

export const dashboardHead = (locale: Locale = "en") => ({
  meta: [
    { title: locale === "ja" ? "マイアカウント — Nippon Tours" : "My account — Nippon Tours" },
    { name: "robots", content: "noindex" },
  ],
});

export function DashboardLayout({ locale: _locale = "en" }: { locale?: Locale } = {}) {
  // DashboardShell derives its own copy and links from the URL locale via
  // useLocale(), so the prop only exists here to keep the route mirroring
  // pattern consistent with the rest of the site.
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => dashboardHead("en"),
  component: DashboardLayout,
});
