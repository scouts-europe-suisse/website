---
name: state
description: État du chantier du site SES — ce qui est en place, ce qui ne l'est pas, et les décisions en attente.
metadata:
  type: project
---

# Où en est le chantier

**Mise à jour : 2026-09-13 (refonte visuelle v1 en ligne, fonctionnement par issues).**
Le détail vivant est dans les issues GitHub et dans
[`_plans/05-refonte-visuelle-atwork/PLAN.md`](../_plans/05-refonte-visuelle-atwork/PLAN.md) ;
cette note résume.

## Ce qui est en place

- **Le site** : Astro 5 + Tailwind v4, bilingue `/fr/` et `/de/`, 20 pages françaises, 18
  allemandes, 19 actualités. Le contenu vient de l'export du WordPress (2026-09-10) ; depuis,
  il n'est modifié que par des issues. `src/content/` fait foi.
- **La refonte visuelle v1** (2026-09-11, plan 05) : charte moderne, institutionnelle, sobre,
  décrite dans [design-system.md](design-system.md) ; logo construit sur la croix officielle
  des Scouts d'Europe ; pictogrammes de branche de l'AGSE ; accueil comme parcours pour un
  parent ; carte des implantations dessinée dans le site, organisée par districts, groupes et
  unités (`src/data/districts.ts`) ; photos Instagram sur l'accueil ; adresses e-mail et
  téléphones protégés des robots ; données structurées et image de partage par page.
- **Le fonctionnement à plusieurs** : issues GitHub étiquetées, une branche par issue, pull
  request vers `main`, plans dans `_plans/`, rituel de démarrage. Depuis le 2026-09-13, tout
  changement technique, de design ou de structure demande une confirmation dans la
  conversation ; le contenu seul, non ([feedback_confirmation_technique.md](feedback_confirmation_technique.md)).
- **La publication** : automatique à chaque fusion sur `main` et une fois par jour (photos
  Instagram rafraîchies), avec les garde-fous de `scripts/verifier-build.mjs`. `npm run deploy`
  en secours.
- **Le dépôt** : `scouts-europe-suisse/website`, **public**. Rien de personnel n'y entre ; les
  secrets Meta sont dans `.env` local et dans les secrets du dépôt.

## En ligne

**Aperçu public :** https://scouts-europe-suisse.github.io/website/ — marqué « ne pas
indexer ». Ce n'est **pas** le site officiel : `www.scouts-europe.ch` tourne toujours sous
WordPress. La bascule du domaine et l'hébergeur sont les issues #1 et #2 (plan 01).

## Ce qui n'est pas en place, ou attend quelqu'un

- **La relecture** de toutes les pages par des membres du mouvement, FR et DE (issue #7).
- **L'auteur du texte cité** de la page européenne (issue #8).
- **La gestion des contributeurs** : qui invite, avec quel rôle (issue #5).
- **Le gel du design** : la v1 est soumise aux autres ; les remarques arrivent en issues.
- **Les documents types** de la charte (circulaires, signatures) : hors site.
- Deux points à confirmer dans les implantations : un doublon de la liste des groupes
  (2e Lausanne) et la localité du groupe Riviera (Vevey).

## Décisions déjà prises

| Décision | Date | Où c'est écrit |
|---|---|---|
| Site statique (Astro) plutôt qu'un CMS ; **Claude tient le rôle du CMS** | 2026-09-10, 2026-09-11 | [cahier-des-charges.md](cahier-des-charges.md), plan 05 |
| Français par défaut, allemand en seconde langue, préfixe `/fr/` conservé | 2026-09-10 | [source-site.md](source-site.md) |
| Pas de `backloop.dev` en local | 2026-09-10 | [local-dev-and-deploy.md](local-dev-and-deploy.md) |
| Polices Cabin et Source Sans 3, hébergées sur place | 2026-09-10 | [design-system.md](design-system.md) |
| Rouge et jaune de la charte = ceux du SVG officiel de la croix | 2026-09-12 | [design-system.md](design-system.md) |
| Photos : celles de l'ancien site et des comptes Instagram et Facebook du mouvement ; aucune image générée par IA | 2026-09-10, 2026-09-11 | [feedback_publication.md](feedback_publication.md) |
| Issues GitHub, une branche par issue, publication automatique, chaque contributeur décide seul | 2026-09-11 | plan 05, [conventions.md](conventions.md) |
| Adresses françaises conservées, adresses allemandes en allemand | 2026-09-10 | [source-site.md](source-site.md) |
| L'export de la base reste hors du dépôt (données personnelles) | 2026-09-10 | [../_migrations/README.md](../_migrations/README.md) |
| Dépôt public (nécessaire pour GitHub Pages) | 2026-09-10 | [conventions.md](conventions.md) |
| Traductions allemandes acceptées par défaut pendant la refonte, marquées `translated: false` | 2026-09-11 | plan 05 |
| Siège : 1205 Genève, sans adresse de rue | 2026-09-13 | issue #36 |
| Contacts protégés des robots, jamais en clair | 2026-09-13 | [secrets-et-configuration.md](secrets-et-configuration.md) |

Voir aussi [[cahier-des-charges]], [[source-site]].
