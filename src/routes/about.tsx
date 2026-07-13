import { seo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import guideTeamAsset from "@/assets/guide-team.jpg";
const guideTeam = guideTeamAsset;
import { TEAM, STATS } from "@/data/site";
import { PageHero, CTABand, SectionHeading } from "@/components/site/PageHero";
import { Reveal, CountUp } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
 head: () =>
  seo({
    title: "About Nippon Tours | Local Japan Travel Experts",
    description:
      "Learn about Nippon Tours, our experienced local guides, and our passion for creating unforgettable private and luxury Japan tours.",
    path: "/about",
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="We're locals. That changes everything."
        subtitle="Nippon Tours is a licensed Japanese travel operator — a small team of guides, designers and fixers who treat your only days in Japan like the performance of a lifetime."
        image={guideTeam}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2">
        <Reveal>
          <p className="section-label">Our pledge</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">Travel with passion — it's a promise, not a slogan</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Our guides have walked these routes hundreds of times. But we never forget that the days you travel are your only days here. So, like a theatre production, we make sure every one is the best day ever — the right temple at the right minute, the counter seat that never reaches booking sites, the story that makes a shrine unforgettable.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            It's about more than ticking boxes on a bucket list. It's about giving every guest a feeling, an experience, and memories that outlive the photos.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 self-center">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="rounded-3xl bg-card p-6 text-center shadow-sm">
              <p className="font-display text-3xl font-semibold"><CountUp end={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading label="Meet the team" title="The people who'll plan (and save) your trip" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 100} className="card-lift rounded-3xl bg-card p-7">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary font-display text-lg font-semibold text-primary-foreground" aria-hidden="true">
                  {m.initials}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{m.name}</h3>
                <p className="text-sm font-bold text-accent">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Come see our Japan" />
    </>
  );
}
