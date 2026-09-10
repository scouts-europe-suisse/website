---
name: design-system
description: Les variables CSS provisoires du site, les couleurs de branche (jaune/verte/rouge), et où déposer logo et favicons quand la charte graphique arrivera.
metadata:
  type: reference
---

# Habillage du site — provisoire jusqu'à la charte

## L'idée

Le cahier des charges SES25 prévoit une **nouvelle charte graphique**, dont le site doit
découler. Cette charte n'existe pas encore. Le site est donc construit sur un jeu de variables
CSS rassemblées **en haut de [`../src/styles/global.css`](../src/styles/global.css)** : couleurs,
polices, échelle de titres, espacements.

**Règle :** aucune couleur, aucune taille de police en dur dans une page ou un composant. Tout
passe par ces variables. C'est ce qui permettra de basculer sur la charte définitive en changeant
un seul fichier, sans relire les pages une par une.

C'est l'objet du [plan 02](../_plans/02-charte-graphique/PLAN.md).

## Ce qui est provisoire, ce qui ne l'est pas

**Provisoire** (à remplacer quand la charte arrive) : la couleur principale, la couleur
secondaire, les nuances de gris, les polices, l'échelle typographique.

**Pas provisoire** : les **couleurs des trois branches**, qui appartiennent au mouvement et non à
la charte :

| Branche | Variable CSS | Usage |
|---|---|---|
| Louveteaux et louvettes | `--ses-branche-jaune` | pages et éléments de la branche jaune |
| Éclaireurs et éclaireuses | `--ses-branche-verte` | branche verte |
| Routiers et guides-aînées | `--ses-branche-rouge` | branche rouge |

Ces trois couleurs servent d'accent sur les pages de branche. Les valeurs exactes restent à
caler sur les référentiels du mouvement — ce sont les *rôles* qui sont fixés, pas encore les
codes hexadécimaux.

## Polices

Pour l'instant, la pile de polices système (celle du téléphone ou de l'ordinateur du visiteur).
C'est rapide, ça ne dépend d'aucun service extérieur, et ça ne pose aucune question de
protection des données — contrairement aux polices chargées depuis Google Fonts, qui font partir
l'adresse IP du visiteur chez un tiers. Si la charte impose des polices spécifiques, il faudra
les **héberger dans `public/fonts/`**, pas les charger depuis un service externe.

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

Ceux présents aujourd'hui sont des **substituts** : une croix à huit pointes très simplifiée,
en attente du vrai logo. Ils permettent au site de ne pas afficher de case vide, rien de plus.

**Point ouvert :** le cahier des charges demande de vérifier la légalité de l'usage du drapeau
suisse dans le logo (loi et ordonnance sur la protection des armoiries). À trancher avant toute
mise en ligne.

Voir aussi [[cahier-des-charges]].
