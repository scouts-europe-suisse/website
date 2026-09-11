#!/usr/bin/env node
/**
 * Les implantations du mouvement, lues dans sa carte Google My Maps (#20).
 *
 *   npm run implantations
 *
 * La carte est publique : son export KML se lit sans identifiant. Ce script le
 * télécharge, en tire chaque repère (nom, coordonnées, groupe, unités, e-mail)
 * et écrit `src/data/implantations.json`. Le site se construit depuis ce
 * fichier, jamais depuis Google en direct : si la carte devient inaccessible,
 * le site garde la dernière photographie.
 *
 * Le fichier écrit est commité ; le lancer avant une publication, ou
 * régulièrement par GitHub Actions (issue #4), suffit à tenir le site à jour.
 * Sortie 0 si rien n'a changé, 3 si le fichier a été mis à jour, 1 en cas
 * d'erreur (la publication n'a pas à s'arrêter pour ça : on garde l'ancien).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'implantations.json');

/** L'identifiant de la carte du mouvement (issue #20, fourni par Nicolas). */
const MAP_ID = process.env.SES_MAP_ID ?? '1mLNKImv1_q7I8xmzMt3Nnnb_ulE';
const KML_URL = `https://www.google.com/maps/d/kml?mid=${MAP_ID}&forcekml=1`;

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : '';
};

/**
 * La description d'un repère est une suite de lignes séparées par <br> :
 * parfois un « Groupe … » en tête, puis les unités, et l'e-mail en dernier.
 */
function parseDescription(desc) {
  const lines = desc
    .split(/<br\s*\/?>|\n/)
    .map((l) => l.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
  const out = { groupe: null, unites: [], email: null };
  for (const line of lines) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(line)) out.email = line.toLowerCase();
    else if (/^groupe\b/i.test(line) && !out.groupe) out.groupe = line;
    else out.unites.push(line);
  }
  return out;
}

async function main() {
  const res = await fetch(KML_URL, { headers: { 'user-agent': 'ses-website/implantations' } });
  if (!res.ok) throw new Error(`Google répond ${res.status} pour la carte ${MAP_ID}`);
  const kml = await res.text();
  if (!kml.includes('<kml')) throw new Error('La réponse ne ressemble pas à un KML.');

  const places = [...kml.matchAll(/<Placemark>([\s\S]*?)<\/Placemark>/g)].map(([, pm]) => {
    const coords = tag(pm, 'coordinates').split(',').map(Number);
    if (coords.length < 2 || coords.some(Number.isNaN)) {
      throw new Error(`Coordonnées illisibles pour « ${tag(pm, 'name')} »`);
    }
    const [lng, lat] = coords;
    return { name: tag(pm, 'name'), lat, lng, ...parseDescription(tag(pm, 'description')) };
  });
  if (places.length === 0) throw new Error('Aucun repère dans la carte.');

  const next = {
    source: `https://www.google.com/maps/d/viewer?mid=${MAP_ID}`,
    title: tag(kml, 'name'),
    places,
  };
  const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : null;
  const same = previous && JSON.stringify(previous.places) === JSON.stringify(next.places);
  if (same) {
    console.log(`✓ Implantations inchangées (${places.length} repères).`);
    return 0;
  }
  fs.writeFileSync(OUT, JSON.stringify({ ...next, fetched: new Date().toISOString() }, null, 2) + '\n');
  console.log(`✓ ${places.length} repères écrits dans ${path.relative(ROOT, OUT)}.`);
  for (const p of places) console.log(`  · ${p.name}${p.email ? ` — ${p.email}` : ''}`);
  return 3;
}

// Pas de process.exit() : sous Windows, quitter juste après un fetch fait
// planter Node à la sortie. On pose le code et on laisse le processus finir.
main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((err) => {
    console.error(`✗ ${err.message}`);
    process.exitCode = 1;
  });
