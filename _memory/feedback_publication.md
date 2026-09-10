---
name: feedback_publication
description: Le site est publié sur GitHub Pages. Ce qu'il faut vérifier avant chaque mise en ligne, et pourquoi ce n'est pas encore le site officiel.
metadata:
  type: feedback
---

# Publier le site

Le site est en ligne à **https://scouts-europe-suisse.github.io/website/**, servi par GitHub
Pages depuis la branche `gh-pages`.

```bash
npm run deploy
```

## Ce n'est PAS encore le site officiel

`www.scouts-europe.ch` continue de tourner sous WordPress et n'est pas touché. L'adresse
ci-dessus est un **aperçu public** : elle sert à montrer le travail au mouvement et à le relire
en conditions réelles. La bascule du vrai domaine reste à décider —
[plan 01](../_plans/01-domaine-et-bascule-later/PLAN.md).

**Conséquence à dire à l'utilisateur** quand il demande à publier : « Je mets à jour l'aperçu.
Le site officiel du mouvement n'est pas touché. »

## Avant chaque publication

**C'est public.** N'importe qui peut ouvrir l'adresse. Donc, à chaque fois :

1. **Aucune photo où un mineur est reconnaissable** ne doit être passée en ligne sans que les
   autorisations parentales aient été confirmées. C'est la règle de fond du chantier, et elle ne
   se relâche pas parce qu'il s'agit d'un aperçu. Voir
   [`../_migrations/images/README.md`](../_migrations/images/README.md).
2. **Rien de personnel dans le dépôt.** Le dépôt est public : messages du formulaire de contact,
   fiches de membres, exports de base — jamais.
3. **Le script refuse de publier** si une adresse absolue a échappé au préfixe du sous-dossier.
   Ne pas contourner ce garde-fou : il attrape exactement le genre d'erreur qui ne se voit pas en
   local, où tout marche.

## L'historique du dépôt — clos

L'historique a été purgé des images d'origine le 2026-09-10, et la purge vérifiée sur un clone
frais. Reste que GitHub sert encore ces objets, par leur empreinte, à une requête authentifiée :
seule la suppression-recréation du dépôt l'effacerait côté serveur.

**Décision de Perki, 2026-09-10 : on en reste là.** Le sujet est clos, il n'y a pas à le
rouvrir. Ce qui compte pour la suite est plus simple : **ce dépôt est public, donc rien de
personnel n'y entre**, et ce qui y entre une fois y reste.

## Le sous-dossier

GitHub Pages sert un dépôt de projet depuis `/<nom-du-depot>/`, d'où `/website/` dans l'adresse.
Le site sait tourner aux deux endroits : le jour où il prend le domaine du mouvement, on retire
`SITE_URL` et `BASE_PATH` du script et rien d'autre ne bouge. Détails et commande de contrôle :
[local-dev-and-deploy.md](local-dev-and-deploy.md).

## Revenir en arrière

La branche `gh-pages` garde l'historique des publications :

```bash
cd dist && git revert HEAD --no-edit && git push origin gh-pages
```

Voir aussi [[local-dev-and-deploy]].
