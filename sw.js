/* Firdavs kitoblari — oflayn xizmatchi. tools/build.js hosil qiladi, qo'lda tahrirlanmaydi. */
const VERSION = "554408b48e";
const BUILT = "2026-09-13T18:12:46.499Z";
const CACHE = "firdavs-" + VERSION;
const FILES = [
 ["./","e67c744053d6"],
 ["./manifest.webmanifest","e0655c87f0a2"],
 ["./normativ.html","e7baefa7221c"],
 ["./app/books.json","0f4ec0c8522c"],
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
 ["./kitob/madina-1.html","d544adb40685"],
 ["./kitob/madina-2.html","6f6e06e0e28d"],
 ["./kitob/madina-3.html","987a95d7b728"],
 ["./kitob/madina-4.html","7355dc3e8462"],
 ["./kitob/qoida-1.html","24d582504a94"],
 ["./kitob/qoida-2.html","b8ff27a64a2a"],
 ["./kitob/qoida-3.html","50e260abe1bb"],
 ["./audio/m1/1.mp3","4c6ed2cc9198"],
 ["./audio/m1/10.mp3","27dbe0fd755e"],
 ["./audio/m1/11.mp3","9e995e679340"],
 ["./audio/m1/12.mp3","cc4e201de09a"],
 ["./audio/m1/13.mp3","8519569fe534"],
 ["./audio/m1/14.mp3","a41300278e10"],
 ["./audio/m1/15.mp3","26c93d65d219"],
 ["./audio/m1/16.mp3","d4b52aa82747"],
 ["./audio/m1/17.mp3","3a26dd71690b"],
 ["./audio/m1/18.mp3","f58d113d4a4e"],
 ["./audio/m1/19.mp3","e0e33c036b29"],
 ["./audio/m1/2.mp3","52015db87697"],
 ["./audio/m1/20.mp3","ffe40cc9d1f5"],
 ["./audio/m1/21.mp3","14d1308bd6c3"],
 ["./audio/m1/22.mp3","11066ee36ac7"],
 ["./audio/m1/23.mp3","7173bbe85cd3"],
 ["./audio/m1/24.mp3","3a2c494d3e44"],
 ["./audio/m1/25.mp3","73cbf172d2d4"],
 ["./audio/m1/26.mp3","bae11c024d33"],
 ["./audio/m1/27.mp3","9d964adae7d9"],
 ["./audio/m1/28.mp3","ef300a7ac787"],
 ["./audio/m1/29.mp3","3714aa4eb97b"],
 ["./audio/m1/3.mp3","ee67e0827121"],
 ["./audio/m1/30.mp3","9a28d6b7eebf"],
 ["./audio/m1/31.mp3","52c64381e7ef"],
 ["./audio/m1/32.mp3","217dc6b401d0"],
 ["./audio/m1/33.mp3","a75fbb5bf01b"],
 ["./audio/m1/34.mp3","37993997b878"],
 ["./audio/m1/35.mp3","cc42ea1eb872"],
 ["./audio/m1/36.mp3","bd68c55b4e65"],
 ["./audio/m1/37.mp3","ca5851456359"],
 ["./audio/m1/38.mp3","9cbec27e5f6d"],
 ["./audio/m1/39.mp3","549e68637709"],
 ["./audio/m1/4.mp3","d0ea8696f10f"],
 ["./audio/m1/40.mp3","294638e7264b"],
 ["./audio/m1/41.mp3","50f62e86fdb8"],
 ["./audio/m1/42.mp3","68786f5b9d6a"],
 ["./audio/m1/43.mp3","d471d5eea93d"],
 ["./audio/m1/44.mp3","41e8bccec09e"],
 ["./audio/m1/45.mp3","e88e71dfd3a0"],
 ["./audio/m1/46.mp3","f85b2cd559d9"],
 ["./audio/m1/47.mp3","8d2bc769ba9d"],
 ["./audio/m1/48.mp3","6a39af3ba817"],
 ["./audio/m1/49.mp3","d81e6b932a5d"],
 ["./audio/m1/5.mp3","75f290d84218"],
 ["./audio/m1/50.mp3","5b9295ece64c"],
 ["./audio/m1/51.mp3","132ba7936acf"],
 ["./audio/m1/52.mp3","ce6fca7287ca"],
 ["./audio/m1/53.mp3","3b60dedcfd10"],
 ["./audio/m1/54.mp3","859e913aadeb"],
 ["./audio/m1/55.mp3","519b1741e8da"],
 ["./audio/m1/56.mp3","f73c8d219834"],
 ["./audio/m1/57.mp3","977927c4cbca"],
 ["./audio/m1/58.mp3","39193bca6c18"],
 ["./audio/m1/59.mp3","745aa68ce9b6"],
 ["./audio/m1/6.mp3","24e667d2b685"],
 ["./audio/m1/60.mp3","2bef91020908"],
 ["./audio/m1/61.mp3","c1a83b59929e"],
 ["./audio/m1/62.mp3","bd38a5ff6914"],
 ["./audio/m1/7.mp3","56b9b7c26615"],
 ["./audio/m1/8.mp3","9bda5cc2a950"],
 ["./audio/m1/9.mp3","c789e1d33ea5"],
 ["./audio/m1/index.json","9f418468f736"],
 ["./audio/m2/1.mp3","c25ed928c69c"],
 ["./audio/m2/10.mp3","2691ad1a484e"],
 ["./audio/m2/11.mp3","e6e155c53ade"],
 ["./audio/m2/12.mp3","843f78145294"],
 ["./audio/m2/13.mp3","792caf9a0e96"],
 ["./audio/m2/14.mp3","2cb18c5bc15e"],
 ["./audio/m2/15.mp3","632c7905d879"],
 ["./audio/m2/16.mp3","e12917416313"],
 ["./audio/m2/17.mp3","0d98c4246c66"],
 ["./audio/m2/18.mp3","35f677401319"],
 ["./audio/m2/19.mp3","ad48f9421d7c"],
 ["./audio/m2/2.mp3","26a704649334"],
 ["./audio/m2/20.mp3","1d620200dbef"],
 ["./audio/m2/21.mp3","e2bd8e93f6c7"],
 ["./audio/m2/22.mp3","45f08b2bbc75"],
 ["./audio/m2/23.mp3","5e5d81b41ca2"],
 ["./audio/m2/24.mp3","b12c8006fc14"],
 ["./audio/m2/25.mp3","fe72146664fc"],
 ["./audio/m2/26.mp3","d8bb80c19c2a"],
 ["./audio/m2/27.mp3","3ac2586dbcce"],
 ["./audio/m2/28.mp3","25170ad66235"],
 ["./audio/m2/29.mp3","1985d2d36a84"],
 ["./audio/m2/3.mp3","9f4c480f7e76"],
 ["./audio/m2/30.mp3","5c03777ca585"],
 ["./audio/m2/31.mp3","266b6a4e0598"],
 ["./audio/m2/32.mp3","790cb9d4198f"],
 ["./audio/m2/33.mp3","ae0e52e48eaf"],
 ["./audio/m2/34.mp3","66b89657acac"],
 ["./audio/m2/35.mp3","a3e7e9f55507"],
 ["./audio/m2/36.mp3","e76b48151daa"],
 ["./audio/m2/37.mp3","78700fed2060"],
 ["./audio/m2/38.mp3","c05dcda36e5d"],
 ["./audio/m2/39.mp3","cc3f72fa47cf"],
 ["./audio/m2/4.mp3","8f52c8779ab0"],
 ["./audio/m2/40.mp3","16fc2782008e"],
 ["./audio/m2/41.mp3","37e676a8b0af"],
 ["./audio/m2/42.mp3","be3731e34ae7"],
 ["./audio/m2/43.mp3","610f15d12ae4"],
 ["./audio/m2/44.mp3","b58c6d4e0917"],
 ["./audio/m2/45.mp3","9141690fa772"],
 ["./audio/m2/46.mp3","fc740005091a"],
 ["./audio/m2/47.mp3","fbd2385d39f2"],
 ["./audio/m2/48.mp3","9e5a9c1b24a0"],
 ["./audio/m2/49.mp3","bf345fa4a5d6"],
 ["./audio/m2/5.mp3","962ec4f2ffdb"],
 ["./audio/m2/50.mp3","b71f66ccb928"],
 ["./audio/m2/51.mp3","58e9cc4600f6"],
 ["./audio/m2/52.mp3","5d826912f4a6"],
 ["./audio/m2/53.mp3","c4390e86fb56"],
 ["./audio/m2/54.mp3","cfc5ce9a88eb"],
 ["./audio/m2/55.mp3","8721703b2e13"],
 ["./audio/m2/56.mp3","0f169f199ab1"],
 ["./audio/m2/57.mp3","c4c48b430f61"],
 ["./audio/m2/58.mp3","6461742481ae"],
 ["./audio/m2/59.mp3","9d95eb1446a6"],
 ["./audio/m2/6.mp3","f72f1742bfd7"],
 ["./audio/m2/60.mp3","a4f57f08db98"],
 ["./audio/m2/61.mp3","7955086b6cb9"],
 ["./audio/m2/62.mp3","6fa934220dcd"],
 ["./audio/m2/63.mp3","eba53d2c3808"],
 ["./audio/m2/64.mp3","849b84e55300"],
 ["./audio/m2/65.mp3","b16d9ce5b49a"],
 ["./audio/m2/66.mp3","88bfd9b9a59d"],
 ["./audio/m2/67.mp3","f9c830e542e3"],
 ["./audio/m2/68.mp3","5bde07190d42"],
 ["./audio/m2/69.mp3","f4d3c56e4f96"],
 ["./audio/m2/7.mp3","7ae0e627882b"],
 ["./audio/m2/70.mp3","e3cb7041bb74"],
 ["./audio/m2/71.mp3","5e6efb668e2a"],
 ["./audio/m2/72.mp3","354954cdd7f4"],
 ["./audio/m2/73.mp3","d83f5a5ba391"],
 ["./audio/m2/74.mp3","c5593a958942"],
 ["./audio/m2/75.mp3","58f26582bb12"],
 ["./audio/m2/76.mp3","c96d99e9cf43"],
 ["./audio/m2/77.mp3","62ca8daadafc"],
 ["./audio/m2/78.mp3","aadd9bb1c7d5"],
 ["./audio/m2/79.mp3","ed05646dbe7d"],
 ["./audio/m2/8.mp3","12510ae0e6c7"],
 ["./audio/m2/80.mp3","84365acafdb8"],
 ["./audio/m2/81.mp3","9fd73f5cc274"],
 ["./audio/m2/9.mp3","624c0ddb7ee7"],
 ["./audio/m2/index.json","f53ca1b9478a"]
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
