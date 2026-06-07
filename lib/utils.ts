import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fixed "today" for the prototype. The mock data is generated relative to this
 * date, so anchoring all overdue/age calculations here keeps demo figures
 * stable AND guarantees identical SSR/client renders (no hydration mismatch).
 * In production this becomes `new Date()` once data is live.
 */
export const REFERENCE_DATE = new Date("2026-06-07T00:00:00Z");

export function now(): Date {
  return REFERENCE_DATE;
}

/** Format an ISO date string as e.g. "12 Mar 2024". */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Whole days between two dates (b - a). */
export function daysBetween(
  a: string | Date | null | undefined,
  b: string | Date | null | undefined
): number | null {
  if (!a || !b) return null;
  const d1 = typeof a === "string" ? new Date(a) : a;
  const d2 = typeof b === "string" ? new Date(b) : b;
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

/** Days from now until the given date (negative = overdue). */
export function daysUntil(date: string | Date | null | undefined): number | null {
  if (!date) return null;
  return daysBetween(new Date(), date);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function pluralize(count: number, singular: string, plural?: string) {
  return count === 1 ? singular : plural ?? `${singular}s`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
