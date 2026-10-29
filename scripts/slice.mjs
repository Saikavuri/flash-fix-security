import { chromium } from "playwright-core";
import { mkdir } from "node:fs/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE_URL || "http://localhost:3111";
const OUT = process.env.OUT_DIR || "/tmp/pc-shots";
const PATHNAME = process.env.PATHNAME || "/";
const WIDTH = Number(process.env.WIDTH || 1440);
const HEIGHT = Number(process.env.HEIGHT || 900);
const TAG = process.env.TAG || "sec";

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const ctx = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${PATHNAME}`, { waitUntil: "networkidle" });

  // Walk down the page slowly so every whileInView fires and stays revealed.
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += HEIGHT * 0.5) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(180);
  }
  await page.waitForTimeout(900);

  // Now capture each viewport-height slice.
  const slices = Math.ceil(total / HEIGHT);
  for (let i = 0; i < slices; i++) {
    await page.evaluate((yy) => window.scrollTo(0, yy), i * HEIGHT);
    await page.waitForTimeout(450);
    await page.screenshot({ path: `${OUT}/${TAG}-${String(i).padStart(2, "0")}.png` });
  }

  console.log(`✓ ${slices} slices for ${PATHNAME}`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
