import { profile } from "@/data/profile";
import { getContributions, monthLabels, summarize, toWeeks, type ContributionData } from "@/lib/github";
import { SectionHeading } from "@/components/SectionHeading";

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30;
const TOP = 18;

/** Accent-tinted scale that follows the light and dark theme tokens. */
const LEVEL_FILL = [
  "var(--surface-2)",
  "color-mix(in srgb, var(--accent) 30%, var(--surface-2))",
  "color-mix(in srgb, var(--accent) 55%, var(--surface-2))",
  "color-mix(in srgb, var(--accent) 80%, var(--surface-2))",
  "var(--accent)",
];

const DAY_LABELS: [number, string][] = [
  [1, "Mon"],
  [3, "Wed"],
  [5, "Fri"],
];

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function plural(n: number, word: string): string {
  return `${n.toLocaleString("en-US")} ${word}${n === 1 ? "" : "s"}`;
}

export function ContributionChart({ data }: { data: ContributionData }) {
  const weeks = toWeeks(data.days);
  const months = monthLabels(weeks);
  const { activeDays, best } = summarize(data.days);
  const width = LEFT + weeks.length * STEP;
  const height = TOP + 7 * STEP;
  const summary = `${plural(data.total, "contribution")} in the last year across ${plural(activeDays, "active day")}${
    best ? `; busiest day ${formatDate(best.date)} with ${plural(best.count, "contribution")}` : ""
  }.`;

  return (
    <figure className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-6" data-testid="github-chart">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-lg font-semibold tracking-tight">
          {plural(data.total, "contribution")} <span className="font-normal text-muted">in the last year</span>
        </p>
        <p className="text-sm text-muted">{plural(activeDays, "active day")}</p>
      </figcaption>

      {/* dir="rtl" makes the scroll start at the right end on small screens, so the latest months show first. */}
      <div dir="rtl" tabIndex={0} role="region" aria-label="Contribution calendar, scrollable" className="mt-4 overflow-x-auto pb-1 focus-visible:rounded-md">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={summary}
          className="block h-auto w-full max-w-none"
          style={{ minWidth: width, direction: "ltr" }}
        >
          {months.map(({ week, label }) => (
            <text key={`${label}-${week}`} x={LEFT + week * STEP} y={11} className="fill-muted" fontSize={10}>
              {label}
            </text>
          ))}
          {DAY_LABELS.map(([row, label]) => (
            <text key={label} x={0} y={TOP + row * STEP + CELL - 2} className="fill-muted" fontSize={10}>
              {label}
            </text>
          ))}
          {weeks.map((week, x) =>
            week.map((day, y) =>
              day ? (
                <rect
                  key={day.date}
                  x={LEFT + x * STEP}
                  y={TOP + y * STEP}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  style={{ fill: LEVEL_FILL[day.level] }}
                  data-level={day.level}
                >
                  <title>{`${plural(day.count, "contribution")} on ${formatDate(day.date)}`}</title>
                </rect>
              ) : null,
            ),
          )}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        <p>Includes private contributions to company repositories. Updated daily.</p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span>Less</span>
          {LEVEL_FILL.map((fill) => (
            <span key={fill} className="inline-block size-[11px] rounded-[2px]" style={{ background: fill }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </figure>
  );
}

function Fallback() {
  return (
    <p className="mt-10 rounded-2xl border border-dashed border-line p-6 text-muted">
      The activity chart is unavailable right now. See the full history on{" "}
      <a href={profile.githubUrl} className="font-medium text-accent underline-offset-4 hover:underline">
        GitHub
      </a>
      .
    </p>
  );
}

export function GitHubActivitySkeleton() {
  return <div className="mt-10 h-48 animate-pulse rounded-2xl border border-line bg-surface-2/60" aria-hidden="true" />;
}

export async function GitHubActivityChart() {
  const username = profile.githubUrl.split("/").filter(Boolean).pop() ?? "";
  const data = username ? await getContributions(username) : null;
  return data && data.days.length > 0 ? <ContributionChart data={data} /> : <Fallback />;
}

export function GitHubActivityHeading() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <SectionHeading
        id="activity-title"
        eyebrow="Code activity"
        title="GitHub activity"
        intro="A year of commits, pull requests and reviews, most of it on production email and web projects."
      />
      <a
        href={profile.githubUrl}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2"
        aria-label="View GitHub profile"
      >
        @{profile.githubUrl.split("/").filter(Boolean).pop()}
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </a>
    </div>
  );
}
