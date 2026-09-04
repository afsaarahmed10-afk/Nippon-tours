import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "../../_authenticated/dashboard.profile";

export const Route = createFileRoute("/ja/_authenticated/dashboard/profile")({
  component: ProfilePage,
});
