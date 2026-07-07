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
import "../css/enhance.css";

import { initLoad } from "./js/load.js";
import { initNav } from "./js/nav.js";
import { initReveal } from "./js/reveal.js";
import { initInteractions } from "./js/interactions.js";
import { initCountdown } from "./js/countdown.js";

initNav();
initReveal();
initLoad();
initInteractions();
initCountdown();

// ── Smooth scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
