export function initReadMore() {
  document.querySelectorAll("[data-read-more]").forEach((bio) => {
    const btn = bio.querySelector(".artist-feature__more");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const open = bio.classList.toggle("is-expanded");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Prikaži manje" : "Pročitaj više";
    });
  });
}
