const ZOOM_FACTOR = 1.3;

const FOCUS_X = 0.486;

/* --------------------------------------------------------
  Changer les liens ici :
   -------------------------------------------------------- */
const POSTER_SRC = "assets/images/affiche_G02.png";
const VIDEO_SRC = "assets/videos/video_G02.mp4";

const buildingTrack = document.getElementById("building-track");
const buildingImage = document.getElementById("building-image");
const scrollSpacer = document.getElementById("scroll-spacer");
const scrollHint = document.getElementById("scroll-hint");

let cachedScrollMax = 0;

function layoutBuilding() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const naturalWidth = buildingImage.naturalWidth || viewportWidth;
  const naturalHeight = buildingImage.naturalHeight || viewportHeight;

  const coverScale = Math.max(
    viewportWidth / naturalWidth,
    viewportHeight / naturalHeight
  );
  const displayScale = coverScale * ZOOM_FACTOR;

  const renderedWidth = naturalWidth * displayScale;
  const renderedHeight = naturalHeight * displayScale;

  const idealLeft = viewportWidth / 2 - FOCUS_X * renderedWidth;
  const minLeft = viewportWidth - renderedWidth;
  const left = Math.min(0, Math.max(minLeft, idealLeft));

  buildingTrack.style.width = renderedWidth + "px";
  buildingTrack.style.left = left + "px";
  buildingImage.style.width = renderedWidth + "px";

  const scrollMax = Math.max(0, renderedHeight - viewportHeight);
  cachedScrollMax = scrollMax;

  scrollSpacer.style.height = scrollMax + viewportHeight + "px";

  applyScrollPosition(scrollMax);
}

function applyScrollPosition(scrollMaxOverride) {
  const scrollMax = scrollMaxOverride !== undefined ? scrollMaxOverride : cachedScrollMax;

  const progress = scrollMax > 0
    ? Math.min(1, Math.max(0, window.scrollY / scrollMax))
    : 0;

  buildingTrack.style.transform = "translateY(" + (-progress * scrollMax) + "px)";

  // Masque l'indice de scroll une fois qu'on a commencé à descendre.
  scrollHint.classList.toggle("is-hidden", progress > 0.03);
}

let scrollTicking = false;
function onScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    applyScrollPosition(cachedScrollMax);
    scrollTicking = false;
  });
}

let resizeTimeout;
function onResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(layoutBuilding, 150);
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onResize);
window.addEventListener("orientationchange", onResize);

const cloudButton = document.getElementById("cloud-button");
cloudButton.addEventListener("click", () => {
  window.scrollBy({ top: window.innerHeight * 1.2, behavior: "smooth" });
});

function bindWindowGlow(hoverZoneId, glowId) {
  const hoverZone = document.getElementById(hoverZoneId);
  const glow = document.getElementById(glowId);
  hoverZone.addEventListener("mouseenter", () => {
    glow.classList.add("is-visible");
  });
  hoverZone.addEventListener("mouseleave", () => {
    glow.classList.remove("is-visible");
  });
}

bindWindowGlow("hover-zone-woman", "building-glow-woman");
bindWindowGlow("hover-zone-boys", "building-glow-boys");
bindWindowGlow("hover-zone-reviews", "building-glow-chat");
bindWindowGlow("hover-zone-credits", "building-glow-pigeon");

const REVIEWS = [
  { name: "Le poulet c'est trop bon !", text: "Je l'ai montré à mon chat et il a enfin arrêté d'attaquer mon copain dans la rue.", avatar: "🐱", bg: "#d8d8d8", rating: 4 },
  { name: "GAYYBROOOO", text: "Ce film est d'intérêt public ! Ma voisine n'arrête pas de se plaindre lorsque je fais allègrement l'amour à mon homme.", avatar: "😎", bg: "linear-gradient(135deg, #f7c9e0, #c9b8f0)", rating: 5 },
  { name: "tagrenmere", text: "Gay !", avatar: "🚫", bg: "linear-gradient(135deg, #ff5f6d, #ffc371, #47cf73, #2f80ed, #a259ff)", rating: 1 },
  { name: "Jean luc", text: "Ce film m'a ouvert les yeux, c'en est fini de fuir les skittles.", avatar: "😄", bg: "#cfcfcf", rating: 4 },
  { name: "Wakabayashi", text: "Très bon film!! Je recommande.", avatar: "🧢", bg: "#bcd8f5", rating: 5 },
  { name: "TARZANNN", text: "Un peu déçu de la fin mais le film reste très bon.", avatar: "🦍", bg: "#8b6b4a", rating: 3 },
  { name: "Élodie0158", text: "10/10", avatar: "👴", bg: "#e04b4b", rating: 5 },
  { name: "David Goodenough", text: "Appréciable.", avatar: "🕴️", bg: "#d9d2c5", rating: 4 },
  { name: "Anonyme", text: "Ce commentaire a été supprimé pour atteinte au droits de l'homme", avatar: "👤", bg: "#d0d0d0", rating: null },
  { name: "Gayzilla", text: "It should have been me", avatar: "🦖", bg: "#3a3a55", rating: 5 },
  { name: "Anonyme064", text: "Je recommande au plus jeunes", avatar: "👤", bg: "#d0d0d0", rating: 5 },
  { name: "freddy_mercury", text: "J'en suis devenu gay.", avatar: "🏳️‍🌈", bg: "linear-gradient(135deg, #ff5f6d, #ffc371, #47cf73, #2f80ed, #a259ff)", rating: 5 },
  { name: "Duck", text: "Je suis devenu anti-gay", avatar: "🦆", bg: "#cfe6cf", rating: 1 },
  { name: "Baltrou96", text: "My dream 🙏", avatar: "🙏", bg: "#e8d3a0", rating: 5 },
  { name: "Lennon", text: "Depuis que j'ai vu ce film je ne regarde plus Thibaud de la même façon", avatar: "🎸", bg: "#3f5fa0", rating: 4 },
  { name: "PrincePaillette", text: "Film de l'année !!!", avatar: "😳", bg: "#f6cfae", rating: 5 },
  { name: "Heinrich", text: "Ich bin Auch schwul.", avatar: "🎩", bg: "#8b3a3a", rating: 5 },
];

const reviewsListEl = document.getElementById("reviews-list");
let reviewsOrder = REVIEWS.slice();
let reviewsStart = 0;

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderReviewCard(review) {
  const card = document.createElement("article");
  card.className = "review-card";

  const head = document.createElement("div");
  head.className = "review-head";

  const avatar = document.createElement("span");
  avatar.className = "review-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.style.background = review.bg;
  avatar.textContent = review.avatar;

  const name = document.createElement("p");
  name.className = "review-name";
  name.textContent = review.name;

  head.append(avatar, name);

  const text = document.createElement("p");
  text.className = "review-text";
  text.textContent = review.text;

  card.append(head, text);

  if (review.rating) {
    const stars = document.createElement("div");
    stars.className = "review-stars";
    stars.style.setProperty("--rating", review.rating);
    stars.setAttribute("aria-label", review.rating + " étoiles sur 5");
    card.appendChild(stars);
  }

  return card;
}

function renderReviewsGroup() {
  reviewsListEl.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const review = reviewsOrder[(reviewsStart + i) % reviewsOrder.length];
    reviewsListEl.appendChild(renderReviewCard(review));
  }
}

function shuffleReviews() {
  reviewsOrder = shuffle(REVIEWS);
  reviewsStart = 0;
  renderReviewsGroup();
}

document.getElementById("reviews-next").addEventListener("click", () => {
  reviewsStart = (reviewsStart + 3) % reviewsOrder.length;
  renderReviewsGroup();
});
document.getElementById("reviews-prev").addEventListener("click", () => {
  reviewsStart = (reviewsStart - 3 + reviewsOrder.length) % reviewsOrder.length;
  renderReviewsGroup();
});

const posterImage = document.getElementById("poster-image");
posterImage.addEventListener("error", () => {
  posterImage.classList.add("is-broken");
});
posterImage.addEventListener("load", () => posterImage.classList.remove("is-broken"));
window.GroupMedia.ready.then(({ poster }) => { posterImage.src = poster || POSTER_SRC; });

const modalVideoWrap = document.getElementById("modal-video-wrap");
const modalPlayButton = document.getElementById("modal-play");
const modalBox = document.querySelector("#modal-overlay .modal-box");

function resetVideo() {
  const video = modalVideoWrap.querySelector("video");
  if (video) {
    video.pause();
  }
  modalVideoWrap.classList.remove("is-playing");
  modalBox.classList.remove("is-video-mode");
  modalVideoWrap.innerHTML = "";
  modalVideoWrap.appendChild(modalPlayButton);
}

modalPlayButton.addEventListener("click", async () => {
  const video = document.createElement("video");
  video.src = (await window.GroupMedia.ready).video || VIDEO_SRC;
  video.controls = true;
  video.autoplay = true;
  video.addEventListener("error", resetVideo);

  modalVideoWrap.classList.add("is-playing");
  modalBox.classList.add("is-video-mode");
  modalVideoWrap.innerHTML = "";
  modalVideoWrap.appendChild(video);
});

const allOverlays = [];

function bindModal(overlayId, closeBtnId, triggerIds, onOpen, onClose) {
  const overlay = document.getElementById(overlayId);
  const closeBtn = document.getElementById(closeBtnId);
  allOverlays.push(overlay);

  const open = () => {
    overlay.classList.remove("hidden");
    if (onOpen) onOpen();
  };
  const close = () => {
    overlay.classList.add("hidden");
    if (onClose) onClose();
  };

  triggerIds.forEach((triggerId) => {
    document.getElementById(triggerId).addEventListener("click", open);
  });
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
}

bindModal("modal-overlay", "modal-close", ["hover-zone-boys"], null, resetVideo);
bindModal("poster-overlay", "poster-close", ["hover-zone-woman"]);
bindModal("reviews-overlay", "reviews-close", ["hover-zone-reviews"], shuffleReviews);
bindModal("credits-overlay", "credits-close", ["hover-zone-credits"]);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    allOverlays.forEach((overlay) => overlay.classList.add("hidden"));
    resetVideo();
  }
});

if (buildingImage.complete) {
  layoutBuilding();
} else {
  buildingImage.addEventListener("load", layoutBuilding);
}
