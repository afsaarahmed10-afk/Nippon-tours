import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { LocaleLink } from "@/components/site/LocaleLink";
import { myTripRequestsQueryOptions } from "@/lib/customer-queries";
import { StatusBadge } from "./dashboard.index";
import type { Locale } from "@/i18n";

const COPY: Record<Locale, {
  title: string;
  description: string;
  empty: string;
  seeTripRequests: string;
  customItinerary: string;
  travel: string;
  travellers: string;
}> = {
  en: {
    title: "My Bookings",
    description: "Trips that have been confirmed by our team.",
    empty: "No confirmed bookings yet. Once we confirm a trip, it will show here.",
    seeTripRequests: "See trip requests",
    customItinerary: "Custom itinerary",
    travel: "Travel",
    travellers: "travellers",
  },
  ja: {
    title: "予約済みの旅",
    description: "スタッフが確定した旅の一覧です。",
    empty: "確定した予約はまだありません。旅が確定すると、ここに表示されます。",
    seeTripRequests: "旅行リクエストを見る",
    customItinerary: "カスタムプラン",
    travel: "旅行期間",
    travellers: "名",
  },
};

export const Route = createFileRoute("/_authenticated/dashboard/bookings")({
  component: () => <BookingsPage locale="en" />,
});

export function BookingsPage({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
  const { user } = useAuth();
  const { data: trips } = useSuspenseQuery(myTripRequestsQueryOptions(user?.id ?? null));
  const bookings = trips.filter((t) => t.status === "confirmed" || (t.status as string) === "completed");

  return (
    <DashboardPage title={c.title} description={c.description}>
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">{c.empty}</p>
          <LocaleLink to="/dashboard/trip-requests" className="btn-outline mt-4 inline-block">{c.seeTripRequests}</LocaleLink>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((t) => (
            <article key={t.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {t.destinations.length > 0 ? t.destinations.join(", ") : c.customItinerary}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.travel_start && `${c.travel}: ${new Date(t.travel_start).toLocaleDateString()}`}
                    {t.travel_end && ` – ${new Date(t.travel_end).toLocaleDateString()}`}
                    {t.group_size && ` • ${t.group_size} ${c.travellers}`}
                  </p>
                </div>
                <StatusBadge status={t.status} locale={locale} />
              </div>
            </article>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
