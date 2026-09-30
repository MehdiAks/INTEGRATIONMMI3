/* ==========================================================================
   RAVE N' — Interactions de la page
   Vanilla JS, sans dépendance. Chaque bloc est indépendant : si un élément
   n'est pas présent dans le DOM, le bloc ne fait rien.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------ Utilitaires */

  var toastEl = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.hidden = true;
    }, 2600);
  }

  /* ------------------------------------------------------ Menu principal */

  var menuToggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('menu-principal');

  if (menuToggle && menu) {
    var setMenu = function (open) {
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      menu.hidden = !open;
    };

    menuToggle.addEventListener('click', function () {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    // Fermeture au clic sur un lien, au clic extérieur et sur Échap.
    menu.addEventListener('click', function (event) {
      if (event.target.closest('.nav__link')) setMenu(false);
    });

    document.addEventListener('click', function (event) {
      if (menu.hidden) return;
      if (!menu.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) {
        setMenu(false);
        menuToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------- Galerie média */

  var gallery = document.querySelector('[data-gallery]');

  if (gallery) {
    var stage = gallery.querySelector('[data-gallery-stage]');
    var thumbs = Array.prototype.slice.call(gallery.querySelectorAll('.thumb'));
    var prevBtn = gallery.querySelector('[data-gallery-prev]');
    var nextBtn = gallery.querySelector('[data-gallery-next]');
    var current = Math.max(0, thumbs.findIndex(function (t) {
      return t.classList.contains('is-active');
    }));

    var selectThumb = function (index) {
      if (index < 0 || index >= thumbs.length) return;
      current = index;

      thumbs.forEach(function (thumb, i) {
        var active = i === index;
        thumb.classList.toggle('is-active', active);
        if (active) {
          thumb.setAttribute('aria-current', 'true');
        } else {
          thumb.removeAttribute('aria-current');
        }
      });

      var thumb = thumbs[index];
      if (stage) {
        stage.src = thumb.dataset.src || stage.src;
        stage.alt = thumb.dataset.alt || '';
      }

      thumb.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      updateGalleryNav();
    };

    var updateGalleryNav = function () {
      if (prevBtn) prevBtn.disabled = current <= 0;
      if (nextBtn) nextBtn.disabled = current >= thumbs.length - 1;
    };

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener('click', function () { selectThumb(index); });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { selectThumb(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { selectThumb(current + 1); });

    // Navigation clavier dans la barre de vignettes.
    gallery.addEventListener('keydown', function (event) {
      if (!event.target.closest('.thumb')) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); selectThumb(current + 1); thumbs[current].focus(); }
      if (event.key === 'ArrowLeft')  { event.preventDefault(); selectThumb(current - 1); thumbs[current].focus(); }
    });

    updateGalleryNav();
  }

  /* -------------------------------------------------------------- Carrousels */

  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('[data-carousel-track]');
    var prev = carousel.querySelector('[data-carousel-prev]');
    var next = carousel.querySelector('[data-carousel-next]');
    if (!track) return;

    var step = function () {
      var card = track.firstElementChild;
      if (!card) return track.clientWidth;
      var styles = window.getComputedStyle(track);
      var gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return card.getBoundingClientRect().width + gap;
    };

    var updateNav = function () {
      var max = track.scrollWidth - track.clientWidth - 1;
      if (prev) prev.disabled = track.scrollLeft <= 0;
      if (next) next.disabled = track.scrollLeft >= max;
    };

    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });

    track.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    updateNav();
  });

  /* ----------------------------------------------------------- Favori / like */

  document.querySelectorAll('[data-favorite]').forEach(function (button) {
    button.addEventListener('click', function () {
      var pressed = button.getAttribute('aria-pressed') === 'true';
      button.setAttribute('aria-pressed', String(!pressed));
      button.setAttribute('aria-label', pressed ? 'Ajouter à mes favoris' : 'Retirer de mes favoris');
      showToast(pressed ? 'Retiré de vos favoris' : 'Ajouté à vos favoris');
    });
  });

  /* --------------------------------------------------------------- Partage */

  document.querySelectorAll('[data-share]').forEach(function (button) {
    button.addEventListener('click', function () {
      var payload = {
        title: button.dataset.shareTitle || document.title,
        text: button.dataset.shareTitle || document.title,
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(payload).catch(function () { /* partage annulé */ });
        return;
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(payload.url).then(function () {
          showToast('Lien copié dans le presse-papiers');
        }, function () {
          showToast('Impossible de copier le lien');
        });
        return;
      }

      showToast(payload.url);
    });
  });

  /* ------------------------------------------------- Lien actif dans le menu */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-current', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }
})();
