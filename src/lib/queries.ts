import { TOURS } from "@/data/tours";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

export const toursQueryOptions = () =>
  queryOptions({
    queryKey: ["tours", "public"],
    queryFn: async (): Promise<Tour[]> => {
      return TOURS as unknown as Tour[];
    },
  });

export const tourBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["tours", "public", slug],
    queryFn: async (): Promise<Tour | null> => {
      const tour = TOURS.find((t) => t.slug === slug);

      if (!tour) return null;

      return withBundledTourImage(tour as unknown as Tour);
    },
  });

export const destinationsQueryOptions = () =>
  queryOptions({
    queryKey: ["destinations", "public"],
    queryFn: async (): Promise<Destination[]> => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Destination[];
    },
  });

export const destinationBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["destinations", "public", slug],
    queryFn: async (): Promise<Destination | null> => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Destination) ?? null;
    },
  });

export const faqsQueryOptions = () =>
  queryOptions({
    queryKey: ["faqs", "public"],
    queryFn: async (): Promise<Faq[]> => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Faq[];
    },
  });

export const testimonialsQueryOptions = () =>
  queryOptions({
    queryKey: ["testimonials", "public"],
    queryFn: async (): Promise<Testimonial[]> => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Testimonial[];
    },
  });

export const approvedReviewsQueryOptions = () =>
  queryOptions({
    queryKey: ["reviews", "approved"],
    queryFn: async (): Promise<Review[]> => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("status", "approved")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Review[];
    },
  });

export const blogPostsQueryOptions = () =>
  queryOptions({
    queryKey: ["blog", "public"],
    queryFn: async (): Promise<BlogPost[]> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as unknown as BlogPost[]).map(withBundledBlogImage);
    },
  });

export const blogPostBySlugQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "public", slug],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data ? withBundledBlogImage(data as unknown as BlogPost) : null;
    },
  });

export const vehiclesQueryOptions = () =>
  queryOptions({
    queryKey: ["vehicles", "public"],
    queryFn: async (): Promise<Vehicle[]> => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as unknown as Vehicle[];
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
