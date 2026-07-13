import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Star, CheckCircle2 } from "lucide-react";
import { PageHero, CTABand } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { approvedReviewsQueryOptions, testimonialsQueryOptions } from "@/lib/queries";
import { toast } from "sonner";
import { z } from "zod";

const HERO = "/__l5e/assets-v1/33a5a387-88ad-44f2-a6a1-6ae74614e639/hero-fuji.jpg";

export const Route = createFileRoute("/reviews")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(testimonialsQueryOptions());
    context.queryClient.ensureQueryData(approvedReviewsQueryOptions());
  },
  head: () =>
  seo({
    title: "Customer Reviews | Nippon Tours",
    description:
      "Read real customer reviews from travelers who explored Japan with Nippon Tours.",
    path: "/reviews",
  }),
  component: ReviewsPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please tell us your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  country: z.string().max(80).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(20, "Please write at least a couple of sentences").max(4000),
});

function ReviewsPage() {
  const { data: testimonials } = useSuspenseQuery(testimonialsQueryOptions());
  const { data: reviews } = useSuspenseQuery(approvedReviewsQueryOptions());
  const qc = useQueryClient();
  const [rating, setRating] = useState(5);
  const [values, setValues] = useState({ name: "", email: "", country: "", comment: "" });
  const [sent, setSent] = useState(false);

  const submit = useMutation({
    mutationFn: async () => {
      const parsed = schema.safeParse({ ...values, rating });
      if (!parsed.success) throw new Error(parsed.error.issues[0].message);
      const { error } = await supabase.from("reviews").insert({
        name: parsed.data.name,
        email: parsed.data.email || null,
        country: parsed.data.country || null,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
        status: "pending",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Thank you — we'll review and publish your comment shortly.");
      setSent(true);
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <PageHero
        label="Reviews"
        title="4.9 out of 5, and we read every word"
        subtitle="Across Google Reviews and Tripadvisor, from over 1,900 travellers. Here's a sample — unedited."
        image={HERO}
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...testimonials, ...reviews.map((r) => ({ id: r.id, name: r.name, country: r.country, source: "Guest review", rating: r.rating, quote: r.comment, tour: null }))].map((t, i) => (
            <Reveal key={t.id ?? i} delay={(i % 3) * 90} className="card-lift flex flex-col rounded-3xl bg-card p-6">
              <div className="flex text-gold" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 border-t border-border pt-4 text-sm">
                <p className="font-bold">{t.name}</p>
                <p className="text-muted-foreground">
                  {[t.country, t.tour, t.source].filter(Boolean).join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Submit a review */}
      <section id="write-review" className="border-y border-border bg-secondary py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">Share your Nippon Tours story</h2>
          <p className="mt-2 text-center text-muted-foreground">
            Your review helps future travellers — and reminds us we're doing this right.
          </p>
          {sent ? (
            <div className="mx-auto mt-8 max-w-md rounded-3xl bg-card p-8 text-center shadow-lg">
              <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
              <p className="mt-4 font-display text-lg font-semibold">Thank you</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll review and publish your comment within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit.mutate();
              }}
              className="mt-8 space-y-4 rounded-3xl bg-card p-8 shadow-lg"
            >
              <div className="flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    aria-label={`Rate ${n} out of 5`}
                    className="p-1"
                  >
                    <Star className={`h-8 w-8 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground/40"}`} />
                  </button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your name"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  placeholder="Country (optional)"
                  value={values.country}
                  onChange={(e) => setValues({ ...values, country: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email (optional, not shown)"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
              />
              <textarea
                required
                rows={5}
                placeholder="Tell us about your trip — highlights, guides, moments you'll remember…"
                value={values.comment}
                onChange={(e) => setValues({ ...values, comment: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
              />
              <button type="submit" disabled={submit.isPending} className="btn-accent w-full">
                {submit.isPending ? "Sending…" : "Submit review"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Reviews are moderated before appearing on this page.
              </p>
            </form>
          )}
        </div>
      </section>

      <CTABand title="Ready for your own story?" />
    </>
  );
}
