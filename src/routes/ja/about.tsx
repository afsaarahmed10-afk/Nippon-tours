import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, aboutHead } from "../about";

export const Route = createFileRoute("/ja/about")({
  head: () => aboutHead("ja"),
  component: () => <AboutPage locale="ja" />,
});
