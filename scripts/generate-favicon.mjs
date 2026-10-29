/**
 * Generates `public/favicon.ico` (16 + 32 + 48 px ICO) from the brand mark.
 * Run: node scripts/generate-favicon.mjs
 */
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const OUT = join(process.cwd(), "public");

/* ---------- PNG encoder (RGBA) ------------------------------------------ */
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

function encodePNG(size, pixelFn) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixelFn(x, y);
      raw[p++] = r;
      raw[p++] = g;
      raw[p++] = b;
      raw[p++] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------- Draw the mark ---------------------------------------------- */
function mark(size) {
  const s = size;
  const u = s / 32; // 32-unit design grid
  const cx = 16 * u;
  const radius = s * 0.22;

  const BLUE = [46, 107, 255];
  const WHITE = [255, 255, 255];
  const BG = [7, 9, 14];

  /** Distance from a point to a line segment. */
  const distToSeg = (px, py, ax, ay, bx, by) => {
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = len2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const qx = ax + t * dx;
    const qy = ay + t * dy;
    return Math.hypot(px - qx, py - qy);
  };

  // The "F" glyph, as three rectangles.
  const F = (px, py) => {
    const x = px / u;
    const y = py / u;

    // vertical stem
    if (x >= 11.4 && x < 14.9 && y >= 8.6 && y < 23.2) return true;
    // top arm
    if (x >= 11.4 && x < 21.0 && y >= 8.6 && y < 11.8) return true;
    // middle arm
    if (x >= 11.4 && x < 19.4 && y >= 14.9 && y < 18.1) return true;
    return false;
  };

  const ringR = 13.4 * u;
  const ringW = 2.0 * u;
  const innerR = 10.8 * u;
  const innerW = 0.7 * u;
  const dotR = 1.9 * u;

  return (x, y) => {
    const px = x + 0.5;
    const py = y + 0.5;

    // Rounded-square background
    const dx = Math.max(Math.abs(px - cx) - (cx - radius), 0);
    const dy = Math.max(Math.abs(py - cx) - (cx - radius), 0);
    if (Math.hypot(dx, dy) > radius) return [0, 0, 0, 0];

    const d = Math.hypot(px - cx, py - cx);

    // Blue centre dot sits on top of the F
    if (d <= dotR) return [...BLUE, 255];

    // The F glyph (white)
    if (F(px, py)) {
      // Punch the blue dot back out of the F
      if (d <= dotR) return [...BLUE, 255];
      return [...WHITE, 255];
    }

    // Inner hairline ring
    if (Math.abs(d - innerR) <= innerW / 2) {
      return [...BLUE, 115];
    }

    // Outer ring
    if (Math.abs(d - ringR) <= ringW / 2) {
      return [...BLUE, 255];
    }

    return [...BG, 255];
  };
}

/* ---------- ICO container ---------------------------------------------- */
function buildICO(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;

  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e[2] = 0; // palette
    e[3] = 0; // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const sizes = [16, 32, 48];
  const pngs = sizes.map((size) => ({
    size,
    data: encodePNG(size, mark(size)),
  }));

  const ico = buildICO(pngs);
  await writeFile(join(OUT, "favicon.ico"), ico);
  console.log(`✓ public/favicon.ico (${sizes.join(", ")}px) — ${ico.length} bytes`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
