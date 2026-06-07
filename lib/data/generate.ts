import {
  type ActionItem,
  type ActionStatus,
  type ArchiveRecord,
  type DeliveryStatus,
  type Department,
  type IncomingCorrespondence,
  type Officer,
  type OutgoingCorrespondence,
  type Priority,
  type StakeholderType,
  ACTION_STATUSES,
} from "@/lib/types";
import { daysBetween } from "@/lib/utils";
import {
  COMMUNITIES,
  DOCUMENT_TYPES,
  OFFICERS,
  OML_NUMBERS,
  STAKEHOLDERS,
  SUBJECT_TEMPLATES,
} from "./constants";

// --- Deterministic PRNG (mulberry32) so SSR & client render identically -----
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260607);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}
function pickWeighted<T>(arr: { value: T; weight: number }[]): T {
  const total = arr.reduce((s, a) => s + a.weight, 0);
  let r = rand() * total;
  for (const a of arr) {
    if ((r -= a.weight) <= 0) return a.value;
  }
  return arr[0].value;
}
function int(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function fillTemplate(t: string, year: number): string {
  return t
    .replace("{oml}", pick(OML_NUMBERS))
    .replace("{community}", pick(COMMUNITIES))
    .replace("{year}", String(year))
    .replace("{q}", String(int(1, 4)));
}

function refNumber(prefix: string, year: number, seq: number): string {
  return `${prefix}/${year}/${String(seq).padStart(4, "0")}`;
}

const PRIORITIES: { value: Priority; weight: number }[] = [
  { value: "Critical", weight: 1 },
  { value: "High", weight: 3 },
  { value: "Medium", weight: 5 },
  { value: "Low", weight: 3 },
];

function summaryFor(subject: string, sender: string, type: StakeholderType): string {
  const intros = [
    `Correspondence from ${sender} regarding ${subject.toLowerCase()}.`,
    `${sender} has formally raised the matter of ${subject.toLowerCase()}.`,
    `This ${type.toLowerCase()} correspondence concerns ${subject.toLowerCase()}.`,
  ];
  const actions = [
    "A written response is required within the statutory window, with supporting documentation attached.",
    "COCO is to coordinate the relevant department for review and prepare a formal reply.",
    "The matter requires executive sign-off prior to dispatch and should be logged for audit.",
    "Action owners must confirm compliance status and escalate any blockers to leadership.",
  ];
  return `${pick(intros)} ${pick(actions)}`;
}

// ============================================================================
// Incoming correspondence — current operational window (recent 90 days)
// ============================================================================

export function generateIncoming(count = 64): IncomingCorrespondence[] {
  const records: IncomingCorrespondence[] = [];
  const now = new Date("2026-06-07");
  for (let i = 0; i < count; i++) {
    const stakeholder = pick(STAKEHOLDERS);
    const template = pick(SUBJECT_TEMPLATES);
    const year = 2026;
    const received = addDays(now, -int(0, 95));
    const stamped = addDays(received, int(0, 2));
    const transit = int(0, 9);
    const assignedDate = addDays(stamped, transit);
    const priority = pickWeighted(PRIORITIES);
    const slaDays = priority === "Critical" ? 5 : priority === "High" ? 10 : priority === "Medium" ? 20 : 30;
    const due = addDays(received, slaDays);
    const subject = fillTemplate(template.subject, year);

    // Status weighted toward active pipeline
    const status = pickWeighted<ActionStatus>([
      { value: "Received", weight: 2 },
      { value: "Assigned", weight: 3 },
      { value: "In Progress", weight: 4 },
      { value: "Response Drafted", weight: 2 },
      { value: "Submitted To COCO", weight: 2 },
      { value: "Closed", weight: 4 },
    ]);
    const isAssigned = status !== "Received";
    const officer = pick(OFFICERS);

    records.push({
      id: `INC-${i + 1}`,
      referenceNumber: refNumber("COCO-IN", year, 1000 + i),
      subject,
      sender: stakeholder.name,
      stakeholderType: stakeholder.type,
      dateReceived: iso(received),
      dateStamped: iso(stamped),
      dateAssigned: isAssigned ? iso(assignedDate) : null,
      assignedOwner: isAssigned ? officer.name : "Unassigned",
      department: template.dept,
      dueDate: iso(due),
      priority,
      status,
      documentType: template.docType,
      transitTime: isAssigned ? daysBetween(stamped, assignedDate) : null,
      tags: template.tags,
      summary: summaryFor(subject, stakeholder.name, stakeholder.type),
    });
  }
  return records.sort((a, b) => b.dateReceived.localeCompare(a.dateReceived));
}

// ============================================================================
// Outgoing correspondence
// ============================================================================

export function generateOutgoing(count = 48): OutgoingCorrespondence[] {
  const records: OutgoingCorrespondence[] = [];
  const now = new Date("2026-06-07");
  for (let i = 0; i < count; i++) {
    const stakeholder = pick(STAKEHOLDERS);
    const template = pick(SUBJECT_TEMPLATES);
    const year = 2026;
    const draft = addDays(now, -int(0, 80));
    const submitted = addDays(draft, int(1, 4));
    const processingTime = int(0, 8);
    const processed = addDays(submitted, processingTime);
    const sent = addDays(processed, int(0, 3));
    const subject = fillTemplate(template.subject, year);
    const officer = pick(OFFICERS);

    const delivery = pickWeighted<DeliveryStatus>([
      { value: "Draft", weight: 1 },
      { value: "Queued", weight: 1 },
      { value: "Processing", weight: 2 },
      { value: "Dispatched", weight: 2 },
      { value: "Delivered", weight: 4 },
      { value: "Acknowledged", weight: 3 },
      { value: "Returned", weight: 1 },
    ]);
    const reachedProcessed = !["Draft", "Queued", "Processing"].includes(delivery);
    const reachedSent = ["Dispatched", "Delivered", "Acknowledged"].includes(delivery);

    records.push({
      id: `OUT-${i + 1}`,
      referenceNumber: refNumber("COCO-OUT", year, 2000 + i),
      subject,
      recipient: stakeholder.name,
      stakeholderType: stakeholder.type,
      department: template.dept,
      draftCompletedDate: iso(draft),
      submittedToCocoDate: iso(submitted),
      processedDate: reachedProcessed ? iso(processed) : null,
      sentDate: reachedSent ? iso(sent) : null,
      deliveryStatus: delivery,
      documentType: template.docType,
      owner: officer.name,
      cocoProcessingTime: reachedProcessed ? daysBetween(submitted, processed) : null,
      tags: template.tags,
      summary: summaryFor(subject, stakeholder.name, stakeholder.type),
    });
  }
  return records.sort((a, b) => b.draftCompletedDate.localeCompare(a.draftCompletedDate));
}

// ============================================================================
// Action tracker — derived from incoming + outgoing pipelines
// ============================================================================

const ACTION_DESCRIPTIONS = [
  "Draft formal response and route for legal review",
  "Verify compliance documentation and confirm submission window",
  "Coordinate department input and consolidate reply",
  "Escalate to executive sponsor for sign-off",
  "Acknowledge receipt and log statutory deadline",
  "Prepare supporting evidence pack for regulator",
  "Schedule stakeholder engagement and minute outcomes",
  "Reconcile figures and validate against source records",
];

export function generateActions(
  incoming: IncomingCorrespondence[],
  outgoing: OutgoingCorrespondence[]
): ActionItem[] {
  const actions: ActionItem[] = [];
  incoming.forEach((rec, i) => {
    const progressMap: Record<ActionStatus, number> = {
      Received: 5,
      Assigned: 20,
      "In Progress": 55,
      "Response Drafted": 75,
      "Submitted To COCO": 90,
      Sent: 100,
      Closed: 100,
    };
    actions.push({
      id: `ACT-IN-${i + 1}`,
      correspondenceRef: rec.referenceNumber,
      description: ACTION_DESCRIPTIONS[i % ACTION_DESCRIPTIONS.length],
      owner: rec.assignedOwner,
      department: rec.department,
      dueDate: rec.dueDate,
      priority: rec.priority,
      status: rec.status,
      progress: progressMap[rec.status] + (rec.status === "In Progress" ? int(-10, 15) : 0),
      direction: "Incoming",
    });
  });
  outgoing.slice(0, 24).forEach((rec, i) => {
    const statusMap: Record<DeliveryStatus, ActionStatus> = {
      Draft: "Response Drafted",
      Queued: "Submitted To COCO",
      Processing: "Submitted To COCO",
      Dispatched: "Sent",
      Delivered: "Sent",
      Acknowledged: "Closed",
      Returned: "In Progress",
    };
    const status = statusMap[rec.deliveryStatus];
    actions.push({
      id: `ACT-OUT-${i + 1}`,
      correspondenceRef: rec.referenceNumber,
      description: "Process outgoing dispatch and confirm delivery",
      owner: rec.owner,
      department: rec.department,
      dueDate: rec.sentDate ?? rec.submittedToCocoDate,
      priority: pickWeighted(PRIORITIES),
      status,
      progress: status === "Closed" ? 100 : status === "Sent" ? 90 : 60,
      direction: "Outgoing",
    });
  });
  return actions;
}

// ============================================================================
// Officers — performance metrics
// ============================================================================

export function generateOfficers(): Officer[] {
  return OFFICERS.map((o, i) => {
    const processed = int(120, 480);
    const compliance = int(78, 99);
    return {
      id: `OFF-${i + 1}`,
      name: o.name,
      role: o.role,
      department: o.department,
      avatarColor: o.color,
      lettersProcessed: processed,
      avgTurnaroundDays: Number((rand() * 6 + 1.2).toFixed(1)),
      slaCompliance: compliance,
      overdueCount: int(0, 14),
      openWorkload: int(4, 32),
    };
  }).sort((a, b) => b.slaCompliance - a.slaCompliance);
}

// ============================================================================
// Historical archive — 2003 to 2026 (flagship search corpus)
// ============================================================================

export function generateArchive(count = 480): ArchiveRecord[] {
  const records: ArchiveRecord[] = [];
  for (let i = 0; i < count; i++) {
    const stakeholder = pick(STAKEHOLDERS);
    const template = pick(SUBJECT_TEMPLATES);
    const year = int(2003, 2026);
    const month = int(0, 11);
    const day = int(1, 28);
    const date = new Date(year, month, day);
    const direction: "Incoming" | "Outgoing" = rand() > 0.45 ? "Incoming" : "Outgoing";
    const subject = fillTemplate(template.subject, year);
    const status = pick(ACTION_STATUSES);

    const shellEntity = "Shell Petroleum Development Company (SPDC)";
    records.push({
      id: `ARC-${i + 1}`,
      referenceNumber: refNumber(direction === "Incoming" ? "COCO-IN" : "COCO-OUT", year, 100 + i),
      title: subject,
      date: iso(date),
      sender: direction === "Incoming" ? stakeholder.name : shellEntity,
      recipient: direction === "Incoming" ? shellEntity : stakeholder.name,
      direction,
      department: template.dept,
      stakeholderType: stakeholder.type,
      documentType: template.docType,
      status,
      summary: summaryFor(subject, direction === "Incoming" ? stakeholder.name : shellEntity, stakeholder.type),
      tags: template.tags,
      fileSizeKb: int(80, 4200),
      pages: int(1, 36),
    });
  }
  return records.sort((a, b) => b.date.localeCompare(a.date));
}
