import { createFileRoute } from "@tanstack/react-router";
import { ChangePasswordPage } from "../../_authenticated/dashboard.change-password";

export const Route = createFileRoute("/ja/_authenticated/dashboard/change-password")({
  component: ChangePasswordPage,
});
