import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client (uses the service_role key → bypasses RLS).
// NEVER import this into a Client Component ("use client") — the key must stay on the server.
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
