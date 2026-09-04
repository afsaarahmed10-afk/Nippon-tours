import { createFileRoute } from "@tanstack/react-router";
import { TermsPage, termsHead } from "../terms";

export const Route = createFileRoute("/ja/terms")({
  head: () => termsHead("ja"),
  component: () => <TermsPage locale="ja" />,
});
