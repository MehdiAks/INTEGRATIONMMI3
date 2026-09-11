const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = readFileSync(path.join(root, 'group-media.js'), 'utf8');

async function resolveMedia(pathname, files, dataset = {}) {
  const requests = [];
  const document = { documentElement: { dataset, nodeType: 1, getAttribute: () => null, querySelectorAll: () => [] } };
  const context = { URL, Map, Promise, RegExp, document, window: {},
    location: { pathname, href: `https://example.test${pathname}` },
    MutationObserver: class { observe() {} },
    fetch: async (url, options) => {
      assert.equal(options.method, 'HEAD'); requests.push(url);
      return { ok: files.includes(new URL(url).pathname), headers: { get: () => 'application/octet-stream' } };
    }
  };
  vm.runInNewContext(source, context);
  return { ...(await context.window.GroupMedia.ready), root: context.window.GroupMedia.root, requests };
}
for (const [page, folder] of [
  ['/cours/G09/siteweb_G09/index.html', '/cours/G09/siteweb_G09/'],
  ['/cours/G03/siteweb_G03/dist/client/index.html', '/cours/G03/siteweb_G03/'],
  ['/cours/G15/GRP15_site_web/dist/index.html', '/cours/G15/GRP15_site_web/'],
]) {
  test(`JPG et MOV depuis ${page}`, async () => {
    const group = folder.match(/G\d+/)[0];
    const files = [`${folder}assets/images/affiche_${group}.jpg`, `${folder}assets/videos/video_${group}.mov`];
    const result = await resolveMedia(page, files);
    assert.equal(result.root, 'https://example.test' + folder);
    assert.equal(result.poster, 'https://example.test' + files[0]);
    assert.equal(result.video, 'https://example.test' + files[1]);
  });
}
test('PDF supporté et vidéo absente sans invention de fichier', async () => {
  const result = await resolveMedia('/G10/siteweb_G10/index.html', ['/G10/siteweb_G10/assets/images/affiche_G10.pdf']);
  assert.ok(result.poster.endsWith('.pdf')); assert.equal(result.video, null);
  assert.equal(result.requests.length, 6);
});
test('Serveur Vite à la racine avec groupe explicite', async () => {
  const result = await resolveMedia('/', ['/assets/images/affiche_G03.png', '/assets/videos/video_G03.mp4'], { group: 'G03' });
  assert.equal(result.video, 'https://example.test/assets/videos/video_G03.mp4');
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

test('Accueil : médias dans assets, jamais à la racine du groupe ni dans dist', () => {
  const home = readFileSync(path.join(root, 'script.js'), 'utf8');
  const helpers = home.slice(home.indexOf('function mediaFolders'), home.indexOf('const mediaDialog'));
  const ctx = {};
  vm.runInNewContext(helpers, ctx);
  for (let n = 1; n <= 20; n++) {
    const group = `G${String(n).padStart(2, '0')}`;
    const folder = n === 3 ? `${group}/siteweb_${group}/dist/client` : `${group}/siteweb_${group}`;
    assert.equal(ctx.buildPosterCandidates(group, folder)[0], `${group}/siteweb_${group}/assets/images/affiche_${group}.png`);
    assert.equal(ctx.buildVideoCandidates(group, folder)[0], `${group}/siteweb_${group}/assets/videos/video_${group}.mp4`);
  }
  assert.ok(ctx.buildVideoCandidates('G15', 'G15/GRP15_site_web/dist').includes('G15/GRP15_site_web/assets/videos/video_G15.mov'));
});

test('Ouverture locale : image et vidéo détectées sans fetch', async () => {
  const doc = { documentElement: { dataset: {}, nodeType: 1, getAttribute: () => null, querySelectorAll: () => [] },
    createElement: tag => ({ tagName: tag.toUpperCase(), removeAttribute() {}, load() {},
      set src(value) { queueMicrotask(() => { if (value.endsWith('.jpg') || value.endsWith('.mov')) (this.onload || this.onloadedmetadata)?.(); else this.onerror?.(); }); }
    }) };
  const ctx = { URL, Map, Promise, RegExp, document: doc, window: {}, setTimeout, clearTimeout,
    location: { protocol: 'file:', pathname: '/tmp/G09/siteweb_G09/index.html', href: 'file:///tmp/G09/siteweb_G09/index.html' },
    MutationObserver: class { observe() {} }, fetch: () => { throw Error('fetch ne doit pas être appelé'); }
  };
  vm.runInNewContext(source, ctx);
  const media = await ctx.window.GroupMedia.ready;
  assert.ok(media.poster.endsWith('assets/images/affiche_G09.jpg'));
  assert.ok(media.video.endsWith('assets/videos/video_G09.mov'));
});
