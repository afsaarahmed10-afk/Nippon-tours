import { createFileRoute, notFound, useLoaderData } from "@tanstack/react-router";
import { Check, MessageCircle, Mail } from "lucide-react";
import { PageHero, SectionHeading, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { LocaleLink } from "@/components/site/LocaleLink";
import { serviceBySlug, SERVICES, localizeService, CATEGORY_LABEL, type ServicePage } from "@/data/services";
import { SITE } from "@/data/site";
import { type Locale } from "@/i18n";

const COPY: Record<Locale, {
  notFoundTitle: string;
  notFoundBody: string;
  allServices: string;
  sendInquiry: string;
  whatsapp: string;
  email: string;
  whySetsApart: string;
  whyChooseUs: string;
  included: string;
  whatsIncluded: string;
  faqsLabel: string;
  commonQuestions: string;
  alsoRelevant: (category: string) => string;
  moreServices: (category: string) => string;
}> = {
  en: {
    notFoundTitle: "Service not found",
    notFoundBody: "This service isn't in our catalogue.",
    allServices: "See all services",
    sendInquiry: "Send an inquiry",
    whatsapp: "WhatsApp",
    email: "Email",
    whySetsApart: "What sets it apart",
    whyChooseUs: "Why travellers choose us",
    included: "Included",
    whatsIncluded: "What's included",
    faqsLabel: "FAQs",
    commonQuestions: "Common questions",
    alsoRelevant: (category) => `Also relevant`,
    moreServices: (category) => `More ${category.toLowerCase()} services`,
  },
  ja: {
    notFoundTitle: "サービスが見つかりません",
    notFoundBody: "このサービスは掲載されていません。",
    allServices: "すべてのサービスを見る",
    sendInquiry: "お問い合わせ",
    whatsapp: "WhatsApp",
    email: "メール",
    whySetsApart: "選ばれる理由",
    whyChooseUs: "私たちが選ばれる理由",
    included: "含まれるもの",
    whatsIncluded: "含まれるもの",
    faqsLabel: "よくある質問",
    commonQuestions: "よくあるご質問",
    alsoRelevant: () => `関連サービス`,
    moreServices: (category) => `他の${category}サービス`,
  },
};

export const serviceLoader = ({ params }: { params: { slug: string } }) => {
  const service = serviceBySlug(params.slug);
  if (!service) throw notFound();
  return service;
};

export const serviceHead = (locale: Locale, params: { slug: string }, loaderData: ServicePage | undefined) => {
  if (!loaderData) {
    return {
      meta: [{ title: "Service not found — Nippon Tours" }, { name: "robots", content: "noindex" }],
    };
  }
  const service = localizeService(loaderData, locale);
  const canonicalPath = `/services/${params.slug}`;
  const url = locale === "ja" ? `/ja${canonicalPath}` : canonicalPath;
  return {
    meta: [
      { title: service.seoTitle },
      { name: "description", content: service.seoDescription },
      { property: "og:title", content: service.seoTitle },
      { property: "og:description", content: service.seoDescription },
      { property: "og:image", content: service.hero },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: service.seoTitle },
      { name: "twitter:description", content: service.seoDescription },
      { name: "twitter:image", content: service.hero },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: faqJsonLd(service.faqs),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.seoDescription,
          provider: { "@type": "TravelAgency", name: "Nippon Tours" },
          areaServed: { "@type": "Country", name: "Japan" },
          inLanguage: locale,
        }),
      },
    ],
  };
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => serviceLoader({ params }),
  head: ({ params, loaderData }) => serviceHead("en", params, loaderData),
  notFoundComponent: () => <ServiceNotFound locale="en" />,
  component: () => <ServicePage locale="en" />,
});

export function ServiceNotFound({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <div className="mx-auto max-w-2xl px-6 py-40 text-center">
      <h1 className="font-display text-3xl font-semibold">{c.notFoundTitle}</h1>
      <p className="mt-3 text-muted-foreground">{c.notFoundBody}</p>
      <LocaleLink to="/services" className="btn-accent mt-6 inline-block">{c.allServices}</LocaleLink>
    </div>
  );
}

export function ServicePage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const rawService = useLoaderData({ strict: false }) as ServicePage;
  const service = localizeService(rawService, locale);
  const related = SERVICES.filter((s) => s.slug !== service.slug && s.category === service.category)
    .map((s) => localizeService(s, locale))
    .slice(0, 3);
  const categoryLabel = CATEGORY_LABEL[locale][service.category];

  return (
    <>
      <PageHero
        label={categoryLabel}
        title={service.headline}
        subtitle={service.intro}
        image={service.hero}
      >
        <div className="flex flex-wrap gap-3">
          <LocaleLink to="/plan-my-trip" className="btn-accent">{c.sendInquiry}</LocaleLink>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-light">
            <MessageCircle className="h-4 w-4" /> {c.whatsapp}
          </a>
          <a href={`mailto:${SITE.email}`} className="btn-light">
            <Mail className="h-4 w-4" /> {c.email}
          </a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading label={c.whySetsApart} title={c.whyChooseUs} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 80} className="rounded-3xl bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading label={c.included} title={c.whatsIncluded} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-card p-4 shadow-sm">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <SectionHeading center label={c.faqsLabel} title={c.commonQuestions} />
        <Reveal className="mt-8">
          <FAQList faqs={service.faqs} />
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading label={c.alsoRelevant(categoryLabel)} title={c.moreServices(categoryLabel)} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <LocaleLink
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group block rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-semibold group-hover:text-accent">{s.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.intro}</p>
                </LocaleLink>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
