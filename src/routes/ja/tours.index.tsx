import { createFileRoute } from "@tanstack/react-router";
import { ToursPage, toursIndexHead, toursIndexLoader } from "../tours.index";

export const Route = createFileRoute("/ja/tours/")({
  loader: ({ context }) => toursIndexLoader({ context, locale: "ja" }),
  head: () => toursIndexHead("ja"),
  component: () => <ToursPage locale="ja" />,
});
