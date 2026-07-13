import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Nippon Tours" },
      { name: "description", content: "Booking terms and conditions for Nippon Tours — bookings, payments, cancellations and traveller responsibilities." },
      { property: "og:title", content: "Terms & Conditions — Nippon Tours" },
      { property: "og:description", content: "Booking terms and conditions for Nippon Tours travel services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero label="Legal" title="Terms & Conditions" subtitle="Booking terms for travel services provided by Nippon Tours." />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-lg max-w-none text-foreground">
          <p className="text-sm text-muted-foreground">Last updated: January 2026</p>

          <h2 className="mt-8 font-display text-2xl font-semibold">1. Bookings</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Bookings are confirmed once we send a written confirmation and receive your deposit. Prices are quoted in
            Japanese Yen (¥) unless stated otherwise and are subject to availability at the time of booking.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">2. Payments</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            A deposit is required to confirm most bookings, with the balance payable 30 days before departure. We accept
            Visa, Mastercard, Amex, PayPal and bank transfer.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">3. Cancellations & refunds</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Most tours may be cancelled free of charge up to 14 days before departure. Peak-season and luxury bookings
            may have stricter terms, which we disclose in writing before payment. Third-party charges (rail passes,
            non-refundable hotels) follow their own supplier terms.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">4. Changes</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Minor itinerary changes are frequently possible; we will always propose alternatives if a supplier cancels.
            Additional costs due to changes made after confirmation are the traveller's responsibility.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">5. Travel insurance</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Comprehensive travel insurance covering medical care, cancellation and personal belongings is strongly
            recommended and, for some tours, mandatory.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">6. Traveller responsibilities</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Travellers are responsible for valid passports, visas, health requirements and respectful behaviour during
            all activities. Nippon Tours may withdraw services from any traveller behaving disrespectfully towards
            staff, guides or third parties, without refund.
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">7. Liability</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Nippon Tours acts as a booking agent for hotels, transport and activity providers, whose own terms apply.
            We are not liable for delays, closures or acts beyond our reasonable control (weather, transport strikes,
            natural events).
          </p>

          <h2 className="mt-8 font-display text-2xl font-semibold">8. Contact</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Questions about these terms? Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-accent underline">{SITE.email}</a> or call{" "}
            {SITE.phoneDisplay}.
          </p>
        </div>
      </section>
    </>
  );
}
