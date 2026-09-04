import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage, privacyHead } from "../privacy";

export const Route = createFileRoute("/ja/privacy")({
  head: () => privacyHead("ja"),
  component: () => <PrivacyPage locale="ja" />,
});
