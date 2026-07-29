# FrontStage — LinkedIn post (draft)

Drafted 2026-07-29. Style matches the Outbound Feedback Bot post (short hook → reversal → "here's what I built" → arrow-stack → question close → hashtags on their own line).

---

## Post body

I added one service to a text box.

Seconds later, the AI front desk was recommending it to customers.

No redeploy. No developer. No code.

That's the part that turns an "AI demo" into something a business would actually pay for — the owner stays in control.

Here's what I built:

A multi-tenant AI front desk for local service businesses. Customers chat with an AI receptionist that answers from that business's own services, hours, and FAQ. The owner logs in to a private dashboard, edits the config, hits save — and the live agent changes what it says on the next message.

Every business gets its own isolated data.
One tenant can never read another's.
No one touches a line of code to retrain the agent.

The stack:
→ Next.js 16 + Vercel for the public chat page and the owner dashboard
→ Supabase — Postgres + magic-link Auth + row-level security for tenant isolation
→ n8n (self-hosted on Render) as the conversational brain
→ GPT-4o-mini for the conversation, with per-session memory
→ Tailwind for the UI

It's time-aware — it knows if the business is open right now — and it won't fake a booking on the public demo. Ask it to book and it tells you it'd lock that in on the live version.

It's a portfolio build running against a fictional dental practice. You can go chat with it yourself — link in the first comment.

Would you trust it at your front desk?

#AIAutomation #AIAgents #NextJS #Supabase #n8n

---

## Screenshots to attach (native upload, in this order)

1. `docs/screenshots/frontstage-demo-chat.png` — visitor asks "Do you offer Invisalign?" → agent answers yes (the killer-loop proof).
2. `docs/screenshots/frontstage-admin-dashboard.png` — owner config editor (Services incl. Invisalign) + Save/"Saved." + live conversation metrics. Email fields redacted.

## First comment

Chat with it live here 👇
frontstage-three.vercel.app/demo/vKBMdWARfZ9coyZkgLV7

Built with Next.js + Vercel, Supabase (Auth + row-level security), and an n8n + GPT-4o-mini brain. Full write-up, architecture diagram, and code: github.com/patricksales-ai/frontstage

Ask it about services, hours, or try to book — it'll show you the guardrails. It's a portfolio demo on a fictional dental practice.

---

## Hashtag swap-ins (keep to 5)

- Recruiters / job hunt: #FullStack #WebDevelopment #TypeScript
- SaaS / founder reach: #SaaS #MultiTenant #SmallBusiness
- Tool-searchers: #Vercel #OpenAI #nocode

## Pre-publish checklist

- [ ] Put the demo link in the FIRST COMMENT, not the post body (LinkedIn throttles outbound-link reach).
- [ ] Warm the demo before posting — Render free tier cold-starts (~30–60s) after idle. Hit the link once so the first recruiter click is instant.
- [ ] Keep the "fictional dental practice" framing — don't imply a paying client.
- [ ] Live demo: https://frontstage-three.vercel.app/demo/vKBMdWARfZ9coyZkgLV7
- [ ] Repo: https://github.com/patricksales-ai/frontstage
