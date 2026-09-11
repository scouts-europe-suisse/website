/**
 * Le lien entre une page et sa jumelle dans l'autre langue.
 *
 * Les deux versions d'une page n'ont pas la même adresse — /fr/branche-jaune/
 * et /de/woelflingsstufe/ n'ont rien en commun — parce qu'un lecteur
 * germanophone n'a pas à naviguer dans des URL françaises. Ce qui les relie
 * est la clé `key`, portée par les deux fichiers.
 */
import { getCollection } from 'astro:content';
import { NAV, withBase, type Lang } from '../data/site';

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
  return p ? withBase(`/${lang}/${p.slug}/`) : null;
}

/** La page jumelle, à partir de la clé et de la langue courante. */
export async function twinOf(key: string, current: Lang): Promise<string | null> {
  return pathFor(key, current === 'fr' ? 'de' : 'fr');
}

/**
 * Les sous-pages d'une rubrique, dans la même langue.
 *
 * C'est LE MENU qui fait foi, et lui seul : il dit ce qui appartient à une
 * rubrique. « Un mouvement suisse » et « ESPAS » sont sous « Le mouvement »
 * dans le menu, alors que leurs adresses sont ailleurs dans l'arborescence —
 * en se fiant aux adresses, la rubrique n'en montrait que la moitié.
 *
 * Une page hors menu n'apparaît donc dans aucun sommaire, même si son adresse
 * la place sous une rubrique. C'est voulu : en retombant sur les adresses, la
 * page des implantations affichait un bouton « Fribourg » que le site actuel
 * n'a pas, alors que cette page se rejoint depuis la carte.
 */
export async function childrenOf(key: string, lang: Lang): Promise<PageRef[]> {
  const list = await all();
  if (!list.some((x) => x.key === key && x.lang === lang)) return [];

  return (NAV.find((i) => i.key === key)?.children ?? [])
    .map((c) => list.find((x) => x.key === c.key && x.lang === lang))
    .filter((x): x is PageRef => Boolean(x));
}

/** Toutes les pages d'une langue, pour construire des index. */
export async function pagesIn(lang: Lang): Promise<PageRef[]> {
  return (await all()).filter((x) => x.lang === lang);
}
