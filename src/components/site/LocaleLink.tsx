// Wraps TanStack Router's <Link> so every internal link automatically points
// at the /ja mirror when rendered on a Japanese page. Callers always pass the
// canonical English path (e.g. "/tours/$slug") — never a locale-prefixed one.
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale, withLocale } from "@/i18n";

type Props = Omit<LinkComponentProps, "to"> & { to: string };

export function LocaleLink({ to, ...rest }: Props) {
  const locale = useLocale();
  const target = withLocale(to, locale);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Link to={target as any} {...(rest as any)} />;
}
