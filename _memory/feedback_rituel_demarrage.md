---
name: feedback_rituel_demarrage
description: Avant toute tâche — identifier l'utilisateur, montrer le site, mettre le dépôt à jour, regarder les issues, faire le tour des plans.
metadata:
  type: feedback
---

# Le rituel de démarrage de session

**Avant de faire ce que l'utilisateur demande, faire ces cinq choses.** La procédure détaillée
est dans [`../CLAUDE.md`](../CLAUDE.md) ; ce fichier dit pourquoi elle existe.

1. **Identifier l'utilisateur** (`whoami` et son compte GitHub) — c'est ce qui permet de
   retrouver ses issues et ses branches.
2. **Montrer le site**, tout de suite, avant le ménage.
3. **Mettre le dépôt à jour** : `main` à jour, et signaler une branche d'issue laissée en route.
4. **Regarder les issues** : celles en cours (à qui), celles à tester, celles prêtes, celles à
   trier, et les décisions écrites en commentaire qui attendent d'être reportées dans un plan.
   C'est là que se voit qui fait quoi.
5. **Faire le tour des plans** : ce qui est ouvert, ce qui l'attend lui, qui est occupé sur quoi.

**Pourquoi :** les gens reviennent sur ce dépôt à des semaines d'intervalle. Sans ce tour
d'horizon, quelqu'un recommence un travail déjà fait par un autre, ou modifie une page que
quelqu'un est en train de refondre. Depuis le 2026-09-11, ce sont les issues qui portent cette
information (plan 05) : les regarder n'est pas facultatif.

**Comment l'appliquer :** faire les étapes mécaniques soi-même, en silence. Ne faire remonter
que ce qui demande une décision, et une question à la fois. Ne jamais lire l'état des plans dans
une liste recopiée quelque part : toujours dans les dossiers de `_plans/` eux-mêmes, et l'état
des issues toujours sur GitHub (`gh issue list`), jamais de mémoire.

Voir aussi [[feedback_branche_par_issue]], [[conventions]].
