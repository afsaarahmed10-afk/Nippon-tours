import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { LocaleLink } from "@/components/site/LocaleLink";
import type { Locale } from "@/i18n";
import {
  myTripRequestsQueryOptions,
  mySavedToursQueryOptions,
  myNotificationsQueryOptions,
  myMessagesQueryOptions,
} from "@/lib/customer-queries";
import { ClipboardList, BookMarked, Heart, Bell, MessagesSquare } from "lucide-react";

const COPY: Record<Locale, {
  welcome: string;
  subtitle: string;
  planTrip: string;
  activeTrips: string;
  savedTours: string;
  favourites: string;
  notifications: string;
  messages: string;
  recentTripRequests: string;
  noTripRequests: string;
  planYourTrip: string;
  customTrip: string;
  submitted: string;
  travelling: string;
}> = {
  en: {
    welcome: "Welcome",
    subtitle: "Everything about your Japan trip in one place.",
    planTrip: "Plan a new trip",
    activeTrips: "Active trips",
    savedTours: "Saved tours",
    favourites: "Favourites",
    notifications: "Notifications",
    messages: "Messages",
    recentTripRequests: "Recent trip requests",
    noTripRequests: "You haven't submitted any trip requests yet.",
    planYourTrip: "Plan your trip →",
    customTrip: "Custom trip",
    submitted: "Submitted",
    travelling: "travelling",
  },
  ja: {
    welcome: "ようこそ",
    subtitle: "あなたの日本旅行に関するすべてを、ここでひとまとめに。",
    planTrip: "新しい旅行プランを立てる",
    activeTrips: "進行中のリクエスト",
    savedTours: "保存したツアー",
    favourites: "お気に入り",
    notifications: "通知",
    messages: "メッセージ",
    recentTripRequests: "最近の旅行リクエスト",
    noTripRequests: "まだ旅行リクエストを送信していません。",
    planYourTrip: "旅行プランを立てる →",
    customTrip: "カスタムプラン",
    submitted: "送信日",
    travelling: "旅行日",
  },
};

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: () => <DashboardHome locale="en" />,
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
    <LocaleLink to={to} className="card-lift rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-0.5 font-display text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </LocaleLink>
  );
}

export function DashboardHome({ locale = "en" }: { locale?: Locale }) {
  const c = COPY[locale];
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
      title={`${c.welcome}${user?.user_metadata?.full_name ? `, ${String(user.user_metadata.full_name).split(" ")[0]}` : ""}`}
      description={c.subtitle}
      action={<LocaleLink to="/plan-my-trip" className="btn-accent">{c.planTrip}</LocaleLink>}
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Stat label={c.activeTrips} value={activeTrips} icon={ClipboardList} to="/dashboard/trip-requests" />
        <Stat label={c.savedTours} value={saved.length - favs} icon={BookMarked} to="/dashboard/saved-tours" />
        <Stat label={c.favourites} value={favs} icon={Heart} to="/dashboard/favourites" />
        <Stat label={c.notifications} value={unread} icon={Bell} to="/dashboard/notifications" />
        <Stat label={c.messages} value={msgs.length} icon={MessagesSquare} to="/dashboard/messages" />
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">{c.recentTripRequests}</h2>
        {trips.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {c.noTripRequests}{" "}
            <LocaleLink to="/plan-my-trip" className="font-semibold text-accent hover:underline">
              {c.planYourTrip}
            </LocaleLink>
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {trips.slice(0, 5).map((t) => (
              <li key={t.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-semibold">{t.destinations.length > 0 ? t.destinations.join(", ") : c.customTrip}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.submitted} {new Date(t.created_at).toLocaleDateString()}
                    {t.travel_start && ` • ${c.travelling} ${new Date(t.travel_start).toLocaleDateString()}`}
                  </p>
                </div>
                <StatusBadge status={t.status} locale={locale} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </DashboardPage>
  );
}

const STATUS_MAP: Record<string, string> = {
  unread: "bg-secondary text-foreground",
  contacted: "bg-blue-100 text-blue-800",
  processing: "bg-amber-100 text-amber-800",
  confirmed: "bg-primary/10 text-primary",
  completed: "bg-emerald-100 text-emerald-800",
  closed: "bg-muted text-muted-foreground",
};

const STATUS_LABEL: Record<Locale, Record<string, string>> = {
  en: {
    unread: "Pending",
    contacted: "Contacted",
    processing: "Processing",
    confirmed: "Confirmed",
    completed: "Completed",
    closed: "Closed",
  },
  ja: {
    unread: "保留中",
    contacted: "連絡済み",
    processing: "対応中",
    confirmed: "確定済み",
    completed: "完了",
    closed: "終了",
  },
};

export function StatusBadge({ status, locale = "en" }: { status: string; locale?: Locale }) {
  const label = STATUS_LABEL[locale];
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_MAP[status] ?? "bg-muted"}`}>
      {label[status] ?? status}
    </span>
  );
}
