import {
  generateActions,
  generateArchive,
  generateIncoming,
  generateOfficers,
  generateOutgoing,
} from "./generate";

// Generated once per server/module load. Deterministic seed → stable data,
// so this acts as the in-memory mock "database" that future integrations
// (Dataverse / SharePoint / Microsoft Graph) will replace.
export const incoming = generateIncoming();
export const outgoing = generateOutgoing();
export const officers = generateOfficers();
export const archive = generateArchive();
export const actions = generateActions(incoming, outgoing);

export function getIncomingById(id: string) {
  return incoming.find((r) => r.id === id || r.referenceNumber === id);
}
export function getArchiveById(id: string) {
  return archive.find((r) => r.id === id || r.referenceNumber === id);
}
