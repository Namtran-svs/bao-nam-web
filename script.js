const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const themeBtn = document.getElementById("themeBtn");

const secretButtons = [
  document.getElementById("secretBtn"),
  document.getElementById("secretBtnBottom")
].filter(Boolean);

const modalTitle = document.getElementById("modalTitle");
const modalKicker = document.getElementById("modalKicker");
const modalText = document.getElementById("modalText");
const modalCode = document.getElementById("modalCode");

document.title = "Nam — Personal Archive";


/* =========================
   MODAL SYSTEM
========================= */

function openModal({
  title,
  kicker = "CLASSIFIED",
  text,
  code = "USER: VISITOR<br>LEVEL: CURIOUS<br>STATUS: <strong>WELCOME</strong>"
}) {
  modalTitle.textContent = title;
  modalKicker.textContent = kicker;
  modalText.innerHTML = text;
  modalCode.innerHTML = code;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}


function closeCurrentModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}


closeModal.addEventListener("click", closeCurrentModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeCurrentModal();
  }
});


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCurrentModal();
  }
});


/* =========================
   PROJECT / ARCHIVE MODALS
========================= */

document.querySelectorAll("[data-modal-title]").forEach((item) => {
  item.addEventListener("click", () => {
    openModal({
      title: item.dataset.modalTitle,
      kicker: item.dataset.modalKicker,
      text: item.dataset.modalText
    });
  });
});


/* =========================
   SECRET FILE
========================= */

function openSecret() {
  modalKicker.textContent = "CLASSIFIED / FILE 001";
  modalTitle.textContent = "ACCESS GRANTED.";
  modalText.textContent = "Initializing archive...";

  modalCode.innerHTML =
    "SYSTEM: PERSONAL ARCHIVE<br>" +
    "VISITOR: VERIFIED<br>" +
    "DECRYPTION: <strong>COMPLETE</strong>";

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");


  const stages = [
    [700, "Verifying visitor..."],
    [1400, "Searching hidden records..."],
    [2100, "One file found."],
    [2800, "There was never supposed to be a FILE 001."]
  ];


  stages.forEach(([delay, message]) => {

    setTimeout(() => {

      if (!modal.classList.contains("show")) return;

      modalText.textContent = message;


      if (delay === 2100) {
        modalCode.innerHTML =
          "FILE: 001<br>" +
          "STATUS: <strong>OPEN</strong><br>" +
          "NOTE: You found it.";
      }


      if (delay === 2800) {
        modalCode.innerHTML =
          "FILE: 001<br>" +
          "STATUS: <strong>UNSEALED</strong><br>" +
          "NOTE: There may be more.";
      }

    }, delay);

  });
}


secretButtons.forEach((button) => {
  button.addEventListener("click", openSecret);
});


/* =========================
   THEME SYSTEM
========================= */

const savedTheme = localStorage.getItem("nam-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}


function updateThemeButton() {

  const isLight =
    document.body.classList.contains("light");

  themeBtn.textContent =
    isLight ? "☼" : "◐";

  themeBtn.setAttribute(
    "aria-label",
    isLight
      ? "Chuyển sang nền tối"
      : "Chuyển sang nền sáng"
  );
}


updateThemeButton();


themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  localStorage.setItem(
    "nam-theme",
    document.body.classList.contains("light")
      ? "light"
      : "dark"
  );

  updateThemeButton();

});


/* =========================
   SCROLL REVEAL
========================= */

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => {
    revealObserver.observe(element);
  });
