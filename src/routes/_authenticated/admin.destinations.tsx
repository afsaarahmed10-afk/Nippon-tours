import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminShell";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/destinations")({
  component: () => (
    <AdminPage title="Destinations" description="Regions and cities featured on your site.">
      <AdminCrud
        table="destinations"
        singular="Destination"
        plural="Destinations"
        orderBy="sort_order"
        ascending={true}
        invalidatePublic={["destinations"]}
        columns={[
          { key: "name", label: "Name", format: (r) => <span className="font-semibold">{String(r.name)}</span> },
          { key: "region", label: "Region" },
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
          { key: "name", label: "Name", type: "text", required: true },
          { key: "name_ja", label: "Name (Japanese)", type: "text" },
          { key: "slug", label: "Slug", type: "text", required: true },
          { key: "region", label: "Region", type: "text", placeholder: "e.g. Kanto" },
          { key: "region_ja", label: "Region (Japanese)", type: "text" },
          { key: "tagline", label: "Tagline", type: "text" },
          { key: "tagline_ja", label: "Tagline (Japanese)", type: "text" },
          { key: "summary", label: "Short summary (card)", type: "textarea", rows: 2 },
          { key: "summary_ja", label: "Short summary (Japanese)", type: "textarea", rows: 2 },
          { key: "description", label: "Long description", type: "textarea", rows: 6 },
          { key: "description_ja", label: "Long description (Japanese)", type: "textarea", rows: 6 },
          { key: "hero_image", label: "Hero image URL", type: "url" },
          { key: "best_season", label: "Best season", type: "text" },
          { key: "best_season_ja", label: "Best season (Japanese)", type: "text" },
          { key: "weather", label: "Weather", type: "text" },
          { key: "weather_ja", label: "Weather (Japanese)", type: "text" },
          { key: "nearby_attractions", label: "Nearby attractions (JSON array)", type: "json", rows: 4 },
          { key: "nearby_attractions_ja", label: "Nearby attractions (Japanese, JSON array)", type: "json", rows: 4 },
          { key: "seo_title", label: "SEO title", type: "text" },
          { key: "seo_title_ja", label: "SEO title (Japanese)", type: "text" },
          { key: "seo_description", label: "SEO description", type: "textarea", rows: 2 },
          { key: "seo_description_ja", label: "SEO description (Japanese)", type: "textarea", rows: 2 },
          { key: "sort_order", label: "Sort order", type: "number" },
          { key: "featured", label: "Featured on homepage", type: "boolean" },
          { key: "published", label: "Published", type: "boolean" },
        ]}
        defaults={{ published: true, sort_order: 100, nearby_attractions: [], nearby_attractions_ja: [] }}
      />
    </AdminPage>
  ),
});
