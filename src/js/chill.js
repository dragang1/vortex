export function initChillVideo() {
  const section = document.querySelector("[data-chill-section]");
  if (!section) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) {
    section.classList.add("is-alive");
    return;
  }

  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        section.classList.toggle("is-alive", entry.isIntersecting);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
  );

  animObserver.observe(section);
}
