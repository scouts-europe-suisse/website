---
name: conventions
description: Conventions de travail du dépôt — issues GitHub, une branche par issue, organisation des dossiers, public visé. Référencé depuis CLAUDE.md.
metadata:
  type: project
---

# Conventions du dépôt

## Public

Ce dépôt est utilisé par **plusieurs membres du SES, dont la plupart ne sont pas
développeurs.** Chaque échange doit être lisible par une personne non technique. Le jargon n'est
acceptable que si c'est l'utilisateur qui l'a introduit.

## Langue

Le chantier travaille **en français** : conversations, commits, plans, notes de `_memory/`.
Le *site*, lui, est bilingue français / allemand — c'est autre chose, voir
[source-site.md](source-site.md).

## Issues, branches, pull requests

Depuis le 2026-09-11 (plan 05), **tout changement du site part d'une issue GitHub** : un texte,
une image, une page, un bug, une remarque, une décision. Les issues portent des étiquettes en six
familles (`type:`, `zone:`, `langue:`, `priorité:`, `état:`, `plan:`), posées sur le dépôt. Les
modèles sont dans `.github/ISSUE_TEMPLATE/`. Le détail du cycle est dans
[`../CLAUDE.md`](../CLAUDE.md), section « Travailler par issues ».

- `main` — la référence commune, toujours publiable. Pas de commit direct, sauf `_plans/`.
- `issue/NN-mot-clef` — une branche par issue, créée depuis `main`, fusionnée par pull request
  en squash, puis supprimée. `lot/NN-NN-mot-clef` pour un groupe d'issues semblables.
- `work/<identifiant>` — branche d'exploration personnelle, facultative. Rien n'en part vers
  `main` sans issue ni pull request.
- `gh-pages` — le site publié, écrit par le script de publication (bientôt par GitHub Actions,
  issue #4). On n'y travaille jamais à la main.
- `origin` — `https://github.com/scouts-europe-suisse/website`, **public**.

### Qui décide

Chaque contributeur, **individuellement**. Une seule personne suffit pour qualifier une issue,
la faire, la tester, la fusionner, publier, ou trancher une décision. Il n'y a pas de
collégialité (décision de Nicolas, 2026-09-11). Les décisions s'écrivent dans l'issue,
commentaire « Décision : … » signé, puis dans le plan.

### Plans et issues

Les deux cohabitent et doivent rester cohérents : chaque issue porte `plan: NN`, chaque plan
liste ses issues dans une section « Issues » que Claude tient à jour.

### Dépôt distant

Le dépôt est **public** depuis le 2026-09-10 (nécessaire pour GitHub Pages). Conséquences :

- le travail est sauvegardé ailleurs que sur la machine de la personne qui l'a fait ;
- « à jour » veut dire « à jour par rapport à `origin/main` » : au démarrage de session, on fait
  un `git fetch` avant de comparer ;
- les branches d'issue sont poussées dès le premier commit, ce qui rend visible qui travaille
  sur quoi ;
- **tout ce qui entre dans un commit y reste, même supprimé ensuite.** Ne jamais y mettre de
  mot de passe, de clé, ni de donnée personnelle de membre.

## Organisation des dossiers

```
website/
├── CLAUDE.md            Point d'entrée (lu en premier par Claude)
├── README.md            Lisez-moi humain
├── _plans/              Plans numérotés (voir _plans/README.md)
├── _memory/             Règles, conventions, état (ce dossier)
├── _references/         Documents reçus du SES (cahier des charges…)
├── _migrations/         Ce qu'on récupère du WordPress actuel
├── .github/             Modèles d'issue et de pull request
├── public/              Servi tel quel : favicons, polices, images
├── src/                 Le site (Astro 5 + Tailwind v4)
└── _build/              Résultat de la construction (ignoré par git)
```

Le préfixe `_` marque les dossiers de chantier : ils restent pendant toute la vie du projet.

## Les identifiants ne sont jamais dans le dépôt

Le dépôt est **public**. Mots de passe, clés, exports de base : rien de tout cela n'y entre, et
l'historique garde ce qu'on y met même après suppression.

- `_temp/` est ignoré par git. C'est là que vivent les accès (par exemple ceux du serveur de
  l'ancien site). Ne jamais déplacer un de ces fichiers ailleurs.
- L'export de la base de l'ancien site reste dans le dossier de téléchargement de la personne
  qui l'a reçu, jamais ici : il contient des messages et des fiches de contact de personnes
  réelles.
- L'accès au serveur de l'ancien site se fait **par clé SSH**, pas par mot de passe. La clé est
  posée ; il n'y a rien à retaper.

## Style de communication

- Français courant d'abord ; commandes et code seulement quand c'est nécessaire.
- « Je récupère les dernières modifications » : oui. « Je rebase sur main » : non.
- Une question à la fois quand il y a un vrai choix.
- Exposer les compromis honnêtement.

## Ce que Claude fait toujours automatiquement

- Le rituel de démarrage ([feedback_rituel_demarrage.md](feedback_rituel_demarrage.md)),
  issues comprises.
- Créer l'issue quand l'utilisateur demande un changement sans en avoir ouvert une.
- Créer la branche, la pull request, poser les étiquettes, mettre à jour la section « Issues »
  du plan.
- Lancer le serveur local en tâche de fond et ouvrir le navigateur, quand on lui demande à voir
  le site.

## Ce que Claude ne fait jamais sans demande explicite

- Commiter sur `main` (sauf un changement qui ne touche que `_plans/`).
- Réécrire l'historique de `main`.
- Modifier la branche de quelqu'un d'autre.
- Fusionner une pull request dont la liste de vérification n'est pas déroulée.
- Toucher à `src/styles/`, `src/layouts/` ou `src/components/` après le gel du design sans
  issue `type: charte` et accord écrit.
- Mettre le site en ligne hors du cycle des issues — voir
  [feedback_publication.md](feedback_publication.md).
