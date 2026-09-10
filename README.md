# Site du Scoutisme Européen Suisse

Le nouveau site public du SES, appelé à remplacer le WordPress actuel de
[www.scouts-europe.ch](https://www.scouts-europe.ch/fr/).

**Aperçu en ligne : https://scouts-europe-suisse.github.io/website/**

**Si vous venez d'arriver ici : ouvrez Claude Code dans ce dossier et dites-lui ce que vous
voulez faire, en français.** Tout ce qui suit, il le fera pour vous.

---

## ⚠ Ce dépôt est public

Tout ce qui entre ici est visible par n'importe qui, tout de suite, et **l'historique garde ce
qu'on y a mis même après suppression**. Donc, jamais dans ce dossier :

- des messages reçus par le formulaire de contact, des listes de membres, des adresses privées ;
- un export de base de données ;
- une photo dont l'autorisation n'est pas acquise (voir plus bas).

En cas de doute : ne pas commiter, demander.

---

## Voir le site sur votre ordinateur

```bash
npm install     # la première fois seulement
npm run dev     # puis ouvrez http://localhost:4321
```

La page se recharge toute seule à chaque modification.

**Une exception :** la recherche ne fonctionne pas avec `npm run dev`, parce que son index est
fabriqué au moment de la construction. Pour l'essayer :

```bash
npm run build && npm run preview
```

## Mettre l'aperçu à jour

```bash
npm run deploy
```

Cela publie sur https://scouts-europe-suisse.github.io/website/ — **l'aperçu, pas le site
officiel.** `www.scouts-europe.ch` continue de tourner sous WordPress et n'est pas touché. La
bascule du vrai domaine reste à décider.

---

## Comment c'est organisé

| Dossier | Contenu |
|---|---|
| `src/content/` | **Le texte des pages.** C'est ici qu'on écrit. Un fichier = une page. |
| `src/pages/`, `src/components/` | Les gabarits qui transforment ces fichiers en pages du site. |
| `src/styles/` | Les couleurs et les polices. |
| `public/` | Servi tel quel : logo, favicon, images, polices. |
| `_plans/` | Les travaux en cours ou à faire. Voir [`_plans/README.md`](_plans/README.md). |
| `_memory/` | Les règles et l'état du chantier. Voir [`_memory/MEMORY.md`](_memory/MEMORY.md). |
| `_references/` | Les documents reçus du SES, dont le cahier des charges. |
| `_migrations/` | La **carte** de l'ancien site : table des adresses, inventaire des images. Pas les fichiers d'origine. |

`CLAUDE.md` est le mode d'emploi destiné à Claude. Pas besoin de le lire pour travailler ici.

---

## Les photos

**Aucune photo n'est mise en ligne sans autorisation.** Les photos qui étaient publiées sur
l'ancien site sont couvertes (confirmé par Perki le 2026-09-10) ; **une photo qui n'a jamais été
en ligne ne l'est pas** et demande sa propre vérification. Ça vaut en particulier pour toute
photo où un enfant est reconnaissable.

L'état de chaque image est écrit dans
[`_migrations/images/README.md`](_migrations/images/README.md).

---

## Où en est le chantier

**Le contenu de l'ancien site est repris** : 19 pages françaises, 17 allemandes, 19 actualités,
avec leurs images et leurs légendes. Les adresses françaises sont conservées à l'identique, et
les 162 adresses du site ont été vérifiées une par une en ligne.

**Bonne surprise :** l'allemand existait déjà, rédigé à la main, mais le site actuel ne le
servait pas — `/de/` renvoie la page française. Il n'était pas à écrire, il était à remettre en
service.

**Ce qui reste** est du contenu et des décisions, plus de la technique : compléter l'allemand
(deux pages sans jumelle, aucune actualité traduite), faire relire les pages par une personne du
mouvement, et construire la carte des implantations. C'est le
[plan 04](_plans/04-contenu-et-relecture-paused/PLAN.md).

**La charte graphique** reste à venir : le site reprend pour l'instant l'identité actuelle du
mouvement — [plan 02](_plans/02-charte-graphique-later/PLAN.md).

Détail complet : [`_memory/state.md`](_memory/state.md).
