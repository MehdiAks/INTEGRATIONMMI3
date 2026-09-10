/* ============================================
   LA CHAISE PARFAITE — Cookies
   ============================================ */

function initCookies() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const prefsOpenBtn = document.getElementById('cookie-prefs-open');
  const prefsModal = document.getElementById('cookie-prefs-modal');
  const prefsSaveBtn = document.getElementById('cookie-prefs-save');

  if (!banner) return;

  // Vérifier si l'utilisateur a déjà fait un choix
  const cookieChoice = localStorage.getItem('lcp_cookies');
  if (cookieChoice) return;

  // Afficher la bannière après un court délai
  setTimeout(() => {
    banner.classList.add('visible');
  }, 1500);

  // Accepter tout
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('lcp_cookies', 'all');
      hideBanner();
    });
  }

  // Refuser
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('lcp_cookies', 'essential');
      hideBanner();
    });
  }

  // Ouvrir les préférences
  if (prefsOpenBtn) {
    prefsOpenBtn.addEventListener('click', () => {
      if (prefsModal) {
        prefsModal.classList.add('open');
      }
    });
  }

  // Fermer le modal préférences en cliquant à l'extérieur
  if (prefsModal) {
    prefsModal.addEventListener('click', (e) => {
      if (e.target === prefsModal) {
        prefsModal.classList.remove('open');
      }
    });
  }

  // Sauvegarder les préférences
  if (prefsSaveBtn) {
    prefsSaveBtn.addEventListener('click', () => {
      const analytics = document.getElementById('cookie-analytics')?.checked || false;
      const marketing = document.getElementById('cookie-marketing')?.checked || false;
      
      const prefs = { essential: true, analytics, marketing };
      localStorage.setItem('lcp_cookies', JSON.stringify(prefs));

      if (prefsModal) prefsModal.classList.remove('open');
      hideBanner();
    });
  }

  function hideBanner() {
    banner.classList.remove('visible');
  }
}
