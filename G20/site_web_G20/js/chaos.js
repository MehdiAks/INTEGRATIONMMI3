/* ============================================================
   Chaos system — every click and scroll pushes the site closer
   to collapse. Score resets on every page load. Buttons lead
   nowhere on purpose: they only exist to farm points.
   ============================================================ */
(function () {
	'use strict';

	var LEVEL_THRESHOLDS = [0, 150, 300, 450, 600, 750];
	var LEVEL_NAMES = ['Stable', 'Perturbé', 'Instable', 'Critique', 'Catastrophique', 'Effondrement total'];

	/* Fonts picked by the team (see css/fonts.css for @font-face) —
	   unlocked in tiers as the chaos level rises. */
	var FONT_TIERS = {
		2: ['Windsong', 'Metropolitan', 'Fiolex Girls', 'Balloon', 'PT Banana Split', 'Eileen Caps'],
		3: ['Snoopy', 'Jurassic Park', 'Legothick', 'Papyrus EBO', 'Galaxy Far Far Away', 'Stoney Billy'],
		4: ['Army', 'DEATHNOTE', 'Blox', 'Burnt MF', 'Blazed', 'DK Crayon Crumble']
	};
	var FONT_POOL_ALL = [].concat(
		FONT_TIERS[2], FONT_TIERS[3], FONT_TIERS[4],
		['Alien Dude', 'Axel Gilby Comic Sans', 'Bizarre', 'TH3 Machine', 'This Night', 'Wedgie']
	);

	var score = 0;
	var currentLevel = -1;

	function rand(min, max) { return Math.random() * (max - min) + min; }
	function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
	function fontFamily(name) { return "'" + name + "', cursive"; }

	function getLevel() {
		var level = 0;
		for (var i = 0; i < LEVEL_THRESHOLDS.length; i++) {
			if (score >= LEVEL_THRESHOLDS[i]) level = i;
		}
		return level;
	}

	/* ---------- HUD ---------- */
	var hud = document.createElement('div');
	hud.className = 'chaos-hud';
	hud.innerHTML =
		'<div class="chaos-hud-score" id="chaosScoreValue">0</div>' +
		'<div class="chaos-hud-label">points de chaos</div>' +
		'<div class="chaos-hud-level" id="chaosLevelLabel">Stable</div>' +
		'<div class="chaos-hud-reset" id="chaosReset" title="Touche 0 pour réinitialiser">touche 0 = reset</div>';
	document.documentElement.appendChild(hud);

	var scoreValueEl = document.getElementById('chaosScoreValue');
	var levelLabelEl = document.getElementById('chaosLevelLabel');
	var resetEl = document.getElementById('chaosReset');

	function resetChaos() {
		score = 0;
		updateHud();
		removeGifs();
		applyLevel(getLevel());
	}

	resetEl.addEventListener('dblclick', resetChaos);

	/* Pressing the "0" key resets the chaos, unless the user is typing
	   into a field (search, email, postal code…). */
	document.addEventListener('keydown', function (e) {
		if (e.key !== '0') return;
		var tag = document.activeElement ? document.activeElement.tagName : '';
		if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
		resetChaos();
	});

	function updateHud() {
		scoreValueEl.textContent = Math.floor(score);
		var level = getLevel();
		levelLabelEl.textContent = LEVEL_NAMES[level];
		hud.setAttribute('data-level', String(level));
	}

	function floatPoints(amount, x, y) {
		var el = document.createElement('div');
		el.className = 'chaos-float';
		el.textContent = '+' + amount;
		el.style.left = x + 'px';
		el.style.top = y + 'px';
		document.documentElement.appendChild(el);
		setTimeout(function () { el.remove(); }, 900);
	}

	function addChaos(amount, x, y) {
		score += amount;
		updateHud();
		if (typeof x === 'number') floatPoints(amount, x, y);
		var level = getLevel();
		if (level !== currentLevel) applyLevel(level);
	}

	/* ---------- Poster chaos: invert, rotate, overlap ---------- */
	function mutatePosters(level) {
		var posters = document.querySelectorAll('.film-poster');
		posters.forEach(function (poster) {
			if (level <= 0) {
				poster.style.transform = '';
				poster.style.filter = '';
				poster.style.marginLeft = '';
				poster.style.zIndex = '';
				return;
			}
			var maxRotate = [0, 4, 10, 18, 28, 45][level];
			var rotate = rand(-maxRotate, maxRotate);
			var scaleX = (level >= 4 && Math.random() < 0.4) ? -1 : 1;
			var overlap = level >= 3 ? -rand(0, level * 6) : 0;
			var invert = (level >= 3 && Math.random() < 0.5) ? rand(0.5, 1) : 0;
			var hue = level >= 1 ? rand(0, level * 20) : 0;

			poster.style.position = 'relative';
			poster.style.transform = 'rotate(' + rotate.toFixed(1) + 'deg) scaleX(' + scaleX + ')';
			poster.style.filter = 'invert(' + invert.toFixed(2) + ') hue-rotate(' + hue.toFixed(0) + 'deg)';
			poster.style.marginLeft = overlap.toFixed(0) + 'px';
			poster.style.zIndex = String(Math.floor(rand(1, 10)));
		});
	}

	/* ---------- Heading chaos: mixed ugly fonts at max level ---------- */
	function mutateHeadings(level) {
		var headings = document.querySelectorAll('h1, h2, h3');
		headings.forEach(function (el) {
			if (level >= 5) {
				el.style.fontFamily = fontFamily(pick(FONT_POOL_ALL));
				el.style.transform = 'rotate(' + rand(-6, 6).toFixed(1) + 'deg)';
				el.style.display = 'inline-block';
			} else {
				el.style.fontFamily = '';
				el.style.transform = '';
				el.style.display = '';
			}
		});
	}

	/* ---------- Typography chaos: a fresh random pick from the team's
	   font library each time a new level is reached ---------- */
	function applyFontsForLevel(level) {
		var html = document.documentElement;
		if (level < 2) {
			html.style.removeProperty('--font-head');
			html.style.removeProperty('--font-body');
			return;
		}
		var headTier = level >= 4 ? FONT_TIERS[4] : (level >= 3 ? FONT_TIERS[3] : FONT_TIERS[2]);
		html.style.setProperty('--font-head', fontFamily(pick(headTier)));

		if (level >= 3) {
			var bodyTier = level >= 4 ? FONT_TIERS[4] : FONT_TIERS[3];
			html.style.setProperty('--font-body', fontFamily(pick(bodyTier)));
		} else {
			html.style.removeProperty('--font-body');
		}
	}

	/* ---------- Level-up feedback: a brief screen flash ---------- */
	function showLevelUp(level) {
		var flash = document.createElement('div');
		flash.className = 'chaos-flash';
		document.documentElement.appendChild(flash);
		setTimeout(function () { flash.remove(); }, 450);
	}

	/* ---------- Max level: roaming GIFs ---------- */
	var FLOATING_GIFS = [
		{ file: 'baby.gif', w: 57 },
		{ file: 'hotdog.gif', w: 96 },
		{ file: 'bird.gif', w: 90 },
		{ file: 'unicorn.gif', w: 100 }
	];
	var gifsSpawned = false;

	function spawnGifs() {
		if (gifsSpawned) return;
		gifsSpawned = true;

		FLOATING_GIFS.forEach(function (g) {
			var img = document.createElement('img');
			img.src = 'assets/gifs/' + g.file;
			img.className = 'chaos-gif';
			img.style.width = g.w + 'px';
			img.style.top = rand(6, 82).toFixed(1) + 'vh';
			img.style.left = rand(4, 88).toFixed(1) + 'vw';
			img.style.animationDuration = rand(2.5, 4.5).toFixed(1) + 's';
			img.style.animationDelay = '-' + rand(0, 3).toFixed(1) + 's';
			document.documentElement.appendChild(img);
		});

		var shark = document.createElement('img');
		shark.src = 'assets/gifs/shark.gif';
		shark.className = 'chaos-gif chaos-gif--shark';
		shark.style.top = rand(12, 78).toFixed(1) + 'vh';
		shark.style.animationDuration = rand(8, 13).toFixed(1) + 's';
		document.documentElement.appendChild(shark);
	}

	function removeGifs() {
		gifsSpawned = false;
		document.querySelectorAll('.chaos-gif').forEach(function (el) { el.remove(); });
	}

	var initialized = false;

	function applyLevel(level) {
		var leveledUp = initialized && level > currentLevel;
		currentLevel = level;
		var html = document.documentElement;
		html.setAttribute('data-chaos', String(level));
		for (var i = 1; i <= 5; i++) {
			html.classList.toggle('chaos-' + i, i <= level);
		}
		mutatePosters(level);
		mutateHeadings(level);
		applyFontsForLevel(level);
		if (level >= 5) spawnGifs();
		if (leveledUp) showLevelUp(level);
	}

	/* ---------- Interaction: clicking dead buttons pays big ---------- */
	document.addEventListener('click', function (e) {
		var trigger = e.target.closest(
			'.btn, .icon-btn, .tab, .play-btn, .hero-arrow, .slider-arrow, .hero-dots button, button, a[href="#"]'
		);
		var amount;

		if (trigger) {
			amount = Math.round(rand(50, 90));
			if (trigger.tagName === 'A' && trigger.getAttribute('href') === '#') {
				e.preventDefault();
			}
		} else {
			amount = Math.round(rand(3, 10));
		}

		addChaos(amount, e.clientX, e.clientY);
	});

	/* ---------- Interaction: scrolling pays small but steady ---------- */
	var lastScrollY = window.scrollY;
	window.addEventListener('scroll', function () {
		var y = window.scrollY;
		var delta = Math.abs(y - lastScrollY);
		lastScrollY = y;
		var amount = Math.min(15, Math.round(delta / 12));
		if (amount > 0) addChaos(amount);
	}, { passive: true });

	updateHud();
	applyLevel(getLevel());
	initialized = true;
})();
