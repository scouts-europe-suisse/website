# -*- coding: utf-8 -*-
"""Compare le texte de l'ancien site (base WordPress) à celui du nouveau (build).
On compare les MOTS, pas la mise en forme : il s'agit de vérifier qu'aucun
contenu n'a été perdu en route."""
import json, pathlib, re, html
W = pathlib.Path('/Users/perki/code/scouts/website')
pages_db = {p['_path']: p for p in json.loads(pathlib.Path('pages_live.json').read_text())}
posts_db = {p['post_name']: p for p in json.loads(pathlib.Path('posts_live.json').read_text())
            if p['post_type'] == 'post'}

def words(t):
    t = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', t, flags=re.S)
    t = re.sub(r'\[[^\]]*\]', ' ', t)          # shortcodes
    t = re.sub(r'<[^>]+>', ' ', t)
    t = html.unescape(t).lower()
    t = re.sub(r'[^\wàâäéèêëîïôöùûüçœ\s-]', ' ', t)
    return [w for w in t.split() if len(w) > 3]

def new_text(url):
    f = W / '_build' / url.strip('/') / 'index.html'
    if not f.exists(): return None
    h = f.read_text()
    m = re.search(r'<main[^>]*>(.*?)</main>', h, re.S)
    return words(m.group(1)) if m else []

mig = pathlib.Path('migrate.py').read_text()
OLD, SLUG = {}, {}
for m in re.finditer(r"\('([a-z-]+)',\s*'([^']*)',\s*(?:'([^']*)'|None)\)", mig):
    OLD[m.group(1)] = (m.group(2), m.group(3))
for m in re.finditer(r"'([a-z-]+)':\s*\('([^']*)',\s*(?:'([^']*)'|None)\)", mig):
    SLUG[m.group(1)] = (m.group(2), m.group(3))

rows = []
for key, (ofr, ode) in OLD.items():
    for lang, opath, i in (('fr', ofr, 0), ('de', ode, 1)):
        if not opath or opath not in pages_db: continue
        slug = SLUG.get(key, (None, None))[i]
        if slug is None: continue
        old_w = words(pages_db[opath]['post_content'])
        new_w = new_text(f'/{lang}/{slug}/')
        if new_w is None:
            rows.append((lang, key, len(old_w), None, 'PAGE ABSENTE')); continue
        missing = [w for w in set(old_w) if w not in set(new_w)]
        rows.append((lang, key, len(old_w), len(new_w), missing))

for name, p in sorted(posts_db.items()):
    if p['post_status'] != 'publish' or not p['post_content'].strip(): continue
    old_w = words(p['post_content'])
    new_w = new_text(f'/fr/actualites/{name}/')
    if new_w is None:
        rows.append(('fr', 'news:'+name, len(old_w), None, 'ABSENTE')); continue
    missing = [w for w in set(old_w) if w not in set(new_w)]
    rows.append(('fr', 'news:'+name, len(old_w), len(new_w), missing))

print(f"{'lang':<5}{'page':<34}{'mots avant':>11}{'après':>8}   perdus")
print('-'*86)
alert = 0
for lang, key, o, n, miss in sorted(rows):
    if n is None:
        print(f'{lang:<5}{key:<34}{o:>11}{"—":>8}   {miss}'); alert += 1; continue
    lost = len(miss) if isinstance(miss, list) else 0
    flag = ''
    if o and lost / max(o, 1) > 0.12:
        flag = '  ← à regarder'; alert += 1
    print(f'{lang:<5}{key:<34}{o:>11}{n:>8}   {lost} mots{flag}')
    if flag and isinstance(miss, list):
        print(f'       exemples : {", ".join(sorted(miss)[:12])}')
print(f'\n{len(rows)} pages comparées, {alert} à regarder')
