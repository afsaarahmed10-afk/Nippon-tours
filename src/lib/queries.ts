import { TOURS, localizeTour } from "@/data/tours";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Locale } from "@/i18n";
import heroFuji from "@/assets/hero-fuji.jpg";
import tokyoImg from "@/assets/dest-tokyo.jpg";
import kyotoImg from "@/assets/dest-kyoto.jpg";
import hiroshimaImg from "@/assets/dest-hiroshima.jpg";
import sakuraImg from "@/assets/tour-sakura.jpg";
import foodImg from "@/assets/tour-food.jpg";
import ryokanImg from "@/assets/tour-ryokan.jpg";
import autumnImg from "@/assets/tour-autumn.jpg";
import type {
  Tour,
  Destination,
  Faq,
  Testimonial,
  Review,
  BlogPost,
  Vehicle,
  TripRequest,
  CarRentalRequest,
} from "./db-types";
import {
  localizeDestinationRow,
  localizeFaq,
  localizeTestimonial,
  localizeReview,
  localizeBlogPost,
  localizeVehicle,
} from "./localize-db";

// ---------- PUBLIC (only published rows visible via RLS) ----------

const TOUR_IMAGE_BY_SLUG: Record<string, string> = {
  "private-japan-golden-route": heroFuji,
  "tokyo-private-city-tour": tokyoImg,
  "kyoto-cultural-day-tour": kyotoImg,
  "luxury-ryokan-escape": ryokanImg,
  "cherry-blossom-tour": sakuraImg,
  "autumn-colours-tour": autumnImg,
  "japan-food-odyssey": foodImg,
  "hiroshima-miyajima-day-trip": hiroshimaImg,
};

const withBundledTourImage = (tour: Tour): Tour => ({
  ...tour,
  image: TOUR_IMAGE_BY_SLUG[tour.slug] ?? tour.image,
});

const BLOG_IMAGE_BY_SLUG: Record<string, string> = {
  "etiquette-rules-locals-wish-you-knew": kyotoImg,
  "tokyo-ramen-guide": foodImg,
  "hidden-gems-kansai": hiroshimaImg,
  "japan-festival-calendar": sakuraImg,
  "first-ryokan-stay-guide": ryokanImg,
  "sakura-forecast-explained": sakuraImg,
};

const withBundledBlogImage = (post: BlogPost): BlogPost => ({
  ...post,
  cover_image: BLOG_IMAGE_BY_SLUG[post.slug] ?? post.cover_image,
});

export const toursQueryOptions = (locale: Locale = "en") =>
  queryOptions({
    queryKey: ["tours", "public", locale],
    queryFn: async (): Promise<Tour[]> => {
      return TOURS.map((t) => localizeTour(t, locale)) as unknown as Tour[];
    },
  });

export const tourBySlugQueryOptions = (slug: string, locale: Locale = "en") =>
  queryOptions({
    queryKey: ["tours", "public", slug, locale],
    queryFn: async (): Promise<Tour | null> => {
      const tour = TOURS.find((t) => t.slug === slug);

      if (!tour) return null;

      return withBundledTourImage(localizeTour(tour, locale) as unknown as Tour);
    },
  });

export const destinationsQueryOptions = (locale: Locale = "en") =>
  queryOptions({
    queryKey: ["destinations", "public", locale],
    queryFn: async (): Promise<Destination[]> => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return ((data ?? []) as unknown as Destination[]).map((d) => localizeDestinationRow(d, locale));
    },
  });

export const destinationBySlugQueryOptions = (slug: string, locale: Locale = "en") =>
  queryOptions({
    queryKey: ["destinations", "public", slug, locale],
    queryFn: async (): Promise<Destination | null> => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data ? localizeDestinationRow(data as unknown as Destination, locale) : null;
    },
  });

export const faqsQueryOptions = (locale: Locale = "en") =>
  queryOptions({
    queryKey: ["faqs", "public", locale],
    queryFn: async (): Promise<Faq[]> => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return ((data ?? []) as Faq[]).map((f) => localizeFaq(f, locale));
    },
  });

export const testimonialsQueryOptions = (locale: Locale = "en") =>
  queryOptions({
    queryKey: ["testimonials", "public", locale],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return ((data ?? []) as Testimonial[]).map((t) => localizeTestimonial(t, locale));
    },
  });

export const approvedReviewsQueryOptions = (locale: Locale = "en") =>
  queryOptions({
    queryKey: ["reviews", "approved", locale],
    queryFn: async (): Promise<Review[]> => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("status", "approved")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as Review[]).map((r) => localizeReview(r, locale));
    },
  });

export const blogPostsQueryOptions = (locale: Locale = "en") =>
  queryOptions({
    queryKey: ["blog", "public", locale],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as unknown as BlogPost[]).map((p) => withBundledBlogImage(localizeBlogPost(p, locale)));
    },
  });

export const blogPostBySlugQueryOptions = (slug: string, locale: Locale = "en") =>
  queryOptions({
    queryKey: ["blog", "public", slug, locale],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data ? withBundledBlogImage(localizeBlogPost(data as unknown as BlogPost, locale)) : null;
    },
  });

export const vehiclesQueryOptions = (locale: Locale = "en") =>
  queryOptions({
    queryKey: ["vehicles", "public", locale],
    queryFn: async (): Promise<Vehicle[]> => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return ((data ?? []) as unknown as Vehicle[]).map((v) => localizeVehicle(v, locale));
    },
  });

// ---------- ADMIN (all rows; RLS enforces admin role) ----------

export const adminListOptions = <T,>(table: string, orderBy = "created_at", ascending = false) =>
  queryOptions({
    queryKey: [table, "admin", { orderBy, ascending }],
    queryFn: async (): Promise<T[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase.from(table as any) as any)
        .select("*")
        .order(orderBy, { ascending });
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });

export const adminTripRequestsOptions = () => adminListOptions<TripRequest>("trip_requests");
export const adminCarRentalOptions = () => adminListOptions<CarRentalRequest>("car_rental_requests");
export const adminToursOptions = () => adminListOptions<Tour>("tours", "sort_order", true);
export const adminDestinationsOptions = () => adminListOptions<Destination>("destinations", "sort_order", true);
export const adminFaqsOptions = () => adminListOptions<Faq>("faqs", "sort_order", true);
export const adminTestimonialsOptions = () => adminListOptions<Testimonial>("testimonials", "sort_order", true);
export const adminReviewsOptions = () => adminListOptions<Review>("reviews");
export const adminBlogOptions = () => adminListOptions<BlogPost>("blog_posts");
export const adminVehiclesOptions = () => adminListOptions<Vehicle>("vehicles", "sort_order", true);
