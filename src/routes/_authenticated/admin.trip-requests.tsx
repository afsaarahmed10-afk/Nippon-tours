import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminPage } from "@/components/admin/AdminShell";
import { toast } from "sonner";
import { useState } from "react";
import { adminTripRequestsOptions } from "@/lib/queries";
import type { TripRequest } from "@/lib/db-types";
import { Mail, Phone, MessageCircle, Search } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/trip-requests")({
  component: TripRequestsAdmin,
});

const STATUS: TripRequest["status"][] = ["unread", "contacted", "confirmed", "closed"];

function TripRequestsAdmin() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<TripRequest["status"] | "all">("all");

  const { data: rows = [], isLoading } = useQuery(adminTripRequestsOptions());

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TripRequest["status"] }) => {
      const { error } = await supabase.from("trip_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["trip_requests"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = rows.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (q) {
      const needle = q.toLowerCase();
      return (
        r.full_name?.toLowerCase().includes(needle) ||
        r.email?.toLowerCase().includes(needle) ||
        (r.country ?? "").toLowerCase().includes(needle)
      );
    }
    return true;
  });

  return (
    <AdminPage title="Trip requests" description="Every custom itinerary request submitted through your site.">
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, country…"
            className="w-full rounded-full border border-input bg-card py-2 pl-10 pr-4 text-sm focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {(["all", ...STATUS] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <p className="p-8 text-center text-muted-foreground">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
          No requests match your filters.
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold">{r.full_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()} · {r.country ?? "—"}
                    {r.needs_car_rental && <span className="ml-2 rounded bg-accent/10 px-1.5 py-0.5 font-bold text-accent">+ car rental</span>}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                      <Mail className="h-3 w-3" /> {r.email}
                    </a>
                    {r.phone && (
                      <a href={`tel:${r.phone}`} className="inline-flex items-center gap-1 font-semibold text-accent hover:underline">
                        <Phone className="h-3 w-3" /> {r.phone}
                      </a>
                    )}
                    {r.phone && (
                      <a
                        href={`https://wa.me/${r.phone.replace(/[^\d+]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
                <select
                  value={r.status}
                  onChange={(e) => update.mutate({ id: r.id, status: e.target.value as TripRequest["status"] })}
                  className="rounded-full border border-input bg-background px-3 py-1.5 text-xs font-bold capitalize"
                >
                  {STATUS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-xs sm:grid-cols-2">
                <div>
                  <dt className="font-bold text-muted-foreground">Dates</dt>
                  <dd>{r.travel_start ?? "—"} → {r.travel_end ?? "—"}</dd>
                </div>
                <div>
                  <dt className="font-bold text-muted-foreground">Group / Budget</dt>
                  <dd>{r.group_size ?? "—"} people · {r.budget ?? "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-bold text-muted-foreground">Destinations</dt>
                  <dd>{r.destinations?.length ? r.destinations.join(", ") : "—"}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-bold text-muted-foreground">Interests</dt>
                  <dd>{r.interests?.length ? r.interests.join(", ") : "—"}</dd>
                </div>
              </dl>
              {r.message && (
                <div className="mt-3 rounded-xl bg-muted/40 p-3 text-sm leading-relaxed whitespace-pre-line">{r.message}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
