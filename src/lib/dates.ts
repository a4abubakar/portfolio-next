import type { Experience } from "@/data/experience";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const YEAR_MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

function parseYearMonth(value: string): { year: number; month: number } {
  const match = YEAR_MONTH.exec(value);
  if (!match) throw new Error(`Expected a YYYY-MM date, received "${value}"`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

/** "2025-12" -> "Dec 2025" */
export function formatMonth(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "2022-02", "2025-12" -> "Feb 2022 to Dec 2025"; a null end means a current role. */
export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} to ${end ? formatMonth(end) : "present"}`;
}

/**
 * Inclusive length of a finished role, e.g. "2022-02" to "2025-12" is 47 months.
 * Returns an empty string for current roles so statically built pages never go stale.
 */
export function formatDuration(start: string, end: string | null): string {
  if (!end) return "";
  const s = parseYearMonth(start);
  const e = parseYearMonth(end);
  const total = (e.year - s.year) * 12 + (e.month - s.month) + 1;
  if (total < 1) throw new Error(`End date ${end} is before start date ${start}`);
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (months) parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

/** Most recent first: current roles on top, then by end date, then by start date. */
export function sortByRecency<T extends Pick<Experience, "start" | "end">>(items: readonly T[]): T[] {
  const endKey = (item: T) => item.end ?? "9999-12";
  return [...items].sort((a, b) => {
    const byEnd = endKey(b).localeCompare(endKey(a));
    return byEnd !== 0 ? byEnd : b.start.localeCompare(a.start);
  });
}
