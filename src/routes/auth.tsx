// Legacy route — redirects to the new customer /login page.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});
