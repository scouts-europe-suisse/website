# Plan 00 — Reprendre le site actuel : contenu, images, adresses

**Session:** perkim5 /Users/perki/code/scouts/website
**Responsable :** Perki
**Date :** 2026-09-10
**Demandé par :** Perki
**Portée :** `src/content/`, `public/images/`, `astro.config.mjs`, `_migrations/`

## De quoi il s'agit

Faire passer le contenu de [www.scouts-europe.ch](https://www.scouts-europe.ch/fr/), aujourd'hui
sous WordPress, vers le nouveau site : le texte, les images, et — le point le plus facile à
oublier — **les adresses des pages**, sans lesquelles les liens existants et la place du site
dans les moteurs de recherche sont perdus.

Ce plan remplace le plan 03, dont il reprend le contenu et les acquis.

## La reprise est terminée — `src/content/` fait foi

**Directive, 2026-09-10 : on ne relance plus de reprise depuis la base.** Le texte du site vit
désormais dans `src/content/`, et c'est lui la référence. Toute correction se fait là, à la main.
Relancer les scripts écraserait ce que des humains auront relu et corrigé.

Les scripts de reprise restent dans `_migrations/outils/` à titre de trace, plus d'outil de
travail — sauf `comparer-contenu.py`, qui sert au contrôle avant la bascule.

## Comment ça a été fait

**La source.** Tout est parti de l'export de la base fourni par l'hébergeur, pas des pages
affichées. C'est ce qui a permis de trouver ce qui suit.

**L'allemand existait déjà.** Le site actuel sert la page française sur `/de/`, à l'octet près :
en le regardant, on conclut que l'allemand n'a jamais été écrit. C'est faux. La base contient
**19 pages allemandes rédigées à la main**, modifiées jusqu'en décembre 2025, simplement
inaccessibles. Le bilingue n'était pas à écrire, il était à remettre en service.

**Repris :** 19 pages FR, 17 pages DE, 19 actualités. Rien n'a été réécrit, rien n'a été traduit
automatiquement.

**Les adresses.** Les adresses françaises sont conservées à l'identique. Les allemandes
deviennent de vraies adresses allemandes (`/de/woelflingsstufe/`), puisque les anciennes n'ont
jamais été accessibles et que rien ne pointe dessus. **78 anciennes adresses sont cartographiées**
dans [`../../_migrations/url-map.md`](../../_migrations/url-map.md) et redirigées depuis
`astro.config.mjs`.

**L'habillage.** Logo, écussons de branche, couleurs prélevées dans le logo, polices du site
actuel hébergées sur place.

## Ce qui reste

### 1. Les images du corps des pages

**48 emplacements en attente** d'une vérification des autorisations parentales : ces images
montrent des mineurs reconnaissables. Chaque page porte un commentaire à l'endroit exact où
l'image doit revenir — chercher `image à replacer` dans `src/content/` (27 fichiers).

C'est **la seule chose qui débloque le plus de pages d'un coup** : une réponse de l'ETN Photo
suffit à décider de 48 emplacements.

**Toutes les images sont désormais récupérées**, par SSH depuis le serveur. **Neuf sont
publiées** : celles où aucun visage n'est identifiable, ou qui ne montrent personne. Le tri s'est
fait sur des recadrages à 100 %, parce qu'une silhouette minuscule en vignette redevient un
visage reconnaissable à pleine résolution.

Voir [`../../_migrations/images/README.md`](../../_migrations/images/README.md).

### 2. Deux documents

Récupérés, publiés ni l'un ni l'autre : **aucune page du site actuel ne les cite.**

- `SES16_Fiche-LAS-Liaison-Autorisation-Sante-Aout-2016.xls` — fiche santé, version de 2016 ;
  probablement périmée, à confirmer avant de la republier.
- `LABEL_CONTACT_ESPAS_VECTOR.pdf` — visuel ESPAS.

À demander au mouvement : servent-ils encore ?

### 3. La page d'accueil

Il n'y avait **rien à reprendre** : l'ancienne était un assemblage de widgets, sans texte propre.
Le texte d'accueil est donc à écrire, avec l'ETN Communication.

### 4. Ce qui manque en allemand

- Trois pages françaises sans jumelle : guides-aînées, Fribourg, l'accueil.
- Quelques titres de section restés en français dans les pages allemandes (« Le louvetisme » au
  milieu de la page des Wölflinge). C'est dans la source.
- **Aucune actualité n'est traduite.**

### 5. La carte des implantations

Demandée par le cahier des charges (partie 2, point 3). La page correspondante est **vide** sur
l'ancien site : il n'y a rien à reprendre, tout est à construire. Question ouverte : quel fond de
carte, et à quelles conditions de protection des données.

### 6. Relecture

La conversion du contenu est automatique. Elle a pu rater des mises en forme. Une personne du
mouvement doit relire les pages à l'écran.

Un long texte cité sur la page de la dimension européenne **n'a pas été repris** : il n'est pas
attribué sur l'ancien site. Il doit revenir avec son auteur et sa source.

## Ce que « terminé » veut dire

- Chaque page du menu a un contenu réel, relu par une personne du mouvement.
- Chaque adresse publique de l'ancien site mène quelque part sur le nouveau (table vérifiée
  après la mise en ligne, avant de couper l'ancien site).
- Le sort de chaque image est tranché : publiée, ou écartée avec son motif.
- Ce qui manque en allemand est soit écrit et relu, soit reporté par une décision écrite.
