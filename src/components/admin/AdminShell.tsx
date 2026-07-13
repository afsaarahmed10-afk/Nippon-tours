import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Car,
  ClipboardList,
  MessagesSquare,
  Star,
  BookOpen,
  HelpCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/nippon-tours-logo.png";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/tours", label: "Tours", icon: Compass },
  { to: "/admin/destinations", label: "Destinations", icon: MapPin },
  { to: "/admin/vehicles", label: "Car Rental", icon: Car },
  { to: "/admin/trip-requests", label: "Trip Requests", icon: ClipboardList },
  { to: "/admin/car-rental-requests", label: "Car Rental Requests", icon: Car },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessagesSquare },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string, end?: boolean) =>
    end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="flex min-h-screen bg-secondary/40">
      {/* Sidebar - desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
        <SidebarInner isActive={isActive} onSignOut={signOut} onNav={() => {}} />
      </aside>

      {/* Sidebar - mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-card shadow-2xl">
            <SidebarInner isActive={isActive} onSignOut={signOut} onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur lg:px-8">
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <p className="font-display text-sm font-semibold">Admin</p>
          <Link to="/" className="text-xs font-semibold text-muted-foreground hover:text-accent">
            View site →
          </Link>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarInner({
  isActive,
  onSignOut,
  onNav,
}: {
  isActive: (to: string, end?: boolean) => boolean;
  onSignOut: () => void;
  onNav: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border p-4">
        <Link to="/admin" onClick={onNav} className="flex items-center gap-2.5">
          <img src={logoAsset} alt="" className="h-9 w-9 object-contain" />
          <span className="font-display text-base font-semibold">Nippon Admin</span>
        </Link>
        <button className="lg:hidden" aria-label="Close menu" onClick={onNav}>
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV.map((item) => (
          <Link
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
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </>
  );
}

export function AdminPage({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl">
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
