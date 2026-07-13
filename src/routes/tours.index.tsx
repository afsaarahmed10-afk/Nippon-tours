import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { toursQueryOptions, destinationsQueryOptions } from "@/lib/queries";
import type { Tour } from "@/lib/db-types";
import heroFuji from "@/assets/hero-fuji.jpg";

const CATS = ["All", "Private", "Group", "Luxury", "Seasonal"] as const;
const DURATIONS = [
  { value: "any", label: "Any length" },
  { value: "short", label: "1–3 days" },
  { value: "mid", label: "4–7 days" },
  { value: "long", label: "8+ days" },
] as const;
const SORTS = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "duration-asc", label: "Duration: shortest first" },
  { value: "duration-desc", label: "Duration: longest first" },
] as const;

const HERO = heroFuji;

export const Route = createFileRoute("/tours/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(toursQueryOptions());
    context.queryClient.ensureQueryData(destinationsQueryOptions());
  },
  head: () => ({
    meta: [
      { title: "Japan Tours & Packages: Private, Group, Luxury | Nippon Tours" },
      { name: "description", content: "Browse expertly crafted Japan tours — private guided tours, small group tours, luxury ryokan journeys and seasonal cherry blossom & autumn tours. Prices in JPY." },
      { property: "og:title", content: "Japan Tours & Packages | Nippon Tours" },
      { property: "og:description", content: "Private, group, luxury and seasonal Japan tours with licensed local guides." },
      { property: "og:url", content: "/tours" },
    ],
    links: [{ rel: "canonical", href: "/tours" }],
  }),
  component: ToursPage,
});

function ToursPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [destinationId, setDestinationId] = useState<string>("all");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]["value"]>("any");
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("popular");
  const [q, setQ] = useState("");

  const { data: tours } = useSuspenseQuery(toursQueryOptions());
  const { data: destinations } = useSuspenseQuery(destinationsQueryOptions());

  const filtered: Tour[] = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = tours.slice();
    if (cat !== "All") list = list.filter((t) => t.category === cat);
    if (destinationId !== "all") list = list.filter((t) => t.destination_id === destinationId);
    if (duration !== "any") {
      list = list.filter((t) => {
        if (duration === "short") return t.days <= 3;
        if (duration === "mid") return t.days >= 4 && t.days <= 7;
        return t.days >= 8;
      });
    }
    if (query) {
      list = list.filter((t) =>
        (t.title + " " + (t.summary ?? "") + " " + (t.tags ?? []).join(" "))
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
      <PageHero
        label="Tours"
        title="Journeys refined over 4,800 departures"
        subtitle="Every tour below has been walked, eaten and slept by our own team. Filter by style — or let us build one just for you."
        image={HERO}
      />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter tours by category">
          {CATS.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                cat === c ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {c === "All" ? "All tours" : `${c} tours`}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 rounded-3xl bg-secondary p-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="relative sm:col-span-2 lg:col-span-1">
            <span className="sr-only">Search tours</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tours…"
              className="w-full rounded-full border border-border bg-card px-9 py-2.5 text-sm focus:border-accent focus:outline-none"
            />
          </label>

          <label className="text-sm">
            <span className="sr-only">Destination</span>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
            >
              <option value="all">All destinations</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="sr-only">Duration</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value as (typeof DURATIONS)[number]["value"])}
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
            >
              {DURATIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORTS)[number]["value"])}
              className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {tours.length} tours. All prices in Japanese Yen (¥).
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 80}>
              <TourCard tour={t} priority={i < 3} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">No tours match your filters. Try broadening your search.</p>
        )}
        <Reveal className="mt-14 rounded-3xl bg-ink p-8 text-center text-ink-foreground sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Don't see your perfect trip?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-foreground/70">
            Most of our guests travel on fully custom itineraries. Tell us your dates, pace and obsessions — we'll design around them.
          </p>
          <Link to="/plan-my-trip" className="btn-accent mt-6">Build a custom itinerary</Link>
        </Reveal>
      </section>
      <CTABand />
    </>
  );
}
