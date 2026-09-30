/* Médias communs : affiche WebP au niveau du groupe et film YouTube. */
(() => {
  const youtubeVideos = {
    G01: 'yVhS5Qsq2XM', G02: 'Q5rgOF-AsSA', G03: 'H-5_lNKP1Og', G04: '5p7WofFvur4',
    G05: 'XlM0xJIFB80', G06: 'DYy-0JuNubI', G07: 'pLnwM-e9rp0', G08: 'X7_BqAkjWF8',
    G09: 'U43Luifi9UM', G10: 'Vu7qYi_ru58', G11: '1fu3v8ZZikc', G12: 'ycDO-OvKC9c',
    G13: 'V_R-YPYhl2s', G14: 'eBy5AF8ewJM', G15: 'hZTntX5LKP0', G16: '05bd7rWbQSQ',
    G17: 'EzFizuPBF1Q', G18: 'ITeX1Q9Ex14', G19: 'f4h3haqYifA', G20: '1l8tIDxaf0I'
  };

  const match = location.pathname.match(/^(.*\/G\d{2}\/[^/]+\/)/i);
  const root = match ? new URL(match[1], location.href) : new URL('./', location.href);
  const group = match?.[1].match(/\/(G\d{2})\//i)?.[1].toUpperCase() || document.documentElement.dataset.group;
  const cache = new Map();

  function probeMedia(url) {
    return new Promise(resolve => {
      const media = document.createElement('img');
      let timer;
      const finish = success => {
        clearTimeout(timer);
        media.onload = media.onerror = null;
        resolve(success);
      };
      media.onload = () => finish(true);
      media.onerror = () => finish(false);
      timer = setTimeout(() => finish(false), 5000);
      media.src = url;
    });
  }

  async function findCandidates(candidates) {
    const key = candidates.join('|');
    if (!cache.has(key)) cache.set(key, (async () => {
      for (const url of candidates) {
        if (location.protocol === 'file:') {
          if (await probeMedia(url)) return url;
          continue;
        }
        try {
          let response = await fetch(url, { method: 'HEAD' });
          if (response.status === 405 || response.status === 501) {
            response = await fetch(url, { headers: { Range: 'bytes=0-0' } });
            response.body?.cancel().catch(() => {});
          }
          if (response.ok && !response.headers.get('content-type')?.includes('text/html')) return url;
        } catch {
          if (await probeMedia(url)) return url;
        }
      }
      return null;
    })());
    const result = await cache.get(key);
    if (!result) cache.delete(key);
    return result;
  }

  function find(base, extensions) {
    return findCandidates(extensions.map(extension => `${base}.${extension}`));
  }

  const id = youtubeVideos[group];
  const poster = group ? new URL(`../affiche_${group}.webp`, root).href : null;
  const video = id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
  const watch = id ? `https://www.youtube.com/watch?v=${id}` : null;
  window.GroupMedia = {
    root: root.href,
    group,
    find,
    findCandidates,
    ready: Promise.resolve({ poster, video })
  };
  if (!group || !id) return;

  const posterPattern = new RegExp(`affiche_${group}\\.(?:png|jpe?g|pdf|webp)(?:[?#].*)?$`, 'i');
  const videoPattern = new RegExp(`video_${group}\\.(?:mp4|mov)(?:[?#].*)?$`, 'i');

  function replaceVideo(element) {
    const player = element.tagName === 'SOURCE' ? element.closest('video') : element;
    if (!player || player.tagName !== 'VIDEO' || !player.isConnected) return;
    const link = document.createElement('a');
    for (const attr of ['class', 'id', 'style']) {
      if (player.hasAttribute(attr)) link.setAttribute(attr, player.getAttribute(attr));
    }
    link.href = watch;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Voir le film sur YouTube';
    player.replaceWith(link);
  }

  function update(element) {
    if (element.tagName === 'VIDEO' && videoPattern.test(element.getAttribute('src') || '')) {
      replaceVideo(element);
      return;
    }
    if (element.tagName === 'SOURCE' && videoPattern.test(element.getAttribute('src') || element.getAttribute('data-src') || '')) {
      replaceVideo(element);
      return;
    }
    for (const attr of ['src', 'poster', 'data', 'href', 'data-src', 'data-trailer']) {
      const value = element.getAttribute(attr);
      if (!value) continue;
      if (posterPattern.test(value)) element.setAttribute(attr, poster);
      else if (videoPattern.test(value) && (attr === 'href' || attr === 'data-trailer')) element.setAttribute(attr, watch);
    }
  }

  function scan(node) {
    if (node.nodeType !== 1) return;
    update(node);
    node.querySelectorAll('[src],[poster],[data],[href],[data-src],[data-trailer]').forEach(update);
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes') update(record.target);
      else record.addedNodes.forEach(scan);
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['src', 'poster', 'data', 'href', 'data-src', 'data-trailer']
  });
  scan(document.documentElement);
})();
