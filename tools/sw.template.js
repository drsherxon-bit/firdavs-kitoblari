/* Firdavs kitoblari — oflayn xizmatchi. tools/build.js hosil qiladi, qo'lda tahrirlanmaydi. */
const VERSION = "__VERSION__";
const CACHE = "firdavs-" + VERSION;
const FILES = __FILES__;

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // bittalab: bitta fayl yuklanmasa, qolganlari baribir keshlansin
    await Promise.all(FILES.map((f) => c.add(f).catch(() => null)));
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

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== "GET") return;
  e.respondWith(e.request.mode === "navigate" ? networkFirst(e.request) : cacheFirst(e.request));
});
