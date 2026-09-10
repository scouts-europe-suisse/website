# Plan 03 — Reprendre le contenu du site WordPress actuel

**Statut :** ouvert
**Responsable :** à définir
**Date :** 2026-09-10
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

1. Récupérer le contenu des pages actuelles dans `_migrations/`, ainsi que les images.
2. Pour chaque image reprise : savoir qui l'a prise, et si des mineurs y sont reconnaissables
   (voir la règle photos dans [`../../CLAUDE.md`](../../CLAUDE.md)).
3. Réécrire ou reporter le texte dans `src/content/pages/fr/`.
4. Rédiger les jumelles allemandes, marquées `translated: false` tant qu'elles ne sont pas
   relues.
5. Compléter la table des redirections pour toute adresse qui change.

## Ce que « terminé » veut dire

- Chaque page du menu a un contenu réel en français.
- Chaque adresse publique du site actuel mène quelque part sur le nouveau site.
- L'allemand est soit rédigé et relu, soit explicitement reporté par une décision écrite.
