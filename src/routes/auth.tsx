// Legacy route — redirects to the new customer /login page.
import { createFileRoute, redirect } from "@tanstack/react-router";
import type { Locale } from "@/i18n";

export const authRedirectTarget = (locale: Locale = "en") => (locale === "ja" ? "/ja/login" : "/login");

export const Route = createFileRoute("/auth")({
  beforeLoad: () => {
    throw redirect({ to: authRedirectTarget("en") });
  },
});
