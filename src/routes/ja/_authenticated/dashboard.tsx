import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout, dashboardHead } from "../../_authenticated/dashboard";

export const Route = createFileRoute("/ja/_authenticated/dashboard")({
  head: () => dashboardHead("ja"),
  component: () => <DashboardLayout locale="ja" />,
});
