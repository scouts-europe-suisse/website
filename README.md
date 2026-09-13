# Site du Scoutisme Européen Suisse

Le nouveau site public du SES, appelé à remplacer le WordPress actuel de
[www.scouts-europe.ch](https://www.scouts-europe.ch/fr/).

**Aperçu en ligne : https://scouts-europe-suisse.github.io/website/** — bilingue, français
et allemand (« Schweizerische Pfadfinderschaft Europas »). C'est un aperçu de préparation,
invisible des moteurs de recherche ; le site officiel n'est pas touché tant que la bascule du
domaine n'est pas décidée.

**Si vous venez d'arriver ici : ouvrez Claude Code dans ce dossier et dites-lui ce que vous
voulez faire, en français.** Il n'y a pas de CMS : Claude tient ce rôle. Tout ce qui suit, il
le fait pour vous.

**Rien d'installé encore ?** → [`DEMARRER.md`](DEMARRER.md), vingt minutes, une seule fois.

---

## Comment on travaille ici

**Tout changement passe par une issue GitHub**, une par sujet : un texte à corriger, une
photo à ajouter, une actualité, une remarque visuelle, un bug, une décision à prendre. Des
modèles sont proposés au bouton « New issue » ; ils posent les étiquettes tout seuls. Vous
pouvez aussi simplement dire à Claude ce que vous voulez : il crée l'issue pour vous.

Le cycle d'une issue, que Claude déroule à votre place :

1. **Créer et qualifier** : étiquettes `type:`, `zone:`, `langue:`, `priorité:`, `état:`, `plan:`.
2. **Faire**, sur une branche propre à l'issue, en petits commits.
3. **Tester** : le site se construit, la page est vue en français et en allemand, sur
   ordinateur et sur téléphone, sans lien mort ni image manquante, sans photo non autorisée
   ni fait inventé. C'est la liste de la pull request.
4. **Fusionner** dans `main` : l'issue se ferme, et **la publication part toute seule**.

**Deux règles depuis le 13 septembre 2026 :**

- **Contenu ou technique ?** Modifier ou ajouter un texte, une image, une actualité, une
  traduction : Claude le fait sans redemander. Toucher à la technique, au design ou à la
  structure du site : Claude dit ce qu'il va changer et attend votre confirmation dans la
  conversation.
- **Les traductions allemandes** faites par Claude sont acceptées ; toute correction se fait
  par une issue « Contenu », comme pour le français.

Les issues et les plans de [`_plans/`](_plans/) cohabitent : un plan dit le pourquoi et le
cap, une issue dit une action. Le plan en cours est
[`_plans/05-refonte-visuelle-atwork/PLAN.md`](_plans/05-refonte-visuelle-atwork/PLAN.md).

## Les membres

- **Qui peut contribuer :** tous les membres de l'organisation GitHub
  [`scouts-europe-suisse`](https://github.com/scouts-europe-suisse). Chacun a tous les
  droits, individuellement : créer, faire, tester, fusionner, publier, trancher une décision.
  Une seule personne suffit ; il n'y a pas de collégialité.
- **Ajouter quelqu'un :** un propriétaire de l'organisation (aujourd'hui francoisbe92 et
  perki) l'invite dans l'organisation, avec le droit d'écriture sur ce dépôt. La personne
  suit [`DEMARRER.md`](DEMARRER.md), puis Claude prend la main.
- **Retirer quelqu'un :** le propriétaire le retire de l'organisation ; ses branches non
  fusionnées sont fermées par une issue.
- **La liste vivante** est celle de l'organisation GitHub, jamais recopiée ici.
- **Les réglages sensibles** (secrets de l'application Meta pour Instagram, variables du
  workflow) sont dans les paramètres du dépôt, posés par un propriétaire. Sur un poste, ils
  vivent dans un fichier `.env` qui n'entre jamais dans le dépôt
  ([`_memory/secrets-et-configuration.md`](_memory/secrets-et-configuration.md)).

Si des rôles différents deviennent utiles un jour (contenu seulement, par exemple), ce sera
une décision écrite dans une issue.

---

## ⚠ Ce dépôt est public

Tout ce qui entre ici est visible par n'importe qui, tout de suite, et **l'historique garde ce
qu'on y a mis même après suppression**. Donc, jamais dans ce dossier :

- des messages reçus, des listes de membres, des adresses privées ;
- un export de base de données, un mot de passe, une clé, un jeton ;
- une photo dont l'autorisation n'est pas acquise (voir plus bas).

En cas de doute : ne pas commiter, demander. Les adresses e-mail et numéros de téléphone qui
figurent sur le site sont protégés des robots automatiquement : écrivez-les normalement dans
les textes, la construction s'occupe du reste.

---

## Voir le site sur votre ordinateur

```bash
npm install     # la première fois seulement
npm run dev     # puis ouvrez http://localhost:4321
```

La page se recharge toute seule à chaque modification. **Une exception :** la recherche ne
fonctionne pas avec `npm run dev`, parce que son index est fabriqué à la construction :

```bash
npm run build && npm run preview
```

## La publication

**Automatique.** À chaque fusion sur `main`, une fois par jour, et à la demande depuis
l'onglet Actions, un workflow rafraîchit les photos Instagram, fabrique les images de
partage, construit le site, vérifie les garde-fous (préfixe des adresses, « ne pas indexer »,
contacts protégés) et publie sur https://scouts-europe-suisse.github.io/website/. Compter deux
à trois minutes. En secours, depuis un poste : `npm run deploy`.

**Le site officiel du mouvement n'est pas touché.** `www.scouts-europe.ch` tourne toujours
sous WordPress. La bascule du domaine et le choix de l'hébergeur sont les issues #1 et #2,
ouvertes jusqu'à la mise en production.

---

## Comment c'est organisé

| Dossier | Contenu |
|---|---|
| `src/content/` | **Le texte des pages et des actualités**, en `fr/` et `de/`, même nom de fichier des deux côtés. Un fichier = une page. Mode d'emploi : [`_memory/ecrire-une-page.md`](_memory/ecrire-une-page.md). |
| `src/data/` | Les données : menu et réglages (`site.ts`), **districts, groupes et unités** (`districts.ts`), pictogrammes de branche, photos Instagram, géométrie de la Suisse. |
| `src/pages/`, `src/components/`, `src/layouts/` | Les gabarits qui transforment tout cela en pages. |
| `src/styles/` | La charte : couleurs, polices, espacements ([`_memory/design-system.md`](_memory/design-system.md)). |
| `public/` | Servi tel quel : logos, favicons, polices, images, images de partage. |
| `scripts/` | Les outils : publication, garde-fous, photos Instagram, images de partage, jeton Meta. |
| `.github/` | Modèles d'issue et de pull request, workflow de publication. |
| `_plans/` | Les plans, vivants à la racine, terminés dans `_archives/`. Voir [`_plans/README.md`](_plans/README.md). |
| `_memory/` | Les règles et l'état du chantier. Voir [`_memory/MEMORY.md`](_memory/MEMORY.md). |
| `_references/` | Les documents reçus du SES, dont le cahier des charges SES25. |
| `_migrations/` | La carte de l'ancien site : table des adresses, inventaire des images. |

`CLAUDE.md` est le mode d'emploi destiné à Claude. Pas besoin de le lire pour travailler ici.

---

## Les photos

**Aucune photo n'est mise en ligne sans autorisation.** Sont utilisables : les photos qui
étaient publiées sur l'ancien site (confirmé par Perki le 10 septembre 2026) et celles des
comptes Instagram et Facebook du mouvement (décision du 11 septembre 2026). Une photo qui n'a
jamais été publiée demande sa propre vérification, en particulier si un enfant est
reconnaissable. Aucune image générée par IA.

---

## Où en est le chantier

**Le site est refait de fond en comble** (plan 05, septembre 2026) et en ligne en aperçu :

- une charte moderne, institutionnelle et sobre, avec le logo construit sur la croix
  officielle des Scouts d'Europe, les pictogrammes de branche de l'AGSE, et un logo allemand ;
- un accueil pensé comme un parcours pour un parent, les trois branches, une carte de la
  Suisse dessinée dans le site avec les districts, les groupes, les clans et les feux, les
  dernières photos Instagram, les actualités, l'appel à devenir chef ;
- tout le contenu repris de l'ancien site, corrigé, mis en forme et complété avec des sources
  Scouts d'Europe, entièrement bilingue, adresses françaises conservées et redirigées ;
- un référencement prêt pour le jour de la bascule : données structurées, image de partage par
  page, sitemap, hreflang, contacts protégés.

**Ce qui reste :** la relecture par les membres, dont les remarques arrivent en issues ; le
gel du design une fois la version validée ; puis la bascule du domaine (issues #1 et #2).

Détail : [`_memory/state.md`](_memory/state.md) et les issues du dépôt.
