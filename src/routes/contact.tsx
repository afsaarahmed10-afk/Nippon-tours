import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, Phone, Clock, MapPin } from "lucide-react";
import { SITE, GLOBAL_OFFICES } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { InquiryForm } from "@/components/site/InquiryForm";
import tokyoImgAsset from "@/assets/dest-tokyo.jpg";
const tokyoImg = tokyoImgAsset;
export const Route = createFileRoute("/contact")({
  head: () =>
  seo({
    title: "Contact Nippon Tours | Plan Your Japan Trip",
    description:
      "Contact our Japan travel experts for a free consultation. We'll help you design your perfect Japan itinerary.",
    path: "/contact",
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to a human who's been there"
        subtitle="No call centres, no scripts. Just travel designers who live in Japan and answer fast."
        image={tokyoImg}
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        <Reveal className="space-y-5">
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="card-lift flex items-center gap-4 rounded-3xl bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground"><MessageCircle className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block font-bold">WhatsApp (fastest)</span>
              <span className="block truncate text-sm text-muted-foreground">{SITE.phoneDisplay} — usually replies in minutes</span>
            </span>
          </a>
          <a href={`mailto:${SITE.email}`} className="card-lift flex items-center gap-4 rounded-3xl bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Mail className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block font-bold">Email</span>
              <span className="block truncate text-sm text-muted-foreground">{SITE.email}</span>
            </span>
          </a>
          <a href={`tel:${SITE.phoneDisplay.replace(/[^+\d]/g, "")}`} className="card-lift flex items-center gap-4 rounded-3xl bg-card p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Phone className="h-6 w-6" /></span>
            <span className="min-w-0">
              <span className="block font-bold">Phone</span>
              <span className="block truncate text-sm text-muted-foreground">{SITE.phoneDisplay} (English & Japanese)</span>
            </span>
          </a>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-accent" /> Average first response: under 1 hour, 7 days a week.
          </p>
        </Reveal>
        <Reveal delay={120} className="rounded-3xl bg-card p-8 shadow-lg">
          <h2 className="font-display text-xl font-semibold">Send an inquiry</h2>
          <div className="mt-5">
            <InquiryForm context="contact" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal className="overflow-hidden rounded-3xl bg-card shadow-lg">
          <div className="flex flex-col gap-1 border-b border-border px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-accent">Head Office</p>
              <h2 className="mt-1 font-display text-xl font-semibold">Reach us in Tokyo</h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nippon+Tours+Tokyo+Japan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline"
            >
              View larger map →
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
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Global Offices</p>
          <h2 className="mt-1 font-display text-xl font-semibold">Our offices around the world</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {GLOBAL_OFFICES.map((office) => (
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

