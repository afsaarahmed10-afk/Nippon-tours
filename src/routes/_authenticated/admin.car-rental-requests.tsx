import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage } from "@/components/admin/AdminShell";
import { toast } from "sonner";
import { adminCarRentalOptions } from "@/lib/queries";
import type { CarRentalRequest } from "@/lib/db-types";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/car-rental-requests")({
  component: CarRentalAdmin,
});

const STATUS: CarRentalRequest["status"][] = ["unread", "contacted", "confirmed", "closed"];

function CarRentalAdmin() {
  const qc = useQueryClient();
  const { data: rows = [], isLoading } = useQuery(adminCarRentalOptions());

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: CarRentalRequest["status"] }) => {
      const { error } = await supabase.from("car_rental_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["car_rental_requests"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("car_rental_requests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["car_rental_requests"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AdminPage title="Car rental requests" description="Every rental request submitted through Plan My Trip.">
      {isLoading ? (
        <p className="p-8 text-center text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
          No car rental requests yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-semibold">
                    {r.full_name ?? "Anonymous"} · {r.service_type ?? r.vehicle_preference ?? "Any vehicle"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                    {r.email && ` · ${r.email}`}
                    {r.phone && ` · ${r.phone}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={r.status}
                    onChange={(e) => update.mutate({ id: r.id, status: e.target.value as CarRentalRequest["status"] })}
                    className="rounded-full border border-input bg-background px-3 py-1.5 text-xs font-bold capitalize"
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (confirm("Delete this request?")) remove.mutate(r.id);
                    }}
                    className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-xs sm:grid-cols-2">
                <div>
                  <dt className="font-bold text-muted-foreground">Pickup</dt>
                  <dd>{r.pickup_location} · {r.pickup_date} {r.pickup_time ?? ""}</dd>
                </div>
                <div>
                  <dt className="font-bold text-muted-foreground">Return</dt>
                  <dd>{r.dropoff_location} · {r.return_date} {r.return_time ?? ""}</dd>
                </div>
                <div>
                  <dt className="font-bold text-muted-foreground">Passengers / Luggage</dt>
                  <dd>{r.passengers} · {r.luggage} bags</dd>
                </div>
                <div>
                  <dt className="font-bold text-muted-foreground">Preferred vehicle</dt>
                  <dd>{r.vehicle_preference ?? "—"}</dd>
                </div>
              </dl>
              {r.special_requirements && (
                <div className="mt-3 rounded-xl bg-muted/40 p-3 text-sm leading-relaxed whitespace-pre-line">
                  {r.special_requirements}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
