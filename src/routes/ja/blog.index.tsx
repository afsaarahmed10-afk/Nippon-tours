import { createFileRoute } from "@tanstack/react-router";
import { BlogPage, blogIndexHead, blogIndexLoader } from "../blog.index";

export const Route = createFileRoute("/ja/blog/")({
  loader: ({ context }) => blogIndexLoader({ context, locale: "ja" }),
  head: () => blogIndexHead("ja"),
  component: () => <BlogPage locale="ja" />,
});
