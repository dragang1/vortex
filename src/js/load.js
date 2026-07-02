export function initLoad() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  const finish = () => {
    body.classList.remove('is-loading');
    body.classList.add('is-ready');

    document.querySelectorAll('.reveal-load').forEach((el) => {
      const delay = prefersReducedMotion ? 0 : Number(el.dataset.revealDelay ?? 0);
      if (delay === 0) {
        el.classList.add('is-visible');
        return;
      }
      setTimeout(() => el.classList.add('is-visible'), delay);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', finish, { once: true });
  } else {
    finish();
  }
}
