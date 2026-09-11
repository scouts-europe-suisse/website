/**
 * Dimensions réelles d'une image de `public/`, lues dans son en-tête.
 *
 * Sert à deux choses au moment de la construction :
 *  - poser `width`/`height` sur l'image, pour que la page ne saute pas
 *    pendant son chargement ;
 *  - distinguer un écusson d'un bandeau. On se fondait jusqu'ici sur
 *    l'EXTENSION du fichier, ce qui était faux : l'écusson de branche
 *    (104×104) et le logo Carrick (1200×460) sont tous deux des PNG, et le
 *    second se retrouvait bridé à la taille du premier.
 */
import fs from 'node:fs';
import path from 'node:path';

export interface Size {
  w: number;
  h: number;
}

export function imageSize(publicPath: string): Size | null {
  try {
    const file = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));
    const b = fs.readFileSync(file);

    // PNG : largeur et hauteur en clair dans le bloc IHDR
    if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
      return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    }

    // JPEG : parcourir les segments jusqu'au SOF, qui porte les dimensions
    if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length - 9) {
        if (b[i] !== 0xff) { i++; continue; }
        const marker = b[i + 1];
        const len = b.readUInt16BE(i + 2);
        if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
          return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        }
        i += 2 + len;
      }
    }
  } catch {
    // image absente ou format non reconnu : on laisse le gabarit se débrouiller
  }
  return null;
}

/** Une petite image carrée est un écusson, pas un bandeau de page. */
export function isEmblem(size: Size | null): boolean {
  return !!size && size.w <= 300 && Math.abs(size.w - size.h) / size.w < 0.25;
}
