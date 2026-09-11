---
name: secrets-et-configuration
description: Où vivent les identifiants, jetons et secrets (Meta, carte) — jamais dans le dépôt public ; .env local, secrets GitHub posés par un propriétaire.
metadata:
  type: feedback
---

# Secrets et configuration

**Le dépôt est public. Aucun secret, aucun jeton n'y entre, ni dans un commit, ni dans une
issue, ni dans une pull request.** L'historique garde tout, même supprimé ensuite.

## Trois sortes de valeurs

| Sorte | Exemples | Où |
|---|---|---|
| **Publique** | App ID Meta, identifiant de la carte Google, adresses des comptes | Dans le code (`src/data/site.ts`, `.env.example`, scripts) |
| **Secret** | App Secret Meta, jeton de page Facebook | `.env` à la racine, ignoré par git ; secrets GitHub pour les tâches automatiques |
| **Donnée récupérée** | `src/data/implantations.json`, `src/data/instagram.json`, `public/images/instagram/` | Dans le dépôt : ce sont des photographies publiques, commitées |

## Sur un poste

1. Copier `.env.example` en `.env` et remplir. Le fichier est dans `.gitignore`.
2. Les scripts le lisent avec `node --env-file-if-exists=.env …` (c'est ce que font les
   commandes `npm run instagram`, `npm run implantations`).
3. Ne jamais coller une valeur de `.env` dans la conversation avec Claude si on peut
   l'éviter : Claude n'a pas besoin de la lire, seulement de savoir qu'elle est là.

## Pour les tâches automatiques (GitHub Actions)

Les secrets se posent dans le dépôt GitHub : Settings → Secrets and variables → Actions.
**Seul un propriétaire de l'organisation peut le faire** (au 2026-09-11 : francoisbe92 et
perki). Les noms sont les mêmes que dans `.env`.

## Meta (Facebook, Instagram)

- Application « Scoutisme Européen Suisse », App ID 3810353042437212, créée par Nicolas.
- Permissions **en lecture seule** : `pages_show_list`, `pages_read_engagement`,
  `instagram_basic`. On ne demande jamais de permission de publication ni de messagerie.
- Le jeton de page obtenu par `scripts/meta-token.mjs` n'expire pas tant que la personne
  reste administratrice de la page. Si elle quitte ce rôle, refaire la manœuvre avec
  quelqu'un d'autre.
- Le compte Instagram doit être **professionnel** et **relié à la page Facebook** du
  mouvement, sinon l'API ne le voit pas.
- Le navigateur des visiteurs ne parle jamais à Meta : tout est récupéré à la construction.

## Carte des implantations

- Carte Google My Maps du mouvement, `mid=1mLNKImv1_q7I8xmzMt3Nnnb_ulE`, publique.
- `npm run implantations` lit son export KML et écrit `src/data/implantations.json`.
- Qui tient cette carte et sous quel compte : issue #10.

Voir aussi [[conventions]], [[feedback_publication]].
