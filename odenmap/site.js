"use strict";
(() => {
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");
  const themeButton = document.querySelector("[data-theme-toggle]");
  const themeMenu = document.querySelector("[data-theme-menu]");
  const themeChoices = [...document.querySelectorAll("[data-theme-choice]")];
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const shot = document.querySelector("[data-shot]");

  const validPreference = (value) => value === "system" || value === "light" || value === "dark";

  function readPreference() {
    if (validPreference(root.dataset.theme)) return root.dataset.theme;
    try {
      const stored = localStorage.getItem("odenmap-theme");
      if (validPreference(stored)) return stored;
    } catch {}
    return "system";
  }

  function resolveScheme(preference) {
    if (preference === "dark") return "dark";
    if (preference === "light") return "light";
    return systemDark.matches ? "dark" : "light";
  }

  function currentScheme() {
    return root.dataset.scheme === "dark" ? "dark" : "light";
  }

  const labelFor = (preference) => {
    if (!themeButton) return preference;
    if (preference === "system") return themeButton.dataset.labelSystem;
    if (preference === "light") return themeButton.dataset.labelLight;
    return themeButton.dataset.labelDark;
  };

  function updateMenu(preference) {
    for (const choice of themeChoices) {
      const active = choice.dataset.themeChoice === preference;
      choice.setAttribute("aria-pressed", String(active));
      choice.classList.toggle("is-active", active);
    }
  }

  function updateButton(preference) {
    if (!themeButton) return;
    const themeLabel = themeButton.dataset.labelTheme || "Appearance";
    themeButton.setAttribute("aria-label", themeLabel + ": " + labelFor(preference));
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

  function applyTheme(preference, save) {
    preference = validPreference(preference) ? preference : "system";
    const scheme = resolveScheme(preference);
    root.dataset.theme = preference;
    root.dataset.scheme = scheme;
    if (themeMeta) themeMeta.setAttribute("content", scheme === "dark" ? "#121110" : "#f7f4ef");
    updateButton(preference);
    updateMenu(preference);
    updateShot(scheme);
    if (save) {
      try { localStorage.setItem("odenmap-theme", preference); } catch {}
    }
  }

  function openMenu() {
    if (!themeMenu || !themeButton) return;
    themeMenu.hidden = false;
    themeButton.setAttribute("aria-expanded", "true");
    const active = themeMenu.querySelector('[aria-pressed="true"]');
    (active || themeMenu.querySelector("button"))?.focus({ preventScroll: true });
  }

  function closeMenu(returnFocus) {
    if (!themeMenu || !themeButton) return;
    themeMenu.hidden = true;
    themeButton.setAttribute("aria-expanded", "false");
    if (returnFocus) themeButton.focus({ preventScroll: true });
  }

  themeButton?.addEventListener("click", () => {
    if (themeMenu?.hidden) openMenu();
    else closeMenu(false);
  });

  for (const choice of themeChoices) {
    choice.addEventListener("click", () => {
      applyTheme(choice.dataset.themeChoice, true);
      closeMenu(true);
    });
  }

  document.addEventListener("pointerdown", (event) => {
    if (!themeMenu || themeMenu.hidden) return;
    if (themeMenu.contains(event.target) || themeButton?.contains(event.target)) return;
    closeMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && themeMenu && !themeMenu.hidden) {
      closeMenu(true);
    }
  });

  systemDark.addEventListener("change", () => {
    if (readPreference() === "system") applyTheme("system", false);
  });

  applyTheme(readPreference(), false);

  if ("requestIdleCallback" in window) requestIdleCallback(preloadOtherTheme, { timeout: 1800 });
  else setTimeout(preloadOtherTheme, 1200);
})();
