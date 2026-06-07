import type { ExtractedFields } from "@/lib/integrations";

// Simulated Azure OpenAI document understanding. Deterministic per filename so
// the demo is reproducible. Future: replace with a Graph + Azure OpenAI call
// that streams real extractions from the uploaded document bytes.

const SAMPLE_EXTRACTIONS: Omit<ExtractedFields, "confidence">[] = [
  {
    sender: "NUPRC — Nigerian Upstream Petroleum Regulatory Commission",
    recipient: "Shell Petroleum Development Company (SPDC)",
    subject: "Gas Flare Reduction Compliance — Conditional Approval (OML 35)",
    referenceNumber: "NUPRC/GF/2026/0417",
    dueDate: "2026-06-21",
    requiredAction:
      "Submit revised flare-down schedule and metering certification within 14 days of receipt.",
    stakeholderType: "Regulator",
    riskLevel: "High",
    summary:
      "NUPRC grants conditional approval for the OML 35 gas flare reduction programme, subject to submission of a revised flare-down schedule and independent metering certification. Non-compliance within the 14-day window risks penalty under the Petroleum Industry Act flaring provisions. Recommend immediate routing to Regulatory Affairs with HSE input.",
  },
  {
    sender: "Bonny Kingdom Community Council",
    recipient: "Shell Petroleum Development Company (SPDC)",
    subject: "Community Compensation Settlement — Pipeline Right-of-Way",
    referenceNumber: "BKCC/COMP/2026/088",
    dueDate: "2026-06-30",
    requiredAction:
      "Convene joint valuation committee and respond with revised compensation schedule.",
    stakeholderType: "Community",
    riskLevel: "Medium",
    summary:
      "The Bonny Kingdom Community Council requests a joint valuation committee to finalise compensation for the pipeline right-of-way. The matter carries community-relations and reputational sensitivity. A coordinated response from Community Relations and Legal & Compliance is advised ahead of the proposed engagement.",
  },
  {
    sender: "NCDMB — Nigerian Content Development & Monitoring Board",
    recipient: "Shell Petroleum Development Company (SPDC)",
    subject: "Nigerian Content Compliance — Q2 2026 Submission Query",
    referenceNumber: "NCDMB/NC/2026/1192",
    dueDate: "2026-06-17",
    requiredAction:
      "Provide updated local-content utilisation report and remediation plan for two flagged contracts.",
    stakeholderType: "Regulator",
    riskLevel: "Critical",
    summary:
      "NCDMB has flagged two contracts in the Q2 2026 Nigerian Content submission and requests an updated utilisation report plus remediation plan. Given the regulatory exposure and short statutory window, this is assessed as critical risk and should be escalated to the Regulatory Affairs lead immediately.",
  },
  {
    sender: "Schlumberger Nigeria (Vendor)",
    recipient: "Shell Petroleum Development Company (SPDC)",
    subject: "Vendor Pre-Qualification Renewal & Rate Submission",
    referenceNumber: "SLB/PQ/2026/0233",
    dueDate: "2026-07-05",
    requiredAction:
      "Review pre-qualification pack and confirm acceptance of revised service rates.",
    stakeholderType: "Vendor",
    riskLevel: "Low",
    summary:
      "Routine vendor pre-qualification renewal with a revised rate card from Schlumberger Nigeria. Low risk; standard Procurement review and confirmation required. Suitable for automated routing to the Procurement queue.",
  },
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function simulateExtraction(filename: string): ExtractedFields {
  const idx = hashString(filename) % SAMPLE_EXTRACTIONS.length;
  const base = SAMPLE_EXTRACTIONS[idx];
  const confidence = 90 + (hashString(filename) % 9); // 90–98%
  return { ...base, confidence };
}

export const EXTRACTION_STAGES = [
  "Uploading document to secure store…",
  "Running OCR & layout analysis…",
  "Classifying document type & stakeholder…",
  "Extracting key fields with Azure OpenAI…",
  "Assessing risk & generating summary…",
];
