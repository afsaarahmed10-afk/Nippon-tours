import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, LayoutDashboard, User, LogIn } from "lucide-react";
import { SITE } from "@/data/site";
import { useAuth } from "@/hooks/useAuth";
import logoAsset from "@/assets/nippon-tours-logo.png";

const NAV = [
  { to: "/destinations", label: "Destinations" },
  { to: "/tours", label: "Tours" },
  { to: "/services", label: "Services" },
  { to: "/travel-guides", label: "Travel Guides" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Nippon Tours home" onClick={() => setOpen(false)}>
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors lg:h-12 lg:w-12 ${
              scrolled || open ? "bg-transparent" : "bg-white/95 shadow-sm"
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
              scrolled || open ? "text-foreground" : "text-white"
            }`}
          >
            Nippon Tours
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-accent" }}
              className={`text-sm font-semibold transition-colors hover:text-accent ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" /> Admin
            </Link>
          )}
          {user ? (
            <Link
              to="/dashboard"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              <User className="h-4 w-4" /> My account
            </Link>
          ) : (
            <Link
              to="/login"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent ${
                scrolled ? "text-foreground" : "text-white"
              }`}
            >
              <LogIn className="h-4 w-4" /> Sign in
            </Link>
          )}
          <Link to="/plan-my-trip" className="btn-accent !px-5 !py-2.5 text-sm">
            Plan My Trip
          </Link>
        </nav>

        <button
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
            scrolled || open ? "text-foreground" : "text-white"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
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
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/plan-my-trip" onClick={() => setOpen(false)} className="btn-accent mt-3 w-full">
              Plan My Trip
            </Link>
            {user ? (
              <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-outline mt-2 w-full">
                <User className="h-4 w-4" /> My account
              </Link>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="btn-outline mt-2 w-full">
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
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
