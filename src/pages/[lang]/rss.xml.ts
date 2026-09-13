/**
 * Le flux RSS des actualités, une adresse par langue :
 * /fr/rss.xml et /de/rss.xml. Le site actuel en publie un ; le supprimer
 * casserait les lecteurs de flux qui suivent le mouvement.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { LANGS, NEWS_BASE, SITE, UI, withBase, type Lang } from '../../data/site';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const articles = (
    await getCollection('news', (e) => e.id.startsWith(`${lang}/`) && !e.data.draft)
  ).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: `${SITE.name[lang]} — ${UI.news[lang]}`,
    description:
      lang === 'fr' ? `Les actualités du ${SITE.name.fr}.` : `Neuigkeiten der ${SITE.name.de}.`,
    site: context.site ?? SITE.domain,
    items: articles.map((a) => ({
      title: a.data.title,
      pubDate: a.data.date,
      description: a.data.summary,
      link: withBase(`/${lang}/${NEWS_BASE[lang]}/${a.id.split('/')[1]}/`),
    })),
  });
}
