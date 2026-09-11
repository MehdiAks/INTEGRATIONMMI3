/* =========================================================
   L'APPEL INCONNU — script principal
   HTML / CSS / JS natif, aucune dépendance.
   ========================================================= */
(function () {
  'use strict';

  var doux = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =======================================================
     1. LA TORCHE — on cherche le combiné dans le noir
     ======================================================= */
  var torche     = document.getElementById('torche');
  var combine    = document.getElementById('combine');
  var dossier    = document.getElementById('dossier');
  var videoRing  = document.getElementById('videoRing');
  var videoPick  = document.getElementById('videoPickup');

  /* position du combiné dans l'image source (fractions de la vidéo 1920 × 1080) */
  var CIBLE_X = 0.41;
  var CIBLE_Y = 0.46;
  var RATIO   = 16 / 9;

  var cible = { x: 0, y: 0 };
  var surCible = false;
  var decroche = false;

  /* la vidéo est en object-fit:cover : on recalcule où tombe vraiment le combiné */
  function placerCible() {
    if (!combine || !torche) return;
    var r = torche.getBoundingClientRect();
    var l, t, w, h;
    if (r.width / r.height > RATIO) { w = r.width;  h = w / RATIO; }
    else                            { h = r.height; w = h * RATIO; }
    l = (r.width  - w) / 2;
    t = (r.height - h) / 2;

    cible.x = l + w * CIBLE_X;
    cible.y = t + h * CIBLE_Y;
    combine.style.left = cible.x + 'px';
    combine.style.top  = cible.y + 'px';
  }

  function bougerTorche(x, y) {
    if (decroche) return;
    torche.style.setProperty('--tx', x + 'px');
    torche.style.setProperty('--ty', y + 'px');

    var dx = x - cible.x;
    var dy = y - cible.y;
    var d  = Math.sqrt(dx * dx + dy * dy);

    // le volume de la sonnerie monte quand la torche s'approche du combiné
    var portee = Math.sqrt(innerWidth * innerWidth + innerHeight * innerHeight) * 0.5;
    var proche = Math.max(0, 1 - d / portee);
    if (videoRing) videoRing.volume = Math.min(1, Math.pow(proche, 2) * 0.95 + 0.05);

    var dessus = d < 95;
    if (dessus !== surCible) {
      surCible = dessus;
      torche.classList.toggle('a-cible', dessus);
    }
  }

  if (torche) {
    placerCible();
    bougerTorche(innerWidth / 2, innerHeight / 2);
    addEventListener('resize', function () { placerCible(); });

    if (videoRing) videoRing.play().catch(function () { /* démarrage différé au 1er geste */ });

    torche.addEventListener('mousemove', function (e) {
      bougerTorche(e.clientX, e.clientY);
    });

    torche.addEventListener('touchmove', function (e) {
      var t = e.touches[0];
      if (!t) return;
      e.preventDefault();
      bougerTorche(t.clientX, t.clientY);
    }, { passive: false });

    torche.addEventListener('touchstart', function (e) {
      var t = e.touches[0];
      if (t) bougerTorche(t.clientX, t.clientY);
    }, { passive: true });

    /* le son ne peut être activé qu'après un geste utilisateur */
    var premierGeste = function () {
      if (videoRing) {
        videoRing.muted = false;
        videoRing.play().catch(function () {});
      }
      torche.classList.add('a-son');
    };
    torche.addEventListener('pointerdown', premierGeste, { once: true });
    addEventListener('keydown', premierGeste, { once: true });
  }

  /* on décroche : la vidéo « pickup » prend le relais, puis la page s'ouvre */
  function ouvrirLeDossier() {
    if (decroche) return;
    decroche = true;

    torche.classList.add('is-decroche');
    torche.classList.remove('a-cible');

    if (videoRing) { videoRing.pause(); videoRing.muted = true; }

    var enchaine = function () {
      torche.classList.add('is-noir');
      setTimeout(afficherLaPage, doux ? 100 : 900);
    };

    if (videoPick && !doux) {
      var fini = false;
      var terminer = function () {
        if (fini) return;
        fini = true;
        enchaine();
      };

      videoPick.addEventListener('ended', terminer, { once: true });

      videoPick.muted = false;
      videoPick.play().catch(function () {
        // son refusé : on retente en muet plutôt que de sauter la séquence
        videoPick.muted = true;
        videoPick.play().catch(terminer);
      });

      /* si au bout de 600 ms la vidéo n'a pas bougé d'un pouce, elle ne
         démarrera pas : on enchaîne sans attendre. Sinon on lui laisse sa
         durée réelle, plus une marge. */
      setTimeout(function () {
        if (fini) return;
        if (videoPick.currentTime > 0.05) {
          var reste = (videoPick.duration || 2) - videoPick.currentTime;
          setTimeout(terminer, Math.max(0, reste * 1000) + 700);
        } else {
          terminer();
        }
      }, 600);
    } else {
      enchaine();
    }
  }

  function afficherLaPage() {
    torche.classList.add('is-parti');
    document.body.classList.remove('is-locked');
    dossier.hidden = false;
    // .dossier.is-visible est une animation CSS : elle part de son keyframe
    // « from », pas besoin d'attendre une frame.
    dossier.classList.add('is-visible');
    scrollTo(0, 0);
  }

  if (combine) combine.addEventListener('click', ouvrirLeDossier);

  /* échappatoire : Échap ou Entrée passe l'intro */
  addEventListener('keydown', function (e) {
    if (!decroche && (e.key === 'Escape' || e.key === 'Enter')) ouvrirLeDossier();
  });


  /* =======================================================
     2. LA TÉLÉ — neige cathodique + vidéo
     ======================================================= */
  var tele      = document.getElementById('tele');
  var video     = document.getElementById('teleVideo');
  var controles = document.getElementById('teleControles');
  var bouton    = document.getElementById('teleBouton');
  var plein     = document.getElementById('telePlein');
  var neige     = document.getElementById('neige');

  if (neige && !doux) {
    var ctx2d = neige.getContext('2d');
    var image = ctx2d.createImageData(neige.width, neige.height);
    var tourne = false;
    var dernier = 0;

    function grain(ts) {
      if (!tourne) return;
      if (ts - dernier > 60) {           // ~16 images/s, suffisant et léger
        dernier = ts;
        var d = image.data;
        for (var i = 0; i < d.length; i += 4) {
          var v = (Math.random() * 255) | 0;
          d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 255;
        }
        ctx2d.putImageData(image, 0, 0);
      }
      requestAnimationFrame(grain);
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entrees) {
        entrees.forEach(function (en) {
          if (en.isIntersecting && !tourne) {
            tourne = true;
            requestAnimationFrame(grain);
          } else if (!en.isIntersecting) {
            tourne = false;
          }
        });
      }, { threshold: 0.05 }).observe(neige);
    } else {
      tourne = true;
      requestAnimationFrame(grain);
    }
  }

  if (video && tele) {
    var chargee = false;

    /* contrôles simples : un bouton lecture/pause à deux icônes (jamais de texte
       qui change), un bouton plein écran séparé */
    video.addEventListener('loadeddata', function () {
      chargee = true;
      tele.classList.add('a-video');
      if (controles) controles.hidden = false;
      video.play().catch(function () { /* autoplay bloqué : le bouton prend le relais */ });
    });

    // fichier absent : on reste sur la neige, sans erreur visible
    video.addEventListener('error', function () { chargee = false; }, true);

    if (bouton) {
      var majBouton = function () {
        bouton.textContent = video.paused ? '▶' : '⏸';
        bouton.setAttribute('aria-label', video.paused ? 'Lecture' : 'Pause');
      };
      majBouton();
      video.addEventListener('play', majBouton);
      video.addEventListener('pause', majBouton);
      bouton.addEventListener('click', function () {
        if (video.paused) video.play(); else video.pause();
      });
    }

    var son = document.getElementById('teleSon');
    if (son) son.addEventListener('click', function () {
      video.muted = !video.muted;
      son.setAttribute('aria-pressed', String(!video.muted));
      son.setAttribute('aria-label', video.muted ? 'Activer le son' : 'Couper le son');
      son.textContent = video.muted ? 'Son' : 'Muet';
    });

    if (plein) {
      var ecran = document.querySelector('.tele__ecran');
      plein.addEventListener('click', function () {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else if (ecran.requestFullscreen) {
          ecran.requestFullscreen();
        } else if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen(); // Safari iOS : plein écran natif de la vidéo
        }
      });
    }

    // on ne tente le chargement qu'à l'approche du bloc
    if ('IntersectionObserver' in window) {
      var obsVid = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (en) {
          if (en.isIntersecting && !chargee) { video.load(); obsVid.disconnect(); }
        });
      }, { rootMargin: '300px' });
      obsVid.observe(tele);
    } else {
      video.load();
    }
  }


  /* =======================================================
     3. APPARITIONS AU SCROLL
     ======================================================= */
  var aReveler = document.querySelectorAll('.tele, .iphone');

  if ('IntersectionObserver' in window && !doux) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-vu');
        obs.unobserve(en.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -12% 0px' });

    aReveler.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = ((i % 4) * 90) + 'ms';
      obs.observe(el);
    });
  }

})();
