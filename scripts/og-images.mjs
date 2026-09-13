#!/usr/bin/env node
/**
 * Les images de partage, une par page et par langue (issue #39).
 *
 *   npm run og        (lancé aussi avant chaque construction : prebuild)
 *
 * Pour chaque page et chaque actualité, une image 1200 × 630 : la photo de
 * la page (sa couverture, ou la photo d'accueil), un voile bleu nuit, le
 * titre composé en Cabin converti en tracés (aucune police à installer), et
 * le logo. Écrites dans public/images/og/<langue>/<nom>.jpg ; le gabarit
 * les référence par le même nom (BaseLayout, `ogSlug`). Une image n'est
 * refaite que si son titre ou sa photo ont changé (empreinte dans un fichier
 * .json à côté), pour que la construction reste rapide.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import * as fontkit from 'fontkit';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'images', 'og');
const STAMP = path.join(OUT, '.empreintes.json');
const W = 1200, H = 630;
const FONT = path.join(ROOT, 'node_modules', '@fontsource', 'cabin', 'files', 'cabin-latin-700-normal.woff');
const LOGO = path.join(ROOT, 'public', 'images', 'logo-ses.svg');
const DEFAULT_PHOTO = path.join(ROOT, 'public', 'images', 'accueil-bandeau.jpg');

const font = fontkit.openSync(FONT);
const scale = (size) => size / font.unitsPerEm;

/** Un texte en tracés SVG, coupé en lignes de `maxWidth` au plus. */
function textLines(str, size, maxWidth) {
  const s = scale(size);
  const width = (t) => { const run = font.layout(t); return run.positions.reduce((a, p) => a + p.xAdvance, 0) * s; };
  const words = str.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (width(next) > maxWidth && cur) { lines.push(cur); cur = w; } else cur = next;
  }
  if (cur) lines.push(cur);
  return lines;
}
function linePath(text, size, x, baseline) {
  const s = scale(size);
  const run = font.layout(text);
  let cx = x; const parts = [];
  run.glyphs.forEach((g, i) => {
    const d = g.path.scale(s, -s).translate(cx, baseline).toSVG();
    if (d) parts.push(d);
    cx += run.positions[i].xAdvance * s;
  });
  return parts.join(' ');
}

/** Lit le frontmatter d'un fichier markdown, sans dépendance. */
function frontmatter(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/);
    if (mm) out[mm[1]] = mm[2].replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  }
  return out;
}

async function render(target, { title, photo, eyebrow }) {
  const lines = textLines(title, lines_size(title), 1040).slice(0, 3);
  const size = lines_size(title);
  const lineH = size * 1.12;
  const blockH = lines.length * lineH;
  const y0 = H - 72 - blockH + size * 0.85;
  const paths = lines.map((l, i) => `<path d="${linePath(l, size, 80, y0 + i * lineH)}" fill="#fff"/>`).join('');
  const eye = eyebrow ? `<path d="${linePath(eyebrow.toUpperCase(), 22, 80, y0 - size * 0.85 - 26)}" fill="#ffed26"/>` : '';
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2733" stop-opacity="0.2"/><stop offset="0.45" stop-color="#1c2733" stop-opacity="0.55"/><stop offset="1" stop-color="#1c2733" stop-opacity="0.94"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect x="${W - 400}" y="48" width="320" height="94" rx="14" fill="#fff"/>
    ${eye}${paths}
  </svg>`);
  const logo = await sharp(fs.readFileSync(LOGO), { density: 300 }).resize(280).png().toBuffer();
  const base = await sharp(photo).resize(W, H, { fit: 'cover', position: 'centre' }).toBuffer();
  await sharp(base).composite([{ input: overlay }, { input: logo, left: W - 380, top: 60 }]).jpeg({ quality: 82, mozjpeg: true }).toFile(target);
}
const lines_size = (t) => (t.length > 60 ? 44 : t.length > 36 ? 54 : 64);

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const stamps = fs.existsSync(STAMP) ? JSON.parse(fs.readFileSync(STAMP, 'utf8')) : {};
  const jobs = [];
  for (const lang of ['fr', 'de']) {
    const pagesDir = path.join(ROOT, 'src', 'content', 'pages', lang);
    for (const f of fs.readdirSync(pagesDir)) {
      const fm = frontmatter(path.join(pagesDir, f));
      const key = fm.key ?? path.basename(f, '.md');
      const cover = fm.cover && /\.(jpe?g|png)$/i.test(fm.cover) ? path.join(ROOT, 'public', fm.cover) : null;
      jobs.push({ lang, name: key, title: fm.title ?? key, photo: cover && fs.existsSync(cover) ? cover : DEFAULT_PHOTO, eyebrow: lang === 'fr' ? 'Scoutisme Européen Suisse' : 'Schweizerische Pfadfinderschaft Europas' });
    }
    const newsDir = path.join(ROOT, 'src', 'content', 'news', lang);
    if (fs.existsSync(newsDir)) {
      for (const f of fs.readdirSync(newsDir)) {
        const fm = frontmatter(path.join(newsDir, f));
        const cover = fm.cover && /\.(jpe?g|png)$/i.test(fm.cover) ? path.join(ROOT, 'public', fm.cover) : null;
        jobs.push({ lang, name: `actualites-${path.basename(f, '.md')}`, title: fm.title ?? f, photo: cover && fs.existsSync(cover) ? cover : DEFAULT_PHOTO, eyebrow: lang === 'fr' ? 'Actualités' : 'Aktuelles' });
      }
    }
    jobs.push({ lang, name: 'actualites', title: lang === 'fr' ? 'Actualités' : 'Aktuelles', photo: DEFAULT_PHOTO, eyebrow: lang === 'fr' ? 'Scoutisme Européen Suisse' : 'Schweizerische Pfadfinderschaft Europas' });
  }
  let made = 0;
  for (const j of jobs) {
    const dir = path.join(OUT, j.lang);
    fs.mkdirSync(dir, { recursive: true });
    const target = path.join(dir, `${j.name}.jpg`);
    const photoStat = fs.statSync(j.photo);
    const hash = crypto.createHash('md5').update(`${j.title}|${j.eyebrow}|${j.photo}|${photoStat.size}|v2`).digest('hex');
    const id = `${j.lang}/${j.name}`;
    if (stamps[id] === hash && fs.existsSync(target)) continue;
    await render(target, j);
    stamps[id] = hash;
    made++;
  }
  fs.writeFileSync(STAMP, JSON.stringify(stamps, null, 1));
  console.log(`✓ Images de partage : ${jobs.length} pages, ${made} refaites.`);
}

main().catch((err) => { console.error(`✗ ${err.message}`); process.exitCode = 1; });
