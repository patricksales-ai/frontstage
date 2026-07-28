import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ConfigForm from "@/components/ConfigForm";
import ActivityPanel from "@/components/ActivityPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // Read via the anon/authenticated key → RLS returns only rows this owner may see.
  const { data: clients, error } = await supabase
    .from("clients")
    .select("location_id, business_name, services, hours, tone, faq, escalation_contact");

  // Conversation activity — RLS ("owners read own interactions") scopes to this owner's tenants.
  const { data: interactions } = await supabase
    .from("interactions")
    .select("id, channel, customer_message, agent_reply, created_at, contact_id")
    .order("created_at", { ascending: false })
    .limit(25);

  const { count: totalConversations } = await supabase
    .from("interactions")
    .select("*", { count: "exact", head: true });

  // Unique leads = distinct contact_id (small volume → compute in JS).
  const { data: leadRows } = await supabase.from("interactions").select("contact_id");
  const uniqueLeads = new Set((leadRows ?? []).map((r) => r.contact_id)).size;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-6">
      <header className="flex items-center justify-between border-b border-black/10 pb-4 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold">Admin</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <form action="/auth/signout" method="post">
          <button className="rounded-lg border border-black/15 px-3 py-1.5 text-sm dark:border-white/20">
            Sign out
          </button>
        </form>
      </header>

      {error && <p className="text-red-500">Error loading data: {error.message}</p>}

      {clients && clients.length === 0 && (
        <p className="text-gray-500">
          No tenants are linked to your account yet.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {clients?.map((c) => (
          <ConfigForm key={c.location_id} client={c} />
        ))}
      </div>

      <ActivityPanel
        interactions={interactions ?? []}
        total={totalConversations ?? 0}
        uniqueLeads={uniqueLeads}
      />
    </main>
  );
}
