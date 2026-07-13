import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star, Clock, Users, Check, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading, CTABand } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tourBySlugQueryOptions } from "@/lib/queries";
import { formatJPY } from "@/lib/utils";

export const Route = createFileRoute("/tours/$slug")({
  loader: async ({ params, context }) => {
    const tour = await context.queryClient.ensureQueryData(tourBySlugQueryOptions(params.slug));
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tour not found — Nippon Tours" }, { name: "robots", content: "noindex" }] };
    }
    const { tour } = loaderData;
    const title = tour.seo_title || `${tour.title} — ${tour.days}-Day Japan Tour | Nippon Tours`;
    const description =
      tour.seo_description ||
      tour.summary?.slice(0, 155) ||
      `${tour.title} — a ${tour.days}-day ${tour.category ?? "Japan"} tour with licensed local guides.`;
    const url = `/tours/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(tour.image ? [{ property: "og:image", content: tour.image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(tour.image ? [{ name: "twitter:image", content: tour.image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: tour.title,
            description,
            image: tour.image,
            touristType: tour.category,
            offers: tour.price
              ? { "@type": "Offer", price: tour.price, priceCurrency: "JPY", availability: "https://schema.org/InStock" }
              : undefined,
            aggregateRating:
              tour.rating && tour.reviews_count
                ? { "@type": "AggregateRating", ratingValue: tour.rating, reviewCount: tour.reviews_count }
                : undefined,
            provider: { "@type": "TravelAgency", name: "Nippon Tours" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Tours", item: "/tours" },
              { "@type": "ListItem", position: 3, name: tour.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">Tour not found</h1>
      <p className="mt-3 text-muted-foreground">It may have been renamed — browse all our tours instead.</p>
      <Link to="/tours" className="btn-accent mt-6">All tours</Link>
    </div>
  ),
  component: TourPage,
});

function TourPage() {
  const { slug } = Route.useParams();
  const { data: tour } = useSuspenseQuery(tourBySlugQueryOptions(slug));
  if (!tour) return null;

  return (
    <>
      <section className="relative flex min-h-[56vh] items-end overflow-hidden bg-ink pt-28 pb-14">
        {tour.image && (
          <img
            src={tour.image}
            alt={tour.title}
            width={1920}
            height={1080}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="animate-hero-1 text-sm text-white/70">
            <Link to="/" className="hover:text-white">Home</Link> /{" "}
            <Link to="/tours" className="hover:text-white">Tours</Link> /{" "}
            <span className="text-white">{tour.title}</span>
          </nav>
          <p className="section-label animate-hero-1 mt-4 !text-white/90">{tour.category} tour</p>
          <h1 className="animate-hero-2 mt-2 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
            {tour.title}
          </h1>
          <div className="animate-hero-3 mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" /> <strong>{Number(tour.rating).toFixed(1)}</strong> ({tour.reviews_count} reviews)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {tour.days} {tour.days === 1 ? "day" : "days"}
            </span>
            {tour.group_size && (
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {tour.group_size}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">The experience</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{tour.summary}</p>
            {tour.highlights?.length > 0 && (
              <ul className="mt-6 space-y-3">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed">
                    <Check className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" /> {h}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          {tour.itinerary?.length > 0 && (
            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Day by day</h2>
              <Accordion type="single" collapsible className="mt-4" defaultValue="day-0">
                {tour.itinerary.map((d, i) => (
                  <AccordionItem key={i} value={`day-${i}`}>
                    <AccordionTrigger className="text-left">
                      <span>
                        <span className="mr-3 font-bold text-accent">{d.day}</span>
                        <span className="font-semibold">{d.title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">{d.desc}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          )}

          {tour.includes?.length > 0 && (
            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold">What's included</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tour.includes.map((inc) => (
                  <li key={inc} className="flex gap-2.5 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold">
                    <Check className="h-4 w-4 shrink-0 self-center text-accent" aria-hidden="true" /> {inc}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <aside className="self-start lg:sticky lg:top-28">
          <Reveal className="rounded-3xl bg-card p-7 shadow-lg">
            <p className="text-sm text-muted-foreground">From</p>
            <p className="font-display text-4xl font-semibold">
              {formatJPY(tour.price)}
              <span className="text-base font-normal text-muted-foreground"> /person</span>
            </p>
            <div className="mt-5">
              <InquiryForm compact context={`tour-${tour.slug}`} />
            </div>
            <ul className="mt-5 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Free cancellation up to 14 days before</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> No payment until itinerary approved</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Secure payment · Visa, MC, Amex, PayPal</li>
            </ul>
          </Reveal>
        </aside>
      </section>

      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeading center label="Make it yours" title="Every tour can be customised" subtitle="Dates, hotels, pace, dietary needs — this itinerary is a starting point, not a cage." />
          <Reveal className="mt-6">
            <Link to="/plan-my-trip" className="btn-accent">Customise this trip</Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
