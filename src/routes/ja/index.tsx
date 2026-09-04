import { createFileRoute } from "@tanstack/react-router";
import { HomePage, homeHead, homeLoader } from "../index";

export const Route = createFileRoute("/ja/")({
  loader: ({ context }) => homeLoader({ context, locale: "ja" }),
  head: () => homeHead("ja"),
  component: () => <HomePage locale="ja" />,
});
