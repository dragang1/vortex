export function initCountdown() {
  const root = document.querySelector("[data-countdown]");
  if (!root) return;

  const target = new Date(root.dataset.countdown).getTime();
  if (Number.isNaN(target)) return;

  const fields = {
    days: root.querySelector('[data-unit="days"]'),
    hours: root.querySelector('[data-unit="hours"]'),
    minutes: root.querySelector('[data-unit="minutes"]'),
    seconds: root.querySelector('[data-unit="seconds"]'),
  };

  const label = document.querySelector(".countdown__label");
  const pad = (n) => String(n).padStart(2, "0");

  let timer = null;

  const render = () => {
    const diff = target - Date.now();

    if (diff <= 0) {
      if (fields.days) fields.days.textContent = "00";
      if (fields.hours) fields.hours.textContent = "00";
      if (fields.minutes) fields.minutes.textContent = "00";
      if (fields.seconds) fields.seconds.textContent = "00";
      if (label) {
        label.textContent = "Vortex je počeo!";
        label.closest(".countdown")?.classList.add("countdown--live");
      }
      if (timer) clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (fields.days) fields.days.textContent = pad(days);
    if (fields.hours) fields.hours.textContent = pad(hours);
    if (fields.minutes) fields.minutes.textContent = pad(minutes);
    if (fields.seconds) fields.seconds.textContent = pad(seconds);
  };

  render();
  timer = setInterval(render, 1000);
}
