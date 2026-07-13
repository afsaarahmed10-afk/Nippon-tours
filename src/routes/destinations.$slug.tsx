import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, CloudSun, Lightbulb, MapPin } from "lucide-react";
import { getDestination, type Destination } from "@/data/destinations";
import { Reveal } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { SectionHeading, CTABand } from "@/components/site/PageHero";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { InquiryForm } from "@/components/site/InquiryForm";
import { toursQueryOptions } from "@/lib/queries";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params, context }) => {
    const dest = getDestination(params.slug);
    if (!dest) throw notFound();
    context.queryClient.ensureQueryData(toursQueryOptions());
    return { dest };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Destination not found" }, { name: "robots", content: "noindex" }] };
    const { dest } = loaderData;
    return {
      meta: [
        { title: `${dest.name} Travel Guide & Tours | Nippon Tours` },
        { name: "description", content: `${dest.tagline}. Things to do, best time to visit, travel tips and expert-guided tours in ${dest.name}.` },
        { property: "og:title", content: `${dest.name} Travel Guide & Tours | Nippon Tours` },
        { property: "og:description", content: dest.tagline },
        { property: "og:url", content: `/destinations/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/destinations/${params.slug}` }],
      scripts: [
        { type: "application/ld+json", children: faqJsonLd(dest.faqs) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Destinations", item: "/destinations" },
              { "@type": "ListItem", position: 3, name: dest.name, item: `/destinations/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">Destination not found</h1>
      <p className="mt-3 text-muted-foreground">It may have moved — explore all our destinations instead.</p>
      <Link to="/destinations" className="btn-accent mt-6">All destinations</Link>
    </div>
  ),
  component: DestinationPage,
});

function DestinationPage() {
  const { dest } = Route.useLoaderData() as { dest: Destination };
  const { data: allTours } = useSuspenseQuery(toursQueryOptions());
  const related = allTours.filter((t) => dest.relatedTours.includes(t.slug));


  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pt-28 pb-14">
        <img src={dest.image} alt={`${dest.name} — ${dest.tagline}`} width={1920} height={1080} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="animate-hero-1 text-sm text-white/70">
            <Link to="/" className="hover:text-white">Home</Link> / <Link to="/destinations" className="hover:text-white">Destinations</Link> / <span className="text-white">{dest.name}</span>
          </nav>
          <p className="section-label animate-hero-1 mt-4 inline-flex items-center gap-1 !text-white/90"><MapPin className="h-3.5 w-3.5" /> {dest.region}</p>
          <h1 className="animate-hero-2 mt-2 font-display text-4xl font-semibold text-white sm:text-6xl">{dest.name}</h1>
          <p className="animate-hero-3 mt-4 max-w-2xl text-lg text-white/85">{dest.tagline}</p>
          <div className="animate-hero-3 mt-6 flex flex-wrap gap-3">
            <Link to="/plan-my-trip" className="btn-accent">Plan a {dest.name} trip</Link>
            <Link to="/tours" className="btn-light">See related tours</Link>
          </div>
        </div>
      </section>

      {/* Intro + facts */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold">Why {dest.name}?</h2>
          {dest.description.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-relaxed text-muted-foreground">{p}</p>
          ))}
          <h3 className="mt-8 font-display text-xl font-semibold">Highlights</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {dest.highlights.map((h) => (
              <li key={h} className="rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold">{h}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="space-y-4 self-start">
          <div className="rounded-3xl bg-card p-6 shadow-sm">
            <p className="inline-flex items-center gap-2 font-bold"><Calendar className="h-4 w-4 text-accent" /> Best time to visit</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dest.bestTime}</p>
            <p className="mt-4 inline-flex items-center gap-2 font-bold"><CloudSun className="h-4 w-4 text-accent" /> Weather</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dest.weather}</p>
          </div>
          <div className="rounded-3xl bg-ink p-6 text-ink-foreground">
            <p className="font-display text-lg font-semibold">Thinking about {dest.name}?</p>
            <p className="mt-2 text-sm text-ink-foreground/70">Get a free draft itinerary within 48 hours.</p>
            <div className="mt-4">
              <InquiryForm compact dark context={`destination-${dest.slug}`} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Things to do */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading label="Experiences" title={`Things to do in ${dest.name}`} />
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
        <SectionHeading label="Insider knowledge" title="Travel tips from our guides" />
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
            <SectionHeading label="Tours" title={`Tours featuring ${dest.name}`} />
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
        <SectionHeading center label="FAQs" title={`${dest.name} questions, answered`} />
        <Reveal className="mt-8">
          <FAQList faqs={dest.faqs} />
        </Reveal>
      </section>

      <CTABand title={`Ready for ${dest.name}?`} />
    </>
  );
}
