const projects = [
  { group: "G01", title: "Gavé", pagePath: "G01/siteweb_G01/index.html" },
  { group: "G02", title: "Rive Droite vs Rive Gauche", pagePath: "G02/siteweb_G02/index.html" },
  { group: "G03", title: "Le Batcub", pagePath: "G03/siteweb_G03/dist/client/index.html" },
  { group: "G04", title: "Le miroir d’eau sans eau", pagePath: "G04/siteweb_G04/index.html" },
  { group: "G05", title: "La gourde oubliée", pagePath: "G05/siteweb_G05/index.html" },
  { group: "G06", title: "Le choix du resto à midi", pagePath: "G06/siteweb_G06/index.html" },
  { group: "G07", title: "Le café à 40 centimes", pagePath: "G07/siteweb_G07/index.html" },
  { group: "G08", title: "Le distributeur", pagePath: "G08/siteweb_G08/index.html" },
  { group: "G09", title: "One prise", pagePath: "G09/siteweb_G09/index.html" },
  { group: "G10", title: "Le AirDrop inconnu", pagePath: "G10/siteweb_G10/index.html" },
  { group: "G11", title: "Le message supprimé", pagePath: "G11/siteweb_G11/index.html" },
  { group: "G12", title: "L’appel inconnu", pagePath: "G12/siteweb_G12/index.html" },
  { group: "G13", title: "« J’arrive dans 5 minutes »", pagePath: "G13/siteweb_G13/index.html" },
  { group: "G14", title: "Le raccourci qui prend plus de temps", pagePath: "G14/siteweb_G14/index.html" },
  { group: "G15", title: "La porte qu’on tient", pagePath: "G15/GRP15_site_web/dist/index.html" },
  { group: "G16", title: "La chaise parfaite", pagePath: "G16/siteweb_G16/index.html" },
  { group: "G17", title: "La pause clope sans clope", pagePath: "G17/Siteweb_G17/index.html" },
  { group: "G18", title: "« Ça prend 5 minutes »", pagePath: "G18/siteweb_G18/index.html" },
  { group: "G19", title: "FINAL_v2_def_BON", pagePath: "G19/siteweb_G19/index.html" },
  { group: "G20", title: "La typo interdite", pagePath: "G20/site_web_G20/index.html" }
];

const grid = document.getElementById("projectGrid");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mediaFolders(group, siteFolder) {
  const actualSite = siteFolder.replace(/\/dist(?:\/client)?$/, "");
  return [...new Set([`${group}/siteweb_${group}`, actualSite])];
}
function buildPosterCandidates(group, siteFolder) {
  return mediaFolders(group, siteFolder).flatMap(folder =>
    ["png", "jpg", "jpeg", "pdf"].map(extension => `${folder}/assets/images/affiche_${group}.${extension}`)
  );
}
function buildVideoCandidates(group, siteFolder) {
  return mediaFolders(group, siteFolder).flatMap(folder =>
    ["mp4", "mov"].map(extension => `${folder}/assets/videos/video_${group}.${extension}`)
  );
}

const mediaDialog = document.getElementById("mediaDialog");
const mediaContent = document.getElementById("mediaContent");
let mediaRequest = 0;
let previousOverflow = "";

function findMedia(candidates) {
  return window.GroupMedia.findCandidates(candidates);
}

function clearMedia() {
  mediaContent.querySelector("video")?.pause();
  mediaContent.replaceChildren();
}

mediaDialog.addEventListener("close", () => {
  mediaRequest++;
  clearMedia();
  document.body.style.overflow = previousOverflow;
});
document.getElementById("mediaClose").addEventListener("click", () => mediaDialog.close());
mediaDialog.addEventListener("click", event => {
  if (event.target === mediaDialog) {
    const box = mediaDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) mediaDialog.close();
  }
});

async function openMedia(kind, group, title, siteFolder) {
  const request = ++mediaRequest;
  clearMedia();
  document.getElementById("mediaTitle").textContent = `${kind === "video" ? "Vidéo" : "Affiche"} — ${group} · ${title}`;
  mediaContent.textContent = "Chargement…";
  if (!mediaDialog.open) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mediaDialog.showModal();
  }
  const actualSite = siteFolder.replace(/\/dist(?:\/client)?$/, "");
  const candidates = kind === "video"
    ? buildVideoCandidates(group, siteFolder)
    : buildPosterCandidates(group, siteFolder);
  const src = await findMedia(candidates);
  if (request !== mediaRequest || !mediaDialog.open) return;
  mediaContent.replaceChildren();
  if (!src) {
    mediaContent.textContent = location.protocol === "file:"
      ? "Le navigateur ne peut pas détecter ce fichier local automatiquement."
      : `${kind === "video" ? "La vidéo" : "L’affiche"} de ${group} n’est pas encore disponible.`;
    if (location.protocol === "file:") {
      const note = document.createElement("p");
      note.textContent = "Vous pouvez aussi ouvrir directement le fichier :";
      mediaContent.appendChild(note);
      for (const candidate of candidates) {
        const link = document.createElement("a");
        link.href = candidate; link.target = "_blank"; link.rel = "noopener noreferrer";
        link.textContent = candidate.split('/').pop();
        mediaContent.appendChild(link);
      }
    }
    return;
  }
  let media;
  if (kind === "video") {
    media = document.createElement("video");
    media.controls = true;
    media.playsInline = true;
    media.preload = "metadata";
  } else if (src.endsWith(".pdf")) {
    media = document.createElement("iframe");
    media.title = `Affiche PDF de ${group}`;
  } else {
    media = document.createElement("img");
    media.alt = `Affiche de ${group} — ${title}`;
  }
  media.src = src;
  mediaContent.appendChild(media);
  const link = document.createElement("a");
  link.href = src;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Ouvrir le fichier dans un nouvel onglet ↗";
  mediaContent.appendChild(link);
  media.addEventListener("error", () => {
    const message = document.createElement("p");
    message.textContent = "Ce fichier ne peut pas être affiché dans ce navigateur. Vous pouvez l’ouvrir avec le lien ci-dessous.";
    media.replaceWith(message);
  }, { once: true });
  if (kind === "video") media.play().catch(() => {});
}

projects.forEach(({ group, title, pagePath }, index) => {
  const siteFolder = pagePath.replace(/\/index\.html$/i, "").replace(/\/[^/]+\.html$/i, "");
  const card = document.createElement("article");
  card.className = "project-card";
  card.classList.add("is-pending");
  card.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
  card.setAttribute("aria-label", `Projet ${group} : ${title}`);

  const poster = document.createElement("div");
  poster.className = "poster";

  poster.innerHTML = `
    <span class="project-number">${group}</span>

  `;

  const actions = document.createElement("div");
  actions.className = "project-actions";
  const visit = document.createElement("a");
  visit.href = pagePath;
  visit.target = "_blank";
  visit.rel = "noopener noreferrer";
  visit.textContent = "Visiter le site ↗";
  visit.setAttribute("aria-label", `Visiter le site de ${group}`);
  actions.appendChild(visit);
  for (const [kind, label] of [["poster", "Afficher l’affiche"], ["video", "Voir la vidéo"]]) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-label", `${label} — ${group}`);
    button.setAttribute("aria-haspopup", "dialog");
    button.addEventListener("click", () => openMedia(kind, group, title, siteFolder));
    actions.appendChild(button);
  }
  poster.appendChild(actions);

  const image = document.createElement("img");
  image.alt = `Affiche du projet ${group} — ${title}`;
  image.loading = index < 4 ? "eager" : "lazy";
  image.decoding = "async";

  const candidates = buildPosterCandidates(group, siteFolder);
  let candidateIndex = 0;
  let currentMedia = null;

  function appendMedia(element) {
    if (currentMedia && currentMedia !== element) {
      currentMedia.remove();
    }

    poster.appendChild(element);
    currentMedia = element;
  }

  async function tryNext() {
    if (candidateIndex >= candidates.length) {
      poster.insertAdjacentHTML(
        "beforeend",
        `<div style="
          position:absolute;inset:0;display:grid;place-items:center;
          padding:30px;text-align:center;background:#C0ADD8;color:#530096;
          font-weight:800;">
          ${escapeHtml(group)}<br>Affiche à venir
        </div>`
      );
      return;
    }

    const src = candidates[candidateIndex++];
    const extension = src.split(".").pop().toLowerCase();
    const isPdf = extension === "pdf";
    const isVideo = ["mp4", "mov", "webm", "m4v"].includes(extension);

    if (isPdf) {
      try {
        const response = await fetch(src, { method: "HEAD" });
        if (!response.ok || response.headers.get("content-type")?.includes("text/html")) return tryNext();
      } catch { return tryNext(); }
      const frame = document.createElement("iframe");
      frame.className = "pdf-poster";
      frame.title = `Affiche PDF du projet ${group}`;
      frame.tabIndex = -1;
      frame.src = src;
      frame.addEventListener("error", tryNext);
      appendMedia(frame);
      return;
    }

    if (isVideo) {
      const video = document.createElement("video");
      video.className = "video-poster";
      video.src = src;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", `Affiche vidéo du projet ${group}`);
      video.addEventListener("error", tryNext);
      appendMedia(video);
      video.play().catch(() => {});
      return;
    }

    image.src = src;
    appendMedia(image);
  }

  image.addEventListener("error", tryNext);
  tryNext();

  const titleElement = document.createElement("h3");
  titleElement.className = "project-title";
  titleElement.textContent = title;

  card.appendChild(poster);
  card.appendChild(titleElement);
  grid.appendChild(card);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".project-card").forEach((card) => cardObserver.observe(card));

  const parallaxTargets = [
    [document.querySelector(".background video"), 0.035],
    [document.querySelector(".aurora-one"), -0.025],
    [document.querySelector(".aurora-two"), 0.045],
    [document.querySelector(".section-orb-one"), -0.04],
    [document.querySelector(".section-orb-two"), 0.03]
  ];

  let ticking = false;
  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxTargets.forEach(([element, speed]) => {
      if (element) element.style.translate = `0 ${scrollY * speed}px`;
    });
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();
} else {
  document.querySelectorAll(".project-card").forEach((card) => card.classList.add("is-visible"));
}

const video = document.getElementById("backgroundVideo");
if (video) {
  video.play().catch(() => {
    // L'attribut muted + playsinline devrait normalement permettre l'autoplay.
  });
}
