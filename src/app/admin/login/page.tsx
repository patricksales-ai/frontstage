"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setStatus(error ? "error" : "sent");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Owner sign in</h1>
        <p className="text-sm text-gray-500">We&apos;ll email you a magic link — no password.</p>
      </div>

      {status === "sent" ? (
        <p className="rounded-lg bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
          Check your inbox for a sign-in link. You can close this tab.
        </p>
      ) : (
        <form onSubmit={sendLink} className="flex flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            className="rounded-lg border border-black/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-blue-500 dark:border-white/20"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            {status === "sending" ? "Sending…" : "Send magic link"}
          </button>
          {status === "error" && (
            <p className="text-sm text-red-500">Couldn&apos;t send the link. Please try again.</p>
          )}
        </form>
      )}
    </main>
  );
}
