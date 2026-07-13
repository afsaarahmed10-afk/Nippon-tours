import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminShell";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/faqs")({
  component: () => (
    <AdminPage title="FAQs" description="Questions shown on the FAQs page and homepage.">
      <AdminCrud
        table="faqs"
        singular="FAQ"
        plural="FAQs"
        orderBy="sort_order"
        ascending={true}
        invalidatePublic={["faqs"]}
        columns={[
          { key: "question", label: "Question", format: (r) => <span className="font-semibold">{String(r.question)}</span> },
          { key: "sort_order", label: "Order" },
          { key: "published", label: "Status", format: (r) => (r.published ? "Live" : "Hidden") },
        ]}
        fields={[
          { key: "question", label: "Question", type: "text", required: true },
          { key: "answer", label: "Answer", type: "textarea", rows: 5, required: true },
          { key: "category", label: "Category", type: "text" },
          { key: "sort_order", label: "Sort order", type: "number" },
          { key: "published", label: "Published", type: "boolean" },
        ]}
        defaults={{ published: true, sort_order: 100 }}
      />
    </AdminPage>
  ),
});
