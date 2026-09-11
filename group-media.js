/* Médias communs : chemins relatifs au sous-site, même depuis dist/client. */
(() => {
  const match = location.pathname.match(/^(.*\/G\d{2}\/[^/]+\/)/i);
  const root = match ? new URL(match[1], location.href) : new URL('./', location.href);
  const group = match?.[1].match(/\/(G\d{2})\//i)?.[1].toUpperCase() || document.documentElement.dataset.group;
  const cache = new Map();
  async function find(base, extensions) {
    const key = base + extensions.join();
    if (!cache.has(key)) cache.set(key, (async () => {
      for (const extension of extensions) {
        const url = `${base}.${extension}`;
        try {
          const response = await fetch(url, { method: 'HEAD' });
          // Écarte les serveurs qui renvoient index.html pour un fichier absent.
          if (response.ok && !response.headers.get('content-type')?.includes('text/html')) return url;
        } catch { /* Fichier absent ou serveur indisponible. */ }
      }
      return null;
    })());
    return cache.get(key);
  }
  window.GroupMedia = { root: root.href, group, find };
  if (!group) return;
  const poster = find(new URL(`assets/images/affiche_${group}`, root).href, ['png', 'jpg', 'jpeg', 'pdf']);
  const video = find(new URL(`assets/videos/video_${group}`, root).href, ['mp4', 'mov']);
  window.GroupMedia.ready = Promise.all([poster, video]).then(([poster, video]) => ({ poster, video }));

  function update(element) {
    for (const attr of ['src', 'poster', 'data', 'href', 'data-src', 'data-trailer']) {
      const value = element.getAttribute(attr);
      if (!value) continue;
      const isPoster = new RegExp(`affiche_${group}\\.(png|jpe?g|pdf)$`, 'i').test(value);
      const isVideo = new RegExp(`video_${group}\\.(mp4|mov)$`, 'i').test(value);
      if (!isPoster && !isVideo) continue;
      (isPoster ? poster : video).then(url => {
        if (!url || !element.isConnected || element.getAttribute(attr) !== value) return;
        const pdf = url.endsWith('.pdf');
        if (isPoster && attr === 'poster' && pdf) { element.removeAttribute('poster'); return; }
        if (isPoster && element.tagName === 'IMG' && pdf) {
          if (element.nextElementSibling?.dataset.groupPdf) return;
          const frame = document.createElement('object');
          frame.dataset.groupPdf = 'true';
          frame.type = 'application/pdf'; frame.data = url;
          frame.className = element.className;
          frame.style.cssText = 'width:100%;height:100%;min-height:350px;';
          frame.setAttribute('aria-label', element.alt || `Affiche ${group}`);
          const link = document.createElement('a');
          link.href = url; link.textContent = `Ouvrir l’affiche ${group} (PDF)`;
          frame.append(link); element.after(frame); element.hidden = true; element.style.display = 'none';
          return;
        }
        if (element.tagName === 'OBJECT' && !pdf) element.type = url.endsWith('.png') ? 'image/png' : 'image/jpeg';
        if (value === url) return;
        element.setAttribute(attr, url);
        if (element.tagName === 'SOURCE') {
          element.removeAttribute('type');
          if (attr === 'src') element.parentElement?.load?.();
        }
      });
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
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true,
    attributeFilter: ['src', 'poster', 'data', 'href', 'data-src', 'data-trailer'] });
  scan(document.documentElement);
})();
