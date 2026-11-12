import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { profile } from "@/data/profile";
import { clientProjects } from "@/data/clients";
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

  it("lists a dialable phone number and real profile links", () => {
    expect(profile.phone).toMatch(/^\+\d[\d ]{8,}\d$/);
    for (const url of [profile.linkedinUrl, profile.githubUrl, profile.facebookUrl]) {
      expect(url).toMatch(/^https:\/\//);
    }
  });

  it("has unique client projects with https links and a screenshot or fallback colours", () => {
    const slugs = clientProjects.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(clientProjects).toHaveLength(7);
    expect(clientProjects[0].slug).toBe("insurancemarket");
    for (const client of clientProjects) {
      expect(client.url).toMatch(/^https:\/\//);
      expect(client.summary.length).toBeGreaterThan(20);
      expect(client.image ?? client.colors.from).toBeTruthy();
    }
  });
});

describe("Person JSON-LD", () => {
  it("describes the owner and lists real profile links", () => {
    const data = buildPersonJsonLd();
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Muhammad Abubaker Siddiq");
    expect(data.sameAs).toEqual([profile.linkedinUrl, profile.githubUrl]);
    expect(data.address.addressLocality).toBe("Karachi");
  });

  it("escapes angle brackets so data cannot close the script tag", () => {
    expect(serializeJsonLd({ x: "</script><b>" })).not.toContain("<");
  });
});
