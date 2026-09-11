---
name: feedback_branche_par_issue
description: Une branche par issue GitHub, créée depuis main, fusionnée par pull request. Jamais de commit direct sur main, à la seule exception des fichiers de _plans/.
metadata:
  type: feedback
---

# Une branche par issue

**Chaque changement du site part d'une issue GitHub et se fait sur sa branche, `issue/NN-mot-clef`,
créée depuis `main` à jour. Il revient dans `main` par une pull request dont la liste de
vérification a été déroulée. Ne jamais commiter directement sur `main`.**

Décision de Nicolas du 2026-09-11 (plan 05). Elle remplace la règle précédente « une branche par
personne », qui a servi du 2026-09-10 au 2026-09-11.

**Pourquoi :** il n'y a pas de CMS, Claude tient ce rôle, et plusieurs personnes font des
demandes en parallèle. Une branche par issue donne une unité de travail claire (une issue, une
branche, une pull request), rend « qui a changé quoi et pourquoi » lisible depuis l'issue, permet
de tester une modification seule avant de la publier, et laisse `main` toujours publiable.

**Comment l'appliquer :**

1. Pas d'issue ? La créer d'abord, avec les mots de l'utilisateur, puis la qualifier.
2. `git fetch --prune`, puis `git switch -c issue/NN-mot-clef main` sur `main` à jour. Plusieurs
   issues semblables peuvent partager une branche `lot/NN-NN-mot-clef`.
3. Étiquette `état: en cours`, assignation à soi (`gh issue edit NN --add-assignee @me`).
4. Petits commits, en français, citant `#NN` et expliquant le pourquoi.
5. Pull request vers `main` (`gh pr create --fill`), issue en `état: à tester`, liste déroulée,
   captures jointes, puis `état: testé`. Une seule personne suffit, y compris la même que celle
   qui a fait le travail.
6. Fusion en squash avec suppression de la branche. L'issue se ferme. La section « Issues » du
   plan est mise à jour dans la foulée, directement sur `main`.
7. En cas de conflit avec `main` : s'arrêter et montrer, jamais résoudre en silence.

**Les exceptions :**

- Un changement qui ne touche **que** `_plans/` (état d'un plan, section « Issues ») va
  directement sur `main`, parce qu'il n'a d'intérêt que si les autres le voient tout de suite.
- `work/<whoami>` reste utilisable pour explorer sans issue. Rien n'en part vers `main` sans
  passer par une issue et une pull request.

**Ne jamais modifier la branche de quelqu'un d'autre.** L'utilisateur peut lever la règle pour
une session en le demandant explicitement.

Voir aussi [[conventions]], [[feedback_rituel_demarrage]].
