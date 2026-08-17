const cards = [...document.querySelectorAll(".project-card")];
const dots = [...document.querySelectorAll(".carousel-dots button")];
const track = document.querySelector(".carousel-track");
const counter = document.querySelector(".carousel-counter");
const viewport = document.querySelector(".carousel-viewport");
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".nav-links");
let active = 0;
let touchStart = null;

function showProject(index) {
  active = (index + cards.length) % cards.length;
  track.style.transform = `translateX(calc(50vw - ${active} * var(--card-step) - var(--card-half)))`;
  counter.textContent = `${String(active + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  cards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === active));
  dots.forEach((dot, dotIndex) => {
    const selected = dotIndex === active;
    dot.classList.toggle("is-active", selected);
    dot.setAttribute("aria-selected", String(selected));
  });
}

document.querySelector(".previous").addEventListener("click", () => showProject(active - 1));
document.querySelector(".next").addEventListener("click", () => showProject(active + 1));
cards.forEach((card, index) => card.addEventListener("click", () => showProject(index)));
dots.forEach((dot, index) => dot.addEventListener("click", () => showProject(index)));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showProject(active - 1);
  if (event.key === "ArrowRight") showProject(active + 1);
  if (event.key === "Escape") closeMenu();
});

viewport.addEventListener("touchstart", (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
viewport.addEventListener("touchend", (event) => {
  if (touchStart === null) return;
  const distance = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 45) showProject(active + (distance < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });

function closeMenu() {
  menu.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
}

menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "Close" : "Menu";
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
