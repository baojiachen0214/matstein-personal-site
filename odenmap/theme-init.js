/* Resolve the appearance before the first paint. No network requests. */
(() => {
  const root = document.documentElement;
  let preference = "system";
  try {
    const stored = localStorage.getItem("odenmap-theme");
    if (stored === "system" || stored === "light" || stored === "dark") preference = stored;
  } catch {}
  const scheme = preference === "system"
    ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference;
  root.dataset.theme = preference;
  root.dataset.scheme = scheme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", scheme === "dark" ? "#121110" : "#f7f4ef");
})();
