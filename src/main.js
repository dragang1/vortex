import "../css/global.css";
import "../css/animations.css";
import "../css/nav.css";
import "../css/hero.css";
import "../css/festival.css";
import "../css/sections.css";
import "../css/footer.css";
import "../css/sponsors.css";
import "../css/lineup.css";
import "../css/countdown.css";
import "../css/chill.css";
import "../css/enhance.css";

import { initLoad } from "./js/load.js";
import { initNav } from "./js/nav.js";
import { initReveal } from "./js/reveal.js";
import { initInteractions } from "./js/interactions.js";
import { initCountdown } from "./js/countdown.js";
import { initChillVideo } from "./js/chill.js";
import { initReadMore } from "./js/readmore.js";

initNav();
initReveal();
initLoad();
initInteractions();
initCountdown();
initChillVideo();
initReadMore();

// ── Smooth scroll (accounts for fixed header) ─────────────────
const scrollToHash = (id) => {
  const target = document.querySelector(id);
  if (!target) return false;

  const header = document.querySelector(".site-header");
  const offset = (header?.offsetHeight ?? 0) + 16;
  const top = Math.max(
    0,
    window.scrollY + target.getBoundingClientRect().top - offset,
  );

  window.scrollTo({ top, behavior: "smooth" });
  return true;
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    if (!scrollToHash(id)) return;
    e.preventDefault();
    history.pushState(null, "", id);
  });
});

// Correct landing if images/layout shift after the first scroll
window.addEventListener("hashchange", () => {
  if (location.hash) scrollToHash(location.hash);
});
