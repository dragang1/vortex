import "../css/global.css";
import "../css/animations.css";
import "../css/nav.css";
import "../css/hero.css";
import "../css/festival.css";
import "../css/sections.css";
import "../css/footer.css";
import "../css/sponsors.css";

import { initLoad } from "./js/load.js";
import { initNav } from "./js/nav.js";
import { initReveal } from "./js/reveal.js";

initNav();
initReveal();

// ─── GSAP hero animacije — pokrenuti PRIJE initLoad ──────────
// initLoad() dodaje is-visible klase odmah na DOMContentLoaded,
// pa GSAP mora postaviti početno stanje (opacity 0, y offset)
// PRIJE toga — ovdje, na vrhu, sinkrono.

const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const hasGsap = !prefersReduced && window.gsap && window.ScrollTrigger;

if (hasGsap) {
  gsap.registerPlugin(ScrollTrigger);

  // ── Postavi početno stanje odmah (sinkrono, prije initLoad)
  gsap.set(".hero__title-line", { y: 60, autoAlpha: 0 });
  gsap.set(".hero__badge", { y: 14, autoAlpha: 0 });
  gsap.set(".hero__lead", { y: 14, autoAlpha: 0 });
  gsap.set(".hero__meta", { y: 14, autoAlpha: 0 });
  gsap.set(".hero__actions .btn", { y: 12, autoAlpha: 0 });
  gsap.set(".hero__stat", { y: 12, autoAlpha: 0 });

  // ── Timeline — sve ulazi u redoslijedu
  const tl = gsap.timeline({ delay: 0.1 });

  // Naslov — VORTEX pa 2026
  tl.to(".hero__title-line", {
    y: 0,
    autoAlpha: 1,
    duration: 1.0,
    ease: "expo.out",
    stagger: 0.12,
  });

  // Badge + lead + meta zajedno, malo iza naslova
  tl.to(
    ".hero__badge",
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.5",
  );

  tl.to(
    ".hero__lead",
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.55,
      ease: "power3.out",
    },
    "-=0.45",
  );

  tl.to(
    ".hero__meta",
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.55,
      ease: "power3.out",
    },
    "-=0.38",
  );

  // CTA dugmad
  tl.to(
    ".hero__actions .btn",
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    },
    "-=0.3",
  );

  // Stats jedan po jedan
  tl.to(
    ".hero__stat",
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.45,
      ease: "power2.out",
      stagger: 0.08,
    },
    "-=0.2",
  );

  // ── Badge beskonačni float (poslije ulaska)
  tl.to(
    ".hero__badge",
    {
      y: -5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 1.8,
    },
    "+=0.2",
  );

  // ── Shoreline wave
  gsap.to(".hero__shoreline span", {
    y: -5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 2.6,
    stagger: 0.2,
  });

  // ── Scroll reveal za artist kartice
  gsap.utils.toArray(".artist-card").forEach((card) => {
    gsap.fromTo(
      card,
      { y: 22, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // ── Hover na news kartama
  gsap.utils.toArray(".news-card").forEach((card) => {
    card.addEventListener("mouseenter", () =>
      gsap.to(card, { y: -6, duration: 0.22, ease: "power1.out" }),
    );
    card.addEventListener("mouseleave", () =>
      gsap.to(card, { y: 0, duration: 0.3, ease: "power1.out" }),
    );
  });

  // ── Hover micro-interaction na sekundarnim dugmadima
  document.querySelectorAll(".btn--secondary").forEach((btn) => {
    btn.addEventListener("mouseenter", () =>
      gsap.to(btn, { scale: 1.03, duration: 0.16, ease: "power1.out" }),
    );
    btn.addEventListener("mouseleave", () =>
      gsap.to(btn, { scale: 1, duration: 0.26, ease: "power1.out" }),
    );
  });
}

// ─── initLoad NAKON što je GSAP postavio početno stanje ──────
// initLoad dodaje is-visible na .reveal-load elemente,
// ali hero elementi su sada pod GSAP kontrolom (inline style)
// pa is-visible klasa ne može overridati GSAP-ov autoAlpha.
initLoad();

// ─── Smooth scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ─── Forma submit (preview mode) ─────────────────────────────
document
  .querySelectorAll(".register-form, .newsletter-form")
  .forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());
  });
