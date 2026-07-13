import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { getGuide, type Guide } from "@/data/guides";
import { Reveal } from "@/components/site/Reveal";
import { CTABand } from "@/components/site/PageHero";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/travel-guides/$slug")({
  loader: ({ params }) => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Guide not found" }, { name: "robots", content: "noindex" }] };
    const { guide } = loaderData;
    return {
      meta: [
        { title: guide.metaTitle },
        { name: "description", content: guide.description },
        { property: "og:title", content: guide.metaTitle },
        { property: "og:description", content: guide.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/travel-guides/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/travel-guides/${params.slug}` }],
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
            mainEntityOfPage: `/travel-guides/${params.slug}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Travel Guides", item: "/travel-guides" },
              { "@type": "ListItem", position: 3, name: guide.title, item: `/travel-guides/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">Guide not found</h1>
      <Link to="/travel-guides" className="btn-accent mt-6">All travel guides</Link>
    </div>
  ),
  component: GuidePage,
});

function GuidePage() {
  const { guide } = Route.useLoaderData() as { guide: Guide };

  return (
    <>
      <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink pt-28 pb-14">
        <img src={guide.image} alt={guide.title} width={1920} height={1080} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-6">
          <nav aria-label="Breadcrumb" className="animate-hero-1 text-sm text-white/70">
            <Link to="/" className="hover:text-white">Home</Link> / <Link to="/travel-guides" className="hover:text-white">Travel Guides</Link>
          </nav>
          <h1 className="animate-hero-2 mt-4 font-display text-3xl font-semibold text-white sm:text-5xl">{guide.title}</h1>
          <p className="animate-hero-3 mt-4 inline-flex items-center gap-1.5 text-sm text-white/80">
            <Clock className="h-4 w-4" /> {guide.readTime} · By the Nippon Tours team
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
            <p className="font-display text-lg font-semibold">Let us handle all of this</p>
            <p className="mt-2 text-sm text-ink-foreground/70">
              Free consultation, personalised itinerary, zero pressure.
            </p>
            <div className="mt-4">
              <InquiryForm compact dark context={`guide-${guide.slug}`} />
            </div>
          </Reveal>
          <Reveal className="rounded-3xl bg-secondary p-6 text-sm">
            <p className="font-bold">More guides</p>
            <ul className="mt-3 space-y-2">
              <li><Link className="text-accent hover:underline" to="/travel-guides/$slug" params={{ slug: "best-time-to-visit-japan" }}>Best time to visit Japan</Link></li>
              <li><Link className="text-accent hover:underline" to="/travel-guides/$slug" params={{ slug: "7-day-japan-itinerary" }}>The perfect 7-day itinerary</Link></li>
              <li><Link className="text-accent hover:underline" to="/travel-guides/$slug" params={{ slug: "jr-pass-guide" }}>JR Pass guide</Link></li>
            </ul>
          </Reveal>
        </aside>
      </article>

      <CTABand />
    </>
  );
}
