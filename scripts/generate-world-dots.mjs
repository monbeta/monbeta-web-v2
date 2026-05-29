/**
 * Supplement world-dots.json with high-latitude land points.
 * Coordinate space: 1000 × 500 equirectangular (matches hero.tsx).
 */
import { writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";
import land110 from "world-atlas/land-110m.json" with { type: "json" };
import existing from "../src/lib/world-dots.json" with { type: "json" };

const W = 1000;
const H = 500;
const STEP = 5;

const land = feature(land110, land110.objects.land);

function toLon(x) {
  return (x / W) * 360 - 180;
}

function toLat(y) {
  return 90 - (y / H) * 180;
}

function key(x, y) {
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

const dots = new Map();
for (const [x, y] of existing) {
  dots.set(key(x, y), [x, y]);
}

const before = dots.size;
const maxExistingY = Math.min(...existing.map(([, y]) => y));

// Fill everything north of the current dataset (lower y = higher latitude).
for (let y = 0; y <= maxExistingY; y += STEP) {
  for (let x = 0; x <= W; x += STEP) {
    const lon = toLon(x);
    const lat = toLat(y);
    if (geoContains(land, [lon, lat])) {
      dots.set(key(x, y), [x, y]);
    }
  }
}

const merged = [...dots.values()].sort((a, b) => a[1] - b[1] || a[0] - b[0]);
writeFileSync(new URL("../src/lib/world-dots.json", import.meta.url), JSON.stringify(merged));

console.log(`Existing: ${before} → Merged: ${merged.length} (+${merged.length - before})`);
console.log(`Y range: ${Math.min(...merged.map(([, y]) => y)).toFixed(1)} – ${Math.max(...merged.map(([, y]) => y)).toFixed(1)}`);
