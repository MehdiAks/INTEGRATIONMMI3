/* ============================================
   LA CHAISE PARFAITE — Menu Burger Fullscreen
   ============================================ */

function initMenu() {
  const burgerBtn = document.getElementById('burger-btn');
  const menu = document.getElementById('fullscreen-menu');
  const menuLinks = menu.querySelectorAll('.menu-link');
  const closeBtn = document.getElementById('menu-close-btn');

  if (!burgerBtn || !menu) return;

  function openMenu() {
    burgerBtn.classList.add('active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    burgerBtn.classList.remove('active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  burgerBtn.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button (X)
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Fermer le menu au clic sur un lien
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.dataset.action === 'open-seance') {
        e.preventDefault();
        closeMenu();
        setTimeout(() => openSeanceModal(), 300);
        return;
      }
      closeMenu();
    });
  });

  // Fermer au Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}
