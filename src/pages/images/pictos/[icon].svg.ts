/**
 * Les pictogrammes de branche en fichiers SVG autonomes :
 * `/images/pictos/louveteaux.svg`, etc. Générés au build depuis
 * `src/data/pictos.ts`, la seule source. Servent partout où un composant
 * Astro n'est pas utilisable : markdown, image de partage, documents.
 */
import type { APIRoute } from 'astro';
import { PICTOS, pictoSvg, type PictoKey } from '../../../data/pictos';

export function getStaticPaths() {
  return (Object.keys(PICTOS) as PictoKey[]).map((icon) => ({ params: { icon } }));
}

export const GET: APIRoute = ({ params }) => {
  const icon = params.icon as PictoKey;
  return new Response(pictoSvg(icon), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
