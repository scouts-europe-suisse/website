# Ce qu'on récupère du site actuel

Ce dossier accueille le contenu repris du WordPress de
[www.scouts-europe.ch](https://www.scouts-europe.ch/fr/) : le texte des pages, les images, et
l'inventaire de ce qui existe.

La reprise du texte est faite (2026-09-10) : elle est partie de l'**export de la base de
données** de l'hébergeur, pas du site affiché. C'est ce qui a permis de retrouver les pages
allemandes, invisibles sur le site. Voir [`../_memory/source-site.md`](../_memory/source-site.md).

```
_migrations/
└── images/      les images du site actuel, allégées, avec leur inventaire
    └── contenu/ celles qui apparaissent dans le corps des pages
```

## ⚠ L'export de la base ne doit pas entrer dans ce dépôt

L'export fourni par l'hébergeur (`utk_myd_infomaniak_com.sql`, 121 Mo) est resté **en dehors du
dépôt**, et doit y rester. Ce n'est pas une précaution de principe :

- il contient **368 messages reçus par le formulaire de contact** et **286 fiches de contact** —
  des noms, des adresses e-mail et des messages de personnes réelles, souvent des parents ;
- il contient **les bases d'autres sites et d'autres applications** hébergés sur le même compte,
  dont des tables qui ressemblent à des annuaires de membres ;
- ce qui entre dans l'historique de git y reste, même supprimé ensuite.

Seuls le **texte des pages publiques** et les **images** en ont été tirés. Rien d'autre.

Si quelqu'un a besoin de refaire une extraction, il travaille sur le fichier là où il est, dans
son dossier de téléchargement, et n'en copie ici que le résultat.

Deux règles pour ce dossier :

- **C'est une photographie, pas le site.** Rien ici n'est publié. Le contenu retravaillé part
  dans `src/content/`.
- **Chaque image reprise arrive avec son auteur.** Une image dont on ne sait pas qui l'a prise
  ne se publie pas — et une image où un enfant est reconnaissable ne se publie pas sans
  autorisation des parents. Voir la règle photos dans [`../CLAUDE.md`](../CLAUDE.md).

L'inventaire des adresses et de l'arborescence actuelle est déjà relevé, lui, dans
[`../_memory/source-site.md`](../_memory/source-site.md).
