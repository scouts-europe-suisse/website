# Démarrer — installation, une seule fois

Ce guide s'adresse à quelqu'un qui reprend le site et **n'est pas développeur**. Il ne couvre que
l'installation. Ensuite, tout se fait en parlant à Claude, en français.

Comptez vingt minutes, une seule fois.

---

## 1. Installer trois choses

Il en faut trois : **Node** (qui fabrique le site), **Git** (qui garde l'historique) et
**Claude Code** (à qui vous parlerez).

### Sous Windows

Ouvrir **PowerShell** (menu Démarrer, taper `powershell`) et coller :

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
npm install -g @anthropic-ai/claude-code
```

**Fermer PowerShell et le rouvrir** après ces commandes, sinon il ne connaît pas encore les
nouveaux programmes.

### Sous macOS

Ouvrir **Terminal** (⌘ + espace, taper `terminal`) et coller :

```bash
brew install node git
npm install -g @anthropic-ai/claude-code
```

Si `brew` n'existe pas, l'installer d'abord depuis [brew.sh](https://brew.sh), ou télécharger
Node depuis [nodejs.org](https://nodejs.org) (version **LTS**) et Git depuis
[git-scm.com](https://git-scm.com).

### Vérifier

```bash
node --version    # doit afficher v20 ou plus
git --version
```

---

## 2. Récupérer le site

Choisir un dossier où le ranger, puis :

```bash
git clone https://github.com/scouts-europe-suisse/website.git
cd website
npm install
```

`npm install` prend une minute et affiche beaucoup de lignes : c'est normal.

> Il faut être membre de l'organisation `scouts-europe-suisse` sur GitHub. Si la commande demande
> un mot de passe et le refuse, c'est qu'il manque l'accès : demandez-le.

---

## 3. Voir le site

```bash
npm run dev
```

Puis ouvrir **http://localhost:4321** dans un navigateur. La page se met à jour toute seule à
chaque modification. Pour arrêter : `Ctrl + C` dans la fenêtre.

---

## 4. Et ensuite, parler à Claude

Dans le dossier `website`, lancer :

```bash
claude
```

Puis écrire ce que vous voulez faire, **en français, en langage ordinaire**. Par exemple :

- « Montre-moi le site. »
- « Corrige la faute dans le deuxième paragraphe de la page Contact. »
- « Ajoute une actualité sur le week-end de novembre. »
- « Mets l'aperçu à jour. »
- « Où en est-on ? »

Claude connaît ce dossier : il a ses instructions dans `CLAUDE.md`, les règles dans `_memory/`
et les travaux en cours dans `_plans/`. Il fait les manipulations techniques et rend compte en
français. **Vous n'avez pas besoin d'apprendre git.**

---

## Trois choses à savoir avant de commencer

**1. Ce dépôt est public.** Tout ce qui y entre est visible de tous, et l'historique garde ce
qu'on y met même après suppression. Donc jamais de mot de passe, de liste de membres, ni
d'adresses privées. En cas de doute, demandez à Claude avant d'enregistrer.

**2. Les photos.** Aucune photo ne va en ligne sans autorisation, en particulier dès qu'un enfant
est reconnaissable. Celles de l'ancien site sont couvertes ; une photo nouvelle ne l'est pas.

**3. Ce qui est en ligne est un aperçu**, à l'adresse
https://scouts-europe-suisse.github.io/website/ — **pas** le site officiel.
`www.scouts-europe.ch` tourne toujours de son côté et n'est pas touché.

---

## Si quelque chose ne marche pas

Dites-le à Claude tel quel : collez le message d'erreur, il saura quoi en faire. Les deux
incidents les plus courants :

| Ce que vous voyez | Ce que c'est |
|---|---|
| `command not found` après l'installation | La fenêtre n'a pas été rouverte. Fermez-la et rouvrez-la. |
| Le site refuse de démarrer après une modification | Un champ d'en-tête manquant dans une page. Le message nomme le fichier. |

Pour écrire ou modifier une page : [`_memory/ecrire-une-page.md`](_memory/ecrire-une-page.md).
