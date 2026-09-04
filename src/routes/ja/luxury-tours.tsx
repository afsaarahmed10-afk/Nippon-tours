import { createFileRoute } from "@tanstack/react-router";
import { LuxuryToursPage, luxuryToursHead } from "../luxury-tours";

export const Route = createFileRoute("/ja/luxury-tours")({
  head: () => luxuryToursHead("ja"),
  component: () => <LuxuryToursPage locale="ja" />,
});
