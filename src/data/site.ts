/**
 * Les réglages du site en un seul endroit : langues, libellés du menu,
 * coordonnées. Toute page qui a besoin d'un de ces éléments le lit ici,
 * pour qu'un changement (un item de menu, une adresse) se fasse une fois.
 *
 * Les faits qui concernent le mouvement (adresse, e-mail) viennent du site
 * actuel — voir _memory/source-site.md. Ne rien inventer ici.
 */

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

/** Un item de menu. `slug` est l'adresse sous /<langue>/. */
export interface NavItem {
  slug: string;
  label: Record<Lang, string>;
  children?: NavItem[];
}

/**
 * Le menu. Il reprend l'arborescence du site actuel, elle-même proche de
 * celle proposée par le cahier des charges SES25.
 *
 * Les adresses (`slug`) sont celles du site actuel : les changer casse les
 * liens existants et le référencement. Voir _memory/source-site.md.
 */
export const NAV: NavItem[] = [
  {
    slug: 'notre-scoutisme',
    label: { fr: 'Notre scoutisme', de: 'Unser Pfadfindertum' },
    children: [
      {
        slug: 'notre-scoutisme/qui-sommes-nous',
        label: { fr: 'Qui sommes-nous ?', de: 'Wer wir sind' },
      },
      {
        slug: 'notre-scoutisme/scoutisme',
        label: { fr: 'Que faisons-nous ?', de: 'Was wir tun' },
      },
      {
        slug: 'branche-jaune',
        label: { fr: 'Louveteaux et louvettes', de: 'Wölflinge' },
      },
      {
        slug: 'branche-verte',
        label: { fr: 'Éclaireurs et éclaireuses', de: 'Pfadfinder' },
      },
      {
        slug: 'branche-rouge',
        label: { fr: 'Routiers et guides-aînées', de: 'Rover und Ranger' },
      },
      {
        slug: 'notre-scoutisme/europeen',
        label: { fr: 'La dimension européenne', de: 'Die europäische Dimension' },
      },
      {
        slug: 'notre-scoutisme/suisse',
        label: { fr: 'Un mouvement suisse', de: 'Eine Schweizer Bewegung' },
      },
    ],
  },
  {
    slug: 'mouvement',
    label: { fr: 'Le mouvement', de: 'Die Bewegung' },
    children: [
      {
        slug: 'mouvement/formation-des-chefs',
        label: { fr: 'Formation des chefs', de: 'Ausbildung der Leiter' },
      },
      {
        slug: 'mouvement/encadrement',
        label: { fr: 'Encadrement', de: 'Betreuung' },
      },
      { slug: 'espas', label: { fr: 'ESPAS', de: 'ESPAS' } },
      {
        slug: 'economat-carrick',
        label: { fr: 'Économat Carrick', de: 'Carrick Shop' },
      },
    ],
  },
  {
    slug: 'nous-rejoindre',
    label: { fr: 'Nous rejoindre', de: 'Mitmachen' },
    children: [
      {
        slug: 'nous-rejoindre/nos-implantations',
        label: { fr: 'Nos implantations et contacts locaux', de: 'Unsere Gruppen vor Ort' },
      },
      {
        slug: 'nous-rejoindre/devenir-chef',
        label: { fr: 'Devenir chef', de: 'Leiter werden' },
      },
    ],
  },
  {
    slug: 'actualites',
    label: { fr: 'Actualités', de: 'Aktuelles' },
  },
  {
    slug: 'contact',
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

/** Le chemin d'une page, dans une langue donnée. */
export function path(lang: Lang, slug = ''): string {
  return slug ? `/${lang}/${slug}/` : `/${lang}/`;
}
