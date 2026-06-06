import { pages, NOT_FOUND } from "./pages.js";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const view = document.getElementById("view");
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const navToggle = document.getElementById("navToggle");
const allNav = [...navLinks.querySelectorAll("a[data-route]")];
const progressEl = document.getElementById("scrollProgress");
const pointerLight = document.getElementById("pointerLight");
const bgLayer = document.querySelector(".bg-3d");

let isFirst = true;
let routeObserver = null;
let scrollRaf = 0;
let pointerRaf = 0;
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;

const currentRoute = () => {
  const hash = location.hash.replace(/^#/, "");
  return hash && hash.startsWith("/") ? hash : "/";
};

const setActiveTab = (route) => {
  allNav.forEach((link) => link.classList.toggle("active", link.dataset.route === route));
};

function requestChromeUpdate() {
  if (scrollRaf) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0;
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    nav.classList.toggle("scrolled", y > 46);
    if (progressEl) progressEl.style.width = `${Math.min(100, (y / max) * 100)}%`;
  });
}

function attachGlobalPointer() {
  if (!canHover || prefersReduced) return;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    document.body.classList.add("has-pointer");

    if (pointerRaf) return;
    pointerRaf = requestAnimationFrame(() => {
      pointerRaf = 0;
      document.body.style.setProperty("--mouse-x", `${pointerX}px`);
      document.body.style.setProperty("--mouse-y", `${pointerY}px`);

      if (bgLayer) {
        const x = (pointerX / window.innerWidth - 0.5) * 12;
        const y = (pointerY / window.innerHeight - 0.5) * 12;
        bgLayer.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      }
    });
  }, { passive: true });

  window.addEventListener("pointerleave", () => document.body.classList.remove("has-pointer"));
  if (!pointerLight) document.body.classList.remove("has-pointer");
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
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    routeObserver.observe(item);
  });
}

function attachTilt(root) {
  if (!canHover || prefersReduced) return;

  root.querySelectorAll("[data-tilt]").forEach((el) => {
    const max = Math.min(parseFloat(el.dataset.tilt) || 7, 7);

    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(1.018)`;
    }, { passive: true });

    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

function addCardGlow(el) {
  if (el.querySelector(":scope > .card-glow")) return;
  const glow = document.createElement("span");
  glow.className = "card-glow";
  glow.setAttribute("aria-hidden", "true");
  el.append(glow);
}

function attachSurfaceInteractions(root) {
  if (!canHover || prefersReduced) return;

  root.querySelectorAll(".feature-card, .g-item, .mini-service, .contact-block, .hero-figure, .split-figure, .buy-figure").forEach((el) => {
    addCardGlow(el);
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--card-x", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
      el.style.setProperty("--card-y", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
    }, { passive: true });
  });
}

function burstSparkles(x, y) {
  if (!canHover || prefersReduced) return;

  for (let i = 0; i < 5; i += 1) {
    const sparkle = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 5 + Math.random() * 0.3;
    const distance = 18 + Math.random() * 24;
    sparkle.className = "sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty("--sx", `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty("--sy", `${Math.sin(angle) * distance}px`);
    document.body.append(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
  }
}

function attachButtonInteractions(root) {
  if (prefersReduced) return;

  root.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("pointerdown", (event) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      btn.append(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
      burstSparkles(event.clientX, event.clientY);
    });
  });
}

function resetScroll() {
  window.scrollTo(0, 0);
}

function render(route) {
  const page = pages[route] || NOT_FOUND;
  document.title = page.title;
  setActiveTab(route);

  const swap = () => {
    view.innerHTML = page.html;
    view.dataset.mood = page.mood || "home";
    view.querySelectorAll("img").forEach((img) => {
      img.decoding = "async";
      img.addEventListener("load", () => img.classList.add("is-loaded"), { once: true });
    });

    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    resetScroll();
    attachTilt(view);
    attachSurfaceInteractions(view);
    attachButtonInteractions(view);
    revealPage();
    requestChromeUpdate();
  };

  if (isFirst || prefersReduced) {
    swap();
    isFirst = false;
    return;
  }

  view.style.opacity = "0";
  view.style.transform = "translate3d(0, -8px, 0)";
  window.setTimeout(() => {
    swap();
    requestAnimationFrame(() => {
      view.style.opacity = "1";
      view.style.transform = "";
    });
  }, 160);
}

window.addEventListener("hashchange", () => render(currentRoute()));
window.addEventListener("scroll", requestChromeUpdate, { passive: true });
window.addEventListener("resize", requestChromeUpdate, { passive: true });

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
attachGlobalPointer();

const loaderEl = document.getElementById("loader");
const barFill = document.getElementById("loader-bar-fill");
let progress = 0;

const finishLoad = () => {
  loaderEl.classList.add("hidden");
  render(currentRoute());
};

if (prefersReduced) {
  finishLoad();
} else {
  const fakeLoad = window.setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 20 + 12);
    barFill.style.width = `${progress}%`;
    if (progress >= 100) {
      window.clearInterval(fakeLoad);
      window.setTimeout(finishLoad, 160);
    }
  }, 110);
}
