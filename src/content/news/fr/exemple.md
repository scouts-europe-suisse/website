---
title: "Exemple d'actualité"
date: 2026-09-10
summary: "Ce fichier montre à quoi ressemble une actualité. Il est en brouillon, donc invisible sur le site."
draft: true
---

Une actualité est un simple fichier dans `src/content/news/fr/`. Son nom
devient son adresse : `exemple.md` donne `/fr/actualites/exemple/`.

En-tête minimale : un titre et une date. `summary` sert dans la liste et dans
le flux RSS. `draft: true` garde l'article invisible tant qu'il n'est pas prêt.

Si l'article porte une image, `cover` donne son chemin et `coverCredit` son
crédit. **Le crédit n'est pas facultatif** : on ne publie pas une photo dont on
ignore l'auteur, et pas de photo où un enfant est reconnaissable sans
l'autorisation de ses parents.
