# Mémoire du chantier — index

Ce dépôt contient le nouveau site du **Scoutisme Européen Suisse**, destiné à remplacer le
WordPress actuel de [www.scouts-europe.ch](https://www.scouts-europe.ch/fr/).
**Lis d'abord [`../CLAUDE.md`](../CLAUDE.md)**, puis fais le rituel de démarrage de session.

## Règles (type « feedback » — ne jamais les enfreindre sans accord explicite de l'utilisateur)

- [feedback_branche_par_personne.md](feedback_branche_par_personne.md) — travailler sur
  `work/<whoami>`. Jamais de commit direct sur `main`, sauf `_plans/`.
- [feedback_rituel_demarrage.md](feedback_rituel_demarrage.md) — synchroniser la branche et
  faire le tour du travail des autres avant toute tâche.
- [feedback_publication.md](feedback_publication.md) — le site est publié en **aperçu public**
  sur GitHub Pages ; `www.scouts-europe.ch` n'est pas touché. Ce qu'il faut vérifier avant
  chaque publication.
- [feedback_faits_du_mouvement.md](feedback_faits_du_mouvement.md) — **ne jamais inventer un
  fait sur le SES** (date, effectif, nom, adresse, montant) ni valider une traduction allemande.

## Conventions et procédures

- [conventions.md](conventions.md) — modèle de branches, organisation des dossiers, public,
  style de communication.
- [local-dev-and-deploy.md](local-dev-and-deploy.md) — faire tourner le site en local
  (`npm run dev`, http://localhost:4321, **sans backloop.dev**), et où en est la question de
  la mise en ligne.
- [design-system.md](design-system.md) — les variables CSS provisoires, les couleurs de branche,
  où déposer logo et favicons quand la charte arrivera.

## Contexte du projet

- [state.md](state.md) — état du chantier. À lire juste après `CLAUDE.md`.
- [source-site.md](source-site.md) — ce que contient le site WordPress actuel : arborescence,
  adresses des pages, état réel de l'allemand.
- [croix-suisse-et-armoiries.md](croix-suisse-et-armoiries.md) — ce que dit la loi sur la croix
  suisse dans le logo : **un carré oui, un écu non**. Réponse au point de vigilance du SES25.
- [cahier-des-charges.md](cahier-des-charges.md) — ce que demande le document SES25 de
  janvier 2025, en résumé, et ce qui en découle pour ce dépôt.
