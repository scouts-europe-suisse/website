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

## Les quatre états d'un plan

L'état fait partie du **nom du dossier**, pour qu'on le voie rien qu'en regardant la liste.

| Nom du dossier | Ce que ça veut dire |
|---|---|
| `01-charte-graphique` | **Ouvert.** À faire. Personne n'a commencé. |
| `01-charte-graphique-encours` | **En cours.** Quelqu'un est dessus en ce moment. Le `PLAN.md` dit qui. |
| `01-charte-graphique-plustard` | **En pause volontaire.** Toujours valable, délibérément pas maintenant. |
| déplacé dans `_archives/` | **Terminé.** Fini, avec une note en tête qui dit comment ça s'est terminé. |

Il n'y a pas de suffixe `-fini`. Un plan terminé **part dans `_archives/`**, pour que la liste
principale ne montre que le travail vivant.

---

## Qui travaille sur quoi — la ligne `Qui :`

**C'est la règle importante.** Quand un plan est `-encours`, son `PLAN.md` porte une ligne
`**Qui :**` juste sous le statut, avec le prénom, la branche et la date de démarrage :

```markdown
# Plan 01 — Décliner la nouvelle charte graphique dans le site

**Statut :** en cours
**Qui :** Raphaël, sur la branche `work/rcharoze`, depuis 2026-09-10
**Responsable :** Raphaël
```

Les règles, toutes courtes :

1. **Seul un plan `-encours` a une ligne `Qui :`.** Les plans ouverts, en pause ou archivés n'en
   ont pas. Un plan sur lequel personne ne travaille n'appartient à personne.
2. **Démarrer un travail** = renommer le dossier en `-encours` **et** ajouter la ligne `Qui :`,
   dans le même changement. L'un sans l'autre est pire que rien.
3. **Arrêter** — terminé, mis en pause, ou simplement passer à autre chose = retirer la ligne
   `Qui :` et renommer le dossier. Au moment où tu arrêtes, pas plus tard.
4. **Si un plan porte déjà le nom de quelqu'un d'autre, n'y touche pas.** Cette personne est
   peut-être en plein dedans, et deux personnes sur les mêmes pages, ça finit en conflit.
   Parle-lui d'abord. La ligne `Qui :` ne change qu'une fois qu'elle a dit oui.
5. **Ne marque jamais le plan de quelqu'un d'autre comme terminé.** C'est la personne nommée
   `Responsable :` qui décide. (Claude ne le fera pas non plus à ta place.)

### Pourquoi les changements de `Qui :` vont directement sur `main`

Partout ailleurs dans ce dépôt, la règle est *ne jamais commiter sur `main`* — on travaille sur
`work/<son-nom>`. **Le statut des plans est la seule exception**, et il le faut.

Tout l'intérêt de la ligne `Qui :`, c'est que *les autres la voient*. Si elle ne part que sur ta
branche, personne d'autre ne peut la lire, et le plan a l'air libre pour tout le monde sauf toi.
Donc :

> Un changement qui ne touche **que** des fichiers de `_plans/` — renommage de dossier, ligne
> `Qui :`, note de résultat, archivage — est commité sur `main` immédiatement.

L'exception est étroite exprès. Elle couvre `_plans/` et rien d'autre. Un changement qui touche
aussi le site part sur ta branche, comme d'habitude.

*(Tant que le dépôt n'a pas de distant, « visible par les autres » veut dire « présent sur `main`
en local ». La règle ne change pas quand un distant sera ajouté.)*

---

## Fermer un plan

Un plan est terminé quand ce qu'il annonçait est fait. La plupart des `PLAN.md` se terminent par
une section qui le précise (« Ce que "terminé" veut dire »). **Lis cette section avant de
décider** : c'est le test, pas une impression.

Pour le fermer :

1. Passer la ligne `Statut :` à `terminé — fermé et archivé le <date>`.
2. Ajouter en tête une courte **note datée de résultat**, dans un bloc `>`. Dire ce qui s'est
   réellement passé et — c'est important — **nommer ce que le plan prévoyait et qui n'a pas été
   fait**, pour que ce soit enregistré plutôt que perdu en silence.
3. Retirer la ligne `Qui :`.
4. Déplacer tout le dossier dans `_archives/`.
5. Commiter sur `main`.

**On ne supprime jamais un plan.** L'archive, c'est la mémoire des décisions, et elle se
retrouve des mois plus tard quand quelqu'un demande « on n'avait pas déjà regardé ça ? ».

---

## Ce que Claude fait au début de chaque session

C'est automatique, décrit dans [`../CLAUDE.md`](../CLAUDE.md), et ça veut dire que tu n'as rien
à retenir de ce qui précède.

- **Liste ce qui est ouvert**, en lisant les dossiers eux-mêmes.
- **Te dit si un plan t'attend** — un plan ouvert dont tu es `Responsable :`.
- **Te dit qui d'autre est au travail**, d'après les lignes `Qui :`.
- **Signale un plan qui a l'air terminé mais reste ouvert.** Claude te le dit et te demande ; il
  ne le ferme pas à ta place.
- **Signale une ligne `Qui :` vieille de plus d'un mois**, au cas où quelqu'un soit passé à
  autre chose en oubliant de libérer le plan.

---

## Nommer un nouveau plan

`NN-titre-court`, où `NN` est le prochain numéro libre. Minuscules, mots reliés par des traits
d'union. Un numéro ne se réutilise jamais, y compris ceux des plans archivés.

À l'intérieur, commencer par cet en-tête :

```markdown
# Plan NN — une ligne qui dit de quoi il s'agit

**Statut :** ouvert
**Responsable :** <qui devrait s'en occuper>
**Date :** <aujourd'hui>
**Demandé par :** <qui l'a demandé>
**Portée :** <quelles pages ou quels fichiers c'est touché>
```

Puis expliquer le problème en langage courant **avant** de proposer quoi que ce soit. Quelqu'un
qui n'était pas dans la conversation doit pouvoir lire le plan à froid et comprendre pourquoi il
existe.
