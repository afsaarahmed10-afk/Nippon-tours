// Generic admin CRUD table + drawer editor. Keeps admin sections short and consistent.
import { useMemo, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "json" | "url";

export interface FieldSpec {
  key: string;
  label: string;
  type: FieldType;
  options?: readonly string[]; // for select
  placeholder?: string;
  required?: boolean;
  help?: string;
  rows?: number;
}

export interface ColSpec {
  key: string;
  label: string;
  format?: (row: Record<string, unknown>) => React.ReactNode;
  className?: string;
}

export interface AdminCrudProps {
  table: string;
  singular: string;
  plural: string;
  orderBy?: string;
  ascending?: boolean;
  columns: ColSpec[];
  fields: FieldSpec[];
  defaults?: Record<string, unknown>;
  invalidatePublic?: string[]; // extra query keys to invalidate after mutations
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export function AdminCrud({
  table,
  singular,
  plural,
  orderBy = "created_at",
  ascending = false,
  columns,
  fields,
  defaults = {},
  invalidatePublic = [],
}: AdminCrudProps) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);

  const listKey = [table, "admin", { orderBy, ascending }];

  const { data: rows = [], isLoading } = useQuery({
    queryKey: listKey,
    queryFn: async (): Promise<Row[]> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase.from(table as any) as any)
        .select("*")
        .order(orderBy, { ascending });
      if (error) throw error;
      return data ?? [];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: [table] });
    invalidatePublic.forEach((k) => qc.invalidateQueries({ queryKey: [k] }));
  };

  const upsert = useMutation({
    mutationFn: async (row: Row) => {
      const cleaned: Row = {};
      for (const f of fields) {
        cleaned[f.key] = row[f.key];
      }
      if (row.id) cleaned.id = row.id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from(table as any) as any).upsert(cleaned);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`${singular} saved`);
      invalidate();
      setEditing(null);
      setCreating(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from(table as any) as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`${singular} deleted`);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openCreate = () => {
    const seed: Row = { ...defaults };
    fields.forEach((f) => {
      if (seed[f.key] === undefined) {
        seed[f.key] = f.type === "boolean" ? false : f.type === "number" ? 0 : f.type === "json" ? [] : "";
      }
    });
    setEditing(seed);
    setCreating(true);
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button className="btn-accent" onClick={openCreate}>
          <Plus className="h-4 w-4" /> New {singular.toLowerCase()}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/30">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {columns.map((c) => (
                  <th key={c.key} className={`px-4 py-3 ${c.className ?? ""}`}>
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-8 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-10 text-center text-muted-foreground">
                    No {plural.toLowerCase()} yet. Click "New {singular.toLowerCase()}" to add one.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/20">
                    {columns.map((c) => (
                      <td key={c.key} className={`px-4 py-3 align-top ${c.className ?? ""}`}>
                        {c.format ? c.format(row) : String(row[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <button
                          onClick={() => {
                            setEditing(row);
                            setCreating(false);
                          }}
                          className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete this ${singular.toLowerCase()}? This cannot be undone.`))
                              remove.mutate(row.id);
                          }}
                          className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <EditorDrawer
          row={editing}
          fields={fields}
          title={creating ? `New ${singular.toLowerCase()}` : `Edit ${singular.toLowerCase()}`}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={(r) => upsert.mutate(r)}
          saving={upsert.isPending}
        />
      )}
    </>
  );
}

function EditorDrawer({
  row,
  fields,
  title,
  onClose,
  onSave,
  saving,
}: {
  row: Row;
  fields: FieldSpec[];
  title: string;
  onClose: () => void;
  onSave: (r: Row) => void;
  saving: boolean;
}) {
  const [values, setValues] = useState<Row>(row);
  const set = (key: string, v: unknown) => setValues((prev) => ({ ...prev, [key]: v }));

  const jsonPreviews = useMemo(() => {
    const out: Record<string, string> = {};
    for (const f of fields) {
      if (f.type === "json") {
        try {
          out[f.key] = JSON.stringify(values[f.key] ?? [], null, 2);
        } catch {
          out[f.key] = "[]";
        }
      }
    }
    return out;
  }, [fields, values]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-2xl flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // parse JSON fields
            const parsed: Row = { ...values };
            for (const f of fields) {
              if (f.type === "json") {
                try {
                  const raw = jsonPreviews[f.key];
                  parsed[f.key] = raw ? JSON.parse(raw) : [];
                } catch {
                  toast.error(`Invalid JSON in "${f.label}"`);
                  return;
                }
              }
              if (f.type === "number") parsed[f.key] = Number(parsed[f.key]) || 0;
            }
            onSave(parsed);
          }}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                  {f.required && <span className="text-destructive"> *</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={f.rows ?? 4}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                ) : f.type === "boolean" ? (
                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!values[f.key]}
                      onChange={(e) => set(f.key, e.target.checked)}
                      className="h-4 w-4 rounded border-input text-accent focus:ring-accent"
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                ) : f.type === "select" ? (
                  <select
                    required={f.required}
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="">—</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : f.type === "json" ? (
                  <textarea
                    rows={f.rows ?? 8}
                    spellCheck={false}
                    defaultValue={jsonPreviews[f.key]}
                    onChange={(e) => (jsonPreviews[f.key] = e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 font-mono text-xs focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                ) : (
                  <input
                    type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"}
                    step={f.type === "number" ? "any" : undefined}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                )}
                {f.help && <p className="mt-1 text-xs text-muted-foreground">{f.help}</p>}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-border p-4">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-accent">
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
