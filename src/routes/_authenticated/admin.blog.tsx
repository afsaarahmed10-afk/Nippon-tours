import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminShell";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: () => (
    <AdminPage title="Blog" description="Blog articles shown on /blog. Body accepts markdown.">
      <AdminCrud
        table="blog_posts"
        singular="Post"
        plural="Posts"
        orderBy="published_at"
        ascending={false}
        invalidatePublic={["blog"]}
        columns={[
          { key: "title", label: "Title", format: (r) => <span className="font-semibold">{String(r.title)}</span> },
          { key: "category", label: "Category" },
          { key: "published", label: "Status", format: (r) => (r.published ? "Live" : "Draft") },
          {
            key: "published_at",
            label: "Date",
            format: (r) => (r.published_at ? new Date(r.published_at as string).toLocaleDateString() : "—"),
          },
        ]}
        fields={[
          { key: "title", label: "Title", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true, help: "URL-safe, e.g. how-to-book-a-ryokan" },
          { key: "excerpt", label: "Excerpt (list card)", type: "textarea", rows: 2 },
          { key: "cover_image", label: "Cover image URL", type: "url" },
          { key: "category", label: "Category", type: "text" },
          { key: "author", label: "Author", type: "text" },
          { key: "body", label: "Body (Markdown supported)", type: "textarea", rows: 14 },
          { key: "seo_title", label: "SEO title", type: "text" },
          { key: "seo_description", label: "SEO description", type: "textarea", rows: 2 },
          { key: "published", label: "Published", type: "boolean" },
          { key: "published_at", label: "Published at (ISO date)", type: "text", placeholder: "2026-07-12T00:00:00Z" },
        ]}
        defaults={{ published: false, body: "" }}
      />
    </AdminPage>
  ),
});
