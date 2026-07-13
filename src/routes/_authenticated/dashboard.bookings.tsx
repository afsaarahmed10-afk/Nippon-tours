import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { myTripRequestsQueryOptions } from "@/lib/customer-queries";
import { StatusBadge } from "./dashboard.index";

export const Route = createFileRoute("/_authenticated/dashboard/bookings")({
  component: BookingsPage,
});

function BookingsPage() {
  const { user } = useAuth();
  const { data: trips } = useSuspenseQuery(myTripRequestsQueryOptions(user?.id ?? null));
  const bookings = trips.filter((t) => t.status === "confirmed" || (t.status as string) === "completed");

  return (
    <DashboardPage title="My Bookings" description="Trips that have been confirmed by our team.">
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">No confirmed bookings yet. Once we confirm a trip, it will show here.</p>
          <Link to="/dashboard/trip-requests" className="btn-outline mt-4 inline-block">See trip requests</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((t) => (
            <article key={t.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {t.destinations.length > 0 ? t.destinations.join(", ") : "Custom itinerary"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.travel_start && `Travel: ${new Date(t.travel_start).toLocaleDateString()}`}
                    {t.travel_end && ` – ${new Date(t.travel_end).toLocaleDateString()}`}
                    {t.group_size && ` • ${t.group_size} travellers`}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            </article>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
