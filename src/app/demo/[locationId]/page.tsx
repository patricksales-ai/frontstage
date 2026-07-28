import { getServerSupabase } from "@/lib/supabase";
import DemoChat from "@/components/DemoChat";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// Next 16: params is a Promise and must be awaited.
export default async function DemoPage({
  params,
}: {
  params: Promise<{ locationId: string }>;
}) {
  const { locationId } = await params;

  const supabase = getServerSupabase();
  const { data: client } = await supabase
    .from("clients")
    .select("business_name")
    .eq("location_id", locationId)
    .single();

  if (!client) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col p-4">
      <header className="border-b border-black/10 py-4 dark:border-white/10">
        <h1 className="text-2xl font-bold">{client.business_name}</h1>
        <p className="text-sm text-gray-500">AI Front Desk · live demo</p>
      </header>
      <div className="flex flex-1 flex-col py-4">
        <DemoChat locationId={locationId} businessName={client.business_name} />
      </div>
    </main>
  );
}
