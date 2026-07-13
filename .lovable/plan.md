# Nippon Tours — Content Parity Pass

Goal: match the official site's breadth (pages, services, tours, destinations, guides) using the existing design system. No visual redesign.

## Approach

1. **Audit reference site** with Firecrawl (map + scrape key pages) to build a canonical inventory of pages, services, tours, destinations, and blog posts. Save the inventory as `docs/nippon-audit.md` for traceability.
2. **Gap analysis** against current routes and Supabase content. Produce a diff: missing pages, missing tours/rows, missing nav items.
3. **Implement missing static pages** using existing components:
   - Services: FIT, MICE, Corporate Travel, Educational Tours, Luxury Tours, Group Tours, Private Tours, Airport Transfers, Chauffeur Services, Car Rental, Hotel Reservations, Restaurant Reservations, Custom Itineraries, Concierge, Local Experiences (one route each under `/services/$slug` driven by a `services` data module — no schema change needed for static marketing content).
   - Legal: `/privacy`, `/terms`.
   - Tour category landings: `/tours/category/$slug` (package, private, daily-guided, luxury, tokyo, etc.).
4. **Seed missing tours/destinations/blog posts** into Supabase via a migration (INSERT … ON CONFLICT DO NOTHING) so admin CRUD still owns them going forward. Prices in JPY (¥), no conversion.
5. **Navigation**: extend header + mobile menu + footer to expose the new sections. Grouped mega-style dropdown reusing current styles (no new design tokens).
6. **Tours page filtering/sort**: add destination, category, duration bucket, price bucket, search, and sort (price/duration/popularity) using existing `Select`/`Input` primitives.
7. **Booking/inquiry CTAs**: ensure every tour detail exposes Book Now (→ `/plan-my-trip?tour=slug`), Send Inquiry (modal form), WhatsApp deep link, and `mailto:nic@nippon-tours.com`. Reuse existing `InquiryForm`.
8. **SEO**: per-route `head()` with title/description/OG/Twitter, JSON-LD (Organization on root; TouristTrip on tour pages; Article on blog; BreadcrumbList on deep routes), canonical URLs, dynamic `/sitemap.xml` server route enumerating static routes + DB rows, and `public/robots.txt`.
9. **QA**: build, then Playwright smoke-check nav, one tour, one service, one destination, one blog post, sitemap 200.

## Technical notes

- Static service/legal pages live in `src/routes/services.$slug.tsx` + `src/data/services.ts` (no DB) to avoid growing the schema for marketing copy.
- Tour/destination/blog seed goes in a new SQL migration under `supabase/migrations/` using stable slug conflict targets so re-runs are idempotent.
- Filters/sort implemented client-side over the loader's tour list (dataset is small); URL-synced via `validateSearch` + zod `fallback()`.
- Sitemap uses the new `src/routes/sitemap[.]xml.ts` server route reading published rows via the server publishable client.
- Nav data extracted to `src/data/nav.ts` so header, mobile drawer, and footer share one source of truth.
- No changes to design tokens, typography, colors, spacing, or shadcn variants.

## Scope guardrails

- Do NOT redesign, restyle, or reorganize existing pages beyond adding sections needed for the new content.
- Do NOT convert currencies — all prices remain ¥.
- Do NOT touch auto-generated files (`routeTree.gen.ts`, Supabase client/types).
- No email sending wiring in this pass (forms continue writing to `trip_requests` / `car_rental_requests` and show the `nic@nippon-tours.com` address). Call this out at the end so you can approve a follow-up email-provider integration.

## Deliverables

- `docs/nippon-audit.md` (inventory + gap list)
- New static routes for services + legal + tour categories
- New migration seeding missing tours/destinations/blog posts
- Extended header/footer/mobile nav
- Filter/sort on `/tours`
- Per-route SEO + JSON-LD + dynamic sitemap + robots.txt
- Playwright QA report in chat reply

Estimated size: large — expect many file writes but no schema-breaking changes.
