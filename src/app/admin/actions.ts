"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Only these columns may be edited from the UI. NEVER ghl_token / owner_id / location_id.
const EDITABLE = [
  "business_name",
  "services",
  "hours",
  "tone",
  "faq",
  "escalation_contact",
] as const;

export type ConfigState = { ok: boolean; message: string };

export async function updateConfig(
  _prev: ConfigState,
  formData: FormData,
): Promise<ConfigState> {
  const supabase = await createClient();

  // SECURITY: verify auth INSIDE the action — it's a raw POST endpoint, not just the UI.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not signed in." };

  const locationId = String(formData.get("location_id") ?? "");
  if (!locationId) return { ok: false, message: "Missing tenant id." };

  // Whitelist columns; ignore anything else the form might send.
  const updates: Record<string, string> = {};
  for (const col of EDITABLE) {
    const v = formData.get(col);
    if (typeof v === "string") updates[col] = v.trim();
  }
  if (Object.keys(updates).length === 0) {
    return { ok: false, message: "Nothing to update." };
  }

  // RLS ("owners update own") guarantees this only touches a row this user owns.
  const { error } = await supabase
    .from("clients")
    .update(updates)
    .eq("location_id", locationId);

  if (error) return { ok: false, message: error.message };

  revalidatePath("/admin");
  revalidatePath(`/demo/${locationId}`);
  return { ok: true, message: "Saved." };
}
