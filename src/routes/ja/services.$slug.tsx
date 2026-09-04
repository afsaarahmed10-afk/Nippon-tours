import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, ServiceNotFound, serviceLoader, serviceHead } from "../services.$slug";

export const Route = createFileRoute("/ja/services/$slug")({
  loader: ({ params }) => serviceLoader({ params }),
  head: ({ params, loaderData }) => serviceHead("ja", params, loaderData),
  notFoundComponent: () => <ServiceNotFound locale="ja" />,
  component: () => <ServicePage locale="ja" />,
});
