/**
 * Le flux RSS des actualités, une adresse par langue.
 * Le site WordPress actuel en publie un ; le supprimer casserait les
 * lecteurs de flux et les agrégateurs qui suivent le mouvement.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { LANGS, SITE, UI, type Lang } from '../../../data/site';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const articles = (await getCollection('news', (e) => e.id.startsWith(`${lang}/`) && !e.data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: `${SITE.name} — ${UI.news[lang]}`,
    description:
      lang === 'fr'
        ? `Les actualités du ${SITE.name}.`
        : `Neuigkeiten des ${SITE.name}.`,
    site: context.site ?? SITE.domain,
    items: articles.map((a) => ({
      title: a.data.title,
      pubDate: a.data.date,
      description: a.data.summary,
      link: `/${lang}/actualites/${a.id.split('/')[1]}/`,
    })),
  });
}
