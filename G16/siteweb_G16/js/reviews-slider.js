/* ============================================
   LA CHAISE PARFAITE — Reviews Slider
   ============================================ */

function initReviewsSlider() {
  const slider = document.getElementById('avis-slider');
  const prevBtn = document.getElementById('avis-prev');
  const nextBtn = document.getElementById('avis-next');

  if (!slider) return;

  // Générer les cartes d'avis
  let html = '';
  AVIS.forEach(avis => {
    const starsHtml = generateStars(avis.note);
    html += `
      <div class="avis-card">
        <div class="avis-stars">${starsHtml}</div>
        <p class="avis-texte">«\u00a0${avis.texte}\u00a0»</p>
        <div>
          <span class="avis-prenom">${avis.prenom}</span>
          <span class="avis-note-badge"> — ${avis.note}/5</span>
        </div>
      </div>
    `;
  });
  slider.innerHTML = html;

  // Navigation
  const scrollAmount = 360;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

function generateStars(note) {
  let html = '';
  const fullStars = Math.floor(note);
  const hasHalf = note % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    html += '★';
  }
  if (hasHalf) {
    html += '<span class="avis-star-half">★</span>';
  }
  // Étoiles vides pour compléter à 5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    html += '<span style="opacity:0.2">★</span>';
  }
  return html;
}
