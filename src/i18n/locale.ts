// Locale is derived purely from the URL prefix — no client-side global state,
// so SSR, deep links and the language switcher all agree on the truth.
import { useRouterState } from "@tanstack/react-router";

export type Locale = "en" | "ja";
export const LOCALES: Locale[] = ["en", "ja"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "nippon_lang";

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/ja" || pathname.startsWith("/ja/") ? "ja" : "en";
}

/** Strips the /ja prefix from a pathname, e.g. "/ja/tours/foo" -> "/tours/foo". */
export function stripLocale(pathname: string): string {
  if (pathname === "/ja") return "/";
  if (pathname.startsWith("/ja/")) return pathname.slice(3);
  return pathname;
}

/** Prefixes a canonical (English) pathname with /ja when locale is "ja". */
export function withLocale(pathname: string, locale: Locale): string {
  const canonical = stripLocale(pathname);
  if (locale === "en") return canonical;
  return canonical === "/" ? "/ja" : `/ja${canonical}`;
}

export function useLocale(): Locale {
  return useRouterState({ select: (s) => localeFromPathname(s.location.pathname) });
}

export function usePathname(): string {
  return useRouterState({ select: (s) => s.location.pathname });
}
