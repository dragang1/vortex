export function initChillVideo() {
  const section = document.querySelector("[data-chill-section]");
  const video = document.querySelector("[data-chill-video]");
  const unmuteBtn = document.querySelector("[data-chill-unmute]");
  if (!section && !video) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let userUnlockedAudio = false;
  let wantsSound = true;

  // Enter animations when the section scrolls into view
  if (section) {
    if (reduceMotion) {
      section.classList.add("is-alive");
    } else {
      const animObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            section.classList.toggle("is-alive", entry.isIntersecting);
          });
        },
        { threshold: 0.22, rootMargin: "0px 0px -40px 0px" },
      );
      animObserver.observe(section);
    }
  }

  if (!video) return;

  const showUnmute = () => {
    if (!unmuteBtn || userUnlockedAudio) return;
    unmuteBtn.hidden = false;
  };

  const hideUnmute = () => {
    if (!unmuteBtn) return;
    unmuteBtn.hidden = true;
  };

  const tryPlay = async ({ withSound }) => {
    if (withSound && wantsSound) {
      video.muted = false;
    } else {
      video.muted = true;
    }

    try {
      await video.play();
      if (video.muted) showUnmute();
      else hideUnmute();
      return true;
    } catch {
      video.muted = true;
      try {
        await video.play();
        showUnmute();
        return true;
      } catch {
        showUnmute();
        return false;
      }
    }
  };

  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", async () => {
      userUnlockedAudio = true;
      wantsSound = true;
      video.muted = false;
      try {
        await video.play();
        hideUnmute();
      } catch {
        showUnmute();
      }
    });
  }

  if (reduceMotion) {
    video.removeAttribute("autoplay");
    video.controls = true;
    video.pause();
    if (unmuteBtn) {
      unmuteBtn.hidden = false;
      unmuteBtn.querySelector(".chill__sound-dot")?.remove();
      unmuteBtn.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) node.remove();
      });
      unmuteBtn.appendChild(document.createTextNode("Play"));
      unmuteBtn.addEventListener("click", async () => {
        video.muted = false;
        userUnlockedAudio = true;
        try {
          await video.play();
          hideUnmute();
        } catch {
          /* native controls remain */
        }
      });
    }
    return;
  }

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const withSound = userUnlockedAudio || wantsSound;
          tryPlay({ withSound });
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.35 },
  );

  videoObserver.observe(video);
}
