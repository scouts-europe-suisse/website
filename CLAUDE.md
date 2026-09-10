# Scoutisme Européen Suisse — chantier du site internet

Ce dépôt contient le nouveau site public du **Scoutisme Européen Suisse (SES)**, destiné à
remplacer le site WordPress actuel [www.scouts-europe.ch](https://www.scouts-europe.ch/fr/).
Il fait suite au cahier des charges *SES25 — Révision de la charte graphique et du site internet*
(janvier 2025), rangé dans [`_references/`](_references/).

**Public de ce dépôt :** il est utilisé par **plusieurs membres du SES, dont la plupart ne sont
pas développeurs.** Quand tu (Claude) leur parles, parle français, en langage courant. Ne leur
fais pas apprendre git, les branches ou les outils de build : fais ce travail à leur place et
rends compte en termes humains.

> **Langue :** ce dépôt travaille en français. Les échanges avec l'utilisateur, les commits, les
> plans et les notes de `_memory/` sont en français, sauf si l'utilisateur écrit en allemand ou
> en anglais — dans ce cas, réponds dans sa langue.

---

## Au démarrage d'une session

Fais ces vérifications **avant** le travail demandé. Prends les décisions mécaniques toi-même ;
demande à l'utilisateur en français simple quand un vrai choix se pose.

### 1. Identifier l'utilisateur

Le nom de session de la machine est l'identité de l'utilisateur (`whoami`). Utilise-le tel quel
comme suffixe de branche, sans transformation ni recherche d'adresse e-mail.
Exemple : `perki` → branche `work/perki`.

### 2. S'assurer que sa branche est à jour

a. Déterminer la branche attendue : `work/<whoami>` (la créer depuis `main` si elle n'existe pas).
b. Basculer dessus si ce n'est pas déjà le cas.
c. Vérifier si `work/<whoami>` est en retard sur `main`. Si oui, **la mettre à jour
   automatiquement** et l'expliquer en une phrase courte : « J'ai récupéré les dernières
   modifications de l'équipe dans ton travail. »
d. En cas de conflit, s'arrêter et le montrer clairement. Ne jamais résoudre en silence.

*(Le dépôt distant est `scouts-europe-suisse/website` sur GitHub, en privé. Faire un `git fetch`
avant de comparer, et pousser la branche de la personne en fin de session pour que son travail
soit sauvegardé. Voir [`_memory/conventions.md`](_memory/conventions.md).)*

### 3. Montrer sur quoi les autres travaillent

a. Lister les branches `work/*` et l'état de `main`.
b. Pour chaque branche en avance sur `main`, indiquer : de qui il s'agit, la date du dernier
   commit, le sujet des derniers commits.
c. Demander : *« Tu veux voir le détail de l'un de ces travaux ? Je peux te montrer les
   changements ici, ou ouvrir l'aperçu du site dans le navigateur. Ou on passe, et tu commences
   tes propres modifications. »*
d. S'il en choisit un, demander ensuite : *« Tu veux reprendre ces changements dans ton
   travail ? »* Si oui, fusionner cette branche dans la sienne.

### 4. Regarder les plans

Les règles — les états, la ligne `Session:`, comment un plan se ferme — sont dans
**[`_plans/README.md`](_plans/README.md)**. Lis-le. Ci-dessous, uniquement ce qu'il faut *faire*
au démarrage.

**Lis toujours l'état réel dans les noms de dossiers de [`_plans/`](_plans/), jamais dans une
liste recopiée ici.** Une liste écrite en dur dans ce fichier devient fausse dès que quelqu'un
ajoute un plan.

a. **Calcule l'étiquette de cette session** : `scutil --get LocalHostName` suivi du chemin absolu
   du dossier qui contient ce `CLAUDE.md`. Exemple : `perkim5 /Users/perki/code/scouts/website`.
   **Jamais `hostname`** : sous VPN, macOS le remplace par un nom DHCP, et l'étiquette ne
   correspond plus à rien.
b. **Liste ce qui est vivant.** Tout dossier de `_plans/` qui n'est pas `_archives/`. Le suffixe
   dit l'état : `-atwork` en cours, `-paused` arrêté en route, `-later` parqué, `-study` à
   l'étude. Un `XX-` en tête veut dire « en réserve, sans rang ».
c. **Reprends le plan de cette session.** Si un plan `-atwork` porte l'étiquette calculée en (a),
   propose de le continuer, en lisant d'abord son `SessionState.md` s'il en a un. Il est à nous,
   même s'il vient d'une session précédente qui s'est arrêtée.
d. **Préviens si un plan est tenu par une autre session.** Ne le reprends pas sans confirmation
   explicite : quelqu'un est peut-être en plein dedans.
e. **En attente de cet utilisateur ?** Pour chaque plan sans `Session:`, lis la ligne
   `**Responsable :**`. Si elle nomme l'utilisateur, explique-lui en une ou deux phrases simples
   de quoi il s'agit, puis demande s'il veut s'en occuper maintenant ou plus tard.
f. **Terminé mais toujours ouvert ?** Si les critères de « Ce que "terminé" veut dire » semblent
   remplis, **dis-le et demande**. Ne ferme jamais seul.
g. Quand l'utilisateur décide de démarrer, mettre en pause ou fermer un plan, fais la mécanique
   pour lui — renommer le dossier, poser ou retirer la ligne `Session:`, écrire la note de
   résultat, déplacer vers `_archives/` — puis **commite et pousse tout de suite**. C'est une
   exception assumée à « on ne commite pas sans demander », limitée aux fichiers du plan.

### 5. Seulement ensuite — la demande de l'utilisateur

---

## Sauf demande explicite contraire

- **Toujours travailler sur `work/<whoami>`.** Ne jamais commiter directement sur `main`.
  **Une seule exception :** un changement qui ne touche **que** des fichiers de `_plans/`
  (renommage de dossier, ligne `Session:`, note de résultat, archivage) va directement sur `main`
  et se pousse aussitôt, sinon personne d'autre ne voit qui travaille sur quoi.
- **Ne jamais réécrire l'historique de `main`** (pas de force-push, pas de rebase).
- **Ne jamais modifier la branche `work/...` de quelqu'un d'autre.**

Si l'utilisateur demande explicitement de « travailler sur main » ou nomme une autre branche,
cette consigne est levée pour cette session uniquement.

---

## Voir le site en local

C'est la chose que tout le monde ici demandera le plus souvent. Quand l'utilisateur dit
*aperçu*, *montre-moi le site*, *fais tourner le site*, *je veux voir* :

```bash
npm run dev        # http://localhost:4321
```

- Lance le serveur en tâche de fond, puis ouvre l'URL **dans le navigateur Chrome piloté par
  MCP** pour que l'utilisateur n'ait pas à chercher le lien dans un terminal.
- Dis-lui une phrase : *« Le site tourne en local, je te l'ai ouvert dans le navigateur.
  Regarde et dis-moi ce que tu veux changer. »*
- La page se recharge à chaque enregistrement : pendant que tu modifies les fichiers, son
  navigateur se met à jour tout seul.

**Pas de proxy HTTPS ici.** Le serveur de développement est du `http://localhost` simple, sans
`backloop.dev` ni équivalent. Détails : [`_memory/local-dev-and-deploy.md`](_memory/local-dev-and-deploy.md).

---

## Mise en ligne

Le site est publié en **aperçu public** sur GitHub Pages :
**https://scouts-europe-suisse.github.io/website/**

```bash
npm run deploy
```

**Le site officiel du mouvement n'est pas touché.** `www.scouts-europe.ch` tourne toujours sous
WordPress. L'aperçu sert à montrer le travail et à le faire relire. Quand quelqu'un demande à
publier, le lui dire dans ces termes.

**Avant chaque publication**, la règle de fond du chantier s'applique telle quelle : aucune photo
où un mineur est reconnaissable, et rien de personnel dans le dépôt, qui est public. Le détail
est dans [`_memory/feedback_publication.md`](_memory/feedback_publication.md).

## Contenu : bilingue français / allemand

- Le site est bilingue **français (par défaut) et allemand**. Chaque page a une jumelle :
  `src/content/pages/fr/<slug>.md` et `src/content/pages/de/<slug>.md`, même slug des deux côtés.
- **L'allemand du site actuel n'existe pas.** `www.scouts-europe.ch/de/` sert aujourd'hui la page
  française à l'identique. Les pages `de/` d'ici sont donc des ébauches marquées
  `translated: false` dans leur en-tête, à faire relire par un germanophone du mouvement.
- **Ne jamais traduire une page en allemand et la présenter comme validée.** Une traduction
  automatique se marque `translated: false` et se signale à l'utilisateur.
- **N'invente jamais un fait sur le mouvement** — une date, un effectif, un nom de responsable,
  une adresse, un montant. Si l'information manque, laisse le texte en attente et demande.

---

## Images et photos

**Toujours créditer les photos, et ne jamais publier une photo dont la licence est inconnue.**
Les photos du mouvement viennent en majorité de l'ETN Photo. Pour chaque image ajoutée, il faut
savoir qui l'a prise et à quel titre elle est utilisable.

**Point de vigilance particulier au scoutisme : les photos de mineurs.** Une photo où un enfant
est reconnaissable ne se publie pas sans autorisation des parents. En cas de doute, préférer une
image où les visages ne sont pas identifiables, et poser la question à l'utilisateur.

---

## État d'esprit

- **Langage courant, toujours.** « Je récupère les dernières modifications » : oui.
  « Je rebase sur origin/main » : non.
- **Fais les étapes ennuyeuses toi-même**, en silence. Ne fais remonter que les vrais choix.
- **Expose les compromis**, ne les cache pas. Si une action risque de perdre du travail, arrête-toi
  et demande.
- **Ne suppose pas que l'utilisateur se souvient de git.** Quand tu dis « ton travail », sois
  précis : « les modifications que tu as faites hier sur la page contact ».
- **Une question à la fois** quand il y a un arbre de décision.

---

## Ce que contient ce dépôt

| Dossier | Contenu |
|---|---|
| [`_plans/`](_plans/) | Les plans — les vivants à la racine, les terminés dans [`_plans/_archives/`](_plans/_archives/). **Fonctionnement : [`_plans/README.md`](_plans/README.md).** Ne les liste pas ici, le dossier fait foi. |
| [`_memory/`](_memory/) | Règles, conventions, état du chantier. **Lis [`_memory/MEMORY.md`](_memory/MEMORY.md) tôt dans chaque session.** |
| [`_references/`](_references/) | Documents de référence reçus du SES — dont le cahier des charges SES25. |
| [`_migrations/`](_migrations/) | La **carte** de l'ancien site : la table des adresses ([`url-map.md`](_migrations/url-map.md)) et l'inventaire des images. **Pas les fichiers d'origine** : seul ce qui sert au nouveau site entre dans le dépôt. |
| `src/` | Le site lui-même (Astro 5 + Tailwind v4). |
| `public/` | Fichiers servis tels quels : favicon, robots.txt, images. |

Les dossiers préfixés `_` sont la mémoire du chantier : ils restent pendant toute la vie du projet.
