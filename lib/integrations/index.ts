// ============================================================================
// Integration layer (stubs)
// ----------------------------------------------------------------------------
// COCO AI is designed so the mock data store can be swapped for live enterprise
// services without touching the UI. Each connector below exposes the surface the
// product will use; today they resolve against local mock data, tomorrow against
// Microsoft Graph / Dataverse / Power Automate. Keep UI code talking to these
// interfaces rather than the raw store to keep the seam clean.
// ============================================================================

export type IntegrationStatus = "connected" | "configured" | "planned";

export interface IntegrationDescriptor {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  scopes: string[];
}

export const INTEGRATIONS: IntegrationDescriptor[] = [
  {
    id: "m365",
    name: "Microsoft 365",
    description:
      "Single sign-on via Entra ID and unified identity for all COCO officers.",
    status: "planned",
    scopes: ["User.Read", "Directory.Read.All"],
  },
  {
    id: "outlook",
    name: "Outlook / Exchange",
    description:
      "Auto-ingest incoming correspondence from monitored COCO mailboxes; send outgoing replies.",
    status: "planned",
    scopes: ["Mail.Read", "Mail.Send"],
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    description:
      "Document library of record for scanned correspondence, with retention labels back to 2003.",
    status: "planned",
    scopes: ["Sites.ReadWrite.All"],
  },
  {
    id: "dataverse",
    name: "Dataverse",
    description:
      "System of record for correspondence entities, actions, SLAs and audit history.",
    status: "planned",
    scopes: ["Dataverse.user_impersonation"],
  },
  {
    id: "power-automate",
    name: "Power Automate",
    description:
      "Routing, reminders, escalations and SLA breach workflows triggered on record changes.",
    status: "planned",
    scopes: ["Flow.Manage"],
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    description:
      "Document understanding, field extraction, summarisation and semantic historical search.",
    status: "planned",
    scopes: ["Cognitive Services User"],
  },
];

// --- AI extraction contract (today: simulated; tomorrow: Azure OpenAI) -------

export interface ExtractedFields {
  sender: string;
  recipient: string;
  subject: string;
  referenceNumber: string;
  dueDate: string;
  requiredAction: string;
  stakeholderType: string;
  riskLevel: "Critical" | "High" | "Medium" | "Low";
  confidence: number;
  summary: string;
}
