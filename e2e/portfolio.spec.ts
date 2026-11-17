import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";
import { clientProjects } from "../src/data/clients";
import { aiWork } from "../src/data/ai";

test.describe("portfolio", () => {
  test("loads with the headline, landmarks and metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Muhammad Abubaker Siddiq/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Senior Frontend Engineer");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(jsonLd ?? "{}")["@type"]).toBe("Person");
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });

  test("nav anchors scroll to their sections", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    for (const [label, id] of [
      ["Projects", "projects"],
      ["AI", "ai"],
      ["Experience", "experience"],
      ["Skills", "skills"],
      ["Contact", "contact"],
    ]) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.1 });
    }
  });

  test("AI section lists the AI work and the GitHub chart renders", async ({ page }) => {
    await page.goto("/");
    const ai = page.locator("#ai");
    await expect(ai.getByRole("heading", { level: 2, name: "AI engineering" })).toBeVisible();
    await expect(ai.getByTestId("ai-card")).toHaveCount(aiWork.length);
    for (const item of aiWork) {
      await expect(ai.getByRole("article", { name: item.title })).toBeVisible();
    }

    const activity = page.locator("#activity");
    await expect(activity.getByRole("link", { name: "View GitHub profile" })).toHaveAttribute("href", "https://github.com/a4abubakar");
    // Either the chart (normal case) or the plain GitHub link if the data source is down.
    const chart = activity.getByTestId("github-chart");
    if (await chart.count()) {
      await expect(chart.getByRole("img")).toHaveAttribute("aria-label", /contributions? in the last year/);
      expect(await chart.locator("rect[data-level]").count()).toBeGreaterThan(300);
    } else {
      await expect(activity.getByText("The activity chart is unavailable right now")).toBeVisible();
    }
  });

  test("dark mode toggles and persists across reload", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: "Dark mode" });

    await expect(html).not.toHaveClass(/dark/);
    await toggle.click();
    await expect(html).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(html).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("follows the system colour scheme by default", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("every project has a card with demo and source link controls", async ({ page }) => {
    await page.goto("/");
    const cards = page.getByTestId("project-card");
    await expect(cards).toHaveCount(projects.length);

    for (const project of projects) {
      const card = page.getByRole("article", { name: project.title });
      await expect(card).toBeVisible();
      for (const [label, url] of [
        [/Live demo/, project.liveUrl],
        [/Source code/, project.repoUrl],
      ] as const) {
        const control = card.getByRole("link", { name: label });
        await expect(control).toBeVisible();
        if (/todo/i.test(url)) {
          // Placeholder until deployed: shown as a disabled control, never a dead href.
          await expect(control).toHaveAttribute("aria-disabled", "true");
        } else {
          await expect(control).toHaveAttribute("href", url);
        }
      }
    }
  });

  test("client work lists every production site with a working image and link", async ({ page }) => {
    await page.goto("/");
    const region = page.getByRole("region", { name: "Client work" });
    await region.scrollIntoViewIfNeeded();
    const cards = region.getByTestId("client-card");
    await expect(cards).toHaveCount(clientProjects.length);
    for (const client of clientProjects) {
      const card = region.getByRole("article", { name: client.name });
      await expect(card.getByRole("link", { name: `Visit ${client.name}` })).toHaveAttribute("href", client.url);
      if (client.image) {
        const img = card.getByRole("img");
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      }
    }
  });

  test("contact links and CV download are wired up", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/cv.pdf");
    const contact = page.locator("#contact");
    await expect(contact.locator('a[href^="mailto:abubakarsadiq6727@gmail.com"]')).toBeVisible();
    await expect(contact.locator('a[href*="linkedin.com/in/muhammad-abubaker-siddiq"]')).toBeVisible();
    await expect(contact.locator('a[href="https://github.com/a4abubakar"]')).toContainText("@a4abubakar");
    await expect(contact.locator('a[href="tel:+923433358774"]')).toBeVisible();
    await expect(page.locator('a[href*="facebook.com"]')).toHaveCount(0);
  });

  test("has no horizontal scroll on a 360px phone", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
