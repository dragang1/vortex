export function initNav() {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.nav__menu');

  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!menu) return;

  menu.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(window.location.hash) && window.location.hash) {
      link.classList.add('is-active');
    }
  });
}
