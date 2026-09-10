# Plan 01 — Choisir l'hébergement et la façon de mettre le site en ligne

**Statut :** ouvert
**Responsable :** à définir
**Date :** 2026-09-10
**Demandé par :** ouverture du chantier
**Portée :** hébergement, nom de domaine, `astro.config.mjs`, un futur script de publication

## Le problème

Le site est construit ici comme un **site statique** : les pages sont générées une fois, puis
servies comme de simples fichiers. C'est rapide, ça ne se fait pas pirater comme un WordPress, et
ça ne coûte presque rien à héberger. Mais il faut décider **où** ces fichiers vont vivre, et
**comment** on les y envoie quand quelqu'un a fini de modifier une page.

Tant que ce n'est pas décidé, ce dépôt ne contient volontairement **aucun** script de
publication, aucun fichier `CNAME`, aucune branche de déploiement. Personne ne peut donc
publier par accident — et le site WordPress actuel continue de tourner sans être touché.

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

## Ce que « terminé » veut dire

- L'hébergeur est choisi et l'accès est aux mains d'au moins deux personnes du mouvement.
- Une commande unique publie le site, et elle est décrite dans
  [`../../_memory/local-dev-and-deploy.md`](../../_memory/local-dev-and-deploy.md).
- La règle de confirmation avant publication est écrite dans `CLAUDE.md`.
- Le sort de l'e-mail et des anciennes adresses est tranché par écrit.
