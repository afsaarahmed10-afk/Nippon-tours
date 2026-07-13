import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHero, CTABand, SectionHeading } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { FAQList } from "@/components/site/FAQList";
import { toursQueryOptions } from "@/lib/queries";
import type { Tour } from "@/lib/db-types";

export function CategoryLanding({
  category,
  title,
  intro,
  image,
  benefits,
  faqs,
}: {
  category: Tour["category"];
  title: string;
  intro: string;
  image: string;
  benefits: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}) {
  const { data: allTours } = useSuspenseQuery(toursQueryOptions());
  const tours = allTours.filter((t) => t.category === category);

  return (
    <>
      <PageHero label={`${category} tours`} title={title} subtitle={intro} image={image} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading label="Our tours" title={`${category} tours we run`} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 90}>
              <TourCard tour={t} priority={i === 0} />
            </Reveal>
          ))}
        </div>
        {tours.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">No {category.toLowerCase()} tours published yet.</p>
        )}
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading label="Why this style" title={`Why travellers choose our ${category.toLowerCase()} tours`} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 90} className="rounded-3xl bg-card p-6 shadow-sm">
                <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading center label="FAQs" title="Common questions" />
        <Reveal className="mt-8">
          <FAQList faqs={faqs} />
        </Reveal>
        <Reveal className="mt-8 text-center">
          <Link to="/plan-my-trip" className="btn-accent">Start planning — it's free</Link>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}
