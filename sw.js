/* Firdavs kitoblari — oflayn xizmatchi. tools/build.js hosil qiladi, qo'lda tahrirlanmaydi. */
const VERSION = "76ce135cab";
const BUILT = "2026-09-12T23:28:12.509Z";
const CACHE = "firdavs-" + VERSION;
const FILES = [
 ["./","9d333cf4f594"],
 ["./manifest.webmanifest","e0655c87f0a2"],
 ["./app/books.json","962d4ea50ec4"],
 ["./app/reader.css","a7a8abeb8493"],
 ["./app/reader.js","c08b19fd0f8d"],
 ["./fonts/amiri-J7acnpd8CGxBHp2VkaY6zp5yGw.woff2","d4fcd1fe15ba"],
 ["./fonts/amiri-J7acnpd8CGxBHp2VkaYxzp5yGw.woff2","4fde6b58bbe5"],
 ["./fonts/amiri-J7acnpd8CGxBHp2VkaY_zp4.woff2","a73a7c3b018c"],
 ["./fonts/amiri-J7afnpd8CGxBHpUrhL8Y66NL.woff2","e57440e6ee0c"],
 ["./fonts/amiri-J7afnpd8CGxBHpUrhLEY6w.woff2","66b8c448db10"],
 ["./fonts/amiri-J7afnpd8CGxBHpUrhLQY66NL.woff2","a5bfdef4ce1c"],
 ["./fonts/amiri-J7aRnpd8CGxBHpUgtLMA7w.woff2","b53ce82485a1"],
 ["./fonts/amiri-J7aRnpd8CGxBHpUrtLMA7w.woff2","2dfffa914688"],
 ["./fonts/amiri-J7aRnpd8CGxBHpUutLM.woff2","40bf01157d3e"],
 ["./fonts/fonts.css","d3b468a8388b"],
 ["./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_3WTFCW.woff2","663764f6c5c8"],
 ["./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_7WTFCW.woff2","9222063f410d"],
 ["./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_HWTA.woff2","a7ad7aeaa1bd"],
 ["./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_LWTFCW.woff2","17c83bd550be"],
 ["./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_XWTFCW.woff2","237a911d5637"],
 ["./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J_zWTFCW.woff2","df17e9c22589"],
 ["./fonts/literata-or3PQ6P12-iJxAIgLa78DkTtAoDhk0oVpaK3YLanFLHpPf2TbLi4J__WTFCW.woff2","03de303d59d9"],
 ["./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5a5ClqOw.woff2","1e642b4d25b4"],
 ["./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5b5ClqOw.woff2","c0cf10b09be6"],
 ["./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5Q5ClqOw.woff2","df2632640662"],
 ["./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5U5Ck.woff2","567bcd5ea062"],
 ["./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5X5ClqOw.woff2","a88cea3647ae"],
 ["./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5Y5ClqOw.woff2","bc793f5b28e8"],
 ["./fonts/literata-or3yQ6P12-iJxAIgLYT1PLs1a-t7PU0AbeE9KK5Z5ClqOw.woff2","0c27ce0e8fa4"],
 ["./fonts/scheherazadenew-4UaerFhTvxVnHDvUkUiHg8jprP4DM79DLl8I-bKn.woff2","c04cfd8fd88c"],
 ["./fonts/scheherazadenew-4UaerFhTvxVnHDvUkUiHg8jprP4DM79DLlEI-Q.woff2","35c3462af426"],
 ["./fonts/scheherazadenew-4UaerFhTvxVnHDvUkUiHg8jprP4DM79DLlQI-bKn.woff2","f5d688e9ff3c"],
 ["./fonts/scheherazadenew-4UaZrFhTvxVnHDvUkUiHg8jprP4DOwFmO24p.woff2","78261fcfa7b5"],
 ["./fonts/scheherazadenew-4UaZrFhTvxVnHDvUkUiHg8jprP4DOwpmO24p.woff2","1c9f62381754"],
 ["./fonts/scheherazadenew-4UaZrFhTvxVnHDvUkUiHg8jprP4DOwRmOw.woff2","b236f789cfda"],
 ["./icons/icon-192.png","ecab971340f0"],
 ["./icons/icon-512-maskable.png","4d4e72ccd7b5"],
 ["./icons/icon-512.png","c5dce9cf44df"],
 ["./icons/icon.svg","c36ddaa56ae4"],
 ["./kitob/daftar-1.html","7e0127d2307c"],
 ["./kitob/daftar-2.html","f9222722e4e8"],
 ["./kitob/daftar-3.html","7ebb99ef974e"],
 ["./kitob/madina-1.html","f00ca021e9c9"],
 ["./kitob/madina-2.html","f43154148816"],
 ["./kitob/madina-3.html","987a95d7b728"],
 ["./kitob/madina-4.html","7355dc3e8462"],
 ["./kitob/qoida-1.html","24d582504a94"],
 ["./kitob/qoida-2.html","b8ff27a64a2a"],
 ["./kitob/qoida-3.html","50e260abe1bb"]
];                 // [yo'l, fayl xeshi] — xesh o'zgarmagan fayl eski keshdan olinadi, qayta yuklanmaydi
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

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin || e.request.method !== "GET") return;
  if (e.request.cache === "no-store") return;   // version.json kabi «doim jonli» so'rovlar keshlanmaydi
  e.respondWith(e.request.mode === "navigate" ? networkFirst(e.request) : cacheFirst(e.request));
});
