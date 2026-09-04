import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/data/site";
import type { Locale } from "@/i18n";

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  s1Heading: string;
  s1Body: string;
  s2Heading: string;
  s2Body: string;
  s3Heading: string;
  s3Body: string;
  s4Heading: string;
  s4Body: string;
  s5Heading: string;
  s5Body: string;
  s6Heading: string;
  s6Body: string;
  s7Heading: string;
  s7Body: string;
  s8Heading: string;
  s8Before: string;
  s8Mid: string;
  s8After: string;
}> = {
  en: {
    label: "Legal",
    title: "Terms & Conditions",
    subtitle: "Booking terms for travel services provided by Nippon Tours.",
    lastUpdated: "Last updated: January 2026",
    s1Heading: "1. Bookings",
    s1Body:
      "Bookings are confirmed once we send a written confirmation and receive your deposit. Prices are quoted in Japanese Yen (¥) unless stated otherwise and are subject to availability at the time of booking.",
    s2Heading: "2. Payments",
    s2Body:
      "A deposit is required to confirm most bookings, with the balance payable 30 days before departure. We accept Visa, Mastercard, Amex, PayPal and bank transfer.",
    s3Heading: "3. Cancellations & refunds",
    s3Body:
      "Most tours may be cancelled free of charge up to 14 days before departure. Peak-season and luxury bookings may have stricter terms, which we disclose in writing before payment. Third-party charges (rail passes, non-refundable hotels) follow their own supplier terms.",
    s4Heading: "4. Changes",
    s4Body:
      "Minor itinerary changes are frequently possible; we will always propose alternatives if a supplier cancels. Additional costs due to changes made after confirmation are the traveller's responsibility.",
    s5Heading: "5. Travel insurance",
    s5Body:
      "Comprehensive travel insurance covering medical care, cancellation and personal belongings is strongly recommended and, for some tours, mandatory.",
    s6Heading: "6. Traveller responsibilities",
    s6Body:
      "Travellers are responsible for valid passports, visas, health requirements and respectful behaviour during all activities. Nippon Tours may withdraw services from any traveller behaving disrespectfully towards staff, guides or third parties, without refund.",
    s7Heading: "7. Liability",
    s7Body:
      "Nippon Tours acts as a booking agent for hotels, transport and activity providers, whose own terms apply. We are not liable for delays, closures or acts beyond our reasonable control (weather, transport strikes, natural events).",
    s8Heading: "8. Contact",
    s8Before: "Questions about these terms? Email ",
    s8Mid: " or call ",
    s8After: ".",
  },
  ja: {
    label: "法的情報",
    title: "利用規約",
    subtitle: "Nippon Toursが提供する旅行サービスのご予約条件について。",
    lastUpdated: "最終更新日：2026年1月",
    s1Heading: "1. ご予約",
    s1Body:
      "ご予約は、当社より書面での確認をお送りし、デポジットをお受け取りした時点で確定します。価格は特に記載のない限り日本円（¥）で表示され、ご予約時点での空き状況によって変動します。",
    s2Heading: "2. お支払い",
    s2Body:
      "ほとんどのご予約確定にはデポジットのお支払いが必要で、残額は出発の30日前までにお支払いいただきます。Visa、Mastercard、Amex、PayPal、銀行振込に対応しています。",
    s3Heading: "3. キャンセルおよび返金",
    s3Body:
      "ほとんどのツアーは出発の14日前まで無料でキャンセル可能です。繁忙期やラグジュアリーのご予約にはより厳格な条件が適用される場合があり、その際はお支払い前に書面にてご案内いたします。第三者による費用（鉄道パス、返金不可のホテルなど）は、それぞれのサプライヤーの規約に従います。",
    s4Heading: "4. 変更について",
    s4Body:
      "軽微な旅程の変更は多くの場合可能です。サプライヤー側の都合でキャンセルとなった場合は、必ず代替案をご提案いたします。ご予約確定後の変更に伴う追加費用は旅行者様のご負担となります。",
    s5Heading: "5. 海外旅行保険",
    s5Body:
      "医療費、キャンセル、携行品を補償する総合的な海外旅行保険へのご加入を強くお勧めします。一部のツアーではご加入が必須となります。",
    s6Heading: "6. 旅行者の責任",
    s6Body:
      "旅行者様は、有効なパスポート、ビザ、健康上の要件、および全アクティビティにおける節度ある行動について、ご自身で責任を負うものとします。スタッフ、ガイド、または第三者に対して無礼な行動をとる旅行者様に対し、Nippon Toursは返金なしにサービスの提供を中止する場合があります。",
    s7Heading: "7. 責任について",
    s7Body:
      "Nippon Toursはホテル、交通機関、アクティビティ提供事業者の予約代理店として機能しており、各事業者独自の規約が適用されます。天候、交通機関のストライキ、自然災害など、当社の合理的な管理の及ばない事由による遅延、休業、その他の事象について、当社は責任を負いません。",
    s8Heading: "8. お問い合わせ",
    s8Before: "本規約についてご質問がございましたら、",
    s8Mid: "までメールでご連絡いただくか、",
    s8After: "までお電話ください。",
  },
};

export const termsHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "利用規約 — Nippon Tours",
          description: "Nippon Toursのご予約条件——ご予約、お支払い、キャンセル、旅行者様の責任について。",
          path: "/terms",
          locale: "ja",
        }
      : {
          title: "Terms & Conditions — Nippon Tours",
          description: "Booking terms and conditions for Nippon Tours — bookings, payments, cancellations and traveller responsibilities.",
          path: "/terms",
          locale: "en",
        },
  );

export const Route = createFileRoute("/terms")({
  head: () => termsHead("en"),
  component: () => <TermsPage locale="en" />,
});

export function TermsPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-sm text-muted-foreground">{c.lastUpdated}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s1Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.s1Body}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s2Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.s2Body}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s3Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.s3Body}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s4Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.s4Body}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s5Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.s5Body}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s6Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.s6Body}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s7Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{c.s7Body}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s8Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {c.s8Before}
            <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>
            {c.s8Mid}
            {SITE.phoneDisplay}
            {c.s8After}
          </p>
        </div>
      </section>
    </>
  );
}
