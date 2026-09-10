const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const releaseDate = new Date('2026-11-13T00:00:00+01:00');

function updateCountdown() {
  const distance = Math.max(0, releaseDate - Date.now());
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor(distance / 3600000) % 24,
    minutes: Math.floor(distance / 60000) % 60,
    seconds: Math.floor(distance / 1000) % 60
  };

  Object.entries(values).forEach(([id, value]) => {
    const element = $(`#${id}`);
    if (element) element.textContent = String(value).padStart(2, '0');
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('.reveal').forEach((element) => observer.observe(element));
} else {
  $$('.reveal').forEach((element) => element.classList.add('visible'));
}

const menu = $('.nav');
const menuButton = $('.menu-toggle');

function setMenuOpen(isOpen) {
  menu?.classList.toggle('open', isOpen);
  menuButton?.setAttribute('aria-expanded', String(isOpen));
  menuButton?.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  document.body.classList.toggle('menu-open', isOpen);
}

menuButton?.addEventListener('click', () => {
  setMenuOpen(!menu?.classList.contains('open'));
});

$$('.nav a').forEach((link) => link.addEventListener('click', () => {
  setMenuOpen(false);
}));

const ticketModal = $('#ticket-modal');

$$('[data-open-tickets]').forEach((button) => button.addEventListener('click', () => {
  if (menu?.contains(button)) setMenuOpen(false);
  ticketModal?.showModal();
  document.body.style.overflow = 'hidden';
}));

$$('[data-close]').forEach((button) => button.addEventListener('click', () => {
  button.closest('dialog')?.close();
  document.body.style.overflow = '';
}));

$$('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }
});

$('#ticket-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.hidden = true;
  const confirmation = $('.ticket-success');
  if (confirmation) confirmation.hidden = false;
});

ticketModal?.addEventListener('close', () => {
  document.body.style.overflow = '';
  setTimeout(() => {
    const form = $('#ticket-form');
    const confirmation = $('.ticket-success');
    if (form) form.hidden = false;
    if (confirmation) confirmation.hidden = true;
  }, 300);
});

window.addEventListener('scroll', () => {
  const background = $('.hero-bg');
  if (background && window.scrollY < innerHeight) {
    background.style.transform = `scale(1.02) translateY(${window.scrollY * 0.09}px)`;
  }
}, { passive: true });
