import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "../../_authenticated/dashboard.notifications";

export const Route = createFileRoute("/ja/_authenticated/dashboard/notifications")({
  component: NotificationsPage,
});
