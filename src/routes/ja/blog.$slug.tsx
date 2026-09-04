import { createFileRoute } from "@tanstack/react-router";
import { PostPage, PostNotFound, buildPostHead, postLoader } from "../blog.$slug";

export const Route = createFileRoute("/ja/blog/$slug")({
  loader: ({ params, context }) => postLoader({ params, context, locale: "ja" }),
  head: ({ params, loaderData }) => buildPostHead("ja", loaderData, params.slug),
  notFoundComponent: () => <PostNotFound locale="ja" />,
  component: () => <PostPage locale="ja" />,
});
