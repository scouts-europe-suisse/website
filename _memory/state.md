---
name: state
description: État du chantier du site SES — ce qui est en place, ce qui ne l'est pas, et les décisions en attente.
metadata:
  type: project
---

# Où en est le chantier

**Mise à jour : 2026-09-10 (ouverture du chantier).**

## Ce qui est en place

- **Le squelette du site** : Astro 5 + Tailwind v4, bilingue `/fr/` et `/de/`, avec toutes les
  pages du menu actuel créées et reliées. Le site se construit et s'affiche.
- **L'arborescence** reprend celle du site actuel, elle-même proche de celle proposée par le
  cahier des charges. Les adresses des pages sont conservées à l'identique, sauf les artefacts
  WordPress (voir [source-site.md](source-site.md)).
- **L'habillage reprend l'identité actuelle** : logo et écussons de branche du site WordPress,
  couleurs prélevées dans le logo, polices Open Sans et Droid Sans hébergées sur place.
  Tout est en variables dans `src/styles/global.css`, remplaçable en un fichier quand la
  charte arrivera.
- **Le fonctionnement à plusieurs** : une branche par personne, des plans dans `_plans/`, un
  rituel de démarrage de session.
- **Le dépôt distant** : `scouts-europe-suisse/website` sur GitHub, en privé. `main` et
  `work/perki` y sont poussées.

- **Le contenu est repris** (2026-09-10) : 19 pages françaises, 17 pages allemandes et
  19 actualités, tirées de l'export de la base du WordPress actuel. Aucun texte n'a été
  réécrit ni traduit automatiquement.
- **Le bilinguisme fonctionne vraiment** : l'allemand existait, écrit à la main, mais le site
  actuel ne le servait pas. Chaque page a son adresse dans sa langue
  (`/fr/branche-jaune/` ↔ `/de/woelflingsstufe/`), les deux étant reliées par une clé.

## En ligne

**Aperçu public :** https://scouts-europe-suisse.github.io/website/ — `npm run deploy`.
Ce n'est **pas** le site officiel : `www.scouts-europe.ch` tourne toujours sous WordPress.
Le site sait être servi à la racine d'un domaine comme depuis un sous-dossier ; la bascule du
vrai domaine reste à décider ([plan 01](../_plans/01-hebergement-et-mise-en-ligne-later/PLAN.md)).

**Le dépôt est public.** Rien de personnel n'y entre, et l'historique garde ce qu'on y met même
après suppression.

## Ce qui n'est pas en place

- **L'allemand est incomplet** : deux pages françaises sans jumelle (guides-aînées, Fribourg),
  quelques titres de section restés en français dans les pages allemandes, aucune actualité
  traduite.
- **Personne du mouvement n'a relu** les pages. La conversion était automatique.
- **La carte des implantations** est à construire : la page est vide sur l'ancien site, il n'y
  avait rien à migrer.
- **L'habillage définitif.** L'identité actuelle est en place — logo, couleurs prélevées dans le
  logo, polices du site actuel — mais c'est justement ce que la charte doit revoir
  ([plan 02](../_plans/02-charte-graphique-later/PLAN.md)). Manque l'image de partage
  (`og-image.png`).
- **Deux détails de contenu** : le visuel ESPAS est un PDF, qui ne peut pas s'afficher dans une
  page ; et le texte cité de la page européenne attend l'identification de son auteur.

## Ce qui est demandé mais pas encore commencé

- **La carte interactive des implantations** (cahier des charges, point 3). Question ouverte :
  quel fond de carte, et à quelles conditions de protection des données.
- **Les publications des réseaux sociaux** mises en avant sur le site (point 5). Même question.
- Les modèles de documents (circulaires, signatures d'e-mail) — hors site, mais partie du même
  chantier de charte.

## Décisions déjà prises

| Décision | Date | Où c'est écrit |
|---|---|---|
| Site statique (Astro) plutôt qu'un CMS type WordPress | 2026-09-10 | [cahier-des-charges.md](cahier-des-charges.md) |
| Français par défaut, allemand en seconde langue, préfixe `/fr/` conservé | 2026-09-10 | [source-site.md](source-site.md) |
| Pas de `backloop.dev` en local — `http://localhost` simple | 2026-09-10 | [local-dev-and-deploy.md](local-dev-and-deploy.md) |
| Polices du site actuel (Open Sans, Droid Sans), hébergées sur place plutôt que chez Google | 2026-09-10 | [design-system.md](design-system.md) |
| Couleurs prélevées dans le logo plutôt qu'approchées à l'œil | 2026-09-10 | [design-system.md](design-system.md) |
| Les trois photos où des mineurs sont reconnaissables ne sont pas reprises sans vérification des autorisations | 2026-09-10 | [../_migrations/images/README.md](../_migrations/images/README.md) |
| Une branche par personne, `_plans/` directement sur `main` | 2026-09-10 | [conventions.md](conventions.md) |
| Adresses françaises conservées, adresses allemandes en allemand | 2026-09-10 | [source-site.md](source-site.md) |
| L'export de la base reste hors du dépôt (données personnelles) | 2026-09-10 | [../_migrations/README.md](../_migrations/README.md) |
| Dépôt distant privé sur le GitHub du mouvement | 2026-09-10 | [conventions.md](conventions.md) |

Voir aussi [[cahier-des-charges]], [[source-site]].
