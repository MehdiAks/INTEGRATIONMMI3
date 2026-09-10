import { useEffect, useRef, useState } from "react";
import { ArrowRight, Info, List, Play, Star, X } from "@phosphor-icons/react";
import directorImage from "../assets/images/michel-director.webp";
import posterImage from "../assets/images/poster-waiting-for-love.webp";
import synopsisImage from "../assets/images/synopsis-waiting-for-love.webp";

const navItems = [
  ["Le film", "film"], ["Synopsis", "synopsis"], ["Affiche", "affiche"],
  ["Avis", "avis"], ["Le réalisateur", "realisateur"],
];

const reviews = [
  { rating: 5, quote: "Une histoire terriblement simple, et pourtant terriblement familière.", source: "CinéScope" },
  { rating: 5, quote: "En quelques minutes, Waiting for Love réussit à transformer un simple message en véritable tension dramatique.", source: "Le Regard Cinéma" },
  { rating: 4, quote: "Minimaliste, mélancolique et étonnamment efficace.", source: "Filmorama" },
  { rating: 5, quote: "On comprend tout en regardant simplement son visage.", source: "Écran Libre" },
];

function Brand({ footer = false }) {
  return <a className={`brand${footer ? " brand--footer" : ""}`} href="#film" aria-label="Cinetflix, retour au film">CINETFLIX</a>;
}

function FilmMeta() {
  return (
    <ul className="film-meta" aria-label="Informations principales du film">
      <li className="film-meta__outlined">Court métrage</li><li>Drame</li><li>Romance</li><li>2026</li><li>12 min</li>
    </ul>
  );
}

function Rating({ value }) {
  return (
    <div className="rating" aria-label={`${value} étoiles sur 5`}>
      {Array.from({ length: 5 }, (_, index) => <Star key={index} weight={index < value ? "fill" : "regular"} aria-hidden="true" />)}
    </div>
  );
}

function ReleaseModal({ open, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="release-modal" role="dialog" aria-modal="true" aria-labelledby="release-title" onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="icon-button release-modal__close" onClick={onClose} aria-label="Fermer"><X weight="bold" aria-hidden="true" /></button>
        <span className="eyebrow">Cinetflix Original</span>
        <h2 id="release-title">Disponible le<br />11 septembre.</h2>
        <p><strong>Waiting for Love</strong> arrive bientôt sur Cinetflix. Une attente de douze minutes qui pourrait tout changer.</p>
        <button className="button button--primary" onClick={onClose}>J’ai compris <ArrowRight weight="bold" aria-hidden="true" /></button>
      </section>
    </div>
  );
}

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("film");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll("[data-reveal]");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navItems.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const jumpTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <header className={`site-header${scrolled || menuOpen ? " site-header--solid" : ""}`}>
        <div className="site-header__inner">
          <Brand />
          <nav className={`site-nav${menuOpen ? " site-nav--open" : ""}`} aria-label="Navigation principale">
            {navItems.map(([label, id]) => <a key={id} className={activeSection === id ? "is-active" : ""} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <button className="icon-button menu-toggle" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? <X weight="bold" /> : <List weight="bold" />}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="film" aria-labelledby="hero-title">
          <div className="hero__image" aria-hidden="true" /><div className="hero__shade" aria-hidden="true" />
          <div className="hero__content">
            <p className="hero__presenter">Cinetflix présente</p>
            <h1 id="hero-title">Waiting<br />for Love</h1>
            <p className="hero__tagline">Il devait simplement attendre quelques minutes.</p>
            <FilmMeta />
            <p className="hero__summary">Un rendez-vous. Un message. Et cette étrange sensation d’avoir déjà vécu exactement la même scène.</p>
            <div className="hero__actions">
              <button className="button button--primary" onClick={() => jumpTo("synopsis")}><Play weight="fill" aria-hidden="true" /> Découvrir le film</button>
              <button className="button button--secondary" onClick={() => setModalOpen(true)}><Info weight="bold" aria-hidden="true" /> Plus d’infos</button>
            </div>
            <p className="hero__release">Sortie le <strong>11 septembre</strong></p>
          </div>
          <button className="scroll-cue" onClick={() => jumpTo("synopsis")} aria-label="Aller au synopsis"><span>Défiler</span><span className="scroll-cue__line" aria-hidden="true" /></button>
        </section>

        <section className="section synopsis" id="synopsis" aria-labelledby="synopsis-title">
          <div className="section__inner synopsis__grid">
            <div className="synopsis__copy" data-reveal>
              <span className="eyebrow">Le film</span><h2 id="synopsis-title">Une attente qui devient une habitude.</h2>
              <div className="prose">
                <p>Il devait arriver avant elle.</p><p>Comme toujours.</p>
                <p>Installé seul, téléphone à la main, il attend. Quelques minutes passent, puis son écran s’allume.</p>
                <blockquote>« Désolée je suis en retard. Le bus est en retard. »</blockquote>
                <p>Une phrase banale. Pourtant, son visage raconte autre chose.</p>
                <p><em>Waiting for Love</em> explore ces petits moments où l’on comprend que l’on n’attend peut-être plus seulement quelqu’un… mais que quelque chose change.</p>
              </div>
              <dl className="film-details">
                <div><dt>Titre</dt><dd>Waiting for Love</dd></div><div><dt>Genre</dt><dd>Drame / Romance</dd></div>
                <div><dt>Durée</dt><dd>12 minutes</dd></div><div><dt>Date de sortie</dt><dd>11 septembre</dd></div>
                <div><dt>Production</dt><dd>Cinetflix</dd></div>
              </dl>
            </div>
            <figure className="synopsis__visual" data-reveal>
              <img src={synopsisImage} alt="Un homme attend sous un abribus pluvieux, son téléphone à la main" />
              <figcaption>Quelques minutes. Comme toujours.</figcaption>
            </figure>
          </div>
        </section>

        <section className="message-scene" aria-labelledby="message-title">
          <img className="message-scene__image" src={synopsisImage} alt="Le protagoniste regarde au loin, visiblement déçu" /><div className="message-scene__veil" aria-hidden="true" />
          <div className="message-scene__content section__inner">
            <div data-reveal><span className="eyebrow">18:42</span><h2 id="message-title">Puis son<br />téléphone s’allume.</h2></div>
            <div className="notification" data-reveal role="note" aria-label="Message reçu à 18 heures 42">
              <div className="notification__topline"><span>Message</span><time>18:42</time></div><p>Désolée je suis en retard.<br />Le bus est en retard.</p>
            </div>
          </div>
        </section>

        <section className="section poster-section" id="affiche" aria-labelledby="poster-title">
          <div className="section__inner poster-section__grid">
            <figure className="poster-frame" data-reveal><img src={posterImage} alt="Affiche officielle de Waiting for Love, un homme seul à un arrêt de bus sous la pluie" /></figure>
            <div className="poster-copy" data-reveal>
              <span className="eyebrow">L’affiche officielle</span><span className="original-badge">Cinetflix Original</span>
              <h2 id="poster-title">Waiting<br />for Love</h2>
              <blockquote>« Parfois, le plus difficile n’est pas d’attendre.<br />C’est de comprendre pourquoi on attend encore. »</blockquote>
              <p className="poster-copy__date">11 septembre</p>
              <button className="text-link" onClick={() => setModalOpen(true)}>Informations sur la sortie <ArrowRight weight="bold" aria-hidden="true" /></button>
            </div>
          </div>
        </section>

        <section className="section reviews" id="avis" aria-labelledby="reviews-title">
          <div className="section__inner">
            <div className="section-heading" data-reveal><span className="eyebrow">Premiers regards</span><h2 id="reviews-title">Ce qu’ils en pensent</h2></div>
            <div className="reviews__grid">
              {reviews.map((review, index) => <article className="review" key={review.source} data-reveal style={{ "--delay": `${index * 80}ms` }}><Rating value={review.rating} /><blockquote>« {review.quote} »</blockquote><p>— {review.source}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section director" id="realisateur" aria-labelledby="director-title">
          <div className="section__inner director__grid">
            <figure className="director__portrait" data-reveal><img src={directorImage} alt="Portrait de Michel, réalisateur fictif de Waiting for Love" /></figure>
            <div className="director__copy" data-reveal>
              <span className="eyebrow">À propos du projet</span><h2 id="director-title">Un mot du réalisateur</h2>
              <div className="director__statement">
                <p>« Waiting for Love part d’une situation que tout le monde connaît : attendre quelqu’un.</p>
                <p>Je voulais raconter ce moment très précis où une situation ordinaire cesse de l’être. Quand un simple “je suis en retard” suffit à faire remonter toutes les fois précédentes.</p>
                <p>Le film parle moins du retard que de ce que l’on accepte par attachement, par habitude ou simplement par espoir. »</p>
              </div>
              <div className="signature"><strong>Michel</strong><span>Réalisateur</span></div>
              <p className="director__note">Ce court métrage a été imaginé dans le cadre d’un projet de production audiovisuelle.</p>
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="final-cta__image" aria-hidden="true" /><div className="final-cta__shade" aria-hidden="true" />
          <div className="final-cta__content" data-reveal>
            <span className="eyebrow">Cinetflix présente</span><h2 id="final-title">Jusqu’où seriez-vous<br />prêt à attendre&nbsp;?</h2>
            <p className="final-cta__film">Waiting for Love</p><p className="final-cta__date">11 septembre</p>
            <button className="button button--primary" onClick={() => setModalOpen(true)}><Play weight="fill" aria-hidden="true" /> Voir le court métrage</button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section__inner site-footer__top"><div><Brand footer /><p>Une production fictive réalisée dans le cadre d’un projet étudiant.</p></div><nav aria-label="Navigation de pied de page"><a href="#realisateur">À propos</a><a href="#film">Le film</a><button onClick={() => setModalOpen(true)}>Crédits</button></nav></div>
        <div className="section__inner site-footer__bottom"><p>© 2026 Cinetflix — Projet fictif.</p><p>Ce site est un projet étudiant fictif et n’est pas affilié à Netflix.</p></div>
      </footer>
      <ReleaseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
