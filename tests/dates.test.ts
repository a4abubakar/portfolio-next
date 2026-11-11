import { describe, expect, it } from "vitest";
import { formatDuration, formatMonth, formatPeriod, sortByRecency } from "@/lib/dates";
import { experience } from "@/data/experience";

describe("date helpers", () => {
  it("formats a YYYY-MM value as a short month and year", () => {
    expect(formatMonth("2025-12")).toBe("Dec 2025");
    expect(formatMonth("2017-01")).toBe("Jan 2017");
  });

  it("rejects malformed dates instead of rendering nonsense", () => {
    expect(() => formatMonth("2025-13")).toThrow();
    expect(() => formatMonth("Dec 2025")).toThrow();
  });

  it("formats finished and current periods", () => {
    expect(formatPeriod("2022-02", "2025-12")).toBe("Feb 2022 to Dec 2025");
    expect(formatPeriod("2025-12", null)).toBe("Dec 2025 to present");
  });

  it("counts months inclusively and pluralises", () => {
    expect(formatDuration("2022-02", "2025-12")).toBe("3 yrs 11 mos");
    expect(formatDuration("2021-01", "2022-01")).toBe("1 yr 1 mo");
    expect(formatDuration("2023-04", "2023-04")).toBe("1 mo");
    expect(formatDuration("2024-01", "2024-12")).toBe("1 yr");
  });

  it("leaves current roles without a duration so static pages cannot go stale", () => {
    expect(formatDuration("2025-12", null)).toBe("");
  });

  it("sorts current roles first, then by end date, then by start date", () => {
    const sorted = sortByRecency([
      { id: "a", start: "2019-01", end: "2020-01" },
      { id: "b", start: "2021-01", end: null },
      { id: "c", start: "2018-01", end: "2020-01" },
      { id: "d", start: "2020-06", end: "2022-03" },
    ]);
    expect(sorted.map((r) => r.id)).toEqual(["b", "d", "a", "c"]);
  });

  it("keeps the real experience list in order, newest first, with valid dates", () => {
    const sorted = sortByRecency(experience);
    expect(sorted[0].company).toBe("InsuranceMarket.ae");
    expect(sorted[sorted.length - 1].company).toBe("Saylani Welfare International Trust");
    for (const role of experience) {
      expect(() => formatPeriod(role.start, role.end)).not.toThrow();
      expect(() => formatDuration(role.start, role.end)).not.toThrow();
    }
  });
});
