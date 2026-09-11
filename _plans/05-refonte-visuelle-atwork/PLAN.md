# Plan 05 — Refaire l'aspect visuel du site, et travailler par issues

**Session:** Nicolas C:\Users\nicol\Documents\SES\website
**Responsable :** Nicolas (ntbf)
**Date :** 2026-09-11
**Demandé par :** Nicolas
**Portée :** tout `src/` sauf `src/content/` (qui ne change que par des issues de contenu), `public/`,
`.github/`, `CLAUDE.md`, `_memory/`, les étiquettes et modèles d'issue du dépôt GitHub

## Le problème

Le site actuel fonctionne, mais son rendu fait « site associatif amateur » : hiérarchie
typographique plate, feuille blanche sur fond beige et barre de menu anthracite hérités du
WordPress, carrousel muet, page d'accueil sans parcours, cartes et boutons hétérogènes, pied de
page pauvre, langue inaccessible sur mobile. Le diagnostic complet du 2026-09-11 est résumé dans
`_memory/diagnostic-2026-09-11.md`.

On remet donc l'aspect visuel **entièrement à plat**. La structure et le contenu actuels servent
de matière pour tester les rendus, rien de plus : ils seront réorganisés au fil des issues.

En même temps, le mode de travail change. Il n'y aura pas de CMS : chaque contributeur a un accès
GitHub et Claude, et Claude tient le rôle du CMS. Pour que ça tienne à plusieurs, **tout passe
par des issues GitHub**, une par sujet, étiquetées, traitées, testées, puis fusionnées et
publiées par lot.

## Décisions prises le 2026-09-11 (Nicolas)

| Sujet | Décision |
|---|---|
| Qui décide | Chaque contributeur, individuellement. Une seule personne suffit pour trancher, fusionner ou publier. Pas de collégialité. |
| Contributeurs | Tous les membres actuels et futurs de l'organisation GitHub peuvent tout faire. Un système de gestion des contributeurs est à prévoir (issue). |
| Plans existants | On reprend les plans de Perki (02, 04) et on les adapte, on ne les jette pas. |
| `_plans/` et issues | Les deux cohabitent et doivent rester cohérents (voir « Comment plans et issues vivent ensemble »). |
| Règles existantes | Toutes conservées : photos, faits, adresses françaises, noindex en préparation, pas d'image générée par IA. |
| Charte graphique | On la crée dans ce chantier. Le logo actuel est conservé ; Claude en produit la version vectorielle. |
| Références | uigse-fse.org, scouts-europe.org, eurojam2027.org. Style : **moderne, institutionnel, sobre**. |
| Public prioritaire | Les parents d'abord, les futurs chefs ensuite. |
| Validation visuelle | Maquettes des pages clés d'abord, puis code ; pourra évoluer pour aller plus vite. |
| Structure | Repensée librement ; les adresses françaises actuelles sont conservées par redirection. |
| Photos | Celles déjà autorisées, plus les photos des comptes Facebook et Instagram du mouvement. |
| Fonctionnalités | Formulaire de contact, carte des implantations, publications réseaux sociaux, agenda, documents à télécharger, recherche, RSS. **Pas de newsletter.** |
| Allemand | Traduction complète de tous les contenus. Validée par défaut pendant la refonte ; validation au cas par cas reprise en production. |
| Issues | Créées par les membres ou par Claude ; modèles fournis ; **Claude consulte et traite les issues régulièrement.** |
| Branches | Une branche par issue, ou par groupe d'issues semblables, avec pull request vers `main`. |
| Tests | Liste de vérification manuelle plus contrôles automatiques au build, sans alourdir. |
| Publication | Automatique à chaque fusion sur `main` (GitHub Actions), vers `gh-pages`. |
| Gel du design | Une fois validé, tout changement de charte demande une issue `type: charte` et l'accord écrit d'une personne. |
| Domaine et hébergeur | Deux issues ouvertes jusqu'à la mise en production (plan 01). |
| Échéance | Aucune. |

**Limite constatée :** les comptes contributeurs ont le droit d'écriture mais pas
d'administration sur le dépôt. Impossible donc de protéger `main` ou d'imposer des relectures par
réglage GitHub. Le gel et les règles reposent sur la convention et sur `CLAUDE.md`, que Claude
applique. Si on veut une protection technique, un propriétaire de l'organisation devra la poser.

## Ce que ce plan fait des plans existants

| Plan | Sort |
|---|---|
| 01 domaine et bascule | Reste `-later`. Ses deux décisions deviennent les issues « Bascule du domaine » et « Choix de l'hébergeur », étiquetées `plan: 01`. |
| 02 charte graphique | **Absorbé par ce plan** : la charte est créée ici. Archivé avec une note qui le dit. |
| 04 contenu et relecture | Reste `-paused`, responsable Perki. Ses cinq points restants deviennent des issues `plan: 04`. |
| XX référencement | Reste `-later`. Sera repris après le gel du design. |

## Comment plans et issues vivent ensemble

- **Un plan dit le pourquoi et le cap.** Une issue dit **une action unitaire** : un texte, une
  page, un composant, un bug, une décision.
- Chaque issue porte une étiquette `plan: NN`. Chaque `PLAN.md` a une section **« Issues »** qui
  liste les siennes, ouvertes et fermées. Claude la met à jour à chaque changement d'état.
- Une issue ne se ferme que **testée** (`état: testé`), au moment de la fusion.
- Un plan ne se ferme que quand toutes ses issues sont fermées, ou reportées par écrit.
- Les décisions se prennent **dans l'issue** (commentaire « Décision : … », signé), puis sont
  recopiées dans le tableau du plan. Une décision non écrite n'existe pas.

## Le cycle d'une issue

1. **Créer** avec un modèle. Naît en `état: à trier`.
2. **Qualifier** : type, zone, langue, priorité, plan. Passe en `état: prêt`.
3. **Prendre** : branche `issue/NN-mot-clef` (ou `lot/NN-NN-…` pour un groupe). `état: en cours`.
4. **Faire**, en petits commits qui citent l'issue (`#NN`).
5. **Tester** : la liste de la pull request (FR et DE, mobile et desktop, captures, build sans
   erreur, aucun lien mort). `état: à tester`, puis `état: testé` par la personne qui vérifie.
   La même personne peut faire et tester, à condition de dérouler la liste.
6. **Fusionner** dans `main` : la publication sur l'aperçu part toute seule. L'issue se ferme.

## Étiquettes

Cinq familles, plus le rattachement au plan. Le schéma est posé sur GitHub le 2026-09-11.

| Famille | Valeurs |
|---|---|
| `type:` | contenu, visuel, technique, bug, décision, **charte** |
| `zone:` | global, accueil, notre-scoutisme, mouvement, actualités, nous-rejoindre, contact, carrick |
| `langue:` | fr, de |
| `priorité:` | bloquant, haute, normale, basse |
| `état:` | à trier, prêt, en cours, à tester, testé, bloqué |
| `plan:` | 01, 02, 04, 05, XX |

## Les étapes

> **Décision de Nicolas, 2026-09-11 : l'étape 0 se fait tout de suite. À partir de l'étape 1,
> rien ne démarre sans une conversation préalable entre Nicolas et Claude, pour accorder les
> violons, et sans les données multimédias que Nicolas doit fournir (photos, logo, documents).**
> Une session qui trouve ce plan `-atwork` avec l'étape 0 fermée ne commence donc pas l'étape 1
> d'elle-même : elle demande si cette conversation a eu lieu.

**Étape 0 — Mettre en place le fonctionnement** (ce plan, sans toucher au rendu)
- Étiquettes, modèles d'issue, modèle de pull request.
- Publication automatique à la fusion sur `main`, avec les mêmes garde-fous que `npm run deploy`
  (préfixe des adresses, noindex).
- Réécrire `CLAUDE.md` et `_memory/conventions.md` pour le nouveau mode : consulter les issues
  au démarrage, une branche par issue, cycle de test, gel.
- Issues de départ : les deux du plan 01, les cinq du plan 04, la gestion des contributeurs.

**Étape 1 — La charte**
- Palette, typographie, échelle de titres, espacements, rayons, ombres, grille.
- Logo vectoriel (fidèle au logo actuel), favicons, image de partage.
- Maquettes des pages clés : accueil, page de rubrique, page de contenu, implantations.
- Validation par une personne, dans l'issue.

**Étape 2 — Le système**
- Jetons de design branchés dans Tailwind. Composants : en-tête, menu, pied de page, hero,
  carte, bouton, section, liste d'actualités, encadré, figure avec crédit.
- Mobile : langue et recherche accessibles à toutes les largeurs.

**Étape 3 — Les pages**
- Accueil comme parcours pour un parent. Rubriques avec introductions. Nous rejoindre avec
  carte et liste des groupes. Contact. Actualités. 404 bilingue.

**Étape 4 — Les fonctionnalités**
- Formulaire de contact, carte, publications réseaux sociaux, agenda, documents, recherche, RSS.
  Chacune est une issue avec son choix technique écrit (service tiers ou non, données
  personnelles).

**Étape 5 — Contenu et traductions**
- Toutes les pages et actualités en FR et DE. Photos des comptes Facebook et Instagram ajoutées
  avec leur autorisation notée.

**Étape 6 — Tests, publication, gel**
- Passage complet de la liste de vérification, audit d'accessibilité, audit de référencement
  local (plan XX). Puis **gel** : `type: charte` obligatoire pour toute modification de
  `src/styles/`, `src/layouts/`, `src/components/`.

## Ce que « terminé » veut dire

- La charte est écrite dans le dépôt (jetons, logo vectoriel, favicons, image de partage) et
  validée par une personne, dans une issue.
- Toutes les pages sont refaites avec le nouveau système, en FR et en DE, sans couleur ni taille
  en dur hors des jetons.
- Les fonctionnalités décidées sont en place, ou écartées par écrit.
- La publication est automatique à la fusion sur `main`, et les garde-fous de noindex et de
  préfixe y sont.
- Le gel est en vigueur, écrit dans `CLAUDE.md`, et toutes les issues `plan: 05` sont fermées.

## Issues

_(mise à jour par Claude à chaque changement d'état)_

Étape 0 :
- #3 Mettre en place le fonctionnement par issues — **fermée** le 2026-09-11 (PR #12, #13)
- #4 Publier automatiquement l'aperçu à chaque fusion sur main — prêt
- #5 Gestion des contributeurs — décision, prêt
- #11 Mettre à jour la documentation périmée — prêt, priorité basse
- #16 Publication cassée sous Windows (npm.cmd EINVAL) — **fermée** le 2026-09-11 (PR #17)

Rattachées à d'autres plans mais faites dans les étapes de ce plan :
- #6 Compléter l'allemand (plan 04) — étape 5
- #9 Introductions des six pages de rubrique (plan 04) — étape 3
- #1 et #2 Domaine et hébergeur (plan 01) — après le gel

Faites avant la conversation, à la demande de Nicolas :
- #14 Pictogrammes des branches (SVG AGSE, couleurs de branche) — **fermée** le 2026-09-11 (PR #15)
- #18 Branche jaune, un seul pictogramme — **fermée** le 2026-09-11 (PR #19)
- #20 Carte des implantations depuis la carte Google, dessinée à la charte — données faites (PR #23), carte bloquée jusqu'à la conversation
- #21 Accueil : dernières photos Instagram, modale, albums — bloqué (jeton Meta, conversation)
- #22 Configuration Meta : .env, jetons, secrets hors dépôt — **fermée** le 2026-09-11 (PR #23)

Refonte, version 1 (décision de Nicolas du 2026-09-11 : « fais toute la refonte maintenant,
sans interruption », à soumettre aux autres le soir même) :
- #24 Charte et système de composants (étapes 1 et 2) — **fermée** le 2026-09-11 (PR #26)
- #25 Toutes les pages refaites (étape 3) — **fermée** le 2026-09-11 (PR #26)
- #9 Introductions des six rubriques (plan 04) — **fermée** le 2026-09-11 (PR #26)
- #20 Carte des implantations — carte dessinée faite (PR #26), reste le rafraîchissement automatique (#4)
- #21 Section Instagram sur l'accueil — faite (PR #26), reste le rafraîchissement automatique (#4)
- #22 Configuration Meta — **fermée** (PR #23)

Ce qui reste avant le gel (étape 6) : relecture par les autres membres, corrections en issues,
publication automatique (#4), audit de référencement local (plan XX), puis gel.
