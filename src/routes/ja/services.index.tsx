import { createFileRoute } from "@tanstack/react-router";
import { ServicesIndex, servicesIndexHead } from "../services.index";

export const Route = createFileRoute("/ja/services/")({
  head: () => servicesIndexHead("ja"),
  component: () => <ServicesIndex locale="ja" />,
});
