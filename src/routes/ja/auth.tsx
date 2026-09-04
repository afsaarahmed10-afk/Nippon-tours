// Legacy route — redirects to the new customer /ja/login page.
import { createFileRoute, redirect } from "@tanstack/react-router";
import { authRedirectTarget } from "../auth";

export const Route = createFileRoute("/ja/auth")({
  beforeLoad: () => {
    throw redirect({ to: authRedirectTarget("ja") });
  },
});
