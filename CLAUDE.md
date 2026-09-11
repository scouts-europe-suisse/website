# Scoutisme Européen Suisse — chantier du site internet

Ce dépôt contient le nouveau site public du **Scoutisme Européen Suisse (SES)**, destiné à
remplacer le site WordPress actuel [www.scouts-europe.ch](https://www.scouts-europe.ch/fr/).
Il fait suite au cahier des charges *SES25 — Révision de la charte graphique et du site internet*
(janvier 2025), rangé dans [`_references/`](_references/).

**Public de ce dépôt :** il est utilisé par **plusieurs membres du SES, dont la plupart ne sont
pas développeurs.** Quand tu (Claude) leur parles, parle français, en langage courant. Ne leur
fais pas apprendre git, les branches ou les outils de build : fais ce travail à leur place et
rends compte en termes humains.

**Il n'y a pas de CMS, et il n'y en aura pas : c'est toi le CMS.** Chaque contributeur a un
accès GitHub et Claude. Tout ce qui change sur le site (un texte, une image, une page, un bug,
un choix) passe par **une issue GitHub**, puis par une branche, une pull request et une
publication. Le fonctionnement est décrit plus bas, dans « Travailler par issues ». Il vient du
plan 05 ([`_plans/`](_plans/)), décidé le 2026-09-11.

> **Langue :** ce dépôt travaille en français. Les échanges avec l'utilisateur, les commits, les
> issues, les plans et les notes de `_memory/` sont en français, sauf si l'utilisateur écrit en
> allemand ou en anglais — dans ce cas, réponds dans sa langue.

---

## Quelqu'un arrive pour la première fois

Si la personne dit qu'elle débute, que rien n'est installé, ou si une commande échoue parce qu'un
outil manque : **c'est à toi de mettre la machine en état, pas à elle.** Elle n'est pas
développeuse et n'a pas à taper de commandes. Fais-le, et dis ce que tu fais en une ligne par
étape, sans jargon.

Ce qu'il faut, dans l'ordre, en vérifiant avant d'installer :

| | Vérifier | Installer si absent (Windows) | Installer si absent (macOS) |
|---|---|---|---|
| Node 20+ | `node --version` | `winget install OpenJS.NodeJS.LTS` | `brew install node` |
| Git | `git --version` | `winget install Git.Git` | `brew install git` |
| GitHub CLI | `gh --version` | `winget install GitHub.cli` | `brew install gh` |

**Après une installation sous Windows, le terminal en cours ne voit pas encore le nouveau
programme.** Préviens-la : il faut fermer la fenêtre et la rouvrir. Ce n'est pas une panne.

Ensuite :

1. **L'accès GitHub** — `gh auth status`. Si elle n'est pas connectée, lance `gh auth login` et
   accompagne-la : cette étape passe par le navigateur et c'est elle qui doit la faire.
2. **Récupérer le site** — `gh repo clone scouts-europe-suisse/website`, puis entrer dedans.
3. **L'identité git** — si `git config user.name` ou `user.email` est vide, demande-lui son nom
   et son e-mail et pose-les. Sans ça, ses modifications n'ont pas d'auteur.
4. **Préparer** — `npm install`. Si npm signale des scripts d'installation en attente
   (`allow-scripts`), les approuver : sans eux, le site ne se construit pas.
5. **Le navigateur piloté** — vérifie que le serveur MCP déclaré dans `.mcp.json` démarre bien
   sur ce système ; c'est lui qui te permet de montrer le site. Le premier lancement télécharge
   le paquet et peut prendre une minute : ce n'est pas une panne. **Sous Windows uniquement**, si
   le serveur refuse de démarrer, `npx` doit être enveloppé dans `cmd /c` — la variante exacte
   est dans [`_memory/navigateur-mcp.md`](_memory/navigateur-mcp.md).
   **Si tu modifies `.mcp.json`, dis-lui de fermer Claude et de le rouvrir** : les serveurs MCP
   ne sont chargés qu'au démarrage, donc la correction reste sans effet tant que la session n'a
   pas été relancée.
6. **Montrer** — `npm run dev` en tâche de fond, puis ouvre http://localhost:4321 dans le
   navigateur. C'est le moment où elle voit que ça marche : ne le saute pas.
7. **Puis seulement**, faire le rituel de démarrage ci-dessous.

Si `brew` manque sous macOS, propose l'installation depuis brew.sh, ou les programmes
d'installation de nodejs.org et git-scm.com — au choix, sans en faire une affaire.

Le guide qu'elle a peut-être suivi est [`DEMARRER.md`](DEMARRER.md) : il s'arrête volontairement
là où tu prends la main.

## Au démarrage d'une session

Fais ces vérifications **avant** le travail demandé. Prends les décisions mécaniques toi-même ;
demande à l'utilisateur en français simple quand un vrai choix se pose.

### 1. Identifier l'utilisateur

Le nom de session de la machine (`whoami`) et le compte GitHub (`gh api user --jq .login`)
identifient l'utilisateur. Le compte GitHub sert à retrouver « ses » issues.

### 2. Ouvrir le site, tout de suite

**Avant de faire le ménage, montre le site.** C'est ce que la personne est venue voir, et ça lui
donne un repère pendant que tu fais le reste. Ne remets pas ça à la fin.

a. **Le lancer s'il ne tourne pas** : `npm run dev` en tâche de fond (http://localhost:4321).
   Si le port est déjà pris, c'est qu'il tourne déjà : ne pas en relancer un second.
b. **L'ouvrir dans un navigateur piloté** — celui de `.mcp.json` — pour pouvoir ensuite le
   regarder toi-même, y vérifier une page, prendre une capture.
c. **Si aucun navigateur piloté n'est disponible** (serveur MCP absent, en panne, ou pas encore
   chargé), **ouvre-le dans le navigateur ordinaire du poste.** Mieux vaut la personne qui voit
   son site que la perfection technique :

   | Système | Commande |
   |---|---|
   | macOS | `open http://localhost:4321/fr/` |
   | Windows | `start "" http://localhost:4321/fr/` |
   | Linux | `xdg-open http://localhost:4321/fr/` |

   Dans ce cas, dis-le : tu ne pourras pas regarder les pages toi-même tant que le navigateur
   piloté n'est pas rétabli — voir [`_memory/navigateur-mcp.md`](_memory/navigateur-mcp.md).
d. **Une phrase, pas un rapport** : « Le site tourne, je te l'ai ouvert. »

### 3. Mettre le dépôt à jour

a. `git fetch --prune`, puis se placer sur `main` à jour si aucune branche d'issue n'est en
   cours pour cette personne.
b. Si une branche `issue/…` ou `lot/…` a des changements non commités ou non poussés, le dire :
   « Tu avais commencé l'issue #NN, on la reprend ? »
c. En cas de conflit, s'arrêter et le montrer clairement. Ne jamais résoudre en silence.

### 4. Regarder les issues

**C'est le cœur du fonctionnement.** `gh issue list --limit 100`, puis :

a. Les issues **`état: en cours`** : de qui, depuis quand, sur quelle branche. Si l'une est à
   cette personne, proposer de la continuer.
b. Les issues **`état: à tester`** : proposer de faire la vérification (voir le cycle).
c. Les issues **`état: prêt`**, par priorité : proposer d'en prendre une.
d. Les issues **`état: à trier`** : les qualifier (type, zone, langue, priorité, plan) et les
   passer en `prêt`, ou poser la question qui manque en commentaire.
e. Les issues **`type: décision`** avec un commentaire « Décision : … » : reporter la décision
   dans le plan concerné, changer l'étiquette, et débloquer ce qui l'attendait.

Résumer en trois ou quatre lignes, pas plus : « Tu as une issue en cours, deux sont prêtes, une
attend une décision de quelqu'un. Tu veux reprendre la tienne ? »

### 5. Regarder les plans

Les règles — les états, la ligne `Session:`, comment un plan se ferme — sont dans
**[`_plans/README.md`](_plans/README.md)**. Lis-le. Ci-dessous, uniquement ce qu'il faut *faire*
au démarrage.

**Lis toujours l'état réel dans les noms de dossiers de [`_plans/`](_plans/), jamais dans une
liste recopiée ici.** Une liste écrite en dur dans ce fichier devient fausse dès que quelqu'un
ajoute un plan.

a. **Calcule l'étiquette de cette session** : `scutil --get LocalHostName` (macOS) ou `hostname`
   (Windows, Linux), suivi du chemin absolu du dossier qui contient ce `CLAUDE.md`. Exemple :
   `perkim5 /Users/perki/code/scouts/website`. **Jamais `hostname` sous macOS** : sous VPN, il
   est remplacé par un nom DHCP.
b. **Liste ce qui est vivant.** Tout dossier de `_plans/` qui n'est pas `_archives/`. Le suffixe
   dit l'état : `-atwork` en cours, `-paused` arrêté en route, `-later` parqué, `-study` à
   l'étude. Un `XX-` en tête veut dire « en réserve, sans rang ».
c. **Reprends le plan de cette session.** Si un plan `-atwork` porte l'étiquette calculée en (a),
   propose de le continuer, en lisant d'abord son `SessionState.md` s'il en a un.
d. **Préviens si un plan est tenu par une autre session.** Ne le reprends pas sans confirmation
   explicite.
e. **En attente de cet utilisateur ?** Pour chaque plan sans `Session:`, lis la ligne
   `**Responsable :**`. Si elle nomme l'utilisateur, explique-lui en une ou deux phrases de quoi
   il s'agit, puis demande s'il veut s'en occuper maintenant ou plus tard.
f. **Terminé mais toujours ouvert ?** Si les critères de « Ce que "terminé" veut dire » semblent
   remplis, **dis-le et demande**. Ne ferme jamais seul.
g. Quand l'utilisateur décide de démarrer, mettre en pause ou fermer un plan, fais la mécanique
   pour lui, puis **commite et pousse tout de suite**, directement sur `main`. C'est l'exception
   assumée, limitée aux fichiers de `_plans/`.

### 6. Seulement ensuite — la demande de l'utilisateur

---

## Travailler par issues

**Toute modification, ajout, suppression, remarque ou objectif fait l'objet d'une issue
GitHub, une par sujet.** Si l'utilisateur te demande un changement sans issue, **crée l'issue
d'abord**, avec ses mots, puis travaille dessus. Il n'a rien à faire sur GitHub s'il ne veut pas :
tu t'en charges avec `gh`.

### Les étiquettes

Six familles, toutes posées sur GitHub. Une issue qualifiée porte au moins type, priorité, état
et plan.

| Famille | Valeurs |
|---|---|
| `type:` | contenu, visuel, technique, bug, décision, **charte** (voir le gel) |
| `zone:` | global, accueil, notre-scoutisme, mouvement, actualités, nous-rejoindre, contact, carrick |
| `langue:` | fr, de |
| `priorité:` | bloquant, haute, normale, basse |
| `état:` | à trier, prêt, en cours, à tester, testé, bloqué |
| `plan:` | le plan de rattachement (01, 04, 05, XX…) |

Les modèles d'issue dans `.github/ISSUE_TEMPLATE/` posent le type et `état: à trier` tout
seuls.

### Le cycle d'une issue

1. **Créer** (modèle ou `gh issue create`). Naît en `état: à trier`.
2. **Qualifier** : type, zone, langue, priorité, plan. Passe en `état: prêt`.
3. **Prendre** : `gh issue edit NN --add-assignee @me`, étiquette `état: en cours`, branche
   **`issue/NN-mot-clef`** créée depuis `main` à jour. Plusieurs issues semblables peuvent
   partager une branche **`lot/NN-NN-mot-clef`**.
4. **Faire**, en petits commits dont le message cite l'issue (`#NN`) et explique le pourquoi.
5. **Ouvrir la pull request** vers `main` (`gh pr create --fill`) : le modèle contient la liste
   de vérification. Passer l'issue en `état: à tester`.
6. **Tester** : dérouler la liste, joindre les captures, cocher. Celui qui vérifie passe
   l'issue en `état: testé`. **La même personne peut faire et tester**, à condition de dérouler
   réellement la liste. Une seule personne suffit pour tout : c'est la règle du chantier, sans
   collégialité.
7. **Fusionner** (`gh pr merge --squash --delete-branch`). L'issue se ferme. Mettre à jour la
   section « Issues » du plan concerné dans le même mouvement.
8. **Publier** : dès que l'issue #4 est faite, la fusion sur `main` publie l'aperçu toute
   seule. En attendant, `npm run deploy` depuis `main` à jour, après la fusion.

### Ce que « testé » veut dire

Le site se construit sans erreur ; la page est vue en français **et** en allemand, sur
ordinateur **et** en vue étroite ; aucun lien mort, aucune image manquante ; captures jointes
pour tout changement visible ; aucune photo sans autorisation, aucun fait inventé. Ne pas
alourdir au-delà : c'est une liste, pas une procédure.

### Plans et issues : les deux restent cohérents

- Un plan dit **le pourquoi et le cap** ; une issue dit **une action unitaire**.
- Chaque issue porte `plan: NN`. Chaque `PLAN.md` a une section **« Issues »** listant les
  siennes avec leur état. **Tu la mets à jour à chaque changement d'état d'issue**, dans un
  commit `_plans/` direct sur `main`.
- Les décisions se prennent **dans l'issue** (commentaire « Décision : … », signé) et sont
  recopiées dans le tableau du plan. Une décision non écrite n'existe pas.
- Un plan ne se ferme que quand toutes ses issues sont fermées, ou reportées par écrit.

### Le gel du design

Quand le plan 05 aura validé la charte et le système de composants, **`src/styles/`,
`src/layouts/` et `src/components/` sont gelés.** Toute modification demande :

1. une issue `type: charte` qui dit ce qui change et pourquoi ;
2. un commentaire « **Accord :** … » signé par une personne (une seule suffit) ;
3. la mention de cette issue dans la pull request.

Sans ces trois choses, **refuse de toucher à ces dossiers**, même si on te le demande
gentiment, et propose d'ouvrir l'issue. Les contenus, eux, se modifient librement par issue.
Tant que le plan 05 n'a pas prononcé le gel, cette règle ne s'applique pas encore.

---

## Sauf demande explicite contraire

- **Une branche par issue**, créée depuis `main`. Jamais de commit direct sur `main`, sauf un
  changement qui ne touche **que** `_plans/` (état d'un plan, section « Issues »).
- **`work/<whoami>`** reste possible pour explorer sans issue, mais rien n'en part vers `main`
  sans passer par une issue et une pull request.
- **Ne jamais réécrire l'historique de `main`** (pas de force-push, pas de rebase).
- **Ne jamais modifier la branche de quelqu'un d'autre.**
- **Ne jamais fusionner une pull request dont la liste de vérification n'est pas déroulée.**

**Limite connue :** les comptes contributeurs n'ont pas les droits d'administration sur le dépôt.
Il n'y a donc pas de protection de branche : ces règles tiennent parce que tu les appliques.

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
- La recherche ne marche pas en `npm run dev` : `npm run build && npm run preview` pour l'essayer.

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
publier, le lui dire dans ces termes. La bascule et l'hébergeur sont les issues #1 et #2.

**Avant chaque publication**, la règle de fond du chantier s'applique telle quelle : aucune photo
où un mineur est reconnaissable sans autorisation, et rien de personnel dans le dépôt, qui est
public. Le détail est dans [`_memory/feedback_publication.md`](_memory/feedback_publication.md).
Le script refuse de publier si une page a perdu sa mention « ne pas indexer » ou si une adresse a
échappé au préfixe : ne contourne jamais ces refus.

## Contenu : bilingue français / allemand

- Le site est bilingue **français (par défaut) et allemand**. Chaque page a une jumelle :
  `src/content/pages/fr/<slug>.md` et `src/content/pages/de/<slug>.md`, reliées par le même
  `key`. Comment écrire une page : [`_memory/ecrire-une-page.md`](_memory/ecrire-une-page.md).
- **Décision du 2026-09-11 :** tous les contenus existent dans les deux langues. Pendant la
  refonte, une traduction faite par Claude est **acceptée par défaut**, mais marquée
  `translated: false` pour qu'on sache qu'aucun germanophone n'est passé. En production, la
  validation reprendra au cas par cas.
- **N'invente jamais un fait sur le mouvement** — une date, un effectif, un nom de responsable,
  une adresse, un montant. Si l'information manque, laisse le texte en attente et pose la
  question dans l'issue.

---

## Images et photos

**Toujours créditer les photos, et ne jamais publier une photo dont la licence est inconnue.**
Les photos de l'ancien site sont couvertes (confirmé par Perki le 2026-09-10). Les photos des
comptes Facebook et Instagram du mouvement peuvent être reprises (décision du 2026-09-11), avec
leur provenance notée dans l'issue. **Aucune image générée par IA.**

**Point de vigilance particulier au scoutisme : les photos de mineurs.** Une photo où un enfant
est reconnaissable ne se publie pas sans autorisation des parents. En cas de doute, préférer une
image où les visages ne sont pas identifiables, et poser la question dans l'issue.

---

## État d'esprit

- **Langage courant, toujours.** « Je récupère les dernières modifications » : oui.
  « Je rebase sur origin/main » : non.
- **Fais les étapes ennuyeuses toi-même**, en silence : créer l'issue, la branche, la pull
  request, mettre les étiquettes. Ne fais remonter que les vrais choix.
- **Expose les compromis**, ne les cache pas. Si une action risque de perdre du travail, arrête-toi
  et demande.
- **Ne suppose pas que l'utilisateur se souvient de git.** Quand tu dis « ton travail », sois
  précis : « l'issue #12, la page contact ».
- **Une question à la fois** quand il y a un arbre de décision.

---

## Ce que contient ce dépôt

| Dossier | Contenu |
|---|---|
| [`_plans/`](_plans/) | Les plans — les vivants à la racine, les terminés dans [`_plans/_archives/`](_plans/_archives/). **Fonctionnement : [`_plans/README.md`](_plans/README.md).** Ne les liste pas ici, le dossier fait foi. |
| [`_memory/`](_memory/) | Règles, conventions, état du chantier. **Lis [`_memory/MEMORY.md`](_memory/MEMORY.md) tôt dans chaque session.** |
| [`_references/`](_references/) | Documents de référence reçus du SES — dont le cahier des charges SES25. |
| [`_migrations/`](_migrations/) | La **carte** de l'ancien site : la table des adresses ([`url-map.md`](_migrations/url-map.md)) et l'inventaire des images. **Pas les fichiers d'origine.** |
| `.github/` | Modèles d'issue et de pull request ; plus tard, la publication automatique. |
| `src/` | Le site lui-même (Astro 5 + Tailwind v4). `src/content/` est le texte des pages. |
| `public/` | Fichiers servis tels quels : favicons, polices, images. |

Les dossiers préfixés `_` sont la mémoire du chantier : ils restent pendant toute la vie du projet.
