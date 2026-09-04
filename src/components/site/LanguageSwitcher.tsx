import { Link } from "@tanstack/react-router";
import { LOCALE_STORAGE_KEY, useCommon, useLocale, usePathname, withLocale } from "@/i18n";

export function LanguageSwitcher({ className = "", light = false }: { className?: string; light?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useCommon().languageSwitcher;
  const enHref = withLocale(pathname, "en");
  const jaHref = withLocale(pathname, "ja");

  const remember = (next: "en" | "ja") => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore (private browsing, storage disabled)
    }
  };

  const base = "text-sm font-semibold transition-colors";
  const inactive = light ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const active = light ? "text-white" : "text-foreground";

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`} aria-label="Language">
      <Link
        to={enHref}
        onClick={() => remember("en")}
        aria-current={locale === "en" ? "true" : undefined}
        aria-label={t.switchToEn}
        className={`${base} ${locale === "en" ? active : inactive}`}
      >
        EN
      </Link>
      <span className={light ? "text-white/40" : "text-muted-foreground/40"} aria-hidden="true">
        |
      </span>
      <Link
        to={jaHref}
        onClick={() => remember("ja")}
        aria-current={locale === "ja" ? "true" : undefined}
        aria-label={t.switchToJa}
        className={`${base} ${locale === "ja" ? active : inactive}`}
      >
        日本語
      </Link>
    </div>
  );
}
