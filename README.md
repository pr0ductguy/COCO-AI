# COCO AI

**Correspondence Operations Intelligence Platform**
_Searchable. Auditable. Actionable._

COCO AI is the modern operating system for Shell's **Corporate Correspondence (COCO)** function — the team that manages inbound and outbound correspondence with regulators, government agencies, JV partners, vendors, communities and other stakeholders.

It replaces a fragmented, email-driven, hard-to-audit process with a single intelligence platform that can answer the questions executives currently can't:

> Where is a correspondence? Who owns it? How long has it been sitting? What's overdue? Who is causing delays? Can we instantly retrieve a letter from 2003?

This repository is a **production-grade prototype** — built on mock data today, but architected as the foundation of a real enterprise application.

---

## Modules

| # | Module | Route | What it does |
|---|--------|-------|--------------|
| 1 | **Executive Dashboard** | `/` | Enterprise KPIs, volume trend, department performance, top bottlenecks, AI insights |
| 2 | **Incoming Correspondence** | `/incoming` | Inbound register with auto-calculated **Transit Time** and advanced filtering |
| 3 | **Outgoing Correspondence** | `/outgoing` | Outbound register with auto-calculated **COCO Processing Time** and delivery tracking |
| 4 | **Action Tracker** | `/actions` | Every correspondence as an action — lifecycle, progress, reminder indicators |
| 5 | **SLA Monitor** | `/sla` | Compliance gauge, overdue load, handling time, team comparison |
| 6 | **Performance Dashboard** | `/performance` | Officer leaderboard, turnaround, SLA, workload |
| 7 | **AI Letter Intelligence** | `/intelligence` | Upload a document → simulated AI extraction + summary |
| 8 | **Executive Reporting** | `/reporting` | AI-generated insights and management summaries |
| 9 | **Historical Search** | `/search` | Flagship: search & retrieve every record from **2003–2026** with AI summary panel |

Click any table row, search result or chart to drill in. The full correspondence profile lives at `/search/[id]`.

---

## Tech stack

- **Next.js (App Router)** + **React 19** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (new-york style) component primitives
- **Recharts** for Power BI–style dashboards
- **Lucide** icons
- Deterministic, seeded **mock data** (2003–2026) — no backend required

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build && npm start
```

Requires Node 18.18+ (built and tested on Node 22).

---

## Folder structure

```
COCO-AI/
├── app/                        # Next.js App Router — one folder per module
│   ├── layout.tsx              # Root shell: sidebar + topbar + content
│   ├── page.tsx                # 1. Executive Dashboard
│   ├── incoming/page.tsx       # 2. Incoming register
│   ├── outgoing/page.tsx       # 3. Outgoing register
│   ├── actions/page.tsx        # 4. Action Tracker
│   ├── sla/page.tsx            # 5. SLA Monitor
│   ├── performance/page.tsx    # 6. Performance / leaderboard
│   ├── intelligence/page.tsx   # 7. AI Letter Intelligence
│   ├── reporting/page.tsx      # 8. Executive Reporting
│   ├── search/page.tsx         # 9. Historical Search
│   ├── search/[id]/page.tsx    #    Full correspondence profile
│   └── globals.css             # Theme tokens (Shell-inspired palette)
│
├── components/
│   ├── ui/                     # shadcn/ui primitives (button, card, table, dialog…)
│   ├── layout/                 # sidebar, topbar
│   ├── shared/                 # KPI card, page header, status/priority badges, filters
│   ├── charts/                 # Recharts wrappers (area, bar, donut, gauge, line)
│   ├── registers/              # Interactive tables (incoming, outgoing, actions, performance)
│   ├── intelligence/           # AI extraction experience
│   └── search/                 # Historical search experience
│
├── lib/
│   ├── types.ts                # Domain model (correspondence, actions, officers, archive)
│   ├── utils.ts                # Date math, formatting, cn()
│   ├── nav.ts                  # Sidebar navigation config
│   ├── analytics.ts            # Pure aggregations powering every dashboard
│   ├── ai-extract.ts           # Simulated Azure OpenAI extraction
│   ├── data/
│   │   ├── constants.ts        # Stakeholders, departments, subjects, officers
│   │   ├── generate.ts         # Seeded generators (deterministic, SSR-safe)
│   │   └── store.ts            # In-memory "database" (swap point for real data)
│   └── integrations/index.ts   # Connector stubs: M365, Outlook, SharePoint,
│                               #   Dataverse, Power Automate, Azure OpenAI
└── …config (tailwind, tsconfig, next, postcss, components.json)
```

### Architecture principles

- **Clean data seam.** Every page reads from `lib/data/store.ts` or `lib/analytics.ts` — never inline data. Replace the store with live services and the UI is untouched.
- **Server components by default**, client components only where interactivity is required (filters, dialogs, uploads, charts).
- **Deterministic mock data** via a seeded PRNG → identical SSR/CSR render, no hydration mismatches.
- **Typed end to end.** One domain model in `lib/types.ts` is shared across data, analytics and UI.

---

## Evolving into a production system

The integration layer (`lib/integrations/index.ts`) already describes the target architecture. To productionise:

1. **Identity — Microsoft 365 / Entra ID.** Add `next-auth` (or MSAL) with Entra ID for SSO; gate routes by COCO role.
2. **System of record — Dataverse.** Replace `lib/data/store.ts` with a typed Dataverse client (Web API / Power Platform SDK). Keep the same exported shapes so pages don't change. Move reads into server actions / route handlers.
3. **Ingestion — Outlook + SharePoint.** Use Microsoft Graph to poll monitored COCO mailboxes, store originals in a SharePoint document library (retention labels back to 2003), and create correspondence records automatically.
4. **Document AI — Azure OpenAI + Document Intelligence.** Swap `lib/ai-extract.ts` for a real pipeline: OCR/layout → field extraction → risk scoring → summary. Stream results to the upload UI (already staged for it).
5. **Workflow — Power Automate.** Trigger routing, reminders, SLA-breach escalations and approvals on Dataverse record changes; surface status back into the Action Tracker.
6. **Search — Azure AI Search.** Index the archive with vector + keyword (hybrid) search; the `/search` UI and AI summary panel already model this experience.
7. **Reporting.** Embed Power BI for governed enterprise reporting, or keep Recharts for in-app analytics fed by Dataverse views.
8. **Hardening.** Add auth-aware caching, audit logging (immutable trail), pagination/virtualisation for large tables, automated tests, and CI/CD to Azure.

Because the UI talks to interfaces rather than raw data, each step above can be delivered incrementally without rewrites.

---

_Prototype for executive review. Mock data only — no live Shell systems are connected._
