export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          body: string
          category: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          body?: string
          category?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          body?: string
          category?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      car_rental_requests: {
        Row: {
          created_at: string
          dropoff_location: string
          email: string | null
          full_name: string | null
          id: string
          luggage: number
          passengers: number
          phone: string | null
          pickup_date: string
          pickup_location: string
          pickup_time: string | null
          return_date: string
          return_time: string | null
          service_type: string | null
          special_requirements: string | null
          status: Database["public"]["Enums"]["request_status"]
          trip_request_id: string | null
          updated_at: string
          vehicle_id: string | null
          vehicle_preference: string | null
        }
        Insert: {
          created_at?: string
          dropoff_location: string
          email?: string | null
          full_name?: string | null
          id?: string
          luggage?: number
          passengers?: number
          phone?: string | null
          pickup_date: string
          pickup_location: string
          pickup_time?: string | null
          return_date: string
          return_time?: string | null
          service_type?: string | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          trip_request_id?: string | null
          updated_at?: string
          vehicle_id?: string | null
          vehicle_preference?: string | null
        }
        Update: {
          created_at?: string
          dropoff_location?: string
          email?: string | null
          full_name?: string | null
          id?: string
          luggage?: number
          passengers?: number
          phone?: string | null
          pickup_date?: string
          pickup_location?: string
          pickup_time?: string | null
          return_date?: string
          return_time?: string | null
          service_type?: string | null
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          trip_request_id?: string | null
          updated_at?: string
          vehicle_id?: string | null
          vehicle_preference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "car_rental_requests_trip_request_id_fkey"
            columns: ["trip_request_id"]
            isOneToOne: false
            referencedRelation: "trip_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "car_rental_requests_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          body: string
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          source: string | null
          status: Database["public"]["Enums"]["request_status"]
          subject: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      destinations: {
        Row: {
          best_season: string | null
          created_at: string
          description: string | null
          featured: boolean
          gallery: Json
          hero_image: string | null
          id: string
          map_lat: number | null
          map_lng: number | null
          name: string
          nearby_attractions: Json
          published: boolean
          region: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          summary: string | null
          tagline: string | null
          updated_at: string
          weather: string | null
        }
        Insert: {
          best_season?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          gallery?: Json
          hero_image?: string | null
          id?: string
          map_lat?: number | null
          map_lng?: number | null
          name: string
          nearby_attractions?: Json
          published?: boolean
          region?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          summary?: string | null
          tagline?: string | null
          updated_at?: string
          weather?: string | null
        }
        Update: {
          best_season?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          gallery?: Json
          hero_image?: string | null
          id?: string
          map_lat?: number | null
          map_lng?: number | null
          name?: string
          nearby_attractions?: Json
          published?: boolean
          region?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          summary?: string | null
          tagline?: string | null
          updated_at?: string
          weather?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          published: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          published?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          published?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string
          country: string | null
          created_at: string
          email: string | null
          featured: boolean
          id: string
          name: string
          rating: number
          status: Database["public"]["Enums"]["review_status"]
          tour_id: string | null
          updated_at: string
        }
        Insert: {
          comment: string
          country?: string | null
          created_at?: string
          email?: string | null
          featured?: boolean
          id?: string
          name: string
          rating: number
          status?: Database["public"]["Enums"]["review_status"]
          tour_id?: string | null
          updated_at?: string
        }
        Update: {
          comment?: string
          country?: string | null
          created_at?: string
          email?: string | null
          featured?: boolean
          id?: string
          name?: string
          rating?: number
          status?: Database["public"]["Enums"]["review_status"]
          tour_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_tours: {
        Row: {
          created_at: string
          id: string
          is_favourite: boolean
          notes: string | null
          tour_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_favourite?: boolean
          notes?: string | null
          tour_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_favourite?: boolean
          notes?: string | null
          tour_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_tours_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          country: string | null
          created_at: string
          featured: boolean
          id: string
          name: string
          published: boolean
          quote: string
          rating: number
          sort_order: number
          source: string | null
          tour: string | null
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          name: string
          published?: boolean
          quote: string
          rating?: number
          sort_order?: number
          source?: string | null
          tour?: string | null
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          featured?: boolean
          id?: string
          name?: string
          published?: boolean
          quote?: string
          rating?: number
          sort_order?: number
          source?: string | null
          tour?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tours: {
        Row: {
          availability: string | null
          best_season: string | null
          category: string
          created_at: string
          days: number
          description: string | null
          destination_id: string | null
          excludes: Json
          featured: boolean
          gallery: Json
          group_size: string | null
          highlights: Json
          id: string
          image: string | null
          includes: Json
          itinerary: Json
          max_guests: number | null
          meeting_point: string | null
          price: number
          published: boolean
          rating: number
          reviews_count: number
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          summary: string | null
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          availability?: string | null
          best_season?: string | null
          category: string
          created_at?: string
          days?: number
          description?: string | null
          destination_id?: string | null
          excludes?: Json
          featured?: boolean
          gallery?: Json
          group_size?: string | null
          highlights?: Json
          id?: string
          image?: string | null
          includes?: Json
          itinerary?: Json
          max_guests?: number | null
          meeting_point?: string | null
          price?: number
          published?: boolean
          rating?: number
          reviews_count?: number
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          summary?: string | null
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          availability?: string | null
          best_season?: string | null
          category?: string
          created_at?: string
          days?: number
          description?: string | null
          destination_id?: string | null
          excludes?: Json
          featured?: boolean
          gallery?: Json
          group_size?: string | null
          highlights?: Json
          id?: string
          image?: string | null
          includes?: Json
          itinerary?: Json
          max_guests?: number | null
          meeting_point?: string | null
          price?: number
          published?: boolean
          rating?: number
          reviews_count?: number
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          summary?: string | null
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tours_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_requests: {
        Row: {
          budget: string | null
          country: string | null
          created_at: string
          destinations: Json
          email: string
          full_name: string
          group_size: number | null
          id: string
          interests: Json
          message: string | null
          needs_car_rental: boolean
          phone: string | null
          source: string | null
          status: Database["public"]["Enums"]["request_status"]
          tours: Json
          travel_end: string | null
          travel_start: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          budget?: string | null
          country?: string | null
          created_at?: string
          destinations?: Json
          email: string
          full_name: string
          group_size?: number | null
          id?: string
          interests?: Json
          message?: string | null
          needs_car_rental?: boolean
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          tours?: Json
          travel_end?: string | null
          travel_start?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          budget?: string | null
          country?: string | null
          created_at?: string
          destinations?: Json
          email?: string
          full_name?: string
          group_size?: number | null
          id?: string
          interests?: Json
          message?: string | null
          needs_car_rental?: boolean
          phone?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          tours?: Json
          travel_end?: string | null
          travel_start?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          airport_dropoff: boolean
          airport_pickup: boolean
          created_at: string
          description: string | null
          driver_included: boolean
          featured: boolean
          fuel_type: string | null
          gallery: Json
          id: string
          image: string | null
          luggage: number
          name: string
          price_per_day: number
          published: boolean
          seats: number
          self_drive: boolean
          sort_order: number
          transmission: string | null
          updated_at: string
          vehicle_type: string
        }
        Insert: {
          airport_dropoff?: boolean
          airport_pickup?: boolean
          created_at?: string
          description?: string | null
          driver_included?: boolean
          featured?: boolean
          fuel_type?: string | null
          gallery?: Json
          id?: string
          image?: string | null
          luggage?: number
          name: string
          price_per_day?: number
          published?: boolean
          seats?: number
          self_drive?: boolean
          sort_order?: number
          transmission?: string | null
          updated_at?: string
          vehicle_type: string
        }
        Update: {
          airport_dropoff?: boolean
          airport_pickup?: boolean
          created_at?: string
          description?: string | null
          driver_included?: boolean
          featured?: boolean
          fuel_type?: string | null
          gallery?: Json
          id?: string
          image?: string | null
          luggage?: number
          name?: string
          price_per_day?: number
          published?: boolean
          seats?: number
          self_drive?: boolean
          sort_order?: number
          transmission?: string | null
          updated_at?: string
          vehicle_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      request_status:
        | "unread"
        | "contacted"
        | "confirmed"
        | "closed"
        | "processing"
        | "completed"
      review_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      request_status: [
        "unread",
        "contacted",
        "confirmed",
        "closed",
        "processing",
        "completed",
      ],
      review_status: ["pending", "approved", "rejected"],
    },
  },
} as const
