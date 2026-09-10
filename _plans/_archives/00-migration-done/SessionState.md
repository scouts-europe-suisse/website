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

## Fait depuis (2026-09-10, suite)

- Toutes les images récupérées **par SSH** (clé installée sur `utk_perki@utk.ftp.infomaniak.com`).
  Neuf publiées après tri sur recadrages à 100 %.
- Redirections circulaires réparées : 27 pages françaises avaient disparu, remplacées par des
  pages « Redirecting to » vers elles-mêmes.
- Sommaires automatiques sur les pages de rubrique.
- `.mcp.json` rendu portable (Windows).

## Règle acquise

**Plus de reprise automatique.** `src/content/` est la référence : on corrige à la main.
Relancer les scripts écraserait le travail de relecture.

**Publication : en attente.** GitHub Pages a été étudié puis écarté pour l'instant — dépôt privé
sur plan gratuit, historique contenant des photos de mineurs, et service en sous-dossier qui
demanderait de préfixer toutes les adresses. Détail dans le plan 01.

## En ligne depuis le 2026-09-10

Aperçu public : **https://scouts-europe-suisse.github.io/website/** (`npm run deploy`).
`www.scouts-europe.ch` n'est pas touché.

**L'historique a été purgé** des images d'origine, et la purge est vérifiée sur un clone frais
(0 blob, dépôt passé de 15 à 3,9 Mo). **Mais GitHub sert encore ces objets par leur empreinte à
toute requête authentifiée** — vérifié, pas supposé. Pour fermer complètement : supprimer et
recréer le dépôt, ou demander à GitHub de purger. Sauvegarde d'avant purge :
`/tmp/ses-avant-purge.bundle`.

## À reprendre ensuite, dans cet ordre

1. **Demander à l'ETN Photo** les autorisations parentales : une réponse décide de 48
   emplacements d'images d'un coup. C'est de loin le plus rentable.
2. **Demander si les deux documents servent encore** (fiche santé 2016, visuel ESPAS).
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
- **Une redirection d'une adresse vers elle-même détruit la page.** Astro génère une page
  « Redirecting to », qui écrase la vraie. Comme les adresses françaises sont conservées, c'est
  le piège central de cette migration : le filtre est dans `urlmap.py`.
- **Le nettoyage de balises avale les commentaires HTML** (`<[^>]+>` prend un commentaire qui ne
  contient pas de `>`). Les repères d'images passent donc par un jeton reconverti à la fin.
- **`slug` est un nom réservé** dans le frontmatter : le chargeur de contenu s'en sert pour
  fabriquer l'identifiant des entrées. D'où `urlPath`.
