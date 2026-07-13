// Domain types mirroring the DB tables — kept simple so the admin can edit inline.
export type UUID = string;

export interface Tour {
  id: UUID;
  slug: string;
  title: string;
  category: "Private" | "Group" | "Luxury" | "Seasonal";
  destination_id: UUID | null;
  days: number;
  price: number;
  group_size: string | null;
  rating: number;
  reviews_count: number;
  summary: string | null;
  description: string | null;
  image: string | null;
  gallery: string[];
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  includes: string[];
  excludes: string[];
  meeting_point: string | null;
  availability: string | null;
  best_season: string | null;
  max_guests: number | null;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  id: UUID;
  slug: string;
  name: string;
  region: string | null;
  tagline: string | null;
  summary: string | null;
  description: string | null;
  hero_image: string | null;
  gallery: string[];
  best_season: string | null;
  weather: string | null;
  nearby_attractions: string[];
  map_lat: number | null;
  map_lng: number | null;
  seo_title: string | null;
  seo_description: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: UUID;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
  published: boolean;
}

export interface Testimonial {
  id: UUID;
  name: string;
  country: string | null;
  source: string | null;
  rating: number;
  quote: string;
  tour: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export interface Review {
  id: UUID;
  name: string;
  email: string | null;
  country: string | null;
  rating: number;
  comment: string;
  tour_id: UUID | null;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
  created_at: string;
}

export interface BlogPost {
  id: UUID;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  body: string;
  category: string | null;
  tags: string[];
  author: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface Vehicle {
  id: UUID;
  name: string;
  vehicle_type: string;
  seats: number;
  luggage: number;
  price_per_day: number;
  image: string | null;
  gallery: string[];
  description: string | null;
  transmission: string | null;
  fuel_type: string | null;
  driver_included: boolean;
  self_drive: boolean;
  airport_pickup: boolean;
  airport_dropoff: boolean;
  featured: boolean;
  published: boolean;
  sort_order: number;
}

export interface TripRequest {
  id: UUID;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  travel_start: string | null;
  travel_end: string | null;
  group_size: number | null;
  budget: string | null;
  interests: string[];
  destinations: string[];
  tours: string[];
  message: string | null;
  needs_car_rental: boolean;
  status: "unread" | "contacted" | "confirmed" | "closed";
  source: string | null;
  created_at: string;
}

export interface CarRentalRequest {
  id: UUID;
  trip_request_id: UUID | null;
  vehicle_id: UUID | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string | null;
  return_date: string;
  return_time: string | null;
  passengers: number;
  luggage: number;
  vehicle_preference: string | null;
  service_type: string | null;
  special_requirements: string | null;
  status: "unread" | "contacted" | "confirmed" | "closed";
  created_at: string;
}
