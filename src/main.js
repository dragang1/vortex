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

const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const hasGsap = !prefersReduced && window.gsap && window.ScrollTrigger;

if (hasGsap) {
  gsap.registerPlugin(ScrollTrigger);

  // ── Početno stanje — SAMO hero elementi
  // NE diraj .artist-card, .artist-feature, .destination-card itd.
  // initReveal() ih animira kroz IntersectionObserver
  gsap.set(".hero__title-line", { y: 60, autoAlpha: 0 });
  gsap.set(".hero__badge", { y: 14, autoAlpha: 0 });
  gsap.set(".hero__lead", { y: 14, autoAlpha: 0 });
  gsap.set(".hero__meta", { y: 14, autoAlpha: 0 });
  gsap.set(".hero__actions .btn", { y: 12, autoAlpha: 0 });
  gsap.set(".hero__stat", { y: 12, autoAlpha: 0 });

  // ── Hero timeline
  const tl = gsap.timeline({ delay: 0.1 });

  tl.to(".hero__title-line", {
    y: 0,
    autoAlpha: 1,
    duration: 1.0,
    ease: "expo.out",
    stagger: 0.12,
  });
  tl.to(
    ".hero__badge",
    { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
    "-=0.50",
  );
  tl.to(
    ".hero__lead",
    { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
    "-=0.45",
  );
  tl.to(
    ".hero__meta",
    { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
    "-=0.38",
  );
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

  // Badge float
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

  // Shoreline wave
  gsap.to(".hero__shoreline span", {
    y: -5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    duration: 2.6,
    stagger: 0.2,
  });

  // ── Artist feature — scroll animacija
  // Ovi elementi NISU pod reveal-load/reveal sustavom
  // pa GSAP mora sam animirati
  gsap.utils.toArray(".artist-feature").forEach((el, i) => {
    gsap.fromTo(
      el,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  // Coming soon blok
  gsap.fromTo(
    ".lineup-coming-soon",
    { y: 30, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".lineup-coming-soon",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    },
  );

  // ── Hover na sekundarnim dugmadima
  document.querySelectorAll(".btn--secondary").forEach((btn) => {
    btn.addEventListener("mouseenter", () =>
      gsap.to(btn, { scale: 1.03, duration: 0.16, ease: "power1.out" }),
    );
    btn.addEventListener("mouseleave", () =>
      gsap.to(btn, { scale: 1, duration: 0.26, ease: "power1.out" }),
    );
  });
}

// ── initLoad POSLIJE gsap.set() ───────────────────────────────
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
