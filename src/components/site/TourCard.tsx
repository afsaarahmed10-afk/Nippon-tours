import { Link } from "@tanstack/react-router";
import { Star, Clock, Users } from "lucide-react";
import type { Tour } from "@/lib/db-types";
import { formatJPY } from "@/lib/utils";

export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  return (
    <Link
      to="/tours/$slug"
      params={{ slug: tour.slug }}
      className="card-lift img-zoom group flex flex-col overflow-hidden rounded-3xl bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {tour.image && (
          <img
            src={tour.image}
            alt={tour.title}
            width={1024}
            height={768}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-foreground backdrop-blur">
          {tour.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
          <span className="font-bold">{Number(tour.rating).toFixed(1)}</span>
          <span className="text-muted-foreground">({tour.reviews_count} reviews)</span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground group-hover:text-accent">
          {tour.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>
        <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {tour.days} {tour.days === 1 ? "day" : "days"}</span>
          {tour.group_size && (
            <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {tour.group_size}</span>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            From <span className="font-display text-xl font-bold text-foreground">{formatJPY(tour.price)}</span>
            <span className="text-xs"> /person</span>
          </p>
          <span className="text-sm font-bold text-accent">View tour →</span>
        </div>
      </div>
    </Link>
  );
}
