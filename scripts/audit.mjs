import { chromium } from "playwright-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = process.env.BASE_URL || "http://localhost:3111";

const PAGES = [
  "/",
  "/services",
  "/products",
  "/solutions",
  "/projects",
  "/about",
  "/contact",
  "/privacy",
];

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ["--no-sandbox"],
});

let problems = 0;

for (const path of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

  await page.goto(BASE + path, { waitUntil: "networkidle" });

  const report = await page.evaluate(() => {
    const out = { zeroSize: [], invisible: [], brokenLinks: [], noAlt: [] };

    // Interactive elements that render with zero size
    for (const el of document.querySelectorAll(
      'a[href], button, input, select, textarea'
    )) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (r.width === 0 || r.height === 0) {
        if (cs.display !== "none" && cs.visibility !== "hidden") {
          out.zeroSize.push(
            (el.tagName + ":" + (el.textContent || "").trim().slice(0, 30)).slice(0, 90)
          );
        }
      }
    }

    // Images without alt
    for (const img of document.querySelectorAll("img")) {
      if (!img.hasAttribute("alt")) out.noAlt.push(img.src.slice(-60));
    }

    // Broken internal links
    const links = [...document.querySelectorAll('a[href^="/"]')].map((a) =>
      a.getAttribute("href")
    );
    out.links = [...new Set(links)];

    // Heading order
    out.headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
      (h) => +h.tagName[1]
    );

    out.h1Count = document.querySelectorAll("h1").length;

    // Images that failed to load
    out.brokenImages = [...document.querySelectorAll("img")]
      .filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute("src"))
      .map((i) => i.src.slice(-50));

    return out;
  });

  console.log(`\n=== ${path} ===`);
  console.log("h1 count:", report.h1Count);
  console.log("broken images:", report.brokenImages.length, report.brokenImages.slice(0, 3));
  console.log("missing alt:", report.noAlt.length);
  console.log("zero-size interactive:", report.zeroSize.length, report.zeroSize.slice(0, 5));
  console.log("console errors:", consoleErrors.length, consoleErrors.slice(0, 3));

  const h1Issues =
    report.h1Count !== 1 || report.headings[0] !== 1;
  if (h1Issues) { problems++; console.log("  !! heading structure issue", report.headings.join(",")); }
  if (report.brokenImages.length) { problems++; console.log("  !! broken images"); }
  if (report.zeroSize.length) { problems++; console.log("  !! zero-size elements"); }
  if (consoleErrors.length) { problems++; console.log("  !! console errors"); }

  await ctx.close();
}

await browser.close();
console.log(`\n${problems === 0 ? "ALL CLEAN" : problems + " issue group(s)"}`);
