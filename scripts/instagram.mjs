#!/usr/bin/env node
/**
 * Les dernières photos Instagram du mouvement, rangées dans le dépôt (#21).
 *
 *   npm run instagram
 *
 * Lit les dernières publications du compte Instagram professionnel relié à la
 * page Facebook du mouvement (META_IG_USER_ID, META_PAGE_TOKEN dans `.env`),
 * garde les photos et les albums (pas les vidéos), télécharge chaque image,
 * la réduit à 1200 px de large, et écrit :
 *   - `public/images/instagram/<id>.jpg` : les images ;
 *   - `src/data/instagram.json` : légende, lien, date, images de chaque
 *     publication.
 *
 * Le site se construit depuis ces fichiers. Le navigateur du visiteur ne parle
 * jamais à Meta : pas de traceur, pas d'adresse IP transmise.
 *
 * Sortie 0 si rien n'a changé, 3 si des fichiers ont été mis à jour, 1 en cas
 * d'erreur (le site garde alors les photos précédentes).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_JSON = path.join(ROOT, 'src', 'data', 'instagram.json');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'instagram');

const GRAPH = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION ?? 'v23.0'}`;
const IG_USER = process.env.META_IG_USER_ID;
const TOKEN = process.env.META_PAGE_TOKEN;
/** Nombre de publications gardées sur le site. */
const KEEP = Number(process.env.META_IG_KEEP ?? 12);
const WIDTH = 1200;

if (!IG_USER || !TOKEN) {
  console.error('✗ META_IG_USER_ID et META_PAGE_TOKEN manquent dans .env (voir .env.example et scripts/meta-token.mjs).');
  process.exit(1);
}

async function graph(pathname, params) {
  const url = new URL(`${GRAPH}/${pathname}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set('access_token', TOKEN);
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok || body.error) throw new Error(body.error?.message ?? `Meta répond ${res.status}`);
  return body;
}

async function download(id, url) {
  const file = `${id}.jpg`;
  const target = path.join(OUT_DIR, file);
  if (fs.existsSync(target)) {
    const meta = await sharp(target).metadata();
    return { file, w: meta.width, h: meta.height };
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image ${id} : ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const info = await sharp(buf)
    .rotate()
    .resize({ width: WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target);
  return { file, w: info.width, h: info.height };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('→ Lecture des dernières publications…');
  const media = await graph(`${IG_USER}/media`, {
    fields: 'id,caption,media_type,media_url,permalink,timestamp,children{id,media_type,media_url}',
    limit: String(KEEP * 2),
  });

  const posts = [];
  for (const m of media.data ?? []) {
    if (posts.length >= KEEP) break;
    let images = [];
    if (m.media_type === 'IMAGE') images = [{ id: m.id, url: m.media_url }];
    else if (m.media_type === 'CAROUSEL_ALBUM') {
      images = (m.children?.data ?? [])
        .filter((c) => c.media_type === 'IMAGE')
        .map((c) => ({ id: c.id, url: c.media_url }));
    }
    if (images.length === 0) continue; // vidéo, ou album sans photo
    const files = [];
    for (const img of images) files.push(await download(img.id, img.url));
    posts.push({
      id: m.id,
      caption: m.caption ?? '',
      permalink: m.permalink,
      timestamp: m.timestamp,
      album: m.media_type === 'CAROUSEL_ALBUM',
      images: files,
    });
  }

  // On ne garde sur disque que les images encore utilisées.
  const used = new Set(posts.flatMap((p) => p.images.map((i) => i.file)));
  for (const f of fs.readdirSync(OUT_DIR)) if (!used.has(f)) fs.unlinkSync(path.join(OUT_DIR, f));

  const previous = fs.existsSync(OUT_JSON) ? JSON.parse(fs.readFileSync(OUT_JSON, 'utf8')) : null;
  if (previous && JSON.stringify(previous.posts) === JSON.stringify(posts)) {
    console.log(`✓ Instagram inchangé (${posts.length} publications).`);
    return 0;
  }
  fs.writeFileSync(OUT_JSON, JSON.stringify({ fetched: new Date().toISOString(), posts }, null, 2) + '\n');
  console.log(`✓ ${posts.length} publications, ${used.size} images, écrites dans src/data/instagram.json et public/images/instagram/.`);
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
