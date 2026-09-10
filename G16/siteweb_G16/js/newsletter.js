/* ============================================
   LA CHAISE PARFAITE — Newsletter
   ============================================ */

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const successMsg = document.getElementById('newsletter-success');

  if (!form || !successMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) return;

    // Masquer le formulaire
    form.style.opacity = '0';
    form.style.transform = 'translateY(-10px)';
    form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    setTimeout(() => {
      form.style.display = 'none';
      // Afficher le message de succès
      successMsg.classList.add('visible');
    }, 300);
  });
}
