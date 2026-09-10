# Site du Scoutisme Européen Suisse

Le nouveau site public du SES, destiné à remplacer le WordPress actuel de
[www.scouts-europe.ch](https://www.scouts-europe.ch/fr/).

**Si vous venez juste d'arriver ici, la réponse courte : ouvrez Claude Code dans ce dossier et
dites-lui ce que vous voulez faire, en français.** Tout ce qui suit, il le fera pour vous.

## Voir le site sur votre ordinateur

```bash
npm install     # la première fois seulement
npm run dev     # puis ouvrez http://localhost:4321
```

La page se recharge toute seule à chaque modification.

## Comment c'est organisé

| Dossier | Contenu |
|---|---|
| `src/content/` | **Le texte des pages.** C'est ici qu'on écrit. Un fichier = une page. |
| `src/pages/` | Les gabarits qui transforment ces fichiers en pages du site. |
| `src/styles/` | Les couleurs et les polices, en attendant la charte graphique. |
| `public/` | Ce qui est servi tel quel : logo, favicon, images. |
| `_plans/` | Les travaux en cours ou à faire. Voir `_plans/README.md`. |
| `_memory/` | Les règles et l'état du chantier. Voir `_memory/MEMORY.md`. |
| `_references/` | Les documents reçus du SES, dont le cahier des charges. |
| `_migrations/` | Ce qu'on récupère de l'ancien site. |

`CLAUDE.md` est le mode d'emploi destiné à Claude : il n'y a pas besoin de le lire pour
travailler ici.

## L'état du chantier, en trois phrases

Le squelette du site existe : toutes les pages du menu, en français et en allemand, avec les
mêmes adresses qu'aujourd'hui. **Le contenu reste à reprendre** de l'ancien site, et l'allemand
est entièrement à écrire — la version allemande actuelle n'existe pas, `/de/` sert la page
française.

**Le site n'est pas en ligne et ne peut pas l'être depuis ici** : l'hébergement n'est pas encore
choisi. L'ancien site continue de tourner normalement.

Détail complet : [`_memory/state.md`](_memory/state.md).
