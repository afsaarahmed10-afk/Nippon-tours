import { createFileRoute } from "@tanstack/react-router";
import { SignupPage, signupHead } from "../signup";

export const Route = createFileRoute("/ja/signup")({
  head: () => signupHead("ja"),
  component: () => <SignupPage locale="ja" />,
});
