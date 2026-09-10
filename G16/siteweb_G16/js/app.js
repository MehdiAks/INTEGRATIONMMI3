/* ============================================
   LA CHAISE PARFAITE — App (Point d'entrée)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialiser le bandeau marquee
  initMarquee();

  // Initialiser les icônes sociales
  initSocialIcons();

  // Initialiser les personnages
  initPersonnages();

  // Initialiser les critiques presse
  initPresse();

  // Initialiser tous les modules
  initCountdown();
  initMenu();
  initScroll();
  initCinema();
  initNewsletter();
  initFAQ();
  initCookies();
  initReviewsSlider();
});

/* ——— BANDEAU MARQUEE ——— */
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  // Dupliquer le contenu pour créer la boucle infinie
  let content = '';
  const items = RECOMPENSES_MARQUEE.join('  ·  ');
  // Répéter suffisamment pour couvrir l'écran
  for (let i = 0; i < 6; i++) {
    content += `<span class="marquee-item">${items}</span>`;
  }
  track.innerHTML = content;
}

/* ——— ICÔNES SOCIALES SVG ——— */
const SOCIAL_ICONS = {
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.28 8.28 0 0 0 3.76.9V6.69z"/>
  </svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.57 31.57 0 0 0 0 12a31.57 31.57 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.85.55 9.38.55 9.38.55s7.53 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.57 31.57 0 0 0 24 12a31.57 31.57 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/>
  </svg>`
};

function initSocialIcons() {
  const containers = ['hero-social', 'menu-social', 'footer-social'];

  containers.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    Object.entries(SOCIAL_LINKS).forEach(([platform, url]) => {
      const icon = SOCIAL_ICONS[platform] || '';
      const label = platform.charAt(0).toUpperCase() + platform.slice(1);
      html += `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${icon}</a>`;
    });
    container.innerHTML = html;
  });
}

/* ——— PERSONNAGES ——— */
function initPersonnages() {
  const grid = document.getElementById('personnages-grid');
  if (!grid) return;

  let html = '';
  PERSONNAGES.forEach(perso => {
    const isSpecial = perso.isSpecial ? ' is-special' : '';
    const acteurHtml = perso.acteur 
      ? `<p class="personnage-acteur">${perso.acteur}</p>` 
      : '';

    html += `
      <div class="personnage-card${isSpecial}">
        <div class="personnage-image-wrapper">
          <img 
            src="${perso.image}" 
            alt="${perso.nom}" 
            class="personnage-img"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          >
          <div class="personnage-placeholder" style="display:none;">
            <svg class="personnage-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              ${perso.isSpecial 
                ? '<rect x="4" y="8" width="16" height="12" rx="1"/><path d="M7 8V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2"/>' 
                : '<circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>'}
            </svg>
          </div>
          <div class="personnage-overlay">
            <h3 class="personnage-nom">${perso.nom}</h3>
            <p class="personnage-soustitre">${perso.sousTitre}</p>
            ${acteurHtml}
            <p class="personnage-description">${perso.description}</p>
          </div>
        </div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

/* ——— CRITIQUES PRESSE ——— */
function initPresse() {
  const featuredContainer = document.getElementById('presse-featured');
  const secondaryContainer = document.getElementById('presse-secondary');

  if (!featuredContainer || !secondaryContainer) return;

  const featured = CRITIQUES_PRESSE.filter(c => c.featured);
  const secondary = CRITIQUES_PRESSE.filter(c => !c.featured);

  let featuredHtml = '';
  featured.forEach(critique => {
    const noteHtml = critique.note ? `<p class="presse-note">${critique.note}</p>` : '';
    featuredHtml += `
      <div class="presse-card featured">
        <p class="presse-media">${critique.media}</p>
        ${noteHtml}
        <p class="presse-citation">${critique.citation}</p>
      </div>
    `;
  });
  featuredContainer.innerHTML = featuredHtml;

  let secondaryHtml = '';
  secondary.forEach(critique => {
    const noteHtml = critique.note ? `<p class="presse-note">${critique.note}</p>` : '';
    secondaryHtml += `
      <div class="presse-card-small">
        <p class="presse-media">${critique.media}</p>
        ${noteHtml}
        <p class="presse-citation">${critique.citation}</p>
      </div>
    `;
  });
  secondaryContainer.innerHTML = secondaryHtml;
}
