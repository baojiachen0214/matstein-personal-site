/* Pick the OdenMap language from the browser timezone, then fall back to English.
   Explicit choices are kept in localStorage. Crawlers are left on the URL they
   requested so both language versions remain indexable. */
(() => {
  try {
    const path = location.pathname;
    if (!path.startsWith("/odenmap/")) return;

    const ua = navigator.userAgent || "";
    if (/bot|crawler|spider|slurp|bingpreview|facebookexternalhit|applebot|google-inspectiontool|baiduspider|yandex|duckduckbot|semrush|ahrefs/i.test(ua)) return;

    const key = "odenmap-lang";
    let preference = null;
    try { preference = localStorage.getItem(key); } catch {}

    let explicit = null;
    try { explicit = new URLSearchParams(location.search).get("lang"); } catch {}
    if (explicit === "zh" || explicit === "en") {
      preference = explicit;
      try { localStorage.setItem(key, preference); } catch {}
      try {
        const clean = new URL(location.href);
        clean.searchParams.delete("lang");
        history.replaceState(null, "", clean);
      } catch {}
    }

    if (preference !== "zh" && preference !== "en") {
      let zone = "";
      try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch {}
      const mainlandChina = /^(Asia\/(Shanghai|Chongqing|Harbin|Urumqi|Kashgar)|PRC)$/i.test(zone);
      preference = mainlandChina ? "zh" : "en";
    }

    const onEnglish = path === "/odenmap/en" || path.startsWith("/odenmap/en/");
    const wantEnglish = preference === "en";
    if (wantEnglish === onEnglish) return;

    const rest = onEnglish
      ? (path.startsWith("/odenmap/en/") ? path.slice("/odenmap/en/".length) : "")
      : path.slice("/odenmap/".length);
    const target = (wantEnglish ? "/odenmap/en/" : "/odenmap/") + rest;
    location.replace(target + location.search + location.hash);
  } catch {
    /* If anything is unavailable, keep the requested page. */
  }
})();
