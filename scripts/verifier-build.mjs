#!/usr/bin/env node
/**
 * Les garde-fous de publication, partagés par `npm run deploy` et par le
 * workflow GitHub Actions (issue #4). À lancer après `npm run build` :
 *
 *   node scripts/verifier-build.mjs <base-path>      (ex. /website)
 *
 * 1. Aucune adresse absolue ne doit avoir échappé au préfixe du sous-dossier :
 *    une seule oubliée met une image ou un lien mort en ligne, et ça ne se voit
 *    pas en local, où tout marche.
 * 2. Aucune page ne doit partir sans la mention « ne pas indexer » tant que le
 *    site est en préparation : une seule suffit à mettre l'aperçu en
 *    concurrence avec le vrai site dans Google.
 * 3. Aucune adresse e-mail ni numéro en clair (issue #37).
 *
 * Sortie 0 si tout va bien, 1 sinon, avec la liste des fautes.
 */
import fs from 'node:fs';
import path from 'node:path';

const BASE = (process.argv[2] ?? '/').replace(/\/+$/, '');
const MODE = process.env.SES_SITE_MODE ?? 'preparation';
const DIR = '_build';

if (!fs.existsSync(DIR)) {
  console.error(`✗ Pas de ${DIR}/. Construire d'abord.`);
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(DIR);

const leaks = new Set();
const indexable = [];
const contacts = [];
for (const p of pages) {
  const html = fs.readFileSync(p, 'utf8');
  const rel = path.relative(DIR, p);
  if (BASE) {
    for (const m of html.matchAll(/(?:src|href)="(\/[a-zA-Z][^"]*)"/g)) {
      if (!m[1].startsWith(`${BASE}/`)) leaks.add(m[1]);
    }
  }
  if (MODE !== 'production' && !/<meta\s+name="robots"\s+content="noindex/.test(html)) indexable.push(rel);
  if (/[A-Za-z0-9._%-]@scouts-europe\.ch|href="mailto:|href="tel:/.test(html)) contacts.push(rel);
}

let ok = true;
if (leaks.size) {
  ok = false;
  console.error(`✗ Adresses hors du préfixe ${BASE}/ :`);
  for (const l of [...leaks].slice(0, 20)) console.error(`   ${l}`);
}
if (indexable.length) {
  ok = false;
  console.error('✗ Pages sans « ne pas indexer » — elles concurrenceraient le vrai site :');
  for (const l of indexable.slice(0, 20)) console.error(`   ${l}`);
}
if (contacts.length) {
  ok = false;
  console.error('✗ Adresses ou numéros en clair (issue #37) :');
  for (const l of contacts.slice(0, 20)) console.error(`   ${l}`);
}
if (ok) console.log(`✓ ${pages.length} pages vérifiées : préfixe, « ne pas indexer », contacts protégés.`);
process.exitCode = ok ? 0 : 1;
