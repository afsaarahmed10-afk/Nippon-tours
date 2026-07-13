import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { faqsQueryOptions } from "@/lib/queries";

const HERO = "/__l5e/assets-v1/4f621f19-07f8-4d8f-aaff-9b85534b1e90/dest-hakone.jpg";

export const Route = createFileRoute("/faqs")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(faqsQueryOptions());
  },
  head: () => ({
    meta: [
      { title: "Japan Tour FAQs: Booking, Visas, Cancellation | Nippon Tours" },
      { name: "description", content: "Answers to common questions about booking Japan tours — payments, cancellations, visas, dietary needs and 24/7 in-trip support." },
      { property: "og:title", content: "FAQs | Nippon Tours" },
      { property: "og:description", content: "Booking, payments, cancellations, visas and support — answered." },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
  }),
  component: FAQsPage,
});

function FAQsPage() {
  const { data: faqs } = useSuspenseQuery(faqsQueryOptions());
  const legacyFaqs = faqs.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <>
      <PageHero
        label="FAQs"
        title="Every question we've ever been asked"
        subtitle="If yours isn't here, WhatsApp us — a human replies in minutes."
        image={HERO}
      />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          {legacyFaqs.length > 0 ? (
            <FAQList faqs={legacyFaqs} />
          ) : (
            <p className="text-center text-muted-foreground">FAQs will appear here once your admin adds them.</p>
          )}
        </Reveal>
        <Reveal className="mt-10 text-center">
          <Link to="/contact" className="btn-accent">Still curious? Contact us</Link>
        </Reveal>
      </section>
      {legacyFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd(legacyFaqs) }}
        />
      )}
      <CTABand />
    </>
  );
}
