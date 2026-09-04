import { createFileRoute } from "@tanstack/react-router";
import { ForgotPage, forgotPasswordHead } from "../forgot-password";

export const Route = createFileRoute("/ja/forgot-password")({
  head: () => forgotPasswordHead("ja"),
  component: () => <ForgotPage locale="ja" />,
});
