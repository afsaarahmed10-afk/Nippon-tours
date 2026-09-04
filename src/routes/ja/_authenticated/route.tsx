// Japanese mirror of ../../_authenticated/route.tsx — same auth gate, but
// unauthenticated visitors are sent to the Japanese login page.
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guard";

export const Route = createFileRoute("/ja/_authenticated")({
  ssr: false,
  beforeLoad: () => requireAuth("/ja/login"),
  component: () => <Outlet />,
});
