import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/Reveal";

export function PageHero({
  label,
  title,
  subtitle,
  image,
  children,
}: {
  label?: string;
  title: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-ink pt-28 pb-14">
      {image && (
        <>
          <img
            src={image}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden="true" />
        </>
      )}
      <div className="relative mx-auto w-full max-w-7xl px-6">
        {label && <p className="section-label animate-hero-1 !text-white/90">{label}</p>}
        <h1 className="animate-hero-2 mt-3 max-w-3xl font-display text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="animate-hero-3 mt-4 max-w-2xl text-lg text-white/85">{subtitle}</p>}
        {children && <div className="animate-hero-3 mt-6">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  subtitle,
  center = false,
}: {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="section-label">{label}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}

export function CTABand({
  title = "Ready to start planning?",
  subtitle = "Tell us your dates and dreams — get a free, personalised itinerary within 48 hours.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink py-16 text-center text-ink-foreground">
      <Reveal className="mx-auto max-w-2xl px-6">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        <p className="mt-4 text-lg text-ink-foreground/70">{subtitle}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/plan-my-trip" className="btn-accent">Plan My Trip — Free</Link>
          <Link to="/contact" className="btn-light">Book a Call</Link>
        </div>
      </Reveal>
    </section>
  );
}
