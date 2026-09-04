import { Star, ShieldCheck, Clock, CreditCard, MessageCircle, Instagram, Facebook, Mail } from "lucide-react";
import { SITE } from "@/data/site";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LocaleLink } from "@/components/site/LocaleLink";
import { useCommon } from "@/i18n";
import logoAsset from "@/assets/nippon-tours-logo.png";


export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const t = useCommon();

  return (
    <footer className="bg-ink text-ink-foreground">
      {/* Newsletter / lead magnet */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold">{t.footer.newsletterTitle}</h2>
            <p className="mt-2 max-w-md text-sm text-ink-foreground/70">{t.footer.newsletterDesc}</p>
          </div>
          {subscribed ? (
            <p className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold">{t.footer.newsletterThanks}</p>
          ) : (
            <form
              className="flex w-full max-w-md gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email.includes("@")) return;
                const { error } = await supabase
                  .from("newsletter_subscribers")
                  .insert({ email: email.trim().toLowerCase(), source: "footer" });
                if (error && !String(error.message).toLowerCase().includes("duplicate")) {
                  toast.error(t.footer.newsletterError);
                  return;
                }
                setSubscribed(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                {t.footer.emailAddressSr}
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
              />
              <button type="submit" className="btn-accent shrink-0 !px-5">
                {t.footer.newsletterButton}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/95 shadow-sm">
              <img src={logoAsset} alt="" className="h-10 w-10 object-contain" loading="lazy" decoding="async" />
            </span>
            <p className="font-display text-xl font-semibold">Nippon Tours</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-foreground/70">{t.footer.companyBlurb}</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="flex text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="font-semibold">4.9</span>
            <span className="text-ink-foreground/60">{t.footer.ratingSuffix}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-ink-foreground/60">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> {t.footer.licensedOperator}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {t.footer.repliesWithin}</span>
            <span className="inline-flex items-center gap-1.5"><CreditCard className="h-4 w-4" /> {t.footer.securePayments}</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={SITE.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={`mailto:${SITE.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label={t.footer.exploreHeading}>
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">{t.footer.exploreHeading}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><LocaleLink to="/destinations" className="hover:text-accent">{t.nav.destinations}</LocaleLink></li>
            <li><LocaleLink to="/tours" className="hover:text-accent">{t.footer.allTours}</LocaleLink></li>
            <li><LocaleLink to="/private-tours" className="hover:text-accent">{t.footer.privateTours}</LocaleLink></li>
            <li><LocaleLink to="/group-tours" className="hover:text-accent">{t.footer.groupTours}</LocaleLink></li>
            <li><LocaleLink to="/luxury-tours" className="hover:text-accent">{t.footer.luxuryTours}</LocaleLink></li>
            <li><LocaleLink to="/seasonal-experiences" className="hover:text-accent">{t.footer.seasonalExperiences}</LocaleLink></li>
          </ul>
        </nav>

        <nav aria-label={t.footer.servicesHeading}>
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">{t.footer.servicesHeading}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><LocaleLink to="/services/$slug" params={{ slug: "fit-travel" }} className="hover:text-accent">{t.footer.fitTravel}</LocaleLink></li>
            <li><LocaleLink to="/services/$slug" params={{ slug: "mice" }} className="hover:text-accent">{t.footer.mice}</LocaleLink></li>
            <li><LocaleLink to="/services/$slug" params={{ slug: "corporate-travel" }} className="hover:text-accent">{t.footer.corporateTravel}</LocaleLink></li>
            <li><LocaleLink to="/services/$slug" params={{ slug: "airport-transfers" }} className="hover:text-accent">{t.footer.airportTransfers}</LocaleLink></li>
            <li><LocaleLink to="/services/$slug" params={{ slug: "chauffeur-services" }} className="hover:text-accent">{t.footer.chauffeurServices}</LocaleLink></li>
            <li><LocaleLink to="/services/$slug" params={{ slug: "car-rental" }} className="hover:text-accent">{t.footer.carRental}</LocaleLink></li>
            <li><LocaleLink to="/services/$slug" params={{ slug: "hotel-reservations" }} className="hover:text-accent">{t.footer.hotelReservations}</LocaleLink></li>
            <li><LocaleLink to="/services" className="hover:text-accent">{t.footer.allServices}</LocaleLink></li>
          </ul>
        </nav>

        <nav aria-label={t.footer.resourcesHeading}>
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">{t.footer.resourcesHeading}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><LocaleLink to="/travel-guides" className="hover:text-accent">{t.nav.travelGuides}</LocaleLink></li>
            <li><LocaleLink to="/blog" className="hover:text-accent">{t.nav.blog}</LocaleLink></li>
            <li><LocaleLink to="/faqs" className="hover:text-accent">{t.footer.faqs}</LocaleLink></li>
          </ul>
        </nav>

        <nav aria-label={t.footer.companyHeading}>
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">{t.footer.companyHeading}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><LocaleLink to="/about" className="hover:text-accent">{t.footer.aboutUs}</LocaleLink></li>
            <li><LocaleLink to="/services" className="hover:text-accent">{t.nav.services}</LocaleLink></li>
            <li><LocaleLink to="/reviews" className="hover:text-accent">{t.footer.reviews}</LocaleLink></li>
            <li><LocaleLink to="/contact" className="hover:text-accent">{t.nav.contact}</LocaleLink></li>
            <li><LocaleLink to="/plan-my-trip" className="hover:text-accent">{t.nav.planMyTrip}</LocaleLink></li>
            <li><LocaleLink to="/privacy" className="hover:text-accent">{t.footer.privacyPolicy}</LocaleLink></li>
            <li><LocaleLink to="/terms" className="hover:text-accent">{t.footer.termsConditions}</LocaleLink></li>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 hover:text-accent">
                <Mail className="h-4 w-4" /> {SITE.email}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-ink-foreground/50 sm:flex-row">
          <p>{t.footer.copyright(new Date().getFullYear())}</p>
          <p>{t.footer.paymentMethods}</p>
        </div>
      </div>
    </footer>
  );
}
