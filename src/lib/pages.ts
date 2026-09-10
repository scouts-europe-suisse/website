/**
 * Le lien entre une page et sa jumelle dans l'autre langue.
 *
 * Les deux versions d'une page n'ont pas la même adresse — /fr/branche-jaune/
 * et /de/woelflingsstufe/ n'ont rien en commun — parce qu'un lecteur
 * germanophone n'a pas à naviguer dans des URL françaises. Ce qui les relie
 * est la clé `key`, portée par les deux fichiers.
 */
import { getCollection } from 'astro:content';
import type { Lang } from '../data/site';

export interface PageRef {
  key: string;
  lang: Lang;
  slug: string;
  title: string;
}

let cache: PageRef[] | null = null;

async function all(): Promise<PageRef[]> {
  if (cache) return cache;
  const entries = await getCollection('pages');
  cache = entries.map((e) => ({
    key: e.data.key,
    lang: e.id.split('/')[0] as Lang,
    slug: e.data.urlPath,
    title: e.data.title,
  }));
  return cache;
}

/**
 * L'adresse d'une page, par sa clé, dans une langue. `null` si la page
 * n'existe pas dans cette langue : plusieurs pages n'ont pas de jumelle.
 */
export async function pathFor(key: string, lang: Lang): Promise<string | null> {
  const p = (await all()).find((x) => x.key === key && x.lang === lang);
  return p ? `/${lang}/${p.slug}/` : null;
}

/** La page jumelle, à partir de la clé et de la langue courante. */
export async function twinOf(key: string, current: Lang): Promise<string | null> {
  return pathFor(key, current === 'fr' ? 'de' : 'fr');
}

/**
 * Les sous-pages directes d'une page, dans la même langue.
 *
 * Déduites de l'adresse : `notre-scoutisme/qui-sommes-nous` est fille de
 * `notre-scoutisme`. C'est plus sûr que de lire le menu, qui ne contient que
 * ce qu'on a choisi d'y montrer — la page de Fribourg, par exemple, est fille
 * des implantations sans figurer au menu.
 */
export async function childrenOf(key: string, lang: Lang): Promise<PageRef[]> {
  const list = await all();
  const me = list.find((x) => x.key === key && x.lang === lang);
  if (!me || !me.slug) return [];
  const prefix = me.slug + '/';
  return list
    .filter((x) => x.lang === lang && x.slug.startsWith(prefix))
    .filter((x) => !x.slug.slice(prefix.length).includes('/'))
    .sort((a, b) => a.title.localeCompare(b.title, lang));
}

/** Toutes les pages d'une langue, pour construire des index. */
export async function pagesIn(lang: Lang): Promise<PageRef[]> {
  return (await all()).filter((x) => x.lang === lang);
}
