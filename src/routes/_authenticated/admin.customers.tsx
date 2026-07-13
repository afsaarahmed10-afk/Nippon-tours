import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { adminTripRequestsOptions } from "@/lib/queries";
import { AdminPage } from "@/components/admin/AdminShell";
import { Mail, Phone, Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/customers")({
  component: CustomersAdmin,
});

function CustomersAdmin() {
  const { data: trips = [], isLoading } = useQuery(adminTripRequestsOptions());

  // Group by email to build a customer view
  const map = new Map<string, { email: string; name: string; country: string | null; phone: string | null; requests: number; last: string }>();
  for (const t of trips) {
    const existing = map.get(t.email);
    if (existing) {
      existing.requests += 1;
      if (t.created_at > existing.last) existing.last = t.created_at;
    } else {
      map.set(t.email, {
        email: t.email,
        name: t.full_name,
        country: t.country,
        phone: t.phone,
        requests: 1,
        last: t.created_at,
      });
    }
  }
  const customers = Array.from(map.values()).sort((a, b) => b.last.localeCompare(a.last));

  const exportCsv = () => {
    const header = "Name,Email,Country,Phone,Requests,Last request\n";
    const rows = customers
      .map((c) => [c.name, c.email, c.country ?? "", c.phone ?? "", c.requests, c.last].join(","))
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nippon-tours-customers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminPage
      title="Customers"
      description="Unique people who have submitted trip requests, aggregated by email."
      action={
        <button className="btn-outline" onClick={exportCsv} disabled={!customers.length}>
          <Download className="h-4 w-4" /> Export CSV
        </button>
      }
    >
      {isLoading ? (
        <p className="p-8 text-center text-muted-foreground">Loading…</p>
      ) : customers.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
          No customers yet — once trip requests come in, they'll be aggregated here.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">Requests</th>
                <th className="px-4 py-3">Last activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr key={c.email}>
                  <td className="px-4 py-3 font-semibold">{c.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                      <Mail className="h-3 w-3" /> {c.email}
                    </a>
                    {c.phone && (
                      <>
                        <br />
                        <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                          <Phone className="h-3 w-3" /> {c.phone}
                        </a>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-3">{c.country ?? "—"}</td>
                  <td className="px-4 py-3">{c.requests}</td>
                  <td className="px-4 py-3">{new Date(c.last).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminPage>
  );
}
