import { createFileRoute } from "@tanstack/react-router";
import { PrivateToursPage, privateToursHead } from "../private-tours";

export const Route = createFileRoute("/ja/private-tours")({
  head: () => privateToursHead("ja"),
  component: () => <PrivateToursPage locale="ja" />,
});
