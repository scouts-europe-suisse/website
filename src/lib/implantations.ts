/**
 * Les implantations du mouvement, vues par localité, à partir de la
 * hiérarchie districts → groupes → unités de `src/data/districts.ts`.
 *
 * Une « place » est une localité où le mouvement a au moins un groupe : c'est
 * ce que la carte marque d'un repère. Chaque place connaît son district, ses
 * groupes, et les branches qu'on y trouve : un groupe scout apporte les
 * louveteaux et les éclaireurs, un groupe guide les louvettes et les
 * éclaireuses ; le clan (routiers) et le feu (guides-aînées) du district
 * comptent pour toutes ses localités.
 */
import type { PictoKey } from '../data/pictos';
import type { Lang } from '../data/site';
import { DISTRICTS, type District, type Group } from '../data/districts';

export interface Place {
  id: string;
  /** Le nom court affiché sur la carte : la localité. */
  short: string;
  name: string;
  district: District;
  lat: number;
  lng: number;
  groups: Group[];
  kinds: PictoKey[];
  /** Nombre de groupes actifs (hors unités en sommeil). */
  activeGroups: number;
}

export const KIND_LABELS: Record<PictoKey, Record<Lang, string>> = {
  louveteaux: { fr: 'Louveteaux', de: 'Wölflinge (Buben)' },
  louvettes: { fr: 'Louvettes', de: 'Wölflinge (Mädchen)' },
  eclaireurs: { fr: 'Éclaireurs', de: 'Pfadfinder' },
  eclaireuses: { fr: 'Éclaireuses', de: 'Pfadfinderinnen' },
  routiers: { fr: 'Routiers', de: 'Rover' },
  'guides-ainees': { fr: 'Guides-aînées', de: 'Ranger' },
};

export const KIND_AGES: Record<PictoKey, string> = {
  louveteaux: '8-12', louvettes: '8-12',
  eclaireurs: '12-17', eclaireuses: '12-17',
  routiers: '17-19', 'guides-ainees': '17-19',
};

export const KIND_ORDER: PictoKey[] = ['louvettes', 'louveteaux', 'eclaireuses', 'eclaireurs', 'guides-ainees', 'routiers'];

/** Les branches qu'apporte un groupe, selon qu'il est scout ou guide. */
export function groupKinds(g: Group): PictoKey[] {
  if (g.sleeping) return [];
  return g.type === 'scouts' ? ['louveteaux', 'eclaireurs'] : ['louvettes', 'eclaireuses'];
}

/** Les branches d'un district : celles de ses groupes, plus son clan et son feu. */
export function districtKinds(d: District): PictoKey[] {
  const set = new Set<PictoKey>(d.groups.flatMap(groupKinds));
  if (d.clan) set.add('routiers');
  if (d.feu) set.add('guides-ainees');
  return KIND_ORDER.filter((k) => set.has(k));
}

export function getPlaces(): Place[] {
  const places: Place[] = [];
  for (const d of DISTRICTS) {
    const byTown = new Map<string, Group[]>();
    for (const g of d.groups) byTown.set(g.town, [...(byTown.get(g.town) ?? []), g]);
    for (const [town, groups] of byTown) {
      const set = new Set<PictoKey>(groups.flatMap(groupKinds));
      if (d.clan) set.add('routiers');
      if (d.feu) set.add('guides-ainees');
      places.push({
        id: `lieu-${d.key}-${town.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}`,
        short: town.replace(/\s*\(.*\)$/, ''),
        name: `${town} — ${d.name}`,
        district: d,
        lat: groups[0].lat,
        lng: groups[0].lng,
        groups,
        kinds: KIND_ORDER.filter((k) => set.has(k)),
        activeGroups: groups.filter((g) => !g.sleeping).length,
      });
    }
  }
  return places;
}

export { DISTRICTS };
