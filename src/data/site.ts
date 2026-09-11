/**
 * Les réglages du site en un seul endroit : langues, libellés du menu,
 * coordonnées. Toute page qui a besoin d'un de ces éléments le lit ici,
 * pour qu'un changement (un item de menu, une adresse) se fasse une fois.
 *
 * Les faits qui concernent le mouvement (adresse, e-mail) viennent du site
 * actuel — voir _memory/source-site.md. Ne rien inventer ici.
 */

/**
 * Dans quelle situation tourne le site. Les deux n'ont pas les mêmes règles
 * face aux moteurs de recherche, et c'est la seule différence entre elles.
 *
 *   préparation (par défaut) — le site tourne en local, ou il est exposé en
 *     aperçu sur github.io pour être relu. Ce n'est pas le site du mouvement :
 *     il ne doit apparaître dans aucun résultat de recherche, sans quoi il
 *     entre en concurrence avec www.scouts-europe.ch, qui est le vrai site
 *     tant que la bascule n'a pas eu lieu.
 *
 *   production — le site A REMPLACÉ le WordPress et sert le domaine du
 *     mouvement. Il doit alors être indexé, c'est tout l'intérêt.
 *
 * **La production se demande explicitement**, avec SES_SITE_MODE=production au
 * moment de construire. C'est volontairement dans ce sens : on ne peut pas
 * publier un site indexable par distraction, il faut l'avoir décidé. Le jour
 * de la bascule, c'est la ligne à changer — voir le plan 01.
 */
export const IS_PRODUCTION_SITE = process.env.SES_SITE_MODE === 'production';

export const LANGS = ['fr', 'de'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'fr';

export const LANG_LABELS: Record<Lang, string> = {
  fr: 'Français',
  de: 'Deutsch',
};

export const SITE = {
  name: 'Scoutisme Européen Suisse',
  shortName: 'SES',
  domain: 'https://www.scouts-europe.ch',
  email: 'info@scouts-europe.ch',
  /**
   * L'adresse du siège. La rue ne se traduit pas (c'est une adresse postale
   * genevoise) ; la ville et le pays, si.
   */
  address: {
    street: 'Rue Prévost-Martin 10',
    city: { fr: '1205 Genève', de: '1205 Genf' },
    country: { fr: 'Suisse', de: 'Schweiz' },
  },
} as const;

/**
 * Un item de menu. `key` est l'identifiant neutre de la page ; son adresse
 * réelle dépend de la langue et se résout au moment du rendu (voir
 * src/lib/pages.ts). `route` sert aux entrées qui ne sont pas des pages de
 * contenu mais des routes du site, comme la liste des actualités.
 */
export interface NavItem {
  key?: string;
  route?: Record<Lang, string>;
  label: Record<Lang, string>;
  children?: NavItem[];
}

/**
 * Le menu principal. Il reprend l'arborescence du site actuel, elle-même
 * proche de celle proposée par le cahier des charges SES25.
 *
 * Les libellés sont ceux du menu, plus courts que les titres de page.
 */
export const NAV: NavItem[] = [
  {
    route: { fr: '', de: '' },
    label: { fr: 'Accueil', de: 'Startseite' },
  },
  {
    key: 'notre-scoutisme',
    label: { fr: 'Notre scoutisme', de: 'Unsere Pfadfinderschaft' },
    children: [
      { key: 'qui-sommes-nous',      label: { fr: 'Qui sommes-nous ?', de: 'Wer sind wir?' } },
      { key: 'que-faisons-nous',     label: { fr: 'Que faisons-nous ?', de: 'Was machen wir?' } },
      { key: 'branche-jaune',        label: { fr: 'Louveteaux et louvettes', de: 'Wölflinge' } },
      { key: 'branche-verte',        label: { fr: 'Éclaireurs et éclaireuses', de: 'Pfadfinder' } },
      { key: 'branche-rouge',        label: { fr: 'Routiers et guides-aînées', de: 'Rover und Ranger' } },
      { key: 'dimension-europeenne', label: { fr: 'La dimension européenne', de: 'Die europäische Dimension' } },
    ],
  },
  {
    key: 'mouvement',
    label: { fr: 'Le mouvement', de: 'Die Bewegung' },
    children: [
      { key: 'formation-des-chefs', label: { fr: 'Formation des chefs', de: 'Ausbildung der Leiter' } },
      { key: 'encadrement',         label: { fr: 'Encadrement', de: 'Betreuung' } },
      { key: 'mouvement-suisse',    label: { fr: 'Un mouvement suisse', de: 'Eine schweizerische Bewegung' } },
      { key: 'espas',               label: { fr: 'ESPAS', de: 'ESPAS' } },
    ],
  },
  {
    route: { fr: 'actualites', de: 'aktuelles' },
    label: { fr: 'Actualités', de: 'Aktuelles' },
  },
  {
    key: 'nous-rejoindre',
    label: { fr: 'Nous rejoindre', de: 'Uns beitreten' },
    children: [
      { key: 'nos-implantations', label: { fr: 'Nos implantations', de: 'Unsere Standorte' } },
      { key: 'devenir-chef',      label: { fr: 'Devenir chef', de: 'Leiter werden' } },
    ],
  },
  {
    key: 'economat-carrick',
    label: { fr: 'Économat Carrick', de: 'Carrick' },
  },
  {
    key: 'contact',
    label: { fr: 'Contact', de: 'Kontakt' },
  },
];

/** Les quelques chaînes d'interface qui n'appartiennent à aucune page. */
export const UI = {
  skipToContent: { fr: 'Aller au contenu', de: 'Zum Inhalt springen' },
  menu: { fr: 'Menu', de: 'Menü' },
  home: { fr: 'Accueil', de: 'Startseite' },
  news: { fr: 'Actualités', de: 'Aktuelles' },
  allNews: { fr: 'Toutes les actualités', de: 'Alle Neuigkeiten' },
  noNews: {
    fr: "Aucune actualité pour l'instant.",
    de: 'Noch keine Neuigkeiten.',
  },
  readMore: { fr: 'Lire la suite', de: 'Weiterlesen' },
  contactUs: { fr: 'Nous écrire', de: 'Schreiben Sie uns' },
  search: { fr: 'Recherche', de: 'Suche' },
  searchPlaceholder: { fr: 'Recherche…', de: 'Suche…' },
  searchIntro: {
    fr: 'Tapez un mot pour chercher dans tout le site.',
    de: 'Geben Sie ein Wort ein, um die ganze Website zu durchsuchen.',
  },
  notFoundTitle: { fr: 'Page introuvable', de: 'Seite nicht gefunden' },
  notFoundBody: {
    fr: "Cette page n'existe pas, ou plus. Le menu ci-dessus devrait vous remettre sur la bonne voie.",
    de: 'Diese Seite gibt es nicht (mehr). Das Menü oben hilft weiter.',
  },
  draftNotice: {
    fr: 'Cette page est une ébauche : son contenu reste à rédiger.',
    de: 'Diese Seite ist ein Entwurf: der Inhalt muss noch geschrieben werden.',
  },
  untranslatedNotice: {
    fr: 'Cette page allemande n’a pas encore été relue par un germanophone du mouvement.',
    de: 'Diese Seite wurde noch nicht von einem deutschsprachigen Mitglied gegengelesen.',
  },
} as const;

/**
 * Les comptes du mouvement sur les réseaux. Relevés dans les réglages du
 * thème actuel — ce sont les vrais, pas des exemples.
 * Le cahier des charges SES25 les demande (partie 2, point 4).
 */
export const SOCIAL = [
  { name: 'Facebook',  url: 'https://www.facebook.com/scouts.europe.suisse',  icon: 'facebook' },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/company/scoutisme-europeen-suisse', icon: 'linkedin' },
  { name: 'YouTube',   url: 'https://www.youtube.com/@scouts.europe.suisse',   icon: 'youtube' },
  { name: 'Instagram', url: 'https://www.instagram.com/scouts.europe.suisse',  icon: 'instagram' },
] as const;

/** La base de la rubrique actualités, par langue. */
export const NEWS_BASE: Record<Lang, string> = { fr: 'actualites', de: 'aktuelles' };

/** L'adresse de la page de recherche, par langue. */
export const SEARCH_BASE: Record<Lang, string> = { fr: 'recherche', de: 'suche' };

/**
 * Préfixe une adresse absolue du site par le sous-dossier de service.
 *
 * Le site doit tourner à deux endroits sans changer de code : à la racine
 * d'un domaine (`/fr/…`) et dans un sous-dossier, comme sur GitHub Pages
 * (`/website/fr/…`). Toute adresse écrite en dur DOIT passer par ici — une
 * seule oubliée et c'est une image ou un lien mort dès qu'on déplace le site.
 *
 * `import.meta.env.BASE_URL` vaut «/» par défaut et le sous-dossier sinon ;
 * Astro le renseigne à partir de `base` dans astro.config.mjs.
 */
export function withBase(p: string): string {
  const base = import.meta.env.BASE_URL || '/';
  if (!p.startsWith('/')) return p;
  const prefix = base.replace(/\/$/, '');
  return p.startsWith(prefix + '/') ? p : prefix + p;
}

/** Le chemin d'une page, dans une langue donnée. */
export function path(lang: Lang, slug = ''): string {
  return withBase(slug ? `/${lang}/${slug}/` : `/${lang}/`);
}
