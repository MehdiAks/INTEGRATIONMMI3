document.addEventListener('DOMContentLoaded', function () {
  const intro = document.getElementById('intro-screen');
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const videoInput = document.getElementById('video-input');
  const loadVideo = document.getElementById('load-video');
  const trailerFrame = document.getElementById('trailer-frame');
  const makingOfInput = document.getElementById('making-of-input');
  const loadMakingOf = document.getElementById('load-making-of');
  const makingOfFrame = document.getElementById('making-of-frame');
  const targetDate = getNextTuesdayAt2110();

  function openSite() {
    if (!intro || intro.classList.contains('is-leaving')) return;
    intro.classList.add('is-leaving');
    window.setTimeout(function () { intro.style.display = 'none'; }, 550);
  }

  if (intro) {
    intro.addEventListener('click', openSite);
    intro.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openSite(); }
    });
  }

  document.querySelectorAll('[data-scroll]').forEach(function (button) {
    button.addEventListener('click', function () {
      const target = document.getElementById(button.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMenu();
    });
  });

  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('header-scrolled', window.scrollY > 24);
  }, { passive: true });

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? '×' : '☰';
    });
  }

  function closeMenu() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }

  if (loadVideo && videoInput) {
    loadVideo.addEventListener('click', function () {
      const video = document.createElement('video');
      video.className = 'trailer-video';
      video.controls = true;
      video.autoplay = true;
      video.src = 'assets/videos/video_G11.mp4';
      const placeholder = trailerFrame.querySelector('.trailer-placeholder');
      const backdrop = trailerFrame.querySelector('.trailer-backdrop');
      const overlay = trailerFrame.querySelector('.trailer-overlay');
      if (placeholder) placeholder.remove();
      if (backdrop) backdrop.remove();
      if (overlay) overlay.remove();
      trailerFrame.classList.add('has-video');
      trailerFrame.prepend(video);
    });
    videoInput.addEventListener('change', function () {
      const file = videoInput.files && videoInput.files[0];
      if (!file) return;
      const video = document.createElement('video');
      video.className = 'trailer-video';
      video.controls = true;
      video.autoplay = true;
      video.src = URL.createObjectURL(file);
      const placeholder = trailerFrame.querySelector('.trailer-placeholder');
      const backdrop = trailerFrame.querySelector('.trailer-backdrop');
      const overlay = trailerFrame.querySelector('.trailer-overlay');
      if (placeholder) placeholder.remove();
      if (backdrop) backdrop.remove();
      if (overlay) overlay.remove();
      trailerFrame.classList.add('has-video');
      trailerFrame.prepend(video);
    });
  }

  if (loadMakingOf && makingOfInput) {
    loadMakingOf.addEventListener('click', function () { makingOfInput.click(); });
    makingOfInput.addEventListener('change', function () {
      const file = makingOfInput.files && makingOfInput.files[0];
      if (!file) return;
      const video = document.createElement('video');
      video.className = 'trailer-video';
      video.controls = true;
      video.autoplay = true;
      video.src = URL.createObjectURL(file);
      const placeholder = makingOfFrame.querySelector('.trailer-placeholder');
      const overlay = makingOfFrame.querySelector('.trailer-overlay');
      if (placeholder) placeholder.remove();
      if (overlay) overlay.remove();
      makingOfFrame.prepend(video);
    });
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(function (element) { observer.observe(element); });

  function updateCountdown() {
    const distance = Math.max(0, targetDate.getTime() - Date.now());
    setText('days', String(Math.floor(distance / 86400000)).padStart(2, '0'));
    setText('hours', String(Math.floor(distance / 3600000) % 24).padStart(2, '0'));
    setText('minutes', String(Math.floor(distance / 60000) % 60).padStart(2, '0'));
    setText('seconds', String(Math.floor(distance / 1000) % 60).padStart(2, '0'));
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const dateLabel = document.getElementById('broadcast-date');
  if (dateLabel) dateLabel.textContent = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(targetDate) + '.';

  const newsletter = document.getElementById('newsletter-form');
  if (newsletter) newsletter.addEventListener('submit', function (event) {
    event.preventDefault();
    newsletter.innerHTML = '<p class="newsletter-confirmation">✓ Votre inscription de démonstration est confirmée.</p>';
  });

  function setText(id, value) { const element = document.getElementById(id); if (element) element.textContent = value; }
  function getNextTuesdayAt2110() {
    const date = new Date();
    const daysUntilTuesday = (2 - date.getDay() + 7) % 7 || 7;
    date.setDate(date.getDate() + daysUntilTuesday);
    date.setHours(21, 10, 0, 0);
    return date;
  }
});
