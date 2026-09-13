#!/usr/bin/env node
/**
 * Inventaire complet des publications Instagram et Facebook du mouvement,
 * pour retrouver des photos en rapport avec une actualité (issue « illustrer
 * les actualités »). Écrit un inventaire JSON dans le dossier donné (hors
 * dépôt) : légende, date, lien, adresses des images. Ne télécharge rien.
 *
 *   node --env-file-if-exists=.env scripts/meta-archive.mjs <dossier-de-sortie>
 */
import fs from 'node:fs';
import path from 'node:path';
const GRAPH = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION ?? 'v23.0'}`;
const { META_IG_USER_ID: IG, META_PAGE_ID: PAGE, META_PAGE_TOKEN: TOKEN } = process.env;
const out = process.argv[2];
if (!IG || !PAGE || !TOKEN || !out) { console.error('✗ variables .env ou dossier de sortie manquants'); process.exitCode = 1; }
async function all(pathname, params) {
  let url = new URL(`${GRAPH}/${pathname}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set('access_token', TOKEN);
  const items = [];
  while (url) {
    const res = await fetch(url); const body = await res.json();
    if (body.error) throw new Error(body.error.message);
    items.push(...(body.data ?? []));
    url = body.paging?.next ? new URL(body.paging.next) : null;
  }
  return items;
}
const ig = await all(`${IG}/media`, { fields: 'id,caption,media_type,media_url,permalink,timestamp,children{id,media_type,media_url}', limit: '100' });
const fb = await all(`${PAGE}/posts`, { fields: 'id,message,created_time,permalink_url,full_picture,attachments{media_type,media,subattachments{media,media_type}}', limit: '100' });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'instagram-all.json'), JSON.stringify(ig, null, 1));
fs.writeFileSync(path.join(out, 'facebook-all.json'), JSON.stringify(fb, null, 1));
console.log(`✓ Instagram : ${ig.length} publications · Facebook : ${fb.length} publications → ${out}`);
