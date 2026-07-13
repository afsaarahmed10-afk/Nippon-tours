import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { mySavedToursQueryOptions } from "@/lib/customer-queries";
import { toursQueryOptions } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Heart } from "lucide-react";
import { TourCard } from "@/components/site/TourCard";

export const Route = createFileRoute("/_authenticated/dashboard/saved-tours")({
  component: () => <SavedList favouritesOnly={false} />,
});

export function SavedList({ favouritesOnly }: { favouritesOnly: boolean }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [{ data: saved }, { data: tours }] = useSuspenseQueries({
    queries: [mySavedToursQueryOptions(user?.id ?? null), toursQueryOptions()],
  });

  const rows = saved.filter((s) => (favouritesOnly ? s.is_favourite : !s.is_favourite));
  const toursById = new Map(tours.map((t) => [t.id, t]));

  const remove = async (id: string) => {
    const { error } = await supabase.from("saved_tours").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["me", "saved_tours"] });
    toast.success("Removed");
  };
  const toggleFav = async (id: string, isFav: boolean) => {
    const { error } = await supabase.from("saved_tours").update({ is_favourite: !isFav }).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["me", "saved_tours"] });
  };

  const title = favouritesOnly ? "Favourite Tours" : "Saved Tours";
  const desc = favouritesOnly ? "Tours you love — ready to book." : "Tours you've saved to review later.";

  return (
    <DashboardPage title={title} description={desc}>
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">Nothing here yet.</p>
          <Link to="/tours" className="btn-accent mt-4 inline-block">Browse tours</Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((s) => {
            const tour = toursById.get(s.tour_id);
            if (!tour) return null;
            return (
              <div key={s.id} className="relative">
                <TourCard tour={tour} />
                <div className="absolute right-3 top-3 flex gap-1.5">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFav(s.id, s.is_favourite);
                    }}
                    className="grid h-9 w-9 place-items-center rounded-full bg-card/95 shadow hover:bg-card"
                    aria-label={s.is_favourite ? "Unfavourite" : "Favourite"}
                    title={s.is_favourite ? "Remove from favourites" : "Add to favourites"}
                  >
                    <Heart className={`h-4 w-4 ${s.is_favourite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      remove(s.id);
                    }}
                    className="grid h-9 w-9 place-items-center rounded-full bg-card/95 shadow hover:bg-card"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4 text-foreground" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardPage>
  );
}
