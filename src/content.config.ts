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
    /**
     * L'adresse publique de la page, dans sa langue, sous /<langue>/.
     * Le champ ne peut pas s'appeler `slug` : ce nom est réservé par le
     * chargeur de contenu, qui s'en sert pour fabriquer l'identifiant des
     * entrées — fr/espas et de/espas se seraient écrasés l'un l'autre.
     * Les adresses françaises sont celles du site actuel : les changer
     * casserait les liens existants et le référencement.
     * Les adresses allemandes sont en allemand — un lecteur germanophone
     * n'a pas à naviguer dans des URL françaises.
     */
    urlPath: z.string(),
    /**
     * L'identifiant neutre qui relie une page à sa jumelle dans l'autre
     * langue. C'est lui qui permet au sélecteur de langue de basculer sur
     * la bonne page alors que les deux adresses n'ont rien en commun
     * (/fr/branche-jaune/ ↔ /de/woelflingsstufe/).
     */
    key: z.string(),
    /** Résumé affiché dans les résultats de recherche et les partages. */
    description: z.string().optional(),
    /** Ordre d'affichage quand plusieurs pages sont listées ensemble. */
    order: z.number().optional(),
    /**
     * Date de dernière modification de la page sur l'ancien site WordPress.
     * Sert à repérer les pages allemandes en retard sur leur jumelle
     * française. Se retire quand la page est reprise en main ici.
     */
    sourceModified: z.coerce.date().optional(),
    /**
     * true = la page se termine par le bloc de contact. L'ancien site y
     * mettait un formulaire Contact Form 7, qui a besoin d'un serveur ;
     * voir src/components/ContactForm.astro.
     */
    contactForm: z.boolean().default(false),
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
