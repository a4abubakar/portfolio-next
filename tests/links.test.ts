import { describe, expect, it } from "vitest";
import { isPlaceholderUrl, mailtoHref, resolveLink } from "@/lib/links";

describe("link helpers", () => {
  it("treats TODO and empty values as placeholders", () => {
    expect(isPlaceholderUrl("TODO")).toBe(true);
    expect(isPlaceholderUrl("https://github.com/TODO")).toBe(true);
    expect(isPlaceholderUrl("")).toBe(true);
    expect(isPlaceholderUrl(undefined)).toBe(true);
    expect(isPlaceholderUrl("https://github.com/someone/repo")).toBe(false);
  });

  it("only resolves real URLs to hrefs", () => {
    expect(resolveLink("TODO")).toEqual({ href: null, isPlaceholder: true, external: false });
    expect(resolveLink("https://example.com/demo")).toEqual({
      href: "https://example.com/demo",
      isPlaceholder: false,
      external: true,
    });
    expect(resolveLink("/cv.pdf").external).toBe(false);
  });

  it("builds a mailto link with an encoded subject", () => {
    expect(mailtoHref("a@b.co")).toBe("mailto:a@b.co");
    expect(mailtoHref("a@b.co", "Hello there")).toBe("mailto:a@b.co?subject=Hello%20there");
  });
});
