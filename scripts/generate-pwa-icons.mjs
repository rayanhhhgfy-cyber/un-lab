/**
 * Generates PNGs from public/pwa-source.svg for the web app manifest & iOS.
 * Run: node scripts/generate-pwa-icons.mjs
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const svgPath = resolve(root, "public/pwa-source.svg");

const svg = await readFile(svgPath);

const outs = [
  ["pwa-192.png", 192],
  ["pwa-512.png", 512],
  ["pwa-180.png", 180],
];

for (const [name, size] of outs) {
  await sharp(svg).resize(size, size).png({ compressionLevel: 9 }).toFile(resolve(root, "public", name));
  console.log("wrote", name);
}
