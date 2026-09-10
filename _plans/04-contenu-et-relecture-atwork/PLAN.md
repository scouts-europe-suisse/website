# Plan 04 — Finir le contenu : images, accueil, allemand, relecture

**Session:** perkim5 /Users/perki/code/scouts/website
**Responsable :** Perki
**Date :** 2026-09-10
**Demandé par :** Perki
**Portée :** `src/content/`, `public/images/`, la carte des implantations

## De quoi il s'agit

Ce qui restait ouvert à la clôture du [plan 00](../_archives/00-migration-done/PLAN.md). La
reprise technique est finie ; ce qui reste demande des décisions et des textes, pas du code.

## 1. Les images retenues — débloqué

**Autorisations : confirmées par Perki le 2026-09-10.** Les photos qui étaient publiées sur
l'ancien site ont fait l'objet d'une autorisation explicite. Elles peuvent donc être reprises sur
le nouveau.

**Portée exacte de cette confirmation, à ne pas élargir :** elle couvre **les photos qui étaient
publiées sur `www.scouts-europe.ch`**. Une photo qui n'a jamais été en ligne — un fichier trouvé
dans la médiathèque sans page qui l'affiche, une photo apportée plus tard — n'est pas couverte et
demande sa propre vérification.

**Fait le 2026-09-10 :** 71 emplacements remplis, 50 images publiées. Il ne reste que deux cas,
qui ne sont pas des questions d'autorisation :

**Les deux cas restants ont été tranchés en regardant le site en ligne (2026-09-10) :**

- `LABEL_CONTACT_ESPAS_VECTOR` : **abandonné**. C'est un PDF, et la page ESPAS du site en ligne
  ne contient **aucune image** — il n'était défini que comme image à la une, jamais affiché.
  Rien à reprendre.
- Le **texte cité** de la page européenne : **rétabli**. Il est bien sur le site en ligne, en
  entier, et il s'y termine sans la moindre attribution : il n'y a donc rien à récupérer de
  l'ancien site. Le texte est en place, avec un repère `à attribuer` juste au-dessus.
  **À faire : retrouver l'auteur et la source**, et les ajouter.

## 2. Le texte de la page d'accueil — traité

**Fait le 2026-09-10.** En regardant la page d'accueil actuelle de près, elle n'a **aucun texte
propre** : un bandeau défilant, trois cartes de branche avec leur tranche d'âge, un lien vers
« Qui sommes-nous ? ». Il n'y avait donc rien à écrire, seulement cette structure à reprendre —
ce qui est fait, tranches d'âge comprises.

La phrase d'accroche est la **première phrase de « Qui sommes-nous ? »** : les mots du mouvement,
pas une invention. Le bandeau « ébauche » a disparu.

**Reste possible, si le mouvement le souhaite :** un vrai texte d'accueil, qui n'a jamais existé.
C'est alors une amélioration, plus une reprise — à voir avec l'ETN Communication.

## 3. L'allemand

- Deux pages françaises sans jumelle : `guides-ainees`, `fribourg`.
- Quelques titres de section restés en français dans les pages allemandes (« Le louvetisme » au
  milieu de la page des Wölflinge). C'est dans la source, pas une erreur de reprise.
- Aucune actualité traduite.

**Ne pas traduire à la machine et présenter le résultat comme prêt.** Le vocabulaire scout a des
termes consacrés en allemand. Toute traduction non relue se marque `translated: false`.

## 4. La relecture

La conversion du contenu était automatique. Une personne du mouvement doit lire les pages à
l'écran, en français et en allemand.

Un texte cité sur la page de la dimension européenne **n'a pas été repris** : il n'est attribué à
personne sur l'ancien site. À réintégrer avec son auteur et sa source.

## 5. La carte des implantations — en place

**Je m'étais trompé** en écrivant qu'il n'y avait rien à migrer. La page paraît vide dans la base
parce que la carte n'est pas dans le texte : c'est un **iframe**. En regardant le site en ligne,
c'est un **Google My Maps** que le mouvement tient à jour (`mid=zfTykSxVYwRo.kXJ56xQzar0I`).

Elle est reprise telle quelle, avec **un changement assumé : elle ne se charge qu'au clic.**
Un iframe Google embarqué d'office contacte Google dès l'ouverture de la page — adresse IP et
entête de référence partent avant que le visiteur ait rien fait. Le cahier des charges demande de
veiller à la protection des données, et le public visé, ce sont des parents. Un encart explique
donc ce qui va se passer, et rien ne part tant que la personne n'a pas cliqué.

**À vérifier avec le mouvement :** qui tient cette carte à jour, et sous quel compte Google.
Si le compte se perd, la carte disparaît du site sans prévenir.

## Ce que « terminé » veut dire

- Chaque image a rejoint sa place, ou est écartée pour une raison écrite.
- La page d'accueil a un texte validé par le mouvement.
- L'allemand est complet et relu, ou son report est écrit noir sur blanc.
- Une personne du mouvement a relu les pages et donné son accord.
