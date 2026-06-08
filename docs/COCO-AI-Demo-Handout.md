# COCO AI — Executive Demo & Q&A Handout
**Searchable · Auditable · Actionable** | Corporate Correspondence Intelligence Platform

> **Open with this:** "Today, if a regulator asks *'where is our letter from last March and who's handling it?'* — no one can answer quickly. Correspondence lives in inboxes and spreadsheets. COCO AI turns all of it into one system that is **searchable, auditable, and actionable.** Let me show you."

---

## Part 1 — The Demo Flow (★ = the 5-minute version)

| # | Module | Click here | Say this | The "wow" |
|---|--------|-----------|----------|-----------|
| ★1 | **Executive Dashboard** | Home | "The whole operation on one screen — leadership never had this." | Live KPIs, no analyst, no monthly report. |
| ★2 | **Incoming** | Sidebar → Incoming | "Every letter logged the moment it arrives." Filter by "Regulator." | **Transit Time** auto-calculated — the hidden delay made visible. |
| 3 | **Outgoing** | Sidebar → Outgoing | "Same discipline for what we send." | **COCO Processing Time** auto-calculated. |
| ★4 | **Action Tracker** | Sidebar → Actions | "Every correspondence becomes an owned action with a deadline." | Overdue items **flash red**. No more "I thought you had it." |
| ★5 | **SLA Monitor** | Sidebar → SLA | "How we stay ahead of commitments to regulators." | Intervene **before** a breach, not explain one after. |
| 6 | **Performance** | Sidebar → Performance | "Officer performance, fairly, on data." | Spot who's overloaded; rebalance work. |
| ★7 | **AI Letter Intelligence** | Sidebar → Intelligence → click a sample | "Watch what happens when a letter arrives." Let it run. | **Headline moment.** AI extracts sender, due date, risk & writes a summary in seconds. Pause here. |
| ★8 | **Historical Search** | Sidebar → Search | Type *"NUPRC gas flare approval"*, then *"community compensation."* Click a result. | **Flagship.** 23 years (2003–2026) in one box. "Find the 2003 letter" → 3 seconds + full audit trail. |
| 9 | **Executive Reporting** | Sidebar → Reporting | Read an insight aloud: "Regulatory correspondence up 18% this quarter." | The system **writes the narrative** for leadership. |

> **Close with this:** "Searchable. Auditable. Actionable. It's built on the Microsoft 365 stack we already run — SharePoint, Outlook, Dataverse, Azure OpenAI — so we go from prototype to production without ripping anything out."

**Presenter reminders:** Everything is clickable — if someone says "show me one," click any row. • Start & end on the two ★ AI features (Intelligence + Search). • Keep two tabs open: Dashboard + Search. • "Is this real data?" → "Realistic mock data to prove the model; production connects to our live systems."

---

## Part 2 — Likely Q&A

*Short, confident answers. If you don't know: "Great question — I'll confirm the exact detail and follow up, but the short answer is…"*

### The basics
- **What is this, in one sentence?** A single platform that tracks every letter in and out of Shell, finds any record instantly, and uses AI to read and summarise correspondence.
- **Is this live or a mock-up?** A working prototype on realistic sample data. The screens, search and AI are real; production swaps the sample data for our live systems.
- **What does "COCO" stand for again?** Corporate Correspondence — the function that manages all incoming and outgoing official letters.
- **Is this like SAP / SharePoint / our current system?** It sits on top of them — uses SharePoint and Outlook underneath, but adds the tracking, search and AI we don't have today.
- **Why do we need this — we've managed with email?** Email can't tell you what's overdue, who's causing delays, or where a 2003 letter is. This can, in seconds.
- **Did we build this ourselves?** Yes — our design, on standard Microsoft technology, so we're not locked into an outside vendor.

### Security & privacy
- **Is our data safe?** It lives inside our own Microsoft 365 tenant, under the same security and access controls we already trust for email and documents.
- **Can hackers see our letters?** Access requires a Shell login; everything is encrypted in transit and at rest, with full access logging.
- **Is our data going to America / leaving the country?** It stays in the Microsoft region we choose. Data residency is configurable to meet local requirements.
- **Who can see what?** Role-based access — officers see their work, leadership sees the dashboards, sensitive items can be restricted by department.
- **Does the AI send our letters to ChatGPT / the public internet?** No. It uses Azure OpenAI inside our tenant — our data is not used to train any public model.
- **What happens if someone leaves the company?** Their access is revoked centrally, but every action they logged stays in the audit trail.

### The AI
- **Can we trust the AI? What if it's wrong?** The AI assists — a person always reviews before anything is sent. It speeds up reading, it doesn't replace judgement.
- **Will the AI send a wrong letter to NUPRC?** No. The AI never sends anything on its own. It drafts and flags; humans approve and dispatch.
- **Can it read handwriting / scanned / old documents?** Yes — it reads scans and images with OCR. Older, messier documents may need a quick human check.
- **Will this replace our people / my secretary?** No — it removes manual typing and searching so our people handle more, faster. A tool, not a replacement.
- **How accurate is the extraction?** High on standard letters, and it shows a confidence level. Anything uncertain is flagged for review.
- **Does it work in other languages?** Yes — Azure OpenAI handles multiple languages; we configure the ones we receive.

### Money, time & ROI
- **What will this cost?** Mostly uses Microsoft licences we already own; the main cost is build effort and AI usage, which scales with volume. I'll bring a detailed estimate.
- **What's the return / why spend on this?** Faster responses, fewer missed deadlines, lower regulatory risk, no more days lost searching archives. The sample shows assignment time dropping from 5.2 to 1.8 days.
- **How long to build the real thing?** The foundation is already here. A production rollout is phased — connect systems, then AI, then full history — over months, not years.
- **Who maintains it?** It runs on managed Microsoft services, so IT maintains it with minimal overhead — no custom servers to babysit.
- **What if Microsoft raises prices / we change vendors?** Built on open standards and our own code, so it's portable. We're not trapped.

### Our history & data
- **Can it really find a letter from 2003?** Yes — the flagship feature. Search any year from 2003 to today and retrieve the record with its audit trail.
- **How do we get 20 years of paper into it?** Existing digital archives import directly; paper is scanned in batches, and the AI tags it automatically as it comes in.
- **What if a record is missing or wrong?** Records can be corrected with a tracked edit — nothing is silently overwritten; history is preserved.
- **Is anything ever deleted?** Only under our retention policy, and deletions are logged. The default is keep-and-archive.

### Compliance & regulators
- **Will this satisfy an audit?** Yes — every record has a timestamped trail: received, assigned, actioned, sent. Exactly what auditors ask for.
- **Can we prove when we received a regulator's letter?** Yes — received and stamped dates are recorded automatically and can't be quietly changed.
- **Does it meet our data-protection obligations?** It inherits Microsoft 365's compliance certifications and our existing governance policies.

### Practical & devices
- **Can I use it on my phone / iPad?** Yes — works in any browser and adapts to phone, tablet and desktop.
- **Do I need to install anything?** No — open it in your web browser and sign in with your Shell account.
- **What if I forget my password?** It uses your normal Shell single sign-on — no separate password to remember.
- **Can it print / export reports?** Yes — dashboards and records export to PDF and Excel for board packs.
- **Is the training complicated?** It's designed to feel like Office. Most users need a short orientation, not a course.

### Risks & "what if"
- **What if the system goes down?** Runs on Microsoft's cloud with high availability; source documents also remain safe in SharePoint.
- **What if the internet is down?** Like email, it's online — but records are never lost, and access resumes the moment connectivity returns.
- **What if staff don't adopt it?** It replaces tedious manual work, so it makes their day easier — adoption follows when the tool genuinely helps.
- **Can we start small?** Yes — pilot with one department, prove the value, then scale.

---

**If you get a curveball you can't answer:** Stay calm and bridge — *"That's exactly the kind of detail we'll lock down in the production phase. The short answer is yes/we can — let me follow up with specifics."* Then steer back to a ★ strength (Search or AI Intelligence).
