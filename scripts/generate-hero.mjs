/**
 * Generates the hero placeholder — a deliberate, abstract "surveillance
 * frame" graphic rather than a fake photo:
 *
 *   · deep navy field with a cool key light from the upper right
 *   · a large camera-lens geometry (concentric rings + iris blades)
 *   · a faint perspective grid suggesting a facade
 *   · scan-line sweep and film grain
 *
 * Usage: node scripts/generate-hero.mjs
 */
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const OUT = join(process.cwd(), "public", "images", "hero");

/* ---------- PNG encoder ------------------------------------------------ */
function crc32(buf) {
  let c;
  const table = [];
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
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- Helpers ---------------------------------------------------- */
const hash = (x, y, s) => {
  let h = x * 374761393 + y * 668265263 + s * 1442695040;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
};

const smoothstep = (e0, e1, x) => {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

const lerp = (a, b, t) => a + (b - a) * t;
const clamp255 = (v) => Math.max(0, Math.min(255, v));

/* ---------- The scene -------------------------------------------------- */
function scene(w, h) {
  // Lens geometry, positioned upper-centre-right.
  const lx = w * 0.58;
  const ly = h * 0.36;
  const rOuter = w * 0.36;
  const rMid = w * 0.255;
  const rInner = w * 0.15;
  const rCore = w * 0.052;

  // Facade grid, converging toward a vanishing point upper-right.
  const vpx = w * 1.15;
  const vpy = h * 0.22;

  return (px, py) => {
    const u = px / w;
    const v = py / h;

    /* --- Base field ------------------------------------------------- */
    let r = 9;
    let g = 13;
    let b = 26;

    /* --- Cool key light, upper right --------------------------------- */
    const key = Math.max(0, 1 - Math.hypot(u - 0.82, v - 0.16) * 1.55) ** 2.1;
    r += key * 26;
    g += key * 52;
    b += key * 104;

    /* --- Warm bounce, lower left ------------------------------------- */
    const warm = Math.max(0, 1 - Math.hypot(u - 0.12, v - 0.92) * 2.0) ** 2.6;
    r += warm * 52;
    g += warm * 30;
    b += warm * 12;

    /* --- Perspective facade grid ------------------------------------- */
    // Horizontal lines converging to the vanishing point.
    for (let i = 0; i < 16; i++) {
      const t = i / 16;
      const y0 = h * (0.2 + t * 1.25);
      const yv = vpy;
      const xAt = (x) => lerp(x0, vpx, 1 - x / w);
      // line from (0, y0) to (vpx, yv)
      const lineY = (x) => lerp(y0, yv, Math.min(1, x / vpx));
      const d = Math.abs(py - lineY(px));
      const fade = smoothstep(0.0, 0.55, u) * (1 - smoothstep(0.85, 1.0, u));
      if (d < 1.6 && fade > 0.02) {
        const a = (1 - d / 1.6) * 0.16 * fade;
        r += a * 90;
        g += a * 130;
        b += a * 200;
      }
    }

    // Vertical lines converging to the vanishing point.
    for (let i = 0; i < 9; i++) {
      const x0 = (i / 9) * w * 1.25 - w * 0.1;
      const lineX = (y) => lerp(x0, vpx, Math.min(1, y / h));
      const d = Math.abs(px - lineX(py));
      const fade = smoothstep(0.05, 0.5, v);
      if (d < 1.5 && fade > 0.02) {
        const a = (1 - d / 1.5) * 0.11 * fade;
        r += a * 80;
        g += a * 120;
        b += a * 190;
      }
    }

    /* --- Lens rings -------------------------------------------------- */
    const d = Math.hypot(px - lx, py - ly);
    const ring = (radius, width, strength) => {
      const dr = Math.abs(d - radius);
      if (dr < width) {
        const a = (1 - dr / width) * strength;
        return a;
      }
      return 0;
    };

    const ringA = ring(rOuter, 2.4, 0.3);
    const ringB = ring(rMid, 2.0, 0.22);
    const ringC = ring(rInner, 5.0, 0.16);

    r += ringA * 110 + ringB * 80 + ringC * 70;
    g += ringA * 150 + ringB * 120 + ringC * 105;
    b += ringA * 230 + ringB * 200 + ringC * 185;

    /* --- Iris blades ------------------------------------------------- */
    // Eight blades forming an aperture around the core.
    const ang = Math.atan2(py - ly, px - lx);
    const blades = 8;
    const aNorm = ((ang / (Math.PI * 2)) * blades + 0.5) % 1;
    const bladeEdge = Math.abs(aNorm - 0.5) * 2; // 0 at centre, 1 at edge
    const bladeR = rInner * (0.42 + bladeEdge * 0.58);
    const inBlade = d < bladeR && d > rCore * 0.9;
    if (inBlade) {
      const edge = Math.abs(d - bladeR);
      if (edge < 2.0) {
        const a = (1 - edge / 2.0) * 0.34;
        r += a * 120;
        g += a * 165;
        b += a * 240;
      }
    }

    /* --- Core lens + blue glint -------------------------------------- */
    if (d < rCore) {
      const t = 1 - d / rCore;
      r = lerp(r, 26, t * 0.8);
      g = lerp(g, 74, t * 0.8);
      b = lerp(b, 190, t * 0.8);
    }
    const glint = Math.max(0, 1 - d / (rCore * 3.4)) ** 2.6;
    r += glint * 46;
    g += glint * 92;
    b += glint * 190;

    /* --- Highlight streak across the lens ---------------------------- */
    const streak = Math.exp(-Math.pow((py - ly) / (h * 0.012), 2)) *
      Math.max(0, 1 - Math.abs(px - lx) / (w * 0.34));
    r += streak * 70;
    g += streak * 130;
    b += streak * 210;

    /* --- Scan line --------------------------------------------------- */
    const scanY = (v * 3.1) % 1;
    const scan = Math.exp(-Math.pow((scanY - 0.5) / 0.05, 2)) * 0.05;
    r += scan * 60;
    g += scan * 110;
    b += scan * 180;

    /* --- Vignette ----------------------------------------------------- */
    const cx = u - 0.5;
    const cy = v - 0.5;
    const vig = 1 - Math.min(1, Math.hypot(cx, cy) * 1.5) * 0.55;
    r *= vig;
    g *= vig;
    b *= vig;

    /* --- Grain -------------------------------------------------------- */
    const n = (hash(px, py, 29) - 0.5) * 9;

    return [
      clamp255(Math.round(r + n)),
      clamp255(Math.round(g + n)),
      clamp255(Math.round(b + n)),
    ];
  };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const w = 1400;
  const h = 1750;
  const png = encodePNG(w, h, scene(w, h));
  await writeFile(join(OUT, "cctv-hero.jpg"), png);
  console.log(`✓ hero written (${w}×${h})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
