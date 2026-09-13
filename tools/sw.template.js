/* Firdavs kitoblari — oflayn xizmatchi. tools/build.js hosil qiladi, qo'lda tahrirlanmaydi. */
const VERSION = "__VERSION__";
const BUILT = "__BUILT__";
const CACHE = "firdavs-" + VERSION;
const FILES = __FILES__;                 // [yo'l, fayl xeshi] — xesh o'zgarmagan fayl eski keshdan olinadi, qayta yuklanmaydi
const MANIFEST = "./__manifest__.json";  // keshdagi yo'l → xesh ro'yxati (serverda bunday fayl yo'q)

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    let old = null, oldMan = {};
    for (const k of await caches.keys()) {
      if (k === CACHE || !k.startsWith("firdavs-")) continue;
      const oc = await caches.open(k);
      const m = await oc.match(MANIFEST);
      if (m) { old = oc; oldMan = await m.json(); break; }
    }
    // bittalab: bitta fayl yuklanmasa, qolganlari baribir keshlansin
    await Promise.all(FILES.map(async ([f, h]) => {
      try {
        if (old && oldMan[f] === h) {
          const r = await old.match(f, { ignoreSearch: true });
          if (r) { await c.put(f, r); return; }
        }
        await c.add(f);
      } catch (err) {}
    }));
    const man = {};
    for (const [f, h] of FILES) man[f] = h;
    await c.put(MANIFEST, new Response(JSON.stringify(man), { headers: { "Content-Type": "application/json" } }));
  })());
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
  else if (e.data === "VERSION" && e.ports && e.ports[0]) e.ports[0].postMessage({ version: VERSION, built: BUILT });
});

async function cacheFirst(req) {
  const cached = await caches.match(req, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(req);
  if (res.redirected) return Response.redirect(res.url, 302);
  if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
  return res;
}

// sahifalar: avval tarmoq (yangilanish darrov ko'rinsin), 4 s javob bo'lmasa — kesh
async function networkFirst(req) {
  const cached = caches.match(req, { ignoreSearch: true });
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 4000))
    ]);
    if (res.redirected) return Response.redirect(res.url, 302);
    if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
    return res;
  } catch (err) {
    return (await cached) || Response.error();
  }
}

// audio: keshdagi to'liq fayldan Range (206) javob yasaladi — Safari/Chrome pleyeri shuni kutadi;
// tarmoqdan kelgan qisman (206) javob keshlanmaydi
async function audio(req) {
  const url = req.url.split("?")[0];
  const cached = await caches.match(url);
  const rh = req.headers.get("range");
  if (cached) {
    if (!rh) return cached;
    const buf = await cached.arrayBuffer();
    const total = buf.byteLength;
    const m = /bytes=(\d*)-(\d*)/.exec(rh) || [];
    let a = m[1] ? +m[1] : (m[2] ? Math.max(0, total - +m[2]) : 0);
    let b = m[1] && m[2] ? +m[2] : total - 1;
    if (a >= total) return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + total } });
    b = Math.min(b, total - 1);
    return new Response(buf.slice(a, b + 1), { status: 206, headers: {
      "Content-Type": cached.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": "bytes " + a + "-" + b + "/" + total,
      "Content-Length": String(b - a + 1), "Accept-Ranges": "bytes" } });
  }
  const res = await fetch(req);
  if (res.status === 200 && !rh) (await caches.open(CACHE)).put(url, res.clone());
  return res;
}

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== "GET") return;
  if (e.request.cache === "no-store") return;   // version.json kabi «doim jonli» so'rovlar keshlanmaydi
  if (/\/audio\/.+\.mp3$/.test(url.pathname)) { e.respondWith(audio(e.request)); return; }
  // ro'yxatlar (kitoblar, audio indeksi): avval tarmoq — yangi kitob/audio darrov ko'rinsin, oflayn bo'lsa kesh
  if (/\/(app\/books\.json|audio\/[^/]+\/index\.json)$/.test(url.pathname)) { e.respondWith(networkFirst(e.request)); return; }
  e.respondWith(e.request.mode === "navigate" ? networkFirst(e.request) : cacheFirst(e.request));
});
