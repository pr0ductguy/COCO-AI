import type {
  Department,
  DocumentType,
  StakeholderType,
} from "@/lib/types";

export const STAKEHOLDERS: { name: string; type: StakeholderType }[] = [
  { name: "NUPRC — Nigerian Upstream Petroleum Regulatory Commission", type: "Regulator" },
  { name: "NNPC Limited", type: "JV Partner" },
  { name: "NCDMB — Nigerian Content Development & Monitoring Board", type: "Regulator" },
  { name: "FAAN — Federal Airports Authority of Nigeria", type: "Government Ministry" },
  { name: "NSC — Nigerian Shippers' Council", type: "Regulator" },
  { name: "DPR — Department of Petroleum Resources", type: "Regulator" },
  { name: "Federal Ministry of Petroleum Resources", type: "Government Ministry" },
  { name: "Federal Ministry of Environment", type: "Government Ministry" },
  { name: "NESREA — National Environmental Standards Agency", type: "Regulator" },
  { name: "Total E&P Nigeria (JV Partner)", type: "JV Partner" },
  { name: "Chevron Nigeria Limited (JV Partner)", type: "JV Partner" },
  { name: "Bonny Kingdom Community Council", type: "Community" },
  { name: "Ogoni Community Representatives", type: "Community" },
  { name: "Egbema Community Trust", type: "Community" },
  { name: "Schlumberger Nigeria (Vendor)", type: "Vendor" },
  { name: "Halliburton Energy Services (Vendor)", type: "Vendor" },
  { name: "Daystar Power Solutions (Vendor)", type: "Vendor" },
  { name: "Stakeholder Democracy Network (NGO)", type: "NGO" },
  { name: "Amnesty International — Niger Delta", type: "NGO" },
  { name: "Federal Inland Revenue Service (FIRS)", type: "Government Ministry" },
  { name: "Rivers State Government", type: "Government Ministry" },
  { name: "Delta State Ministry of Energy", type: "Government Ministry" },
  { name: "Olaniwun Ajayi LP (Legal Counsel)", type: "Legal" },
  { name: "Templars Law (External Counsel)", type: "Legal" },
];

export const DEPARTMENTS: Department[] = [
  "External Relations",
  "Legal & Compliance",
  "Regulatory Affairs",
  "Government Relations",
  "Joint Ventures",
  "Procurement",
  "Community Relations",
  "HSE",
  "Finance",
  "Corporate Affairs",
];

export const DOCUMENT_TYPES: DocumentType[] = [
  "Letter",
  "Approval",
  "Notice",
  "Permit",
  "Memo",
  "Report",
  "Invoice",
  "Contract",
  "Query",
  "Directive",
];

export const OFFICERS = [
  { name: "Adaeze Okonkwo", role: "Senior Correspondence Officer", department: "Regulatory Affairs" as Department, color: "#dc2626" },
  { name: "Tunde Bakare", role: "Correspondence Officer", department: "Government Relations" as Department, color: "#2563eb" },
  { name: "Ngozi Eze", role: "Lead Analyst", department: "External Relations" as Department, color: "#16a34a" },
  { name: "Ibrahim Suleiman", role: "Correspondence Officer", department: "Joint Ventures" as Department, color: "#9333ea" },
  { name: "Funmilayo Adeyemi", role: "Compliance Officer", department: "Legal & Compliance" as Department, color: "#0891b2" },
  { name: "Chidi Nwosu", role: "Community Liaison", department: "Community Relations" as Department, color: "#ca8a04" },
  { name: "Aisha Mohammed", role: "Senior Officer", department: "Procurement" as Department, color: "#db2777" },
  { name: "Emeka Obi", role: "Correspondence Officer", department: "HSE" as Department, color: "#65a30d" },
  { name: "Bola Akintola", role: "Finance Correspondence Lead", department: "Finance" as Department, color: "#7c3aed" },
  { name: "Grace Williams", role: "Corporate Affairs Officer", department: "Corporate Affairs" as Department, color: "#0d9488" },
];

export const SUBJECT_TEMPLATES: {
  subject: string;
  tags: string[];
  docType: DocumentType;
  dept: Department;
}[] = [
  { subject: "Gas Flare Reduction Approval — OML {oml}", tags: ["gas flare", "approval", "emissions"], docType: "Approval", dept: "Regulatory Affairs" },
  { subject: "Renewal of Environmental Impact Assessment Permit", tags: ["EIA", "permit", "environment"], docType: "Permit", dept: "HSE" },
  { subject: "Community Compensation Settlement — {community}", tags: ["community compensation", "settlement"], docType: "Letter", dept: "Community Relations" },
  { subject: "Vendor Registration & Pre-Qualification Request", tags: ["vendor registration", "procurement"], docType: "Query", dept: "Procurement" },
  { subject: "Nigerian Content Compliance Submission Q{q} {year}", tags: ["local content", "NCDMB", "compliance"], docType: "Report", dept: "Regulatory Affairs" },
  { subject: "Joint Venture Cash Call Reconciliation — {year}", tags: ["JV", "cash call", "finance"], docType: "Memo", dept: "Joint Ventures" },
  { subject: "Crude Oil Export Permit Application — Terminal {oml}", tags: ["export", "permit", "crude"], docType: "Permit", dept: "Regulatory Affairs" },
  { subject: "Regulatory Query on Production Reporting", tags: ["query", "production", "regulator"], docType: "Query", dept: "Regulatory Affairs" },
  { subject: "Pipeline Right-of-Way Easement Negotiation", tags: ["pipeline", "right of way", "land"], docType: "Letter", dept: "Community Relations" },
  { subject: "Oil Spill Incident Notification & Remediation Plan", tags: ["oil spill", "HSE", "remediation"], docType: "Notice", dept: "HSE" },
  { subject: "Tax Assessment Clarification Request — FIRS", tags: ["tax", "FIRS", "finance"], docType: "Letter", dept: "Finance" },
  { subject: "Drilling Campaign HSE Clearance — OML {oml}", tags: ["drilling", "HSE", "clearance"], docType: "Approval", dept: "HSE" },
  { subject: "Marine Logistics Vendor Contract Award", tags: ["marine", "vendor", "contract"], docType: "Contract", dept: "Procurement" },
  { subject: "Decommissioning & Abandonment Plan Submission", tags: ["decommissioning", "abandonment"], docType: "Report", dept: "Regulatory Affairs" },
  { subject: "Stakeholder Engagement Summary — Host Communities", tags: ["stakeholder", "community", "engagement"], docType: "Memo", dept: "External Relations" },
  { subject: "Directive on Petroleum Industry Act Compliance", tags: ["PIA", "directive", "compliance"], docType: "Directive", dept: "Legal & Compliance" },
  { subject: "Field Development Plan Approval — {community} Field", tags: ["FDP", "approval", "development"], docType: "Approval", dept: "Joint Ventures" },
  { subject: "Annual Shipping & Cabotage Compliance Return", tags: ["cabotage", "shipping", "NSC"], docType: "Report", dept: "Regulatory Affairs" },
  { subject: "Memorandum of Understanding — Community Development", tags: ["MOU", "community", "development"], docType: "Contract", dept: "Community Relations" },
  { subject: "Request for Information on Royalty Payments", tags: ["royalty", "finance", "regulator"], docType: "Query", dept: "Finance" },
];

export const OML_NUMBERS = ["11", "17", "21", "23", "28", "35", "43", "74", "77", "79"];

export const COMMUNITIES = [
  "Bonny",
  "Ogoni",
  "Egbema",
  "Eleme",
  "Gokana",
  "Andoni",
  "Okrika",
  "Bille",
];
