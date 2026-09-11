---
name: local-dev-and-deploy
description: Faire tourner le site en local (npm run dev, http://localhost:4321, sans backloop.dev) et état de la question de la mise en ligne (non décidée, plan 01).
metadata:
  type: reference
---

# Voir le site en local, et la question de la mise en ligne

## Voir le site en local

C'est la manipulation la plus demandée ici. Quand l'utilisateur dit *aperçu*, *montre-moi le
site*, *fais tourner le site*, *je veux voir* :

```bash
npm install     # la première fois seulement
npm run dev     # puis http://localhost:4321
```

- Lancer le serveur **en tâche de fond**, puis ouvrir l'URL dans le **navigateur Chrome piloté
  par MCP** (voir `.mcp.json`), pour que l'utilisateur n'ait pas à chercher le lien.
- Une phrase suffit : *« Le site tourne en local, je te l'ai ouvert dans le navigateur. »*
- La page se recharge à chaque enregistrement : pendant que Claude modifie les fichiers, le
  navigateur se met à jour tout seul. Aucune deuxième commande n'est nécessaire.
- Le serveur peut rester allumé toute la session.

### Pas de backloop.dev ici

**Décision, 2026-09-10 :** le serveur de développement est du `http://localhost` simple.
Pas de `backloop.dev`, pas de proxy HTTPS, pas de certificat, pas de secret à ne pas commiter.

**Pourquoi :** ça enlève une dépendance, une étape d'installation et une source de panne, pour un
site public qui n'a besoin de rien de tout ça en local. Un site qui utiliserait des
fonctionnalités réservées aux pages sécurisées (géolocalisation, caméra, service worker) aurait
besoin d'HTTPS en local ; ce n'est pas le cas ici. La carte interactive des implantations prévue
par le cahier des charges n'en a pas besoin non plus, tant qu'elle ne demande pas la position de
l'utilisateur.

Si un jour ça devient nécessaire, c'est une décision à écrire ici, pas à improviser.

### Le navigateur piloté (`.mcp.json`)

`.mcp.json` déclare `chrome-devtools-mcp`, qui permet à Claude d'ouvrir le site et de le montrer.

**Aucun chemin de profil n'y est écrit, volontairement.** Il y avait au départ
`--userDataDir /tmp/chrome-mcp-scouts-website` : ce chemin n'existe pas sous Windows, et le
serveur ne démarrait pas pour un membre de l'équipe sous Windows. Sans l'option, l'outil place le
profil de lui-même au bon endroit selon le système
(`$HOME/.cache/chrome-devtools-mcp/…`, résolu correctement sur macOS, Linux et Windows).

Ne pas y remettre de chemin en dur. Si un profil jetable est un jour nécessaire, l'option
portable est `--isolated`, qui crée un dossier temporaire et le nettoie à la fermeture.

### Le cache de contenu peut mentir

Astro garde en cache le rendu du markdown, dans `.astro/`. **Ce cache ne se rend pas compte
qu'un greffon a changé.** On modifie le traitement des images, on reconstruit, la sortie est
identique, et on conclut que le code ne marche pas — alors qu'il n'a simplement pas été rejoué.

C'est arrivé une fois, sur l'ajout du chargement différé : le code était juste, la page
inchangée. Le réflexe à avoir :

```bash
rm -rf .astro node_modules/.astro _build && npm run build
```

À faire dès qu'on touche à `astro.config.mjs`, aux greffons markdown, ou au schéma du contenu.

### Le port

Par défaut `4321`. Le serveur respecte la variable `PORT` si un outil lui en impose un autre.
Si le port est déjà pris, la commande le dira : il suffit d'arrêter l'autre serveur, ou de lancer
`PORT=4322 npm run dev`.

## Construire le site

```bash
npm run build     # produit ./_build/
npm run preview   # sert ./_build/ comme le ferait un hébergeur
```

`_build/` contient le site fini, sous forme de simples fichiers. C'est ce dossier qu'on
déposera chez l'hébergeur le jour venu — et c'est aussi ce qu'on peut envoyer à quelqu'un, zippé,
pour qu'il regarde sans rien installer.

## Servir le site à la racine, ou dans un sous-dossier

Le site sait tourner aux deux endroits **sans changer une ligne de code**, via deux variables :

| Cible | Commande |
|---|---|
| Racine d'un domaine (`www.scouts-europe.ch/fr/…`) | `npm run build` |
| Sous-dossier, type GitHub Pages (`…github.io/website/fr/…`) | `SITE_URL=https://<org>.github.io BASE_PATH=/website npm run build` |

**Pourquoi ça compte :** GitHub Pages sert un dépôt de projet depuis
`/<nom-du-depot>/`. Le jour où le site prend le domaine du mouvement, il suffit de retirer les
deux variables : rien d'autre ne bouge.

**La règle à ne pas enfreindre :** toute adresse absolue écrite en dur passe par `withBase()`
(`src/data/site.ts`). Une seule oubliée et c'est une image ou un lien mort dès qu'on déplace le
site — et ça ne se voit pas dans le build à la racine, où tout marche.

Trois pièges déjà traités, à ne pas réintroduire :

1. **Les images écrites dans le markdown** (`/images/…`) : Astro applique `base` à ses propres
   liens, pas au contenu rédigé à la main. Un greffon (`rehypeBaseUrls`, dans
   `astro.config.mjs`) s'en charge.
2. **Les destinations de redirection** : Astro ne leur applique pas `base` non plus. La table est
   préfixée à la main dans `astro.config.mjs`.
3. **Le script d'aiguillage de la racine** : les adresses `/fr/` et `/de/` lui sont injectées,
   elles ne peuvent pas être écrites en dur.

**Vérification** après toute modification d'adresse :

```bash
SITE_URL=https://exemple.github.io BASE_PATH=/website npm run build
# puis : aucune adresse ne doit commencer par «/» sans le préfixe
grep -rhoE '(src|href)="/[a-zA-Z][^"]*"' _build --include='*.html' | grep -v '^.*"/website' | sort -u
```

## La mise en ligne — pas encore décidée

**Il n'y a volontairement ni script de publication, ni fichier `CNAME`, ni branche de déploiement
dans ce dépôt.** L'hébergement n'est pas choisi : c'est l'objet du
[plan 01](../_plans/01-domaine-et-bascule-later/PLAN.md).

Si un utilisateur demande à publier : ne pas improviser. La règle est dans
[feedback_publication.md](feedback_publication.md).

Le site actuel (WordPress) continue de tourner chez son hébergeur pendant tout le chantier.
Rien de ce qui est fait ici ne l'affecte.

### Le jour où l'hébergement sera choisi

Deux choses à ne pas confondre, parce qu'elles se ressemblent :

- **`_build/`** — ce que produit la construction du site. Configuré par `outDir` dans
  `astro.config.mjs`.
- **`dist/`** — le dossier de mise en ligne, s'il y en a un un jour (par exemple une copie de
  travail d'une branche de publication). Les deux sont déjà ignorés par git.

C'est le piège habituel : si l'outil se met à construire dans `dist/`, on change la
configuration, on ne redirige pas le dossier de publication.

Voir aussi [[conventions]], [[feedback_publication]].
