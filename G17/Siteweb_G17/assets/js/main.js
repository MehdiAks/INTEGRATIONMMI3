/* ============================================
   LOONEY SMOKE — scripts de la page
   ============================================ */

/* --------------------------------------------
   1. Menu burger (mobile)
   -------------------------------------------- */
const burger = document.getElementById("burger");
const navListe = document.getElementById("navListe");

burger.addEventListener("click", () => {
    const ouvert = navListe.classList.toggle("est-ouvert");
    burger.setAttribute("aria-expanded", ouvert);
});

// On referme le menu dès qu'on clique sur un lien
navListe.querySelectorAll(".nav__lien").forEach((lien) => {
    lien.addEventListener("click", () => {
        navListe.classList.remove("est-ouvert");
        burger.setAttribute("aria-expanded", "false");
    });
});

/* --------------------------------------------
   2. Carrousel "Notre création"
   -------------------------------------------- */
const slides = document.querySelectorAll(".carrousel__slide");
const conteneurPuces = document.getElementById("puces");
let indexActif = 0;

// Génération des puces à partir du nombre de slides
slides.forEach((_, i) => {
    const puce = document.createElement("button");
    puce.className = "carrousel__puce";
    puce.setAttribute("aria-label", "Aller à la slide " + (i + 1));
    puce.addEventListener("click", () => afficherSlide(i));
    conteneurPuces.appendChild(puce);
});

const puces = conteneurPuces.querySelectorAll(".carrousel__puce");

function afficherSlide(index) {
    // Boucle : après la dernière on revient à la première
    indexActif = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("est-actif", i === indexActif);
    });
    puces.forEach((puce, i) => {
        puce.classList.toggle("est-actif", i === indexActif);
    });
}

document.getElementById("precedent").addEventListener("click", () => {
    afficherSlide(indexActif - 1);
});

document.getElementById("suivant").addEventListener("click", () => {
    afficherSlide(indexActif + 1);
});

// Navigation au clavier (flèches gauche / droite)
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") afficherSlide(indexActif - 1);
    if (e.key === "ArrowRight") afficherSlide(indexActif + 1);
});

afficherSlide(0);

/* --------------------------------------------
   3. Onglets des addictions
   -------------------------------------------- */
const onglets = document.querySelectorAll(".onglet");
const panneaux = document.querySelectorAll(".panneau");

onglets.forEach((onglet) => {
    onglet.addEventListener("click", () => {
        const cible = onglet.dataset.cible;

        onglets.forEach((o) => o.classList.toggle("est-actif", o === onglet));
        panneaux.forEach((p) => p.classList.toggle("est-actif", p.id === cible));
    });
});

/* --------------------------------------------
   4. Apparition des sections au scroll
   -------------------------------------------- */
const observateur = new IntersectionObserver(
    (entrees) => {
        entrees.forEach((entree) => {
            if (entree.isIntersecting) {
                entree.target.classList.add("est-visible");
                observateur.unobserve(entree.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".chiffre, .urgence, .presentation__inner").forEach((el) => {
    el.classList.add("au-scroll");
    observateur.observe(el);
});
