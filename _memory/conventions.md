---
name: conventions
description: Conventions de travail du dépôt — une branche par personne, organisation des dossiers, public visé. Référencé depuis CLAUDE.md.
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

## Branches

- `main` — la référence commune. Pas de commit direct.
- `work/<identifiant>` — une branche par personne, nommée d'après son nom de session machine
  (`whoami`). Exemple : `work/perki`.
- `origin` — le dépôt distant : `git@github.com:scouts-europe-suisse/website.git`, **privé**.

### Pourquoi une branche par personne

La plupart des utilisateurs ne penseront pas à créer une branche avant de modifier quelque chose.
Les mettre d'office sur leur propre branche :

- évite que deux personnes se marchent dessus ;
- rend « qui a changé quoi » lisible depuis `git log work/<personne>` ;
- donne une unité naturelle pour « reprends le travail d'untel » (fusionner sa branche).

### Dépôt distant

`git@github.com:scouts-europe-suisse/website.git`, sur le compte GitHub du mouvement, **en
privé** (ajouté le 2026-09-10). Conséquences pratiques :

- le travail est sauvegardé ailleurs que sur la machine de la personne qui l'a fait ;
- « à jour » veut dire « à jour par rapport à `origin/main` » : au démarrage de session, on fait
  un `git fetch` avant de comparer ;
- chaque branche `work/<identifiant>` est poussée, ce qui rend visible aux autres qui travaille
  sur quoi — c'est ce qui fait fonctionner l'étape 3 du rituel de démarrage ;
- **privé ne veut pas dire secret** : toute personne ajoutée au dépôt voit tout, y compris
  l'historique. Ce qui entre dans un commit y reste, même supprimé ensuite. Ne jamais y mettre de
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
├── public/              Servi tel quel : favicon, robots.txt, images
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

- Le rituel de démarrage ([feedback_rituel_demarrage.md](feedback_rituel_demarrage.md)).
- Garder `work/<identifiant>` à jour par rapport à `main`.
- Lancer le serveur local en tâche de fond et ouvrir le navigateur, quand on lui demande à voir
  le site.

## Ce que Claude ne fait jamais sans demande explicite

- Commiter sur `main` (sauf un changement qui ne touche que `_plans/`).
- Réécrire l'historique de `main`.
- Modifier la branche `work/...` de quelqu'un d'autre.
- Mettre le site en ligne — voir [feedback_pas_de_publication.md](feedback_publication.md).
