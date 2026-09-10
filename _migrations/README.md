# Ce qu'on récupère du site actuel

Ce dossier accueille le contenu repris du WordPress de
[www.scouts-europe.ch](https://www.scouts-europe.ch/fr/) : le texte des pages, les images, et
l'inventaire de ce qui existe.

**Il est vide pour l'instant.** La récupération est l'objet du
[plan 03](../_plans/03-migration-contenu-wordpress/PLAN.md).

Organisation prévue :

```
_migrations/
├── contenu/     le texte de chaque page actuelle, en markdown, une page par fichier
├── images/      les images reprises, avec leur auteur et leur licence notés
└── _brut/       ce qui sort tel quel du site (export WordPress, listes d'URL…)
```

Deux règles pour ce dossier :

- **C'est une photographie, pas le site.** Rien ici n'est publié. Le contenu retravaillé part
  dans `src/content/`.
- **Chaque image reprise arrive avec son auteur.** Une image dont on ne sait pas qui l'a prise
  ne se publie pas — et une image où un enfant est reconnaissable ne se publie pas sans
  autorisation des parents. Voir la règle photos dans [`../CLAUDE.md`](../CLAUDE.md).

L'inventaire des adresses et de l'arborescence actuelle est déjà relevé, lui, dans
[`../_memory/source-site.md`](../_memory/source-site.md).
