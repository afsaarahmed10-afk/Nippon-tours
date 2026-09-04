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
import type { Locale } from "@/i18n";

const HERO = "/__l5e/assets-v1/33a5a387-88ad-44f2-a6a1-6ae74614e639/hero-fuji.jpg";

const COPY: Record<Locale, {
  label: string;
  title: string;
  subtitle: string;
  shareStoryTitle: string;
  shareStorySubtitle: string;
  thankYouTitle: string;
  thankYouBody: string;
  ratingLabel: (n: number) => string;
  namePlaceholder: string;
  countryPlaceholder: string;
  emailPlaceholder: string;
  commentPlaceholder: string;
  sending: string;
  submitReview: string;
  moderatedNote: string;
  ctaTitle: string;
  errName: string;
  errEmail: string;
  errComment: string;
  toastThankYou: string;
}> = {
  en: {
    label: "Reviews",
    title: "4.9 out of 5, and we read every word",
    subtitle: "Across Google Reviews and Tripadvisor, from over 1,900 travellers. Here's a sample — unedited.",
    shareStoryTitle: "Share your Nippon Tours story",
    shareStorySubtitle: "Your review helps future travellers — and reminds us we're doing this right.",
    thankYouTitle: "Thank you",
    thankYouBody: "We'll review and publish your comment within one business day.",
    ratingLabel: (n) => `Rate ${n} out of 5`,
    namePlaceholder: "Your name",
    countryPlaceholder: "Country (optional)",
    emailPlaceholder: "Email (optional, not shown)",
    commentPlaceholder: "Tell us about your trip — highlights, guides, moments you'll remember…",
    sending: "Sending…",
    submitReview: "Submit review",
    moderatedNote: "Reviews are moderated before appearing on this page.",
    ctaTitle: "Ready for your own story?",
    errName: "Please tell us your name",
    errEmail: "Enter a valid email",
    errComment: "Please write at least a couple of sentences",
    toastThankYou: "Thank you — we'll review and publish your comment shortly.",
  },
  ja: {
    label: "お客様の声",
    title: "5点満点中4.9、いただいた声はすべて拝見しています",
    subtitle: "GoogleクチコミとTripadvisorにて、1,900名を超える旅行者からいただいた評価です。編集なしでその一部をご紹介します。",
    shareStoryTitle: "あなたのNippon Toursでの旅の物語をお聞かせください",
    shareStorySubtitle: "あなたのレビューは未来の旅行者の助けになり、私たちにとっても励みになります。",
    thankYouTitle: "ありがとうございます",
    thankYouBody: "1営業日以内に内容を確認し、掲載いたします。",
    ratingLabel: (n) => `5段階中${n}と評価する`,
    namePlaceholder: "お名前",
    countryPlaceholder: "国籍（任意）",
    emailPlaceholder: "メールアドレス（任意・非公開）",
    commentPlaceholder: "旅の思い出をお聞かせください——印象に残った瞬間、ガイドとの思い出など…",
    sending: "送信中…",
    submitReview: "レビューを投稿",
    moderatedNote: "レビューは確認後にこのページに掲載されます。",
    ctaTitle: "あなたの物語も、お聞かせください",
    errName: "お名前をご入力ください",
    errEmail: "有効なメールアドレスを入力してください",
    errComment: "2文以上でご記入ください",
    toastThankYou: "ありがとうございます——確認後、コメントを掲載いたします。",
  },
};

export const reviewsHead = (locale: Locale = "en") =>
  seo(
    locale === "ja"
      ? {
          title: "お客様のレビュー | Nippon Tours",
          description: "Nippon Toursで日本を旅した旅行者からの、実際のレビューをご覧ください。",
          path: "/reviews",
          locale: "ja",
        }
      : {
          title: "Customer Reviews | Nippon Tours",
          description:
            "Read real customer reviews from travelers who explored Japan with Nippon Tours.",
          path: "/reviews",
          locale: "en",
        },
  );

export const reviewsLoader = ({ context, locale = "en" as Locale }: { context: { queryClient: import("@tanstack/react-query").QueryClient }; locale?: Locale }) => {
  context.queryClient.ensureQueryData(testimonialsQueryOptions(locale));
  context.queryClient.ensureQueryData(approvedReviewsQueryOptions(locale));
};

export const Route = createFileRoute("/reviews")({
  loader: ({ context }) => reviewsLoader({ context, locale: "en" }),
  head: () => reviewsHead("en"),
  component: () => <ReviewsPage locale="en" />,
});

export function ReviewsPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const { data: testimonials } = useSuspenseQuery(testimonialsQueryOptions(locale));
  const { data: reviews } = useSuspenseQuery(approvedReviewsQueryOptions(locale));
  const qc = useQueryClient();
  const [rating, setRating] = useState(5);
  const [values, setValues] = useState({ name: "", email: "", country: "", comment: "" });
  const [sent, setSent] = useState(false);

  const schema = z.object({
    name: z.string().trim().min(1, c.errName).max(120),
    email: z.string().trim().email(c.errEmail).max(255).optional().or(z.literal("")),
    country: z.string().max(80).optional(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().trim().min(20, c.errComment).max(4000),
  });

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
      toast.success(c.toastThankYou);
      setSent(true);
      qc.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <PageHero
        label={c.label}
        title={c.title}
        subtitle={c.subtitle}
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
          <h2 className="text-center font-display text-2xl font-semibold sm:text-3xl">{c.shareStoryTitle}</h2>
          <p className="mt-2 text-center text-muted-foreground">
            {c.shareStorySubtitle}
          </p>
          {sent ? (
            <div className="mx-auto mt-8 max-w-md rounded-3xl bg-card p-8 text-center shadow-lg">
              <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
              <p className="mt-4 font-display text-lg font-semibold">{c.thankYouTitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {c.thankYouBody}
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
                    aria-label={c.ratingLabel(n)}
                    className="p-1"
                  >
                    <Star className={`h-8 w-8 ${n <= rating ? "fill-gold text-gold" : "text-muted-foreground/40"}`} />
                  </button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder={c.namePlaceholder}
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  placeholder={c.countryPlaceholder}
                  value={values.country}
                  onChange={(e) => setValues({ ...values, country: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <input
                type="email"
                placeholder={c.emailPlaceholder}
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
              />
              <textarea
                required
                rows={5}
                placeholder={c.commentPlaceholder}
                value={values.comment}
                onChange={(e) => setValues({ ...values, comment: e.target.value })}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
              />
              <button type="submit" disabled={submit.isPending} className="btn-accent w-full">
                {submit.isPending ? c.sending : c.submitReview}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                {c.moderatedNote}
              </p>
            </form>
          )}
        </div>
      </section>

      <CTABand title={c.ctaTitle} />
    </>
  );
}
