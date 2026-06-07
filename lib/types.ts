// ============================================================================
// COCO AI — Domain Types
// Correspondence Operations Intelligence Platform
// ============================================================================

export type StakeholderType =
  | "Regulator"
  | "Government Ministry"
  | "JV Partner"
  | "Vendor"
  | "Community"
  | "NGO"
  | "Internal"
  | "Legal"
  | "Other";

export type Priority = "Critical" | "High" | "Medium" | "Low";

export type RiskLevel = "Critical" | "High" | "Medium" | "Low";

export type Department =
  | "External Relations"
  | "Legal & Compliance"
  | "Regulatory Affairs"
  | "Government Relations"
  | "Joint Ventures"
  | "Procurement"
  | "Community Relations"
  | "HSE"
  | "Finance"
  | "Corporate Affairs";

export type DocumentType =
  | "Letter"
  | "Approval"
  | "Notice"
  | "Permit"
  | "Memo"
  | "Report"
  | "Invoice"
  | "Contract"
  | "Query"
  | "Directive";

// --- Action / correspondence lifecycle -------------------------------------

export type ActionStatus =
  | "Received"
  | "Assigned"
  | "In Progress"
  | "Response Drafted"
  | "Submitted To COCO"
  | "Sent"
  | "Closed";

export const ACTION_STATUSES: ActionStatus[] = [
  "Received",
  "Assigned",
  "In Progress",
  "Response Drafted",
  "Submitted To COCO",
  "Sent",
  "Closed",
];

export type DeliveryStatus =
  | "Draft"
  | "Queued"
  | "Processing"
  | "Dispatched"
  | "Delivered"
  | "Acknowledged"
  | "Returned";

// --- Records ---------------------------------------------------------------

export interface IncomingCorrespondence {
  id: string;
  referenceNumber: string;
  subject: string;
  sender: string;
  stakeholderType: StakeholderType;
  dateReceived: string;
  dateStamped: string;
  dateAssigned: string | null;
  assignedOwner: string;
  department: Department;
  dueDate: string;
  priority: Priority;
  status: ActionStatus;
  documentType: DocumentType;
  /** Days between received and assigned — calculated. */
  transitTime: number | null;
  tags: string[];
  summary: string;
}

export interface OutgoingCorrespondence {
  id: string;
  referenceNumber: string;
  subject: string;
  recipient: string;
  stakeholderType: StakeholderType;
  department: Department;
  draftCompletedDate: string;
  submittedToCocoDate: string;
  processedDate: string | null;
  sentDate: string | null;
  deliveryStatus: DeliveryStatus;
  documentType: DocumentType;
  owner: string;
  /** Days between submitted-to-COCO and processed — calculated. */
  cocoProcessingTime: number | null;
  tags: string[];
  summary: string;
}

export interface ActionItem {
  id: string;
  correspondenceRef: string;
  description: string;
  owner: string;
  department: Department;
  dueDate: string;
  priority: Priority;
  status: ActionStatus;
  /** 0-100 */
  progress: number;
  direction: "Incoming" | "Outgoing";
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  department: Department;
  avatarColor: string;
  lettersProcessed: number;
  avgTurnaroundDays: number;
  slaCompliance: number; // %
  overdueCount: number;
  openWorkload: number;
}

export interface ArchiveRecord {
  id: string;
  referenceNumber: string;
  title: string;
  date: string;
  sender: string;
  recipient: string;
  direction: "Incoming" | "Outgoing";
  department: Department;
  stakeholderType: StakeholderType;
  documentType: DocumentType;
  status: ActionStatus;
  summary: string;
  tags: string[];
  fileSizeKb: number;
  pages: number;
}

// --- Derived helpers -------------------------------------------------------

export function isOverdue(record: {
  dueDate: string;
  status: ActionStatus;
}): boolean {
  if (record.status === "Closed" || record.status === "Sent") return false;
  return new Date(record.dueDate).getTime() < Date.now();
}
