---
name: feedback_traductions_validees
description: Le 2026-09-13, Nicolas a validé toutes les traductions allemandes faites et en cours ; le bandeau « pas encore relue » est retiré ; le site allemand porte le nom « Schweizerische Pfadfinderschaft Europas » et son propre logo.
metadata:
  type: feedback
---

# Traductions allemandes validées

**Décision de Nicolas, 2026-09-13 :** toutes les traductions allemandes faites par Claude,
terminées ou en cours ce jour-là, sont validées. Le bandeau « Diese Seite wurde noch nicht von
einem deutschsprachigen Mitglied gegengelesen » ne doit plus apparaître : toutes les pages et
actualités allemandes portent `translated: true`.

**Pour la suite :** une nouvelle traduction faite par Claude se marque toujours
`translated: false` à sa création, ce qui affiche le bandeau ; c'est à une personne de la
valider (dans l'issue), après quoi on passe le champ à `true`. Nicolas peut valider en bloc,
comme il l'a fait.

**Le nom du mouvement en allemand :** « Schweizerische Pfadfinderschaft Europas ». Il est dans
`SITE.name.de` (`src/data/site.ts`) et repris partout sur les pages allemandes : titre
d'onglet, en-tête, pied de page, contact, bandeau, données structurées, images de partage. Le
logo allemand, `public/images/logo-ses-de.svg`, est construit comme le français (croix
officielle, texte en tracés, drapeau). Le nom juridique reste « Scoutisme Européen Suisse »
(`SITE.legalName`).

Voir aussi [[feedback_faits_du_mouvement]], [[design-system]].
