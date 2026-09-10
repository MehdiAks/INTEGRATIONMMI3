/* ============================================
   LA CHAISE PARFAITE — Recherche de Séance
   ============================================ */

function openSeanceModal() {
  const modal = document.getElementById('modal-seance');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Focus sur l'input
  setTimeout(() => {
    const input = document.getElementById('cinema-input');
    if (input) input.focus();
  }, 300);
}

function closeSeanceModal() {
  const modal = document.getElementById('modal-seance');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function initCinema() {
  const modal = document.getElementById('modal-seance');
  const closeBtn = document.getElementById('modal-seance-close');
  const searchForm = document.getElementById('cinema-search-form');
  const searchInput = document.getElementById('cinema-input');
  const loading = document.getElementById('cinema-loading');
  const results = document.getElementById('cinema-results');

  // Bouton header
  const btnSeanceHeader = document.getElementById('btn-seance-header');
  if (btnSeanceHeader) {
    btnSeanceHeader.addEventListener('click', openSeanceModal);
  }

  // Fermer
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSeanceModal);
  }

  // Fermer en cliquant à l'extérieur
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSeanceModal();
    });
  }

  // Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeSeanceModal();
    }
  });

  // Recherche
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cp = searchInput.value.trim();
      if (cp.length !== 5 || !/^\d{5}$/.test(cp)) {
        searchInput.style.borderColor = 'var(--accent)';
        setTimeout(() => searchInput.style.borderColor = '', 1000);
        return;
      }

      // Afficher le loading
      results.classList.remove('active');
      results.innerHTML = '';
      loading.classList.add('active');

      // Simuler un délai de recherche
      setTimeout(() => {
        loading.classList.remove('active');
        displayCinemaResults(cp);
      }, 1200);
    });
  }
}

function displayCinemaResults(codePostal) {
  const results = document.getElementById('cinema-results');
  if (!results) return;

  // Trouver les cinémas par département
  const dept = codePostal.substring(0, 2);
  const cinemas = CINEMAS_DATA[dept] || CINEMAS_DATA['default'];

  let html = '';
  cinemas.forEach(cinema => {
    const seancesHtml = cinema.seances.map(s => 
      `<span class="cinema-seance-time">${s}</span>`
    ).join('');

    html += `
      <div class="cinema-result-item">
        <h4 class="cinema-name">${cinema.nom}</h4>
        <p class="cinema-address">${cinema.adresse}</p>
        <div class="cinema-seances">${seancesHtml}</div>
        <button class="cinema-voir-btn" onclick="alert('Réservation bientôt disponible !')">Voir les séances →</button>
      </div>
    `;
  });

  results.innerHTML = html;
  results.classList.add('active');
}
