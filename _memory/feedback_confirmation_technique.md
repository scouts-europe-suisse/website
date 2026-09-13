---
name: feedback_confirmation_technique
description: Depuis le 2026-09-13, tout changement technique, de design ou de structure demande une confirmation explicite dans la conversation ; un changement de contenu seul (textes, images, articles) n'en demande pas.
metadata:
  type: feedback
---

# Confirmer avant de toucher à la technique, au design ou à la structure

**Décision de Nicolas, 2026-09-13 (issue #45).** La refonte v1 est en ligne et soumise aux
autres. À partir de maintenant :

- **Contenu seul** (modifier ou ajouter un texte, une image, une actualité, une description,
  une traduction) : on fait, sans demander de confirmation. L'issue, la branche et la pull
  request suivent le cycle habituel.
- **Technique, design ou structure** (un composant, un style, le gabarit, la mise en page, le
  menu, l'arborescence, les scripts, la configuration, le référencement technique, une
  dépendance) : **on redemande une confirmation dans la conversation avant d'exécuter**, même
  si la demande vient de l'utilisateur lui-même. On dit en une ou deux phrases ce qu'on va
  changer et où, et on attend son « oui ».

**Pourquoi :** le design et la structure sont en cours de validation par plusieurs personnes ;
un changement de ce côté engage tout le monde, alors qu'un contenu ne concerne qu'une page.
C'est le premier pas vers le gel du design prévu par le plan 05.

**Comment l'appliquer :** en cas de doute sur la catégorie, c'est technique. Une demande qui
mélange les deux : faire le contenu, demander pour le reste. Une correction d'un bug visible
qui ne change ni l'apparence voulue ni la structure (un lien cassé, une adresse qui passe à la
ligne) reste du ressort de la confirmation, mais on peut la proposer avec la question.

Voir aussi [[feedback_branche_par_issue]], [[conventions]].
