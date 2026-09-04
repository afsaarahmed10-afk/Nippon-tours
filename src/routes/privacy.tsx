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
  s2Items: string[];
  s3Heading: string;
  s3Items: string[];
  s4Heading: string;
  s4Body: string;
  s5Heading: string;
  s5Before: string;
  s5After: string;
  s6Heading: string;
  s6Before: string;
  s6Mid: string;
  s6After: string;
}> = {
  en: {
    label: "Legal",
    title: "Privacy Policy",
    subtitle: "How we collect, use and protect your information.",
    lastUpdated: "Last updated: January 2026",
    s1Heading: "Who we are",
    s1Body:
      "Nippon Tours is a licensed Japanese destination management company. This policy explains what data we collect when you request a trip, correspond with us, or use our website, and how we handle it.",
    s2Heading: "Information we collect",
    s2Items: [
      "Contact details you provide (name, email, phone, country) when submitting an inquiry.",
      "Trip details (dates, group size, interests, preferences) needed to plan your itinerary.",
      "Payment details processed by our payment providers — we do not store card numbers ourselves.",
      "Basic technical data (browser, device, IP address) via anonymised website analytics.",
    ],
    s3Heading: "How we use your information",
    s3Items: [
      "Prepare, deliver and operate the travel services you request.",
      "Communicate with you about your booking, itinerary and support requests.",
      "Share the minimum information required with hotels, guides, drivers and partners.",
      "Comply with legal and regulatory obligations in Japan.",
    ],
    s4Heading: "Data sharing",
    s4Body:
      "We share only the information necessary with vetted travel suppliers to deliver your trip. We never sell your data. Payment information is handled by PCI-compliant processors.",
    s5Heading: "Your rights",
    s5Before: "You can request access to, correction of, or deletion of your personal data at any time by emailing ",
    s5After: ".",
    s6Heading: "Contact",
    s6Before: "Questions about this policy? Email us at ",
    s6Mid: " or call ",
    s6After: ".",
  },
  ja: {
    label: "法的情報",
    title: "プライバシーポリシー",
    subtitle: "お客様の情報の収集、利用、保護の方法について。",
    lastUpdated: "最終更新日：2026年1月",
    s1Heading: "運営会社について",
    s1Body:
      "Nippon Toursは日本政府認可のデスティネーション・マネジメント・カンパニーです。本ポリシーでは、お客様が旅行をご依頼される際、当社とやり取りされる際、または当社ウェブサイトをご利用される際に収集するデータの内容と、その取り扱い方法について説明します。",
    s2Heading: "収集する情報",
    s2Items: [
      "お問い合わせ時にご提供いただく連絡先情報（お名前、メールアドレス、電話番号、国籍）。",
      "旅程の計画に必要な旅行の詳細（日程、人数、興味、ご希望内容）。",
      "決済代行会社が処理するお支払い情報——当社自体がカード番号を保存することはありません。",
      "匿名化されたウェブサイト解析による基本的な技術情報（ブラウザ、デバイス、IPアドレス）。",
    ],
    s3Heading: "情報の利用目的",
    s3Items: [
      "お客様がご依頼される旅行サービスの準備、提供、運営のため。",
      "ご予約、旅程、サポートのご依頼に関するご連絡のため。",
      "ホテル、ガイド、ドライバー、パートナー企業と必要最小限の情報を共有するため。",
      "日本国内の法令および規制上の義務を遵守するため。",
    ],
    s4Heading: "情報の共有について",
    s4Body:
      "お客様の旅行を実現するために、審査済みの旅行サプライヤーと必要な情報のみを共有します。お客様のデータを第三者に販売することは一切ありません。お支払い情報はPCI準拠の決済代行会社が取り扱います。",
    s5Heading: "お客様の権利",
    s5Before: "お客様の個人データへのアクセス、訂正、削除は、",
    s5After: "までいつでもご依頼いただけます。",
    s6Heading: "お問い合わせ",
    s6Before: "本ポリシーについてご質問がございましたら、",
    s6Mid: "までご連絡いただくか、",
    s6After: "までお電話ください。",
  },
};

export const privacyHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "プライバシーポリシー — Nippon Tours",
          description: "Nippon Toursが旅行のご依頼時にお客様の個人情報をどのように収集、利用、保護するかについて。",
          path: "/privacy",
          locale: "ja",
        }
      : {
          title: "Privacy Policy — Nippon Tours",
          description: "How Nippon Tours collects, uses and protects your personal information when you plan a trip with us.",
          path: "/privacy",
          locale: "en",
        },
  );

export const Route = createFileRoute("/privacy")({
  head: () => privacyHead("en"),
  component: () => <PrivacyPage locale="en" />,
});

export function PrivacyPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-sm text-muted-foreground">{c.lastUpdated}</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s1Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {c.s1Body}
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s2Heading}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            {c.s2Items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s3Heading}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            {c.s3Items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s4Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {c.s4Body}
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s5Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {c.s5Before}
            <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>
            {c.s5After}
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">{c.s6Heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {c.s6Before}
            <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>
            {c.s6Mid}
            {SITE.phoneDisplay}
            {c.s6After}
          </p>
        </div>
      </section>
    </>
  );
}
