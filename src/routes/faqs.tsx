import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FAQList, faqJsonLd } from "@/components/site/FAQList";
import { LocaleLink } from "@/components/site/LocaleLink";
import { faqsQueryOptions } from "@/lib/queries";
import type { Locale } from "@/i18n";

const HERO = "/__l5e/assets-v1/4f621f19-07f8-4d8f-aaff-9b85534b1e90/dest-hakone.jpg";

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  emptyState: string;
  stillCurious: string;
}> = {
  en: {
    label: "FAQs",
    title: "Every question we've ever been asked",
    subtitle: "If yours isn't here, WhatsApp us — a human replies in minutes.",
    emptyState: "FAQs will appear here once your admin adds them.",
    stillCurious: "Still curious? Contact us",
  },
  ja: {
    label: "よくある質問",
    title: "これまでにお寄せいただいたすべてのご質問",
    subtitle: "こちらにない場合は、WhatsAppでお気軽にご連絡ください——数分以内にスタッフが返信します。",
    emptyState: "管理者がFAQを追加すると、ここに表示されます。",
    stillCurious: "他にも気になることがありますか？お問い合わせはこちら",
  },
};

export const faqsHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "日本ツアーのよくある質問：ご予約・ビザ・キャンセルについて | Nippon Tours",
          description:
            "日本ツアーのご予約に関するよくある質問への回答——お支払い、キャンセル、ビザ、食事制限、24時間の現地サポートについて。",
          path: "/faqs",
          locale: "ja",
        }
      : {
          title: "Japan Tour FAQs: Booking, Visas, Cancellation | Nippon Tours",
          description:
            "Answers to common questions about booking Japan tours — payments, cancellations, visas, dietary needs and 24/7 in-trip support.",
          path: "/faqs",
          locale: "en",
        },
  );

export const faqsLoader = ({ context, locale = "en" as Locale }: { context: { queryClient: import("@tanstack/react-query").QueryClient }; locale?: Locale }) => {
  context.queryClient.ensureQueryData(faqsQueryOptions(locale));
};

export const Route = createFileRoute("/faqs")({
  loader: ({ context }) => faqsLoader({ context, locale: "en" }),
  head: () => faqsHead("en"),
  component: () => <FAQsPage locale="en" />,
});

export function FAQsPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const { data: faqs } = useSuspenseQuery(faqsQueryOptions(locale));
  const legacyFaqs = faqs.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <>
      <PageHero
        label={c.label}
        title={c.title}
        subtitle={c.subtitle}
        image={HERO}
      />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <Reveal>
          {legacyFaqs.length > 0 ? (
            <FAQList faqs={legacyFaqs} />
          ) : (
            <p className="text-center text-muted-foreground">{c.emptyState}</p>
          )}
        </Reveal>
        <Reveal className="mt-10 text-center">
          <LocaleLink to="/contact" className="btn-accent">{c.stillCurious}</LocaleLink>
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
