const projects = [
  { group: "G01", title: "Gavé", pagePath: "G01/siteweb_G01/index.html" },
  { group: "G02", title: "Rive Droite vs Rive Gauche", pagePath: "G02/siteweb_G02/index.html" },
  { group: "G03", title: "Le Batcub", pagePath: "G03/siteweb_G03/index.html" },
  { group: "G04", title: "Le miroir d’eau sans eau", pagePath: "G04/siteweb_G04/index.html" },
  { group: "G05", title: "La gourde oubliée", pagePath: "G05/siteweb_G05/index.html" },
  { group: "G06", title: "Le choix du resto à midi", pagePath: "G06/siteweb_G06/index.html" },
  { group: "G07", title: "Le café à 40 centimes", pagePath: "G07/siteweb_G07/index.html" },
  { group: "G08", title: "Le distributeur", pagePath: "G08/siteweb_G08/index.html" },
  { group: "G09", title: "One prise", pagePath: "G09/siteweb_G09/site_grp09.html" },
  { group: "G10", title: "Le AirDrop inconnu", pagePath: "G10/siteweb_G10/index.html" },
  { group: "G11", title: "Le message supprimé", pagePath: "G11/siteweb_G11/index.html" },
  { group: "G12", title: "L’appel inconnu", pagePath: "G12/siteweb_G12/index.html" },
  { group: "G13", title: "« J’arrive dans 5 minutes »", pagePath: "G13/siteweb_G13/index.html" },
  { group: "G14", title: "Le raccourci qui prend plus de temps", pagePath: "G14/siteweb_G14/index.html" },
  { group: "G15", title: "La porte qu’on tient", pagePath: "G15/GRP15_site_web/index.html" },
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

function buildPosterCandidates(group, siteFolder) {
  const siteRoot = siteFolder.replace(/\/[^/]+$/, "");
  const roots = [
    siteRoot,
    siteFolder,
    `${siteRoot}/images`,
    `${siteRoot}/img`,
    `${siteRoot}/assets`,
    `${siteRoot}/assets/images`,
    `${siteRoot}/assets/img`,
    `${siteRoot}/assets/posters`,
    `${siteRoot}/assets/image`,
    `${siteRoot}/files`,
    `${siteRoot}/public`,
    `${siteFolder}/images`,
    `${siteFolder}/img`,
    `${siteFolder}/assets`,
    `${siteFolder}/assets/images`,
    `${siteFolder}/assets/img`,
    `${siteFolder}/assets/posters`,
    `${siteFolder}/assets/image`,
    `${siteFolder}/files`,
    `${siteFolder}/public`
  ];

  const baseNames = [
    `affiche_${group}`,
    `Affiche_${group}`,
    "affiche",
    "Affiche",
    "poster",
    "image",
    "video",
    "bande-annonce"
  ];

  const extensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "pdf", "mp4", "mov", "webm", "m4v"];
  const candidates = [];

  roots.forEach((root) => {
    baseNames.forEach((baseName) => {
      extensions.forEach((extension) => {
        candidates.push(`${root}/${baseName}.${extension}`);
      });
    });
  });

  return [...new Set(candidates)];
}

projects.forEach(({ group, title, pagePath }, index) => {
  const siteFolder = pagePath.replace(/\/index\.html$/i, "").replace(/\/[^/]+\.html$/i, "");
  const card = document.createElement("a");
  card.className = "project-card";
  card.href = pagePath;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.setAttribute("aria-label", `Ouvrir le projet ${group} : ${title}`);

  const poster = document.createElement("div");
  poster.className = "poster";

  poster.innerHTML = `
    <span class="project-number">${group}</span>
    <span class="project-arrow" aria-hidden="true">↗</span>
  `;

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

  function tryNext() {
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
      const frame = document.createElement("iframe");
      frame.className = "pdf-poster";
      frame.title = `Affiche PDF du projet ${group}`;
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

const video = document.getElementById("backgroundVideo");
if (video) {
  video.play().catch(() => {
    // L'attribut muted + playsinline devrait normalement permettre l'autoplay.
  });
}
