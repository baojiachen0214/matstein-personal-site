"use strict";
(() => {
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");
  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const shot = document.querySelector("[data-shot]");

  function storedTheme() {
    try { return localStorage.getItem("odenmap-theme"); } catch { return null; }
  }

  function currentScheme() {
    return root.dataset.scheme === "dark" ? "dark" : "light";
  }

  let shotRequest = 0;
  const preloaded = new Set();

  function setShot(base) {
    const nextSrc = base + "-1440.webp";
    const nextSet = base + "-800.webp 800w, " + base + "-1440.webp 1440w";
    shot.setAttribute("srcset", nextSet);
    shot.setAttribute("src", nextSrc);
  }

  function updateShot(scheme) {
    if (!shot) return;
    const base = shot.dataset[scheme];
    if (!base) return;
    const nextSrc = base + "-1440.webp";
    const nextSet = base + "-800.webp 800w, " + base + "-1440.webp 1440w";
    if (shot.getAttribute("src") === nextSrc && shot.getAttribute("srcset") === nextSet) {
      preloaded.add(base);
      return;
    }
    if (preloaded.has(base)) {
      setShot(base);
      return;
    }
    const request = ++shotRequest;
    const preload = new Image();
    preload.decoding = "async";
    preload.onload = preload.onerror = () => {
      if (request !== shotRequest) return;
      preloaded.add(base);
      setShot(base);
    };
    preload.src = nextSrc;
  }

  function preloadOtherTheme() {
    if (!shot) return;
    const base = shot.dataset[currentScheme() === "dark" ? "light" : "dark"];
    if (!base || preloaded.has(base)) return;
    const preload = new Image();
    preload.decoding = "async";
    preload.onload = () => preloaded.add(base);
    preload.src = base + (matchMedia("(max-width: 720px)").matches ? "-800.webp" : "-1440.webp");
  }

  if ("requestIdleCallback" in window) requestIdleCallback(preloadOtherTheme, { timeout: 1800 });
  else setTimeout(preloadOtherTheme, 1200);

  function applyTheme(scheme, save) {
    scheme = scheme === "dark" ? "dark" : "light";
    root.dataset.scheme = scheme;
      if (themeMeta) themeMeta.setAttribute("content", scheme === "dark" ? "#121110" : "#f7f4ef");
    if (themeButton) {
      themeButton.setAttribute("aria-label", scheme === "dark" ? themeButton.dataset.labelLight : themeButton.dataset.labelDark);
      themeButton.setAttribute("aria-pressed", String(scheme === "dark"));
    }
    updateShot(scheme);
    if (save) {
      try { localStorage.setItem("odenmap-theme", scheme); } catch {}
    }
  }

  themeButton?.addEventListener("click", () => {
    applyTheme(currentScheme() === "dark" ? "light" : "dark", true);
  });

  systemDark.addEventListener("change", (event) => {
    if (!storedTheme()) applyTheme(event.matches ? "dark" : "light", false);
  });

  applyTheme(currentScheme(), false);
})();
