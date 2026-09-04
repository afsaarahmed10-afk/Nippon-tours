import { createFileRoute } from "@tanstack/react-router";
import { DestinationPage, DestinationNotFound, destinationLoader, destinationHead } from "../destinations.$slug";

export const Route = createFileRoute("/ja/destinations/$slug")({
  loader: ({ params, context }) => destinationLoader({ params, context }),
  head: ({ loaderData, params }) => destinationHead("ja", params, loaderData),
  notFoundComponent: () => <DestinationNotFound locale="ja" />,
  component: () => <DestinationPage locale="ja" />,
});
