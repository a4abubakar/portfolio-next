import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({ cacheLife: () => {} }));

import { AiSection } from "@/components/AiSection";
import { ContributionChart } from "@/components/GitHubActivity";
import { aiWork } from "@/data/ai";

describe("AiSection", () => {
  it("renders one card per AI project with its impact and tech", () => {
    render(<AiSection />);
    expect(screen.getByRole("heading", { level: 2, name: "AI engineering" })).toBeInTheDocument();
    for (const item of aiWork) {
      const card = screen.getByRole("article", { name: item.title });
      expect(within(card).getByText(item.impact)).toBeInTheDocument();
      expect(within(card).getByRole("list", { name: "Technologies" })).toBeInTheDocument();
    }
  });
});

describe("ContributionChart", () => {
  it("draws a cell per day and summarises the year for screen readers", () => {
    const days = [
      { date: "2026-01-04", count: 0, level: 0 as const },
      { date: "2026-01-05", count: 3, level: 2 as const },
      { date: "2026-01-06", count: 12, level: 4 as const },
    ];
    const { container } = render(<ContributionChart data={{ total: 15, days }} />);
    expect(container.querySelectorAll("rect[data-level]")).toHaveLength(3);
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "15 contributions in the last year across 2 active days; busiest day 6 Jan 2026 with 12 contributions.",
    );
    expect(screen.getByText("2 active days")).toBeInTheDocument();
  });
});
