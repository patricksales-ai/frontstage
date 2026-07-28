import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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
    .select("location_id, business_name, services, hours, tone");

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
          <div
            key={c.location_id}
            className="rounded-xl border border-black/10 p-4 dark:border-white/10"
          >
            <h2 className="text-lg font-semibold">{c.business_name}</h2>
            <p className="text-xs text-gray-500">{c.location_id}</p>
            <dl className="mt-2 space-y-1 text-sm">
              <div>
                <dt className="inline font-medium">Services: </dt>
                <dd className="inline">{c.services}</dd>
              </div>
              <div>
                <dt className="inline font-medium">Hours: </dt>
                <dd className="inline">{c.hours}</dd>
              </div>
              <div>
                <dt className="inline font-medium">Tone: </dt>
                <dd className="inline">{c.tone}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </main>
  );
}
