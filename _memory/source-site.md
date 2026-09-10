---
name: source-site
description: Ce que contient le site WordPress actuel scouts-europe.ch — arborescence, adresses des pages, et le fait que la version allemande n'existe pas.
metadata:
  type: reference
---

# Le site actuel — ce qu'il contient

**Relevé du 2026-09-10** depuis [www.scouts-europe.ch](https://www.scouts-europe.ch/fr/).

- **Plateforme :** WordPress 6.9.7.
- **Langues :** `/fr/` et `/de/` — mais voir plus bas, l'allemand n'est pas traduit.
- **Contact institutionnel :** Rue Prévost-Martin 10, 1205 Genève — `info@scouts-europe.ch`.

## L'allemand n'existe pas

`https://www.scouts-europe.ch/de/` renvoie **exactement la même page que `/fr/`** : mêmes menus
en français, même contenu, même taille d'octets. Le sélecteur de langue existe, la traduction
non.

Conséquence pour le chantier : il n'y a **rien à reprendre** côté allemand. Tout est à rédiger,
puis à faire relire par un germanophone du mouvement. Voir
[feedback_faits_du_mouvement.md](feedback_faits_du_mouvement.md).

## Le menu actuel

| Entrée de menu | Adresse actuelle |
|---|---|
| Accueil | `/fr/` |
| Notre scoutisme | `/fr/notre-scoutisme/` |
| — Qui sommes-nous ? | `/fr/notre-scoutisme/qui-sommes-nous/` |
| — Que faisons-nous ? | `/fr/notre-scoutisme/scoutisme/` |
| — Louveteaux et louvettes | `/fr/branche-jaune/` |
| — Éclaireurs et éclaireuses | `/fr/branche-verte/` |
| — Routiers et guides-aînées | `/fr/branche-rouge/` |
| — La dimension européenne | `/fr/notre-scoutisme/europeen/` |
| — Un mouvement suisse | `/fr/notre-scoutisme/suisse/` |
| Le mouvement | `/fr/mouvement/` |
| — Formation des chefs | `/fr/mouvement/formation-des-chefs/` |
| — Encadrement | `/fr/mouvement/encadrement/` |
| ESPAS | `/fr/espas/` |
| Actualités | `/fr/category/actualites/` |
| Nous rejoindre | `/fr/nous-rejoindre/` |
| — Nos implantations & contacts locaux | `/fr/nous-rejoindre/nos-implantations/` |
| — Devenir chef | `/fr/nous-rejoindre/devenir-chef/` |
| Économat Carrick | `/fr/economat-carrick/` |
| Contact | `/fr/contact/` |

## Ce qui change d'adresse sur le nouveau site

Les adresses sont **reprises telles quelles** partout où c'est possible, pour ne pas casser les
liens existants ni perdre le référencement. Deux exceptions, propres à WordPress :

| Ancienne adresse | Nouvelle | Pourquoi |
|---|---|---|
| `/fr/category/actualites/` | `/fr/actualites/` | `category/` est un artefact WordPress, sans intérêt pour un lecteur |
| `/fr/author/…`, `/fr/feed/`, `/fr/comments/feed/` | — | pages techniques WordPress, sans équivalent |

Le flux RSS des actualités est conservé, à `/fr/actualites/rss.xml`.

Chaque changement d'adresse doit recevoir une **redirection** dans `astro.config.mjs`, pour que
les anciens liens continuent de fonctionner. C'est l'objet du
[plan 03](../_plans/03-migration-contenu-wordpress/PLAN.md).

## Ce qui n'est pas encore relevé

- L'inventaire des images du site actuel, et leurs auteurs.
- Le contenu texte des pages (à récupérer dans `_migrations/`).
- Les pages qui n'apparaissent pas dans le menu (il y en a presque toujours).

Voir aussi [[cahier-des-charges]], [[state]].
