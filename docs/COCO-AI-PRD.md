# Product Requirements Document (PRD)
# COCO AI — Correspondence Operations Intelligence Platform

**Tagline:** Searchable. Auditable. Actionable.

| | |
|---|---|
| **Document** | COCO AI — Product Requirements Document |
| **Version** | 1.0 |
| **Status** | Draft for review / hand-off |
| **Date** | 8 June 2026 |
| **Author** | Volunteer contributor (prototype author) |
| **Sponsor** | COCO (Corporate Correspondence) function |
| **Prototype** | Working Next.js application (9 modules, 2003–2026 sample corpus) |

> This document specifies *what* COCO AI must do and *why*. It is implementation-agnostic where it can be, but it also records the architecture of the existing working prototype so that any team — whether continuing the codebase or rebuilding on the Power Platform — can deliver the same outcomes without losing the design intent.

---

## 1. Executive Summary

COCO (Corporate Correspondence) manages all official correspondence into and out of the organisation — to and from regulators, government agencies, JV partners, vendors, communities and other stakeholders. The current process is fragmented, email-driven, hard to audit, hard to search, and offers no transparency into performance.

**COCO AI** is a single platform that makes every piece of correspondence **searchable** (instant retrieval across 2003–2026), **auditable** (a timestamped trail for every record), and **actionable** (every letter becomes an owned, tracked action with deadlines and SLAs). It adds AI document intelligence — automatic extraction, risk flagging and summarisation — on top of the Microsoft 365 estate the organisation already runs.

A working prototype exists today with all nine modules functioning on a realistic sample corpus. This PRD defines the requirements to take it to production.

---

## 2. Background & Problem Statement

### 2.1 The questions leadership currently cannot answer
- Where is a given correspondence right now?
- Who owns it?
- When was it received?
- How long has it been sitting?
- What actions are due, and what is overdue?
- Who or what is causing delays?
- What business value is being blocked?
- Can we instantly retrieve a correspondence from 2003?

### 2.2 Root causes
- Correspondence lives in individual inboxes and ad-hoc spreadsheets.
- No single register of record for incoming and outgoing items.
- No automated tracking of ownership, deadlines or SLAs.
- No structured, searchable archive of historical correspondence.
- No analytics on volume, bottlenecks or officer performance.
- Manual reading and data entry for every incoming letter.

### 2.3 Impact
Missed statutory deadlines and regulatory exposure; slow stakeholder responses; reputational risk in community and government relations; lost institutional memory; and leadership flying blind on operational performance.

---

## 3. Vision & Goals

**Vision:** Correspondence managed as an intelligence function — every item captured, owned, measured and instantly retrievable, with AI doing the reading and routing.

**Primary goals**
1. **G1 — Single register of record** for all incoming and outgoing correspondence.
2. **G2 — Full auditability**: an immutable, timestamped trail per record.
3. **G3 — Actionability**: every correspondence is a tracked action with owner, due date and SLA.
4. **G4 — Instant retrieval**: search and retrieve any record, 2003–present, in seconds.
5. **G5 — AI assistance**: automatic field extraction, risk assessment and summarisation.
6. **G6 — Performance transparency**: live dashboards on volume, SLAs, bottlenecks and officers.

---

## 4. Success Metrics

| ID | Metric | Baseline (sample) | Target |
|----|--------|-------------------|--------|
| M1 | Average assignment (transit) time | 5.2 days | ≤ 2.0 days |
| M2 | SLA compliance | ~86% | ≥ 90% sustained |
| M3 | Overdue open actions | High / unmeasured | ↓ 50% within 2 quarters |
| M4 | Time to retrieve a historical record | Hours–days | < 10 seconds |
| M5 | Manual data-entry per incoming letter | Full manual | ↓ 80% via AI extraction |
| M6 | Correspondence with a named owner & due date | Partial | 100% |
| M7 | Audit completeness (records with full trail) | Inconsistent | 100% |

---

## 4.1 Success Criteria

The production system is a success when the following hold in day-to-day use — not in a demo, but as the normal way COCO works. These are the conditions delivery will be judged against, and they double as high-level acceptance criteria.

- **Nothing is invisible.** Every piece of correspondence, in or out, is in the system with a named owner and a due date. No parallel tracking survives in private spreadsheets.
- **The Section 2 questions are answerable on the spot.** A manager can stand at the dashboard and say where something is, who has it, and whether it is late — without phoning around.
- **History is genuinely retrievable.** A named officer finds any historical letter, including one from 2003, in under ten seconds, and can show when it was received and how it was handled.
- **The AI saves real time.** An incoming letter becomes a structured, owned record from an uploaded document with a fraction of today's manual typing, and the reviewer trusts the result enough to use it.
- **Service levels are met and seen to be met.** SLA compliance holds at or above target, and looming breaches are visible early enough to act.
- **It stands up to an audit.** An auditor can be handed a record and shown a complete, defensible trail from receipt to closure, with nothing edited away silently.
- **People actually use it.** Officers prefer it to the old way because it removes drudgery; adoption does not have to be forced.

---

## 5. Users & Personas

| Persona | Needs | Key modules |
|---------|-------|-------------|
| **COCO Officer** | Log, own, action and dispatch correspondence; meet deadlines | Incoming, Outgoing, Actions, Intelligence |
| **COCO Manager** | Oversee pipeline, SLAs, bottlenecks, officer load | Dashboard, SLA, Performance |
| **Executive / Leadership** | Transparency, narrative insights, assurance | Dashboard, Reporting |
| **Department Reviewer** | Receive routed items, provide input, approve drafts | Actions, Outgoing |
| **Auditor / Compliance** | Prove receipt dates and end-to-end trail | Search, record profiles |
| **Records / Archivist** | Retrieve and manage the historical corpus | Historical Search |
| **System Administrator** | Manage access, roles, integrations | Cross-cutting (admin) |

---

## 5.1 User Stories

Written from the point of view of the people who will live in the system. Each carries an implied test: it is done when that person can do the thing described, on real data, without a workaround.

**Capturing and owning correspondence**
- As a **COCO Officer**, I want every incoming letter logged the moment it arrives — reference, sender, date received, date stamped — *so that nothing slips into a mailbox and disappears.* (Done when a new record is created in under a minute and appears in the register with its transit clock running.)
- As a **COCO Manager**, I want each correspondence assigned to a named owner with a due date and priority, *so that responsibility is never ambiguous.* (Done when no item can sit in the pipeline without an owner, and unassigned items are flagged.)
- As a **COCO Officer**, I want transit time and COCO processing time calculated for me, *so that the delays we have always argued about are measured, not guessed.* (Done when both appear automatically from the recorded dates and feed the dashboards.)

**Staying on top of the work**
- As a **COCO Officer**, I want overdue and due-soon items to stand out at a glance, *so that I work on the right thing first.* (Done when the Action Tracker distinguishes overdue, due-soon and on-track, and I can filter to my overdue items.)
- As a **COCO Manager**, I want to see which departments and officers are slipping on service levels, *so that I can step in before a breach.* (Done when SLA compliance and overdue load are shown per team and per officer.)

**Reading and routing with AI**
- As a **COCO Officer**, I want to upload a scanned letter and have the system pull out sender, reference, due date, required action and risk, then write a summary, *so that I spend my time deciding, not typing.* (Done when an upload produces extracted fields with a confidence score, convertible to a draft record in one step.)
- As a **COCO Manager**, I want the AI to flag the risk level of an incoming item, *so that a critical regulatory deadline is never treated as routine.* (Done when each AI-processed item carries a risk level a human can confirm or override.)

**Finding anything, proving everything**
- As a **Records Archivist**, I want to search the entire history by words, sender, year, department or theme, *so that retrieving a decades-old letter takes seconds.* (Done when a query returns ranked results across 2003 to today, narrowable by every listed filter.)
- As an **Auditor**, I want to open any record and see a complete timeline from receipt to closure, *so that I can verify how and when we handled it.* (Done when the profile shows full metadata and an audit trail, and any change is recorded rather than overwritten.)

**Seeing the whole picture**
- As an **Executive**, I want a dashboard of volume, open and overdue actions, service levels and bottlenecks, plus a short written summary, *so that I understand the state of correspondence without commissioning a report.* (Done when leadership can read the current position and the key shifts directly from the screen.)

---

## 6. Scope

### 6.1 In scope (v1 production)
All nine modules (Section 7); the data model (Section 8); AI extraction & search (Section 9); integration with M365, SharePoint, Outlook, Dataverse, Power Automate, Azure OpenAI (Section 10); migration of the historical archive (Section 12); role-based access and audit (Section 11).

### 6.2 Out of scope (v1)
Public-facing / external stakeholder portals; e-signature workflows; automatic *sending* of correspondence without human approval; mobile native apps (responsive web is in scope); translation of stored documents (detection/extraction in multiple languages is in scope).

### 6.3 Future candidates
Predictive SLA breach alerts; automated draft generation; sentiment & relationship analytics; Teams/Copilot integration; cross-function correspondence (HR, Legal) beyond COCO.

---

## 7. Functional Requirements

> Convention: `MUST` = required for v1, `SHOULD` = strongly desired, `MAY` = optional.

### 7.1 Executive Dashboard (`FR-DASH`)
- **FR-DASH-01 (MUST)** Display KPIs: total incoming, total outgoing, open actions, overdue actions, SLA compliance %, average response time, average transit time, average COCO processing time, critical-open count.
- **FR-DASH-02 (MUST)** Show correspondence volume trend (incoming vs outgoing) over a rolling period.
- **FR-DASH-03 (MUST)** Show department performance (volume, overdue load, SLA).
- **FR-DASH-04 (MUST)** Show top bottlenecks (oldest open items, with owner and age).
- **FR-DASH-05 (SHOULD)** Show stakeholder mix and pipeline-status distribution.
- **FR-DASH-06 (SHOULD)** Surface AI executive insights and link to full reporting.
- **FR-DASH-07 (MUST)** All tiles/charts reflect live data; bottleneck items are click-through.

### 7.2 Incoming Correspondence (`FR-IN`)
- **FR-IN-01 (MUST)** Capture fields: Reference Number, Subject, Sender, Stakeholder Type, Date Received, Date Stamped, Date Assigned, Assigned Owner, Department, Due Date, Priority, Status, Document Type.
- **FR-IN-02 (MUST)** **Auto-calculate Transit Time** = Date Assigned − Date Stamped.
- **FR-IN-03 (MUST)** Advanced filtering by department, status, priority, stakeholder type, and free-text search (reference, subject, sender, owner).
- **FR-IN-04 (MUST)** Visually flag overdue items.
- **FR-IN-05 (MUST)** Open a full record detail (all fields, tags, AI summary) on row click.
- **FR-IN-06 (SHOULD)** Export the filtered register (PDF/Excel).
- **FR-IN-07 (SHOULD)** Create/log a new incoming correspondence (manual or from AI extraction).

### 7.3 Outgoing Correspondence (`FR-OUT`)
- **FR-OUT-01 (MUST)** Capture fields: Reference Number, Subject, Recipient, Stakeholder Type, Department, Draft Completed Date, Submitted-to-COCO Date, Processed Date, Sent Date, Delivery Status, Document Type, Owner.
- **FR-OUT-02 (MUST)** **Auto-calculate COCO Processing Time** = Processed Date − Submitted-to-COCO Date.
- **FR-OUT-03 (MUST)** Track delivery status lifecycle (Draft → Queued → Processing → Dispatched → Delivered → Acknowledged / Returned).
- **FR-OUT-04 (MUST)** Filtering and record detail equivalent to Incoming.

### 7.4 Action Tracker (`FR-ACT`)
- **FR-ACT-01 (MUST)** Every correspondence generates a trackable action.
- **FR-ACT-02 (MUST)** Capture: Correspondence Reference, Action Description, Owner, Department, Due Date, Priority, Status, Progress (0–100), Direction (Incoming/Outgoing).
- **FR-ACT-03 (MUST)** Support statuses: Received, Assigned, In Progress, Response Drafted, Submitted To COCO, Sent, Closed.
- **FR-ACT-04 (MUST)** Reminder indicators: overdue (emphasised), due-soon, on-track.
- **FR-ACT-05 (MUST)** Summary counters (total / due-soon / overdue) that filter the list.
- **FR-ACT-06 (SHOULD)** Filter by owner, department, status, direction.

### 7.5 SLA Monitor (`FR-SLA`)
- **FR-SLA-01 (MUST)** Show overall SLA compliance vs target (e.g. 90%).
- **FR-SLA-02 (MUST)** Show overdue actions and average handling time.
- **FR-SLA-03 (MUST)** Team/department comparison with per-team compliance and overdue load.
- **FR-SLA-04 (MUST)** SLA compliance trend over time, against target.
- **FR-SLA-05 (SHOULD)** Configurable SLA windows by priority and stakeholder type.

### 7.6 Performance Dashboard (`FR-PERF`)
- **FR-PERF-01 (MUST)** Per-officer metrics: letters processed, average turnaround, SLA compliance, overdue count, open workload.
- **FR-PERF-02 (MUST)** Leaderboard ranking (SLA then turnaround).
- **FR-PERF-03 (SHOULD)** Comparison view across selectable metrics (volume, speed, workload).
- **FR-PERF-04 (SHOULD)** Highlight overload to support workload rebalancing.

### 7.7 AI Letter Intelligence (`FR-AI`)
- **FR-AI-01 (MUST)** Upload area (drag-drop + browse) accepting PDF/PNG/JPG/TIFF.
- **FR-AI-02 (MUST)** Extract: Sender, Recipient, Subject, Reference Number, Due Date, Required Action, Stakeholder Type, Risk Level.
- **FR-AI-03 (MUST)** Produce an AI-generated summary.
- **FR-AI-04 (MUST)** Display an extraction confidence score.
- **FR-AI-05 (MUST)** Allow the extracted result to become a draft register record / action (human-confirmed).
- **FR-AI-06 (MUST)** Never auto-send; a human reviews and approves all outputs.
- **FR-AI-07 (SHOULD)** Show processing stages (OCR → classify → extract → assess → summarise).

### 7.8 Executive Reporting (`FR-REP`)
- **FR-REP-01 (MUST)** Generate executive insights with trend/delta and sentiment (e.g. "Regulatory correspondence increased 18% this quarter"; "Average assignment time reduced from 5.2 to 1.8 days").
- **FR-REP-02 (MUST)** Management summary narrative plus supporting charts (volume, status, historical-by-year, stakeholder mix).
- **FR-REP-03 (SHOULD)** Export an executive brief (PDF).
- **FR-REP-04 (MAY)** Scheduled report delivery (e.g. monthly to leadership).

### 7.9 Historical Search & Retrieval (`FR-SEARCH`) — *Flagship*
- **FR-SEARCH-01 (MUST)** Full-text search across all records 2003–present (subject, sender, recipient, reference, summary, tags).
- **FR-SEARCH-02 (MUST)** Filters: Year, Sender, Recipient, Department, Stakeholder Type, Document Type, Status.
- **FR-SEARCH-03 (MUST)** Results list of cards showing title, date, sender, recipient, summary, department, tags, direction.
- **FR-SEARCH-04 (MUST)** AI summary panel synthesising the current result set (count, date range, dominant stakeholder, recurring themes).
- **FR-SEARCH-05 (MUST)** Clicking a result opens the full correspondence profile.
- **FR-SEARCH-06 (MUST)** Profile shows full metadata, AI summary, **audit trail/timeline**, tags and related correspondence.
- **FR-SEARCH-07 (SHOULD)** Semantic (vector) search in addition to keyword, for concept matching.

---

## 8. Data Model

Core entities (the prototype's typed model; maps directly to Dataverse tables).

**IncomingCorrespondence** — id, referenceNumber, subject, sender, stakeholderType, dateReceived, dateStamped, dateAssigned, assignedOwner, department, dueDate, priority, status, documentType, transitTime *(derived)*, tags[], summary.

**OutgoingCorrespondence** — id, referenceNumber, subject, recipient, stakeholderType, department, draftCompletedDate, submittedToCocoDate, processedDate, sentDate, deliveryStatus, documentType, owner, cocoProcessingTime *(derived)*, tags[], summary.

**ActionItem** — id, correspondenceRef, description, owner, department, dueDate, priority, status, progress, direction.

**Officer** — id, name, role, department, lettersProcessed, avgTurnaroundDays, slaCompliance, overdueCount, openWorkload.

**ArchiveRecord** — id, referenceNumber, title, date, sender, recipient, direction, department, stakeholderType, documentType, status, summary, tags[], fileSizeKb, pages, *(+ link to source document in SharePoint)*.

**Enumerations** — StakeholderType (Regulator, Government Ministry, JV Partner, Vendor, Community, NGO, Internal, Legal, Other); Priority (Critical/High/Medium/Low); RiskLevel (Critical/High/Medium/Low); Department (10 values); DocumentType (Letter, Approval, Notice, Permit, Memo, Report, Invoice, Contract, Query, Directive); ActionStatus (7 stages); DeliveryStatus (7 stages).

**Derived fields** — Transit Time, COCO Processing Time, overdue flag, action age, SLA compliance — computed consistently in one aggregation layer.

---

## 9. AI Capabilities & Governance

- **Capabilities:** document OCR/layout analysis; classification (document & stakeholder type); structured field extraction (FR-AI-02); risk scoring; summarisation; semantic search/embeddings for historical retrieval.
- **Engine:** Azure OpenAI within the organisation's tenant.
- **Governance principles:**
  - **Human-in-the-loop** for every actionable output; AI never sends correspondence.
  - **Confidence surfaced** to the user; low-confidence items flagged for review.
  - **Data residency & privacy:** prompts/documents processed in the chosen region; **not** used to train public models.
  - **Auditability:** AI-suggested values are stored alongside the human-confirmed values.
  - **Explainability:** extracted fields link back to the source document.

---

## 10. Integration Architecture

The prototype is built around a **clean data seam**: the UI talks to a data/analytics interface, never to raw storage. In production each connector below replaces the mock store with a live service — without changing the UI.

| Service | Role in COCO AI |
|---------|-----------------|
| **Microsoft 365 / Entra ID** | Single sign-on; unified identity; role assignment. |
| **Outlook / Exchange** | Auto-ingest incoming correspondence from monitored COCO mailboxes; dispatch approved outgoing replies. |
| **SharePoint** | Document library of record (scanned originals) with retention labels back to 2003. |
| **Dataverse** | System of record for correspondence, actions, officers, SLAs and audit history. |
| **Power Automate** | Routing, reminders, escalations and SLA-breach workflows on record changes. |
| **Azure OpenAI** | Document understanding, extraction, summarisation, semantic search. |
| **Azure AI Search** *(recommended)* | Hybrid keyword + vector index over the archive (FR-SEARCH). |

**Architectural principle:** Dataverse + Power Automate can serve as the *backend system of record and workflow engine*, while COCO AI provides the *experience layer* (dashboards, AI intelligence, search). This is complementary to a Power Platform investment, not a competitor to it.

---

## 11. Non-Functional Requirements

- **NFR-SEC-01 (MUST)** All access authenticated via Entra ID SSO; **role-based access control** (officer / manager / executive / auditor / admin).
- **NFR-SEC-02 (MUST)** Encryption in transit and at rest; access logging.
- **NFR-SEC-03 (MUST)** Sensitive correspondence restrictable by department/classification.
- **NFR-AUD-01 (MUST)** Immutable, timestamped audit trail per record (received → assigned → actioned → sent); corrections are tracked edits, never silent overwrites.
- **NFR-PRIV-01 (MUST)** Configurable data residency; compliance with applicable data-protection obligations.
- **NFR-PERF-01 (SHOULD)** Search returns results in < 2s over the full archive; page interactions < 1s typical.
- **NFR-AVAIL-01 (SHOULD)** High availability on managed cloud; source documents independently safe in SharePoint.
- **NFR-A11Y-01 (SHOULD)** WCAG 2.1 AA; responsive across desktop/tablet/phone.
- **NFR-SCALE-01 (SHOULD)** Handle 20+ years of historical records and growing annual volume without redesign.
- **NFR-RETAIN-01 (MUST)** Retention & deletion governed by policy; deletions logged.

---

## 12. Data Migration (2003–2026 Archive)

1. **Inventory** existing digital archives and physical records.
2. **Import** structured/digital records directly into Dataverse; store originals in SharePoint.
3. **Scan** physical correspondence in batches; OCR + AI auto-tag (stakeholder, type, dates) on ingest.
4. **Reconcile & QA**: spot-check extraction accuracy; flag low-confidence records for human review.
5. **Index** the corpus in Azure AI Search for retrieval.
6. **Phase by value**: prioritise high-reference-rate periods/regulators first; backfill older years progressively.

*Honest note:* migration of decades of paper is the largest effort in the programme and is independent of front-end technology choice. It should be planned and resourced as its own workstream.

---

## 13. Delivery Roadmap (Phased)

| Phase | Outcome | Key items |
|-------|---------|-----------|
| **0 — Foundation (done)** | Working prototype, all 9 modules, sample corpus | Validates UX, data model and AI workflow |
| **1 — Identity & Records** | Live SSO + Dataverse as system of record | Entra ID; Dataverse tables from §8; RBAC; audit trail |
| **2 — Ingestion** | Auto-capture from Outlook + SharePoint store | Mailbox monitoring; document library; retention labels |
| **3 — Intelligence** | Live Azure OpenAI extraction & summaries | Replace simulated extraction; confidence; human review |
| **4 — Search at scale** | Hybrid search over full archive | Azure AI Search; semantic + keyword; profile linking |
| **5 — Workflow & alerts** | Routing, reminders, SLA escalations | Power Automate flows on record changes |
| **6 — Migration** | Historical corpus loaded | Per §12, phased by value |
| **7 — Hardening & rollout** | Production launch | Performance, accessibility, training, pilot → scale |

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Historical migration effort under-estimated | Treat as a dedicated, phased workstream (§12); prioritise by value |
| AI extraction errors | Human-in-the-loop; confidence thresholds; source linking |
| Low user adoption | Replaces manual toil; pilot one department; Office-like UX; training |
| Data sensitivity / access leakage | RBAC, classification, encryption, access logging (§11) |
| Scope creep beyond COCO | Scope guardrails (§6); future items deferred |
| Perception of "just a prototype" | This PRD + documented architecture (§16); phased production plan |
| Tooling debate (custom vs Power Platform) | Position as complementary (§10, §17); decide backend vs experience layer explicitly |

---

## 15. Assumptions & Dependencies

- The organisation runs Microsoft 365 with Entra ID, SharePoint, Outlook, and access to Dataverse, Power Automate and Azure OpenAI.
- COCO can define SLA windows, departments, stakeholder taxonomy and retention policy.
- A migration budget and records team are available for the archive.
- Security/compliance sign-off for AI processing within the tenant.

---

## 16. Architecture & Engineering Approach *(of the existing prototype)*

This is recorded so reviewers can assess the prototype as an engineering foundation, not a disposable mock-up.

- **Layered separation:** UI components ← analytics/aggregation layer ← data store interface ← (mock today / Dataverse tomorrow). The UI never reads raw data directly, so the storage backend is swappable without UI changes.
- **Typed domain model:** a single source-of-truth type system shared across data, analytics and UI (mirrors the Dataverse schema in §8).
- **Integration seam:** an explicit connector layer describing M365, Outlook, SharePoint, Dataverse, Power Automate and Azure OpenAI contracts — the points where live services attach.
- **Deterministic data layer:** seeded generation produces stable, reproducible records (no flicker / hydration mismatch), which is also how demos stay consistent.
- **Server/client boundary discipline:** server-rendered by default; client interactivity only where needed (filters, dialogs, uploads, charts).
- **Build characteristics:** ~492 pre-rendered routes; type-checked and lint-clean build; responsive, accessible-leaning UI.

**Tech stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Lucide. Hosted on managed cloud (Vercel for the prototype; Azure for production).

---

## 17. Build Approach: Custom App vs Power Platform

A balanced position, to pre-empt the tooling debate:

- **Power Apps / Power Automate / Dataverse** excel at forms, workflow and a governed data backend with low-code maintenance. They are an excellent **system of record and workflow engine**.
- **A custom experience layer** (the prototype) excels where Power Apps is constrained: bespoke AI document intelligence, advanced search UX with an AI summary panel, and Power-BI-grade dashboards tailored to executives.
- **Recommended model:** **Dataverse + Power Automate as the backend; COCO AI as the front-end experience.** This protects any existing Power Platform investment while delivering the AI and search capabilities that differentiated this prototype in review.
- The decision the organisation must make explicitly is *backend vs experience layer ownership* — not "either/or".

---

## 18. Developer Hand-off Notes

A short orientation for whoever picks the code up next. The build aimed to make the path to production a matter of connecting services, not rewriting the application.

**Where it lives and how to run it**
- A single Next.js (App Router) project in TypeScript. Workflow: `npm install`, then `npm run dev` locally, or `npm run build && npm start` for production. It builds clean and lint-clean.
- Runs anywhere Node runs; the prototype is on Vercel, production is intended for Azure.

**How the project is organised**
- `app/` — one folder per module (dashboard, incoming, outgoing, actions, sla, performance, intelligence, reporting, search, plus the record profile under search).
- `components/` — the interface: shared UI primitives, layout, charts, interactive registers, the AI experience and the search experience.
- `lib/` — the brains: the typed domain model, the data layer, the analytics aggregations, the AI extraction module and the integration contracts.

**The one thing to understand first**
Everything flows through a single data seam. Screens never read raw data; they read from the analytics layer, which reads from the data layer. Today that data layer returns deterministic sample records. To go to production, replace it with calls to Dataverse (and SharePoint for documents) while keeping the same return shapes — the domain types in `lib` are written to match the intended Dataverse tables, so the screens should not need to change.

**What is real and what is simulated**
- *Real:* all nine module interfaces, filtering and search behaviour, the derived calculations (transit time, COCO processing time, SLA, overdue, age), the dashboards and the record profiles.
- *Simulated by design:* the data itself, and the AI extraction (it returns realistic structured results rather than calling a live model). The integration layer is defined as contracts, not yet wired to live services.

**Recommended order of work**
1. Stand up identity (Entra ID SSO) and the Dataverse tables from Section 8.
2. Point the data layer at Dataverse, table by table, leaving the interface untouched.
3. Wire ingestion from Outlook and document storage in SharePoint.
4. Replace the simulated extraction with a live Azure OpenAI call, preserving the confidence-and-review pattern.
5. Add Azure AI Search behind the historical search screen for scale and semantic matching.
6. Layer Power Automate flows on top for routing, reminders and escalations.

In short: the experience, the data shapes and the workflow logic are settled. The remaining work is integration and migration — both of which the structure was built to accommodate.

---

## Appendix A — Glossary

- **COCO** — Corporate Correspondence function.
- **Transit Time** — days from stamping to assignment (incoming).
- **COCO Processing Time** — days from submission-to-COCO to processed (outgoing).
- **SLA** — Service Level Agreement; the target turnaround window.
- **Stakeholder Type** — category of external party (Regulator, Community, etc.).
- **System of Record** — the authoritative store for a data entity (Dataverse).
- **Human-in-the-loop** — a person reviews/approves AI output before it has effect.

## Appendix B — Requirement Index

Dashboard FR-DASH-01..07 · Incoming FR-IN-01..07 · Outgoing FR-OUT-01..04 · Actions FR-ACT-01..06 · SLA FR-SLA-01..05 · Performance FR-PERF-01..04 · AI FR-AI-01..07 · Reporting FR-REP-01..04 · Search FR-SEARCH-01..07 · Non-functional NFR-SEC/AUD/PRIV/PERF/AVAIL/A11Y/SCALE/RETAIN.
