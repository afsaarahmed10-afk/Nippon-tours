import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Check, MessageCircle, Mail } from "lucide-react";
import { PageHero, SectionHeading, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { serviceBySlug, SERVICES } from "@/data/services";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Service not found — Nippon Tours" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: [
        { title: loaderData.seoTitle },
        { name: "description", content: loaderData.seoDescription },
        { property: "og:title", content: loaderData.seoTitle },
        { property: "og:description", content: loaderData.seoDescription },
        { property: "og:image", content: loaderData.hero },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.seoTitle },
        { name: "twitter:description", content: loaderData.seoDescription },
        { name: "twitter:image", content: loaderData.hero },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: faqJsonLd(loaderData.faqs),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: loaderData.name,
            description: loaderData.seoDescription,
            provider: { "@type": "TravelAgency", name: "Nippon Tours" },
            areaServed: { "@type": "Country", name: "Japan" },
          }),
        },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServicePage,
});

function ServiceNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">Service not found</h1>
      <p className="mt-3 text-muted-foreground">This service isn't in our catalogue.</p>
      <Link to="/services" className="btn-accent mt-6 inline-block">See all services</Link>
    </div>
  );
}

function ServicePage() {
  const service = Route.useLoaderData();
  const related = SERVICES.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);
  return (
    <>
      <PageHero
        label={service.category}
        title={service.headline}
        subtitle={service.intro}
        image={service.hero}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/plan-my-trip" className="btn-accent">Send an inquiry</Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-light">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a href={`mailto:${SITE.email}`} className="btn-light">
            <Mail className="h-4 w-4" /> Email
          </a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading label="What sets it apart" title="Why travellers choose us" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((b: { title: string; desc: string }, i: number) => (
            <Reveal key={b.title} delay={(i % 3) * 80} className="rounded-3xl bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading label="Included" title="What's included" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item: string) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading center label="FAQs" title="Common questions" />
        <Reveal className="mt-8">
          <FAQList faqs={service.faqs} />
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading label="Also relevant" title={`More ${service.category.toLowerCase()} services`} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group block rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-semibold group-hover:text-accent">{s.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
