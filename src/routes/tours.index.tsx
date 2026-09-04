import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { LocaleLink } from "@/components/site/LocaleLink";
import { toursQueryOptions, destinationsQueryOptions } from "@/lib/queries";
import { seo } from "@/lib/seo";
import { useCommon, type Locale } from "@/i18n";
import type { Tour } from "@/lib/db-types";
import heroFuji from "@/assets/hero-fuji.jpg";

const CATS = ["All", "Private", "Group", "Luxury", "Seasonal"] as const;
const HERO = heroFuji;

const COPY: Record<Locale, {
  heroLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  filterAria: string;
  allTours: string;
  categorySuffix: (c: string) => string;
  searchSr: string;
  searchPlaceholder: string;
  destinationSr: string;
  allDestinations: string;
  durationSr: string;
  durations: { value: "any" | "short" | "mid" | "long"; label: string }[];
  sortSr: string;
  sorts: { value: "popular" | "price-asc" | "price-desc" | "duration-asc" | "duration-desc"; label: string }[];
  showing: (filtered: number, total: number) => string;
  noMatch: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
}> = {
  en: {
    heroLabel: "Tours",
    heroTitle: "Journeys refined over 4,800 departures",
    heroSubtitle: "Every tour below has been walked, eaten and slept by our own team. Filter by style — or let us build one just for you.",
    filterAria: "Filter tours by category",
    allTours: "All tours",
    categorySuffix: (c) => `${c} tours`,
    searchSr: "Search tours",
    searchPlaceholder: "Search tours…",
    destinationSr: "Destination",
    allDestinations: "All destinations",
    durationSr: "Duration",
    durations: [
      { value: "any", label: "Any length" },
      { value: "short", label: "1–3 days" },
      { value: "mid", label: "4–7 days" },
      { value: "long", label: "8+ days" },
    ],
    sortSr: "Sort by",
    sorts: [
      { value: "popular", label: "Most popular" },
      { value: "price-asc", label: "Price: low to high" },
      { value: "price-desc", label: "Price: high to low" },
      { value: "duration-asc", label: "Duration: shortest first" },
      { value: "duration-desc", label: "Duration: longest first" },
    ],
    showing: (filtered, total) => `Showing ${filtered} of ${total} tours. All prices in Japanese Yen (¥).`,
    noMatch: "No tours match your filters. Try broadening your search.",
    ctaTitle: "Don't see your perfect trip?",
    ctaBody: "Most of our guests travel on fully custom itineraries. Tell us your dates, pace and obsessions — we'll design around them.",
    ctaButton: "Build a custom itinerary",
  },
  ja: {
    heroLabel: "ツアー",
    heroTitle: "4,800回以上の催行で磨き上げた旅程",
    heroSubtitle: "以下のツアーはすべて、私たちのチーム自身が実際に歩き、味わい、宿泊して作り上げたものです。スタイルで絞り込むか、あなただけの旅程をオーダーメイドでお作りします。",
    filterAria: "カテゴリでツアーを絞り込む",
    allTours: "すべてのツアー",
    categorySuffix: (c) => `${c}ツアー`,
    searchSr: "ツアーを検索",
    searchPlaceholder: "ツアーを検索…",
    destinationSr: "目的地",
    allDestinations: "すべての目的地",
    durationSr: "日数",
    durations: [
      { value: "any", label: "日数を問わない" },
      { value: "short", label: "1〜3日間" },
      { value: "mid", label: "4〜7日間" },
      { value: "long", label: "8日間以上" },
    ],
    sortSr: "並び替え",
    sorts: [
      { value: "popular", label: "人気順" },
      { value: "price-asc", label: "価格が安い順" },
      { value: "price-desc", label: "価格が高い順" },
      { value: "duration-asc", label: "日数が短い順" },
      { value: "duration-desc", label: "日数が長い順" },
    ],
    showing: (filtered, total) => `${total}件中 ${filtered}件を表示中。価格は全て日本円（¥）表記です。`,
    noMatch: "条件に一致するツアーが見つかりませんでした。検索条件を広げてお試しください。",
    ctaTitle: "理想の旅が見つかりませんか？",
    ctaBody: "多くのお客様は完全オーダーメイドの旅程をご利用です。ご希望の日程・ペース・こだわりをお聞かせください。あなただけの旅をデザインします。",
    ctaButton: "オーダーメイドの旅程を作る",
  },
};

const CATEGORY_LABEL: Record<Locale, Record<(typeof CATS)[number], string>> = {
  en: { All: "All", Private: "Private", Group: "Group", Luxury: "Luxury", Seasonal: "Seasonal" },
  ja: { All: "すべて", Private: "プライベート", Group: "グループ", Luxury: "ラグジュアリー", Seasonal: "季節限定" },
};

export const toursIndexHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "日本ツアー・パッケージ一覧：プライベート・グループ・ラグジュアリー | Nippon Tours",
          description: "厳選された日本ツアーを豊富にご用意。プライベートガイドツアー、少人数グループツアー、高級旅館の旅、桜・紅葉の季節限定ツアーまで。価格は日本円表記。",
          path: "/tours",
          locale: "ja",
        }
      : {
          title: "Japan Tours & Packages: Private, Group, Luxury | Nippon Tours",
          description: "Browse expertly crafted Japan tours — private guided tours, small group tours, luxury ryokan journeys and seasonal cherry blossom & autumn tours. Prices in JPY.",
          path: "/tours",
          locale: "en",
        },
  );

export const toursIndexLoader = ({ context, locale = "en" as Locale }: { context: { queryClient: import("@tanstack/react-query").QueryClient }; locale?: Locale }) => {
  context.queryClient.ensureQueryData(toursQueryOptions(locale));
  context.queryClient.ensureQueryData(destinationsQueryOptions());
};

export const Route = createFileRoute("/tours/")({
  loader: ({ context }) => toursIndexLoader({ context, locale: "en" }),
  head: () => toursIndexHead("en"),
  component: () => <ToursPage locale="en" />,
});

export function ToursPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const t = useCommon();
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [destinationId, setDestinationId] = useState<string>("all");
  const [duration, setDuration] = useState<(typeof c.durations)[number]["value"]>("any");
  const [sort, setSort] = useState<(typeof c.sorts)[number]["value"]>("popular");
  const [q, setQ] = useState("");

  const { data: tours } = useSuspenseQuery(toursQueryOptions(locale));
  const { data: destinations } = useSuspenseQuery(destinationsQueryOptions());

  const filtered: Tour[] = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = tours.slice();
    if (cat !== "All") list = list.filter((tr) => tr.category === cat);
    if (destinationId !== "all") list = list.filter((tr) => tr.destination_id === destinationId);
    if (duration !== "any") {
      list = list.filter((tr) => {
        if (duration === "short") return tr.days <= 3;
        if (duration === "mid") return tr.days >= 4 && tr.days <= 7;
        return tr.days >= 8;
      });
    }
    if (query) {
      list = list.filter((tr) =>
        (tr.title + " " + (tr.summary ?? "") + " " + (tr.tags ?? []).join(" "))
          .toLowerCase()
          .includes(query),
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "duration-asc":
        list.sort((a, b) => a.days - b.days);
        break;
      case "duration-desc":
        list.sort((a, b) => b.days - a.days);
        break;
      case "popular":
      default:
        list.sort((a, b) => b.rating * b.reviews_count - a.rating * a.reviews_count);
    }
    return list;
  }, [tours, cat, destinationId, duration, sort, q]);

  return (
    <>
      <PageHero label={c.heroLabel} title={c.heroTitle} subtitle={c.heroSubtitle} image={HERO} />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={c.filterAria}>
          {CATS.map((cg) => (
            <button
              key={cg}
              role="tab"
              aria-selected={cat === cg}
              onClick={() => setCat(cg)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                cat === cg ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {cg === "All" ? c.allTours : c.categorySuffix(CATEGORY_LABEL[locale][cg])}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 rounded-3xl bg-secondary p-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="relative sm:col-span-2 lg:col-span-1">
            <span className="sr-only">{c.searchSr}</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={c.searchPlaceholder}
              className="w-full rounded-full border border-border bg-card px-9 py-2.5 text-sm focus:border-accent focus:outline-none"
            />
          </label>

          <label className="text-sm">
            <span className="sr-only">{c.destinationSr}</span>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
            >
              <option value="all">{c.allDestinations}</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="sr-only">{c.durationSr}</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value as (typeof c.durations)[number]["value"])}
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
            >
              {c.durations.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="sr-only">{c.sortSr}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof c.sorts)[number]["value"])}
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
            >
              {c.sorts.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{c.showing(filtered.length, tours.length)}</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tr, i) => (
            <Reveal key={tr.slug} delay={(i % 3) * 80}>
              <TourCard tour={tr} priority={i < 3} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">{c.noMatch}</p>
        )}
        <Reveal className="mt-14 rounded-3xl bg-ink p-8 text-center text-ink-foreground sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{c.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-foreground/70">{c.ctaBody}</p>
          <LocaleLink to="/plan-my-trip" className="btn-accent mt-6">{c.ctaButton}</LocaleLink>
        </Reveal>
      </section>
      <CTABand />
    </>
  );
}
