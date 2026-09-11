#!/usr/bin/env node
/**
 * Obtenir le jeton Meta longue durée du mouvement (#22).
 *
 *   node --env-file-if-exists=.env scripts/meta-token.mjs <jeton court>
 *
 * Le jeton court vient de l'explorateur Graph API
 * (https://developers.facebook.com/tools/explorer/), avec l'application du
 * mouvement sélectionnée et les permissions `pages_show_list`,
 * `pages_read_engagement`, `instagram_basic`. Il expire en une heure.
 *
 * Ce script :
 *   1. l'échange contre un jeton utilisateur longue durée (60 jours) ;
 *   2. liste les pages Facebook administrées, avec pour chacune son jeton de
 *      page (qui, lui, n'expire pas tant que la personne reste admin) et le
 *      compte Instagram professionnel qui lui est relié ;
 *   3. affiche les lignes à coller dans `.env`.
 *
 * Il n'écrit rien : c'est à la personne de coller les valeurs dans `.env`,
 * qui reste hors du dépôt. Il a besoin de META_APP_ID et META_APP_SECRET dans
 * `.env` (voir `.env.example`).
 */

const GRAPH = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION ?? 'v23.0'}`;
const APP_ID = process.env.META_APP_ID;
const APP_SECRET = process.env.META_APP_SECRET;
const shortToken = process.argv[2];

if (!APP_ID || !APP_SECRET) {
  console.error('✗ META_APP_ID et META_APP_SECRET manquent dans .env (voir .env.example).');
  process.exit(1);
}
if (!shortToken) {
  console.error('✗ Donne le jeton court en argument : node --env-file-if-exists=.env scripts/meta-token.mjs <jeton>');
  process.exit(1);
}

async function graph(pathname, params) {
  const url = new URL(`${GRAPH}/${pathname}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url);
  const body = await res.json();
  if (!res.ok || body.error) {
    throw new Error(body.error?.message ?? `Meta répond ${res.status}`);
  }
  return body;
}

async function main() {
  console.log('→ Échange du jeton court contre un jeton longue durée…');
  const long = await graph('oauth/access_token', {
    grant_type: 'fb_exchange_token',
    client_id: APP_ID,
    client_secret: APP_SECRET,
    fb_exchange_token: shortToken,
  });

  console.log('→ Pages administrées et comptes Instagram reliés…');
  const pages = await graph('me/accounts', {
    fields: 'id,name,access_token,instagram_business_account{id,username}',
    access_token: long.access_token,
  });
  if (!pages.data?.length) {
    throw new Error("Aucune page : la permission pages_show_list manque, ou la personne n'administre aucune page.");
  }

  for (const p of pages.data) {
    const ig = p.instagram_business_account;
    console.log(`\n■ ${p.name} (page ${p.id})`);
    console.log(ig ? `  Instagram relié : @${ig.username} (${ig.id})` : '  Aucun compte Instagram professionnel relié à cette page.');
    console.log('  À coller dans .env :');
    console.log(`    META_PAGE_ID=${p.id}`);
    console.log(`    META_PAGE_TOKEN=${p.access_token}`);
    if (ig) console.log(`    META_IG_USER_ID=${ig.id}`);
  }
  console.log('\nLe jeton de page ne figure nulle part ailleurs que dans .env. Ne le colle jamais dans une issue ni un commit.');
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exitCode = 1;
});
