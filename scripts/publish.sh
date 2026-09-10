#!/usr/bin/env bash
#
# Publie le site sur GitHub Pages.
#
# Le site est servi depuis https://<organisation>.github.io/<depot>/, donc
# depuis un SOUS-DOSSIER : d'où BASE_PATH. Le jour où le mouvement met son
# propre domaine, on retire les deux variables et rien d'autre ne bouge.
#
# ./dist/ est une copie de travail (git worktree) de la branche gh-pages.
# Elle est créée automatiquement au premier lancement.

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ORG="scouts-europe-suisse"
REPO="website"
export SITE_URL="https://${ORG}.github.io"
export BASE_PATH="/${REPO}"

# 1. La copie de travail gh-pages, créée au besoin.
if [[ ! -e dist/.git ]]; then
  echo "→ Première publication : création de la branche gh-pages."
  if git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
    git fetch origin gh-pages
    git worktree add dist gh-pages
  else
    git worktree add --orphan -b gh-pages dist
  fi
fi

BR="$(git -C dist branch --show-current)"
[[ "$BR" == "gh-pages" ]] || { echo "✗ dist/ est sur '$BR', pas gh-pages. Arrêt." >&2; exit 1; }

# 2. Construction.
echo "→ Construction (base ${BASE_PATH})…"
npm run build
[[ -d _build ]] || { echo "✗ Pas de _build/. Arrêt." >&2; exit 1; }

# 3. Contrôle : aucune adresse absolue ne doit avoir échappé au préfixe.
#    Une seule oubliée et c'est une image ou un lien mort en ligne.
echo "→ Contrôle des adresses…"
LEAKS="$(grep -rhoE '(src|href)="/[a-zA-Z][^"]*"' _build --include='*.html' \
  | grep -v "\"${BASE_PATH}/" | sort -u | head -20 || true)"
if [[ -n "$LEAKS" ]]; then
  echo "✗ Adresses non préfixées — elles seraient mortes en ligne :" >&2
  echo "$LEAKS" >&2
  exit 1
fi

# 4. Synchronisation vers la copie de travail.
echo "→ Copie vers dist/…"
rsync -a --delete --exclude '.git' --exclude '.nojekyll' _build/ dist/
# .nojekyll : sans lui, GitHub Pages passe le site dans Jekyll, qui ignore
# les dossiers commençant par «_» — donc tout /_astro/ (le CSS et le JS).
touch dist/.nojekyll

# 5. Commit et envoi.
SRC_BRANCH="$(git branch --show-current)"
SRC_SHA="$(git rev-parse --short HEAD)"
cd dist
git add -A
if git diff --cached --quiet; then
  echo "✓ Rien de neuf : le site en ligne correspond déjà à ce build."
  exit 0
fi
git commit -q -m "Publication depuis ${SRC_BRANCH} @ ${SRC_SHA}"
git push -q origin gh-pages
echo
echo "✓ Publié : ${SITE_URL}${BASE_PATH}/"
echo "  GitHub Pages met environ une minute à reconstruire."
