/* ============================================
   LA CHAISE PARFAITE — FAQ Accordéons
   ============================================ */

function initFAQ() {
  const faqList = document.getElementById('faq-list');
  if (!faqList) return;

  // Générer les items FAQ
  let html = '';
  FAQ_ITEMS.forEach((item, index) => {
    html += `
      <div class="faq-item" id="faq-item-${index}">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
          <span>${item.question}</span>
          <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
        <div class="faq-answer" id="faq-answer-${index}" role="region">
          <div class="faq-answer-inner">
            ${item.reponse}
          </div>
        </div>
      </div>
    `;
  });
  faqList.innerHTML = html;

  // Event listeners pour les accordéons
  faqList.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const answerInner = answer.querySelector('.faq-answer-inner');
      const isOpen = item.classList.contains('open');

      // Fermer tous les autres
      faqList.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          openItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      // Toggle l'item courant
      if (isOpen) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answerInner.scrollHeight + 'px';
      }
    });
  });
}
