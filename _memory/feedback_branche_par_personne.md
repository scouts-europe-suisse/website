---
name: feedback_branche_par_personne
description: Toujours travailler sur work/<whoami>. Jamais de commit direct sur main, à la seule exception des fichiers de _plans/.
metadata:
  type: feedback
---

# Une branche par personne

**Travailler par défaut sur `work/<whoami>`. Ne jamais commiter directement sur `main`.**

**Pourquoi :** plusieurs membres du SES utilisent ce dépôt et la plupart ne connaissent pas git.
Personne ne pensera à créer une branche avant de modifier une page. Les mettre d'office sur leur
propre branche évite que deux personnes écrasent le travail l'une de l'autre, et rend « qui a
changé quoi » lisible dans l'historique.

**Comment l'appliquer :**

1. Au démarrage de session, `whoami` donne l'identifiant. La branche est `work/<identifiant>`,
   sans transformation. La créer depuis `main` si elle n'existe pas.
2. Si l'utilisateur est ailleurs, basculer sur sa branche avant de modifier quoi que ce soit.
3. Si `work/<identifiant>` est en retard sur `main`, la mettre à jour automatiquement et le dire
   en une phrase simple. En cas de conflit : s'arrêter et montrer, jamais résoudre en silence.
4. **Ne jamais modifier la branche `work/...` de quelqu'un d'autre.**
5. **La seule exception :** un changement qui ne touche **que** des fichiers de `_plans/` va
   directement sur `main`, parce que le statut d'un plan n'a d'intérêt que si les autres le
   voient. Voir [`../_plans/README.md`](../_plans/README.md).

L'utilisateur peut lever cette règle pour une session en le demandant explicitement.

Voir aussi [[conventions]], [[feedback_rituel_demarrage]].
