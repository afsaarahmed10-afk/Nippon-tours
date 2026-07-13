import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  adminToursOptions,
  adminTripRequestsOptions,
  adminCarRentalOptions,
  adminReviewsOptions,
} from "@/lib/queries";
import { AdminPage } from "@/components/admin/AdminShell";
import { Compass, ClipboardList, Car, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(adminToursOptions());
    context.queryClient.ensureQueryData(adminTripRequestsOptions());
    context.queryClient.ensureQueryData(adminCarRentalOptions());
    context.queryClient.ensureQueryData(adminReviewsOptions());
  },
  component: Dashboard,
});

function Dashboard() {
  const { data: tours } = useSuspenseQuery(adminToursOptions());
  const { data: trips } = useSuspenseQuery(adminTripRequestsOptions());
  const { data: cars } = useSuspenseQuery(adminCarRentalOptions());
  const { data: reviews } = useSuspenseQuery(adminReviewsOptions());

  const publishedTours = tours.filter((t) => t.published).length;
  const unreadTrips = trips.filter((t) => t.status === "unread").length;
  const unreadCars = cars.filter((c) => c.status === "unread").length;
  const pendingReviews = reviews.filter((r) => r.status === "pending").length;

  const stats = [
    { label: "Total tours", value: tours.length, sub: `${publishedTours} published`, to: "/admin/tours", icon: Compass },
    { label: "Trip requests", value: trips.length, sub: `${unreadTrips} unread`, to: "/admin/trip-requests", icon: ClipboardList },
    { label: "Car rental requests", value: cars.length, sub: `${unreadCars} unread`, to: "/admin/car-rental-requests", icon: Car },
    { label: "Pending reviews", value: pendingReviews, sub: `${reviews.length} total`, to: "/admin/reviews", icon: Star },
  ];

  const latestTrips = trips.slice(0, 6);

  return (
    <AdminPage title="Dashboard" description="A snapshot of what's happening across your Japan travel business.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-accent" />
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
            <p className="mt-4 font-display text-3xl font-semibold">{s.value}</p>
            <p className="text-xs font-semibold text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-xs text-muted-foreground/80">{s.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-lg font-semibold">Latest trip requests</h2>
          <Link to="/admin/trip-requests" className="text-xs font-bold text-accent hover:underline">
            View all →
          </Link>
        </div>
        {latestTrips.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            No trip requests yet — once visitors submit "Plan My Trip", they'll appear here.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {latestTrips.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.full_name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.email} · {t.country ?? "—"} · {new Date(t.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    t.status === "unread"
                      ? "bg-accent/10 text-accent"
                      : t.status === "closed"
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminPage>
  );
}
