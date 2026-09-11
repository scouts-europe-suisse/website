#!/usr/bin/env node
/**
 * La géométrie de la Suisse pour la carte des implantations.
 *
 *   node scripts/suisse-geometrie.mjs          # relançable ; --fresh ignore le cache
 *
 * Télécharge le contour du pays et les grands lacs depuis des sources publiques
 * et libres (Natural Earth, domaine public), les projette dans une boîte fixe,
 * simplifie les tracés et écrit `src/data/suisse.json` : deux chemins SVG
 * (`country`, `lakes`) que le site dessine lui-même, sans service tiers.
 *
 * Le fichier écrit est commité. Le relancer n'est utile que si l'on change la
 * boîte, la finesse des tracés ou la source.
 *
 * Projection : équirectangulaire corrigée à la latitude moyenne (46.8°).
 *   x = (lon - minLon) / (maxLon - minLon) * W
 *   y = (maxLat - lat) / (maxLat - minLat) * H
 *   H = W * (maxLat - minLat) / ((maxLon - minLon) * cos(46.8°))
 * Un point (lon, lat) se place sur la carte avec ces deux formules et `bbox`.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'suisse.json');
const CACHE = path.join(os.tmpdir(), 'ses-suisse-geometrie');
const FRESH = process.argv.includes('--fresh');

// ---------------------------------------------------------------- projection

const BBOX = { minLon: 5.9, maxLon: 10.55, minLat: 45.8, maxLat: 47.85 };
const W = 1000;
const H = Math.round(
  (W * (BBOX.maxLat - BBOX.minLat)) /
    ((BBOX.maxLon - BBOX.minLon) * Math.cos((46.8 * Math.PI) / 180)),
);
const MAX_BYTES = 30 * 1024;

const round1 = (v) => Math.round(v * 10) / 10;
const project = ([lon, lat]) => [
  round1(((lon - BBOX.minLon) / (BBOX.maxLon - BBOX.minLon)) * W),
  round1(((BBOX.maxLat - lat) / (BBOX.maxLat - BBOX.minLat)) * H),
];

// ---------------------------------------------------------------- sources

const NE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson';

/** Contours du pays, essayés dans l'ordre ; le premier qui passe les contrôles gagne. */
const COUNTRY_SOURCES = [
  {
    name: 'johan/world.geo.json — CHE',
    url: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries/CHE.geo.json',
    licence: 'Domaine public (dérivé de Natural Earth 110m)',
    pick: (json) => json.features.find((f) => f.id === 'CHE' || f.properties?.name === 'Switzerland'),
  },
  {
    name: 'Natural Earth 10m — admin_0_countries (ISO_A3 = CHE)',
    url: `${NE}/ne_10m_admin_0_countries.geojson`,
    licence: 'Domaine public (Natural Earth)',
    pick: (json) =>
      json.features.find((f) => f.properties?.ISO_A3 === 'CHE' || f.properties?.ADM0_A3 === 'CHE'),
  },
  {
    name: 'Natural Earth 10m — admin_0_map_units (ISO_A3 = CHE)',
    url: `${NE}/ne_10m_admin_0_map_units.geojson`,
    licence: 'Domaine public (Natural Earth)',
    pick: (json) =>
      json.features.find((f) => f.properties?.ISO_A3 === 'CHE' || f.properties?.ADM0_A3 === 'CHE'),
  },
];

/** Lacs : les deux fichiers Natural Earth se complètent (les grands dans l'un, les moyens dans l'autre). */
const LAKE_SOURCES = [
  { name: 'Natural Earth 10m — lakes', url: `${NE}/ne_10m_lakes.geojson`, licence: 'Domaine public (Natural Earth)' },
  { name: 'Natural Earth 10m — lakes_europe', url: `${NE}/ne_10m_lakes_europe.geojson`, licence: 'Domaine public (Natural Earth)' },
];

/**
 * Les lacs qu'on attend, repérés par un point qui s'y trouve à coup sûr — pas par
 * leur nom, que Natural Earth écrit parfois de travers (le Majeur y est nommé
 * « Lago di Como »).
 */
const EXPECTED_LAKES = [
  { name: 'Léman', point: [6.55, 46.42] },
  { name: 'Neuchâtel', point: [6.85, 46.9] },
  { name: 'Zurich', point: [8.62, 47.28] },
  { name: 'Constance', point: [9.4, 47.6] },
  { name: 'Quatre-Cantons', point: [8.45, 47.005] },
  { name: 'Bienne', point: [7.15, 47.09] },
  { name: 'Thoune', point: [7.72, 46.7] },
  { name: 'Brienz', point: [7.97, 46.73] },
  { name: 'Zoug', point: [8.5, 47.13] },
  { name: 'Walenstadt', point: [9.22, 47.13] },
  { name: 'Lugano', point: [8.96, 45.99] },
  { name: 'Majeur', point: [8.65, 45.95] },
];

/** Points de contrôle : doivent tomber dans le contour du pays. */
const CHECK_POINTS = [
  { name: 'Genève', lonLat: [6.1454, 46.1949] },
  { name: 'Zurich', lonLat: [8.5533, 47.3694] },
];

// ---------------------------------------------------------------- outils

async function fetchJson(url) {
  const cached = path.join(CACHE, path.basename(url));
  if (!FRESH && fs.existsSync(cached)) {
    return JSON.parse(fs.readFileSync(cached, 'utf8'));
  }
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const text = await res.text();
  const json = JSON.parse(text);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(cached, text);
  return json;
}

/** Les anneaux extérieurs d'une géométrie GeoJSON (les trous sont ignorés). */
function outerRings(geometry) {
  if (!geometry) return [];
  if (geometry.type === 'Polygon') return [geometry.coordinates[0]];
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.map((p) => p[0]);
  return [];
}

/** Test point-dans-polygone (ray casting) sur un anneau [[x, y], …]. */
function pointInRing([px, py], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const pointInRings = (pt, rings) => rings.some((r) => pointInRing(pt, r));

/** Douglas-Peucker sur une liste de points [x, y] ; `tol` en unités du plan. */
function simplify(points, tol) {
  if (points.length <= 3) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = points[a];
    const [bx, by] = points[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let best = -1;
    let bestD = tol;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = points[i];
      let d;
      if (len2 === 0) d = Math.hypot(px - ax, py - ay);
      else {
        const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
        d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
      }
      if (d > bestD) {
        bestD = d;
        best = i;
      }
    }
    if (best !== -1) {
      keep[best] = 1;
      stack.push([a, best], [best, b]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

/** Un anneau géographique → anneau projeté, arrondi, sans doublons ni point de fermeture. */
function projectRing(ring, tol) {
  let pts = ring.map(project);
  if (pts.length > 1) {
    const [fx, fy] = pts[0];
    const [lx, ly] = pts[pts.length - 1];
    if (fx === lx && fy === ly) pts = pts.slice(0, -1);
  }
  pts = simplify([...pts, pts[0]], tol).slice(0, -1);
  const out = [];
  for (const p of pts) {
    const last = out[out.length - 1];
    if (!last || last[0] !== p[0] || last[1] !== p[1]) out.push(p);
  }
  return out.length >= 3 ? out : [];
}

const fmt = (v) => String(v).replace(/^0\./, '.').replace(/^-0\./, '-.');
const ringToPath = (pts) =>
  `M${fmt(pts[0][0])} ${fmt(pts[0][1])}` + pts.slice(1).map(([x, y]) => `L${fmt(x)} ${fmt(y)}`).join('') + 'Z';

/** Projette et simplifie des anneaux, en relâchant la tolérance jusqu'à tenir sous `maxBytes`. */
function toPath(rings, maxBytes, startTol) {
  let tol = startTol;
  for (;;) {
    const projected = rings.map((r) => projectRing(r, tol)).filter((r) => r.length);
    const d = projected.map(ringToPath).join('');
    const bytes = Buffer.byteLength(d, 'utf8');
    if (bytes <= maxBytes || tol > 50) {
      return { d, bytes, tol, points: projected.reduce((n, r) => n + r.length, 0), rings: projected };
    }
    tol *= 1.5;
  }
}

const kb = (n) => `${(n / 1024).toFixed(1)} Ko`;

// ---------------------------------------------------------------- pays

async function loadCountry() {
  const errors = [];
  for (const src of COUNTRY_SOURCES) {
    process.stdout.write(`Contour : ${src.name} … `);
    let rings;
    try {
      const feature = src.pick(await fetchJson(src.url));
      if (!feature) throw new Error('la Suisse est introuvable dans ce fichier');
      rings = outerRings(feature.geometry);
      if (!rings.length) throw new Error('géométrie vide');
    } catch (e) {
      console.log(`échec (${e.message})`);
      errors.push(`${src.name} : ${e.message}`);
      continue;
    }
    const points = rings.reduce((n, r) => n + r.length, 0);
    const missed = CHECK_POINTS.filter((c) => !pointInRings(c.lonLat, rings)).map((c) => c.name);
    if (missed.length) {
      console.log(`rejeté : ${points} points, ${missed.join(' et ')} hors du contour (trop grossier)`);
      errors.push(`${src.name} : trop grossier (${missed.join(', ')} hors du contour)`);
      continue;
    }
    console.log(`retenu (${points} points)`);
    return { src, rings, points };
  }
  throw new Error(`aucun contour utilisable :\n  - ${errors.join('\n  - ')}`);
}

// ---------------------------------------------------------------- lacs

async function loadLakes(countryRings) {
  const found = [];
  const used = [];
  for (const src of LAKE_SOURCES) {
    process.stdout.write(`Lacs : ${src.name} … `);
    let json;
    try {
      json = await fetchJson(src.url);
    } catch (e) {
      console.log(`échec (${e.message})`);
      continue;
    }
    let n = 0;
    for (const f of json.features) {
      for (const ring of outerRings(f.geometry)) {
        // On garde les lacs qui touchent la Suisse : au moins un point de leur
        // rive est dans le pays. Les lacs frontaliers restent entiers.
        if (!ring.some((pt) => pointInRings(pt, countryRings))) continue;
        found.push({ name: f.properties?.name ?? '(sans nom)', ring });
        n++;
      }
    }
    console.log(`${n} lac(s) touchant la Suisse`);
    if (n) used.push(src);
  }
  const present = EXPECTED_LAKES.filter((l) => found.some((f) => pointInRing(l.point, f.ring)));
  const missing = EXPECTED_LAKES.filter((l) => !present.includes(l));
  return { rings: found.map((f) => f.ring), names: found.map((f) => f.name), used, present, missing };
}

// ---------------------------------------------------------------- main

async function main() {
  console.log(`Boîte ${BBOX.minLon}–${BBOX.maxLon} E, ${BBOX.minLat}–${BBOX.maxLat} N → ${W} × ${H}`);
  if (!FRESH) console.log(`(cache des téléchargements : ${CACHE} — --fresh pour l'ignorer)`);

  const country = await loadCountry();
  const lakes = await loadLakes(country.rings);

  const countryPath = toPath(country.rings, MAX_BYTES, 0.6);
  const lakesPath = lakes.rings.length
    ? toPath(lakes.rings, MAX_BYTES, 0.5)
    : { d: '', bytes: 0, tol: 0, points: 0, rings: [] };

  // Contrôles : sur les données brutes (déjà faits pour retenir la source) et
  // sur le tracé simplifié, qui est ce que le site dessinera vraiment.
  const checks = CHECK_POINTS.map((c) => {
    const xy = project(c.lonLat);
    return {
      name: c.name,
      xy,
      raw: pointInRings(c.lonLat, country.rings),
      simplified: pointInRings(xy, countryPath.rings),
    };
  });
  const failed = checks.filter((c) => !c.raw || !c.simplified);
  if (failed.length) throw new Error(`points de contrôle hors du contour : ${failed.map((c) => c.name).join(', ')}`);
  if (countryPath.bytes > MAX_BYTES) throw new Error(`le contour du pays dépasse ${kb(MAX_BYTES)}`);
  if (lakesPath.bytes > MAX_BYTES) throw new Error(`les lacs dépassent ${kb(MAX_BYTES)}`);

  const sources = [
    { role: 'country', name: country.src.name, url: country.src.url, licence: country.src.licence },
    ...lakes.used.map((s) => ({ role: 'lakes', name: s.name, url: s.url, licence: s.licence })),
  ];
  const data = {
    viewBox: `0 0 ${W} ${H}`,
    width: W,
    height: H,
    bbox: BBOX,
    country: countryPath.d,
    lakes: lakesPath.d,
    sources,
    generated: new Date().toISOString(),
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');

  console.log('');
  console.log(`Pays  : ${country.points} → ${countryPath.points} points, ${kb(countryPath.bytes)} (tolérance ${countryPath.tol.toFixed(2)} px)`);
  if (lakes.rings.length) {
    console.log(`Lacs  : ${lakes.rings.length} polygones → ${lakesPath.points} points, ${kb(lakesPath.bytes)} (tolérance ${lakesPath.tol.toFixed(2)} px)`);
    console.log(`        présents : ${lakes.present.map((l) => l.name).join(', ')}`);
    if (lakes.missing.length) console.log(`        MANQUANTS : ${lakes.missing.map((l) => l.name).join(', ')}`);
  } else {
    console.log('Lacs  : AUCUNE source disponible — le champ `lakes` est vide.');
  }
  for (const c of checks) {
    console.log(`Test  : ${c.name} → (${c.xy[0]}, ${c.xy[1]}) dans le pays : brut ${c.raw ? 'oui' : 'NON'}, simplifié ${c.simplified ? 'oui' : 'NON'}`);
  }
  console.log(`Écrit : ${path.relative(ROOT, OUT)} (${kb(fs.statSync(OUT).size)})`);
}

main().catch((e) => {
  console.error(`\nErreur : ${e.message}`);
  process.exit(1);
});
