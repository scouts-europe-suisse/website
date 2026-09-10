---
name: ecrire-une-page
description: Comment écrire ou modifier une page et une actualité — les champs d'en-tête, l'appariement français/allemand, les images. Guide pour quelqu'un qui n'est pas développeur.
metadata:
  type: reference
---

# Écrire une page

Le texte du site vit dans `src/content/`. **Un fichier = une page.** Ce sont de simples fichiers
texte : on peut les ouvrir dans n'importe quel éditeur.

```
src/content/
├── pages/fr/    les pages en français
├── pages/de/    les mêmes pages en allemand
└── news/fr/     les actualités
```

## L'en-tête du fichier

Chaque fichier commence par un bloc entre deux lignes `---`. C'est là que se règlent le titre,
l'adresse et le reste. Exemple réel :

```markdown
---
title: "Louveteaux et louvettes — 8-12 ans"
urlPath: branche-jaune
key: branche-jaune
branche: jaune
---

Le texte de la page commence ici, en markdown.
```

### Les champs

| Champ | À quoi ça sert |
|---|---|
| `title` | Le titre affiché en haut de la page et dans l'onglet du navigateur. **Obligatoire.** |
| `urlPath` | **L'adresse de la page**, après `/fr/` ou `/de/`. **Obligatoire.** |
| `key` | **L'identifiant qui relie la page à sa jumelle dans l'autre langue.** **Obligatoire.** |
| `description` | Résumé d'une ou deux phrases, affiché par Google et lors d'un partage. |
| `cover` | Image affichée en haut de la page, ex. `/images/chapelle-montagne.jpg`. |
| `coverAlt` | Ce que montre cette image, pour qui ne la voit pas. |
| `draft` | `true` = la page porte un bandeau « ébauche » et n'est pas indexée. |
| `translated` | Sur une page allemande, `false` = traduction pas encore relue. |
| `branche` | `jaune`, `verte` ou `rouge` : donne à la page la couleur de sa branche. |
| `map` | `true` = affiche la carte des implantations. |
| `contactForm` | `true` = affiche le bloc « nous écrire ». |
| `sourceModified` | Date de la dernière modification sur l'ancien site. Se retire quand la page est reprise en main. |

### Les deux pièges à connaître

**1. Le champ s'appelle `urlPath`, jamais `slug`.** `slug` est un nom réservé : le moteur du site
s'en sert en interne, et deux pages finiraient par s'écraser l'une l'autre.

**2. `key` doit être identique dans les deux langues.** C'est lui, et lui seul, qui relie
`pages/fr/branche-jaune.md` à `pages/de/branche-jaune.md`. Les adresses, elles, diffèrent —
`/fr/branche-jaune/` et `/de/woelflingsstufe/` — et c'est voulu : un lecteur germanophone n'a pas
à naviguer dans des adresses françaises. Si les deux `key` ne correspondent pas, le sélecteur de
langue renvoie à l'accueil au lieu de la bonne page.

## Changer le texte d'une page

Ouvrir le fichier, modifier le texte sous l'en-tête, enregistrer. C'est du **markdown** :

```markdown
## Un titre de section

Un paragraphe ordinaire. Du **gras**, de l'*italique*,
un [lien vers une autre page](/fr/nous-rejoindre/).

- une liste
- à puces

![Ce que montre la photo](/images/nom-du-fichier.jpg)
```

## Ajouter une page

1. Créer le fichier dans `src/content/pages/fr/`, avec `title`, `urlPath` et `key`.
2. Créer sa jumelle dans `pages/de/`, **avec le même `key`**.
3. Pour qu'elle apparaisse au menu, ajouter son `key` dans `src/data/site.ts`.

## Ajouter une actualité

Un fichier dans `src/content/news/fr/`. Le nom du fichier devient l'adresse.

```markdown
---
title: "Week-end national, octobre 2026"
date: 2026-10-12
summary: "Une phrase qui donne envie de lire."
---
```

`draft: true` la garde invisible tant qu'elle n'est pas prête.

## Les images

Les images publiées sont dans `public/images/`. On y renvoie par `/images/nom-du-fichier.jpg`.

> **La règle qui ne se discute pas : aucune photo n'est mise en ligne sans autorisation.**
> Les photos qui étaient publiées sur l'ancien site sont couvertes ; une photo qui n'a jamais été
> en ligne ne l'est pas. Ça vaut surtout dès qu'un enfant est reconnaissable.
> État de chaque image : [`../_migrations/images/README.md`](../_migrations/images/README.md).

Une image lourde ralentit le site sur un téléphone. Avant d'en ajouter une, la redimensionner à
1200 pixels de large environ.

## Voir le résultat

```bash
npm run dev     # http://localhost:4321, se recharge à chaque enregistrement
```

Si le site refuse de démarrer après une modification d'en-tête, c'est presque toujours un champ
obligatoire manquant ou une faute dans son nom. Le message d'erreur nomme le fichier fautif.

Voir aussi [[conventions]], [[feedback_publication]].
