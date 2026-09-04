import { useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  BookMarked,
  Heart,
  MessagesSquare,
  Bell,
  KeyRound,
  LogOut,
  Menu,
  X,
  Ticket,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LocaleLink } from "@/components/site/LocaleLink";
import { useLocale, withLocale, type Locale } from "@/i18n";
import logoAsset from "@/assets/nippon-tours-logo.png";

const NAV = [
  { to: "/dashboard", labelEn: "Dashboard", labelJa: "ダッシュボード", icon: LayoutDashboard, end: true },
  { to: "/dashboard/profile", labelEn: "My Profile", labelJa: "プロフィール", icon: User },
  { to: "/dashboard/trip-requests", labelEn: "Trip Requests", labelJa: "旅行リクエスト", icon: ClipboardList },
  { to: "/dashboard/bookings", labelEn: "My Bookings", labelJa: "予約済みの旅", icon: Ticket },
  { to: "/dashboard/saved-tours", labelEn: "Saved Tours", labelJa: "保存したツアー", icon: BookMarked },
  { to: "/dashboard/favourites", labelEn: "Favourites", labelJa: "お気に入り", icon: Heart },
  { to: "/dashboard/messages", labelEn: "Messages", labelJa: "メッセージ", icon: MessagesSquare },
  { to: "/dashboard/notifications", labelEn: "Notifications", labelJa: "通知", icon: Bell },
  { to: "/dashboard/change-password", labelEn: "Change Password", labelJa: "パスワード変更", icon: KeyRound },
] as const;

const SHELL_COPY: Record<Locale, { myAccount: string; viewSite: string; myNippon: string; openMenu: string; closeMenu: string; logOut: string }> = {
  en: { myAccount: "My account", viewSite: "View site →", myNippon: "My Nippon", openMenu: "Open menu", closeMenu: "Close menu", logOut: "Log out" },
  ja: { myAccount: "マイアカウント", viewSite: "サイトを見る →", myNippon: "My Nippon", openMenu: "メニューを開く", closeMenu: "メニューを閉じる", logOut: "ログアウト" },
};

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const locale = useLocale();
  const t = SHELL_COPY[locale];
  const [open, setOpen] = useState(false);

  const isActive = (to: string, end?: boolean) => {
    const target = withLocale(to, locale);
    return end ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: withLocale("/login", locale) });
  };

  return (
    <div className="flex min-h-screen bg-secondary/40">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <Inner isActive={isActive} onSignOut={signOut} onNav={() => {}} t={t} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-card shadow-2xl">
            <Inner isActive={isActive} onSignOut={signOut} onNav={() => setOpen(false)} t={t} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur lg:px-8">
          <button className="lg:hidden" aria-label={t.openMenu} onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <p className="font-display text-sm font-semibold">{t.myAccount}</p>
          <LocaleLink to="/" className="text-xs font-semibold text-muted-foreground hover:text-accent">
            {t.viewSite}
          </LocaleLink>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function Inner({
  isActive,
  onSignOut,
  onNav,
  t,
}: {
  isActive: (to: string, end?: boolean) => boolean;
  onSignOut: () => void;
  onNav: () => void;
  t: (typeof SHELL_COPY)["en"];
}) {
  const locale = useLocale();
  return (
    <>
      <div className="flex items-center justify-between border-b border-border p-4">
        <LocaleLink to="/dashboard" onClick={onNav} className="flex items-center gap-2.5">
          <img src={logoAsset} alt="" className="h-9 w-9 object-contain" />
          <span className="font-display text-base font-semibold">{t.myNippon}</span>
        </LocaleLink>
        <button className="lg:hidden" aria-label={t.closeMenu} onClick={onNav}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV.map((item) => (
          <LocaleLink
            key={item.to}
            to={item.to}
            onClick={onNav}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
              isActive(item.to, "end" in item ? item.end : undefined)
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {locale === "ja" ? item.labelJa : item.labelEn}
          </LocaleLink>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <LogOut className="h-4 w-4" /> {t.logOut}
        </button>
      </div>
    </>
  );
}

export function DashboardPage({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
