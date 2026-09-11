#!/usr/bin/env node
/**
 * Publie le site sur GitHub Pages.
 *
 * Écrit en Node, et non en shell, pour une raison précise : l'équipe travaille
 * sous Windows comme sous macOS. L'ancienne version utilisait `bash`, `rsync`
 * et `touch`, dont Windows n'a aucun — la publication y était donc
 * impossible. Node est déjà nécessaire pour construire le site ; s'en servir
 * ici supprime le problème au lieu de le contourner.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(ROOT);

const ORG = 'scouts-europe-suisse';
const REPO = 'website';
const SITE_URL = `https://${ORG}.github.io`;
const BASE_PATH = `/${REPO}`;

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { stdio: 'pipe', encoding: 'utf8', shell: false, ...opts });
const git = (args, opts) => run('git', args, opts).trim();
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// 1. La copie de travail gh-pages, créée au besoin.
if (!fs.existsSync(path.join('dist', '.git'))) {
  console.log('→ Première publication : création de la branche gh-pages.');
  let remoteHas = true;
  try { git(['ls-remote', '--exit-code', '--heads', 'origin', 'gh-pages']); }
  catch { remoteHas = false; }
  if (remoteHas) {
    git(['fetch', 'origin', 'gh-pages']);
    git(['worktree', 'add', 'dist', 'gh-pages']);
  } else {
    git(['worktree', 'add', '--orphan', '-b', 'gh-pages', 'dist']);
  }
}

const branch = git(['-C', 'dist', 'branch', '--show-current']);
if (branch !== 'gh-pages') {
  console.error(`✗ dist/ est sur « ${branch} », pas gh-pages. Arrêt.`);
  process.exit(1);
}

// 2. Construction, avec le sous-dossier de service.
console.log(`→ Construction (base ${BASE_PATH})…`);
// SES_SITE_MODE reste « préparation » : l'aperçu n'est PAS le site du
// mouvement, et ne doit apparaître dans aucun résultat de recherche tant que
// www.scouts-europe.ch tourne encore sous WordPress. Ne pas passer
// « production » ici — ce mode est réservé au jour de la bascule (plan 01).
run(npm, ['run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, SITE_URL, BASE_PATH, SES_SITE_MODE: 'preparation' },
});
if (!fs.existsSync('_build')) {
  console.error('✗ Pas de _build/. Arrêt.');
  process.exit(1);
}

// 3. Contrôle : aucune adresse absolue ne doit avoir échappé au préfixe.
//    Une seule oubliée met une image ou un lien mort en ligne, et ça ne se
//    voit pas en local, où tout marche.
console.log('→ Contrôle des adresses…');
const leaks = new Set();
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const html = fs.readFileSync(p, 'utf8');
      for (const m of html.matchAll(/(?:src|href)="(\/[a-zA-Z][^"]*)"/g)) {
        if (!m[1].startsWith(`${BASE_PATH}/`)) leaks.add(m[1]);
      }
    }
  }
};
walk('_build');

// 3 bis. Contrôle : aucune page ne doit partir en ligne sans la mention
//    « ne pas indexer ». Une seule oubliée suffit à mettre l'aperçu en
//    concurrence avec le vrai site dans Google, et ça ne se voit pas à l'œil.
console.log('→ Contrôle « ne pas indexer »…');
const indexable = [];
const walkPages = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkPages(p);
    else if (e.name.endsWith('.html')) {
      const html = fs.readFileSync(p, 'utf8');
      if (!/<meta\s+name="robots"\s+content="noindex/.test(html)) {
        indexable.push(path.relative('_build', p));
      }
    }
  }
};
walkPages('_build');
if (indexable.length) {
  console.error('✗ Pages sans « ne pas indexer » — elles concurrenceraient le vrai site :');
  for (const l of indexable.slice(0, 20)) console.error(`   ${l}`);
  process.exit(1);
}

if (leaks.size) {
  console.error('✗ Adresses non préfixées — elles seraient mortes en ligne :');
  for (const l of [...leaks].slice(0, 20)) console.error(`   ${l}`);
  process.exit(1);
}

// 4. Synchronisation vers la copie de travail : on vide dist/ (sauf .git),
//    puis on recopie. C'est l'équivalent de `rsync -a --delete`.
console.log('→ Copie vers dist/…');
for (const e of fs.readdirSync('dist')) {
  if (e === '.git') continue;
  fs.rmSync(path.join('dist', e), { recursive: true, force: true });
}
fs.cpSync('_build', 'dist', { recursive: true });

// .nojekyll : sans lui, GitHub Pages passe le site dans Jekyll, qui ignore
// les dossiers commençant par « _ » — donc tout /_astro/, le CSS et le JS.
fs.writeFileSync(path.join('dist', '.nojekyll'), '');

// 5. Commit et envoi.
const srcBranch = git(['branch', '--show-current']);
const srcSha = git(['rev-parse', '--short', 'HEAD']);
git(['-C', 'dist', 'add', '-A']);
try {
  git(['-C', 'dist', 'diff', '--cached', '--quiet']);
  console.log('✓ Rien de neuf : le site en ligne correspond déjà à ce build.');
  process.exit(0);
} catch {
  // il y a des changements : on continue
}
git(['-C', 'dist', 'commit', '-m', `Publication depuis ${srcBranch} @ ${srcSha}`]);
git(['-C', 'dist', 'push', 'origin', 'gh-pages']);
console.log(`\n✓ Publié : ${SITE_URL}${BASE_PATH}/`);
console.log('  C\'est un aperçu de préparation : invisible pour les moteurs de recherche.');
console.log('  GitHub Pages met environ une minute à reconstruire.');
