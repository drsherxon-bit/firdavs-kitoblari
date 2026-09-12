#!/usr/bin/env node
// Firdavs kitoblari — qurish skripti.
//   src/<slug>.html  (artifactdan olingan nusxa, o'zgartirilmaydi)
//     → kitob/<slug>.html (shriftlar lokal, o'quvchi paneli ulangan)
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

  fs.writeFileSync(path.join(OUT, b.slug + ".html"), html);
  console.log("→ kitob/" + b.slug + ".html  " + (html.length / 1024).toFixed(0) + " KB");
}

// 4. Service worker: keshlanadigan fayllar ro'yxati + versiya
const list = ["./", "./manifest.webmanifest"];
const walk = (dir, pre) => {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, pre + f + "/");
    else list.push("./" + pre + f);
  }
};
for (const d of ["app", "fonts", "icons", "kitob"]) walk(path.join(ROOT, d), d + "/");

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
console.log("sw.js  versiya " + ver + "  (" + files.length + " fayl)");
