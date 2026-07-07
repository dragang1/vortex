const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function initHeroParallax() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const hero = document.querySelector(".hero");
  const bg = document.querySelector(".hero__bg");
  const aurora = document.querySelector(".hero__aurora");
  if (!hero || !bg) return;

  let raf = null;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      bg.style.transform = `scale(1.08) translate(${x * -18}px, ${y * -14}px)`;
      if (aurora) {
        aurora.style.transform = `translate(${x * 26}px, ${y * 20}px)`;
      }
      raf = null;
    });
  });

  hero.addEventListener("mouseleave", () => {
    bg.style.transform = "";
    if (aurora) aurora.style.transform = "";
  });
}

function initTilt() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

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

function initStatCounters() {
  const stats = document.querySelectorAll("[data-count]");
  if (stats.length === 0) return;

  const reduced = prefersReducedMotion();

  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.countSuffix ?? "";
    if (Number.isNaN(target)) return;

    if (reduced) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const stat = el.closest(".hero__stat");
    if (stat) stat.classList.add("is-counting");

    const duration = 1100;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) {
        window.requestAnimationFrame(step);
      } else if (stat) {
        stat.classList.remove("is-counting");
      }
    };
    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );

  stats.forEach((el) => observer.observe(el));
}

export function initInteractions() {
  initScrollProgress();
  initHeroParallax();
  initTilt();
  initStatCounters();
}
