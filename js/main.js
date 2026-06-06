import { pages, NOT_FOUND } from "./pages.js";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const view = document.getElementById("view");
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const navToggle = document.getElementById("navToggle");
const allNav = [...navLinks.querySelectorAll("a[data-route]")];

let routeObserver = null;
let scrollRaf = 0;

const currentRoute = () => {
  const hash = location.hash.replace(/^#/, "");
  return hash && hash.startsWith("/") ? hash : "/";
};

function setActiveTab(route) {
  allNav.forEach((link) => link.classList.toggle("active", link.dataset.route === route));
}

function updateNav() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    nav.classList.toggle("scrolled", window.scrollY > 46);
  });
}

function prepImages(root) {
  root.querySelectorAll("img").forEach((img, index) => {
    img.decoding = "async";
    if (index > 0) img.loading = img.loading || "lazy";
    if (img.complete) img.classList.add("is-loaded");
    else img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
  });
}

function revealPage() {
  const items = [...view.querySelectorAll(".reveal")];

  if (routeObserver) routeObserver.disconnect();

  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  routeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      routeObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  items.forEach((item) => routeObserver.observe(item));
}

function resetScroll() {
  window.scrollTo(0, 0);
}

function render(route) {
  const page = pages[route] || NOT_FOUND;
  document.title = page.title;
  setActiveTab(route);

  view.innerHTML = page.html;
  view.dataset.mood = page.mood || "home";
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  resetScroll();
  prepImages(view);
  revealPage();
  updateNav();
}

window.addEventListener("hashchange", () => render(currentRoute()));
window.addEventListener("scroll", updateNav, { passive: true });

document.body.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-link]");
  if (link && link.getAttribute("href")?.startsWith("#/")) {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.getElementById("year").textContent = new Date().getFullYear();

const loaderEl = document.getElementById("loader");
const barFill = document.getElementById("loader-bar-fill");

function finishLoad() {
  loaderEl.classList.add("hidden");
  render(currentRoute());
}

if (prefersReduced) {
  finishLoad();
} else {
  barFill.style.width = "100%";
  window.setTimeout(finishLoad, 260);
}
