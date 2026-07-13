import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import {
  myTripRequestsQueryOptions,
  mySavedToursQueryOptions,
  myNotificationsQueryOptions,
  myMessagesQueryOptions,
} from "@/lib/customer-queries";
import { ClipboardList, BookMarked, Heart, Bell, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardHome,
});

function Stat({
  label,
  value,
  icon: Icon,
  to,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  to: "/dashboard/trip-requests" | "/dashboard/saved-tours" | "/dashboard/favourites" | "/dashboard/notifications" | "/dashboard/messages";
}) {
  return (
    <Link to={to} className="card-lift rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-0.5 font-display text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </Link>
  );
}

function DashboardHome() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const { data: trips } = useSuspenseQuery(myTripRequestsQueryOptions(userId));
  const { data: saved } = useSuspenseQuery(mySavedToursQueryOptions(userId));
  const { data: notes } = useSuspenseQuery(myNotificationsQueryOptions(userId));
  const { data: msgs } = useSuspenseQuery(myMessagesQueryOptions(userId));

  const favs = saved.filter((s) => s.is_favourite).length;
  const unread = notes.filter((n) => !n.read_at).length;
  const activeTrips = trips.filter((t) => ["unread", "contacted", "processing", "confirmed"].includes(t.status as string)).length;

  return (
    <DashboardPage
      title={`Welcome${user?.user_metadata?.full_name ? `, ${String(user.user_metadata.full_name).split(" ")[0]}` : ""}`}
      description="Everything about your Japan trip in one place."
      action={<Link to="/plan-my-trip" className="btn-accent">Plan a new trip</Link>}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Stat label="Active trips" value={activeTrips} icon={ClipboardList} to="/dashboard/trip-requests" />
        <Stat label="Saved tours" value={saved.length - favs} icon={BookMarked} to="/dashboard/saved-tours" />
        <Stat label="Favourites" value={favs} icon={Heart} to="/dashboard/favourites" />
        <Stat label="Notifications" value={unread} icon={Bell} to="/dashboard/notifications" />
        <Stat label="Messages" value={msgs.length} icon={MessagesSquare} to="/dashboard/messages" />
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Recent trip requests</h2>
        {trips.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            You haven't submitted any trip requests yet.{" "}
            <Link to="/plan-my-trip" className="font-semibold text-accent hover:underline">
              Plan your trip →
            </Link>
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {trips.slice(0, 5).map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-semibold">{t.destinations.length > 0 ? t.destinations.join(", ") : "Custom trip"}</p>
                  <p className="text-xs text-muted-foreground">
                    Submitted {new Date(t.created_at).toLocaleDateString()}
                    {t.travel_start && ` • travelling ${new Date(t.travel_start).toLocaleDateString()}`}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </DashboardPage>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    unread: "bg-secondary text-foreground",
    contacted: "bg-blue-100 text-blue-800",
    processing: "bg-amber-100 text-amber-800",
    confirmed: "bg-primary/10 text-primary",
    completed: "bg-emerald-100 text-emerald-800",
    closed: "bg-muted text-muted-foreground",
  };
  const label: Record<string, string> = {
    unread: "Pending",
    contacted: "Contacted",
    processing: "Processing",
    confirmed: "Confirmed",
    completed: "Completed",
    closed: "Closed",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${map[status] ?? "bg-muted"}`}>
      {label[status] ?? status}
    </span>
  );
}
