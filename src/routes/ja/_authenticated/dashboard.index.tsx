import { createFileRoute } from "@tanstack/react-router";
import { DashboardHome } from "../../_authenticated/dashboard.index";

export const Route = createFileRoute("/ja/_authenticated/dashboard/")({
  component: DashboardHome,
});
