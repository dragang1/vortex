const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress");
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? doc.scrollTop / max : 0;
    bar.style.transform = `scaleX(${ratio})`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

function initTilt() {
  if (reduceMotion() || coarsePointer()) return;

  document.querySelectorAll("[data-tilt]").forEach((el) => {
    const max = Number(el.dataset.tiltMax ?? 6);
    let raf = null;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(px - 0.5) * max * 2}deg`);
        el.style.setProperty("--ry", `${(0.5 - py) * max * 2}deg`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
        raf = null;
      });
    });

    el.addEventListener("mouseleave", () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  });
}

// Pointer-following sheen for cards that aren't tilt-driven
function initSpotlight() {
  if (reduceMotion() || coarsePointer()) return;

  document
    .querySelectorAll(".glow-follow:not([data-tilt])")
    .forEach((el) => {
      let raf = null;
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        if (raf) return;
        raf = window.requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
          raf = null;
        });
      });
    });
}

// Subtle magnetic pull on buttons
function initMagnetic() {
  if (reduceMotion() || coarsePointer()) return;

  document.querySelectorAll(".btn").forEach((el) => {
    const strength = Number(el.dataset.magnetic ?? 0.28);
    let raf = null;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y - 2}px)`;
        raf = null;
      });
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

// Depth parallax for decorative layers
function initParallax() {
  if (reduceMotion()) return;

  const layers = Array.from(document.querySelectorAll("[data-parallax]"));
  if (layers.length === 0) return;

  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    layers.forEach((el) => {
      const speed = Number(el.dataset.parallax || 0.1);
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

export function initInteractions() {
  initScrollProgress();
  initTilt();
  initSpotlight();
  initMagnetic();
  initParallax();
}
