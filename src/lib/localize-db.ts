// Merges the Japanese (_ja) columns from Supabase rows over their English counterparts
// when locale is "ja", falling back to English for any field staff haven't translated
// yet. English rows are always the source of truth; nothing here mutates them.
import type { Locale } from "@/i18n";
import type { Destination, Faq, Testimonial, Review, BlogPost, Vehicle } from "./db-types";

function pick(ja: string | null | undefined, en: string): string {
  return ja && ja.trim() ? ja : en;
}

export function localizeDestinationRow(d: Destination, locale: Locale): Destination {
  if (locale === "en") return d;
  return {
    ...d,
    name: pick(d.name_ja, d.name),
    region: d.region_ja?.trim() ? d.region_ja : d.region,
    tagline: d.tagline_ja?.trim() ? d.tagline_ja : d.tagline,
    summary: d.summary_ja?.trim() ? d.summary_ja : d.summary,
    description: d.description_ja?.trim() ? d.description_ja : d.description,
    best_season: d.best_season_ja?.trim() ? d.best_season_ja : d.best_season,
    weather: d.weather_ja?.trim() ? d.weather_ja : d.weather,
    nearby_attractions: d.nearby_attractions_ja.length > 0 ? d.nearby_attractions_ja : d.nearby_attractions,
    seo_title: d.seo_title_ja?.trim() ? d.seo_title_ja : d.seo_title,
    seo_description: d.seo_description_ja?.trim() ? d.seo_description_ja : d.seo_description,
  };
}

export function localizeFaq(f: Faq, locale: Locale): Faq {
  if (locale === "en") return f;
  return {
    ...f,
    question: pick(f.question_ja, f.question),
    answer: pick(f.answer_ja, f.answer),
  };
}

export function localizeTestimonial(t: Testimonial, locale: Locale): Testimonial {
  if (locale === "en") return t;
  return { ...t, quote: pick(t.quote_ja, t.quote) };
}

export function localizeReview(r: Review, locale: Locale): Review {
  if (locale === "en") return r;
  return { ...r, comment: pick(r.comment_ja, r.comment) };
}

export function localizeBlogPost(p: BlogPost, locale: Locale): BlogPost {
  if (locale === "en") return p;
  return {
    ...p,
    title: pick(p.title_ja, p.title),
    excerpt: p.excerpt_ja?.trim() ? p.excerpt_ja : p.excerpt,
    body: pick(p.body_ja, p.body),
    seo_title: p.seo_title_ja?.trim() ? p.seo_title_ja : p.seo_title,
    seo_description: p.seo_description_ja?.trim() ? p.seo_description_ja : p.seo_description,
  };
}

export function localizeVehicle(v: Vehicle, locale: Locale): Vehicle {
  if (locale === "en") return v;
  return { ...v, description: v.description_ja?.trim() ? v.description_ja : v.description };
}
