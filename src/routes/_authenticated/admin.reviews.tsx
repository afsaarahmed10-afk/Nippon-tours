import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage } from "@/components/admin/AdminShell";
import { toast } from "sonner";
import { Star, Check, X, Trash2 } from "lucide-react";
import { adminReviewsOptions } from "@/lib/queries";
import type { Review } from "@/lib/db-types";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  component: ReviewsAdmin,
});

function ReviewsAdmin() {
  const qc = useQueryClient();
  const { data: rows = [], isLoading } = useQuery(adminReviewsOptions());

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["reviews"] });
  };

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Review["status"] }) => {
      const { error } = await supabase.from("reviews").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review updated");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AdminPage title="Reviews" description="Moderate reviews left by visitors. Only Approved reviews appear on your public site.">
      {isLoading ? (
        <p className="p-8 text-center text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
          No reviews yet — the review form on the /reviews page will populate this list.
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{r.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        r.status === "approved"
                          ? "bg-primary/10 text-primary"
                          : r.status === "rejected"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {r.email ?? "—"} · {r.country ?? "—"} · {new Date(r.created_at).toLocaleDateString()}
                  </p>
                  <div className="mt-1 flex text-gold">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setStatus.mutate({ id: r.id, status: "approved" })}
                    className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                    title="Approve"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setStatus.mutate({ id: r.id, status: "rejected" })}
                    className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Reject"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this review permanently?")) remove.mutate(r.id);
                    }}
                    className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
