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
    await page.screenshot({ path: `${outDir}${shot.name}.png`, fullPage: shot.fullPage });
    console.log(`saved docs/screenshots/${shot.name}.png`);
    await context.close();
  }
} finally {
  await browser.close();
}
