/* =========================================================
   Pilot Garage Çorlu Kervancı Oto Center — ortak script
   Bütün iletişim bilgileri SITE nesnesinden yönetilir.
   ========================================================= */

const SITE = {
  ad: "Pilot Garage Çorlu Kervancı Oto Center",
  telGorunen: "0546 713 66 56",
  telLink: "+905467136656",
  wa: "905467136656",
  adres: "Önerler Mah. Ulubatlı Hasan Cad. No: 1/BH, Kervancı & Haliloğulları Oto Center, B Blok, 9 No'lu Bağımsız Bölüm, 59850 Çorlu / Tekirdağ",
  konum: { lat: 41.139714, lng: 27.871995, placeId: "ChIJ3xcATprhtBQR6YqEN_6ETvA" },
  acik24: true,
  gunler: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
};

const waLink = (msg) => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(msg || `Merhaba, ${SITE.ad}'dan oto ekspertiz randevusu almak istiyorum.`)}`;
const MAP_LINK = `https://www.google.com/maps/dir/?api=1&destination=${SITE.konum.lat},${SITE.konum.lng}&destination_place_id=${SITE.konum.placeId}`;

/* ---------- Paket verisi (tek kaynak) ---------- */
const PAKETLER = [
  { slug:"dyno-motor-performans", ad:"DYNO MOTOR PERFORMANS PAKETİ", nokta:7, fiyat:"2.500 ₺", tur:"odakli", ikon:"i-dyno",
    kisa:"Motor gücü ve güç kaybı ölçümü",
    aciklama:"Aracın motor gücünü ve varsa güç kaybını dyno test yatağında ölçüyoruz. Turbo basıncı, debriyaj baskı balataları, şarj dinamosu, yakıt sistemi ve krank keçeleri bu kapsamda kontrol edilir." },
  { slug:"hava-yastigi", ad:"HAVA YASTIĞI KONTROLLERİ", nokta:9, fiyat:"5.000 ₺", tur:"odakli", ikon:"i-airbag",
    kisa:"Airbag ve emniyet kemeri kontrolü",
    aciklama:"Sürücü, yolcu, perde, diz ve koltuk hava yastıklarının direnç, işlem ve değişim kontrolleri yapılır. Emniyet kemerleriyle birlikte aracın pasif güvenlik donanımı raporlanır." },
  { slug:"mini-motor", ad:"MİNİ EKSPERTİZ MOTOR PAKETİ", nokta:14, fiyat:"6.000 ₺", tur:"odakli", ikon:"i-engine",
    kisa:"Sadece motor ve mekanik alt aksam",
    aciklama:"Önceliği motor olanlar için. Yağ ve su kaçakları, kayışlar, enjektörler, egzoz dumanı, turbo basıncı ve şanzıman aksamı incelenir; kaporta kontrolü bu pakete dahil değildir." },
  { slug:"mini-kaporta", ad:"MİNİ EKSPERTİZ KAPORTA PAKETİ", nokta:24, fiyat:"6.000 ₺", tur:"odakli", ikon:"i-paint",
    kisa:"Sadece boya ve kaporta, 24 nokta",
    aciklama:"Aracın sağlam ve gösterişli bir kaportaya sahip olup olmadığını 24 noktada ölçüyoruz. Şasi, direkler, marşpiyeller, tamponlar ve çamurluklar mikron ölçerle taranır." },
  { slug:"eko-class", ad:"EKO CLASS", nokta:40, fiyat:"7.500 ₺", tur:"kapsamli", ikon:"i-pack",
    kisa:"Pratik ve ekonomik giriş paketi",
    aciklama:"Motor mekanik, mekanik alt aksam ve 24 noktada boya-kaporta kontrolünü bir araya getiren pratik paket. Aracın genel durumunu net görmek isteyenler için yeterli çözünürlükte bir rapor sunar." },
  { slug:"mobil-ekspertiz", ad:"MOBİL EKSPERTİZ", nokta:91, fiyat:"8.000 ₺", tur:"kapsamli", ikon:"i-mobile", etiket:"Aracı getirmeden",
    kisa:"Bulunduğunuz yerde ekspertiz",
    aciklama:"Aracı bayiye getirmeden, bulunduğunuz noktada ekspertiz yapılır. Boya-kaporta, iç ve dış kontroller, OBD arıza okuması ve motor mekanik incelemesi yerinde tamamlanır." },
  { slug:"bold-class", ad:"BOLD CLASS", nokta:144, fiyat:"9.000 ₺", tur:"kapsamli", ikon:"i-pack", etiket:"En çok tercih edilen",
    kisa:"Hem hesaplı hem ayrıntılı",
    aciklama:"İkinci el binek araçların çoğu için doğru tercih. Fren ve süspansiyon test yatağı, dyno motor performansı, lastik, cam ve aydınlatma kontrolleri 144 noktada raporlanır." },
  { slug:"business-class", ad:"BUSINESS CLASS", nokta:217, fiyat:"11.000 ₺", tur:"kapsamli", ikon:"i-pack",
    kisa:"Kurumsal ve ayrıntılı inceleme",
    aciklama:"Aracı 217 farklı noktadan inceleyen kapsamlı paket. 16 başlıkta OBD beyin okuması, iç ve dış donanım testleri ve tam mekanik kontrol içerir." },
  { slug:"first-class", ad:"FIRST CLASS", nokta:316, fiyat:"12.500 ₺", tur:"kapsamli", ikon:"i-pack", etiket:"Lüks segment",
    kisa:"Lüks ve ithal araçlar için",
    aciklama:"Aracın 316 noktası ayrıntılı incelenir. Hava yastığı, emniyet kemeri, süspansiyon, donanım ve konfor sistemleri tam kapsamda test edilip raporlanır." },
  { slug:"black-box", ad:"BLACK BOX", nokta:640, fiyat:"17.500 ₺", tur:"kapsamli", ikon:"i-blackbox", etiket:"En kapsamlı",
    kisa:"640 noktada tam inceleme",
    aciklama:"Aracın her aksamı hakkında bilgi isteyen alıcılara özel. Fitiller, menteşeler, gövde bileşenleri, yol testi ve sürüş destek asistanları dahil 640 nokta kontrol edilir." }
];

/* ---------- İkon seti (SVG sprite) ---------- */
const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <symbol id="i-pack" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 44v-8l5-12a4 4 0 0 1 3.7-2.5H31"/><path d="M4 44h27"/><path d="M9 44v4M4 36h27"/>
    <circle cx="13" cy="46" r="4"/><path d="M13 22v14"/>
    <rect x="36" y="12" width="24" height="40" rx="2"/><path d="M43 12V9h10v3"/>
    <path d="M41 22h14M41 29h14M41 36h9M41 43h11"/>
  </symbol>
  <symbol id="i-blackbox" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="16" width="48" height="34" rx="3"/><path d="M8 26h48"/>
    <circle cx="15" cy="21" r="1.6" fill="currentColor" stroke="none"/>
    <path d="M20 36h10M20 43h16M40 33l6 6-6 6"/>
  </symbol>
  <symbol id="i-engine" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 30h6v-8h12v8h8l8 8h8v14H16l-6-6V30Z"/><path d="M22 22v-6h14"/><path d="M52 34v-8h6"/><path d="M28 44h12"/>
  </symbol>
  <symbol id="i-paint" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 40 38 14a5 5 0 0 1 7 0l3 3a5 5 0 0 1 0 7L22 50l-12 4 2-14Z"/><path d="M36 16l12 12"/><path d="M10 58h44"/>
  </symbol>
  <symbol id="i-airbag" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="34" r="14"/><path d="M38 26h6a10 10 0 0 1 10 10v14"/><path d="M18 12h20"/><path d="M28 12v8"/>
  </symbol>
  <symbol id="i-dyno" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 42a24 24 0 0 1 48 0"/><path d="M32 42 44 26"/><circle cx="32" cy="42" r="3.5"/>
    <path d="M12 34l4 2M52 34l-4 2M32 18v5"/><path d="M8 50h48"/>
  </symbol>
  <symbol id="i-obd" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="12" y="10" width="40" height="28" rx="3"/><path d="M20 20h10M20 28h18M36 20h8"/><path d="M32 38v10"/><path d="M20 54h24l-4-6H24l-4 6Z"/>
  </symbol>
  <symbol id="i-brake" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="8"/><path d="M46 18l-8 8M18 46l8-8M46 46l-8-8M18 18l8 8"/>
  </symbol>
  <symbol id="i-mobile" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 40v-6l4-10a4 4 0 0 1 3.7-2.5H34l7 8h6a4 4 0 0 1 4 4v6.5"/><path d="M6 40h45"/>
    <circle cx="16" cy="42" r="4"/><circle cx="40" cy="42" r="4"/>
    <path d="M52 12c3.3 0 6 2.7 6 6 0 4.5-6 10-6 10s-6-5.5-6-10c0-3.3 2.7-6 6-6Z"/>
  </symbol>
  <symbol id="i-report" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 6h24l12 12v40H14z"/><path d="M38 6v12h12"/><path d="M22 30h20M22 38h20M22 46h12"/>
  </symbol>
  <symbol id="i-shield" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 6 54 14v16c0 14-9 24-22 28C19 54 10 44 10 30V14L32 6Z"/><path d="M23 31l7 7 13-14"/>
  </symbol>
  <symbol id="i-clock" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="32" cy="32" r="24"/><path d="M32 16v16l11 7"/>
  </symbol>
  <symbol id="i-cam" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>
  </symbol>
</svg>`;

/* ---------- Sayfa kurulumu ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", SPRITE);

  // telefon / whatsapp / harita linkleri
  document.querySelectorAll("[data-tel]").forEach(a => {
    a.href = "tel:" + SITE.telLink;
    if (a.dataset.tel === "text") a.textContent = SITE.telGorunen;
  });
  document.querySelectorAll("[data-wa]").forEach(a => {
    a.href = waLink(a.dataset.wa || "");
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-map]").forEach(a => {
    a.href = MAP_LINK; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-adres]").forEach(e => e.textContent = SITE.adres);
  document.querySelectorAll("[data-yil]").forEach(e => e.textContent = new Date().getFullYear());

  // menüde aktif sayfa
  const sayfa = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .mnav a").forEach(a => {
    if (a.getAttribute("href") === sayfa) a.setAttribute("aria-current", "page");
  });

  // sticky header
  const hdr = document.querySelector(".hdr");
  if (hdr) addEventListener("scroll", () => hdr.classList.toggle("stuck", scrollY > 8), { passive: true });

  // mobil menü
  const burger = document.querySelector(".burger");
  const mnav = document.querySelector(".mnav");
  if (burger && mnav) burger.addEventListener("click", () => {
    const acik = mnav.classList.toggle("on");
    burger.setAttribute("aria-expanded", String(acik));
  });

  // akordeonlar
  document.querySelectorAll(".acc-b").forEach(btn => {
    btn.addEventListener("click", () => {
      const acik = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!acik));
      document.getElementById(btn.getAttribute("aria-controls")).classList.toggle("on", !acik);
    });
  });

  // çalışma saatleri tablosu
  const hrs = document.getElementById("hrs");
  if (hrs) {
    const bugun = (new Date().getDay() + 6) % 7;
    hrs.innerHTML = SITE.gunler.map((g, i) =>
      `<div class="hr-r${i === bugun ? " today" : ""}"><span>${g}${i === bugun ? " (bugün)" : ""}</span><span>${SITE.acik24 ? "24 saat açık" : "—"}</span></div>`
    ).join("");
  }

  // randevu formu → WhatsApp
  const pkSel = document.getElementById("fPkg");
  if (pkSel) pkSel.innerHTML = `<option>Hangisi uygun, siz önerin</option>` +
    PAKETLER.map(p => `<option>${p.ad}</option>`).join("");

  const gonder = document.getElementById("bkSend");
  if (gonder) gonder.addEventListener("click", () => {
    const v = id => (document.getElementById(id)?.value || "").trim();
    const satir = [
      `Merhaba, ${SITE.ad}'dan ekspertiz randevusu almak istiyorum.`, "",
      v("fName") && `Ad soyad: ${v("fName")}`,
      v("fPhone") && `Telefon: ${v("fPhone")}`,
      v("fCar") && `Araç: ${v("fCar")}`,
      `Paket: ${v("fPkg")}`,
      v("fDate") && `Gün: ${new Date(v("fDate")).toLocaleDateString("tr-TR", { day:"numeric", month:"long", year:"numeric" })}`,
      `Saat tercihi: ${v("fTime")}`,
      v("fNote") && `Not: ${v("fNote")}`
    ].filter(Boolean);
    window.open(waLink(satir.join("\n")), "_blank", "noopener");
  });

  kurGaleri();
  kurTarama();
});

/* ---------- Galeri ----------
   Fotoğrafları /gorseller klasörüne atıp aşağıdaki listeyi doldurun.
   Örn: { src:"gorseller/bayi-01.jpg", alt:"Ekspertiz alanı", baslik:"Lift ve ölçüm alanı" }
------------------------------------------------------------------ */
const GALERI = [
  { baslik: "Bayi girişi ve karşılama" },
  { baslik: "Ekspertiz alanı ve lift" },
  { baslik: "Fren ve süspansiyon test yatağı" },
  { baslik: "Dyno motor performans testi" },
  { baslik: "OBD arıza tespit istasyonu" },
  { baslik: "Boya kalınlığı mikron ölçümü" },
  { baslik: "Raporlama ve teslim masası" },
  { baslik: "Müşteri bekleme alanı" },
  { baslik: "Kervancı Oto Center dış cephe" }
];

function kurGaleri(){
  const g = document.getElementById("galeri");
  if (!g) return;
  g.innerHTML = GALERI.map(x => x.src
    ? `<figure class="gi"><img src="${x.src}" alt="${x.alt || x.baslik}" loading="lazy"><figcaption>${x.baslik}</figcaption></figure>`
    : `<figure class="gi ph"><svg><use href="#i-cam"></use></svg><span>${x.baslik}</span></figure>`
  ).join("");
}

/* ---------- Hero: boya haritası taraması ---------- */
function kurTarama(){
  const paneller = [...document.querySelectorAll(".pnl")];
  const scan = document.getElementById("scan");
  const ozet = document.getElementById("rptSum");
  if (!paneller.length || !scan) return;

  const durum = {};
  paneller.forEach(p => durum[p.dataset.p] = "ok");
  durum["Sağ ön çamurluk"] = "paint";
  durum["Ön tampon"] = "paint";
  durum["Sağ ön kapı"] = "rep";

  const bitir = () => {
    paneller.forEach(p => p.dataset.state = durum[p.dataset.p]);
    scan.setAttribute("opacity", "0");
    if (ozet) ozet.textContent = "Bu örnekte 2 boyalı, 1 değişen parça var. Kendi aracınızın haritasını ekspertiz sonunda alırsınız.";
  };

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return bitir();

  let y = 18;
  scan.setAttribute("opacity", "1");
  const t = setInterval(() => {
    y += 9;
    scan.setAttribute("y", y);
    paneller.forEach(p => {
      if (!p.dataset.state && (+p.getAttribute("y") + +p.getAttribute("height")) < y + 26) {
        p.dataset.state = durum[p.dataset.p];
      }
    });
    if (y > 500) { clearInterval(t); bitir(); }
  }, 16);
}
