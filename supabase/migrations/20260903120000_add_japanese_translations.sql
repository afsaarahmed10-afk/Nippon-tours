-- Adds nullable Japanese-translation columns alongside the existing English columns
-- for every admin-editable content table, so the bilingual site can render a Japanese
-- version of this content once staff fill it in via the admin panel. English columns
-- are untouched and remain the source of truth / fallback when a _ja column is empty.

alter table public.destinations
  add column if not exists name_ja text,
  add column if not exists region_ja text,
  add column if not exists tagline_ja text,
  add column if not exists summary_ja text,
  add column if not exists description_ja text,
  add column if not exists best_season_ja text,
  add column if not exists weather_ja text,
  add column if not exists nearby_attractions_ja jsonb not null default '[]'::jsonb,
  add column if not exists seo_title_ja text,
  add column if not exists seo_description_ja text;

alter table public.faqs
  add column if not exists question_ja text,
  add column if not exists answer_ja text;

alter table public.testimonials
  add column if not exists quote_ja text;

alter table public.reviews
  add column if not exists comment_ja text;

alter table public.blog_posts
  add column if not exists title_ja text,
  add column if not exists excerpt_ja text,
  add column if not exists body_ja text,
  add column if not exists seo_title_ja text,
  add column if not exists seo_description_ja text;

alter table public.vehicles
  add column if not exists description_ja text;
