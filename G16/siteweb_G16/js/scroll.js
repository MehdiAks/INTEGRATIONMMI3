/* ============================================
   LA CHAISE PARFAITE — Scroll Animations
   ============================================ */

function initScroll() {
  // Header opaque au scroll
  const header = document.getElementById('site-header');
  const heroSection = document.getElementById('hero');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Scroll reveal avec IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .animated-line, .stagger-children');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: tout montrer
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Flèche de scroll vers la section suivante
  const scrollArrow = document.getElementById('scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      const filmSection = document.getElementById('film');
      if (filmSection) {
        filmSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Smooth scroll pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const marqueeHeight = document.querySelector('.marquee-bar')?.offsetHeight || 0;
        const headerHeight = header?.offsetHeight || 0;
        const offset = marqueeHeight + headerHeight;
        
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // Gérer les liens [data-action="open-seance"] dans le footer et ailleurs
  document.querySelectorAll('[data-action="open-seance"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openSeanceModal();
    });
  });
}
