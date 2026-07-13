import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { DashboardPage } from "@/components/customer/DashboardShell";
import { myNotificationsQueryOptions } from "@/lib/customer-queries";
import { supabase } from "@/integrations/supabase/client";
import { Bell, BellRing } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { data: notes } = useSuspenseQuery(myNotificationsQueryOptions(user?.id ?? null));

  const markAllRead = async () => {
    const ids = notes.filter((n) => !n.read_at).map((n) => n.id);
    if (!ids.length) return;
    await supabase.from("notifications").update({ read_at: new Date().toISOString() }).in("id", ids);
    qc.invalidateQueries({ queryKey: ["me", "notifications"] });
  };

  return (
    <DashboardPage
      title="Notifications"
      description="Trip status updates, messages and alerts."
      action={
        notes.some((n) => !n.read_at) ? (
          <button className="btn-outline" onClick={markAllRead}>Mark all as read</button>
        ) : null
      }
    >
      {notes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-muted-foreground">No notifications yet.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {notes.map((n) => (
            <li
              key={n.id}
              className={`flex gap-3 rounded-2xl border p-4 ${n.read_at ? "border-border bg-card" : "border-primary/40 bg-primary/5"}`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${n.read_at ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                {n.read_at ? <Bell className="h-4 w-4" /> : <BellRing className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{n.title}</p>
                {n.body && <p className="text-sm text-muted-foreground">{n.body}</p>}
                <p className="mt-1 text-[11px] text-muted-foreground">{new Date(n.created_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardPage>
  );
}
