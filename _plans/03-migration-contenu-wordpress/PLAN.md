# Plan 03 — Reprendre le contenu du site WordPress actuel

**Statut :** ouvert
**Responsable :** à définir
**Date :** 2026-09-10

> **2026-09-10 — le gros du texte est repris.** L'export de la base du WordPress a servi de
> source, plutôt que les pages affichées : 19 pages françaises, 17 pages allemandes et
> 19 actualités sont en place, sans rien réécrire.
>
> **Ce que ça a changé au plan :** l'allemand n'était pas à écrire. Il existait déjà, rédigé à la
> main, mais le site actuel ne le servait pas — `/de/` renvoie la page française. Le point 4
> ci-dessous tombe donc en grande partie.
>
> **Ce qui reste :** la page d'accueil (aucun texte à reprendre, l'ancienne était un assemblage
> de widgets), les images du corps des pages (18 en attente d'autorisation parentale), les
> jumelles allemandes manquantes, et la table des redirections.
**Demandé par :** ouverture du chantier
**Portée :** `_migrations/`, `src/content/`, la table des redirections dans `astro.config.mjs`

## Le problème

Le site actuel tourne sous WordPress et contient une vingtaine de pages publiques plus des
actualités. Le nouveau site part avec la même arborescence, mais **des pages encore vides** :
le squelette est là, le texte non.

Deux choses à ne pas rater en chemin :

1. **Les adresses des pages.** Une page qui change d'adresse disparaît des résultats de recherche
   et casse tous les liens existants (dépliants, réseaux sociaux, sites de groupes locaux). On
   garde donc les adresses actuelles quand c'est possible, et on met une redirection quand ça ne
   l'est pas. L'inventaire des adresses actuelles est dans
   [`../../_memory/source-site.md`](../../_memory/source-site.md).
2. **L'allemand n'existe pas.** `www.scouts-europe.ch/de/` sert aujourd'hui la page française à
   l'identique. Il n'y a donc rien à reprendre côté allemand : il faut le **rédiger**, et le
   faire relire par un germanophone du mouvement.

## Ce qu'il faut faire

1. ~~Récupérer le contenu des pages actuelles~~ — **fait**, depuis l'export de la base.
   Attention : cet export contient des messages et des fiches de contact de personnes réelles,
   ainsi que les bases d'autres sites. Il ne doit pas entrer dans le dépôt — voir
   [`../../_migrations/README.md`](../../_migrations/README.md).
2. Pour chaque image reprise : savoir qui l'a prise, et si des mineurs y sont reconnaissables
   (voir la règle photos dans [`../../CLAUDE.md`](../../CLAUDE.md)).
3. ~~Reporter le texte dans `src/content/pages/fr/`~~ — **fait**. À relire par une personne du
   mouvement : la conversion est automatique, elle peut avoir raté des mises en forme.
4. ~~Rédiger les jumelles allemandes~~ — **fait pour l'essentiel** : elles existaient déjà dans
   la base. Restent trois pages françaises sans jumelle (guides-aînées, Fribourg, l'accueil),
   quelques titres de section restés en français dans les pages allemandes, et les actualités,
   dont aucune n'est traduite.
5. Compléter la table des redirections pour toute adresse qui change.

## Ce que « terminé » veut dire

- Chaque page du menu a un contenu réel en français.
- Chaque adresse publique du site actuel mène quelque part sur le nouveau site.
- L'allemand est soit rédigé et relu, soit explicitement reporté par une décision écrite.
