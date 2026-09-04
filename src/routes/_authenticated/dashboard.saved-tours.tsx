import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient, useSuspenseQueries } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { mySavedToursQueryOptions } from "@/lib/customer-queries";
import { toursQueryOptions } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, Heart } from "lucide-react";
import { TourCard } from "@/components/site/TourCard";
import { LocaleLink } from "@/components/site/LocaleLink";
import { useLocale, type Locale } from "@/i18n";

const COPY: Record<Locale, {
  favouritesTitle: string;
  savedTitle: string;
  favouritesDesc: string;
  savedDesc: string;
  empty: string;
  browseTours: string;
  unfavourite: string;
  favourite: string;
  removeFromFavourites: string;
  addToFavourites: string;
  remove: string;
  removed: string;
}> = {
  en: {
    favouritesTitle: "Favourite Tours",
    savedTitle: "Saved Tours",
    favouritesDesc: "Tours you love — ready to book.",
    savedDesc: "Tours you've saved to review later.",
    empty: "Nothing here yet.",
    browseTours: "Browse tours",
    unfavourite: "Unfavourite",
    favourite: "Favourite",
    removeFromFavourites: "Remove from favourites",
    addToFavourites: "Add to favourites",
    remove: "Remove",
    removed: "Removed",
  },
  ja: {
    favouritesTitle: "お気に入りツアー",
    savedTitle: "保存したツアー",
    favouritesDesc: "気になっているツアー——いつでも予約できます。",
    savedDesc: "あとで見返すために保存したツアーです。",
    empty: "まだ何もありません。",
    browseTours: "ツアーを探す",
    unfavourite: "お気に入り解除",
    favourite: "お気に入り",
    removeFromFavourites: "お気に入りから削除",
    addToFavourites: "お気に入りに追加",
    remove: "削除",
    removed: "削除しました",
  },
};

export const Route = createFileRoute("/_authenticated/dashboard/saved-tours")({
  component: () => <SavedList favouritesOnly={false} />,
});

export function SavedList({ favouritesOnly }: { favouritesOnly: boolean }) {
  const { user } = useAuth();
  const locale = useLocale();
  const c = COPY[locale];
  const qc = useQueryClient();
  const [{ data: saved }, { data: tours }] = useSuspenseQueries({
    queries: [mySavedToursQueryOptions(user?.id ?? null), toursQueryOptions(locale)],
  });

  const rows = saved.filter((s) => (favouritesOnly ? s.is_favourite : !s.is_favourite));
  const toursById = new Map(tours.map((t) => [t.id, t]));

  const remove = async (id: string) => {
    const { error } = await supabase.from("saved_tours").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["me", "saved_tours"] });
    toast.success(c.removed);
  };
  const toggleFav = async (id: string, isFav: boolean) => {
    const { error } = await supabase.from("saved_tours").update({ is_favourite: !isFav }).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["me", "saved_tours"] });
  };

  const title = favouritesOnly ? c.favouritesTitle : c.savedTitle;
  const desc = favouritesOnly ? c.favouritesDesc : c.savedDesc;

  return (
    <DashboardPage title={title} description={desc}>
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">{c.empty}</p>
          <LocaleLink to="/tours" className="btn-accent mt-4 inline-block">{c.browseTours}</LocaleLink>
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
                    aria-label={s.is_favourite ? c.unfavourite : c.favourite}
                    title={s.is_favourite ? c.removeFromFavourites : c.addToFavourites}
                  >
                    <Heart className={`h-4 w-4 ${s.is_favourite ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      remove(s.id);
                    }}
                    className="grid h-9 w-9 place-items-center rounded-full bg-card/95 shadow hover:bg-card"
                    aria-label={c.remove}
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
