import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, LayoutDashboard, User, LogIn } from "lucide-react";
import { SITE } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import { LocaleLink } from "@/components/site/LocaleLink";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useCommon, usePathname, stripLocale } from "@/i18n";
import logoAsset from "@/assets/nippon-tours-logo.png";

// Pages with no dark hero image behind the header — the login/signup/dashboard
// shells are light, so the header needs its "scrolled" (dark text) styling from
// the very first paint or the white nav text disappears against them.
const LIGHT_BACKGROUND_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password", "/admin/login", "/dashboard"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const t = useCommon();
  const pathname = stripLocale(usePathname());
  const onLightBackground = LIGHT_BACKGROUND_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const dark = scrolled || open || onLightBackground;

  const NAV = [
    { to: "/destinations", label: t.nav.destinations },
    { to: "/tours", label: t.nav.tours },
    { to: "/services", label: t.nav.services },
    { to: "/travel-guides", label: t.nav.travelGuides },
    { to: "/blog", label: t.nav.blog },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        dark ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <LocaleLink to="/" className="flex min-w-0 items-center gap-2" aria-label={t.nav.homeAria} onClick={() => setOpen(false)}>
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors lg:h-12 lg:w-12 ${
              dark ? "bg-transparent" : "bg-white/95 shadow-sm"
            }`}
            aria-hidden="true"
          >
            <img
              src={logoAsset}
              alt=""
              className="h-9 w-9 object-contain lg:h-10 lg:w-10"
              loading="eager"
              decoding="async"
            />
          </span>
          <span
            className={`truncate font-display text-lg font-semibold tracking-tight ${
              dark ? "text-foreground" : "text-white"
            }`}
          >
            Nippon Tours
          </span>
        </LocaleLink>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <LocaleLink
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-accent" }}
              className={`text-sm font-semibold transition-colors hover:text-accent ${
                dark ? "text-foreground" : "text-white"
              }`}
            >
              {item.label}
            </LocaleLink>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent ${
                dark ? "text-foreground" : "text-white"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" /> {t.nav.admin}
            </Link>
          )}
          {user ? (
            <LocaleLink
              to="/dashboard"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent ${
                dark ? "text-foreground" : "text-white"
              }`}
            >
              <User className="h-4 w-4" /> {t.nav.myAccount}
            </LocaleLink>
          ) : (
            <LocaleLink
              to="/login"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent ${
                dark ? "text-foreground" : "text-white"
              }`}
            >
              <LogIn className="h-4 w-4" /> {t.nav.signIn}
            </LocaleLink>
          )}
          <LanguageSwitcher light={!dark} />
          <LocaleLink to="/plan-my-trip" className="btn-accent !px-5 !py-2.5 text-sm">
            {t.nav.planMyTrip}
          </LocaleLink>
        </nav>

        <button
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
            dark ? "text-foreground" : "text-white"
          }`}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="glass border-t border-border px-6 pb-8 pt-4 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <LocaleLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </LocaleLink>
            ))}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            <LocaleLink to="/plan-my-trip" onClick={() => setOpen(false)} className="btn-accent mt-3 w-full">
              {t.nav.planMyTrip}
            </LocaleLink>
            {user ? (
              <LocaleLink to="/dashboard" onClick={() => setOpen(false)} className="btn-outline mt-2 w-full">
                <User className="h-4 w-4" /> {t.nav.myAccount}
              </LocaleLink>
            ) : (
              <LocaleLink to="/login" onClick={() => setOpen(false)} className="btn-outline mt-2 w-full">
                <LogIn className="h-4 w-4" /> {t.nav.signIn}
              </LocaleLink>
            )}
            <a href={`tel:${SITE.phoneDisplay.replace(/[^+\d]/g, "")}`} className="btn-outline mt-2 w-full">
              <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
