document.body.classList.add("js");

const revealItems = document.querySelectorAll(".card, .hero-content");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const ytIframes = document.querySelectorAll("iframe[data-end]");

if (ytIframes.length > 0 && !window.YT) {
  const ytScript = document.createElement("script");
  ytScript.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(ytScript);
}

window.onYouTubeIframeAPIReady = () => {
  ytIframes.forEach((iframe) => {
    const start = Number(iframe.dataset.start || 0);
    const end = Number(iframe.dataset.end || 0);

    if (!iframe.id) {
      iframe.id = `yt-${Math.random().toString(36).slice(2, 9)}`;
    }

    const player = new window.YT.Player(iframe.id, {
      events: {
        onReady: (event) => {
          const timer = setInterval(() => {
            if (end > 0 && event.target.getCurrentTime) {
              const current = event.target.getCurrentTime();
              if (current >= end) {
                event.target.seekTo(start, true);
              }
            }
          }, 500);

          iframe.dataset.timerId = String(timer);
        },
      },
    });

    iframe.dataset.playerId = player?.getIframe?.().id || iframe.id;
  });
};

const contactForm = document.querySelector(".form");
const successModal = document.querySelector("#success-modal");
const modalAccept = document.querySelector(".modal-accept");

if (contactForm && successModal && modalAccept) {
  contactForm.addEventListener("submit", () => {
    successModal.classList.add("show");
    successModal.setAttribute("aria-hidden", "false");
  });

  modalAccept.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
