import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Nippon Tours" },
      { name: "description", content: "How Nippon Tours collects, uses and protects your personal information when you plan a trip with us." },
      { property: "og:title", content: "Privacy Policy — Nippon Tours" },
      { property: "og:description", content: "How Nippon Tours handles your personal information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy Policy" subtitle="How we collect, use and protect your information." />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-sm text-muted-foreground">Last updated: January 2026</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">Who we are</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Nippon Tours is a licensed Japanese destination management company. This policy explains what data we
            collect when you request a trip, correspond with us, or use our website, and how we handle it.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">Information we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Contact details you provide (name, email, phone, country) when submitting an inquiry.</li>
            <li>Trip details (dates, group size, interests, preferences) needed to plan your itinerary.</li>
            <li>Payment details processed by our payment providers — we do not store card numbers ourselves.</li>
            <li>Basic technical data (browser, device, IP address) via anonymised website analytics.</li>
          </ul>

          <h2 className="mt-8 font-display text-2xl font-semibold">How we use your information</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Prepare, deliver and operate the travel services you request.</li>
            <li>Communicate with you about your booking, itinerary and support requests.</li>
            <li>Share the minimum information required with hotels, guides, drivers and partners.</li>
            <li>Comply with legal and regulatory obligations in Japan.</li>
          </ul>

          <h2 className="mt-8 font-display text-2xl font-semibold">Data sharing</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            We share only the information necessary with vetted travel suppliers to deliver your trip. We never sell your
            data. Payment information is handled by PCI-compliant processors.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">Your rights</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            You can request access to, correction of, or deletion of your personal data at any time by emailing{" "}
            <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a>.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">Contact</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Questions about this policy? Email us at{" "}
            <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a> or call{" "}
            {SITE.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
}
