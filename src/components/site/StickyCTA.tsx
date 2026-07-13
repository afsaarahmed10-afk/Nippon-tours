import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";

/** Floating WhatsApp button (all screens) + sticky bottom booking bar (mobile). */
export function StickyCTA() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onPlanner = pathname.startsWith("/plan-my-trip");

  return (
    <>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-20 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 lg:bottom-8 lg:right-8"
        style={{ boxShadow: "var(--shadow-accent)" }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {!onPlanner && (
        <div className="glass fixed inset-x-0 bottom-0 z-40 border-t border-border px-4 py-3 lg:hidden">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-muted-foreground">Free consultation · replies in minutes</p>
              <p className="truncate text-sm font-bold text-foreground">Ready to see Japan?</p>
            </div>
            <Link to="/plan-my-trip" className="btn-accent shrink-0 !px-5 !py-2.5 text-sm">
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
