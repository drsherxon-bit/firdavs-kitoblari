# Firdavs kitoblari

Madina kitobi (asl matn 1–4; 3-jild ikki kitob: Madina 3 = 1–15-darslar, Madina 4 = 16–34-darslar, ilovalar va umumiy mashqlar), Qoida sharhlari (1–3) va o‘quvchi daftarlari (1–3) — bitta
telefon ilovasi (PWA: «Bosh ekranga qo‘shish» bilan o‘rnatiladi, internetsiz ishlaydi).

## Papkalar

| Papka | Nima |
|---|---|
| `src/` | Artifactlardan olingan **asl nusxalar**. Qo‘lda tahrirlanmaydi — manba artifactning o‘zi. |
| `kitob/` | `src/` dan qurilgan kitoblar: shriftlar lokal, o‘quvchi paneli ulangan. Ilova shu fayllarni ochadi. |
| `app/` | `books.json` (kitoblar ro‘yxati), `reader.css/js` (pastki panel: Kutubxona · Mundarija · harf kattaligi · mavzu; o‘qilgan joyni eslab qoladi). |
| `fonts/` | Amiri, Literata, Scheherazade New (woff2, Google Fonts’dan ko‘chirilgan) + `fonts.css`. |
| `icons/` | Ilova ikonkasi (svg + png). |
| `audio/` | Ustoz o‘qigan normativ audiolari: `audio/<id>/N.mp3` (artifactdagi yo‘l bilan bir xil; kitobda `../audio/`) va `index.json` (build.js yasaydi: dars, mavzu, normativ vaqti, davomiyligi). Hozir `m1` = Madina 1 (62 ta, 30 MB). |
| `tools/` | `build.js` — qurish; `sw.template.js` — oflayn xizmatchi shabloni. |
| `index.html` | Kutubxona ekrani. `normativ.html` — «Normativlar»: kitob tanlanadi, o‘sha kitobning audiolari dars-ba-dars ro‘yxatda (▶, ±5 s). `manifest.webmanifest`, `sw.js`, `version.json` — PWA qismi. |

## Yangilash tartibi (har kitob uchun)

Artifact → PDF → ilova. Ilovaga faqat artifact va PDF tasdiqlangandan keyin o‘tiladi.

1. Artifactning oxirgi nusxasi olinadi (Claude: `Artifact read`) va `src/<slug>.html` ga **nusxa** qilinadi
   (`madina-1…4`, `qoida-1…3`, `daftar-1…3` — ro‘yxat `app/books.json` da).
2. `node tools/build.js` (yoki `node tools/build.js qoida-1`) — `kitob/` va `sw.js` qayta quriladi,
   versiya (fayllar xeshi) o‘zgaradi.
3. Papka serverga yuklanadi (`git push` → GitHub Pages, 1–2 daqiqa). Telefonda ilova ochilganda yangi nusxa
   orqada yuklanadi (pastda «Yangi nusxa yuklanmoqda…»; faqat o‘zgargan fayllar — `sw.js` dagi fayl xeshlari
   bo‘yicha), tayyor bo‘lgach «Kitoblarning yangi nusxasi bor — Yangilash» chiqadi. Yuklanish tugamay ilova
   yopilsa ham, keyingi ochilishda tugma chiqadi (kutayotgan nusxa tekshiriladi). Pastdagi «Nusxa …» — hozir
   ishlayotgan nusxa.

## Sinash

`sahab/.claude/launch.json` dagi `firdavs` konfiguratsiyasi: `npx serve -l 4173 C:/Users/Asus/madina-kitob`,
so‘ng http://localhost:4173/ (telefon ko‘rinishi 375 px da tekshirilgan).

## Joylash

Statik papka — nginx’da bitta `location` yoki GitHub Pages yetarli. Oflayn rejim va o‘rnatish
faqat **https** da ishlaydi. Play Market kerak bo‘lsa shu papka Capacitor bilan o‘raladi (kod o‘zgarmaydi).

## Audio va Normativlar sahifasi

- Kitobga audio artifactda qo‘shiladi (`span.aud`, `audio/<id>/N.mp3`); `books.json` da `"audio": "<id>"` bo‘lsa
  `build.js` kitobdagi yo‘lni `../audio/` ga o‘giradi va `audio/<id>/index.json` ro‘yxatini yasaydi.
- `normativ.html?kitob=<slug>` — shu ro‘yxatdan sahifa. Bosma kitob muqovasidagi QR kod shu manzilga olib keladi
  (Madina 1: `normativ.html?kitob=madina-1`).
- Oflayn: audiolar ham keshlanadi (birinchi o‘rnatishda ~35 MB); `sw.js` keshdagi fayldan Range (206) javob yasaydi,
  shuning uchun pleyerda oldinga/orqaga o‘tkazish internetsiz ham ishlaydi.
