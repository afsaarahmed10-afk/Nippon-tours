import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star, Clock, Users, Check, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading, CTABand } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { LocaleLink } from "@/components/site/LocaleLink";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tourBySlugQueryOptions } from "@/lib/queries";
import { formatJPY } from "@/lib/utils";
import { type Locale } from "@/i18n";

const COPY: Record<Locale, {
  notFoundTitle: string;
  notFoundBody: string;
  allTours: string;
  home: string;
  tours: string;
  day: string;
  days: string;
  reviews: string;
  theExperience: string;
  dayByDay: string;
  whatsIncluded: string;
  from: string;
  perPerson: string;
  freeCancellation: string;
  noPayment: string;
  securePayment: string;
  makeItYoursLabel: string;
  makeItYoursTitle: string;
  makeItYoursSubtitle: string;
  customiseThisTrip: string;
}> = {
  en: {
    notFoundTitle: "Tour not found",
    notFoundBody: "It may have been renamed — browse all our tours instead.",
    allTours: "All tours",
    home: "Home",
    tours: "Tours",
    day: "day",
    days: "days",
    reviews: "reviews",
    theExperience: "The experience",
    dayByDay: "Day by day",
    whatsIncluded: "What's included",
    from: "From",
    perPerson: "/person",
    freeCancellation: "Free cancellation up to 14 days before",
    noPayment: "No payment until itinerary approved",
    securePayment: "Secure payment · Visa, MC, Amex, PayPal",
    makeItYoursLabel: "Make it yours",
    makeItYoursTitle: "Every tour can be customised",
    makeItYoursSubtitle: "Dates, hotels, pace, dietary needs — this itinerary is a starting point, not a cage.",
    customiseThisTrip: "Customise this trip",
  },
  ja: {
    notFoundTitle: "ツアーが見つかりません",
    notFoundBody: "URLが変更された可能性があります。他のツアーをご覧ください。",
    allTours: "すべてのツアー",
    home: "ホーム",
    tours: "ツアー",
    day: "日間",
    days: "日間",
    reviews: "件のレビュー",
    theExperience: "旅の体験",
    dayByDay: "日程表",
    whatsIncluded: "含まれるもの",
    from: "料金",
    perPerson: "／名",
    freeCancellation: "出発14日前までキャンセル無料",
    noPayment: "旅程確定までお支払い不要",
    securePayment: "安全なお支払い方法：Visa、MC、Amex、PayPal",
    makeItYoursLabel: "自分だけの旅に",
    makeItYoursTitle: "すべてのツアーはカスタマイズ可能です",
    makeItYoursSubtitle: "日程、ホテル、旅のペース、食事の制限など——この旅程はあくまで出発点です。",
    customiseThisTrip: "このツアーをカスタマイズする",
  },
};

export const tourLoader = async ({ params, context, locale = "en" as Locale }: { params: { slug: string }; context: { queryClient: import("@tanstack/react-query").QueryClient }; locale?: Locale }) => {
  const tour = await context.queryClient.ensureQueryData(tourBySlugQueryOptions(params.slug, locale));
  if (!tour) throw notFound();
  return { tour };
};

export const tourHead = (locale: Locale, params: { slug: string }, loaderData: { tour: import("@/lib/db-types").Tour } | undefined) => {
  if (!loaderData) {
    return { meta: [{ title: "Tour not found — Nippon Tours" }, { name: "robots", content: "noindex" }] };
  }
  const { tour } = loaderData;
  const title = tour.seo_title || `${tour.title} — ${tour.days}-Day Japan Tour | Nippon Tours`;
  const description =
    tour.seo_description ||
    tour.summary?.slice(0, 155) ||
    `${tour.title} — a ${tour.days}-day ${tour.category ?? "Japan"} tour with licensed local guides.`;
  const canonicalPath = `/tours/${params.slug}`;
  const url = locale === "ja" ? `/ja${canonicalPath}` : canonicalPath;
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
          inLanguage: locale,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: locale === "ja" ? "/ja" : "/" },
            { "@type": "ListItem", position: 2, name: "Tours", item: locale === "ja" ? "/ja/tours" : "/tours" },
            { "@type": "ListItem", position: 3, name: tour.title, item: url },
          ],
        }),
      },
    ],
  };
};

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params, context }) => tourLoader({ params, context, locale: "en" }),
  head: ({ params, loaderData }) => tourHead("en", params, loaderData),
  notFoundComponent: () => <TourNotFound locale="en" />,
  component: () => <TourPage locale="en" />,
});

export function TourNotFound({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">{c.notFoundTitle}</h1>
      <p className="mt-3 text-muted-foreground">{c.notFoundBody}</p>
      <LocaleLink to="/tours" className="btn-accent mt-6">{c.allTours}</LocaleLink>
    </div>
  );
}

export function TourPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const { slug } = Route.useParams();
  const { data: tour } = useSuspenseQuery(tourBySlugQueryOptions(slug, locale));
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
            <LocaleLink to="/" className="hover:text-white">{c.home}</LocaleLink> /{" "}
            <LocaleLink to="/tours" className="hover:text-white">{c.tours}</LocaleLink> /{" "}
            <span className="text-white">{tour.title}</span>
          </nav>
          <p className="section-label animate-hero-1 mt-4 !text-white/90">{tour.category} tour</p>
          <h1 className="animate-hero-2 mt-2 max-w-3xl font-display text-3xl font-semibold text-white sm:text-5xl">
            {tour.title}
          </h1>
          <div className="animate-hero-3 mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold text-gold" /> <strong>{Number(tour.rating).toFixed(1)}</strong> ({tour.reviews_count} {c.reviews})
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {tour.days} {tour.days === 1 ? c.day : c.days}
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
            <h2 className="font-display text-2xl font-semibold">{c.theExperience}</h2>
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
              <h2 className="font-display text-2xl font-semibold">{c.dayByDay}</h2>
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
              <h2 className="font-display text-2xl font-semibold">{c.whatsIncluded}</h2>
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
            <p className="text-sm text-muted-foreground">{c.from}</p>
            <p className="font-display text-4xl font-semibold">
              {formatJPY(tour.price)}
              <span className="text-base font-normal text-muted-foreground"> {c.perPerson}</span>
            </p>
            <div className="mt-5">
              <InquiryForm compact context={`tour-${tour.slug}`} />
            </div>
            <ul className="mt-5 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> {c.freeCancellation}</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> {c.noPayment}</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> {c.securePayment}</li>
            </ul>
          </Reveal>
        </aside>
      </section>

      <section className="bg-secondary py-14">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeading center label={c.makeItYoursLabel} title={c.makeItYoursTitle} subtitle={c.makeItYoursSubtitle} />
          <Reveal className="mt-6">
            <LocaleLink to="/plan-my-trip" className="btn-accent">{c.customiseThisTrip}</LocaleLink>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
