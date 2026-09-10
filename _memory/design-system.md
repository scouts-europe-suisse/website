---
name: design-system
description: Les couleurs et polices du site, reprises de l'identité actuelle du SES (couleurs prélevées dans le logo, polices Open Sans et Droid Sans hébergées sur place), et ce qui reste à faire quand la charte graphique arrivera.
metadata:
  type: reference
---

# Habillage du site — provisoire jusqu'à la charte

## L'idée

Le cahier des charges SES25 prévoit une **nouvelle charte graphique**, dont le site doit
découler. Cette charte n'existe pas encore. En attendant, le site reprend **l'identité visuelle
actuelle du SES**, relevée le 2026-09-10 : les couleurs du logo et les polices du site
WordPress. Tout est rassemblé en variables CSS **en haut de
[`../src/styles/global.css`](../src/styles/global.css)**.

**Règle :** aucune couleur, aucune taille de police en dur dans une page ou un composant. Tout
passe par ces variables. C'est ce qui permettra de basculer sur la charte définitive en changeant
un seul fichier, sans relire les pages une par une.

C'est l'objet du [plan 02](../_plans/02-charte-graphique/PLAN.md).

## Les couleurs

Elles sont **prélevées pixel par pixel dans les fichiers du logo**, pas approchées à l'œil.
Sources et méthode : [`../_migrations/images/README.md`](../_migrations/images/README.md).

| Variable CSS | Code | Ce que c'est |
|---|---|---|
| `--ses-primary` | `#e3051a` | le rouge de la croix scoute, dans le logo |
| `--ses-primary-text` | `#b30414` | le même rouge assombri, pour le texte et les liens |
| `--ses-gold` | `#f8e900` | le jaune de la fleur de lys |
| `--ses-fg` | `#404040` | le texte courant, repris du site actuel |
| `--ses-bg` | `#f9f9f9` | le fond de page, repris du site actuel |

**Deux pièges de contraste**, déjà traités dans le CSS mais à ne pas défaire :

- **Le rouge du logo ne convient pas au texte sur fond clair.** Il donne 4,6:1, tout juste au
  seuil réglementaire. D'où `--ses-primary-text`, assombri, qui monte à 6,8:1. Le rouge vif reste
  pour les aplats et les bandeaux, où il porte du blanc (4,9:1, ce qui passe).
- **Le jaune de la fleur de lys est illisible en texte** : moins de 1,3:1 sur blanc. Filets,
  puces, soulignements uniquement. Jamais un mot écrit dedans.

## Les couleurs de branche

Elles appartiennent au mouvement et non à la charte : **elles ne changeront pas avec elle.**
Prélevées dans les écussons.

| Branche | Variable CSS | Code |
|---|---|---|
| Louveteaux et louvettes | `--ses-branche-jaune` | `#ead728` |
| Éclaireurs et éclaireuses | `--ses-branche-verte` | `#2c8d1b` |
| Routiers et guides-aînées | `--ses-branche-rouge` | `#ba1b1b` |

## Les polices

Celles du site actuel : **Open Sans** pour le texte courant, **Droid Sans** pour les titres.
Toutes deux sous licence Apache 2.0, qui autorise l'hébergement sur nos propres serveurs.

Elles sont **hébergées dans `public/fonts/`**, pas chargées depuis Google. Une police servie par
Google fait partir l'adresse IP de chaque visiteur chez un tiers — un point que le cahier des
charges demande explicitement de surveiller. Les déclarations sont dans
[`../src/styles/fonts.css`](../src/styles/fonts.css).

Seul le latin est embarqué (le site est en français et en allemand) : 100 Ko en tout, contre
250 Ko avec le cyrillique, le grec et le vietnamien dont personne n'a l'usage ici.

**Un écart assumé avec le site actuel :** le corps de texte passe de 14 à 17 px. Le 14 px du
WordPress est en dessous de ce qui se lit confortablement sur un écran d'aujourd'hui, et le
public visé par le cahier des charges — les parents — n'a pas vingt ans.

## Logo et favicons

Quand le logo définitif sera prêt (croix à huit pointes conservée, texte adapté), déposer dans
`public/` :

| Fichier | À quoi ça sert |
|---|---|
| `favicon.svg` | icône d'onglet, version vectorielle |
| `favicon.ico` | icône d'onglet, navigateurs anciens |
| `favicon-32x32.png` | icône d'onglet, format courant |
| `favicon-512x512.png` | icône quand le site est ajouté à un écran d'accueil |
| `og-image.png` (1200×630) | vignette quand un lien du site est partagé sur les réseaux |
| `images/logo-ses.svg` | le logo affiché dans l'en-tête du site |

**Ce qui est en place :** le logo long du mouvement (`public/images/logo-ses.png`, repris du
site actuel) est dans l'en-tête, et les trois écussons de branche sont sur la page d'accueil.

**Ce qui manque :** une version **carrée** du logo pour l'icône d'onglet. Il n'en existe pas sur
le site actuel, et le logo long est illisible à 32 px. `public/favicon.svg` est donc un
substitut : une croix scoute simplifiée, aux vraies couleurs du logo. À remplacer dès que
l'ETN Multimédia fournit une version carrée. Manquent aussi le `.ico`, les PNG et l'image de
partage `og-image.png`.

**Point ouvert :** le cahier des charges demande de vérifier la légalité de l'usage du drapeau
suisse dans le logo (loi et ordonnance sur la protection des armoiries). À trancher avant toute
mise en ligne.

Voir aussi [[cahier-des-charges]].
