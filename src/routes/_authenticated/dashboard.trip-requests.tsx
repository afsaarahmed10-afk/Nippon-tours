import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { LocaleLink } from "@/components/site/LocaleLink";
import { myTripRequestsQueryOptions } from "@/lib/customer-queries";
import { useLocale, type Locale } from "@/i18n";
import { StatusBadge } from "./dashboard.index";

const COPY: Record<Locale, {
  title: string;
  description: string;
  newRequest: string;
  empty: string;
  planYourTrip: string;
  customItinerary: string;
  submitted: string;
  travelling: string;
  travellers: string;
  tours: string;
}> = {
  en: {
    title: "My Trip Requests",
    description: "Every Plan My Trip request you've submitted, with live status.",
    newRequest: "New request",
    empty: "You haven't submitted any trip requests yet.",
    planYourTrip: "Plan your trip",
    customItinerary: "Custom itinerary",
    submitted: "Submitted",
    travelling: "travelling",
    travellers: "travellers",
    tours: "Tours:",
  },
  ja: {
    title: "旅行リクエスト",
    description: "これまでに送信したすべての「旅行プランを立てる」リクエストと、その最新ステータスです。",
    newRequest: "新規リクエスト",
    empty: "まだ旅行リクエストを送信していません。",
    planYourTrip: "旅行プランを立てる",
    customItinerary: "カスタムプラン",
    submitted: "送信日",
    travelling: "旅行日",
    travellers: "名",
    tours: "ツアー：",
  },
};

export const Route = createFileRoute("/_authenticated/dashboard/trip-requests")({
  component: TripRequestsPage,
});

export function TripRequestsPage() {
  const { user } = useAuth();
  const locale = useLocale();
  const c = COPY[locale];
  const { data: trips } = useSuspenseQuery(myTripRequestsQueryOptions(user?.id ?? null));

  return (
    <DashboardPage
      title={c.title}
      description={c.description}
      action={<LocaleLink to="/plan-my-trip" className="btn-accent">{c.newRequest}</LocaleLink>}
    >
      {trips.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">{c.empty}</p>
          <LocaleLink to="/plan-my-trip" className="btn-accent mt-4 inline-block">{c.planYourTrip}</LocaleLink>
        </div>
      ) : (
        <div className="space-y-3">
          {trips.map((t) => (
            <article key={t.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-semibold">
                    {t.destinations.length > 0 ? t.destinations.join(", ") : c.customItinerary}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.submitted} {new Date(t.created_at).toLocaleDateString()}
                    {t.travel_start && ` • ${c.travelling} ${new Date(t.travel_start).toLocaleDateString()}`}
                    {t.group_size && ` • ${t.group_size} ${c.travellers}`}
                    {t.budget && ` • ${t.budget}`}
                  </p>
                </div>
                <StatusBadge status={t.status} />
              </div>
              {t.tours.length > 0 && (
                <p className="mt-3 text-sm"><span className="font-semibold">{c.tours}</span> {t.tours.join(", ")}</p>
              )}
              {t.message && <p className="mt-2 text-sm text-muted-foreground">"{t.message}"</p>}
            </article>
          ))}
        </div>
      )}
    </DashboardPage>
  );
}
