import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  // The domain the site will eventually be served from. Used for canonical
  // URLs, the sitemap and hreflang. The host itself is not decided yet
  // (see _memory/local-dev-and-deploy.md) — only the domain is known.
  site: 'https://www.scouts-europe.ch',

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
      filter: (page) => page !== 'https://www.scouts-europe.ch/',
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

  // Adresses de l'ancien site WordPress vers leur nouvelle place.
  //
  // Une adresse qui disparaît sans redirection, c'est un lien mort : dans un
  // dépliant, sur la page d'un groupe local, dans les favoris d'un parent, et
  // surtout dans l'index de Google, où la page perd sa place.
  //
  // La table complète, avec le motif de chaque ligne, est dans
  // _migrations/url-map.md — c'est elle qui fait foi, pas ce bloc.
  redirects: {
    '/de/carrick-2': '/de/carrick/',
    '/de/category/actualites': '/de/aktuelles/',
    '/de/die-beweguni': '/de/die-bewegung/',
    '/de/die-beweguni/ausbildung-der-leiter': '/de/die-bewegung/ausbildung-der-leiter/',
    '/de/die-beweguni/betreuung': '/de/die-bewegung/betreuung/',
    '/de/die-beweguni/unsere-grundungstexte': '/de/die-bewegung/',
    '/de/espas-2': '/de/espas/',
    '/de/feed': '/de/rss.xml',
    '/de/grune-stufe': '/de/gruene-stufe/',
    '/de/kontakt': '/de/kontakt/',
    '/de/rote-stufe': '/de/rote-stufe/',
    '/de/stufen': '/de/unsere-pfadfinderschaft/',
    '/de/uns-beitreten': '/de/uns-beitreten/',
    '/de/uns-beitreten/leiter-werden': '/de/uns-beitreten/leiter-werden/',
    '/de/uns-beitreten/nationale-netzwerke': '/de/uns-beitreten/',
    '/de/uns-beitreten/standorte': '/de/uns-beitreten/standorte/',
    '/de/unsere-pfadfinderschaft': '/de/unsere-pfadfinderschaft/',
    '/de/unsere-pfadfinderschaft/europa': '/de/unsere-pfadfinderschaft/europa/',
    '/de/unsere-pfadfinderschaft/pfadfinderschaft': '/de/unsere-pfadfinderschaft/was-machen-wir/',
    '/de/unsere-pfadfinderschaft/schweizerische': '/de/unsere-pfadfinderschaft/schweizerische-bewegung/',
    '/de/unsere-pfadfinderschaft/wer-sind-wir': '/de/unsere-pfadfinderschaft/wer-sind-wir/',
    '/de/wolflingsstufe': '/de/woelflingsstufe/',
    '/fr/14-15-octobre-2017-quand-le-we-kraal-accueille-le-conseil-federal': '/fr/actualites/14-15-octobre-2017-quand-le-we-kraal-accueille-le-conseil-federal/',
    '/fr/acceuil': '/fr/',
    '/fr/author/redacteurses': '/fr/actualites/',
    '/fr/branche-jaune': '/fr/branche-jaune/',
    '/fr/branche-rouge': '/fr/branche-rouge/',
    '/fr/branche-rouge/guides-ainees': '/fr/branche-rouge/guides-ainees/',
    '/fr/branche-verte': '/fr/branche-verte/',
    '/fr/branches/branche-jaune': '/fr/branche-jaune/',
    '/fr/branches/branche-rouge': '/fr/branche-rouge/',
    '/fr/branches/branche-verte': '/fr/branche-verte/',
    '/fr/category/actualites': '/fr/actualites/',
    '/fr/contact': '/fr/contact/',
    '/fr/dimension-europeenne': '/fr/notre-scoutisme/europeen/',
    '/fr/eclaireurs-et-eclaireuses': '/fr/branche-verte/',
    '/fr/economat-carrick': '/fr/economat-carrick/',
    '/fr/espas': '/fr/espas/',
    '/fr/eurojam-2': '/fr/actualites/',
    '/fr/eurojam-2027': '/fr/actualites/eurojam-2027/',
    '/fr/eurojam': '/fr/actualites/eurojam/',
    '/fr/feed': '/fr/rss.xml',
    '/fr/journee-des-chefs-2015': '/fr/actualites/journee-des-chefs-2015/',
    '/fr/leitertag-2015': '/fr/actualites/',
    '/fr/louveteaux-et-louvettes': '/fr/branche-jaune/',
    '/fr/mouvement': '/fr/mouvement/',
    '/fr/mouvement/encadrement': '/fr/mouvement/encadrement/',
    '/fr/mouvement/formation-des-chefs': '/fr/mouvement/formation-des-chefs/',
    '/fr/mouvement/formation-des-chefs/route-vers-fatima-dons': '/fr/actualites/route-vers-fatima-dons/',
    '/fr/nationales-treffen-2013': '/fr/actualites/',
    '/fr/nationales-wolflingstreffen-2015': '/fr/actualites/',
    '/fr/notre-scoutisme': '/fr/notre-scoutisme/',
    '/fr/notre-scoutisme/europeen': '/fr/notre-scoutisme/europeen/',
    '/fr/notre-scoutisme/qui-sommes-nous': '/fr/notre-scoutisme/qui-sommes-nous/',
    '/fr/notre-scoutisme/scoutisme': '/fr/notre-scoutisme/scoutisme/',
    '/fr/notre-scoutisme/suisse': '/fr/notre-scoutisme/suisse/',
    '/fr/nous-rejoindre': '/fr/nous-rejoindre/',
    '/fr/nous-rejoindre/devenir-chef': '/fr/nous-rejoindre/devenir-chef/',
    '/fr/nous-rejoindre/nos-implantations': '/fr/nous-rejoindre/nos-implantations/',
    '/fr/nous-rejoindre/nos-implantations/fribourg': '/fr/nous-rejoindre/nos-implantations/fribourg/',
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
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
