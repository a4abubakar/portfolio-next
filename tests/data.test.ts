import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { profile } from "@/data/profile";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/jsonld";

describe("content data", () => {
  it("has unique project slugs and every project defines its demo and repo links", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const project of projects) {
      expect(project.liveUrl).toBeTruthy();
      expect(project.repoUrl).toBeTruthy();
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });

  it("has non-empty skill groups with no duplicate entries inside a group", () => {
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0);
      expect(new Set(group.items).size).toBe(group.items.length);
    }
  });

  it("never exposes a phone number in the profile", () => {
    expect(Object.keys(profile).some((key) => /phone|tel|mobile/i.test(key))).toBe(false);
    expect(JSON.stringify(profile)).not.toMatch(/\+?\d[\d\s-]{8,}\d/);
  });
});

describe("Person JSON-LD", () => {
  it("describes the owner and omits placeholder profile links", () => {
    const data = buildPersonJsonLd();
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Muhammad Abubaker Siddiq");
    expect(data.sameAs).toEqual([profile.linkedinUrl]);
    expect(data.address.addressLocality).toBe("Karachi");
  });

  it("escapes angle brackets so data cannot close the script tag", () => {
    expect(serializeJsonLd({ x: "</script><b>" })).not.toContain("<");
  });
});
