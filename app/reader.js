/* Firdavs kitoblari — o'quvchi qobig'i (kitob ichida ishlaydi):
   pastki panel · mundarija · ko'rinish (mavzu, harf, qator oralig'i) · ustoz audiosi uchun pleyer.
   Kitobning o'z matniga tegmaydi: faqat qobiq qo'shiladi. */
(function () {
  "use strict";
  var root = document.documentElement;
  var slug = root.getAttribute("data-book") || location.pathname.split("/").pop().replace(/\.html$/, "");
  var K = {
    theme: "firdavs:theme", zoom: "firdavs:zoom", lead: "firdavs:lead", rate: "firdavs:rate",
    pos: "firdavs:pos:" + slug, read: "firdavs:read:" + slug
  };
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function jget(k) { try { return JSON.parse(get(k) || "null"); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function clean(s) { return String(s || "").replace(/\s+/g, " ").trim(); }
  function fmt(s) { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ":" + (s % 60 < 10 ? "0" : "") + (s % 60); }
  function node(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; n.setAttribute("data-fk", ""); return n; }

  var ic = {
    home: '<svg viewBox="0 0 24 24"><path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4z"/></svg>',
    list: '<svg viewBox="0 0 24 24"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    wave: '<svg viewBox="0 0 24 24"><path d="M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
    auto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>',
    close: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
    loop: '<svg viewBox="0 0 24 24"><path d="M4 9a5 5 0 0 1 5-5h9l-3-3M20 15a5 5 0 0 1-5 5H6l3 3"/></svg>',
    chain: '<svg viewBox="0 0 24 24"><path d="M5 5v14l9-7zM18 5v14"/></svg>',
    back5: '<svg viewBox="0 0 24 24"><path class="arc" d="M12 6A7 7 0 1 1 5.94 9.5" fill="none" stroke="currentColor" stroke-width="2"/><path class="ah" d="M12.4 2.4V9.6L7.6 6z"/><text x="12" y="16.4" text-anchor="middle">5</text></svg>',
    fwd5: '<svg viewBox="0 0 24 24"><g transform="matrix(-1 0 0 1 24 0)"><path class="arc" d="M12 6A7 7 0 1 1 5.94 9.5" fill="none" stroke="currentColor" stroke-width="2"/><path class="ah" d="M12.4 2.4V9.6L7.6 6z"/></g><text x="12" y="16.4" text-anchor="middle">5</text></svg>'
  };

  /* ================= 1. Ko'rinish: mavzu, harf, qator oralig'i ================= */
  var theme = get(K.theme) || "";
  function applyTheme() {
    if (theme === "dark" || theme === "light") { root.setAttribute("data-theme", theme); root.style.colorScheme = theme; }
    else { root.removeAttribute("data-theme"); root.style.colorScheme = ""; }
  }
  applyTheme();

  var zoom = parseFloat(get(K.zoom)) || 1;
  function applyZoom() { root.style.setProperty("--fk-zoom", zoom.toFixed(2)); }
  applyZoom();

  /* Qator oralig'i: har elementning O'Z nisbati (line-height ÷ font-size) topiladi va
     shu nisbat ko'paytiriladi — kitobning uslubi buzilmaydi, harakatlar bir-biriga tegmaydi. */
  var LEADS = [0.94, 1, 1.18], LEAD_NAMES = ["Ixcham", "Oddiy", "Keng"];
  var LEAD_SEL = "p, li, td, th, dd, dt, figcaption, blockquote, .ar, .lt";
  var lead = parseFloat(get(K.lead)) || 1, leadEls = null;
  function applyLead() {
    root.style.setProperty("--fk-lead", lead.toFixed(2));
    if (lead === 1 && !leadEls) return;
    if (!leadEls) {
      leadEls = [];
      var all = document.querySelectorAll(LEAD_SEL);
      for (var i = 0; i < all.length; i++) {            // avval faqat O'QILADI — bitta hisob-kitob
        var st = getComputedStyle(all[i]), lh = parseFloat(st.lineHeight), fs = parseFloat(st.fontSize);
        if (!lh || !fs) continue;                       // "normal" — tegilmaydi
        leadEls.push([all[i], lh / fs]);
      }
    }
    for (var j = 0; j < leadEls.length; j++) leadEls[j][0].style.lineHeight = (leadEls[j][1] * lead).toFixed(3);
  }

  /* ================= 2. Mundarija ================= */
  function arabicOf(sec) {
    if (!sec) return "";
    var h = sec.querySelector("h2.dars-head, .dars-head, h2, h3");
    if (!h) return "";
    var c = h.cloneNode(true), junk = c.querySelectorAll(".nrm, .aud, .dn, .dars-no, input, script, svg");
    for (var i = 0; i < junk.length; i++) junk[i].parentNode.removeChild(junk[i]);
    var runs = clean(c.textContent).match(/[؀-ۿ][؀-ۿـ-ٟ\s]*/g);
    if (!runs) return "";
    runs.sort(function (a, b) { return b.length - a.length; });
    return clean(runs[0]).slice(0, 36);
  }
  function tocItems() {
    var links = document.querySelectorAll(".topnav a[href^='#'], .bc-list a[href^='#'], .cv-toc a[href^='#']");
    var out = [], seen = {};
    for (var i = 0; i < links.length; i++) {
      var a = links[i], id = a.getAttribute("href").slice(1), host = id && document.getElementById(id);
      if (!id || seen[id] || !host) continue;
      seen[id] = 1;
      var ar = a.querySelector(".bc-la, .t-ar, .ct-ar");
      var uz = a.querySelector(".bc-lu, .ct-uz");
      var num = a.querySelector(".bc-ln");
      var sec = host.tagName === "SECTION" ? host : (host.closest ? host.closest("section") : null) || host;
      var au = sec.querySelectorAll ? sec.querySelectorAll(".au[data-dur]") : [];
      var dur = 0;
      for (var k = 0; k < au.length; k++) dur += parseFloat(au[k].getAttribute("data-dur")) || 0;
      out.push({
        id: id, el: host, sec: sec,
        uz: clean((uz ? uz.textContent : a.textContent)),
        ar: ar ? clean(ar.textContent) : arabicOf(sec),
        num: num ? clean(num.textContent) : String(out.length + 1),
        n: au.length, dur: dur
      });
    }
    return out;
  }
  var toc = tocItems(), tocById = {};
  for (var ti = 0; ti < toc.length; ti++) tocById[toc[ti].id] = toc[ti];

  function top(id) { var e = document.getElementById(id); return e ? e.getBoundingClientRect().top + window.scrollY : null; }
  function spanOf(i) {
    var a = top(toc[i].id);
    var b = i + 1 < toc.length ? top(toc[i + 1].id) : document.documentElement.scrollHeight;
    return [a, b];
  }
  function current() {
    var y = window.scrollY + 90, best = null;
    for (var i = 0; i < toc.length; i++) { var t = top(toc[i].id); if (t !== null && t <= y) best = i; }
    return best === null ? null : toc[best];
  }

  /* ================= 3. O'qilgan joy va o'qilgan darslar ================= */
  var readMap = jget(K.read) || {};
  if (!readMap.d) readMap.d = {};

  function anchorPos() {
    var y = window.scrollY, idx = -1;
    for (var i = 0; i < toc.length; i++) { var t = top(toc[i].id); if (t !== null && t <= y + 1) idx = i; }
    if (idx < 0) return { frac: y / Math.max(1, document.documentElement.scrollHeight) };
    var s = spanOf(idx);
    return { id: toc[idx].id, frac: Math.max(0, Math.min(1, (y - s[0]) / Math.max(1, s[1] - s[0]))) };
  }
  function anchorY(p) {
    if (!p.id) return p.frac * document.documentElement.scrollHeight;
    for (var i = 0; i < toc.length; i++) if (toc[i].id === p.id) { var s = spanOf(i); return s[0] + p.frac * (s[1] - s[0]); }
    return null;
  }
  function trackRead() {
    var bottom = window.scrollY + window.innerHeight, sum = 0, done = 0;
    for (var i = 0; i < toc.length; i++) {
      var s = spanOf(i);
      if (s[0] === null) continue;
      var p = Math.round(100 * Math.max(0, Math.min(1, (bottom - s[0]) / Math.max(1, s[1] - s[0]))));
      if (p > (readMap.d[toc[i].id] || 0)) readMap.d[toc[i].id] = p;
      var v = Math.min(100, readMap.d[toc[i].id] || 0);
      sum += v; if (v >= 92) done++;
    }
    readMap.n = toc.length;
    readMap.done = done;
    readMap.pct = toc.length ? Math.round(sum / toc.length) : 0;
    set(K.read, JSON.stringify(readMap));
  }
  function pageProgress() {
    var h = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return Math.round(100 * Math.min(1, Math.max(0, window.scrollY / h)));
  }
  var saveTimer;
  function savePos() {
    var c = current(), ap = anchorPos();
    set(K.pos, JSON.stringify({
      aid: ap.id || "", frac: ap.frac, pct: pageProgress(),
      id: c ? c.id : "", label: c ? c.uz : "", at: Date.now()
    }));
    trackRead();
  }
  window.addEventListener("scroll", function () {
    if (prog) prog.style.width = pageProgress() + "%";
    clearTimeout(saveTimer); saveTimer = setTimeout(savePos, 400);
  }, { passive: true });

  function restore() {
    if (location.hash) return;
    var p = jget(K.pos);
    if (!p || !p.pct) return;
    var y = anchorY({ id: p.aid, frac: p.frac || 0 });
    if (y !== null && y > 200) window.scrollTo(0, y);
  }
  function afterFonts(fn) {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(fn, 50); });
    else setTimeout(fn, 300);
  }
  afterFonts(function () { applyLead(); restore(); if (prog) prog.style.width = pageProgress() + "%"; });

  /* ================= 4. Pastki panel ================= */
  var hasAudio = !!document.querySelector(".au[data-dur]");
  /* «Kutubxona» kitob turgan bo'limga qaytaradi (kutubxona ikki bosqichli) */
  function homeHash() {
    var k = root.getAttribute("data-kind");
    return k === "asl" ? "#madina" : k === "qoida" ? "#qoida" : k === "daftar" ? "#daftar" : "";
  }
  var bar = node("nav", "fk-bar");
  bar.setAttribute("aria-label", "O‘quvchi paneli");
  bar.innerHTML =
    '<i class="fk-prog" data-fk></i>' +
    '<a class="fk-home" href="../index.html' + homeHash() + '">' + ic.home + "<span>Kutubxona</span></a>" +
    '<button class="fk-toc" type="button">' + ic.list + "<span>Mundarija</span></button>" +
    '<button class="fk-view" type="button"><b>Aa</b><span>Ko‘rinish</span></button>' +
    (hasAudio ? '<a class="fk-nrm" href="../normativ.html?kitob=' + esc(slug) + '">' + ic.wave + "<span>Normativ</span></a>" : "");
  document.body.appendChild(bar);
  var prog = bar.querySelector(".fk-prog");

  /* ================= 5. Varaq (mundarija / ko'rinish) ================= */
  var dim = node("div", "fk-dim"), sheet = node("div", "fk-sheet");
  dim.hidden = true; sheet.hidden = true;
  document.body.appendChild(dim); document.body.appendChild(sheet);
  var closeTimer;
  function openSheet(html, after) {
    clearTimeout(closeTimer);
    sheet.innerHTML = html;
    dim.hidden = false; sheet.hidden = false;
    requestAnimationFrame(function () { dim.classList.add("in"); sheet.classList.add("in"); });
    if (after) after();
  }
  function closeSheet() {
    dim.classList.remove("in"); sheet.classList.remove("in");
    closeTimer = setTimeout(function () { dim.hidden = true; sheet.hidden = true; }, 280);
  }
  dim.addEventListener("click", closeSheet);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) closeSheet(); });
  sheet.addEventListener("click", function (e) { if (e.target.closest && e.target.closest(".fk-x")) closeSheet(); });
  /* varaqni pastga surib yopish */
  sheet.addEventListener("pointerdown", function (e) {
    var h = e.target.closest && e.target.closest(".fk-grab, .fk-head");
    if (!h) return;
    var y0 = e.clientY, dy = 0;
    sheet.style.transition = "none";
    function move(ev) { dy = Math.max(0, ev.clientY - y0); sheet.style.transform = "translateY(" + dy + "px)"; }
    function up() {
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up);
      sheet.style.transition = ""; sheet.style.transform = "";
      if (dy > 70) closeSheet();
    }
    document.addEventListener("pointermove", move); document.addEventListener("pointerup", up);
  });
  function head(title, sub) {
    return '<i class="fk-grab" data-fk></i><div class="fk-head" data-fk><div><h3>' + esc(title) + "</h3>" +
      (sub ? "<p>" + esc(sub) + "</p>" : "") + '</div><button class="fk-x" type="button" aria-label="Yopish" data-fk>' + ic.close + "</button></div>";
  }

  /* ---- mundarija ---- */
  bar.querySelector(".fk-toc").addEventListener("click", function () {
    var c = current(), sub = readMap.n ? readMap.done + "/" + readMap.n + " bo‘lim o‘qildi · " + (readMap.pct || 0) + "%" : "";
    var h = head("Mundarija", sub) + '<div class="fk-body" data-fk>';
    if (!toc.length) h += '<p class="fk-empty" data-fk>Bu kitobda bo‘limlar ro‘yxati yo‘q.</p>';
    for (var i = 0; i < toc.length; i++) {
      var x = toc[i], p = Math.min(100, readMap.d[x.id] || 0), now = c && c.id === x.id;
      var state = p >= 92 ? '<span class="s" data-fk>' + ic.check + "</span>"
        : p > 3 ? '<span class="s" data-fk>' + p + "%</span>" : '<span class="s" data-fk></span>';
      h += '<a class="fk-ti' + (now ? " now" : "") + (p >= 92 ? " done" : "") + '" href="#' + esc(x.id) + '" data-fk>' +
        '<span class="n" data-fk>' + esc(x.num) + "</span>" +
        '<span class="tx" data-fk><span class="u" data-fk><span>' + esc(x.uz) + "</span>" +
        (x.ar ? "<i>" + esc(x.ar) + "</i>" : "") + "</span>" +
        (x.n ? '<span class="m" data-fk><em>' + ic.wave + x.n + " ta audio</em><em>" + fmt(x.dur) + "</em></span>" : "") +
        "</span>" + state + "</a>";
    }
    h += "</div>";
    openSheet(h, function () {
      var now = sheet.querySelector("a.now"); if (now) now.scrollIntoView({ block: "center" });
      var links = sheet.querySelectorAll("a.fk-ti");
      for (var j = 0; j < links.length; j++) links[j].addEventListener("click", closeSheet);
    });
  });

  /* ---- ko'rinish ---- */
  function seg(name, items, val) {
    var h = '<div class="fk-seg" data-fk role="group">';
    for (var i = 0; i < items.length; i++) {
      h += '<button type="button" data-' + name + '="' + esc(items[i][0]) + '"' + (String(items[i][0]) === String(val) ? ' class="on"' : "") +
        " data-fk>" + items[i][1] + "</button>";
    }
    return h + "</div>";
  }
  function setSheet() {
    var h = head("Ko‘rinish", "Mavzu, harf kattaligi va qator oralig‘i") + '<div class="fk-body" data-fk><div class="fk-set" data-fk>' +
      '<div class="fk-r" data-fk><span class="k" data-fk>Mavzu</span>' +
      seg("theme", [["", ic.auto + "Avto"], ["light", ic.sun + "Kunduz"], ["dark", ic.moon + "Tungi"]], theme) + "</div>" +
      '<div class="fk-r" data-fk><span class="k" data-fk>Harf</span><div class="fk-step" data-fk>' +
      '<button type="button" data-z="-1" aria-label="Kichikroq" data-fk>A−</button>' +
      '<span class="v" data-fk id="fk-zv">' + Math.round(zoom * 100) + "%</span>" +
      '<button type="button" data-z="1" aria-label="Kattaroq" data-fk>A+</button></div></div>' +
      '<div class="fk-r" data-fk><span class="k" data-fk>Qator</span>' +
      seg("lead", [[LEADS[0], LEAD_NAMES[0]], [LEADS[1], LEAD_NAMES[1]], [LEADS[2], LEAD_NAMES[2]]], lead) + "</div>" +
      '<div class="fk-prev" data-fk>هٰذا بَيْتٌ. ذٰلِكَ مَسْجِدٌ.</div>' +
      '<button class="fk-reset" type="button" data-fk>Standart holatga qaytarish</button>' +
      "</div></div>";
    openSheet(h);
  }
  /* sozlamalar tugmalari — bitta marta ulanadi (varaq ichi har safar qayta chiziladi) */
  sheet.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button") : null;
    if (!b) return;
    var i, list;
    if (b.hasAttribute("data-theme")) {
      theme = b.getAttribute("data-theme"); set(K.theme, theme); applyTheme();
      list = sheet.querySelectorAll("[data-theme]");
      for (i = 0; i < list.length; i++) list[i].classList.toggle("on", list[i].getAttribute("data-theme") === theme);
    } else if (b.hasAttribute("data-z")) {
      zoom = Math.min(1.6, Math.max(0.8, Math.round((zoom + (+b.getAttribute("data-z")) * 0.1) * 100) / 100));
      set(K.zoom, zoom); applyZoom();
      var zv = sheet.querySelector("#fk-zv"); if (zv) zv.textContent = Math.round(zoom * 100) + "%";
    } else if (b.hasAttribute("data-lead")) {
      lead = parseFloat(b.getAttribute("data-lead")); set(K.lead, lead); applyLead();
      list = sheet.querySelectorAll("[data-lead]");
      for (i = 0; i < list.length; i++) list[i].classList.toggle("on", parseFloat(list[i].getAttribute("data-lead")) === lead);
    } else if (b.classList.contains("fk-reset")) {
      theme = ""; zoom = 1; lead = 1;
      set(K.theme, theme); set(K.zoom, zoom); set(K.lead, lead);
      applyTheme(); applyZoom(); applyLead();
      setSheet();
    }
  });
  bar.querySelector(".fk-view").addEventListener("click", setSheet);

  /* ================= 6. Audio pleyer (kitobning .au tugmalari ustidan) ================= */
  if (hasAudio) (function () {
    var RATES = [0.75, 1, 1.25, 1.5];
    var A = { el: null, btn: null, host: null, pending: null, loop: false, chain: false, rate: parseFloat(get(K.rate)) || 1 };

    var card = node("div", "fk-play");
    card.hidden = true;
    card.innerHTML =
      '<div class="fk-p1" data-fk>' +
        '<button class="fk-sk" type="button" data-skip="-5" aria-label="5 soniya orqaga" data-fk>' + ic.back5 + "</button>" +
        '<button class="fk-pp" type="button" aria-label="Tinglash" data-fk>' + ic.pause + "</button>" +
        '<button class="fk-sk" type="button" data-skip="5" aria-label="5 soniya oldinga" data-fk>' + ic.fwd5 + "</button>" +
        '<button class="fk-t" type="button" data-fk><b data-fk></b><span data-fk></span></button>' +
        '<button class="fk-x" type="button" aria-label="Yopish" data-fk>' + ic.close + "</button>" +
      "</div>" +
      '<div class="fk-p2" data-fk>' +
        '<span class="fk-time" data-fk>0:00</span>' +
        '<span class="fk-seek" data-fk><i data-fk><b data-fk></b></i></span>' +
        '<button class="fk-chip fk-rate" type="button" aria-label="Tezlik" data-fk>1×</button>' +
        '<button class="fk-chip fk-loop" type="button" aria-label="Takror" title="Takror" data-fk>' + ic.loop + "</button>" +
        '<button class="fk-chip fk-chain" type="button" aria-label="Ketma-ket" title="Ketma-ket" data-fk>' + ic.chain + "</button>" +
      "</div>";
    document.body.appendChild(card);
    var pp = card.querySelector(".fk-pp"), tEl = card.querySelector(".fk-t"),
        timeEl = card.querySelector(".fk-time"), seek = card.querySelector(".fk-seek"),
        fill = card.querySelector(".fk-seek b"), rateB = card.querySelector(".fk-rate"),
        loopB = card.querySelector(".fk-loop"), chainB = card.querySelector(".fk-chain");
    rateB.textContent = A.rate + "×";

    function allAu() { return Array.prototype.slice.call(document.querySelectorAll(".au[data-dur]")); }
    function hostOf(btn) { return (btn.closest && btn.closest(".has-au")) || (btn.parentNode && btn.parentNode.parentNode) || null; }
    function dur() { return A.btn ? (parseFloat(A.btn.getAttribute("data-dur")) || (A.el && isFinite(A.el.duration) ? A.el.duration : 0)) : 0; }
    function title(btn) {
      var host = hostOf(btn), ar = "";
      if (host) {
        var lt = host.querySelector(".lt") || host;
        var c = lt.cloneNode(true), junk = c.querySelectorAll(".nrm, .aud, input, svg");
        for (var i = 0; i < junk.length; i++) junk[i].parentNode.removeChild(junk[i]);
        ar = clean(c.textContent).slice(0, 40);
      }
      var sec = btn.closest ? btn.closest("section[id]") : null;
      var item = sec && tocById[sec.id];
      return { ar: ar, sec: item ? item.uz : "" };
    }
    function paint() {
      var d = dur(), t = (A.el && A.el.currentTime) || 0;
      timeEl.textContent = fmt(t) + " / " + fmt(d);
      fill.style.width = (d ? Math.min(100, (t / d) * 100) : 0) + "%";
      pp.innerHTML = A.el && !A.el.paused ? ic.pause : ic.play;
    }
    function mark(on) {
      if (A.host) A.host.classList.remove("fk-nowplay");
      A.host = on ? hostOf(A.btn) : null;
      if (A.host) A.host.classList.add("fk-nowplay");
    }
    function show() {
      var lab = title(A.btn);
      tEl.querySelector("b").innerHTML = lab.ar ? "<i data-fk>" + esc(lab.ar) + "</i>" : "Ustoz o‘qishi";
      tEl.querySelector("span").textContent = (lab.sec ? lab.sec + " · " : "") + "ustoz o‘qishi";
      card.hidden = false;
      requestAnimationFrame(function () {
        card.classList.add("in");
        root.style.setProperty("--fk-player", (card.offsetHeight + 8) + "px");
      });
      mark(true); paint();
    }
    function hide() {
      card.classList.remove("in");
      root.style.setProperty("--fk-player", "0px");
      setTimeout(function () { if (!card.classList.contains("in")) card.hidden = true; }, 280);
      mark(false); A.btn = null;
    }

    /* kitobning pleyeri `new Audio()` bilan yaratiladi — qobiq o'sha elementga ulanadi */
    var Native = window.Audio;
    if (Native) {
      var Hooked = function (src) {
        var a = arguments.length ? new Native(src) : new Native();
        a.addEventListener("play", function () {
          if (A.pending) { A.btn = A.pending; A.el = a; a.playbackRate = A.rate; a.loop = A.loop; show(); }
          if (a === A.el) paint();
        });
        a.addEventListener("pause", function () { if (a === A.el) paint(); });
        a.addEventListener("timeupdate", function () { if (a === A.el) paint(); });
        a.addEventListener("ended", function () {
          if (a !== A.el) return;
          if (A.chain) {
            var list = allAu(), i = list.indexOf(A.btn), nx = i >= 0 ? list[i + 1] : null;
            if (nx) {
              // Kitobning o'z «ended» ishlovchisi ham shu yerda — u tugmani tozalab bo'lgach
              // keyingisini boshlaymiz (aks holda yangi tugma darrov o'chib qoladi).
              setTimeout(function () {
                A.pending = nx; nx.click();
                var h = hostOf(nx); if (h && h.scrollIntoView) h.scrollIntoView({ block: "center", behavior: "smooth" });
              }, 0);
              return;
            }
          }
          hide();
        });
        return a;
      };
      Hooked.prototype = Native.prototype;
      window.Audio = Hooked;
    }

    /* kitobdagi tugma bosilishi (qobiqning o'z tugmalari hisobga olinmaydi) */
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t || !t.closest || t.closest("[data-fk]")) return;
      var b = t.closest(".au[data-dur]");
      if (b) { A.pending = b; return; }
      if (t.closest(".sb")) return;
      if (t.closest(".dl, .mh-player")) A.pending = null;   // so'zlashuv pleyeri — qobiq aralashmaydi
    }, true);

    pp.addEventListener("click", function () {
      if (!A.el) return;
      if (A.el.paused) A.el.play().catch(function () {}); else A.el.pause();
    });
    card.addEventListener("click", function (e) {
      var sk = e.target.closest ? e.target.closest(".fk-sk") : null;
      if (sk && A.el) {
        var d = dur(), t = (A.el.currentTime || 0) + (+sk.getAttribute("data-skip"));
        A.el.currentTime = Math.max(0, d ? Math.min(d, t) : Math.max(0, t));
        paint();
      } else if (e.target.closest && e.target.closest(".fk-x")) {
        if (A.el) A.el.pause();
        hide();
      } else if (e.target.closest && e.target.closest(".fk-t")) {
        var h = A.host || (A.btn && hostOf(A.btn));
        if (h && h.scrollIntoView) h.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    });
    rateB.addEventListener("click", function () {
      A.rate = RATES[(RATES.indexOf(A.rate) + 1) % RATES.length];
      set(K.rate, A.rate); rateB.textContent = A.rate + "×";
      if (A.el) A.el.playbackRate = A.rate;
    });
    loopB.addEventListener("click", function () {
      A.loop = !A.loop; loopB.classList.toggle("on", A.loop);
      if (A.loop) { A.chain = false; chainB.classList.remove("on"); }
      if (A.el) A.el.loop = A.loop;
    });
    chainB.addEventListener("click", function () {
      A.chain = !A.chain; chainB.classList.toggle("on", A.chain);
      if (A.chain && A.loop) { A.loop = false; loopB.classList.remove("on"); if (A.el) A.el.loop = false; }
    });

    /* vaqt chizig'ini surish */
    function seekTo(x) {
      if (!A.el) return;
      var r = seek.getBoundingClientRect(), d = dur();
      if (!d || !r.width) return;
      A.el.currentTime = Math.max(0, Math.min(d, ((x - r.left) / r.width) * d));
      paint();
    }
    seek.addEventListener("pointerdown", function (e) {
      seekTo(e.clientX);
      function move(ev) { seekTo(ev.clientX); }
      function up() { document.removeEventListener("pointermove", move); document.removeEventListener("pointerup", up); }
      document.addEventListener("pointermove", move); document.addEventListener("pointerup", up);
    });
  })();
})();
