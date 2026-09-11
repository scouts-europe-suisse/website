/**
 * Le robots.txt, écrit à la construction plutôt que posé en dur dans public/.
 *
 * Pourquoi une route et non un fichier : son contenu dépend de la situation.
 * En préparation il interdit tout, en production il autorise tout et annonce
 * le plan du site. Un fichier unique dans public/ obligerait à se souvenir de
 * le modifier à la main le jour de la bascule — c'est exactement le genre
 * d'oubli qui met un site de test dans Google.
 *
 * À savoir, et c'est important : **un robots.txt n'est lu qu'à la racine d'un
 * domaine.** L'aperçu est servi sous github.io/website/, donc celui-ci n'y est
 * jamais consulté par les moteurs de recherche. Ce n'est pas une raison de
 * s'en passer — il redevient le bon fichier dès que le site sert un domaine à
 * lui — mais ce n'est pas lui qui protège l'aperçu. C'est la mention
 * « ne pas indexer » posée dans chaque page (voir BaseLayout.astro).
 */
import type { APIRoute } from 'astro';
import { IS_PRODUCTION_SITE, SITE } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.domain)).origin;

  const body = IS_PRODUCTION_SITE
    ? `# ${SITE.name} — ${SITE.domain}
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap-index.xml
`
    : `# Site de préparation du ${SITE.name} — ce n'est pas le site du mouvement.
# Le site officiel est ${SITE.domain}. Cette version sert à préparer son
# remplacement : elle ne doit apparaître dans aucun résultat de recherche.
#
# Ce fichier n'est pas la seule protection : servi depuis un sous-dossier, il
# n'est jamais lu. Chaque page porte aussi la mention « ne pas indexer ».
User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
