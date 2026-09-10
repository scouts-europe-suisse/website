import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

const BASE = (process.env.BASE_PATH ?? '/').replace(/\/*$/, '/');

/**
 * Dimensions réelles d'une image, lues dans son en-tête.
 *
 * Sans `width`/`height`, le navigateur ne sait pas quelle place réserver :
 * la page saute quand chaque photo arrive, sous le doigt du lecteur. Une
 * vingtaine de lignes évitent ça, sans dépendance supplémentaire.
 */
function imageSize(file) {
  try {
    const b = fs.readFileSync(file);
    // PNG : largeur et hauteur en clair dans le bloc IHDR
    if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
      return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    }
    // JPEG : parcourir les segments jusqu'au SOF, qui porte les dimensions
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length - 9) {
        if (b[i] !== 0xff) { i++; continue; }
        const marker = b[i + 1];
        const len = b.readUInt16BE(i + 2);
        // SOF0..SOF15, en excluant les marqueurs qui n'en sont pas
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        }
        i += 2 + len;
      }
    }
  } catch {}
  return null;
}

/**
 * Préfixe les adresses absolues écrites dans le markdown (`/images/…`).
 * Astro applique `base` à ses propres liens, mais pas à ce qui est écrit à la
 * main dans le contenu : sans ce passage, toutes les images des pages
 * tombent en 404 dès que le site est servi depuis un sous-dossier.
 */
function rehypeBaseUrls() {
  return (tree) => {
    let seen = 0;
    visit(tree, 'element', (node) => {
      for (const attr of ['src', 'href']) {
        const v = node.properties?.[attr];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(BASE)) {
          node.properties[attr] = BASE.replace(/\/$/, '') + v;
        }
      }
      if (node.tagName !== 'img') return;

      // Les photos du corps des pages : seule la première est chargée tout de
      // suite. Les autres attendent qu'on descende — une actualité qui portait
      // 2 Mo d'images n'en charge plus qu'une au premier écran.
      seen += 1;
      node.properties.loading = seen === 1 ? 'eager' : 'lazy';
      node.properties.decoding = 'async';

      const src = String(node.properties.src || '');
      const rel = src.replace(BASE, '/').replace(/^\/+/, '');
      const size = imageSize(new URL(rel, new URL('public/', import.meta.url)));
      if (size) {
        node.properties.width = size.w;
        node.properties.height = size.h;
      }
    });
  };
}


/**
 * Les anciennes adresses vers leur nouvelle place.
 *
 * Astro n'applique PAS `base` à la destination d'une redirection : sans le
 * préfixe ajouté ici, chaque redirection renverrait à la racine du domaine et
 * tomberait en 404 dès que le site est servi depuis un sous-dossier.
 *
 * La table complète, avec le motif de chaque ligne, est dans
 * _migrations/url-map.md — c'est elle qui fait foi.
 */
const RAW_REDIRECTS = {
    '/de/carrick-2': '/de/carrick/',
    '/de/category/actualites': '/de/aktuelles/',
    '/de/die-beweguni': '/de/die-bewegung/',
    '/de/die-beweguni/ausbildung-der-leiter': '/de/die-bewegung/ausbildung-der-leiter/',
    '/de/die-beweguni/betreuung': '/de/die-bewegung/betreuung/',
    '/de/die-beweguni/unsere-grundungstexte': '/de/die-bewegung/',
    '/de/espas-2': '/de/espas/',
    '/de/feed': '/de/rss.xml',
    '/de/grune-stufe': '/de/gruene-stufe/',
    '/de/stufen': '/de/unsere-pfadfinderschaft/',
    '/de/uns-beitreten/nationale-netzwerke': '/de/uns-beitreten/',
    '/de/unsere-pfadfinderschaft/pfadfinderschaft': '/de/unsere-pfadfinderschaft/was-machen-wir/',
    '/de/unsere-pfadfinderschaft/schweizerische': '/de/unsere-pfadfinderschaft/schweizerische-bewegung/',
    '/de/wolflingsstufe': '/de/woelflingsstufe/',
    '/fr/14-15-octobre-2017-quand-le-we-kraal-accueille-le-conseil-federal': '/fr/actualites/14-15-octobre-2017-quand-le-we-kraal-accueille-le-conseil-federal/',
    '/fr/acceuil': '/fr/',
    '/fr/author/redacteurses': '/fr/actualites/',
    '/fr/branches/branche-jaune': '/fr/branche-jaune/',
    '/fr/branches/branche-rouge': '/fr/branche-rouge/',
    '/fr/branches/branche-verte': '/fr/branche-verte/',
    '/fr/category/actualites': '/fr/actualites/',
    '/fr/dimension-europeenne': '/fr/notre-scoutisme/europeen/',
    '/fr/eclaireurs-et-eclaireuses': '/fr/branche-verte/',
    '/fr/eurojam-2': '/fr/actualites/',
    '/fr/eurojam-2027': '/fr/actualites/eurojam-2027/',
    '/fr/eurojam': '/fr/actualites/eurojam/',
    '/fr/feed': '/fr/rss.xml',
    '/fr/journee-des-chefs-2015': '/fr/actualites/journee-des-chefs-2015/',
    '/fr/leitertag-2015': '/fr/actualites/',
    '/fr/louveteaux-et-louvettes': '/fr/branche-jaune/',
    '/fr/mouvement/formation-des-chefs/route-vers-fatima-dons': '/fr/actualites/route-vers-fatima-dons/',
    '/fr/nationales-treffen-2013': '/fr/actualites/',
    '/fr/nationales-wolflingstreffen-2015': '/fr/actualites/',
    '/fr/pelerinage-2024': '/fr/actualites/pelerinage-2024/',
    '/fr/pelerinage-2026': '/fr/actualites/pelerinage-2026/',
    '/fr/pelerinage-des-aines-du-scoutisme-europeen-suisse-a-fatima': '/fr/actualites/pelerinage-des-aines-du-scoutisme-europeen-suisse-a-fatima/',
    '/fr/pelerinage-national-2023': '/fr/actualites/pelerinage-national-2023/',
    '/fr/pelerinage-national-des-scouts-deurope-a-sion': '/fr/actualites/pelerinage-national-des-scouts-deurope-a-sion/',
    '/fr/qui-sommes-nous': '/fr/actualites/',
    '/fr/rencontre-nationale-2013': '/fr/actualites/rencontre-nationale-2013/',
    '/fr/rencontre-nationale-louvetisme-2015': '/fr/actualites/rencontre-nationale-louvetisme-2015/',
    '/fr/route-vers-fatima-dons': '/fr/actualites/route-vers-fatima-dons/',
    '/fr/routiers-et-guides-ainees': '/fr/branche-rouge/',
    '/fr/scouteuroptour-2': '/fr/actualites/scouteuroptour-2/',
    '/fr/scouteuroptour': '/fr/actualites/scouteuroptour/',
    '/fr/scouteuroptour2': '/fr/actualites/scouteuroptour2/',
    '/fr/we-koudou-eclaireuses-octobre-2022': '/fr/actualites/we-koudou-eclaireuses-octobre-2022/',
    '/fr/week-end-national-feu-octobre-2022': '/fr/actualites/week-end-national-feu-octobre-2022/',
    '/fr/weekend-intermaitrises-mars-2022': '/fr/actualites/weekend-intermaitrises-mars-2022/',
    '/fr/woodbadge-days-2023-en-suisse': '/fr/actualites/woodbadge-days-2023-en-suisse/',
};
const REDIRECTS = Object.fromEntries(
  Object.entries(RAW_REDIRECTS).map(([from, to]) => [from, BASE.replace(/\/$/, '') + to]),
);

export default defineConfig({
  // The domain the site will eventually be served from. Used for canonical
  // URLs, the sitemap and hreflang. The host itself is not decided yet
  // (see _memory/local-dev-and-deploy.md) — only the domain is known.
  // Où le site est servi. Deux cas, et le même code doit marcher pour les deux :
  //   - à la racine d'un domaine  : SITE_URL=https://www.scouts-europe.ch, BASE_PATH=/
  //   - dans un sous-dossier      : SITE_URL=https://<org>.github.io, BASE_PATH=/website
  // GitHub Pages sert un dépôt de projet sous /<nom-du-depot>/, d'où le
  // sous-dossier ; le jour où le site prend le domaine du mouvement, il suffit
  // de repasser BASE_PATH à «/» et rien d'autre ne bouge.
  site: process.env.SITE_URL ?? 'https://www.scouts-europe.ch',
  base: process.env.BASE_PATH ?? '/',

  // Plain http://localhost — no HTTPS proxy in front of the dev server, so the
  // Chrome preview and any teammate can open the URL directly.
  // PORT is honoured when a harness assigns one.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
    host: false,
  },

  integrations: [
    sitemap({
      // `/` is a noindex language-detection shim that forwards to /fr/ or /de/.
      // Keep it out of the sitemap rather than advertise a URL we ask search
      // engines not to index.
      filter: (page) => new URL(page).pathname.replace(/\/+$/, '/') !== BASE,
      // Emit <xhtml:link rel="alternate" hreflang="…"> for the FR/DE page pairs.
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr', de: 'de' },
      },
    }),
    pagefind(),
  ],

  // Build output. Kept separate from any future publish directory — see
  // _memory/local-dev-and-deploy.md ("build output ≠ publish directory").
  outDir: './_build',

  i18n: {
    locales: ['fr', 'de'],
    defaultLocale: 'fr',
    routing: {
      // The current WordPress site already serves /fr/ and /de/. Keeping the
      // prefix on the default locale means existing URLs and bookmarks map
      // one-to-one onto the new site.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  redirects: REDIRECTS,

  markdown: {
    rehypePlugins: [rehypeBaseUrls],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
