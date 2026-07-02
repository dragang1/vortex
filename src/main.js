import "../css/global.css";
import "../css/animations.css";
import "../css/nav.css";
import "../css/hero.css";
import "../css/festival.css";
import "../css/sections.css";
import "../css/footer.css";
import "../css/sponsors.css";
import "../css/lineup.css";

import { initLoad } from "./js/load.js";
import { initNav } from "./js/nav.js";
import { initReveal } from "./js/reveal.js";

initNav();
initReveal();
initLoad();

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

// ── Forma submit (preview) ────────────────────────────────────
document.querySelectorAll(".register-form, .newsletter-form").forEach((f) => {
  f.addEventListener("submit", (e) => e.preventDefault());
});
