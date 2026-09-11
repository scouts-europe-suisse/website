# Plan 01 — Choisir l'hébergement et la façon de mettre le site en ligne

**Responsable :** à définir
**Date :** 2026-09-10
**Demandé par :** ouverture du chantier
**Portée :** hébergement, nom de domaine, `astro.config.mjs`, un futur script de publication

## Le problème

Le site est construit ici comme un **site statique** : les pages sont générées une fois, puis
servies comme de simples fichiers. C'est rapide, ça ne se fait pas pirater comme un WordPress, et
ça ne coûte presque rien à héberger. Mais il faut décider **où** ces fichiers vont vivre, et
**comment** on les y envoie quand quelqu'un a fini de modifier une page.

**Une partie est réglée depuis :** le site est publié en aperçu sur GitHub Pages, à
https://scouts-europe-suisse.github.io/website/ (`npm run deploy`). Ce qui reste à décider, c'est
le **vrai domaine** : `www.scouts-europe.ch` tourne toujours sous WordPress et n'est pas touché.

## GitHub Pages : adopté comme aperçu (2026-09-10)

Trois obstacles ont été rencontrés puis levés. À savoir, si la question du domaine réveille le
sujet :

**1. Dépôt privé + plan gratuit = pas de Pages.** GitHub ne sert un dépôt privé qu'avec un plan
payant. Le dépôt a donc été **rendu public**.

**2. Rendre public expose l'historique.** Les images d'origine, retirées du dossier de travail,
restaient dans les anciens commits — dont des photos de mineurs. L'historique a été **réécrit**
et la purge vérifiée sur un clone frais.

> **Reste ouvert :** GitHub sert encore ces objets, par leur empreinte, à toute requête
> **authentifiée** — vérifié, pas supposé. Pour fermer complètement : supprimer et recréer le
> dépôt (0 fork, 0 étoile), ou demander à GitHub de purger. Sauvegarde d'avant purge :
> `/tmp/ses-avant-purge.bundle`, à déplacer ailleurs car `/tmp` se vide au redémarrage.

**3. Une adresse Pages de projet vit dans un sous-dossier** (`/website/`). Le site sait
maintenant tourner **aux deux endroits** : `SITE_URL` et `BASE_PATH` suffisent à basculer. Le
jour où le domaine du mouvement est branché, on retire les deux variables et rien d'autre ne
bouge. Détails : [`../../_memory/local-dev-and-deploy.md`](../../_memory/local-dev-and-deploy.md).

## Ce qu'il faut décider

1. **Où le site est hébergé.** Quelques options courantes, de la moins à la plus autonome :
   - garder l'hébergeur actuel du SES et y déposer les fichiers générés ;
   - un hébergeur suisse (Infomaniak par exemple), ce qui répond au point « conformité à la
     réglementation suisse » du cahier des charges ;
   - une plateforme de pages statiques (GitHub Pages, Netlify), gratuite mais hébergée hors de
     Suisse.
2. **Qui a le droit de publier**, et à partir de quel moment (relecture par qui ?).
3. **Quand on bascule** `www.scouts-europe.ch` de l'ancien site vers le nouveau, et ce qu'on fait
   des anciennes adresses des pages pour ne pas casser les liens existants (voir plan 03).
4. **Où part l'adresse e-mail `info@scouts-europe.ch`** si le domaine change d'hébergeur — c'est
   le piège classique de ce genre de bascule.

## Le geste à ne pas oublier le jour de la bascule

**Le site est délibérément invisible pour les moteurs de recherche** tant qu'il n'a pas remplacé
le WordPress. Chaque page porte la mention « ne pas indexer », et le `robots.txt` interdit tout.
C'est voulu : un aperçu qui dit la même chose que `www.scouts-europe.ch` entrerait en concurrence
avec lui dans Google.

**Ça ne se lève pas tout seul.** Il faut construire le site avec `SES_SITE_MODE=production`, et
c'est la seule chose à changer :

```bash
SES_SITE_MODE=production npm run build
```

Sans ce réglage, le nouveau site prendrait le domaine du mouvement **et disparaîtrait des
résultats de recherche.** C'est le genre d'erreur qu'on ne remarque pas avant des semaines.

Le sens de la consigne est volontaire : on demande explicitement à être indexé. On ne peut donc
pas publier un site de test indexable par distraction — seulement oublier de lever la protection
le jour J, ce que cette section est là pour empêcher. Détail dans
[`src/data/site.ts`](../../src/data/site.ts) et le [plan référencement](../XX-referencement-later/PLAN.md).

## Ce que « terminé » veut dire

- Le domaine `www.scouts-europe.ch` pointe sur le nouveau site, et l'accès à l'hébergement est
  aux mains d'au moins deux personnes du mouvement.
- La table des redirections est re-vérifiée **sur le vrai domaine** avant de couper WordPress
  (elle l'a déjà été sur l'aperçu : 162 adresses, zéro échec).
- Le sort de l'e-mail `info@scouts-europe.ch` est tranché par écrit.
- Une commande unique publie le site, et elle est décrite dans
  [`../../_memory/local-dev-and-deploy.md`](../../_memory/local-dev-and-deploy.md).
- La règle de confirmation avant publication est écrite dans `CLAUDE.md`.
- Le site est construit en mode production, et il est vérifié **sur le vrai domaine** qu'il
  n'est plus marqué « ne pas indexer ».
- Le sort de l'e-mail et des anciennes adresses est tranché par écrit.
