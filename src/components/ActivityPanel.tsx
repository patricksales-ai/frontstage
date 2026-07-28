// Presentational only (no client interactivity) → plain Server Component.
type Interaction = {
  id: number;
  channel: string | null;
  customer_message: string | null;
  agent_reply: string | null;
  created_at: string;
  contact_id: string | null;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export default function ActivityPanel({
  interactions,
  total,
  uniqueLeads,
}: {
  interactions: Interaction[];
  total: number;
  uniqueLeads: number;
}) {
  const lastAt = interactions[0]?.created_at;

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Conversations" value={String(total)} />
        <Stat label="Unique leads" value={String(uniqueLeads)} />
        <Stat
          label="Last activity"
          value={lastAt ? new Date(lastAt).toLocaleDateString() : "—"}
        />
      </div>

      <h2 className="text-lg font-semibold">Recent conversations</h2>
      {interactions.length === 0 ? (
        <p className="text-sm text-gray-500">No conversations yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {interactions.map((i) => (
            <li
              key={i.id}
              className="rounded-xl border border-black/10 p-4 text-sm dark:border-white/10"
            >
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                <span className="rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">
                  {i.channel ?? "—"}
                </span>
                <span>{new Date(i.created_at).toLocaleString()}</span>
              </div>
              <p>
                <span className="font-medium">Visitor: </span>
                {i.customer_message}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Agent: </span>
                {i.agent_reply}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
