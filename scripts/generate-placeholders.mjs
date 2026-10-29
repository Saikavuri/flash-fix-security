/**
 * Generates cinematic placeholder images for the site.
 *
 * These are deliberately abstract, dark, architectural-looking gradients with
 * subtle grain — they read as "premium dark photography" in layout while
 * making it obvious they are placeholders to be replaced with real photos.
 *
 * Usage:  node scripts/generate-placeholders.mjs
 * Replace the files in /public/images with your real photography, keeping the
 * same filenames, and the site picks them up automatically.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { deflateSync } from "node:zlib";

const OUT = join(process.cwd(), "public", "images");

/* ---------- Minimal PNG encoder (no dependencies) ---------------------- */
function crc32(buf) {
  let c,
    table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function encodePNG(width, height, pixelFn) {
  const raw = Buffer.alloc((width * 3 + 1) * height);
  let p = 0;
  for (let y = 0; y < height; y++) {
    raw[p++] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixelFn(x, y);
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- Deterministic noise ---------------------------------------- */
function hash2(x, y, seed) {
  let h = x * 374761393 + y * 668265263 + seed * 1442695040;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/* ---------- Placeholder painters --------------------------------------- */
const PALETTES = {
  navy: [
    [10, 16, 32],
    [22, 32, 54],
    [46, 107, 255],
  ],
  deep: [
    [7, 9, 14],
    [18, 24, 38],
    [92, 117, 174],
  ],
  warm: [
    [18, 17, 15],
    [42, 38, 32],
    [140, 122, 96],
  ],
  steel: [
    [12, 15, 21],
    [30, 38, 50],
    [120, 140, 170],
  ],
  bone: [
    [30, 30, 30],
    [70, 68, 63],
    [160, 152, 138],
  ],
};

function paint(width, height, paletteName, seed, opts = {}) {
  const pal = PALETTES[paletteName];
  const [c0, c1, c2] = pal;
  const { vignette = 0.65, angle = 0.5, glow = 0.35, glowX = 0.7, glowY = 0.35 } = opts;

  return (x, y) => {
    const u = x / width;
    const v = y / height;

    // Base vertical + diagonal gradient
    const t = Math.min(1, Math.max(0, v * 0.72 + u * angle * 0.28));

    // Soft directional glow
    const dx = u - glowX;
    const dy = (v - glowY) * (height / width);
    const d = Math.sqrt(dx * dx + dy * dy);
    const g = Math.max(0, 1 - d * 1.9) ** 2.4 * glow;

    // Vignette
    const cx = u - 0.5;
    const cy = v - 0.5;
    const vig = 1 - Math.min(1, Math.sqrt(cx * cx + cy * cy) * 1.7) * vignette;

    // Grain
    const n = hash2(x, y, seed) * 0.055 - 0.027;

    const r = (c0[0] * (1 - t) + c1[0] * t) * vig + c2[0] * g + n * 255;
    const gg = (c0[1] * (1 - t) + c1[1] * t) * vig + c2[1] * g + n * 255;
    const b = (c0[2] * (1 - t) + c1[2] * t) * vig + c2[2] * g + n * 255;

    return [
      Math.max(0, Math.min(255, Math.round(r))),
      Math.max(0, Math.min(255, Math.round(gg))),
      Math.max(0, Math.min(255, Math.round(b))),
    ];
  };
}

/* ---------- Image manifest --------------------------------------------- */
const IMAGES = [
  // Hero + CTA
  ["hero/cctv-hero.jpg", 1600, 900, "deep", 11, { glow: 0.42, glowX: 0.74, glowY: 0.3, angle: 0.32 }],
  ["cta/closing.jpg", 1600, 900, "navy", 23, { glow: 0.3, glowX: 0.5, glowY: 0.4 }],

  // Services
  ["services/installation.jpg", 1400, 900, "steel", 31, { glow: 0.3, glowX: 0.62, glowY: 0.28 }],
  ["services/supply.jpg", 1400, 900, "warm", 37, { glow: 0.26, glowX: 0.4, glowY: 0.42 }],
  ["services/repair.jpg", 1400, 900, "deep", 41, { glow: 0.28, glowX: 0.55, glowY: 0.55 }],
  ["services/upgrades.jpg", 1400, 900, "navy", 43, { glow: 0.32, glowX: 0.68, glowY: 0.35 }],
  ["services/maintenance.jpg", 1400, 900, "steel", 47, { glow: 0.26, glowX: 0.35, glowY: 0.3 }],

  // Products
  ["products/dome.jpg", 1200, 900, "deep", 53, { glow: 0.4, glowX: 0.5, glowY: 0.38 }],
  ["products/bullet.jpg", 1200, 900, "steel", 59, { glow: 0.34, glowX: 0.58, glowY: 0.45 }],
  ["products/ip.jpg", 1200, 900, "navy", 61, { glow: 0.36, glowX: 0.44, glowY: 0.5 }],
  ["products/wireless.jpg", 1200, 900, "bone", 67, { glow: 0.24, glowX: 0.5, glowY: 0.4 }],
  ["products/ptz.jpg", 1200, 900, "deep", 71, { glow: 0.42, glowX: 0.52, glowY: 0.42 }],
  ["products/dvr.jpg", 1200, 900, "warm", 73, { glow: 0.28, glowX: 0.6, glowY: 0.4 }],
  ["products/nvr.jpg", 1200, 900, "steel", 79, { glow: 0.3, glowX: 0.46, glowY: 0.34 }],
  ["products/accessories.jpg", 1200, 900, "navy", 83, { glow: 0.26, glowX: 0.56, glowY: 0.48 }],

  // Solutions
  ["solutions/home.jpg", 1200, 1500, "deep", 89, { glow: 0.34, glowX: 0.66, glowY: 0.28 }],
  ["solutions/apartment.jpg", 1200, 900, "steel", 97, { glow: 0.28, glowX: 0.42, glowY: 0.36 }],
  ["solutions/shop.jpg", 1200, 900, "warm", 101, { glow: 0.3, glowX: 0.54, glowY: 0.42 }],
  ["solutions/office.jpg", 1200, 900, "bone", 103, { glow: 0.22, glowX: 0.48, glowY: 0.4 }],
  ["solutions/warehouse.jpg", 1200, 900, "steel", 107, { glow: 0.26, glowX: 0.58, glowY: 0.44 }],
  ["solutions/commercial.jpg", 1200, 900, "navy", 109, { glow: 0.36, glowX: 0.7, glowY: 0.32 }],
  ["solutions/factory.jpg", 1200, 900, "deep", 113, { glow: 0.24, glowX: 0.38, glowY: 0.5 }],
  ["solutions/community.jpg", 1200, 900, "navy", 127, { glow: 0.32, glowX: 0.62, glowY: 0.36 }],

  // Projects
  ["projects/project-1.jpg", 1200, 1200, "deep", 131, { glow: 0.34, glowX: 0.64, glowY: 0.3 }],
  ["projects/project-2.jpg", 1200, 900, "steel", 137, { glow: 0.28, glowX: 0.46, glowY: 0.4 }],
  ["projects/project-3.jpg", 1200, 900, "navy", 139, { glow: 0.3, glowX: 0.56, glowY: 0.34 }],
  ["projects/project-4.jpg", 1200, 900, "warm", 149, { glow: 0.26, glowX: 0.52, glowY: 0.46 }],
  ["projects/project-5.jpg", 1200, 900, "steel", 151, { glow: 0.3, glowX: 0.42, glowY: 0.32 }],
  ["projects/project-6.jpg", 1200, 900, "deep", 157, { glow: 0.26, glowX: 0.6, glowY: 0.44 }],
  ["projects/project-7.jpg", 1200, 900, "bone", 163, { glow: 0.24, glowX: 0.5, glowY: 0.38 }],
  ["projects/project-8.jpg", 1200, 1200, "navy", 167, { glow: 0.34, glowX: 0.68, glowY: 0.3 }],

  // Trust
  ["trust/maintenance.jpg", 1100, 1375, "steel", 173, { glow: 0.3, glowX: 0.48, glowY: 0.34 }],

  // Page heroes
  ["pages/services.jpg", 1600, 800, "steel", 179, { glow: 0.3, glowX: 0.6, glowY: 0.34 }],
  ["pages/products.jpg", 1600, 800, "deep", 181, { glow: 0.32, glowX: 0.44, glowY: 0.38 }],
  ["pages/solutions.jpg", 1600, 800, "navy", 191, { glow: 0.34, glowX: 0.66, glowY: 0.32 }],
  ["pages/projects.jpg", 1600, 800, "steel", 193, { glow: 0.3, glowX: 0.5, glowY: 0.36 }],
  ["pages/about.jpg", 1600, 800, "warm", 197, { glow: 0.28, glowX: 0.56, glowY: 0.4 }],
  ["pages/contact.jpg", 1600, 800, "navy", 199, { glow: 0.32, glowX: 0.48, glowY: 0.36 }],
];

async function main() {
  for (const [rel, w, h, palette, seed, opts] of IMAGES) {
    const target = join(OUT, rel);
    await mkdir(dirname(target), { recursive: true });

    const png = encodePNG(w, h, paint(w, h, palette, seed, opts));
    // The manifest uses .jpg filenames for future real photos; the generator
    // writes PNG bytes under a .jpg name, which browsers still render, and
    // Next/Image re-encodes to the requested format anyway.
    await writeFile(target, png);
    console.log("✓", rel);
  }
  console.log(`\n${IMAGES.length} placeholders written to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
