// Generates docs/screenshots/*.png against a running server (default http://localhost:3000).
// Usage: npm run build && npm run start   (in another terminal)   then   npm run screenshots
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const outDir = fileURLToPath(new URL("../docs/screenshots/", import.meta.url));

const shots = [
  { name: "desktop-light", viewport: { width: 1440, height: 900 }, scheme: "light", fullPage: true },
  { name: "desktop-dark", viewport: { width: 1440, height: 900 }, scheme: "dark", fullPage: true },
  { name: "mobile-light", viewport: { width: 390, height: 844 }, scheme: "light", fullPage: true },
  { name: "mobile-dark", viewport: { width: 390, height: 844 }, scheme: "dark", fullPage: true },
];

await mkdir(outDir, { recursive: true });

/** Scrolls through the page so lazily loaded images are fetched, then waits for them to finish. */
async function loadLazyImages(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await Promise.all(
      [...document.images].filter((img) => !img.complete).map((img) => new Promise((r) => img.addEventListener("load", r, { once: true }))),
    );
  });
  await page.waitForTimeout(300);
}

// `channel: "msedge"` is needed on the Windows machine this was built on, where the bundled
// headless shell cannot launch. CI and other machines can delete the `channel` option.
const browser = await chromium.launch({ channel: "msedge" });

try {
  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: shot.viewport,
      colorScheme: shot.scheme,
      reducedMotion: "reduce",
      deviceScaleFactor: 1,
      isMobile: shot.viewport.width < 600,
    });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await loadLazyImages(page);
    await page.screenshot({ path: `${outDir}${shot.name}.png`, fullPage: shot.fullPage });
    console.log(`saved docs/screenshots/${shot.name}.png`);
    await context.close();
  }

  // Close-ups of individual sections for the README (desktop, light).
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await loadLazyImages(page);
  // Unstick the header so it doesn't cover the top of each section.
  await page.addStyleTag({ content: "header { position: static !important; }" });
  for (const [name, selector] of [
    ["section-client-work", '[aria-labelledby="client-work-title"]'],
    ["section-ai", "#ai"],
    ["section-github-activity", "#activity"],
  ]) {
    await page.locator(selector).screenshot({ path: `${outDir}${name}.png` });
    console.log(`saved docs/screenshots/${name}.png`);
  }
  await context.close();
} finally {
  await browser.close();
}
