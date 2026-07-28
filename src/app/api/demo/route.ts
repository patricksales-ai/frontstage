import { NextResponse } from "next/server";

// Server-side proxy: forwards a visitor message to the n8n demo responder.
// Keeps the n8n webhook URL off the browser and owns timeout/error handling.
export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_DEMO_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Demo is not configured." }, { status: 500 });
  }

  let body: { locationId?: string; message?: string; sessionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { locationId, message, sessionId } = body;
  if (!locationId || !message || !sessionId) {
    return NextResponse.json(
      { error: "Missing locationId, message, or sessionId." },
      { status: 400 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locationId, message, sessionId }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error("n8n demo webhook returned", res.status);
      return NextResponse.json(
        { error: "The assistant is unavailable right now." },
        { status: 502 },
      );
    }

    const data = (await res.json()) as { reply?: string };
    return NextResponse.json({ reply: data.reply ?? "Sorry, I didn't catch that." });
  } catch (err) {
    console.error("n8n demo webhook fetch failed:", err);
    return NextResponse.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 },
    );
  }
}
