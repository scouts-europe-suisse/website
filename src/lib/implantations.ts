/**
 * Les implantations du mouvement, lues et interprétées.
 *
 * La source est `src/data/implantations.json`, écrit par `npm run implantations`
 * depuis la carte Google du mouvement. Chaque repère y décrit ses unités en
 * français courant (« Deux clairières de louvettes »). On en tire ici, pour
 * chaque implantation, la liste des branches présentes et le nombre d'unités,
 * ce qui permet de filtrer la carte par tranche d'âge.
 *
 * Rien n'est inventé : une ligne qui ne se laisse pas lire reste affichée
 * telle quelle, sans être comptée.
 */
import type { PictoKey } from '../data/pictos';
import type { Lang } from '../data/site';
import raw from '../data/implantations.json';

export interface Unit {
  kind: PictoKey;
  count: number;
  /** La ligne d'origine, pour l'afficher telle quelle. */
  label: string;
}

export interface Place {
  id: string;
  name: string;
  /** « District St Amédée - Vaud » → « Vaud » ; sinon le nom tel quel. */
  short: string;
  district: string | null;
  region: string | null;
  lat: number;
  lng: number;
  groupe: string | null;
  email: string | null;
  units: Unit[];
  /** Les lignes qu'on n'a pas su lire. */
  other: string[];
  unitCount: number;
  kinds: PictoKey[];
}

const NUMBERS: Record<string, number> = {
  un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
};

const KINDS: [RegExp, PictoKey][] = [
  [/louvettes?/i, 'louvettes'],
  [/louveteaux?/i, 'louveteaux'],
  [/[ée]claireuses?/i, 'eclaireuses'],
  [/[ée]claireurs?/i, 'eclaireurs'],
  [/guides?[- ]a[iî]n[ée]es?/i, 'guides-ainees'],
  [/routiers?/i, 'routiers'],
];

export function parseUnit(line: string): Unit | null {
  const kind = KINDS.find(([re]) => re.test(line))?.[1];
  if (!kind) return null;
  const first = line.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-zé]/g, '') ?? '';
  const count = NUMBERS[first] ?? (Number(first) || 1);
  return { kind, count, label: line.trim() };
}

/** Les libellés des branches pour les filtres, dans les deux langues. */
export const KIND_LABELS: Record<PictoKey, Record<Lang, string>> = {
  louveteaux: { fr: 'Louveteaux', de: 'Wölflinge (Buben)' },
  louvettes: { fr: 'Louvettes', de: 'Wölflinge (Mädchen)' },
  eclaireurs: { fr: 'Éclaireurs', de: 'Pfadfinder' },
  eclaireuses: { fr: 'Éclaireuses', de: 'Pfadfinderinnen' },
  routiers: { fr: 'Routiers', de: 'Rover' },
  'guides-ainees': { fr: 'Guides-aînées', de: 'Ranger' },
};

/** Les tranches d'âge, tirées des titres des pages de branche. */
export const KIND_AGES: Record<PictoKey, string> = {
  louveteaux: '8-12', louvettes: '8-12',
  eclaireurs: '12-17', eclaireuses: '12-17',
  routiers: '17-19', 'guides-ainees': '17-19',
};

export const KIND_ORDER: PictoKey[] = ['louvettes', 'louveteaux', 'eclaireuses', 'eclaireurs', 'guides-ainees', 'routiers'];

export function getPlaces(): Place[] {
  return raw.places.map((p, i) => {
    const m = p.name.match(/^District\s+(.+?)\s+-\s+(.+)$/);
    const units: Unit[] = [];
    const other: string[] = [];
    for (const line of p.unites) {
      const u = parseUnit(line);
      if (u) units.push(u);
      else other.push(line);
    }
    const kinds = KIND_ORDER.filter((k) => units.some((u) => u.kind === k));
    return {
      id: `lieu-${i + 1}`,
      name: p.name,
      short: m ? m[2] : p.name,
      district: m ? m[1] : null,
      region: m ? m[2] : null,
      lat: p.lat,
      lng: p.lng,
      groupe: p.groupe ?? null,
      email: p.email ?? null,
      units,
      other,
      unitCount: units.reduce((s, u) => s + u.count, 0),
      kinds,
    };
  });
}

export const SOURCE = raw.source;
