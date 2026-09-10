# Plan 02 — Décliner la charte graphique dans le site

**Statut :** ouvert
**Responsable :** à définir (ETN Multimédia)
**Date :** 2026-09-10
**Demandé par :** cahier des charges SES25, partie 1
**Portée :** `src/styles/global.css`, `public/` (logo, favicons, polices), tous les composants

## Le problème

Le cahier des charges SES25 prévoit une **révision de la charte graphique** avant le site : logo
(croix à huit pointes conservée, texte adapté), palette de couleurs liée aux valeurs du mouvement,
typographies lisibles à l'écran, documents types. Le site en découle, pas l'inverse.

Cette charte **n'est pas finalisée**. Le site est donc construit sur un jeu de variables CSS
provisoires, rassemblées au même endroit dans
[`src/styles/global.css`](../../src/styles/global.css). Quand la charte arrive, on remplace ces
valeurs — couleurs, polices, échelles — sans toucher aux pages.

Les couleurs qui ne sont **pas** provisoires sont celles des trois branches (jaune, verte,
rouge) : elles appartiennent au mouvement, pas à la charte.

## Ce qu'il faut faire, une fois la charte reçue

1. Reporter la palette et les typographies dans les variables de `global.css`.
2. Déposer le logo définitif et les favicons dans `public/`, aux formats listés dans
   [`../../_memory/design-system.md`](../../_memory/design-system.md).
3. Vérifier les contrastes (texte sur fond coloré) — c'est ce qui casse le plus souvent quand on
   applique une charte pensée pour le papier à un écran.
4. Relire chaque page à l'écran et sur téléphone.

## Points ouverts

- ~~**Le drapeau suisse dans le logo**~~ — **étudié le 2026-09-10, a priori sans obstacle.**
  La loi sépare l'écu (réservé à la Confédération, art. 8) et le carré (permis, art. 10). Le logo
  du SES porte un **carré**, donc le régime permissif. La règle à retenir pour la nouvelle
  charte : **un carré, jamais un écu.** Lecture complète et réserves :
  [`../../_memory/croix-suisse-et-armoiries.md`](../../_memory/croix-suisse-et-armoiries.md).
  À faire confirmer par l'IPI si le mouvement veut une certitude juridique.
- L'AGSE a mené un travail récent dont le SES peut s'inspirer, voire reprendre des éléments.

## Ce que « terminé » veut dire

- Plus aucune couleur ni police en dur dans les composants : tout passe par les variables.
- Le logo et les favicons définitifs sont en place.
- Une personne du mouvement a validé le rendu à l'écran, en français et en allemand.
