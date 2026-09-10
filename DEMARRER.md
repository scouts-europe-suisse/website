# Démarrer

Ce guide s'adresse à quelqu'un qui reprend le site et **n'est pas développeur**.

Vous n'avez que **deux choses à faire vous-même**. Le reste, Claude s'en charge : vous n'aurez
pas à taper de commandes ni à comprendre ce qui se passe.

---

## 1. Installer Claude Code

C'est le seul programme à installer à la main.

**Windows** — ouvrir **PowerShell** (menu Démarrer, taper `powershell`) et coller :

```powershell
irm https://claude.ai/install.ps1 | iex
```

**macOS** — ouvrir **Terminal** (⌘ + espace, taper `terminal`) et coller :

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Puis **fermer la fenêtre et la rouvrir**, sinon elle ne connaît pas encore le nouveau programme.

## 2. Avoir un compte GitHub avec accès au dépôt

Le site est rangé sur GitHub, dans l'organisation `scouts-europe-suisse`. Il faut y être invité,
avec le droit d'écrire. Si ce n'est pas fait, demandez-le avant d'aller plus loin.

---

## 3. Ensuite, demandez à Claude

Ouvrir une fenêtre de commande (PowerShell ou Terminal), aller dans le dossier où vous voulez
ranger le site — le Bureau fait très bien l'affaire — et lancer :

```
claude
```

Puis écrire, **en français, en langage ordinaire** :

> **Installe ce qu'il faut et récupère le site du Scoutisme Européen Suisse :**
> **https://github.com/scouts-europe-suisse/website**

L'adresse compte : à ce moment-là, Claude ne connaît pas encore le projet, il découvre tout en
arrivant. Une fois le site récupéré, il lit ses instructions dedans et sait quoi faire.

Claude va vérifier ce qui manque sur votre machine, l'installer, récupérer le site, le préparer,
puis vous l'ouvrir dans le navigateur. Il vous dira où il en est au fur et à mesure, et vous
demandera si une décision se présente.

Cela prend une dizaine de minutes la première fois. Ensuite, c'est immédiat.

---

## Et après

Vous parlez à Claude en français. Quelques exemples :

- « Montre-moi le site. »
- « Corrige la faute dans le deuxième paragraphe de la page Contact. »
- « Ajoute une actualité sur le week-end de novembre. »
- « Mets l'aperçu à jour. »
- « Où en est-on ? »

Claude connaît ce dossier : ses instructions sont dans `CLAUDE.md`, les règles dans `_memory/`,
les travaux en cours dans `_plans/`. **Vous n'avez pas besoin d'apprendre git.**

---

## Trois choses à savoir

**1. Ce dépôt est public.** Tout ce qui y entre est visible de tous, et l'historique garde ce
qu'on y met même après suppression. Donc jamais de mot de passe, de liste de membres, ni
d'adresses privées. En cas de doute, demandez à Claude avant d'enregistrer.

**2. Les photos.** Aucune photo ne va en ligne sans autorisation, en particulier dès qu'un enfant
est reconnaissable. Celles de l'ancien site sont couvertes ; une photo nouvelle ne l'est pas.

**3. Ce qui est en ligne est un aperçu** — https://scouts-europe-suisse.github.io/website/ — et
**pas** le site officiel. `www.scouts-europe.ch` tourne toujours de son côté, sans être touché.

---

## Si ça coince

Dites-le à Claude tel quel : collez le message d'erreur, il saura quoi en faire.

| Ce que vous voyez | Ce que c'est |
|---|---|
| `claude` : commande inconnue | La fenêtre n'a pas été rouverte après l'installation. Fermez-la, rouvrez-la. |
| Le site refuse de démarrer après une modification | Un champ d'en-tête manquant dans une page. Le message nomme le fichier. |

Pour écrire ou modifier une page : [`_memory/ecrire-une-page.md`](_memory/ecrire-une-page.md).
