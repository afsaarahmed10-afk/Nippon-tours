import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { myTripRequestsQueryOptions } from "@/lib/customer-queries";
import { StatusBadge } from "./dashboard.index";

export const Route = createFileRoute("/_authenticated/dashboard/trip-requests")({
  component: TripRequestsPage,
});

function TripRequestsPage() {
  const { user } = useAuth();
  const { data: trips } = useSuspenseQuery(myTripRequestsQueryOptions(user?.id ?? null));

  return (
    <DashboardPage
      title="My Trip Requests"
      description="Every Plan My Trip request you've submitted, with live status."
      action={<Link to="/plan-my-trip" className="btn-accent">New request</Link>}
    >
      {trips.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">You haven't submitted any trip requests yet.</p>
          <Link to="/plan-my-trip" className="btn-accent mt-4 inline-block">Plan your trip</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {trips.map((t) => (
            <article key={t.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {t.destinations.length > 0 ? t.destinations.join(", ") : "Custom itinerary"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Submitted {new Date(t.created_at).toLocaleDateString()}
                    {t.travel_start && ` • travelling ${new Date(t.travel_start).toLocaleDateString()}`}
                    {t.group_size && ` • ${t.group_size} travellers`}
                    {t.budget && ` • ${t.budget}`}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </div>
              {t.tours.length > 0 && (
                <p className="mt-3 text-sm"><span className="font-semibold">Tours:</span> {t.tours.join(", ")}</p>
              )}
              {t.message && <p className="mt-2 text-sm text-muted-foreground">"{t.message}"</p>}
            </article>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
