import { createFileRoute } from "@tanstack/react-router";
import { DestinationsPage, destinationsIndexHead } from "../destinations.index";

export const Route = createFileRoute("/ja/destinations/")({
  head: () => destinationsIndexHead("ja"),
  component: () => <DestinationsPage locale="ja" />,
});
