# Où on en était — plan 00

**Dernière session :** 2026-09-10, `perkim5 /Users/perki/code/scouts/website`

## Fait dans cette session

- Reprise du contenu depuis l'export de la base (19 pages FR, 17 DE, 19 actualités).
- Adresses par langue, reliées par une clé (`key` dans le frontmatter) ; le sélecteur de langue
  bascule entre deux adresses qui n'ont rien en commun.
- 78 anciennes adresses cartographiées et redirigées.
- Habillage repris de l'identité actuelle (logo, couleurs prélevées, polices hébergées).
- Sources d'origine sorties du dépôt : seules les cartes restent (`url-map.md`,
  `images/README.md`).

## À reprendre ensuite, dans cet ordre

1. **Demander à l'ETN Photo** si les autorisations parentales existent pour les photos où des
   mineurs sont reconnaissables. C'est ce qui débloque le plus de choses d'un coup.
2. **Récupérer les 42 images d'actualités** — doucement, le serveur coupe au-delà d'une
   vingtaine de téléchargements rapprochés. Ne pas les commiter : seules celles publiées entrent
   dans `public/images/`.
3. **Écrire le texte de la page d'accueil** avec l'ETN Communication.
4. **Faire relire les pages** par une personne du mouvement.

## Fichiers à rouvrir pour reprendre le fil

- [`PLAN.md`](PLAN.md) — ce qui reste, en détail.
- [`../../_migrations/url-map.md`](../../_migrations/url-map.md) — la table des adresses.
- [`../../_migrations/images/README.md`](../../_migrations/images/README.md) — l'état de chaque image.
- [`../../_memory/source-site.md`](../../_memory/source-site.md) — ce que contient l'ancien site.

## Points à ne pas réapprendre à la dure

- **L'export de la base ne doit pas entrer dans le dépôt** : il contient 368 messages du
  formulaire de contact et 286 fiches de contact de personnes réelles, plus les bases d'autres
  sites hébergés sur le même compte.
- **Il y a trois WordPress dans cet export.** Le site vivant est celui dont les pages ont été
  modifiées en 2025-2026 ; les deux autres sont une sauvegarde de 2016 et l'ancien « site des
  aînés ».
- **`slug` est un nom réservé** dans le frontmatter : le chargeur de contenu s'en sert pour
  fabriquer l'identifiant des entrées. D'où `urlPath`.
