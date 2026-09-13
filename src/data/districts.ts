/**
 * Les implantations du mouvement : districts, groupes, unités (issue #34).
 *
 * Hiérarchie du mouvement : un **district** couvre un ou plusieurs cantons et
 * rassemble des **groupes** ; un groupe scout (garçons) réunit une meute de
 * louveteaux et une troupe d'éclaireurs, un groupe guide (filles) une
 * clairière de louvettes et une compagnie d'éclaireuses ; le **clan**
 * (routiers) et le **feu** (guides-aînées) sont rattachés au district.
 *
 * Source : la liste des groupes du Scoutisme européen suisse
 * (fr.scoutwiki.org), transmise par Nicolas le 2026-09-13, et les adresses
 * des secrétariats de la carte Google du mouvement. Les coordonnées sont
 * celles des localités (pas d'adresse de local).
 *
 * Deux points à confirmer par le mouvement :
 *   - dans le canton de Vaud, la liste donnait « 2e Lausanne — Sainte Claire
 *     d'Assise » deux fois : il n'est repris qu'une fois ;
 *   - le groupe « 1re Riviera » n'a pas de saint patron dans la liste, et sa
 *     localité est prise à Vevey, au centre de la Riviera.
 *
 * Ce fichier est LA source des implantations. Il se modifie par une issue
 * « Contenu ».
 */

export type GroupType = 'scouts' | 'guides';

export interface Group {
  /** « 1re Lausanne », « 2e Genève »… */
  name: string;
  type: GroupType;
  /** Le saint patron, tel qu'il est écrit dans la liste. */
  patron?: string;
  town: string;
  lat: number;
  lng: number;
  /** Unité en sommeil : elle existe mais n'a pas d'activité en ce moment. */
  sleeping?: boolean;
}

export interface District {
  key: string;
  /** Le nom du district (son saint patron). */
  name: string;
  /** Le ou les cantons couverts, en toutes lettres. */
  cantons: string;
  /** Les sigles des cantons. */
  codes: string[];
  /** Adresse du secrétariat. Toujours affichée protégée (issue #37). */
  email: string;
  groups: Group[];
  /** Le clan (routiers), s'il y en a un. */
  clan?: string;
  /** Le feu (guides-aînées), s'il y en a un. `'pilote'` = un feu pilote, sans nom. */
  feu?: string;
}

const T = {
  fribourg: { town: 'Fribourg', lat: 46.797, lng: 7.154 },
  neuchatel: { town: 'Neuchâtel', lat: 46.99, lng: 6.929 },
  geneve: { town: 'Genève', lat: 46.195, lng: 6.145 },
  lausanne: { town: 'Lausanne', lat: 46.534, lng: 6.649 },
  cote: { town: 'La Côte (Morges)', lat: 46.511, lng: 6.5 },
  riviera: { town: 'Riviera (Vevey)', lat: 46.462, lng: 6.843 },
  martigny: { town: 'Martigny', lat: 46.105, lng: 7.075 },
  zurich: { town: 'Zurich', lat: 47.369, lng: 8.553 },
  waedenswil: { town: 'Wädenswil', lat: 47.254, lng: 8.596 },
};

export const DISTRICTS: District[] = [
  {
    key: 'fr-ne',
    name: 'District St Nicolas de Myre',
    cantons: 'Fribourg et Neuchâtel',
    codes: ['FR', 'NE'],
    email: 'secretariat-fr@scouts-europe.ch',
    groups: [
      { name: '1re Fribourg', type: 'scouts', patron: 'Saint Maurice', ...T.fribourg },
      { name: '1re Neuchâtel', type: 'scouts', patron: 'Saint Martin', ...T.neuchatel },
      { name: '2e Fribourg', type: 'guides', patron: 'Sainte Apolline', ...T.fribourg },
      { name: '2e Neuchâtel', type: 'guides', patron: "Sainte Thérèse de l'Enfant Jésus", ...T.neuchatel },
    ],
    clan: 'Saint Bonaventure',
    feu: 'Sainte Marie Madeleine',
  },
  {
    key: 'ge',
    name: 'District Notre-Dame des Voirons',
    cantons: 'Genève',
    codes: ['GE'],
    email: 'secretariat-ge@scouts-europe.ch',
    groups: [
      { name: '1re Genève', type: 'scouts', patron: 'Saint François de Sales', ...T.geneve },
      { name: '3e Genève', type: 'scouts', patron: 'Saint Jean Bosco', ...T.geneve },
      { name: '7e Genève', type: 'scouts', patron: 'Saint Dominique', ...T.geneve },
      { name: '4e Genève', type: 'guides', patron: 'Sainte Joséphine Bakhita', sleeping: true, ...T.geneve },
      { name: '6e Genève', type: 'guides', patron: 'Sainte Thérèse', ...T.geneve },
      { name: '8e Genève', type: 'guides', patron: 'Sainte Bernadette', ...T.geneve },
    ],
    clan: 'Raoul Follereau',
    feu: 'Notre-Dame du Désert',
  },
  {
    key: 'vd',
    name: 'District St Amédée',
    cantons: 'Vaud',
    codes: ['VD'],
    email: 'secretariat-vd@scouts-europe.ch',
    groups: [
      { name: '1re Lausanne', type: 'scouts', patron: 'Bienheureux Pier Giorgio Frassati', ...T.lausanne },
      { name: '1re La Côte', type: 'scouts', patron: 'Saint François Marto', ...T.cote },
      { name: '1re Riviera', type: 'scouts', ...T.riviera },
      { name: '2e Lausanne', type: 'guides', patron: "Sainte Claire d'Assise", ...T.lausanne },
      { name: '4e Lausanne', type: 'guides', patron: 'Sainte Catherine de Sienne', ...T.lausanne },
    ],
    clan: 'Saint Martin',
    feu: 'Sainte Mère Teresa',
  },
  {
    key: 'vs',
    name: 'District St Théodule',
    cantons: 'Valais',
    codes: ['VS'],
    email: 'secretariat-vs@scouts-europe.ch',
    groups: [
      { name: '1re Martigny', type: 'scouts', patron: 'Bienheureux Maurice Tornay', ...T.martigny },
      { name: '2e Martigny', type: 'guides', patron: 'Sainte Blandine', ...T.martigny },
    ],
    clan: 'Saint Bernard',
    feu: 'pilote',
  },
  {
    key: 'zh',
    name: 'District St Nicolas de Flüe',
    cantons: 'Zurich',
    codes: ['ZH'],
    email: 'secretariat-zh@scouts-europe.ch',
    groups: [
      { name: '1re Zurich', type: 'scouts', patron: 'Saint Dominique Savio', ...T.zurich },
      { name: '2e Zurich', type: 'guides', patron: 'Sainte Louise de Marillac', ...T.zurich },
      { name: '2e Wädenswil', type: 'guides', patron: 'Sainte Marie Madeleine', sleeping: true, ...T.waedenswil },
    ],
    clan: 'Saints Félix et Régula',
    feu: 'Sainte Elisabeth du Portugal',
  },
];
