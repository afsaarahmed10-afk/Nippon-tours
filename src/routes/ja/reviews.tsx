import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage, reviewsHead, reviewsLoader } from "../reviews";

export const Route = createFileRoute("/ja/reviews")({
  loader: ({ context }) => reviewsLoader({ context, locale: "ja" }),
  head: () => reviewsHead("ja"),
  component: () => <ReviewsPage locale="ja" />,
});
