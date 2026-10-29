/**
 * Generates the hero placeholder — a bright, cinematic "surveillance lens"
 * composition designed to read clearly against the dark hero section:
 *
 *   · luminous blue-white core with a strong flare
 *   · concentric lens rings that stay visible on a dark page
 *   · a bright diagonal light sweep across the frame
 *   · a pale horizon glow at the bottom
 *   · perspective grid lines catching the light
 *
 * The overall image is intentionally LIGHT so it separates from the navy
 * hero background.
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
  // Lens geometry.
  const lx = w * 0.5;
  const ly = h * 0.42;
  const rOuter = w * 0.44;
  const rMid = w * 0.33;
  const rInner = w * 0.21;
  const rCore = w * 0.105;

  // Light sweep angle.
  const sweepAngle = -0.62;
  const cosA = Math.cos(sweepAngle);
  const sinA = Math.sin(sweepAngle);

  return (px, py) => {
    const u = px / w;
    const v = py / h;

    /* --- Base: deep blue-black, but not pure black ------------------- */
    let r = 16;
    let g = 28;
    let b = 56;

    /* --- Large soft light source behind the lens --------------------- */
    const key = Math.max(0, 1 - Math.hypot(u - 0.5, v - 0.42) * 1.15) ** 1.7;
    r += key * 34;
    g += key * 66;
    b += key * 132;

    /* --- Diagonal light sweep across the frame ------------------------ */
    const sweepCoord = (u - 0.5) * cosA + (v - 0.5) * sinA;
    const sweep = Math.exp(-Math.pow(sweepCoord / 0.30, 2));
    r += sweep * 46;
    g += sweep * 92;
    b += sweep * 176;

    /* --- Pale horizon glow at the bottom ------------------------------ */
    const horizon = smoothstep(0.55, 1.0, v);
    r += horizon * 58;
    g += horizon * 96;
    b += horizon * 132;

    /* --- Perspective grid catching the light ------------------------- */
    const vpx = w * 1.2;
    const vpy = h * 0.3;

    // Horizontal lines converging to the vanishing point.
    for (let i = 0; i < 14; i++) {
      const y0 = h * (0.14 + (i / 14) * 1.3);
      const lineY = (x) => lerp(y0, vpy, Math.min(1, x / vpx));
      const d = Math.abs(py - lineY(px));
      const fade = smoothstep(0.0, 0.5, u) * (1 - smoothstep(0.8, 1.0, u));
      if (d < 1.8 && fade > 0.02) {
        const a = (1 - d / 1.8) * 0.3 * fade;
        r += a * 110;
        g += a * 165;
        b += a * 235;
      }
    }

    // Vertical lines converging to the vanishing point.
    for (let i = 0; i < 8; i++) {
      const x0 = (i / 8) * w * 1.3 - w * 0.12;
      const lineX = (y) => lerp(x0, vpx, Math.min(1, y / h));
      const d = Math.abs(px - lineX(py));
      const fade = smoothstep(0.02, 0.45, v);
      if (d < 1.6 && fade > 0.02) {
        const a = (1 - d / 1.6) * 0.22 * fade;
        r += a * 100;
        g += a * 150;
        b += a * 220;
      }
    }

    /* --- Lens rings (bright, so they read on a dark page) ------------- */
    const d = Math.hypot(px - lx, py - ly);

    const ring = (radius, width, strength) => {
      const dr = Math.abs(d - radius);
      return dr < width ? (1 - dr / width) * strength : 0;
    };

    const ringA = ring(rOuter, 3.2, 0.55);
    const ringB = ring(rMid, 2.6, 0.45);
    const ringC = ring(rInner, 6.0, 0.32);

    r += ringA * 130 + ringB * 120 + ringC * 105;
    g += ringA * 180 + ringB * 170 + ringC * 150;
    b += ringA * 255 + ringB * 250 + ringC * 235;

    /* --- Iris blades -------------------------------------------------- */
    const ang = Math.atan2(py - ly, px - lx);
    const blades = 9;
    const aNorm = ((ang / (Math.PI * 2)) * blades + 0.5) % 1;
    const bladeEdge = Math.abs(aNorm - 0.5) * 2;
    const bladeR = rInner * (0.45 + bladeEdge * 0.55);
    if (d < bladeR && d > rCore * 0.85) {
      const edge = Math.abs(d - bladeR);
      if (edge < 2.4) {
        const a = (1 - edge / 2.4) * 0.5;
        r += a * 130;
        g += a * 190;
        b += a * 250;
      }
    }

    /* --- Luminous core ------------------------------------------------ */
    const coreT = 1 - smoothstep(0, rCore, d);
    r = lerp(r, 236, coreT * 0.92);
    g = lerp(g, 246, coreT * 0.92);
    b = lerp(b, 255, coreT * 0.92);

    /* --- Flare halo around the core ----------------------------------- */
    const halo = Math.max(0, 1 - d / (rCore * 4.2)) ** 2.2;
    r += halo * 70;
    g += halo * 130;
    b += halo * 215;

    /* --- Anamorphic streak through the core -------------------------- */
    const streak =
      Math.exp(-Math.pow((py - ly) / (h * 0.009), 2)) *
      Math.max(0, 1 - Math.abs(px - lx) / (w * 0.46));
    r += streak * 100;
    g += streak * 170;
    b += streak * 235;

    /* --- Small sparkle artefacts (lens flare) ------------------------- */
    for (const [fx, fy, fr, fs] of [
      [0.72, 0.24, 0.035, 0.5],
      [0.26, 0.62, 0.022, 0.36],
      [0.63, 0.72, 0.016, 0.3],
    ]) {
      const dd = Math.hypot(u - fx, v - fy) / fr;
      if (dd < 1) {
        const a = (1 - dd) ** 2.2 * fs;
        r += a * 120;
        g += a * 175;
        b += a * 240;
      }
    }

    /* --- Soft vignette (gentle — keeps the frame bright) --------------- */
    const cx = u - 0.5;
    const cy = v - 0.5;
    const vig = 1 - Math.min(1, Math.hypot(cx, cy) * 1.35) * 0.4;
    r *= vig;
    g *= vig;
    b *= vig;

    /* --- Grain -------------------------------------------------------- */
    const n = (hash(px, py, 29) - 0.5) * 7;

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
