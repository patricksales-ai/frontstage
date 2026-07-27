import { getServerSupabase } from "@/lib/supabase";

// Dummy tenant for now; becomes a route param /demo/[locationId] in M2.
const DEMO_LOCATION_ID = "vKBMdWARfZ9coyZkgLV7";

// Force dynamic rendering so config edits show up live (not frozen at build time).
export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = getServerSupabase();
  const { data: client, error } = await supabase
    .from("clients")
    .select("business_name, services, hours, faq, tone") // safe columns only — NEVER ghl_token
    .eq("location_id", DEMO_LOCATION_ID)
    .single();

  if (error || !client) {
    return (
      <main className="flex min-h-screen items-center justify-center p-8">
        <p className="text-red-500">
          Could not load tenant config: {error?.message ?? "not found"}
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">{client.business_name}</h1>
      <div className="w-full max-w-md space-y-4">
        <section>
          <h2 className="text-sm uppercase tracking-wide text-gray-500">Services</h2>
          <p>{client.services}</p>
        </section>
        <section>
          <h2 className="text-sm uppercase tracking-wide text-gray-500">Hours</h2>
          <p>{client.hours}</p>
        </section>
      </div>
      <p className="text-xs text-gray-400">Live from Supabase · {DEMO_LOCATION_ID}</p>
    </main>
  );
}
