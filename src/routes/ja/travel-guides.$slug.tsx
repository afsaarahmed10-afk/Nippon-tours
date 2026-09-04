import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, GuideNotFound, buildGuideHead, guideLoader } from "../travel-guides.$slug";

export const Route = createFileRoute("/ja/travel-guides/$slug")({
  loader: ({ params }) => guideLoader({ params }),
  head: ({ loaderData, params }) => buildGuideHead("ja", loaderData, params.slug),
  notFoundComponent: () => <GuideNotFound locale="ja" />,
  component: () => <GuidePage locale="ja" />,
});
