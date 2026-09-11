# Proposition de charte — première version, à discuter

**Date :** 2026-09-10 · **Faite par :** Claude, à la demande de Perki
**Destinataire :** ETN Multimédia

> **Ce n'est pas la charte du mouvement.** C'est une première proposition, appliquée au site pour
> qu'on la voie plutôt que de l'imaginer. Elle est faite pour être changée : tout tient dans une
> vingtaine de variables en haut de [`../../src/styles/global.css`](../../src/styles/global.css).
>
> La charte, elle, reste à établir par l'ETN Multimédia, avec la réflexion de fond que demande le
> cahier des charges — et après avoir contacté l'AGSE.
>
> **Et cette piste-là est sans doute la bonne.** Le SES et l'AGSE sont deux associations de la
> même fédération, l'Union internationale des Guides et Scouts d'Europe. Reprendre ou adapter le
> travail récent de l'AGSE, comme le suggère le cahier des charges, se fait donc entre maisons
> d'une même famille — ce n'est pas emprunter à un tiers. Si cette voie est retenue, la présente
> proposition n'a plus lieu d'être : elle n'existe que pour éviter d'attendre les bras ballants.

## Ce qui n'est pas discutable

Ce n'est pas du graphisme, c'est l'identité du mouvement. Prélevé dans les fichiers du logo :

| | Code | |
|---|---|---|
| Rouge de la croix | `#e3051a` | la couleur du logo |
| Jaune de la fleur de lys | `#f8e900` | idem |
| Branche jaune / verte / rouge | `#ead728` `#2c8d1b` `#ba1b1b` | prélevés dans les écussons |

## Ce que la proposition ajoute

Le cahier des charges demande une palette « en lien avec les valeurs du mouvement : **naturel,
dynamisme, tradition, lien avec la croix scoute** ». Chaque valeur a été traduite en une décision
concrète, pour qu'on puisse en discuter une par une :

| Valeur | Traduction | Variable |
|---|---|---|
| **lien avec la croix scoute** | le rouge du logo reste la couleur principale | `--ses-primary` |
| **naturel** | un vert forêt en second accent, à la place du gris neutre | `--ses-nature` `#2f5d3a` |
| **tradition** | un fond papier chaud plutôt qu'un gris clinique | `--ses-page` `#efece5` |
| **dynamisme** | une encre chaude et contrastée, une hiérarchie nette | `--ses-fg` `#2a2724` |

## Les polices

L'ancien site utilisait **Open Sans** et **Droid Sans**. Droid Sans est abandonnée par son
éditeur depuis des années, et le cahier des charges demande des polices « adaptées à la lecture
sur le web ». La proposition :

- **Titres : Cabin** — une humanist sans, un peu chaleureuse, ni raide ni fantaisiste. Pour une
  institution traditionnelle qui s'adresse à des familles.
- **Texte : Source Sans 3** — dessinée pour la lecture à l'écran, grande hauteur d'x.

Les deux sont sous **licence SIL Open Font**, donc hébergeables sur nos serveurs. Elles le sont :
rien ne part chez Google. 136 Ko au total, latin seul.

## L'accessibilité, vérifiée et pas supposée

Les contrastes ont été calculés, pas jugés à l'œil :

| | Rapport | |
|---|---|---|
| Texte courant sur blanc | 14,9:1 | largement au-dessus du seuil |
| Texte secondaire sur blanc | 5,9:1 | OK |
| Liens sur blanc | 7,1:1 | OK |
| Blanc sur le rouge du logo | 4,9:1 | OK, tout juste |
| Vert nature ↔ blanc | 7,6:1 | OK |
| **Or sur blanc** | **1,3:1** | **inutilisable en texte** |

> **La règle qui en découle : le jaune de la fleur de lys ne porte jamais de texte.** Filets,
> puces, soulignements. Un mot écrit en jaune sur blanc est illisible, y compris pour quelqu'un
> qui voit très bien.

Le rouge du logo à 4,9:1 est juste au-dessus du seuil : il va pour du blanc sur aplat rouge, mais
pas pour du rouge sur fond clair — d'où une variante assombrie (`#b30414`, 7,1:1) réservée au
texte et aux liens.

## Ce qui manque encore

- **Le logo définitif.** La charte doit « conserver la croix à huit pointes en adaptant le texte
  à droite ». Le site porte le logo actuel.
- **La croix suisse** est réglée :
  [`../../_memory/croix-suisse-et-armoiries.md`](../../_memory/croix-suisse-et-armoiries.md).
  Retenir **un carré, jamais un écu.**
- **Les documents types** (circulaires, rapports, signatures d'e-mail, présentations) et le
  **guide de style** : hors site, à faire par l'ETN Multimédia.
- **L'image de partage** `og-image.png` (1200×630).

## Comment revenir en arrière

Tout est dans les variables en haut de `src/styles/global.css`. Remettre les anciennes valeurs
(`--ses-page: #e8e8e8`, `--ses-fg: #404040`, Open Sans / Droid Sans) rend le site à son état
précédent sans toucher à une seule page.
