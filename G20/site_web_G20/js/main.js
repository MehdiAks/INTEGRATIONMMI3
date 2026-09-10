(function () {
	'use strict';

	/* ---------- Mobile nav toggle ---------- */
	var navToggle = document.getElementById('navToggle');
	var mainNav = document.getElementById('mainNav');
	if (navToggle && mainNav) {
		navToggle.addEventListener('click', function () {
			var isOpen = mainNav.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});
	}

	/* ---------- Search panel toggle ---------- */
	var searchToggle = document.getElementById('searchToggle');
	var searchPanel = document.getElementById('searchPanel');
	if (searchToggle && searchPanel) {
		searchToggle.addEventListener('click', function () {
			var isHidden = searchPanel.hasAttribute('hidden');
			if (isHidden) {
				searchPanel.removeAttribute('hidden');
				searchPanel.querySelector('input').focus();
			} else {
				searchPanel.setAttribute('hidden', '');
			}
			searchToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
		});
	}

	/* ---------- Hero carousel ---------- */
	var heroTrack = document.getElementById('heroTrack');
	if (heroTrack) {
		var slides = Array.prototype.slice.call(heroTrack.children);
		var dotsWrap = document.getElementById('heroDots');
		var prevBtn = document.getElementById('heroPrev');
		var nextBtn = document.getElementById('heroNext');
		var current = 0;
		var autoplayDelay = 6000;
		var timer = null;

		slides.forEach(function (_, i) {
			var dot = document.createElement('button');
			dot.setAttribute('aria-label', 'Aller à la diapositive ' + (i + 1));
			if (i === 0) dot.classList.add('active');
			dot.addEventListener('click', function () { goTo(i); });
			dotsWrap.appendChild(dot);
		});

		function update() {
			heroTrack.style.transform = 'translateX(-' + (current * 100) + '%)';
			Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
				dot.classList.toggle('active', i === current);
			});
		}

		function goTo(index) {
			current = (index + slides.length) % slides.length;
			update();
			restartAutoplay();
		}

		function next() { goTo(current + 1); }
		function prev() { goTo(current - 1); }

		function restartAutoplay() {
			if (timer) clearInterval(timer);
			timer = setInterval(next, autoplayDelay);
		}

		nextBtn.addEventListener('click', next);
		prevBtn.addEventListener('click', prev);

		var heroSection = heroTrack.closest('.hero-carousel');
		heroSection.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
		heroSection.addEventListener('mouseleave', restartAutoplay);

		update();
		restartAutoplay();
	}

	/* ---------- Film category tabs ---------- */
	var tabs = document.querySelectorAll('.tab');
	tabs.forEach(function (tab) {
		tab.addEventListener('click', function () {
			var panelId = tab.getAttribute('aria-controls');

			tabs.forEach(function (t) {
				t.classList.remove('active');
				t.setAttribute('aria-selected', 'false');
			});
			tab.classList.add('active');
			tab.setAttribute('aria-selected', 'true');

			document.querySelectorAll('.tab-panel').forEach(function (panel) {
				var isTarget = panel.id === panelId;
				panel.classList.toggle('active', isTarget);
				if (isTarget) {
					panel.removeAttribute('hidden');
				} else {
					panel.setAttribute('hidden', '');
				}
			});
		});
	});

	/* ---------- Film sliders (horizontal scroll) ---------- */
	document.querySelectorAll('.film-slider').forEach(function (slider) {
		var track = slider.querySelector('.film-track');
		var prev = slider.querySelector('.slider-arrow--prev');
		var next = slider.querySelector('.slider-arrow--next');
		if (!track || !prev || !next) return;

		function scrollByCard(direction) {
			var card = track.querySelector('.film-card');
			var gap = 20;
			var distance = card ? card.getBoundingClientRect().width + gap : 240;
			track.scrollBy({ left: direction * distance * 2, behavior: 'smooth' });
		}

		prev.addEventListener('click', function () { scrollByCard(-1); });
		next.addEventListener('click', function () { scrollByCard(1); });
	});

	/* ---------- Trailer modal ---------- */
	var videoModal = document.getElementById('videoModal');
	if (videoModal) {
		var videoPlayer = document.getElementById('videoModalPlayer');
		var videoBackdrop = document.getElementById('videoModalBackdrop');
		var videoClose = document.getElementById('videoModalClose');

		function openTrailer(src) {
			videoPlayer.src = src;
			videoModal.hidden = false;
			document.body.style.overflow = 'hidden';
			videoPlayer.play().catch(function () {});
		}

		function closeTrailer() {
			videoModal.hidden = true;
			videoPlayer.pause();
			videoPlayer.removeAttribute('src');
			videoPlayer.load();
			document.body.style.overflow = '';
		}

		videoBackdrop.addEventListener('click', closeTrailer);
		videoClose.addEventListener('click', closeTrailer);
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && !videoModal.hidden) closeTrailer();
		});

		document.querySelectorAll('[data-trailer]').forEach(function (el) {
			el.style.cursor = 'pointer';
			el.addEventListener('click', function (e) {
				if (e.target.closest('.btn')) return;
				e.preventDefault();
				openTrailer(el.getAttribute('data-trailer'));
			});
		});
	}

})();
