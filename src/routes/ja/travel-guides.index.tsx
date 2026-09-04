import { createFileRoute } from "@tanstack/react-router";
import { GuidesPage, guidesIndexHead } from "../travel-guides.index";

export const Route = createFileRoute("/ja/travel-guides/")({
  head: () => guidesIndexHead("ja"),
  component: () => <GuidesPage locale="ja" />,
});
