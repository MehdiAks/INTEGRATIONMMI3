/* ============================================
   LA CHAISE PARFAITE — Compte à rebours
   ============================================ */

function initCountdown() {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const target = RELEASE_DATE.getTime();
    const diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const newDays = String(days).padStart(2, '0');
    const newHours = String(hours).padStart(2, '0');
    const newMinutes = String(minutes).padStart(2, '0');
    const newSeconds = String(seconds).padStart(2, '0');

    // Micro-animation au changement
    if (secondsEl.textContent !== newSeconds) {
      secondsEl.classList.add('flip');
      setTimeout(() => secondsEl.classList.remove('flip'), 150);
    }

    daysEl.textContent = newDays;
    hoursEl.textContent = newHours;
    minutesEl.textContent = newMinutes;
    secondsEl.textContent = newSeconds;
  }

  // Mise à jour immédiate puis toutes les secondes
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
