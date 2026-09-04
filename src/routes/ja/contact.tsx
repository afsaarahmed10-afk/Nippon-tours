import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, contactHead } from "../contact";

export const Route = createFileRoute("/ja/contact")({
  head: () => contactHead("ja"),
  component: () => <ContactPage locale="ja" />,
});
