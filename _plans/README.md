# Les plans — comment ça marche

Un **plan**, c'est un travail trop gros, ou trop partagé, pour être fait et oublié. Il vit dans
son propre dossier ici, avec un `PLAN.md` dedans.

Nous sommes plusieurs à utiliser ce dépôt, et la plupart d'entre nous ne sommes pas
développeurs. Les règles ci-dessous sont donc volontairement simples, et Claude fait les parties
mécaniques (renommer les dossiers, commiter) à ta place. Tu ne devrais jamais avoir à faire
autre chose que dire ce que tu veux.

---

## Le problème que ces règles évitent

Un plan qui reste « ouvert » des mois après avoir été terminé. Un plan que deux personnes
attaquent en même temps sans le savoir, et dont les modifications se marchent dessus. Rien de
tout ça n'est la faute de quelqu'un : c'est ce qui arrive quand rien n'est écrit sur la façon
dont un plan se prend et se ferme. Ce fichier est cette pièce manquante.

---

## L'état d'un plan

L'état est un **suffixe du nom de dossier**, pour qu'on le voie rien qu'en listant `_plans/`.

| Suffixe | Ce que ça veut dire |
|---|---|
| `-atwork` | **En cours.** Quelqu'un est dessus en ce moment. |
| `-paused` | **Arrêté en route.** Commencé, mis de côté, à reprendre. |
| `-later` | **Parqué volontairement.** Toujours valable, délibérément pas maintenant. |
| `-study` | **À l'étude.** On cherche encore quoi faire, rien n'est décidé. |
| `-done` | **Terminé.** Part aussitôt dans `_archives/`. |

Un plan `-done` ne reste jamais à la racine : seuls `-atwork`, `-paused`, `-later` et `-study`
y vivent. C'est ce qui fait que la liste ne montre que du travail vivant.

### Numéroter, ou pas

Un plan qui compte dans l'ordre des priorités porte un numéro : `00-migration-atwork`.
Un plan de réserve — typiquement `-later` ou `-study` — commence par **`XX-`** : il est dans le
sac, il n'a pas de rang. **Ne lui donne un numéro que si on te le demande.**

## Qui travaille dessus — la ligne `Session:`

**C'est la règle importante.** Plusieurs sessions de travail peuvent tourner en parallèle, sur
plusieurs machines ou plusieurs copies du dépôt. Sans marque explicite, deux d'entre elles
prennent le même plan et se marchent dessus.

Un plan `-atwork` porte donc, dans l'en-tête de son `PLAN.md` :

```markdown
**Session:** perkim5 /Users/perki/code/scouts/website
```

L'étiquette est **`{nom de machine} {chemin du dossier de travail}`**. Les deux ensemble sont
uniques : deux copies du dépôt sur la même machine ne se confondent pas, deux machines non plus.

**Le nom de machine se lit avec `scutil --get LocalHostName`, jamais avec `hostname`.** Sur macOS,
un VPN remplace le résultat de `hostname` par un nom attribué en DHCP : la même machine change
alors d'identité selon que le VPN est actif ou non, et l'étiquette ne correspond plus à rien.
`LocalHostName` ne bouge pas. (Hors macOS, où `scutil` n'existe pas, `hostname` fait l'affaire.)

Pour comparer deux étiquettes : retirer un `.local` final et ignorer la casse.

Les règles, toutes courtes :

1. **Seul un plan `-atwork` porte une ligne `Session:`.** En passant à `-paused`, `-later`,
   `-study` ou `-done`, on la retire dans le même changement. Un plan qui n'est pas en cours
   n'appartient à personne.
2. **Commencer** = renommer le dossier en `-atwork` **et** poser la ligne `Session:`, ensemble.
   L'un sans l'autre est pire que rien.
3. **Commiter et pousser tout de suite** après avoir créé un plan ou changé son état. C'est une
   exception assumée à la règle « on ne commite pas sans demander » : elle ne couvre que les
   fichiers du plan concerné, son renommage et sa ligne `Session:`, rien d'autre dans le dépôt.
   Ne pas remettre à plus tard : un changement d'état non poussé est invisible pour les autres,
   ce qui vide le mécanisme de son sens. Si le `push` échoue, le dire, ne pas l'avaler.
4. **Au démarrage d'une session**, après avoir mis le dépôt à jour : lire l'en-tête de chaque plan
   `-atwork`. Si l'un porte l'étiquette **de cette session**, proposer de le reprendre — c'est le
   nôtre, même s'il vient d'une session précédente qui s'est arrêtée en route.
5. **Si on demande un nouveau plan** alors que cette session en tient déjà un en `-atwork` :
   **demander d'abord s'il faut mettre le précédent en pause**.
6. **Si on demande de travailler sur un plan étiqueté par une autre session** : **prévenir et
   demander confirmation explicite** avant de le reprendre. Quelqu'un est peut-être en plein
   dedans. Ce n'est qu'après accord qu'on réécrit la ligne `Session:` à son nom, puis qu'on
   commite et pousse (règle 3).

**Un plan `-atwork` sans ligne `Session:`** (parce qu'il est antérieur à cette règle) n'appartient
à personne : on peut le reprendre en y posant simplement son étiquette. On n'invente pas un
propriétaire précédent.

## `SessionState.md` — où on en était

Quand on met un plan en pause, ou qu'on s'arrête au milieu, on laisse à côté du `PLAN.md` un
fichier **`SessionState.md`** : ce qui est fait, ce qui vient ensuite, les fichiers à rouvrir pour
reprendre le fil.

**Le `PLAN.md` reste propre.** C'est le plan de référence, pas un journal de bord. Ce qui relève
du « où j'en étais » va dans `SessionState.md`, pas dedans.

Et l'état d'un plan ne va **pas** dans `_memory/` : ce dossier est pour les conventions du
chantier, pas pour le suivi d'un travail en cours.

## Nettoyer un plan en cours de route

Quand on demande **« nettoie le plan NN »**, ce n'est pas une clôture : c'est du rangement en
vol. On range le travail terminé dans `<plan>/_done/`, on regroupe ce qui reste dans un seul
`PLAN.md`, et on remet `SessionState.md` à jour. **Le suffixe d'état ne change pas.**

## Fermer un plan

Un plan est terminé quand ce qu'il annonçait est fait. La plupart des `PLAN.md` se terminent par
une section qui le précise (« Ce que "terminé" veut dire »). **Lis cette section avant de
décider** : c'est le test, pas une impression.

Pour le fermer :

1. Renommer le dossier avec le suffixe `-done`.
2. Ajouter en tête une courte **note datée de résultat**, dans un bloc `>`. Dire ce qui s'est
   réellement passé et — c'est important — **nommer ce que le plan prévoyait et qui n'a pas été
   fait**, pour que ce soit enregistré plutôt que perdu en silence.
3. Retirer la ligne `Session:`.
4. Déplacer tout le dossier dans `_archives/`.
5. Commiter et pousser tout de suite.

**On ne supprime jamais un plan.** L'archive, c'est la mémoire des décisions, et elle se
retrouve des mois plus tard quand quelqu'un demande « on n'avait pas déjà regardé ça ? ».

---

## Ce que Claude fait au début de chaque session

C'est automatique, décrit dans [`../CLAUDE.md`](../CLAUDE.md), et ça veut dire que tu n'as rien
à retenir de ce qui précède.

- **Liste ce qui est vivant**, en lisant les dossiers eux-mêmes.
- **Te dit si un plan t'attend** — un plan ouvert dont tu es `Responsable :`.
- **Prévient si un plan est tenu par une autre session**, d'après les lignes `Session:`.
- **Signale un plan qui a l'air terminé mais reste ouvert.** Claude te le dit et te demande ; il
  ne le ferme pas à ta place.
- **Signale une ligne `Session:` ancienne**, au cas où une session se soit arrêtée sans libérer
  le plan.

---

## Nommer un nouveau plan

`NN-titre-court-état`, où `NN` est le prochain numéro libre — ou `XX-` pour un plan de réserve.
Minuscules, mots reliés par des traits d'union. Un numéro ne se réutilise jamais, y compris ceux
des plans archivés.

À l'intérieur, commencer par cet en-tête :

```markdown
# Plan NN — une ligne qui dit de quoi il s'agit

**Session:** perkim5 /Users/perki/code/scouts/website   ← seulement si -atwork
**Responsable :** <qui devrait s'en occuper>
**Date :** <aujourd'hui>
**Demandé par :** <qui l'a demandé>
**Portée :** <quelles pages ou quels fichiers c'est touché>
```

Il n'y a pas de ligne `Statut :` : **c'est le nom du dossier qui fait foi.** Une ligne de statut
dans le fichier finit toujours par contredire le dossier.

Puis expliquer le problème en langage courant **avant** de proposer quoi que ce soit. Quelqu'un
qui n'était pas dans la conversation doit pouvoir lire le plan à froid et comprendre pourquoi il
existe.
