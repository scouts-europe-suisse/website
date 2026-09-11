---
name: design-system
description: La charte du site (version 1 de la refonte, plan 05) — jetons, typographie, composants, où vivent le logo et les pictogrammes, ce qui ne bouge pas.
metadata:
  type: project
---

# La charte du site — version 1 (2026-09-11)

Faite d'un bloc par Claude à la demande de Nicolas, sans la conversation préalable prévue par le
plan 05 : **c'est une première version à soumettre aux autres**, pas un design gelé. Direction
demandée : moderne, institutionnel, sobre. Références : uigse-fse.org, scouts-europe.org,
eurojam2027.org.

**Tout est dans `src/styles/global.css`, bloc `:root`, exposé à Tailwind par `@theme inline`.**
Règle inchangée : aucune couleur, aucune taille de police en dur dans une page ou un composant.

## Ce qui ne bouge pas (identité du mouvement, pas charte)

- Rouge de la croix `#e3051a`, sa version assombrie pour le texte `#b30414` (6,8:1).
- Jaune de la fleur de lys `#f8e900` : filets, surtitres sur fond sombre, jamais du texte sur blanc.
- Couleurs de branche : jaune `#ead728`, verte `#2c8d1b`, rouge `#ba1b1b`.
- Les six pictogrammes de branche (`src/data/pictos.ts`, AGSE), le logo (croix + texte).

## La charte

| Jeton | Valeur | Usage |
|---|---|---|
| `--ses-nuit` | `#1c2733` | pied de page, bandes sombres, voile du bandeau, titres forts |
| `--ses-nature` | `#2f5d3a` | accent secondaire |
| `--ses-fg` | `#1f1d1a` | encre |
| `--ses-muted` | `#625b52` | texte secondaire (6,6:1) |
| `--ses-page` / `--ses-page-alt` | blanc / `#f6f4ef` | sections alternées |
| `--ses-border` | `#e4e0d8` | filets, cartes |
| Polices | Cabin (titres), Source Sans 3 (texte) | auto-hébergées, `public/fonts/` |
| Titres | display `clamp(2.5rem, 5.5vw, 4.25rem)`, h1 `clamp(2rem, 4vw, 3rem)`, h2 `clamp(1.5rem, 2.6vw, 2.125rem)`, h3 1.25rem | vraie hiérarchie |
| Corps | 17 px, interligne 1,65, colonne de lecture 44rem | |
| Rayons | 4 / 12 / 24 px, boutons en pilule | |
| Ombres | `--shadow-1/2/3` | cartes au repos, au survol, visionneuse |
| Sections | `--section-y: clamp(3.5rem, 7vw, 6.5rem)` | |
| Colonne | 76rem, étroite 48rem | |

## Les composants (classes dans global.css, composants dans src/components/)

- `.ses-btn` (rouge), `--secondary` (contour nuit), `--light` (blanc sur sombre), `--ghost`.
- `.ses-card` avec `__media`, `__body`, `__title` (toute la carte cliquable), `--accent`.
- `.ses-eyebrow` (surtitre), `.ses-section`, `--alt`, `--dark`, `.ses-page-head` (bandeau de
  page intérieure avec fil d'Ariane), `.ses-prose`, `.ses-lead`, `.ses-chip`, `.ses-more`.
- `Header` (une ligne, collée, sous-menus au survol et au clavier, panneau replié en
  `<details>`), `Footer` (nuit, quatre colonnes), `LangSwitcher` (FR · DE, toujours visible).
- `SwissMap` (SVG de la Suisse, `src/data/suisse.json`, repères depuis
  `src/data/implantations.json`), `InstagramGrid` (grille + visionneuse `<dialog>`),
  `NewsList` (cartes), `SectionIndex` (sommaire en cartes), `ContactBlock`, `BrancheIcon`.
- `.ses-reveal` : apparition douce au défilement, désactivée avec `prefers-reduced-motion`.

## Logo, favicons, image de partage

- `public/images/logo-ses.svg` : vectorisé depuis le PNG de l'ancien site par tracé par couches
  (croix, lys, texte, drapeau). Le texte garde un léger grain de vectorisation : **à remplacer
  par un dessin propre dès que le mouvement fournit l'original**.
- `public/images/croix-ses.svg` : la croix seule (pied de page, vignettes sans image).
- `public/favicon.svg` et les PNG (32, 192, 512, apple-touch) : la croix sur fond blanc arrondi.
- `public/images/og-image.jpg` : 1200×630, photo + logo, pour les partages.

## Photos

Bandeau d'accueil et bande « Devenir chef » : photos du compte Instagram du mouvement
(`public/images/instagram/`, décision du 2026-09-11). Elles changent si `npm run instagram`
supprime le fichier : les deux fichiers utilisés sont nommés dans `src/pages/[lang]/index.astro`.
