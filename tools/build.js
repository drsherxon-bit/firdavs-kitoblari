#!/usr/bin/env node
// Firdavs kitoblari — qurish skripti.
//   src/<slug>.html  (artifactdan olingan nusxa, o'zgartirilmaydi)
//     → kitob/<slug>.html (shriftlar lokal, o'quvchi paneli ulangan, audio yo'li ../audio/)
//   audio/<id>/N.mp3 (kitobdagi ustoz audiolari) → audio/<id>/index.json (Normativlar sahifasi ro'yxati)
//   + sw.js (oflayn keshi ro'yxati, versiya = fayllar xeshi)
//
//   node tools/build.js            hammasini quradi
//   node tools/build.js qoida-1    faqat bitta kitobni
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(ROOT, "kitob");
const BOOKS = require("../app/books.json");

const only = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

// ---- kitobdagi audio ro'yxati (Normativlar sahifasi uchun) ----
const clean = (s) => s.replace(/<[^>]+>/g, " ").replace(/&middot;/g, "·").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/\s+/g, " ").trim();
function audioIndex(html, b) {
  const items = [];
  const secRe = /<section class="dars" id="dars-(\d+)">([\s\S]*?)<\/section>/g;
  let m;
  while ((m = secRe.exec(html))) {
    const dars = +m[1], body = m[2];
    const h2 = /<h2 class="dars-head[^"]*">([\s\S]*?)<\/h2>/.exec(body);
    const darsTitle = h2 ? clean(h2[1].split('<span class="nrm">')[0]) : "";
    const audRe = /<span class="aud[^"]*">[\s\S]*?data-au="(\d+)" data-dur="(\d+)"/g;
    let a;
    while ((a = audRe.exec(body))) {
      const before = body.slice(0, a.index);
      // eng yaqin ega element: sarlavha/band yoki sarlavhasiz matn qatori
      const hostRe = /<(h2|div|p) class="(dars-head|topic|tamrin|lead|part|nrm-row)[^"]*"[^>]*>/g;
      let host = null, hm;
      while ((hm = hostRe.exec(before))) host = { tag: hm[1], cls: hm[2], end: hm.index + hm[0].length };
      const seg = host ? before.slice(host.end) : "";
      const title = host && host.cls !== "nrm-row" && host.cls !== "dars-head" ? clean(seg.split('<span class="nrm">')[0]) : "";
      const nrm = (/<\/svg>(\d+:\d\d)<\/span>/.exec(seg) || [])[1] || "";
      // keyingi matnning boshi (sarlavhasiz matn va «(أ)» kabi qisqa sarlavhalar uchun)
      const AUD = /<span class="aud[^"]*">[\s\S]*?<span class="ad">[^<]*<\/span><\/button><\/span>/g;
      const after = body.slice(a.index).replace(AUD, " ");
      const snippet = clean(after.replace(/<span class="nrm">[\s\S]*?<\/span><\/span>/g, " ")
        .replace(/<h2[\s\S]*?<\/h2>/g, " ")).split(" ").slice(0, 7).join(" ");
      items.push({ n: +a[1], dars, darsTitle, kind: host && host.cls === "lead" ? "mashq" : "matn",
                   title: title || "Dars matni", snippet, nrm, dur: +a[2], file: "audio/" + b.audio + "/" + a[1] + ".mp3" });
    }
  }
  items.sort((x, y) => x.n - y.n);
  return { slug: b.slug, uz: b.uz, ar: b.ar, items };
}

for (const b of BOOKS) {
  if (only && b.slug !== only) continue;
  const inFile = path.join(SRC, b.slug + ".html");
  if (!fs.existsSync(inFile)) { console.warn("yo'q: " + inFile); continue; }
  let html = fs.readFileSync(inFile, "utf8");

  // 1. Google Fonts → lokal shriftlar
  html = html.replace(/<link[^>]*fonts\.g(oogleapis|static)\.com[^>]*>\s*/g, "");
  html = html.replace(/<title>/, '<link rel="stylesheet" href="../fonts/fonts.css">\n<title>');

  // 2. <html> ga kitob belgisi
  html = html.replace(/<html>/, `<html lang="uz" data-book="${b.slug}" data-kind="${b.kind}">`);

  // 3. O'quvchi paneli (pastki panel, mavzu, harf kattaligi, o'qilgan joy)
  //    mavzu sahifa chizilishidan OLDIN qo'yiladi — tungi rejimda oq yaltirash bo'lmasin
  html = html.replace(/<body>/,
    '<body>\n<script>try{var t=localStorage.getItem("firdavs:theme");if(t){document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t;}}catch(e){}</script>');
  //    artifact nusxasida </body></html> ikki marta uchraydi — hammasi olib tashlanib, bir marta yopiladi
  html = html.replace(/<\/body>\s*<\/html>\s*/g, "").replace(/\s*$/, "\n") +
    `<link rel="stylesheet" href="../app/reader.css">\n<script defer src="../app/reader.js"></script>\n</body></html>\n`;

  // 4. Audio: artifactda audio/<id>/N.mp3 sahifa yonida; ilovada audio/ papkasi ildizda (kitob/ dan bir pog'ona yuqorida)
  if (b.audio) {
    html = html.replace('p.src = "audio/', 'p.src = "../audio/');
    const idx = audioIndex(html, b);
    const dir = path.join(ROOT, "audio", b.audio);
    fs.mkdirSync(dir, { recursive: true });
    const missing = idx.items.filter((it) => !fs.existsSync(path.join(ROOT, it.file)));
    if (missing.length) console.warn("  audio fayli yo'q: " + missing.map((it) => it.file).join(", "));
    fs.writeFileSync(path.join(dir, "index.json"), JSON.stringify(idx, null, 1));
    console.log("  audio/" + b.audio + "/index.json  " + idx.items.length + " ta audio");
  }

  fs.writeFileSync(path.join(OUT, b.slug + ".html"), html);
  console.log("→ kitob/" + b.slug + ".html  " + (html.length / 1024).toFixed(0) + " KB");
}

// 5. Service worker: keshlanadigan fayllar ro'yxati + versiya
const list = ["./", "./manifest.webmanifest", "./normativ.html"];
const walk = (dir, pre) => {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, pre + f + "/");
    else list.push("./" + pre + f);
  }
};
for (const d of ["app", "fonts", "icons", "kitob", "audio"]) walk(path.join(ROOT, d), d + "/");

const sha = (buf) => crypto.createHash("sha1").update(buf).digest("hex");
const h = crypto.createHash("sha1");
h.update(fs.readFileSync(path.join(ROOT, "index.html")));
// har fayl uchun alohida xesh: o'zgarmagan fayl telefonda qayta yuklanmaydi (sw.js install)
const files = [];
for (const f of list) {
  const p = f === "./" ? path.join(ROOT, "index.html") : path.join(ROOT, f);
  if (!fs.existsSync(p) || !fs.statSync(p).isFile()) continue;
  const buf = fs.readFileSync(p);
  if (f !== "./") h.update(buf);
  files.push([f, sha(buf).slice(0, 12)]);
}
const ver = h.digest("hex").slice(0, 10);
const built = new Date().toISOString();
const swTpl = fs.readFileSync(path.join(__dirname, "sw.template.js"), "utf8");
fs.writeFileSync(path.join(ROOT, "sw.js"),
  swTpl.replace("__VERSION__", ver).replace("__BUILT__", built)
       .replace("__FILES__", "[\n" + files.map((x) => " " + JSON.stringify(x)).join(",\n") + "\n]"));
fs.writeFileSync(path.join(ROOT, "version.json"), JSON.stringify({ version: ver, built: built }));
const mb = files.reduce((s, [f]) => { const p = f === "./" ? path.join(ROOT, "index.html") : path.join(ROOT, f); return s + fs.statSync(p).size; }, 0) / 1048576;
console.log("sw.js  versiya " + ver + "  (" + files.length + " fayl, " + mb.toFixed(1) + " MB)");
