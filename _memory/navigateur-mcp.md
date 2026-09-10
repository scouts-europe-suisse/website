---
name: navigateur-mcp
description: Le navigateur piloté (.mcp.json) — ce qu'il faut vérifier selon le système, la variante Windows, et pourquoi il faut redémarrer la session après toute modification.
metadata:
  type: reference
---

# Le navigateur piloté (`.mcp.json`)

`.mcp.json` déclare **chrome-devtools-mcp**, qui permet à Claude d'ouvrir le site, de le montrer
et de vérifier une page. Sans lui, Claude peut toujours modifier le site, mais ne peut plus le
regarder — il travaille à l'aveugle.

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"],
      "env": {}
    }
  }
}
```

## Aucun chemin en dur, volontairement

Il y avait au départ `--userDataDir /tmp/chrome-mcp-scouts-website`. Ce chemin n'existe pas sous
Windows, et le serveur n'y démarrait pas. Sans l'option, l'outil range le profil de lui-même au
bon endroit selon le système. **Ne jamais y remettre de chemin en dur.** S'il faut un jour un
profil jetable, l'option portable est `--isolated`.

## Ce qu'il faut vérifier selon le système

| Système | Attendu |
|---|---|
| macOS, Linux | `npx` fonctionne tel quel. Rien à changer. |
| Windows | `npx` est en réalité `npx.cmd`. **Si le serveur ne démarre pas**, l'envelopper. |

La variante Windows, à n'appliquer que si le serveur refuse de démarrer :

```json
"command": "cmd",
"args": ["/c", "npx", "-y", "chrome-devtools-mcp@latest"]
```

**Ne pas l'appliquer d'avance :** elle ne fonctionne que sous Windows et casserait le fichier
pour les autres. Si un poste Windows en a besoin durablement, c'est le signe qu'il faut une
configuration par poste, pas un fichier partagé modifié pour tout le monde.

## S'il n'est pas disponible, ouvrir quand même le site

Le navigateur piloté sert à Claude, pas à la personne. S'il manque, **le site s'ouvre quand même**
dans le navigateur ordinaire du poste (`open` / `start` / `xdg-open` selon le système). La
personne voit son site ; c'est Claude qui perd la capacité de le regarder, et il doit le dire
plutôt que de faire comme si de rien n'était.

## Le premier démarrage est lent

`npx -y` télécharge le paquet la première fois : le serveur peut mettre une minute à répondre.
**Ce n'est pas une panne.** Ne pas conclure trop vite que la configuration est fausse.

## ⚠ Redémarrer la session après toute modification

Claude Code charge les serveurs MCP **au démarrage**. Modifier `.mcp.json` pendant une session
n'a donc aucun effet : le fichier est juste, et rien ne change — de quoi croire que la correction
n'a pas marché et se mettre à en chercher une autre.

> **Après toute modification de `.mcp.json` : quitter Claude et le relancer.**
> Et le dire à la personne, en une phrase : « j'ai corrigé le fichier, il faut fermer et rouvrir
> Claude pour qu'il en tienne compte. »

Voir aussi [[local-dev-and-deploy]].
