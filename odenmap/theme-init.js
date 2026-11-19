/* Resolve the appearance before the first paint. No network requests. */
(() => {
  const root = document.documentElement;
  let stored = null;
  try {
    stored = localStorage.getItem("odenmap-theme") || localStorage.getItem("oden-theme");
    if (stored === "system") stored = null;
  } catch {}
  const scheme = stored === "light" || stored === "dark"
    ? stored
    : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.scheme = scheme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", scheme === "dark" ? "#121110" : "#f7f4ef");
})();
