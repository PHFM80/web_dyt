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
