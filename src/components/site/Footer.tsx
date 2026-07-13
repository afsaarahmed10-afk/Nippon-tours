import { Link } from "@tanstack/react-router";
import { Star, ShieldCheck, Clock, CreditCard, MessageCircle, Instagram, Facebook, Mail } from "lucide-react";
import { SITE } from "@/data/site";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logoAsset from "@/assets/nippon-tours-logo.png";


export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-ink text-ink-foreground">
      {/* Newsletter / lead magnet */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold">Get the free Japan Planning Guide</h2>
            <p className="mt-2 max-w-md text-sm text-ink-foreground/70">
              Seasonal timing, sample itineraries and insider tips — plus early access to seasonal tour dates.
            </p>
          </div>
          {subscribed ? (
            <p className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold">
              ありがとう! Check your inbox for the guide.
            </p>
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
                  toast.error("Could not subscribe. Please try again.");
                  return;
                }
                setSubscribed(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
              />
              <button type="submit" className="btn-accent shrink-0 !px-5">
                Send it
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
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            A licensed Japanese tour operator crafting private, group and luxury journeys across Japan since 2014.
            Real local guides, honest pricing, 24/7 support.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="flex text-gold" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="font-semibold">4.9</span>
            <span className="text-ink-foreground/60">on Google Reviews</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-ink-foreground/60">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> Licensed operator</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> Replies within 1 hour</span>
            <span className="inline-flex items-center gap-1.5"><CreditCard className="h-4 w-4" /> Secure payments</span>
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

        <nav aria-label="Explore">
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/destinations" className="hover:text-accent">Destinations</Link></li>
            <li><Link to="/tours" className="hover:text-accent">All Tours</Link></li>
            <li><Link to="/private-tours" className="hover:text-accent">Private Tours</Link></li>
            <li><Link to="/group-tours" className="hover:text-accent">Group Tours</Link></li>
            <li><Link to="/luxury-tours" className="hover:text-accent">Luxury Tours</Link></li>
            <li><Link to="/seasonal-experiences" className="hover:text-accent">Seasonal Experiences</Link></li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">Services</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/services/$slug" params={{ slug: "fit-travel" }} className="hover:text-accent">FIT Travel</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "mice" }} className="hover:text-accent">MICE</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "corporate-travel" }} className="hover:text-accent">Corporate Travel</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "airport-transfers" }} className="hover:text-accent">Airport Transfers</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "chauffeur-services" }} className="hover:text-accent">Chauffeur Services</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "car-rental" }} className="hover:text-accent">Car Rental</Link></li>
            <li><Link to="/services/$slug" params={{ slug: "hotel-reservations" }} className="hover:text-accent">Hotel Reservations</Link></li>
            <li><Link to="/services" className="hover:text-accent">All services →</Link></li>
          </ul>
        </nav>

        <nav aria-label="Resources">
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">Resources</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/travel-guides" className="hover:text-accent">Travel Guides</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Blog</Link></li>
            <li><Link to="/faqs" className="hover:text-accent">FAQs</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-sm font-bold uppercase tracking-wider text-ink-foreground/50">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/services" className="hover:text-accent">Services</Link></li>
            <li><Link to="/reviews" className="hover:text-accent">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/plan-my-trip" className="hover:text-accent">Plan My Trip</Link></li>
            <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent">Terms & Conditions</Link></li>
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
          <p>© {new Date().getFullYear()} Nippon-tours.com — All rights reserved. Registered travel operator, Tokyo, Japan.</p>
          <p>Visa · Mastercard · Amex · PayPal · Bank transfer</p>
        </div>
      </div>
    </footer>
  );
}
