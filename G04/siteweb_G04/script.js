/* ============================================================
   Léon Marchand sur l'eau  —  RÉGLAGES  /  SETTINGS
   ------------------------------------------------------------
   1. LA VIDÉO — mets le lien OU un fichier local dans VIDEO_URL.
      Accepté :
        - YouTube        https://www.youtube.com/watch?v=XXXX
                         https://youtu.be/XXXX
                         https://www.youtube.com/shorts/XXXX
        - Vimeo          https://vimeo.com/XXXXXXXX
        - Fichier local  "assets/ma-video.mp4"   (dépose le .mp4/.webm/.mov
                         dans le dossier assets/ et mets son nom ici)
        - Autre lien     chargé tel quel dans un <iframe>

   2. L'IMAGE DE LA VIDÉO (miniature affichée avant lecture) — POSTER_URL.
      Mets "" pour garder le panneau bleu par défaut,
      ou "assets/affiche.jpg" pour ta propre image.

   3. ÉDITION RAPIDE — tape EDIT_CODE (par défaut "leon") n'importe où sur
      la page : un panneau s'ouvre pour charger une vidéo depuis ton PC et
      changer l'image derrière le lecteur. Ces changements restent LOCAUX
      (ce navigateur seulement) — pour publier, édite ce fichier et pousse.
   ============================================================ */

const VIDEO_URL  = "assets/videos/video_G04.mp4";
const POSTER_URL = "assets/images/affiche_G04.png";
const EDIT_CODE  = "leon";

/* ============================================================
   3. TRANSLATIONS — add / edit strings here.
      Keys map to [data-i18n] (text) and [data-i18n-attr] (attributes)
      in index.html.
   ============================================================ */
const I18N = {
  fr: {
    "a11y.skip": "Aller au contenu",
    "nav.home": "Accueil",
    "nav.cinemas": "Cinémas",
    "nav.contact": "Contact",
    "meta.season": "2026 • 1ère Saison",
    "meta.genres": "Comédie, Animation, Court métrage",
    "btn.play": "LECTURE",
    "btn.add": "Ajouter à ma liste",
    "hero.director": "Réalisé par Steven Spielberg",
    "hero.synopsis": "Habillé de son plus beau bonnet de bain et de ses lunettes de plongée, notre héros prend la pose au Miroir d'Eau. Entre marché des Capucins et affaires louches, découvrez le parcours de la caricature parfaite de Léon Marchand… marchant littéralement sur l'eau.",
    "poster.watch": "Regarder la vidéo",
    "section.cast": "Acteurs",
    "section.reviews": "Avis du public",
    "btn.moreReviews": "LIRE PLUS D'AVIS",
    "review.regelegorila": "Ce film est tellement dingue, ça met une tempête à Interstellar, ça c'est sûr. Par contre la VF est pourrie.",
    "review.johnpork": "C'est époustouflant, j'ai très envie d'appeler Léon Marchant pour l'applaudir.",
    "review.matthieu": "J'ai bien mangé au KFC de Châteauroux après avoir visionné ce super film.",
    "review.charliekirk": "Ce film est très touchant, la performance de Futur Bae est révolutionnaire.",
    "modal.close": "Fermer la vidéo",
    "modal.error": "Impossible de charger la vidéo. Vérifiez le lien dans script.js.",
    "foot.note": "Fan project non officiel — aucune affiliation avec The Walt Disney Company.",
    "editor.title": "Édition rapide",
    "editor.note": "Ces changements ne sont visibles que sur cet appareil (ce navigateur). Pour publier pour tout le monde, modifie script.js puis pousse sur GitHub.",
    "editor.videoFile": "Vidéo depuis mon PC",
    "editor.videoUrl": "…ou coller un lien (YouTube, Vimeo)",
    "editor.poster": "Image derrière le lecteur",
    "editor.apply": "OK",
    "editor.reset": "Tout réinitialiser",
    "editor.done": "Terminé",
    "editor.okVideoFile": "Vidéo chargée. Clique sur Lecture.",
    "editor.okVideoUrl": "Lien enregistré. Clique sur Lecture.",
    "editor.okPoster": "Image mise à jour.",
    "editor.badVideo": "Fichier vidéo non reconnu.",
    "editor.badUrl": "Lien non valide.",
    "editor.badPoster": "Image trop lourde ou illisible.",
    "editor.reset.done": "Réglages locaux effacés."
  },
  en: {
    "a11y.skip": "Skip to content",
    "nav.home": "Home",
    "nav.cinemas": "Cinemas",
    "nav.contact": "Contact",
    "meta.season": "2026 • Season 1",
    "meta.genres": "Comedy, Animation, Short film",
    "btn.play": "PLAY",
    "btn.add": "Add to my list",
    "hero.director": "Directed by Steven Spielberg",
    "hero.synopsis": "Decked out in his finest swim cap and diving goggles, our hero strikes a pose at the Miroir d'Eau. Between the Capucins market and shady dealings, discover the story of the perfect caricature of Léon Marchand… literally walking on water.",
    "poster.watch": "Watch the video",
    "section.cast": "Cast",
    "section.reviews": "Public reviews",
    "btn.moreReviews": "READ MORE REVIEWS",
    "review.regelegorila": "This movie is so insane, it makes Interstellar look like a light breeze, that's for sure. The dub is trash though.",
    "review.johnpork": "It's breathtaking, I really want to call Léon Marchant to give him a round of applause.",
    "review.matthieu": "I had a great meal at the Châteauroux KFC after watching this awesome film.",
    "review.charliekirk": "This film is very touching, Futur Bae's performance is revolutionary.",
    "modal.close": "Close video",
    "modal.error": "Could not load the video. Check the link in script.js.",
    "foot.note": "Unofficial fan project — not affiliated with The Walt Disney Company.",
    "editor.title": "Quick edit",
    "editor.note": "These changes only show on this device (this browser). To publish for everyone, edit script.js and push to GitHub.",
    "editor.videoFile": "Video from my computer",
    "editor.videoUrl": "…or paste a link (YouTube, Vimeo)",
    "editor.poster": "Image behind the player",
    "editor.apply": "OK",
    "editor.reset": "Reset everything",
    "editor.done": "Done",
    "editor.okVideoFile": "Video loaded. Hit Play.",
    "editor.okVideoUrl": "Link saved. Hit Play.",
    "editor.okPoster": "Image updated.",
    "editor.badVideo": "Unrecognised video file.",
    "editor.badUrl": "Invalid link.",
    "editor.badPoster": "Image too large or unreadable.",
    "editor.reset.done": "Local settings cleared."
  }
};

/* ============================================================
   i18n engine
   ============================================================ */
const LANG_KEY = "lmse-lang";
const SUPPORTED = Object.keys(I18N);

function getInitialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (e) { /* private mode / blocked storage */ }
  const nav = (navigator.language || "fr").toLowerCase();
  return nav.startsWith("en") ? "en" : "fr";
}

function applyLang(lang) {
  const dict = I18N[lang] || I18N.fr;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key && dict[key] != null) el.setAttribute(attr, dict[key]);
    });
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
}

function initLang() {
  applyLang(getInitialLang());
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
}

/* ============================================================
   Star ratings
   ============================================================ */
const STAR_PATH =
  "M12 2.2l2.95 5.98 6.6.96-4.77 4.65 1.13 6.57L12 17.98l-5.9 3.1 1.12-6.57L2.45 9.86l6.6-.96z";

function renderStars() {
  document.querySelectorAll(".stars").forEach((box) => {
    const rating = Math.max(0, Math.min(5, parseInt(box.dataset.rating, 10) || 0));
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", rating + "/5");
    box.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", STAR_PATH);
      path.setAttribute("class", i <= rating ? "star-full" : "star-empty");
      svg.appendChild(path);
      box.appendChild(svg);
    }
  });
}

/* ============================================================
   Video URL -> embeddable source
   ============================================================ */
function resolveVideo(rawUrl) {
  const raw = String(rawUrl || "").trim();
  if (!raw) return { type: "error" };
  if (/^blob:/i.test(raw)) return { type: "video", src: raw };

  let u;
  try {
    u = new URL(raw, window.location.href);
  } catch (e) {
    return { type: "error" };
  }

  const host = u.hostname.replace(/^www\./, "").toLowerCase();
  const yt = (id) =>
    "https://www.youtube-nocookie.com/embed/" +
    id +
    "?autoplay=1&rel=0&modestbranding=1&playsinline=1";

  // YouTube — youtu.be/<id>
  if (host === "youtu.be") {
    const id = u.pathname.split("/").filter(Boolean)[0];
    if (id) return { type: "iframe", src: yt(id) };
  }

  // YouTube — youtube.com/watch?v= , /embed/ , /shorts/ , /live/
  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") {
    let id = u.searchParams.get("v");
    if (!id) {
      const parts = u.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live", "v"].includes(parts[0])) id = parts[1];
    }
    if (id) return { type: "iframe", src: yt(id) };
  }

  // Vimeo
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = u.pathname.split("/").filter(Boolean).pop();
    if (id && /^\d+$/.test(id)) {
      return { type: "iframe", src: "https://player.vimeo.com/video/" + id + "?autoplay=1" };
    }
  }

  // Direct video file
  if (/\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i.test(u.pathname)) {
    return { type: "video", src: u.href };
  }

  // Fallback: drop it straight into an iframe
  return { type: "iframe", src: u.href };
}

/* ============================================================
   Local overrides (quick editor) — this browser only
   ------------------------------------------------------------
   - poster image  -> localStorage as a compressed data URL
   - video link    -> localStorage
   - video file    -> IndexedDB (Blob), survives a reload
   ============================================================ */
const LS_POSTER = "lmse-poster-data";
const LS_VIDEO_URL = "lmse-video-url";
const IDB_NAME = "lmse";
const IDB_STORE = "media";
const IDB_VIDEO_KEY = "video";

function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }

function idbOpen() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) { reject(new Error("no idb")); return; }
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function idbGet(key) {
  try {
    const db = await idbOpen();
    return await new Promise((resolve, reject) => {
      const r = db.transaction(IDB_STORE, "readonly").objectStore(IDB_STORE).get(key);
      r.onsuccess = () => resolve(r.result || null);
      r.onerror = () => reject(r.error);
    });
  } catch (e) { return null; }
}
async function idbSet(key, val) {
  const db = await idbOpen();
  return new Promise((resolve, reject) => {
    const r = db.transaction(IDB_STORE, "readwrite").objectStore(IDB_STORE).put(val, key);
    r.onsuccess = () => resolve(true);
    r.onerror = () => reject(r.error);
  });
}
async function idbDel(key) {
  try {
    const db = await idbOpen();
    await new Promise((resolve) => {
      const r = db.transaction(IDB_STORE, "readwrite").objectStore(IDB_STORE).delete(key);
      r.onsuccess = r.onerror = () => resolve();
    });
  } catch (e) { /* ignore */ }
}

/* The video source in effect right now (resolved once at boot, updated by the editor). */
let CURRENT_VIDEO = null;

async function computeCurrentVideo() {
  const officialVideo = (await window.GroupMedia.ready).video;
  if (officialVideo) return resolveVideo(officialVideo);
  const blob = await idbGet(IDB_VIDEO_KEY);
  if (blob) {
    try { return { type: "video", src: URL.createObjectURL(blob) }; } catch (e) { /* fall through */ }
  }
  const savedUrl = lsGet(LS_VIDEO_URL);
  return resolveVideo(savedUrl || (await window.GroupMedia.ready).video || VIDEO_URL);
}

function currentPoster() {
  return lsGet(LS_POSTER) || (POSTER_URL || "").trim();
}

/* ============================================================
   Modal
   ============================================================ */
const modal = document.getElementById("videoModal");
const stage = document.getElementById("videoStage");
const errorMsg = document.getElementById("videoError");
let lastFocused = null;

function buildPlayer() {
  const v = CURRENT_VIDEO || resolveVideo(VIDEO_URL);
  stage.innerHTML = "";
  errorMsg.hidden = true;

  if (!v || v.type === "error") {
    errorMsg.hidden = false;
    return false;
  }

  if (v.type === "video") {
    const el = document.createElement("video");
    el.src = v.src;
    el.controls = true;
    el.autoplay = true;
    el.playsInline = true;
    stage.appendChild(el);
    return true;
  }

  const frame = document.createElement("iframe");
  frame.src = v.src;
  frame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  frame.setAttribute("title", "Léon Marchand sur l'eau");
  stage.appendChild(frame);
  return true;
}

function openModal() {
  lastFocused = document.activeElement;
  buildPlayer();
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) closeBtn.focus();
  document.addEventListener("keydown", onKeydown);
}

function closeModal() {
  modal.hidden = true;
  stage.innerHTML = "";            // stops playback
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onKeydown);
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

function onKeydown(e) {
  if (e.key === "Escape") {
    closeModal();
    return;
  }
  if (e.key === "Tab") {
    // simple focus trap inside the dialog
    const focusables = modal.querySelectorAll(
      'button, [href], iframe, video, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
}

function initModal() {
  document.getElementById("playBtn").addEventListener("click", openModal);
  document.getElementById("posterBtn").addEventListener("click", openModal);
  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );
}

/* ============================================================
   Poster image (POSTER_URL or a local override)
   ============================================================ */
function applyPoster(src) {
  const box = document.getElementById("posterBtn");
  const img = document.getElementById("posterArt");
  if (!box || !img) return;
  if (!src) {
    box.classList.remove("has-art");
    img.hidden = true;
    img.removeAttribute("src");
    return;
  }
  img.onload = () => { box.classList.add("has-art"); img.hidden = false; };
  img.onerror = () => { box.classList.remove("has-art"); img.hidden = true; };
  img.src = src;
}

function initPoster() {
  applyPoster(currentPoster());
}

/* ============================================================
   Quick editor  —  type EDIT_CODE to open
   ============================================================ */
function fileToDataURL(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      const big = Math.max(width, height);
      if (big > maxDim) {
        const s = maxDim / big;
        width = Math.round(width * s);
        height = Math.round(height * s);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      try {
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}

function initEditor() {
  const root = document.getElementById("editor");
  if (!root) return;

  const panel = root.querySelector(".editor-panel");
  const statusEl = document.getElementById("editorStatus");
  const videoFileInput = document.getElementById("editorVideoFile");
  const videoUrlInput = document.getElementById("editorVideoUrl");
  const videoUrlApply = document.getElementById("editorVideoUrlApply");
  const posterFileInput = document.getElementById("editorPosterFile");
  const resetBtn = document.getElementById("editorReset");

  let openerFocus = null;

  const t = (key) => (I18N[document.documentElement.lang] || I18N.fr)[key] || key;

  function say(key, isErr) {
    statusEl.textContent = t(key);
    statusEl.classList.toggle("is-err", !!isErr);
    statusEl.hidden = false;
  }

  function open() {
    openerFocus = document.activeElement;
    root.hidden = false;
    document.body.style.overflow = "hidden";
    videoUrlInput.value = lsGet(LS_VIDEO_URL) || "";
    statusEl.hidden = true;
    statusEl.classList.remove("is-err");
    (panel.querySelector("input, button") || panel).focus();
    document.addEventListener("keydown", onKey);
  }
  function close() {
    root.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    if (openerFocus && typeof openerFocus.focus === "function") openerFocus.focus();
  }
  function onKey(e) {
    if (e.key === "Escape") close();
  }

  // --- video from a local file
  videoFileInput.addEventListener("change", async () => {
    const file = videoFileInput.files && videoFileInput.files[0];
    if (!file) return;
    if (!/^video\//.test(file.type) && !/\.(mp4|webm|ogg|ogv|mov|m4v)$/i.test(file.name)) {
      say("editor.badVideo", true);
      return;
    }
    try {
      await idbSet(IDB_VIDEO_KEY, file);
      lsDel(LS_VIDEO_URL);
      CURRENT_VIDEO = { type: "video", src: URL.createObjectURL(file) };
      say("editor.okVideoFile");
    } catch (e) {
      say("editor.badVideo", true);
    }
  });

  // --- video from a pasted link
  function applyUrl() {
    const val = videoUrlInput.value.trim();
    if (!val) return;
    const resolved = resolveVideo(val);
    if (resolved.type === "error") { say("editor.badUrl", true); return; }
    lsSet(LS_VIDEO_URL, val);
    idbDel(IDB_VIDEO_KEY);
    CURRENT_VIDEO = resolved;
    say("editor.okVideoUrl");
  }
  videoUrlApply.addEventListener("click", applyUrl);
  videoUrlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); applyUrl(); }
  });

  // --- poster image
  posterFileInput.addEventListener("change", async () => {
    const file = posterFileInput.files && posterFileInput.files[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataURL(file, 1600, 0.85);
      if (dataUrl.length > 3.8 * 1024 * 1024 || !lsSet(LS_POSTER, dataUrl)) {
        say("editor.badPoster", true);
        return;
      }
      applyPoster(dataUrl);
      say("editor.okPoster");
    } catch (e) {
      say("editor.badPoster", true);
    }
  });

  // --- reset everything local
  resetBtn.addEventListener("click", async () => {
    lsDel(LS_POSTER);
    lsDel(LS_VIDEO_URL);
    await idbDel(IDB_VIDEO_KEY);
    videoFileInput.value = "";
    posterFileInput.value = "";
    videoUrlInput.value = "";
    CURRENT_VIDEO = resolveVideo(VIDEO_URL);
    applyPoster(currentPoster());
    say("editor.reset.done");
  });

  root.querySelectorAll("[data-editor-close]").forEach((el) =>
    el.addEventListener("click", close)
  );

  // --- trigger: type EDIT_CODE anywhere (not while typing in a field)
  const code = String(EDIT_CODE || "").toLowerCase();
  let buffer = "";
  if (code) {
    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      if (e.key && e.key.length === 1) {
        buffer = (buffer + e.key.toLowerCase()).slice(-code.length);
        if (buffer === code && root.hidden) open();
      }
    });
  }
  if (location.hash.toLowerCase() === "#edit") open();
}

/* ============================================================
   Misc niceties
   ============================================================ */
function initMisc() {
  // "Add to my list" — visual toggle only
  const addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const on = addBtn.classList.toggle("is-on");
      addBtn.style.color = on ? "var(--accent)" : "";
    });
  }

  // "Read more reviews" — no extra content yet, nudge the section
  const more = document.getElementById("moreReviewsBtn");
  if (more) {
    more.addEventListener("click", () => {
      document.getElementById("reviews")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Smooth-scroll for in-page nav links
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener("DOMContentLoaded", async () => {
  initLang();
  renderStars();
  initModal();
  initPoster();
  initEditor();
  initMisc();
  CURRENT_VIDEO = await computeCurrentVideo();
});
