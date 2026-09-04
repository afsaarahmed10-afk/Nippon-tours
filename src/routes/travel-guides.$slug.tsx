import { createFileRoute, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { getGuide, localizeGuide, type Guide } from "@/data/guides";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";
import { LocaleLink } from "@/components/site/LocaleLink";
import { seo } from "@/lib/seo";
import { type Locale } from "@/i18n";

const COPY: Record<Locale, {
  notFoundTitle: string;
  allGuides: string;
  home: string;
  travelGuides: string;
  byTeam: string;
  sidebarTitle: string;
  sidebarBody: string;
  moreGuides: string;
}> = {
  en: {
    notFoundTitle: "Guide not found",
    allGuides: "All travel guides",
    home: "Home",
    travelGuides: "Travel Guides",
    byTeam: "By the Nippon Tours team",
    sidebarTitle: "Let us handle all of this",
    sidebarBody: "Free consultation, personalised itinerary, zero pressure.",
    moreGuides: "More guides",
  },
  ja: {
    notFoundTitle: "ガイドが見つかりません",
    allGuides: "すべての旅行ガイドを見る",
    home: "ホーム",
    travelGuides: "旅行ガイド",
    byTeam: "Nippon Toursチームより",
    sidebarTitle: "すべてお任せください",
    sidebarBody: "無料相談、あなただけの旅程、しつこい勧誘は一切ありません。",
    moreGuides: "他のガイドも見る",
  },
};

const RELATED_SLUGS = ["best-time-to-visit-japan", "7-day-japan-itinerary", "jr-pass-guide"];

export const buildGuideHead = (locale: Locale, loaderData: { guide: Guide } | undefined, slug: string) => {
  if (!loaderData) return { meta: [{ title: "Guide not found" }, { name: "robots", content: "noindex" }] };
  const { guide } = loaderData;
  const path = `/travel-guides/${slug}`;
  const { title, meta, links } = seo({ title: guide.metaTitle, description: guide.description, path, locale });
  return {
    title,
    meta: [
      ...meta,
      { property: "og:type", content: "article" },
    ],
    links,
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          author: { "@type": "Organization", name: "Nippon Tours" },
          publisher: { "@type": "Organization", name: "Nippon Tours" },
          image: guide.image,
          mainEntityOfPage: path,
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
            { "@type": "ListItem", position: 2, name: "Travel Guides", item: locale === "ja" ? "/ja/travel-guides" : "/travel-guides" },
            { "@type": "ListItem", position: 3, name: guide.title, item: locale === "ja" ? `/ja${path}` : path },
          ],
        }),
      },
    ],
  };
};

export const guideLoader = ({ params }: { params: { slug: string } }) => {
  const guide = getGuide(params.slug);
  if (!guide) throw notFound();
  return { guide };
};

export const Route = createFileRoute("/travel-guides/$slug")({
  loader: ({ params }) => guideLoader({ params }),
  head: ({ loaderData, params }) => buildGuideHead("en", loaderData, params.slug),
  notFoundComponent: () => <GuideNotFound locale="en" />,
  component: () => <GuidePage locale="en" />,
});

export function GuideNotFound({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">{c.notFoundTitle}</h1>
      <LocaleLink to="/travel-guides" className="btn-accent mt-6">{c.allGuides}</LocaleLink>
    </div>
  );
}

export function GuidePage({ locale }: { locale: Locale }) {
  const { guide: rawGuide } = Route.useLoaderData() as { guide: Guide };
  const guide = localizeGuide(rawGuide, locale);
  const c = COPY[locale];
  const related = RELATED_SLUGS.filter((s) => s !== guide.slug)
    .map((s) => localizeGuide(getGuide(s)!, locale))
    .slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink pt-28 pb-14">
        <img src={guide.image} alt={guide.title} width={1920} height={1080} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-6">
          <nav aria-label="Breadcrumb" className="animate-hero-1 text-sm text-white/70">
            <LocaleLink to="/" className="hover:text-white">{c.home}</LocaleLink> / <LocaleLink to="/travel-guides" className="hover:text-white">{c.travelGuides}</LocaleLink>
          </nav>
          <h1 className="animate-hero-2 mt-4 font-display text-3xl font-semibold text-white sm:text-5xl">{guide.title}</h1>
          <p className="animate-hero-3 mt-4 inline-flex items-center gap-1.5 text-sm text-white/80">
            <Clock className="h-4 w-4" /> {guide.readTime} · {c.byTeam}
          </p>
        </div>
      </section>

      <article className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="prose-travel max-w-none">
          {guide.sections.map((s) => (
            <Reveal key={s.h2}>
              <h2 className="font-display font-semibold text-foreground">{s.h2}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          ))}
        </div>
        <aside className="space-y-4 self-start lg:sticky lg:top-28">
          <Reveal className="rounded-3xl bg-ink p-7 text-ink-foreground">
            <p className="font-display text-lg font-semibold">{c.sidebarTitle}</p>
            <p className="mt-2 text-sm text-ink-foreground/70">{c.sidebarBody}</p>
            <div className="mt-4">
              <InquiryForm compact dark context={`guide-${guide.slug}`} />
            </div>
          </Reveal>
          <Reveal className="rounded-3xl bg-secondary p-6 text-sm">
            <p className="font-bold">{c.moreGuides}</p>
            <ul className="mt-3 space-y-2">
              {related.map((g) => (
                <li key={g.slug}>
                  <LocaleLink className="text-accent hover:underline" to="/travel-guides/$slug" params={{ slug: g.slug }}>{g.title}</LocaleLink>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </article>

      <CTABand />
    </>
  );
}
