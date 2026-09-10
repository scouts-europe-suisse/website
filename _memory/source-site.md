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

## L'allemand existe — mais le site ne le sert pas

**Corrigé le 2026-09-10, après lecture de la base de données.**

En regardant le site, on conclut que l'allemand n'existe pas :
`https://www.scouts-europe.ch/de/` renvoie **exactement la même page que `/fr/`**, à l'octet
près, sur toutes les pages testées.

C'est faux. La base contient **19 pages allemandes, écrites à la main**, dont la dernière
modification date de décembre 2025. Elles sont simplement **inaccessibles** : le mécanisme de
langue du WordPress est cassé ou mal configuré, et sert le français quelle que soit l'adresse
demandée. Personne ne peut donc lire l'allemand du SES aujourd'hui, alors qu'il a été rédigé.

C'est la meilleure nouvelle du chantier : le site bilingue n'est pas à écrire, il est à
**remettre en service**. Ces 19 pages sont reprises telles quelles dans `src/content/pages/de/`.

**Ce qui manque encore côté allemand** (à faire relire par un germanophone, sans rien inventer) :

- **Trois pages françaises n'ont pas de jumelle** : `branche-rouge/guides-ainees`,
  `nous-rejoindre/nos-implantations/fribourg`, et la page d'accueil.
- **Quelques titres de section sont restés en français** dans les pages allemandes — par exemple
  « Le louvetisme » au milieu de la page des Wölflinge. C'est dans la source, ce n'est pas une
  erreur de reprise.
- **Aucune actualité n'est traduite.** Les trois qui portaient un titre allemand
  (Leitertag 2015, Nationales Treffen 2013, Nationales Wölflingstreffen 2015) sont des coquilles
  vides dans la base : titre seul, aucun texte.

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

## Les adresses allemandes

Les pages allemandes n'ayant jamais été accessibles, **aucune adresse allemande n'est à
préserver** : rien n'y pointe, rien n'est indexé. Le nouveau site leur donne donc de vraies
adresses allemandes (`/de/woelflingsstufe/` et non `/de/branche-jaune/`), là où les adresses
françaises, elles, sont reprises à l'identique.

## Deux autres sites dans la même base

La base de l'hébergeur contient plusieurs installations WordPress. Deux pièges :

- Un **WordPress plus ancien** contient un tout autre site : communauté d'aînés, Heure Route /
  Moment Lumière, fiches de formation, Eurojam 2014, Fatima. C'est vraisemblablement le « site
  des aînés » que le cahier des charges cite parmi les tentatives précédentes. **Il n'a rien à
  voir avec le site public** et n'est pas repris. Beaucoup de ses pages sont d'ailleurs en accès
  privé.
- Une **sauvegarde de 2016** du site public. Ne pas la confondre avec le site vivant : c'est la
  date de dernière modification qui les départage.

## Ce qui n'est pas encore relevé

- Les auteurs des images (voir [`../_migrations/images/README.md`](../_migrations/images/README.md)).
- Les pages d'événements anciens (Eurojam 2014, JMJ 2016, Fatima) : reprises ou non, à décider.

Voir aussi [[cahier-des-charges]], [[state]].
