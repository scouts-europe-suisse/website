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

  // Legacy WordPress URLs → new homes. Filled in as pages are migrated;
  // see _memory/source-site.md for the full inventory of what exists today.
  redirects: {},

  vite: {
    plugins: [tailwindcss()],
  },
});
