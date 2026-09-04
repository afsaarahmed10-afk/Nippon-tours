import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Phone, Clock, MapPin } from "lucide-react";
import { SITE, GLOBAL_OFFICES, GLOBAL_OFFICES_JA } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { InquiryForm } from "@/components/site/InquiryForm";
import type { Locale } from "@/i18n";
import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
const tokyoImg = tokyoImgAsset;

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  whatsapp: string;
  whatsappNote: string;
  email: string;
  phone: string;
  phoneNote: string;
  responseTime: string;
  sendInquiry: string;
  headOfficeLabel: string;
  headOfficeTitle: string;
  viewLargerMap: string;
  globalOfficesLabel: string;
  globalOfficesTitle: string;
}> = {
  en: {
    label: "Contact",
    title: "Talk to a human who's been there",
    subtitle: "No call centres, no scripts. Just travel designers who live in Japan and answer fast.",
    whatsapp: "WhatsApp (fastest)",
    whatsappNote: "usually replies in minutes",
    email: "Email",
    phone: "Phone",
    phoneNote: "(English & Japanese)",
    responseTime: "Average first response: under 1 hour, 7 days a week.",
    sendInquiry: "Send an inquiry",
    headOfficeLabel: "Head Office",
    headOfficeTitle: "Reach us in Tokyo",
    viewLargerMap: "View larger map →",
    globalOfficesLabel: "Global Offices",
    globalOfficesTitle: "Our offices around the world",
  },
  ja: {
    label: "お問い合わせ",
    title: "現地を知り尽くしたスタッフと直接お話しください",
    subtitle: "コールセンターも決まり文句もありません。日本在住の旅行デザイナーが迅速にお答えします。",
    whatsapp: "WhatsApp（最速）",
    whatsappNote: "通常数分以内に返信",
    email: "メール",
    phone: "電話",
    phoneNote: "（英語・日本語対応）",
    responseTime: "平均初回返信時間：1時間以内、年中無休。",
    sendInquiry: "お問い合わせを送る",
    headOfficeLabel: "本社",
    headOfficeTitle: "東京オフィスへのご連絡",
    viewLargerMap: "大きな地図を見る →",
    globalOfficesLabel: "海外オフィス",
    globalOfficesTitle: "世界各地のオフィス",
  },
};

export const contactHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "Nippon Toursへのお問い合わせ | 日本旅行のプランニング",
          description: "日本旅行の専門家に無料相談。あなただけの完璧な日本旅行プランをデザインします。",
          path: "/contact",
          locale: "ja",
        }
      : {
          title: "Contact Nippon Tours | Plan Your Japan Trip",
          description:
            "Contact our Japan travel experts for a free consultation. We'll help you design your perfect Japan itinerary.",
          path: "/contact",
          locale: "en",
        },
  );

export const Route = createFileRoute("/contact")({
  head: () => contactHead("en"),
  component: () => <ContactPage locale="en" />,
});

export function ContactPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const offices = locale === "ja" ? GLOBAL_OFFICES_JA : GLOBAL_OFFICES;
  return (
    <>
      <PageHero label={c.label} title={c.title} subtitle={c.subtitle} image={tokyoImg} />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        <Reveal className="space-y-5">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="card-lift flex items-center gap-4 rounded-3xl bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><MessageCircle className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block font-bold">{c.whatsapp}</span>
              <span className="block truncate text-sm text-muted-foreground">{SITE.phoneDisplay} — {c.whatsappNote}</span>
            </span>
          </a>
          <a href={`mailto:${SITE.email}`} className="card-lift flex items-center gap-4 rounded-3xl bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Mail className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block font-bold">{c.email}</span>
              <span className="block truncate text-sm text-muted-foreground">{SITE.email}</span>
            </span>
          </a>
          <a href={`tel:${SITE.phoneDisplay.replace(/[^+\d]/g, "")}`} className="card-lift flex items-center gap-4 rounded-3xl bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Phone className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block font-bold">{c.phone}</span>
              <span className="block truncate text-sm text-muted-foreground">{SITE.phoneDisplay} {c.phoneNote}</span>
            </span>
          </a>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-accent" /> {c.responseTime}
          </p>
        </Reveal>
        <Reveal delay={120} className="rounded-3xl bg-card p-8 shadow-lg">
          <h2 className="font-display text-xl font-semibold">{c.sendInquiry}</h2>
          <div className="mt-5">
            <InquiryForm context="contact" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal className="overflow-hidden rounded-3xl bg-card shadow-lg">
          <div className="flex flex-col gap-1 border-b border-border px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">{c.headOfficeLabel}</p>
              <h2 className="mt-1 font-display text-xl font-semibold">{c.headOfficeTitle}</h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nippon+Tours+Tokyo+Japan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline"
            >
              {c.viewLargerMap}
            </a>
          </div>
          <div className="relative aspect-[16/9] w-full bg-muted sm:aspect-[21/9]">
            <iframe
              title="Nippon Tours office location on Google Maps"
              src="https://www.google.com/maps?q=Nippon+Tours+Tokyo+Japan&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">{c.globalOfficesLabel}</p>
          <h2 className="mt-1 font-display text-xl font-semibold">{c.globalOfficesTitle}</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {offices.map((office) => (
            <Reveal key={office.title} className="card-lift flex items-start gap-4 rounded-3xl bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><MapPin className="h-6 w-6" /></span>
              <span className="min-w-0">
                <span className="block font-bold">{office.title}</span>
                {office.company && <span className="mt-0.5 block text-sm text-muted-foreground">{office.company}</span>}
                <span className="mt-1 block whitespace-pre-line text-sm text-muted-foreground">{office.address}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
