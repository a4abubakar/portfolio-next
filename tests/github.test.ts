import { describe, expect, it, vi } from "vitest";

// `cacheLife` only works inside the Next.js runtime; the pure helpers don't need it.
vi.mock("next/cache", () => ({ cacheLife: () => {} }));

import { monthLabels, parseContributions, summarize, toWeeks, type ContributionDay } from "@/lib/github";

function day(date: string, count = 0, level: ContributionDay["level"] = 0): ContributionDay {
  return { date, count, level };
}

describe("parseContributions", () => {
  it("reads the API shape, clamps levels and sorts by date", () => {
    const data = parseContributions({
      total: { lastYear: 7 },
      contributions: [
        { date: "2026-01-02", count: 5, level: 9 },
        { date: "2026-01-01", count: 2, level: 1 },
      ],
    });
    expect(data?.total).toBe(7);
    expect(data?.days.map((d) => d.date)).toEqual(["2026-01-01", "2026-01-02"]);
    expect(data?.days[1].level).toBe(4);
  });

  it("falls back to the sum of days when the total is missing, and rejects bad input", () => {
    expect(parseContributions({ contributions: [{ date: "2026-01-01", count: 3, level: 1 }] })?.total).toBe(3);
    expect(parseContributions({ contributions: [{ date: "1 Jan", count: 3 }] })).toBeNull();
    expect(parseContributions({ contributions: "nope" })).toBeNull();
    expect(parseContributions(null)).toBeNull();
  });
});

describe("toWeeks", () => {
  it("groups days into Sunday-to-Saturday columns with padding", () => {
    // 2026-01-01 is a Thursday, 2026-01-10 is a Saturday.
    const days = Array.from({ length: 10 }, (_, i) => day(`2026-01-${String(i + 1).padStart(2, "0")}`));
    const weeks = toWeeks(days);
    expect(weeks).toHaveLength(2);
    expect(weeks.every((w) => w.length === 7)).toBe(true);
    expect(weeks[0].slice(0, 4)).toEqual([null, null, null, null]);
    expect(weeks[0][4]?.date).toBe("2026-01-01");
    expect(weeks[1][6]?.date).toBe("2026-01-10");
  });

  it("pads a final partial week", () => {
    const weeks = toWeeks([day("2026-01-04"), day("2026-01-05")]); // Sunday, Monday
    expect(weeks).toHaveLength(1);
    expect(weeks[0].filter(Boolean)).toHaveLength(2);
    expect(weeks[0]).toHaveLength(7);
  });
});

describe("monthLabels and summarize", () => {
  it("labels each month once, skipping a label too close to the previous one", () => {
    const days: ContributionDay[] = [];
    for (let d = new Date("2026-01-01T00:00:00Z"); d <= new Date("2026-03-31T00:00:00Z"); d.setUTCDate(d.getUTCDate() + 1)) {
      days.push(day(d.toISOString().slice(0, 10)));
    }
    const labels = monthLabels(toWeeks(days)).map((l) => l.label);
    expect(labels).toEqual(["Jan", "Feb", "Mar"]);
  });

  it("counts active days and finds the busiest day", () => {
    const result = summarize([day("2026-01-01", 0), day("2026-01-02", 4, 3), day("2026-01-03", 9, 4)]);
    expect(result.activeDays).toBe(2);
    expect(result.best?.date).toBe("2026-01-03");
    expect(summarize([day("2026-01-01")]).best).toBeNull();
  });
});
