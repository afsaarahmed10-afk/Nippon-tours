import { createFileRoute } from "@tanstack/react-router";
import { FAQsPage, faqsHead, faqsLoader } from "../faqs";

export const Route = createFileRoute("/ja/faqs")({
  loader: ({ context }) => faqsLoader({ context, locale: "ja" }),
  head: () => faqsHead("ja"),
  component: () => <FAQsPage locale="ja" />,
});
