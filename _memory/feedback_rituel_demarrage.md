---
name: feedback_rituel_demarrage
description: Avant toute tâche — identifier l'utilisateur, mettre sa branche à jour, montrer le travail des autres, faire le tour des plans.
metadata:
  type: feedback
---

# Le rituel de démarrage de session

**Avant de faire ce que l'utilisateur demande, faire ces quatre choses.** La procédure détaillée
est dans [`../CLAUDE.md`](../CLAUDE.md) ; ce fichier dit pourquoi elle existe.

1. **Identifier l'utilisateur** (`whoami`) — c'est ce qui donne sa branche.
2. **Mettre sa branche à jour** par rapport à `main`.
3. **Montrer le travail des autres** : quelles branches `work/*` sont en avance sur `main`, de
   qui, depuis quand.
4. **Faire le tour des plans** : ce qui est ouvert, ce qui l'attend lui, qui est occupé sur quoi.

**Pourquoi :** les gens reviennent sur ce dépôt à des semaines d'intervalle. Sans ce tour
d'horizon, quelqu'un recommence un travail déjà fait par un autre, ou modifie une page que
quelqu'un est en train de refondre. Le rituel coûte quinze secondes et évite les deux.

**Comment l'appliquer :** faire les étapes mécaniques soi-même, en silence. Ne faire remonter
que ce qui demande une décision, et une question à la fois. Ne jamais lire l'état des plans dans
une liste recopiée quelque part : toujours dans les dossiers de `_plans/` eux-mêmes.

Voir aussi [[feedback_branche_par_personne]], [[conventions]].
