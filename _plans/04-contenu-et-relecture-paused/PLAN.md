# Plan 04 — Finir le contenu : images, accueil, allemand, relecture

**Responsable :** Perki
**Date :** 2026-09-10
**Demandé par :** Perki
**Portée :** `src/content/`, `public/images/`, la carte des implantations

> **Mis en pause le 2026-09-10, décision de Perki : « on fera ça plus tard ».**
>
> Ce qui reste ne demande plus de technique mais des personnes — un germanophone du mouvement,
> un relecteur, et quelqu'un qui retrouve l'auteur d'un texte. Le report est écrit ici pour
> qu'il compte comme une décision et non comme un oubli : c'est ce que demandait le critère de
> clôture sur l'allemand.

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

Elle est reprise **telle quelle et chargée directement**, comme le faisait l'ancien site
(décision de Perki, 2026-09-10).

**Point noté, pas bloquant :** l'iframe contacte Google dès l'ouverture de la page, donc
l'adresse IP du visiteur part avant qu'il ait rien fait. Le cahier des charges demande de veiller
à la protection des données. Si le sujet revient — par exemple au moment de rédiger une page de
confidentialité — un chargement au clic le règle sans rien changer à la carte.

**À vérifier avec le mouvement :** qui tient cette carte à jour, et sous quel compte Google.
Si le compte se perd, la carte disparaît du site sans prévenir.

## 6. Les introductions des rubriques

**Constaté le 2026-09-11, en comparant les deux sites page par page dans un navigateur.**

Six pages de rubrique n'ont aucun texte à elles : « Notre scoutisme », « Le mouvement » et
« Nous rejoindre », dans les deux langues. Elles affichent le sommaire de leurs sous-pages, ce
qui les rend utilisables, mais rien qui dise au visiteur où il est arrivé.

**Il n'y a rien à reprendre du site actuel : ces introductions n'ont jamais existé.**

| Adresse d'origine | Ce qu'elle fait vraiment |
|---|---|
| `/fr/notre-scoutisme/` | rebondit sur « Qui sommes-nous ? » |
| `/fr/mouvement/` | rebondit sur « Un mouvement suisse » |
| `/fr/nous-rejoindre/` | rebondit sur « Nos implantations » |
| `/de/unsere-pfadfinderschaft/` | page blanche — un titre, rien d'autre |
| `/de/uns-beitreten/` | page blanche — un titre, rien d'autre |
| `/de/die-beweguni/` | recopie mot pour mot sa sous-page « Eine schweizerische Bewegung » |

Les trois adresses françaises ne montrent donc jamais de page de rubrique, et les allemandes sont
des culs-de-sac : un titre, aucun lien vers les sous-pages.

**Ce que ça demande :** que quelqu'un du mouvement écrive ces six textes — trois en français,
trois en allemand. Quelques phrases suffisent : dire ce qu'on trouve dans la rubrique. C'est une
amélioration par rapport au site actuel, pas une reprise. **Ne pas les inventer** : ils parlent
du mouvement.

**Déjà réglé côté technique, à ne pas refaire :**

- Le texte de « Die Bewegung » était le contenu recopié de sa sous-page, pas une introduction. Il
  a été retiré le 2026-09-11 ; il reste entier sur « Eine schweizerische Bewegung ».
- Une rubrique garde son sommaire même une fois l'introduction écrite. Auparavant le premier
  texte écrit l'aurait fait disparaître.
- Ces pages ne sont plus cachées des moteurs de recherche. La marque « à écrire » reste dans leur
  en-tête, comme rappel qu'il manque l'introduction — elle ne cache plus rien.

## Ce que « terminé » veut dire

- Chaque image a rejoint sa place, ou est écartée pour une raison écrite.
- La page d'accueil a un texte validé par le mouvement.
- L'allemand est complet et relu, ou son report est écrit noir sur blanc.
- Une personne du mouvement a relu les pages et donné son accord.
- Les six rubriques ont leur introduction, ou leur absence est assumée par écrit.
