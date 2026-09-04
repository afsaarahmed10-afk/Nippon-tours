import { createFileRoute } from "@tanstack/react-router";
import { LoginPage, loginHead } from "../login";

export const Route = createFileRoute("/ja/login")({
  head: () => loginHead("ja"),
  component: () => <LoginPage locale="ja" />,
});
