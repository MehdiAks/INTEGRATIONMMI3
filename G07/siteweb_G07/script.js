/* =========================================================
   LES 5 CENTIMES — JS principal
   ========================================================= */

(function () {
    'use strict';

    /* -----------------------------------------------------
       1. HEADER : fond au scroll
       ----------------------------------------------------- */
    const header = document.getElementById('siteHeader');

    function onScroll() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* -----------------------------------------------------
       2. MENU BURGER (mobile)
       ----------------------------------------------------- */
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');

    function toggleMenu(forceClose) {
        const isActive = nav.classList.contains('active');
        const shouldClose = forceClose === true || isActive;

        nav.classList.toggle('active', !shouldClose);
        burger.classList.toggle('active', !shouldClose);
        document.body.classList.toggle('nav-open', !shouldClose);
        burger.setAttribute('aria-expanded', String(!shouldClose));
    }

    burger.addEventListener('click', () => toggleMenu());

    // Ferme le menu au clic sur un lien
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // Ferme sur Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu(true);
        }
    });

    /* -----------------------------------------------------
       3. ANIMATIONS AU SCROLL (IntersectionObserver)
       ----------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Petit décalage entre éléments d'une même section
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback : tout affiché
        revealElements.forEach(el => el.classList.add('visible'));
    }

    /* -----------------------------------------------------
       4. PARALLAX LÉGER SUR LE HERO
       ----------------------------------------------------- */
    const parallaxEl = document.querySelector('[data-parallax]');

    if (parallaxEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const offset = window.scrollY * 0.35;
                    parallaxEl.style.transform = `translate3d(0, ${offset}px, 0)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* -----------------------------------------------------
       5. COMPTE À REBOURS
       ----------------------------------------------------- */
    // Date fictive de sortie : 10 décembre 2026 à 20h00
    const releaseDate = new Date('2026-12-10T20:00:00').getTime();

    const elDays  = document.getElementById('cd-days');
    const elHours = document.getElementById('cd-hours');
    const elMins  = document.getElementById('cd-mins');
    const elSecs  = document.getElementById('cd-secs');

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateCountdown() {
        const now = Date.now();
        let diff = releaseDate - now;

        if (diff <= 0) {
            elDays.textContent  = '00';
            elHours.textContent = '00';
            elMins.textContent  = '00';
            elSecs.textContent  = '00';
            return;
        }

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        elDays.textContent  = pad(days);
        elHours.textContent = pad(hours);
        elMins.textContent  = pad(minutes);
        elSecs.textContent  = pad(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* -----------------------------------------------------
       6. LECTEUR VIDÉO — bascule automatique vers le vrai
          fichier dès que videos/video_G01.mp4 est présent,
          sinon lecteur factice (aucune erreur si absent).
       ----------------------------------------------------- */
    const playBtn      = document.getElementById('playBtn');
    const videoPoster  = document.getElementById('videoPoster');
    const filmVideo    = document.getElementById('filmVideo');
    const filmSource   = filmVideo ? filmVideo.querySelector('source[data-src]') : null;

    if (playBtn && videoPoster) {
        videoPoster.addEventListener('click', () => {
            videoPoster.classList.add('playing');
            // Simulation : après 4s, on remet en état normal
            setTimeout(() => {
                videoPoster.classList.remove('playing');
            }, 4000);
        });
    }

    window.GroupMedia.ready.then(({ video }) => {
        if (!filmVideo || !filmSource || !video) return;
        filmSource.src = video;
        filmSource.removeAttribute('type');
        filmVideo.load();
        filmVideo.hidden = false;
        if (videoPoster) videoPoster.hidden = true;
    });

    /* -----------------------------------------------------
       7. AFFICHE — bascule vers la vraie image si présente
          + visionneuse plein écran
       ----------------------------------------------------- */
    function swapImageIfExists(imgEl, fallbackEl, path) {
        if (!imgEl || !path) return;
        const probe = new Image();
        probe.onload = () => {
            imgEl.src = path;
            imgEl.hidden = false;
            if (fallbackEl) fallbackEl.hidden = true;
        };
        // Aucune action nécessaire en cas d'échec : l'illustration SVG reste affichée.
        probe.src = path;
    }

    const posterPhoto      = document.getElementById('posterPhoto');
    const posterFallback   = document.getElementById('posterFallback');
    const posterPhotoLarge = document.getElementById('posterPhotoLarge');
    const posterFallbackLarge = document.getElementById('posterFallbackLarge');
    const posterPath = posterPhoto ? posterPhoto.getAttribute('data-src') : null;

    window.GroupMedia.ready.then(({ poster }) => {
        if (!poster) return;
        if (poster.endsWith('.pdf')) {
            posterPhoto.src = poster;
            posterFallback.hidden = true;
        } else swapImageIfExists(posterPhoto, posterFallback, poster);
    });

    const posterOpenBtn  = document.getElementById('posterOpenBtn');
    const posterCloseBtn = document.getElementById('posterCloseBtn');
    const posterLightbox = document.getElementById('posterLightbox');

    function openPosterLightbox() {
        if (!posterLightbox) return;
        // Miroir de l'état courant (vraie photo ou illustration) dans la visionneuse
        if (posterPhoto?.src.endsWith('.pdf')) {
            posterPhotoLarge.src = posterPhoto.src;
            posterFallbackLarge.hidden = true;
        } else if (posterPhoto && !posterPhoto.hidden) {
            posterPhotoLarge.src = posterPhoto.src;
            posterPhotoLarge.hidden = false;
            posterFallbackLarge.hidden = true;
        } else {
            posterPhotoLarge.hidden = true;
            posterFallbackLarge.hidden = false;
        }
        posterLightbox.hidden = false;
        document.body.classList.add('nav-open');
    }

    function closePosterLightbox() {
        if (!posterLightbox) return;
        posterLightbox.hidden = true;
        document.body.classList.remove('nav-open');
    }

    if (posterOpenBtn) posterOpenBtn.addEventListener('click', openPosterLightbox);
    if (posterCloseBtn) posterCloseBtn.addEventListener('click', closePosterLightbox);
    if (posterLightbox) {
        posterLightbox.addEventListener('click', (e) => {
            if (e.target === posterLightbox) closePosterLightbox();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && posterLightbox && !posterLightbox.hidden) {
            closePosterLightbox();
        }
    });

    const posterDownloadBtn = document.getElementById('posterDownloadBtn');
    if (posterDownloadBtn) {
        posterDownloadBtn.addEventListener('click', () => {
            const original = posterDownloadBtn.innerHTML;
            posterDownloadBtn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Affiche prête';
            setTimeout(() => { posterDownloadBtn.innerHTML = original; }, 1800);
        });
    }

    /* -----------------------------------------------------
       8. BOUTONS "AJOUTER AU PANIER" (visuel uniquement)
       ----------------------------------------------------- */
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = btn.textContent;
            btn.classList.add('added');
            btn.textContent = '✓ Ajouté !';
            setTimeout(() => {
                btn.classList.remove('added');
                btn.textContent = originalText;
            }, 1800);
        });
    });

    /* -----------------------------------------------------
       9. SALLE DE MONTAGE — recherche de fichiers
       ----------------------------------------------------- */
    const montageSearch   = document.getElementById('montageSearch');
    const montageFileList = document.getElementById('montageFileList');
    const montageCount    = document.getElementById('montageCount');
    const montageEmpty    = document.getElementById('montageEmpty');

    if (montageSearch && montageFileList) {
        const files = Array.from(montageFileList.querySelectorAll('li'));

        function filterFiles() {
            const query = montageSearch.value.trim().toLowerCase();
            let visibleCount = 0;

            files.forEach(li => {
                const name = (li.getAttribute('data-name') || '').toLowerCase();
                const matches = query === '' || name.includes(query);
                li.hidden = !matches;
                if (matches) visibleCount++;
            });

            montageCount.textContent = `${visibleCount} élément${visibleCount !== 1 ? 's' : ''}`;
            if (montageEmpty) montageEmpty.hidden = visibleCount !== 0;
        }

        montageSearch.addEventListener('input', filterFiles);
        filterFiles();
    }

    /* -----------------------------------------------------
       10. SALLE DE MONTAGE — export en boucle + compteur
           de fichiers (actifs uniquement quand visibles)
       ----------------------------------------------------- */
    const montageSection    = document.getElementById('montage');
    const progressBar       = document.getElementById('montageProgressBar');
    const progressPercent   = document.getElementById('montageExportPercent');
    const exportNameEl      = document.getElementById('montageExportName');
    const filesCounterEl    = document.getElementById('montageFilesCounter');

    let montageVersion = 47;
    let exportTimer = null;
    let counterTimer = null;
    let filesCreated = 1284302;

    function runExportLoop() {
        let percent = 0;
        clearInterval(exportTimer);
        exportTimer = setInterval(() => {
            percent += 1;
            if (progressBar) progressBar.style.width = percent + '%';
            if (progressPercent) progressPercent.textContent = percent + ' %';

            if (percent >= 100) {
                clearInterval(exportTimer);
                setTimeout(() => {
                    montageVersion += 1;
                    if (exportNameEl) {
                        exportNameEl.textContent = `LES_5_CENTIMES_v${montageVersion}_FINAL.mp4`;
                    }
                    runExportLoop();
                }, 1400);
            }
        }, 70);
    }

    function runFilesCounter() {
        clearInterval(counterTimer);
        counterTimer = setInterval(() => {
            filesCreated += Math.floor(Math.random() * 12) + 1;
            if (filesCounterEl) {
                filesCounterEl.textContent = filesCreated.toLocaleString('fr-FR');
            }
        }, 180);
    }

    function stopMontageAnimations() {
        clearInterval(exportTimer);
        clearInterval(counterTimer);
    }

    if (montageSection && 'IntersectionObserver' in window) {
        let started = false;
        const montageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!started) {
                        started = true;
                        runExportLoop();
                    }
                    runFilesCounter();
                } else {
                    stopMontageAnimations();
                }
            });
        }, { threshold: 0.2 });

        montageObserver.observe(montageSection);
    }

    /* -----------------------------------------------------
       11. SMOOTH SCROLL pour les ancres (fallback mobile)
       ----------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

})();
