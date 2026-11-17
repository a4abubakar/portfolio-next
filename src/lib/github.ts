import { cacheLife } from "next/cache";

export interface ContributionDay {
  /** `YYYY-MM-DD` */
  date: string;
  count: number;
  /** 0 (none) to 4 (most), as GitHub buckets them. */
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
}

/** One column of the chart: Sunday to Saturday, `null` where the year starts or ends mid-week. */
export type ContributionWeek = (ContributionDay | null)[];

const SOURCE = "https://github-contributions-api.jogruber.de/v4";

/** Validates the public contributions API response (the same numbers GitHub shows on the profile). */
export function parseContributions(json: unknown): ContributionData | null {
  if (!json || typeof json !== "object") return null;
  const { total, contributions } = json as { total?: { lastYear?: unknown }; contributions?: unknown };
  if (!Array.isArray(contributions)) return null;

  const days: ContributionDay[] = [];
  for (const item of contributions) {
    const { date, count, level } = (item ?? {}) as Record<string, unknown>;
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    if (typeof count !== "number" || count < 0) return null;
    const lvl = typeof level === "number" ? Math.min(4, Math.max(0, Math.round(level))) : 0;
    days.push({ date, count, level: lvl as ContributionDay["level"] });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));

  const sum = days.reduce((acc, d) => acc + d.count, 0);
  const lastYear = typeof total?.lastYear === "number" ? total.lastYear : sum;
  return { total: lastYear, days };
}

/** Day of week for a `YYYY-MM-DD` date, 0 = Sunday, computed in UTC so it never shifts with the server's time zone. */
function weekday(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

/** Groups days into Sunday-to-Saturday columns, padding the first and last week with `null`. */
export function toWeeks(days: ContributionDay[]): ContributionWeek[] {
  const weeks: ContributionWeek[] = [];
  let current: ContributionWeek = [];
  for (const day of days) {
    const dow = weekday(day.date);
    if (current.length === 0 && dow > 0) current = Array(dow).fill(null);
    current.push(day);
    if (dow === 6) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length) weeks.push([...current, ...Array(7 - current.length).fill(null)]);
  return weeks;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Month labels positioned at the first week whose first real day starts that month. */
export function monthLabels(weeks: ContributionWeek[]): { week: number; label: string }[] {
  const labels: { week: number; label: string }[] = [];
  let last = -1;
  weeks.forEach((week, index) => {
    const first = week.find((d): d is ContributionDay => d !== null);
    if (!first) return;
    const month = Number(first.date.slice(5, 7)) - 1;
    if (month !== last) {
      // Skip a label squeezed into the final columns, where it would overlap the next one.
      if (labels.length === 0 || index - labels[labels.length - 1].week >= 3) labels.push({ week: index, label: MONTHS[month] });
      last = month;
    }
  });
  return labels;
}

/** Busiest day and number of active days, for the text summary. */
export function summarize(days: ContributionDay[]): { activeDays: number; best: ContributionDay | null } {
  let best: ContributionDay | null = null;
  let activeDays = 0;
  for (const day of days) {
    if (day.count > 0) activeDays++;
    if (!best || day.count > best.count) best = day;
  }
  return { activeDays, best: best && best.count > 0 ? best : null };
}

/** Last 12 months of contributions, cached for a day. Returns `null` when the source is unavailable. */
export async function getContributions(username: string): Promise<ContributionData | null> {
  "use cache";
  cacheLife("days");
  try {
    const res = await fetch(`${SOURCE}/${encodeURIComponent(username)}?y=last`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return parseContributions(await res.json());
  } catch {
    return null;
  }
}
