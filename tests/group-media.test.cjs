const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = readFileSync(path.join(root, 'group-media.js'), 'utf8');

async function resolveMedia(pathname, dataset = {}) {
  const document = { documentElement: { dataset, nodeType: 1, getAttribute: () => null, querySelectorAll: () => [] } };
  const context = { URL, Map, Promise, RegExp, document, window: {},
    location: { pathname, href: `https://example.test${pathname}` },
    MutationObserver: class { observe() {} }
  };
  vm.runInNewContext(source, context);
  return { ...(await context.window.GroupMedia.ready), root: context.window.GroupMedia.root };
}
for (const [page, siteRoot, poster, video] of [
  ['/cours/G09/siteweb_G09/index.html', '/cours/G09/siteweb_G09/', '/cours/G09/affiche_G09.webp', 'https://www.youtube.com/embed/U43Luifi9UM?rel=0'],
  ['/cours/G03/siteweb_G03/dist/client/index.html', '/cours/G03/siteweb_G03/', '/cours/G03/affiche_G03.webp', 'https://www.youtube.com/embed/H-5_lNKP1Og?rel=0'],
  ['/cours/G15/GRP15_site_web/dist/index.html', '/cours/G15/GRP15_site_web/', '/cours/G15/affiche_G15.webp', 'https://www.youtube.com/embed/hZTntX5LKP0?rel=0'],
]) {
  test(`WebP et YouTube depuis ${page}`, async () => {
    const result = await resolveMedia(page);
    assert.equal(result.root, 'https://example.test' + siteRoot);
    assert.equal(result.poster, 'https://example.test' + poster);
    assert.equal(result.video, video);
  });
}
test('Serveur Vite à la racine avec groupe explicite', async () => {
  const result = await resolveMedia('/', { group: 'G03' });
  assert.equal(result.poster, 'https://example.test/affiche_G03.webp');
  assert.equal(result.video, 'https://www.youtube.com/embed/H-5_lNKP1Og?rel=0');
});
test('Les builds contiennent du JS compilé et des ressources relatives présentes', () => {
  for (const entry of ['G03/siteweb_G03/dist/client/index.html', 'G15/GRP15_site_web/dist/index.html']) {
    const file = path.join(root, entry); const html = readFileSync(file, 'utf8');
    assert.ok(!html.includes('src/main.jsx'));
    for (const [, asset] of html.matchAll(/(?:src|href)="(\.\/assets\/[^" ]+\.(?:js|css))"/g)) {
      assert.ok(existsSync(path.resolve(path.dirname(file), asset)), asset);
    }
  }
});

test('Accueil : affiches .webp au niveau du groupe et liens YouTube', () => {
  const home = readFileSync(path.join(root, 'script.js'), 'utf8');
  const helper = home.slice(home.indexOf('function buildPosterCandidates'), home.indexOf('const mediaDialog'));
  const context = {};
  vm.runInNewContext(helper, context);
  for (let n = 1; n <= 20; n++) {
    const group = `G${String(n).padStart(2, '0')}`;
    assert.ok(home.includes(`${group}:`), group);
    assert.deepEqual([...context.buildPosterCandidates(group)], [`${group}/affiche_${group}.webp`], group);
  }
  assert.ok(home.includes('https://www.youtube.com/embed/'));
  assert.ok(home.includes('https://www.youtube.com/watch?v='));
});

test('Crédits disponibles par groupe et modale présente', () => {
  const home = readFileSync(path.join(root, 'script.js'), 'utf8');
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.ok(home.includes('const projectCredits'));
  assert.ok(home.includes('Crédits'));
  assert.ok(html.includes('id="creditsDialog"'));
});

test('Un lecteur local est remplacé par un lien YouTube', () => {
  let replacement;
  const attrs = { src: 'assets/videos/video_G09.mp4', class: 'player' };
  const video = {
    tagName: 'VIDEO', isConnected: true,
    getAttribute: name => attrs[name] || null,
    hasAttribute: name => Object.hasOwn(attrs, name),
    replaceWith: node => { replacement = node; }
  };
  const rootElement = { dataset: {}, nodeType: 1, getAttribute: () => null, querySelectorAll: () => [video] };
  const document = {
    documentElement: rootElement,
    createElement: tag => ({ tagName: tag.toUpperCase(), setAttribute(name, value) { this[name] = value; } })
  };
  vm.runInNewContext(source, { URL, Map, Promise, RegExp, document, window: {},
    location: { pathname: '/G09/siteweb_G09/index.html', href: 'https://example.test/G09/siteweb_G09/index.html' },
    MutationObserver: class { observe() {} }
  });
  assert.equal(replacement.tagName, 'A');
  assert.equal(replacement.href, 'https://www.youtube.com/watch?v=U43Luifi9UM');
  assert.equal(replacement.target, '_blank');
  assert.equal(replacement.rel, 'noopener');
  assert.equal(replacement.textContent, 'Voir le film sur YouTube');
});

test('G03 et G15 : scripts classiques autonomes, sans modules ES bloqués en file://', () => {
  for (const entry of ['G03/siteweb_G03/dist/client/index.html', 'G15/GRP15_site_web/dist/index.html']) {
    const file = path.join(root, entry);
    const html = readFileSync(file, 'utf8');
    assert.ok(!/type=["']module["']|crossorigin|modulepreload/.test(html), entry);
    const scripts = [...html.matchAll(/<script src="([^"]+)" defer><\/script>/g)];
    assert.equal(scripts.length, 1);
    const js = readFileSync(path.resolve(path.dirname(file), scripts[0][1]), 'utf8');
    assert.ok(js.startsWith('(function()'));
    assert.ok(!js.includes('import.meta'));
    new (require('node:vm').Script)(js); // Analyse comme script classique, sans l’exécuter.
  }
});
