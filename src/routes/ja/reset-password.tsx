import { createFileRoute } from "@tanstack/react-router";
import { ResetPage, resetPasswordHead } from "../reset-password";

export const Route = createFileRoute("/ja/reset-password")({
  ssr: false,
  head: () => resetPasswordHead("ja"),
  component: () => <ResetPage locale="ja" />,
});
