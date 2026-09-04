import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, CloudSun, Lightbulb, MapPin } from "lucide-react";
import { getDestination, localizeDestination, type Destination } from "@/data/destinations";
import { Reveal } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { SectionHeading, CTABand } from "@/components/site/PageHero";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { InquiryForm } from "@/components/site/InquiryForm";
import { LocaleLink } from "@/components/site/LocaleLink";
import { toursQueryOptions } from "@/lib/queries";
import { type Locale } from "@/i18n";

const COPY: Record<Locale, {
  notFoundTitle: string;
  notFoundBody: string;
  allDestinations: string;
  home: string;
  destinations: string;
  planTrip: (name: string) => string;
  seeRelatedTours: string;
  whyThis: (name: string) => string;
  highlights: string;
  bestTime: string;
  weather: string;
  thinkingAbout: (name: string) => string;
  itineraryIn48: string;
  experiencesLabel: string;
  thingsToDo: (name: string) => string;
  insiderKnowledge: string;
  travelTips: string;
  toursLabel: string;
  toursFeaturing: (name: string) => string;
  faqsLabel: string;
  questionsAnswered: (name: string) => string;
  readyFor: (name: string) => string;
}> = {
  en: {
    notFoundTitle: "Destination not found",
    notFoundBody: "It may have moved — explore all our destinations instead.",
    allDestinations: "All destinations",
    home: "Home",
    destinations: "Destinations",
    planTrip: (name) => `Plan a ${name} trip`,
    seeRelatedTours: "See related tours",
    whyThis: (name) => `Why ${name}?`,
    highlights: "Highlights",
    bestTime: "Best time to visit",
    weather: "Weather",
    thinkingAbout: (name) => `Thinking about ${name}?`,
    itineraryIn48: "Get a free draft itinerary within 48 hours.",
    experiencesLabel: "Experiences",
    thingsToDo: (name) => `Things to do in ${name}`,
    insiderKnowledge: "Insider knowledge",
    travelTips: "Travel tips from our guides",
    toursLabel: "Tours",
    toursFeaturing: (name) => `Tours featuring ${name}`,
    faqsLabel: "FAQs",
    questionsAnswered: (name) => `${name} questions, answered`,
    readyFor: (name) => `Ready for ${name}?`,
  },
  ja: {
    notFoundTitle: "目的地が見つかりません",
    notFoundBody: "URLが変更された可能性があります。他の目的地をご覧ください。",
    allDestinations: "すべての目的地を見る",
    home: "ホーム",
    destinations: "目的地",
    planTrip: (name) => `${name}の旅を計画する`,
    seeRelatedTours: "関連ツアーを見る",
    whyThis: (name) => `${name}の魅力`,
    highlights: "ハイライト",
    bestTime: "ベストシーズン",
    weather: "気候",
    thinkingAbout: (name) => `${name}への旅をお考えですか？`,
    itineraryIn48: "48時間以内に無料の旅程案をお届けします。",
    experiencesLabel: "体験",
    thingsToDo: (name) => `${name}でのおすすめアクティビティ`,
    insiderKnowledge: "現地の知恵",
    travelTips: "ガイドからの旅のアドバイス",
    toursLabel: "ツアー",
    toursFeaturing: (name) => `${name}を巡るツアー`,
    faqsLabel: "よくある質問",
    questionsAnswered: (name) => `${name}に関するご質問`,
    readyFor: (name) => `${name}への旅を始めましょう`,
  },
};

export const destinationLoader = ({ params, context }: { params: { slug: string }; context: { queryClient: import("@tanstack/react-query").QueryClient } }) => {
  const dest = getDestination(params.slug);
  if (!dest) throw notFound();
  context.queryClient.ensureQueryData(toursQueryOptions());
  return { dest };
};

export const destinationHead = (locale: Locale, params: { slug: string }, loaderData: { dest: Destination } | undefined) => {
  if (!loaderData) return { meta: [{ title: "Destination not found" }, { name: "robots", content: "noindex" }] };
  const dest = localizeDestination(loaderData.dest, locale);
  const canonicalPath = `/destinations/${params.slug}`;
  const url = locale === "ja" ? `/ja${canonicalPath}` : canonicalPath;
  return {
    meta: [
      { title: `${dest.name} Travel Guide & Tours | Nippon Tours` },
      { name: "description", content: `${dest.tagline}. Things to do, best time to visit, travel tips and expert-guided tours in ${dest.name}.` },
      { property: "og:title", content: `${dest.name} Travel Guide & Tours | Nippon Tours` },
      { property: "og:description", content: dest.tagline },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: faqJsonLd(dest.faqs) },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: locale === "ja" ? "/ja" : "/" },
            { "@type": "ListItem", position: 2, name: "Destinations", item: locale === "ja" ? "/ja/destinations" : "/destinations" },
            { "@type": "ListItem", position: 3, name: dest.name, item: url },
          ],
        }),
      },
    ],
  };
};

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params, context }) => destinationLoader({ params, context }),
  head: ({ loaderData, params }) => destinationHead("en", params, loaderData),
  notFoundComponent: () => <DestinationNotFound locale="en" />,
  component: () => <DestinationPage locale="en" />,
});

export function DestinationNotFound({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">{c.notFoundTitle}</h1>
      <p className="mt-3 text-muted-foreground">{c.notFoundBody}</p>
      <LocaleLink to="/destinations" className="btn-accent mt-6">{c.allDestinations}</LocaleLink>
    </div>
  );
}

export function DestinationPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const { dest: rawDest } = Route.useLoaderData() as { dest: Destination };
  const dest = localizeDestination(rawDest, locale);
  const { data: allTours } = useSuspenseQuery(toursQueryOptions(locale));
  const related = allTours.filter((t) => dest.relatedTours.includes(t.slug));

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pt-28 pb-14">
        <img src={dest.image} alt={`${dest.name} — ${dest.tagline}`} width={1920} height={1080} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="animate-hero-1 text-sm text-white/70">
            <LocaleLink to="/" className="hover:text-white">{c.home}</LocaleLink> / <LocaleLink to="/destinations" className="hover:text-white">{c.destinations}</LocaleLink> / <span className="text-white">{dest.name}</span>
          </nav>
          <p className="section-label animate-hero-1 mt-4 inline-flex items-center gap-1 !text-white/90"><MapPin className="h-3.5 w-3.5" /> {dest.region}</p>
          <h1 className="animate-hero-2 mt-2 font-display text-4xl font-semibold text-white sm:text-6xl">{dest.name}</h1>
          <p className="animate-hero-3 mt-4 max-w-2xl text-lg text-white/85">{dest.tagline}</p>
          <div className="animate-hero-3 mt-6 flex flex-wrap gap-3">
            <LocaleLink to="/plan-my-trip" className="btn-accent">{c.planTrip(dest.name)}</LocaleLink>
            <LocaleLink to="/tours" className="btn-light">{c.seeRelatedTours}</LocaleLink>
          </div>
        </div>
      </section>

      {/* Intro + facts */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold">{c.whyThis(dest.name)}</h2>
          {dest.description.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-relaxed text-muted-foreground">{p}</p>
          ))}
          <h3 className="mt-8 font-display text-xl font-semibold">{c.highlights}</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {dest.highlights.map((h) => (
              <li key={h} className="rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold">{h}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="space-y-4 self-start">
          <div className="rounded-3xl bg-card p-6 shadow-sm">
            <p className="inline-flex items-center gap-2 font-bold"><Calendar className="h-4 w-4 text-accent" /> {c.bestTime}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dest.bestTime}</p>
            <p className="mt-4 inline-flex items-center gap-2 font-bold"><CloudSun className="h-4 w-4 text-accent" /> {c.weather}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dest.weather}</p>
          </div>
          <div className="rounded-3xl bg-ink p-6 text-ink-foreground">
            <p className="font-display text-lg font-semibold">{c.thinkingAbout(dest.name)}</p>
            <p className="mt-2 text-sm text-ink-foreground/70">{c.itineraryIn48}</p>
            <div className="mt-4">
              <InquiryForm compact dark context={`destination-${dest.slug}`} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Things to do */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading label={c.experiencesLabel} title={c.thingsToDo(dest.name)} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dest.thingsToDo.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 90} className="card-lift rounded-3xl bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading label={c.insiderKnowledge} title={c.travelTips} />
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {dest.travelTips.map((tip, i) => (
            <Reveal as="li" key={i} delay={(i % 2) * 90} className="flex gap-3 rounded-2xl border border-border bg-card p-5">
              <Lightbulb className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-sm leading-relaxed text-foreground">{tip}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Related tours */}
      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading label={c.toursLabel} title={c.toursFeaturing(dest.name)} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t, i) => (
                <Reveal key={t.slug} delay={(i % 3) * 90}>
                  <TourCard tour={t} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading center label={c.faqsLabel} title={c.questionsAnswered(dest.name)} />
        <Reveal className="mt-8">
          <FAQList faqs={dest.faqs} />
        </Reveal>
      </section>

      <CTABand title={c.readyFor(dest.name)} />
    </>
  );
}
