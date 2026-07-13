import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES_BY_CATEGORY } from "@/data/services";
import heroFujiAsset from "@/assets/hero-fuji.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Japan Travel Services — DMC, MICE, Transport, Concierge | Nippon Tours" },
      { name: "description", content: "Full destination management services in Japan: FIT, MICE, corporate travel, educational tours, chauffeur, car rental, hotel and restaurant concierge." },
      { property: "og:title", content: "Japan Travel Services | Nippon Tours" },
      { property: "og:description", content: "Destination management, transport and concierge services for travellers, agents and corporate clients across Japan." },
      { property: "og:url", content: "https://nippon-tours.com/services" },
    ],
    links: [
  {
    rel: "canonical",
    href: "https://nippon-tours.com/services",
  },
],
  }),
  component: ServicesIndex,
});

const CATEGORY_ORDER = ["Travel", "Business", "Transport", "Concierge"] as const;

function ServicesIndex() {
  return (
    <>
      <PageHero
        label="Services"
        title="Every service, one accountable partner"
        subtitle="From an airport transfer to a 2,000-delegate incentive, we handle Japan end-to-end — with the same team and the same standards."
        image={heroFujiAsset}
      />
      {CATEGORY_ORDER.map((cat) => {
        const items = SERVICES_BY_CATEGORY[cat] ?? [];
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mx-auto max-w-7xl px-6 py-14">
            <SectionHeading label={cat} title={`${cat} services`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group block h-full rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-accent">
                      {s.name}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {s.intro}
                    </p>
                    <span className="mt-5 inline-block text-sm font-semibold text-accent">
                      Learn more →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
      <CTABand />
    </>
  );
}
