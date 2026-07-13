import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminShell";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: () => (
    <AdminPage title="Testimonials" description="Curated guest quotes shown on the homepage and reviews page.">
      <AdminCrud
        table="testimonials"
        singular="Testimonial"
        plural="Testimonials"
        orderBy="sort_order"
        ascending={true}
        invalidatePublic={["testimonials"]}
        columns={[
          { key: "name", label: "Name", format: (r) => <span className="font-semibold">{String(r.name)}</span> },
          { key: "country", label: "Country" },
          { key: "rating", label: "Rating" },
          { key: "featured", label: "Featured", format: (r) => (r.featured ? "★" : "—") },
          { key: "published", label: "Status", format: (r) => (r.published ? "Live" : "Hidden") },
        ]}
        fields={[
          { key: "name", label: "Name", type: "text", required: true },
          { key: "country", label: "Country", type: "text" },
          { key: "source", label: "Source (Google, Tripadvisor…)", type: "text" },
          { key: "rating", label: "Rating (1–5)", type: "number" },
          { key: "quote", label: "Quote", type: "textarea", rows: 4, required: true },
          { key: "tour", label: "Tour taken", type: "text" },
          { key: "sort_order", label: "Sort order", type: "number" },
          { key: "featured", label: "Featured", type: "boolean" },
          { key: "published", label: "Published", type: "boolean" },
        ]}
        defaults={{ rating: 5, published: true, sort_order: 100 }}
      />
    </AdminPage>
  ),
});
