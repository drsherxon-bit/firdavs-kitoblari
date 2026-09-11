/* Firdavs kitoblari — o'quvchi paneli (kitob ichida ishlaydi) */
(function () {
  "use strict";
  var root = document.documentElement;
  var slug = root.getAttribute("data-book") || location.pathname.split("/").pop().replace(/\.html$/, "");
  var K = { theme: "firdavs:theme", zoom: "firdavs:zoom", pos: "firdavs:pos:" + slug };
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---- mavzu ---- */
  function applyTheme(t) {
    if (t === "dark" || t === "light") { root.setAttribute("data-theme", t); root.style.colorScheme = t; }
    else { root.removeAttribute("data-theme"); root.style.colorScheme = ""; }
  }
  var theme = get(K.theme) || "";
  applyTheme(theme);

  /* ---- harf kattaligi ---- */
  var zoom = parseFloat(get(K.zoom)) || 1;
  function applyZoom() { root.style.setProperty("--fk-zoom", zoom.toFixed(2)); }
  applyZoom();

  /* ---- mundarija: kitobning o'z navigatsiyasidan ---- */
  function tocItems() {
    var links = document.querySelectorAll(".topnav a[href^='#'], .bc-list a[href^='#'], .cv-toc a[href^='#']");
    var out = [], seen = {};
    for (var i = 0; i < links.length; i++) {
      var a = links[i], id = a.getAttribute("href").slice(1);
      if (!id || seen[id] || !document.getElementById(id)) continue;
      seen[id] = 1;
      var ar = a.querySelector(".bc-la, .t-ar, .ct-ar");
      var uz = a.querySelector(".bc-lu, .ct-uz");
      out.push({ id: id, uz: (uz ? uz.textContent : a.textContent).trim().replace(/\s+/g, " "), ar: ar ? ar.textContent.trim() : "" });
    }
    return out;
  }
  var toc = tocItems();

  function top(id) { var el = document.getElementById(id); return el ? el.getBoundingClientRect().top + window.scrollY : null; }
  function current() {
    var y = window.scrollY + 90, best = null;
    for (var i = 0; i < toc.length; i++) {
      var t = top(toc[i].id);
      if (t !== null && t <= y) best = i;
    }
    return best === null ? null : toc[best];
  }
  /* joy bo'lim ichidagi ULUSH sifatida saqlanadi — harf kattaligi yoki ekran o'zgarsa ham o'sha joyga qaytadi */
  function anchorPos() {
    var y = window.scrollY, idx = -1;
    for (var i = 0; i < toc.length; i++) { var t = top(toc[i].id); if (t !== null && t <= y + 1) idx = i; }
    if (idx < 0) return { frac: y / Math.max(1, document.documentElement.scrollHeight) };
    var a = top(toc[idx].id), b = idx + 1 < toc.length ? top(toc[idx + 1].id) : document.documentElement.scrollHeight;
    return { id: toc[idx].id, frac: Math.max(0, Math.min(1, (y - a) / Math.max(1, b - a))) };
  }
  function anchorY(p) {
    if (!p.id) return p.frac * document.documentElement.scrollHeight;
    var idx = -1; for (var i = 0; i < toc.length; i++) if (toc[i].id === p.id) idx = i;
    if (idx < 0) return null;
    var a = top(toc[idx].id), b = idx + 1 < toc.length ? top(toc[idx + 1].id) : document.documentElement.scrollHeight;
    return a + p.frac * (b - a);
  }

  /* ---- o'qilgan joyni eslab qolish ---- */
  var t;
  function savePos() {
    var h = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var c = current(), ap = anchorPos();
    set(K.pos, JSON.stringify({ aid: ap.id || "", frac: ap.frac, pct: Math.round(100 * Math.min(1, window.scrollY / h)), id: c ? c.id : "", label: c ? c.uz : "", at: Date.now() }));
  }
  window.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(savePos, 400); }, { passive: true });

  function restore() {
    if (location.hash) return;
    try {
      var p = JSON.parse(get(K.pos) || "null");
      if (!p || !p.pct) return;
      var y = anchorY({ id: p.aid, frac: p.frac || 0 });
      if (y !== null && y > 200) window.scrollTo(0, y);
    } catch (e) {}
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(restore, 50); }); else setTimeout(restore, 300);

  /* ---- panel ---- */
  var ic = {
    home: '<svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4z"/></svg>',
    list: '<svg viewBox="0 0 24 24"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    sun:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    auto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>'
  };
  var bar = document.createElement("nav");
  bar.className = "fk-bar";
  bar.setAttribute("aria-label", "O‘quvchi paneli");
  bar.innerHTML =
    '<a class="fk-home" href="../index.html">' + ic.home + '<span>Kutubxona</span></a>' +
    '<button class="fk-toc" type="button">' + ic.list + '<span>Mundarija</span></button>' +
    '<button class="fk-aa sm" type="button" data-d="-1"><b>A</b><span>Kichik</span></button>' +
    '<button class="fk-aa" type="button" data-d="1"><b>A</b><span>Katta</span></button>' +
    '<button class="fk-theme" type="button"></button>';
  document.body.appendChild(bar);

  var themeBtn = bar.querySelector(".fk-theme");
  var order = ["", "dark", "light"], names = { "": "Avto", dark: "Tungi", light: "Kunduzgi" };
  function drawTheme() { themeBtn.innerHTML = (theme === "dark" ? ic.moon : theme === "light" ? ic.sun : ic.auto) + "<span>" + names[theme] + "</span>"; }
  drawTheme();
  themeBtn.addEventListener("click", function () {
    theme = order[(order.indexOf(theme) + 1) % order.length];
    set(K.theme, theme); applyTheme(theme); drawTheme();
  });

  var aa = bar.querySelectorAll(".fk-aa");
  for (var i = 0; i < aa.length; i++) aa[i].addEventListener("click", function () {
    var d = +this.getAttribute("data-d");
    zoom = Math.min(1.6, Math.max(0.8, Math.round((zoom + d * 0.1) * 100) / 100));
    set(K.zoom, zoom); applyZoom();
  });

  /* ---- mundarija oynasi ---- */
  var dim = document.createElement("div"); dim.className = "fk-dim"; dim.hidden = true;
  var sheet = document.createElement("div"); sheet.className = "fk-sheet"; sheet.hidden = true;
  document.body.appendChild(dim); document.body.appendChild(sheet);
  function close() { dim.hidden = true; sheet.hidden = true; }
  dim.addEventListener("click", close);
  bar.querySelector(".fk-toc").addEventListener("click", function () {
    var c = current(), h = "<h3>Mundarija</h3>";
    if (!toc.length) h += '<a href="#top">Kitob boshiga</a>';
    for (var i = 0; i < toc.length; i++) {
      var x = toc[i];
      h += '<a href="#' + x.id + '"' + (c && c.id === x.id ? ' class="now"' : "") + ">" + x.uz + (x.ar ? '<span class="ar">' + x.ar + "</span>" : "") + "</a>";
    }
    h += '<h3 style="margin-top:14px">Boshiga</h3><div class="fk-row"><button type="button" data-top>Kitob boshiga qaytish</button></div>';
    sheet.innerHTML = h; dim.hidden = false; sheet.hidden = false;
    var now = sheet.querySelector("a.now"); if (now) now.scrollIntoView({ block: "center" });
    var links = sheet.querySelectorAll("a");
    for (var j = 0; j < links.length; j++) links[j].addEventListener("click", close);
    sheet.querySelector("[data-top]").addEventListener("click", function () { window.scrollTo(0, 0); close(); });
  });
})();
