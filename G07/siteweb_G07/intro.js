/* =========================================================
   LES 5 CENTIMES — Intro cinématographique scroll-driven
   ========================================================= */

(function () {
    'use strict';

    const wrapper = document.getElementById('intro-wrapper');
    const scene   = document.getElementById('intro-scene');
    const spacer  = document.getElementById('intro-spacer');

    if (!wrapper || !scene || !spacer) return;

    const skipBtn = document.getElementById('introSkip');
    const scrollHint = document.getElementById('introScrollHint');

    // Respect prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        finishNow();
        return;
    }

    /* -----------------------------------------------------
       Références DOM
       ----------------------------------------------------- */
    const halo         = document.querySelector('.intro-halo');
    const machine      = document.querySelector('.intro-machine');
    const character    = document.querySelector('.intro-character');
    const hand         = document.querySelector('.intro-hand');
    const coins        = document.querySelectorAll('.intro-coin');
    const counter      = document.querySelector('.intro-counter');
    const counterValue = document.querySelector('.intro-counter-value');
    const screenClose  = document.querySelector('.intro-machine-screen-close');
    const face         = document.querySelector('.intro-face-scene');
    const flash        = document.querySelector('.intro-layer-flash');
    const titleLayer   = document.querySelector('.intro-layer-title');
    const titleSub     = document.querySelector('.intro-title-sub-text');
    const captionOpen  = document.querySelector('.intro-caption-opening');
    const captionMissing = document.querySelector('.intro-caption-missing');
    const particlesLayer = document.querySelector('.intro-layer-particles');

    /* -----------------------------------------------------
       Particules
       ----------------------------------------------------- */
    const particleCount = window.innerWidth < 768 ? 15 : 40;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('span');
        p.className = 'intro-particle';
        p.style.left = (Math.random() * 100) + '%';
        p.style.top  = (60 + Math.random() * 40) + '%';
        p.style.setProperty('--dx', ((Math.random() - 0.5) * 120) + 'px');
        p.style.setProperty('--dy', (-(60 + Math.random() * 150)) + 'px');
        p.style.animationDuration = (6 + Math.random() * 8) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        particlesLayer.appendChild(p);
    }

    /* -----------------------------------------------------
       Sous-titre lettre par lettre
       ----------------------------------------------------- */
    const subText = 'Une quête. Un homme. Un café.';
    let subTypingStarted = false;
    function typeSubtitle() {
        if (subTypingStarted || !titleSub) return;
        subTypingStarted = true;
        let i = 0;
        titleSub.textContent = '';
        const step = () => {
            if (i <= subText.length) {
                titleSub.textContent = subText.slice(0, i++);
                setTimeout(step, 55);
            }
        };
        setTimeout(step, 300);
    }

    /* -----------------------------------------------------
       Helpers d'interpolation
       ----------------------------------------------------- */
    function clamp01(v) { return Math.max(0, Math.min(1, v)); }
    function mapRange(v, inMin, inMax, outMin, outMax) {
        const t = clamp01((v - inMin) / (inMax - inMin));
        return outMin + (outMax - outMin) * t;
    }
    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function setOp(el, v) { if (el) el.style.opacity = String(v); }

    /* -----------------------------------------------------
       Timeline — chaque plan est séparé du suivant par un
       vrai passage au noir (comme une coupe au montage),
       pour qu'aucune couche ne se superpose jamais à une autre.

         A. 0.00-0.06  : carton "Bordeaux…"                    [noir 0.06-0.08]
         B. 0.08-0.22  : scène (halo, machine, personnage) apparaît
         C. 0.22-0.44  : push-in caméra (scène reste visible)
         D. 0.38-0.50  : main + pièces + compteur 0→35
         E. 0.48-0.55  : compteur clignote (35¢ rouge), caméra se stabilise
         F. 0.55-0.565 : la scène s'efface (fondu rapide)          [noir 0.565-0.58]
         G. 0.58-0.68  : gros plan écran machine "CAFÉ 40¢"
         H. 0.68-0.70  : le gros plan s'efface                     [noir 0.70-0.72]
         I. 0.72-0.80  : caption "Il manque 5 centimes." (seule)
         J. 0.80-0.83  : la caption s'efface                       [noir 0.83-0.85]
         K. 0.85-0.90  : visage dépité + tasse VIDE + flash éclair
         L. 0.90-0.93  : le visage s'efface                        [noir 0.93-0.94]
         M. 0.94-0.98  : titre "LES 5 CENTIMES"
         N. 0.97-1.00  : la scène entière s'efface → révèle le site
       ----------------------------------------------------- */
    function applyProgress(p) {
        // ---- A. Carton d'ouverture ----
        const openCap = mapRange(p, 0.00, 0.03, 0, 1) * (1 - mapRange(p, 0.045, 0.06, 0, 1));
        setOp(captionOpen, openCap);

        // ---- B/F. Scène de fond : apparaît puis s'efface AVANT le gros plan ----
        const sceneReveal = mapRange(p, 0.08, 0.22, 0, 1);
        const sceneFade   = 1 - mapRange(p, 0.55, 0.565, 0, 1);
        const bgVis = sceneReveal * sceneFade;

        setOp(halo, bgVis * 0.9);
        setOp(machine, bgVis);
        setOp(character, bgVis);

        // ---- C. Push-in caméra (22-44%), relâché avant la coupe (46-54%) ----
        const push = mapRange(p, 0.22, 0.44, 0, 1);
        const pushRelease = mapRange(p, 0.46, 0.54, 0, 1);
        const finalFade = mapRange(p, 0.97, 1.0, 0, 1);
        const effectivePush = push * (1 - pushRelease);
        const pushScale = 1 + effectivePush * 0.55;
        const pushX = -effectivePush * 8;
        const shakeIntensity = effectivePush;
        const shake = Math.sin(p * 260) * shakeIntensity * 2.5;
        scene.style.transform =
            `scale(${pushScale.toFixed(3)}) translate3d(${pushX.toFixed(2)}vw, 0, 0) translateY(${shake.toFixed(2)}px)`;

        // ---- D. Main + pièces + compteur (38-50%) ----
        const handIn = mapRange(p, 0.38, 0.46, 0, 1) * sceneFade;
        if (hand) {
            hand.style.opacity = String(handIn);
            hand.style.transform = `translateX(${(-30 + handIn * 30).toFixed(1)}px)`;
        }

        const coinsProgress = mapRange(p, 0.40, 0.50, 0, 1);
        coins.forEach((c, i) => {
            const t = clamp01((coinsProgress * coins.length) - i);
            const drop = easeOut(t);
            c.style.opacity = String(t > 0 ? Math.min(1, t * 2) * sceneFade : 0);
            c.style.transform = `translateY(${(-60 + drop * 60).toFixed(1)}px) rotate(${(drop * 180).toFixed(0)}deg)`;
        });

        if (counter) {
            const counterIn = mapRange(p, 0.40, 0.48, 0, 1) * sceneFade;
            counter.style.opacity = String(counterIn);
            const values = [0, 5, 15, 25, 35];
            const counterRaw = mapRange(p, 0.40, 0.50, 0, 1);
            const idx = Math.min(values.length - 1, Math.floor(counterRaw * values.length));
            counterValue.textContent = String(values[idx]).padStart(2, '0') + '¢';
            counter.classList.toggle('stopped', p > 0.48 && p < 0.555);
        }

        // ---- G. Gros plan écran machine (58-68%, disparaît 68-70%) ----
        //     Ne démarre qu'APRÈS que la scène de fond soit à 0 (dès 0.565)
        const screenInFwd = mapRange(p, 0.58, 0.66, 0, 1);
        const screenOutFwd = mapRange(p, 0.68, 0.70, 0, 1);
        const screenIn = screenInFwd * (1 - screenOutFwd);
        if (screenClose) {
            screenClose.style.opacity = String(screenIn);
            const sc = 0.4 + screenInFwd * 0.6;
            screenClose.style.transform = `translate(-50%, -50%) scale(${sc.toFixed(3)})`;
        }

        // ---- I. Caption "Il manque 5 centimes." (72-80%, disparaît 80-83%) ----
        //     Ne démarre qu'APRÈS que le gros plan soit à 0 (dès 0.70)
        const missingIn = mapRange(p, 0.72, 0.78, 0, 1) * (1 - mapRange(p, 0.80, 0.83, 0, 1));
        setOp(captionMissing, missingIn);

        // ---- K. Visage + tasse VIDE (85-90%, disparaît 90-93%) ----
        //     Ne démarre qu'APRÈS que la caption soit à 0 (dès 0.83)
        const faceIn = mapRange(p, 0.85, 0.90, 0, 1) * (1 - mapRange(p, 0.90, 0.93, 0, 1));
        if (face) {
            face.style.opacity = String(faceIn);
            face.style.transform = `translateY(${(20 - faceIn * 20).toFixed(1)}px)`;
        }

        // ---- Flash éclair bref (86.5-88.5%) ----
        const flashT = mapRange(p, 0.865, 0.88, 0, 1) * (1 - mapRange(p, 0.88, 0.895, 0, 1));
        setOp(flash, flashT * 0.85);

        // ---- M. Titre final (94-98%) ----
        //     Ne démarre qu'APRÈS que le visage soit à 0 (dès 0.93)
        const titleIn = mapRange(p, 0.94, 0.98, 0, 1);
        if (titleLayer) {
            titleLayer.style.opacity = String(titleIn);
            if (titleIn > 0.5) {
                titleLayer.classList.add('revealed');
                typeSubtitle();
            } else {
                titleLayer.classList.remove('revealed');
            }
        }

        // ---- N. Fade final scène (97-100%) ----
        scene.style.opacity = String(1 - finalFade);

        if (p >= 0.999) endIntro();
    }

    /* -----------------------------------------------------
       Scroll listener avec rAF
       ----------------------------------------------------- */
    let ticking = false;
    let ended = false;

    function onScroll() {
        if (ended) return;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function update() {
        ticking = false;
        const rect = spacer.getBoundingClientRect();
        const total = spacer.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        const progress = total > 0 ? clamp01(scrolled / total) : 0;
        applyProgress(progress);

        if (scrollHint) {
            scrollHint.classList.toggle('hidden-by-scroll', progress > 0.045);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* -----------------------------------------------------
       Skip
       ----------------------------------------------------- */
    if (skipBtn) {
        skipBtn.addEventListener('click', () => endIntro());
    }
    document.addEventListener('keydown', (e) => {
        if (!ended && e.key === 'Escape') endIntro();
    });

    /* -----------------------------------------------------
       Fin de l'intro
       ----------------------------------------------------- */
    function endIntro() { finish(false); }
    function finishNow() { finish(true); }

    function finish(instant) {
        if (ended) return;
        ended = true;

        try { localStorage.setItem('introSeen_5c', '1'); } catch (e) {}

        if (!instant && scene) {
            scene.style.transition = 'opacity 0.5s ease';
            scene.style.opacity = '0';
        }

        setTimeout(() => {
            document.body.classList.remove('intro-active');
            document.body.classList.add('intro-done');

            if (wrapper && wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);

            // Remonte au top du site principal
            window.scrollTo({ top: 0, behavior: 'auto' });

            // Réveille les animations reveal du site principal :
            // dispatch un scroll pour re-notifier les observers
            window.dispatchEvent(new Event('scroll'));

            // Filet de sécurité : force la visibilité des reveal au-dessus du pli
            document.querySelectorAll('#site-content .reveal').forEach(el => {
                const r = el.getBoundingClientRect();
                if (r.top < window.innerHeight * 1.1) el.classList.add('visible');
            });
        }, instant ? 0 : 500);

        window.removeEventListener('scroll', onScroll);
    }

    // Premier update pour caler la scène
    update();

})();
