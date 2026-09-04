// Shared Supabase session check for the authenticated layout's `beforeLoad`.
// The browser owns the Supabase session (localStorage), so callers should
// register their route with `ssr: false`.
import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export async function requireAuth(loginPath: string) {
  const { data, error } = await supabase.auth.getUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (error || !data.user) throw redirect({ to: loginPath as any });
  return { user: data.user };
}
