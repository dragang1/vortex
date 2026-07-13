export function initWarmupVideo() {
  const section = document.querySelector("[data-warmup-section]");
  const video = document.querySelector("[data-warmup-video]");
  if (!section && !video) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (section && !reduceMotion) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          section.classList.toggle("is-alive", entry.isIntersecting);
        });
      },
      { threshold: 0.2 },
    );
    sectionObserver.observe(section);
  }

  if (!video) return;

  if (reduceMotion) {
    video.removeAttribute("autoplay");
    video.pause();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const play = video.play();
          if (play && typeof play.catch === "function") {
            play.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(video);
}
