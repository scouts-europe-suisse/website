import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Le contenu est rangé par langue à l'intérieur de chaque collection :
 *   src/content/pages/fr/contact.md   → identifiant "fr/contact"
 *   src/content/pages/de/contact.md   → identifiant "de/contact"
 * Les routes appellent getEntry('pages', `${lang}/${slug}`).
 *
 * Une page et sa jumelle dans l'autre langue partagent toujours le même slug :
 * c'est ce qui permet au sélecteur de langue de basculer sans se perdre.
 */

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    /** Résumé affiché dans les résultats de recherche et les partages. */
    description: z.string().optional(),
    /** Ordre d'affichage quand plusieurs pages sont listées ensemble. */
    order: z.number().optional(),
    /** true = le contenu reste à écrire ; un bandeau le signale sur la page. */
    draft: z.boolean().default(false),
    /**
     * Pour les pages allemandes : false tant qu'un germanophone du mouvement
     * ne l'a pas relue. Une traduction automatique reste à false.
     * Voir _memory/feedback_faits_du_mouvement.md.
     */
    translated: z.boolean().optional(),
    /** Accent de couleur d'une page de branche. */
    branche: z.enum(['jaune', 'verte', 'rouge']).optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Dernière révision de fond, si elle diffère de la publication. */
    updated: z.coerce.date().optional(),
    author: z.string().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    /**
     * Crédit de la photo de couverture. Obligatoire dès qu'il y a une image :
     * on ne publie pas une photo dont on ignore l'auteur. Voir CLAUDE.md.
     */
    coverCredit: z.string().optional(),
    draft: z.boolean().default(false),
    translated: z.boolean().optional(),
  }),
});

export const collections = { pages, news };
