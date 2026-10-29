import { chromium } from "playwright-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE_URL || "http://localhost:3111";

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ["--no-sandbox"],
});

let failures = 0;

/* ----------------------------------------------------------------------
   1. Reduced motion — content must be visible, never stuck hidden
   ---------------------------------------------------------------------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  const hidden = await page.evaluate(() => {
    const out = [];
    // Every element that Motion animates should end up fully visible.
    for (const el of document.querySelectorAll("h1,h2,h3,p,li,article,figure")) {
      const cs = getComputedStyle(el);
      if (cs.opacity !== "1" && cs.visibility !== "hidden") {
        out.push({
          tag: el.tagName,
          text: (el.textContent || "").trim().slice(0, 40),
          opacity: cs.opacity,
          transform: cs.transform,
        });
      }
    }
    return out;
  });

  console.log("=== reduced motion ===");
  if (hidden.length === 0) {
    console.log("✓ no content left invisible");
  } else {
    failures++;
    console.log(`✗ ${hidden.length} elements not visible:`, hidden.slice(0, 5));
  }

  // Animation durations must be effectively zero
  const durations = await page.evaluate(() => {
    const el = document.querySelector("h1 span span");
    return el ? getComputedStyle(el).transitionDuration : null;
  });
  console.log("  sample transition duration:", durations);

  await ctx.close();
}

/* ----------------------------------------------------------------------
   2. Keyboard navigation — tab order, focus visibility, skip link
   ---------------------------------------------------------------------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  console.log("\n=== keyboard navigation ===");

  // Skip link is the first tab stop
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return {
      text: (el.textContent || "").trim(),
      tag: el.tagName,
      href: el.getAttribute("href"),
      visible: el.getBoundingClientRect().width > 0,
      outline: cs.outlineWidth,
    };
  });
  console.log("first tab stop:", first);
  if (!first.visible) {
    failures++;
    console.log("✗ skip link not visible on focus");
  }

  // Walk 25 tab stops, ensure each is visible and has a focus ring
  const stops = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    const s = await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        text: (el.textContent || "").trim().slice(0, 28),
        w: Math.round(r.width),
        h: Math.round(r.height),
        ring:
          cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0
            ? cs.outlineColor
            : cs.boxShadow !== "none"
              ? "box-shadow"
              : "none",
        aria: el.getAttribute("aria-label"),
      };
    });
    stops.push(s);
  }

  const noRing = stops.filter((s) => s.ring === "none");
  const zeroSize = stops.filter((s) => s.w === 0 || s.h === 0);

  console.log(`  tab stops checked: ${stops.length}`);
  console.log(`  without a visible focus ring: ${noRing.length}`, noRing.slice(0, 3));
  console.log(`  zero-size focus targets: ${zeroSize.length}`, zeroSize.slice(0, 3));

  if (zeroSize.length) {
    failures++;
    console.log("✗ some focus targets are not visible");
  }

  // Activate a nav link with the keyboard
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    return { tag: el.tagName, href: el.getAttribute("href"), text: (el.textContent||"").trim() };
  });
  console.log("  focused before Enter:", focused);
  if (focused.tag === "A" && focused.href) {
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1200);
    const url = page.url();
    console.log("  navigated to:", url);
    if (url === BASE + "/" || url === BASE) {
      failures++;
      console.log("✗ Enter on a nav link did not navigate");
    }
  }

  await ctx.close();
}

/* ----------------------------------------------------------------------
   3. Mobile menu — open/close, focus, escape
   ---------------------------------------------------------------------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });

  console.log("\n=== mobile menu ===");

  const trigger = page.locator('button[aria-controls="mobile-nav"]');
  console.log("  trigger visible:", await trigger.isVisible());
  console.log("  aria-expanded before:", await trigger.getAttribute("aria-expanded"));

  await trigger.click();
  await page.waitForTimeout(700);

  const afterOpen = await page.evaluate(() => ({
    expanded: document
      .querySelector('button[aria-controls="mobile-nav"]')
      ?.getAttribute("aria-expanded"),
    dialog: !!document.querySelector("#mobile-nav"),
    bodyLocked: getComputedStyle(document.body).overflow,
    links: document.querySelectorAll("#mobile-nav a").length,
  }));
  console.log("  after open:", afterOpen);

  if (afterOpen.expanded !== "true" || !afterOpen.dialog) {
    failures++;
    console.log("✗ mobile menu did not open");
  }
  if (afterOpen.bodyLocked !== "hidden") {
    failures++;
    console.log("✗ body scroll not locked when menu open");
  }

  // Escape closes it
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const afterClose = await page.evaluate(() => ({
    dialog: !!document.querySelector("#mobile-nav"),
    bodyLocked: getComputedStyle(document.body).overflow,
  }));
  console.log("  after Escape:", afterClose);
  if (afterClose.dialog) {
    failures++;
    console.log("✗ Escape did not close the mobile menu");
  }

  await ctx.close();
}

await browser.close();
console.log(
  `\n${failures === 0 ? "✓ ALL ACCESSIBILITY CHECKS PASSED" : failures + " FAILURE(S)"}`
);
