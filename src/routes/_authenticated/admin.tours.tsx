import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminShell";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/tours")({
  component: () => (
    <AdminPage title="Tours" description="Every tour on your public site is managed here.">
      <AdminCrud
        table="tours"
        singular="Tour"
        plural="Tours"
        orderBy="sort_order"
        ascending={true}
        invalidatePublic={["tours"]}
        columns={[
          { key: "title", label: "Title", format: (r) => <span className="font-semibold">{String(r.title)}</span> },
          { key: "category", label: "Category" },
          { key: "days", label: "Days" },
          { key: "price", label: "Price", format: (r) => `¥${Number(r.price).toLocaleString()}` },
          {
            key: "published",
            label: "Status",
            format: (r) => (
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${r.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {r.published ? "Live" : "Draft"}
              </span>
            ),
          },
          { key: "featured", label: "Featured", format: (r) => (r.featured ? "★" : "—") },
        ]}
        fields={[
          { key: "title", label: "Title", type: "text", required: true },
          { key: "slug", label: "Slug", type: "text", required: true, help: "URL-safe, e.g. private-japan-golden-route" },
          { key: "category", label: "Category", type: "select", options: ["Private", "Group", "Luxury", "Seasonal"], required: true },
          { key: "days", label: "Duration (days)", type: "number", required: true },
          { key: "price", label: "Price (JPY, per person)", type: "number", required: true },
          { key: "group_size", label: "Group size", type: "text", placeholder: "e.g. Max 12 guests" },
          { key: "rating", label: "Rating", type: "number" },
          { key: "reviews_count", label: "Reviews count", type: "number" },
          { key: "summary", label: "Summary", type: "textarea", rows: 3 },
          { key: "image", label: "Hero image URL", type: "url" },
          { key: "highlights", label: "Highlights (JSON array of strings)", type: "json", rows: 6 },
          { key: "itinerary", label: 'Itinerary (JSON: [{"day","title","desc"}])', type: "json", rows: 10 },
          { key: "includes", label: "Includes (JSON array)", type: "json", rows: 6 },
          { key: "seo_title", label: "SEO title", type: "text" },
          { key: "seo_description", label: "SEO description", type: "textarea", rows: 2 },
          { key: "sort_order", label: "Sort order", type: "number" },
          { key: "featured", label: "Featured on homepage", type: "boolean" },
          { key: "published", label: "Published (visible on site)", type: "boolean" },
        ]}
        defaults={{ category: "Private", days: 1, price: 0, rating: 5, reviews_count: 0, published: true, sort_order: 100, highlights: [], itinerary: [], includes: [] }}
      />
    </AdminPage>
  ),
});
