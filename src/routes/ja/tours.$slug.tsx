import { createFileRoute } from "@tanstack/react-router";
import { TourPage, TourNotFound, tourLoader, tourHead } from "../tours.$slug";

export const Route = createFileRoute("/ja/tours/$slug")({
  loader: ({ params, context }) => tourLoader({ params, context, locale: "ja" }),
  head: ({ params, loaderData }) => tourHead("ja", params, loaderData),
  notFoundComponent: () => <TourNotFound locale="ja" />,
  component: () => <TourPage locale="ja" />,
});
