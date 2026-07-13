import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { TripRequest } from "./db-types";

export interface SavedTour {
  id: string;
  user_id: string;
  tour_id: string;
  is_favourite: boolean;
  notes: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  body: string;
  status: "unread" | "contacted" | "confirmed" | "closed" | "processing" | "completed";
  source: string | null;
  created_at: string;
  updated_at: string;
}

export const myTripRequestsQueryOptions = (userId: string | null) =>
  queryOptions({
    queryKey: ["me", "trip_requests", userId],
    enabled: !!userId,
    queryFn: async (): Promise<TripRequest[]> => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("trip_requests")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as TripRequest[];
    },
  });

export const mySavedToursQueryOptions = (userId: string | null) =>
  queryOptions({
    queryKey: ["me", "saved_tours", userId],
    enabled: !!userId,
    queryFn: async (): Promise<SavedTour[]> => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("saved_tours")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as SavedTour[];
    },
  });

export const myNotificationsQueryOptions = (userId: string | null) =>
  queryOptions({
    queryKey: ["me", "notifications", userId],
    enabled: !!userId,
    queryFn: async (): Promise<Notification[]> => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? []) as Notification[];
    },
  });

export const myMessagesQueryOptions = (userId: string | null) =>
  queryOptions({
    queryKey: ["me", "messages", userId],
    enabled: !!userId,
    queryFn: async (): Promise<ContactMessage[]> => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ContactMessage[];
    },
  });

export const myProfileQueryOptions = (userId: string | null) =>
  queryOptions({
    queryKey: ["me", "profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
