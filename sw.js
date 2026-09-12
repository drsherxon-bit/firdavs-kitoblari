/* Firdavs kitoblari — oflayn xizmatchi. tools/build.js hosil qiladi, qo'lda tahrirlanmaydi. */
const VERSION = "d74b0e4e8d";
const CACHE = "firdavs-" + VERSION;
const FILES = [
 "./",
 "./manifest.webmanifest",
 "./app/books.json",
 "./app/reader.css",
 "./app/reader.js",
 "./fonts/amiri-J7acnpd8CGxBHp2VkaY6zp5yGw.woff2",
 "./fonts/amiri-J7acnpd8CGxBHp2VkaYxzp5yGw.woff2",
 "./fonts/amiri-J7acnpd8CGxBHp2VkaY_zp4.woff2",
 "./fonts/amiri-J7afnpd8CGxBHpUrhL8Y66NL.woff2",
 "./fonts/amiri-J7afnpd8CGxBHpUrhLEY6w.woff2",
 "./fonts/amiri-J7afnpd8CGxBHpUrhLQY66NL.woff2",
 "./fonts/amiri-J7aRnpd8CGxBHpUgtLMA7w.woff2",
 "./fonts/amiri-J7aRnpd8CGxBHpUrtLMA7w.woff2",
 "./fonts/amiri-J7aRnpd8CGxBHpUutLM.woff2",
 "./fonts/fonts.css",
 "./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_3WTFCW.woff2",
 "./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_7WTFCW.woff2",
 "./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_HWTA.woff2",
 "./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_LWTFCW.woff2",
 "./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_XWTFCW.woff2",
 "./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_zWTFCW.woff2",
 "./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J__WTFCW.woff2",
 "./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5a5ClqOw.woff2",
 "./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5b5ClqOw.woff2",
 "./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5Q5ClqOw.woff2",
 "./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5U5Ck.woff2",
 "./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5X5ClqOw.woff2",
 "./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5Y5ClqOw.woff2",
 "./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5Z5ClqOw.woff2",
 "./fonts/scheherazadenew-4UaerFhTvxVnHDvUkUiHg8jprP4DM79DLl8I-bKn.woff2",
 "./fonts/scheherazadenew-4UaerFhTvxVnHDvUkUiHg8jprP4DM79DLlEI-Q.woff2",
 "./fonts/scheherazadenew-4UaerFhTvxVnHDvUkUiHg8jprP4DM79DLlQI-bKn.woff2",
 "./fonts/scheherazadenew-4UaZrFhTvxVnHDvUkUiHg8jprP4DOwFmO24p.woff2",
 "./fonts/scheherazadenew-4UaZrFhTvxVnHDvUkUiHg8jprP4DOwpmO24p.woff2",
 "./fonts/scheherazadenew-4UaZrFhTvxVnHDvUkUiHg8jprP4DOwRmOw.woff2",
 "./icons/icon-192.png",
 "./icons/icon-512-maskable.png",
 "./icons/icon-512.png",
 "./icons/icon.svg",
 "./kitob/daftar-1.html",
 "./kitob/daftar-2.html",
 "./kitob/daftar-3.html",
 "./kitob/madina-1.html",
 "./kitob/madina-2.html",
 "./kitob/madina-3.html",
 "./kitob/madina-4.html",
 "./kitob/qoida-1.html",
 "./kitob/qoida-2.html",
 "./kitob/qoida-3.html"
];

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
