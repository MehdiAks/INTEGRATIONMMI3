#!/usr/bin/env python3
"""Vérifie les pages de l'accueil et inventorie les ressources locales absentes."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parent.parent
class Assets(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ['src', 'poster', 'data', 'data-src', 'data-trailer']:
            if attrs.get(key): self.refs.append(attrs[key])
        if tag == 'link' and attrs.get('href'): self.refs.append(attrs['href'])

def local(value, base):
    url = urlsplit(value)
    if url.scheme or url.netloc or not url.path or value.startswith(('#', '/')): return None
    return (base / unquote(url.path)).resolve()

missing = []
for group, page in re.findall(r'group: "(G\d+)".*?pagePath: "([^"]+)"', (ROOT/'script.js').read_text()):
    print(f'{group}: {"OK" if (ROOT/page).is_file() else "ABSENT"} — {page}')
for folder in sorted(ROOT.glob('G*/*')):
    if not folder.is_dir(): continue
    for file in sorted(folder.rglob('*')):
        if any(p in ['node_modules', '.git', 'dist'] for p in file.parts): continue
        if file.suffix not in ['.html', '.css']: continue
        content = file.read_text()
        if file.suffix == '.html':
            parser = Assets(); parser.feed(content); refs = parser.refs
        else: refs = re.findall(r'url\(\s*[\'"]?([^\)\'"\s]+)', content)
        for ref in refs:
            target = local(ref, file.parent)
            if target and not target.is_file(): missing.append((str(file.relative_to(ROOT)), ref))
print('\nRessources HTML/CSS absentes (les variantes des médias sont résolues à l’ouverture) :')
for file, ref in sorted(set(missing)): print(f'{file}: {ref}')
