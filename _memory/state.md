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
- **Les variables d'habillage** sont rassemblées dans `src/styles/global.css`, en attendant la
  charte graphique.
- **Le fonctionnement à plusieurs** : une branche par personne, des plans dans `_plans/`, un
  rituel de démarrage de session.

## Ce qui n'est pas en place — volontairement

- **Le contenu.** Les pages sont des ébauches, marquées `draft: true`. Aucun texte n'a été
  inventé : reprendre celui du site actuel est l'objet du
  [plan 03](../_plans/03-migration-contenu-wordpress/PLAN.md).
- **L'allemand.** Les pages `de/` existent pour que le squelette bilingue tienne debout, mais
  elles sont vides et marquées `translated: false`.
- **L'habillage définitif.** En attente de la charte —
  [plan 02](../_plans/02-charte-graphique/PLAN.md).
- **La mise en ligne.** Pas d'hébergeur choisi, donc pas de script de publication —
  [plan 01](../_plans/01-hebergement-et-mise-en-ligne/PLAN.md).
- **Le dépôt distant.** Tout est local. Il n'y a pas de sauvegarde hors de cette machine.

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
| Polices système, pas de Google Fonts | 2026-09-10 | [design-system.md](design-system.md) |
| Une branche par personne, `_plans/` directement sur `main` | 2026-09-10 | [conventions.md](conventions.md) |

Voir aussi [[cahier-des-charges]], [[source-site]].
