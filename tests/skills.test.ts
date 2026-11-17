import { describe, expect, it } from "vitest";
import { lastCardSpan } from "@/components/SkillsSection";
import { skillGroups } from "@/data/skills";

describe("skills", () => {
  it("has a backend and databases group with the CV's backend stack", () => {
    const backend = skillGroups.find((g) => g.id === "backend");
    expect(backend?.title).toBe("Backend & databases");
    expect(backend?.items).toEqual(expect.arrayContaining(["Node.js", "Firebase", "MySQL", "PostgreSQL", "NoSQL databases"]));
  });

  it("never lists the same skill in two groups", () => {
    const all = skillGroups.flatMap((g) => g.items);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe("lastCardSpan", () => {
  it("only stretches the last card, and only when it would sit alone", () => {
    expect(lastCardSpan(0, 7)).toBe("");
    expect(lastCardSpan(6, 7)).toBe("sm:col-span-2 lg:col-span-3"); // 7 = 3+3+1 and 2+2+2+1
    expect(lastCardSpan(5, 6)).toBe(""); // fills both grids exactly
    expect(lastCardSpan(4, 5)).toBe("sm:col-span-2 lg:col-span-1"); // alone on tablet, paired on desktop
    expect(lastCardSpan(3, 4)).toBe("lg:col-span-3"); // 4 = 3+1 on desktop, 2+2 on tablet
  });
});
