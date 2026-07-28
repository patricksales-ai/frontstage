"use client";

import { useActionState } from "react";
import { updateConfig, type ConfigState } from "@/app/admin/actions";

type Client = {
  location_id: string;
  business_name: string | null;
  services: string | null;
  hours: string | null;
  tone: string | null;
  faq: string | null;
  escalation_contact: string | null;
};

const initial: ConfigState = { ok: false, message: "" };
const field =
  "rounded-lg border border-black/15 bg-transparent px-3 py-2 text-sm dark:border-white/20";

export default function ConfigForm({ client }: { client: Client }) {
  const [state, action, pending] = useActionState(updateConfig, initial);

  return (
    <form
      action={action}
      className="flex flex-col gap-3 rounded-xl border border-black/10 p-4 dark:border-white/10"
    >
      <input type="hidden" name="location_id" value={client.location_id} />

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Business name</span>
        <input name="business_name" defaultValue={client.business_name ?? ""} className={field} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Services</span>
        <textarea name="services" rows={2} defaultValue={client.services ?? ""} className={field} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Hours</span>
        <input name="hours" defaultValue={client.hours ?? ""} className={field} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Tone</span>
        <input name="tone" defaultValue={client.tone ?? ""} className={field} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">FAQ</span>
        <textarea name="faq" rows={3} defaultValue={client.faq ?? ""} className={field} />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Escalation contact</span>
        <input name="escalation_contact" defaultValue={client.escalation_contact ?? ""} className={field} />
      </label>

      <div className="flex items-center gap-3">
        <button
          disabled={pending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state.message && (
          <span className={`text-sm ${state.ok ? "text-green-500" : "text-red-500"}`}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
