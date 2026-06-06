import { pages, NOT_FOUND } from "./pages.js";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

const view = document.getElementById("view");
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const navToggle = document.getElementById("navToggle");
const allNav = navLinks.querySelectorAll("a[data-route]");
const progressEl = document.getElementById("scrollProgress");
const pointerLight = document.getElementById("pointerLight");

const bgLayer = document.querySelector(".bg-3d");
const ptr = { x: 0, y: 0, tx: 0, ty: 0 };

if (!prefersReduced && bgLayer) {
  window.addEventListener("pointermove", (e) => {
    ptr.tx = e.clientX / window.innerWidth - 0.5;
    ptr.ty = e.clientY / window.innerHeight - 0.5;
    document.body.classList.add("has-pointer");
    document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
    document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
  }, { passive: true });

  const bgLoop = () => {
    ptr.x += (ptr.tx - ptr.x) * 0.045;
    ptr.y += (ptr.ty - ptr.y) * 0.045;
    bgLayer.style.transform = `translate3d(${ptr.x * 22}px, ${ptr.y * 22}px, 0) scale(1.04)`;
    requestAnimationFrame(bgLoop);
  };
  bgLoop();
}

if (!prefersReduced && pointerLight) {
  window.addEventListener("pointerleave", () => document.body.classList.remove("has-pointer"));
}

(function dustField() {
  if (prefersReduced) return;
  const cv = document.getElementById("dust");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  let w = 0;
  let h = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = cv.clientWidth;
    h = cv.clientHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(56, Math.round((w * h) / 42000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.7 + 0.35,
      vy: -(Math.random() * 0.16 + 0.04),
      vx: (Math.random() - 0.5) * 0.11,
      tw: Math.random() * Math.PI * 2,
      ts: Math.random() * 0.018 + 0.006,
      a: Math.random() * 0.46 + 0.18,
    }));
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.tw += p.ts;
      if (p.y < -6) {
        p.y = h + 6;
        p.x = Math.random() * w;
      }
      if (p.x < -6) p.x = w + 6;
      if (p.x > w + 6) p.x = -6;
      const alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(154,112,33,${alpha.toFixed(3)})`;
      ctx.shadowColor = "rgba(199,154,66,0.62)";
      ctx.shadowBlur = p.r * 3.2;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

function attachTilt(root) {
  if (prefersReduced) return;

  root.querySelectorAll("[data-tilt]").forEach((el) => {
    const max = parseFloat(el.dataset.tilt) || 8;
    let raf = null;
    let rx = 0;
    let ry = 0;
    let tx = 0;
    let ty = 0;
    let scale = 1;

    const apply = () => {
      rx += (tx - rx) * 0.14;
      ry += (ty - ry) * 0.14;
      el.style.transform = `perspective(950px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
      if (Math.abs(tx - rx) > 0.04 || Math.abs(ty - ry) > 0.04) raf = requestAnimationFrame(apply);
      else raf = null;
    };

    const requestApply = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ty = px * max;
      tx = -py * max;
      scale = 1.025;
      requestApply();
    }, { passive: true });

    el.addEventListener("pointerleave", () => {
      tx = 0;
      ty = 0;
      scale = 1;
      requestApply();
    });
  });
}

function addCardGlow(el) {
  if (!el.querySelector(":scope > .card-glow")) {
    const glow = document.createElement("span");
    glow.className = "card-glow";
    glow.setAttribute("aria-hidden", "true");
    el.append(glow);
  }
}

function attachSurfaceInteractions(root) {
  if (prefersReduced) return;

  root.querySelectorAll(".feature-card, .g-item, .mini-service, .contact-block, .hero-figure, .split-figure, .buy-figure").forEach((el) => {
    addCardGlow(el);
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--card-x", `${x.toFixed(1)}%`);
      el.style.setProperty("--card-y", `${y.toFixed(1)}%`);
    }, { passive: true });
  });
}

function burstSparkles(x, y, amount = 10) {
  if (prefersReduced) return;

  for (let i = 0; i < amount; i += 1) {
    const sparkle = document.createElement("span");
    const angle = (Math.PI * 2 * i) / amount + Math.random() * 0.45;
    const distance = 24 + Math.random() * 44;
    sparkle.className = "sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty("--sx", `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty("--sy", `${Math.sin(angle) * distance}px`);
    document.body.append(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
  }
}

function attachClickEnergy(root) {
  if (prefersReduced) return;

  root.querySelectorAll(".btn, .feature-card, .g-item, .mini-service").forEach((el) => {
    el.addEventListener("click", (e) => burstSparkles(e.clientX, e.clientY, el.classList.contains("btn") ? 8 : 12));
  });
}

function attachButtonRipple(root) {
  if (prefersReduced) return;

  root.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      btn.append(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    });
  });
}

function attachMagnet(root) {
  if (prefersReduced) return;

  root.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.16;
      btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    }, { passive: true });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}

const currentRoute = () => {
  const hash = location.hash.replace(/^#/, "");
  return hash && hash.startsWith("/") ? hash : "/";
};

const setActiveTab = (route) => {
  allNav.forEach((a) => a.classList.toggle("active", a.dataset.route === route));
};

function resetScroll() {
  window.scrollTo(0, 0);
}

function revealPage() {
  const items = [...view.querySelectorAll(".reveal")];
  if (!items.length) return;

  if (prefersReduced || !gsap) {
    items.forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = "none";
    });
    return;
  }

  items.forEach((el, index) => {
    const aboveFold = el.getBoundingClientRect().top < window.innerHeight * 0.92;
    const from = { opacity: 0, y: 30, scale: 0.985, filter: "blur(10px)" };
    const to = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.82, ease: "power3.out" };

    if (aboveFold) {
      gsap.fromTo(el, from, { ...to, delay: Math.min(index * 0.045, 0.28) });
    } else {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: ScrollTrigger
          ? { trigger: el, start: "top 88%", toggleActions: "play none none none" }
          : undefined,
      });
    }
  });
}

let isFirst = true;

function render(route) {
  const page = pages[route] || NOT_FOUND;
  document.title = page.title;
  setActiveTab(route);

  const swap = () => {
    if (ScrollTrigger) ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
    attachButtonRipple(view);
    attachClickEnergy(view);
    attachMagnet(view);
    revealPage();
    updateChrome();
    if (ScrollTrigger) ScrollTrigger.refresh();
  };

  if (prefersReduced || isFirst || !gsap) {
    swap();
    isFirst = false;
  } else {
    gsap.to(view, {
      opacity: 0,
      y: -10,
      duration: 0.22,
      ease: "power1.in",
      onComplete: () => {
        swap();
        gsap.fromTo(view, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.48, ease: "power2.out" });
      },
    });
  }
}

function updateChrome() {
  const y = window.scrollY;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  nav.classList.toggle("scrolled", y > 46);
  if (progressEl) progressEl.style.width = `${Math.min(100, (y / max) * 100)}%`;
}

window.addEventListener("hashchange", () => render(currentRoute()));
window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("resize", updateChrome, { passive: true });

document.body.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (a && a.getAttribute("href")?.startsWith("#/")) {
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
let progress = 0;

const finishLoad = () => {
  loaderEl.classList.add("hidden");
  render(currentRoute());
};

if (prefersReduced) {
  finishLoad();
} else {
  const fakeLoad = setInterval(() => {
    progress = Math.min(100, progress + Math.random() * 18 + 8);
    barFill.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(fakeLoad);
      setTimeout(finishLoad, 240);
    }
  }, 120);
}
