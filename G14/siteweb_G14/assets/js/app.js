const toggle = document.querySelector(".menu-toggle");
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  document.querySelector("#navigation")?.classList.toggle("open", open);
});

const themeToggle = document.querySelector(".theme-toggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle?.setAttribute("aria-checked", String(theme === "dark"));
  themeToggle?.setAttribute("aria-label", theme === "dark" ? "Mode jour" : "Mode nuit");
  const icon = themeToggle?.querySelector(".theme-icon");
  if (icon) icon.src = `assets/images/icon-${theme === "dark" ? "sun" : "moon"}.png`;
}
let savedTheme = "light";
try { savedTheme = localStorage.getItem("travel-theme") === "dark" ? "dark" : "light"; } catch {}
applyTheme(savedTheme);
themeToggle?.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try { localStorage.setItem("travel-theme", theme); } catch {}
});

const labels = {
  transport: { walking: "À pied", bike: "À vélo", motorbike: "À moto", car: "En voiture", four_by_four: "En 4×4", public_transport: "Transports publics", other: "Autre" },
  difficulty: { easy: "Facile", moderate: "Modérée", difficult: "Difficile", extreme: "Extrême" },
  verdict: { recommended: "Recommandé", challenging: "À préparer", avoid: "À éviter" }
};
const routes = Array.isArray(window.ROUTES) ? window.ROUTES : [];
const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" })[character]);
const paragraphs = (value = "") => escapeHtml(value).replace(/\n/g, "<br>");

function ratingStars(rating, compact = false) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fill = Math.round(Math.max(0, Math.min(1, rating - index)) * 100);
    return `<span class="rating-star-display" style="--fill:${fill}%" aria-hidden="true">★</span>`;
  }).join("");
  return `<span class="rating-stars${compact ? " compact" : ""}" aria-label="${String(rating).replace(".", ",")} sur 5">${stars}</span>`;
}

function authorHtml(route) {
  const isAdmin = route.authorRole === "admin";
  return `<span${isAdmin ? ' class="role-admin"' : ""}>${escapeHtml(route.author)}${isAdmin ? ' <small class="comment-role">- administrateur</small>' : ""}</span>`;
}

function routeCard(route) {
  return `<a class="route-card" data-route-id="${route.id}" href="chemin.html?id=${route.id}">
    <div class="route-cover verdict-${escapeHtml(route.verdict)}"><img src="${escapeHtml(route.cover)}" alt="" loading="lazy"><span class="verdict">${labels.verdict[route.verdict]}</span></div>
    <div class="card-meta"><span>${escapeHtml(route.country)}${route.region ? ` · ${escapeHtml(route.region)}` : ""}</span><span>↗</span></div>
    <h3>${escapeHtml(route.title)}</h3><p class="route-mode">${labels.transport[route.transport]} · ${labels.difficulty[route.difficulty]}</p>
    <div class="route-metrics"><span class="card-rating">${ratingStars(route.rating, true)} <strong>${String(route.rating).replace(".", ",")}</strong><small>(${route.ratings})</small></span><span>◼ ${route.commentsCount}</span></div>
    <p class="caption">Publié par ${authorHtml(route)}</p>
  </a>`;
}

function renderRouteLists() {
  document.querySelectorAll("[data-route-list]").forEach((container) => {
    const limit = Number(container.dataset.limit || 0);
    const list = limit ? routes.slice(0, limit) : routes;
    container.innerHTML = list.length ? list.map(routeCard).join("") : '<p class="empty">Aucun chemin publié pour le moment.</p>';
  });
}

function renderCatalogue() {
  const form = document.querySelector("[data-static-filters]");
  const container = document.querySelector("[data-catalogue-list]");
  if (!form || !container) return;
  const countrySelect = form.elements.country;
  [...new Set(routes.map((route) => route.country))].sort((a, b) => a.localeCompare(b, "fr")).forEach((country) => countrySelect.add(new Option(country, country)));

  const update = () => {
    const values = Object.fromEntries(new FormData(form));
    let result = routes.filter((route) => {
      const query = values.q.trim().toLocaleLowerCase("fr");
      return (!query || `${route.title} ${route.country} ${route.region}`.toLocaleLowerCase("fr").includes(query))
        && (!values.country || route.country === values.country)
        && (!values.transport || route.transport === values.transport)
        && (!values.difficulty || route.difficulty === values.difficulty)
        && (!values.verdict || route.verdict === values.verdict);
    });
    result = [...result].sort((a, b) => {
      if (values.sort === "country") return a.country.localeCompare(b.country, "fr") || a.title.localeCompare(b.title, "fr");
      if (values.sort === "rating_desc") return b.rating - a.rating;
      if (values.sort === "rating_asc") return a.rating - b.rating;
      if (values.sort === "comments_desc") return b.commentsCount - a.commentsCount;
      if (values.sort === "comments_asc") return a.commentsCount - b.commentsCount;
      return new Date(b.created) - new Date(a.created);
    });
    container.innerHTML = result.length ? result.map(routeCard).join("") : '<p class="empty">Aucun chemin ne correspond à ces critères.</p>';
    const count = document.querySelector("[data-route-count]");
    if (count) count.innerHTML = `<strong>${result.length}</strong><span>chemin${result.length > 1 ? "s" : ""}</span>`;
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); update(); });
  form.querySelector("[data-reset-filters]")?.addEventListener("click", () => { form.reset(); update(); });
  update();
}

function renderComments(route) {
  const topLevel = route.comments.filter((comment) => comment.parent === null);
  if (!topLevel.length) return '<p class="empty">Aucun retour pour le moment.</p>';
  const identity = (comment) => `<span${comment.role === "admin" ? ' class="role-admin"' : ""}>${escapeHtml(comment.name)}${comment.role === "admin" ? ' <small class="comment-role">- administrateur</small>' : ""}</span>`;
  const commentHtml = (comment) => `<article class="comment"><span class="avatar avatar-placeholder" aria-hidden="true">${escapeHtml(comment.name.charAt(0).toUpperCase())}</span><div class="comment-content"><div class="comment-meta"><strong>${identity(comment)}</strong><time>${escapeHtml(comment.date)}</time></div><p class="prose">${paragraphs(comment.body)}</p></div></article>`;
  return topLevel.map((comment) => {
    const replies = route.comments.filter((reply) => reply.parent === comment.id);
    return `${commentHtml(comment)}${replies.length ? `<div class="replies">${replies.map(commentHtml).join("")}</div>` : ""}`;
  }).join("");
}

function renderRouteDetail() {
  const container = document.querySelector("[data-route-detail]");
  if (!container) return;
  const id = Number(new URLSearchParams(location.search).get("id"));
  const route = routes.find((item) => item.id === id);
  if (!route) {
    container.innerHTML = '<section class="intro"><p class="eyebrow">404</p><h1>Chemin introuvable.</h1><a class="button" href="chemins.html">Retour à la collection ↗</a></section>';
    return;
  }
  document.title = `${route.title} — National Geographic — Les chemins`;
  const slides = route.gallery.map((image, index) => `<figure class="carousel-slide" aria-hidden="${index !== 0}"><img src="${escapeHtml(image)}" alt="Vue ${index + 1} du chemin ${escapeHtml(route.title)}"></figure>`).join("");
  const controls = route.gallery.length > 1 ? `<button class="carousel-arrow carousel-prev" type="button" aria-label="Photographie précédente">←</button><button class="carousel-arrow carousel-next" type="button" aria-label="Photographie suivante">→</button><div class="carousel-dots" aria-label="Choisir une photographie">${route.gallery.map((_, index) => `<button type="button" data-slide="${index}" aria-label="Afficher la photographie ${index + 1}" aria-current="${index === 0}"></button>`).join("")}</div>` : "";
  container.innerHTML = `<article class="route-detail">
    <section class="route-detail-head"><a class="text-link" href="chemins.html">← Tous les chemins</a><div class="detail-title"><div><p class="eyebrow">${labels.verdict[route.verdict]}</p><h1>${escapeHtml(route.title)}</h1><div class="route-rating-summary">${ratingStars(route.rating)}<strong>${String(route.rating).replace(".", ",")}/5</strong><span>${route.ratings} note${route.ratings > 1 ? "s" : ""}</span></div></div><p class="detail-location">${escapeHtml(route.country)}<br>${escapeHtml(route.region)}</p></div></section>
    <div class="route-carousel" data-carousel data-interval="4000" aria-label="Photographies du chemin"><div class="carousel-viewport"><div class="carousel-track">${slides}</div></div>${controls}</div>
    <section class="route-rating-panel"><div><p class="eyebrow">Avis des lecteurs</p><h2>Quelle note mérite ce chemin&nbsp;?</h2></div><a class="button" href="404.html">Se connecter pour noter ↗</a></section>
    <section class="route-facts"><div><span>Déplacement</span><strong>${labels.transport[route.transport]}</strong></div><div><span>Difficulté</span><strong>${labels.difficulty[route.difficulty]}</strong></div><div><span>Distance</span><strong>${escapeHtml(route.distance)}</strong></div><div><span>Durée</span><strong>${escapeHtml(route.duration)}</strong></div></section>
    <section class="route-story"><div><p class="eyebrow">Le chemin</p><h2>Ce qu’il faut savoir avant de partir.</h2><p class="caption">Publié par ${authorHtml(route)}</p></div><div><p class="prose lead">${paragraphs(route.description)}</p>${route.practical ? `<h3>Informations pratiques</h3><p class="prose">${paragraphs(route.practical)}</p>` : ""}<div class="detail-actions">${route.map ? `<a class="button" href="${escapeHtml(route.map)}" target="_blank" rel="noopener noreferrer">Ouvrir la carte ↗</a>` : ""}<a class="pill" href="404.html">Se connecter pour sauvegarder</a></div></div></section>
    <section id="discussion" class="discussion"><div class="section-heading"><div><p class="eyebrow">Carnet de terrain</p><h2>La communauté partage son expérience.</h2></div></div><h3>${route.commentsCount} commentaire${route.commentsCount > 1 ? "s" : ""}</h3><p><a href="404.html">Connectez-vous</a> pour commenter et répondre.</p>${renderComments(route)}</section>
  </article>`;
}

renderRouteLists();
renderCatalogue();
renderRouteDetail();

const ticker = document.querySelector(".ticker");
if (ticker) {
  const track = ticker.querySelector(".ticker-track");
  let animation;
  function animateTicker() {
    animation?.cancel();
    const start = ticker.clientWidth;
    const end = -track.scrollWidth;
    const travel = ((start - end) / (Number(ticker.dataset.speed) || 90)) * 1000;
    const pause = Number(ticker.dataset.pause) || 1500;
    animation = track.animate([
      { transform: `translateX(${start}px)`, offset: 0 },
      { transform: `translateX(${end}px)`, offset: travel / (travel + pause) },
      { transform: `translateX(${end}px)`, offset: 1 }
    ], { duration: travel + pause, iterations: Infinity, easing: "linear" });
    if (document.hidden) animation.pause();
  }
  new ResizeObserver(animateTicker).observe(ticker);
  document.fonts.ready.then(animateTicker);
  document.addEventListener("visibilitychange", () => document.hidden ? animation?.pause() : animation?.play());
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll("[data-slide]")];
  if (!track || slides.length < 2) return;
  let index = 0;
  let timer;
  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => slide.setAttribute("aria-hidden", String(slideIndex !== index)));
    dots.forEach((dot, dotIndex) => dot.setAttribute("aria-current", String(dotIndex === index)));
  };
  const start = () => { clearInterval(timer); timer = setInterval(() => show(index + 1), Number(carousel.dataset.interval) || 4000); };
  carousel.querySelector(".carousel-prev")?.addEventListener("click", () => { show(index - 1); start(); });
  carousel.querySelector(".carousel-next")?.addEventListener("click", () => { show(index + 1); start(); });
  dots.forEach((dot) => dot.addEventListener("click", () => { show(Number(dot.dataset.slide)); start(); }));
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", start);
  start();
});
