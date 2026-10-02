/* =========================================================
   Paket fiyatlarını ve admin panelinden eklenen paketleri
   Firestore'dan okuyup sayfaya işler.
   HTML'deki sabit fiyatlar yedek olarak kalır: ayar boşsa ya da
   bağlantı kurulamazsa site olduğu gibi çalışır.
   ========================================================= */

(() => {
  if (typeof FIREBASE === "undefined" || !FIREBASE.projectId || !FIREBASE.apiKey) return;

  const ONBELLEK = "pg-paketler";
  const ADRES = `https://firestore.googleapis.com/v1/projects/${FIREBASE.projectId}/databases/(default)/documents/paketler?pageSize=100&key=${FIREBASE.apiKey}`;

  const tl = n => Number(n).toLocaleString("tr-TR") + " ₺";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
  const waMesaj = ad => `Merhaba, ${ad} paketi için randevu almak istiyorum.`;

  // Firestore REST belgesi → düz nesne
  const coz = belge => {
    const o = { slug: belge.name.split("/").pop() };
    for (const [k, v] of Object.entries(belge.fields || {})) {
      o[k] = "integerValue" in v ? Number(v.integerValue)
           : "doubleValue" in v ? v.doubleValue
           : v.stringValue;
    }
    return o;
  };

  const waBagla = a => {
    a.href = waLink(a.dataset.wa);
    a.target = "_blank"; a.rel = "noopener";
    a.addEventListener("click", () => izle("whatsapp_tikla"));
  };

  // mevcut paketin adını, özellik sayısını, açıklamasını ve fiyatını sayfadaki her yerde günceller
  const paketYaz = p => {
    const yaz = (kok, secici, deger) => { const e = kok?.querySelector(secici); if (e) e.textContent = deger; };
    const wa = kok => kok?.querySelectorAll("[data-wa]").forEach(a => { a.dataset.wa = waMesaj(p.ad); a.href = waLink(a.dataset.wa); });

    // kart (anasayfa ve paketler)
    const kart = document.getElementById(p.slug);
    if (kart?.matches(".pk")) {
      yaz(kart, "h3", p.ad); yaz(kart, ".pts b", p.nokta); yaz(kart, ".d", p.aciklama); yaz(kart, ".price b", p.fiyat);
      wa(kart);
    }

    // karşılaştırma tablosu
    const bag = document.querySelector(`table.cmp a[href="#${p.slug}"]`);
    if (bag) {
      const satir = bag.closest("tr");
      bag.textContent = p.ad; yaz(satir, ".num", p.nokta); yaz(satir, ".pr", p.fiyat);
      wa(satir);
    }

    // kapsam akordeonu: ilk seferde HTML'deki adla bulunur, sonra işaretinden
    const dugme = [...document.querySelectorAll(".acc-b")].find(b => b.dataset.slug === p.slug
      || (!b.dataset.slug && b.querySelector(".cnt") && b.textContent.replace(b.querySelector(".cnt").textContent, "").trim() === p.htmlAd));
    if (dugme) {
      dugme.dataset.slug = p.slug;
      const yazi = [...dugme.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (yazi) yazi.textContent = p.ad;
      yaz(dugme, ".cnt", p.fiyat);
      yaz(document.getElementById(dugme.getAttribute("aria-controls")), "p", p.aciklama);
    }

    // randevu formundaki seçenek
    const secenek = [...document.querySelectorAll("#fPkg option")].find(o => o.dataset.slug === p.slug || (!o.dataset.slug && o.textContent === p.htmlAd));
    if (secenek) { secenek.dataset.slug = p.slug; secenek.textContent = p.ad; }
  };

  // admin panelinden eklenen paketi paketler sayfasına ve randevu formuna ekler
  const yeniPaket = k => {
    const fiyat = tl(k.fiyat);
    const tablo = document.querySelector("table.cmp tbody");
    if (tablo) {
      document.querySelector(".pk-grid").insertAdjacentHTML("beforeend", `
      <article class="pk" id="${k.slug}" data-canli>
        <span class="ico-wrap"><svg class="ico"><use href="#i-pack"></use></svg></span>
        <h3>${esc(k.ad)}</h3>
        <span class="pts"><b>${esc(k.nokta)}</b> paket özelliği</span>
        <p class="d">${esc(k.aciklama)}</p>
        <div class="price"><b>${fiyat}</b>başlangıç fiyatı</div>
        <a class="btn" href="#" data-wa="${esc(waMesaj(k.ad))}">Bu paket için yazın</a>
      </article>`);
      tablo.insertAdjacentHTML("beforeend", `
        <tr data-canli>
          <td><a href="#${k.slug}" style="color:var(--ink)">${esc(k.ad)}</a></td>
          <td class="num">${esc(k.nokta)}</td>
          <td>Tam kapsamlı</td>
          <td class="pr">${fiyat}</td>
          <td><a href="#" data-wa="${esc(waMesaj(k.ad))}">Randevu al</a></td>
        </tr>`);
      document.querySelectorAll("[data-canli] [data-wa]").forEach(a => { if (a.getAttribute("href") === "#") waBagla(a); });
    }
    const sec = document.getElementById("fPkg");
    if (sec) {
      const o = document.createElement("option");
      o.textContent = k.ad; o.dataset.canli = "";
      sec.appendChild(o);
    }
  };

  // arama motorları için fiyat listesini (JSON-LD) günceller
  const semaYaz = ekler => {
    const s = [...document.querySelectorAll('script[type="application/ld+json"]')].find(e => e.textContent.includes('"OfferCatalog"'));
    if (!s) return;
    try {
      const veri = JSON.parse(s.textContent);
      const sablon = veri.itemListElement[0];
      const rakam = f => String(f).replace(/\D/g, "");
      veri.itemListElement = [
        ...PAKETLER.map(p => ({ ad: p.ad, fiyat: rakam(p.fiyat) })),
        ...ekler.map(k => ({ ad: k.ad, fiyat: String(k.fiyat) }))
      ].map((p, i) => ({ ...sablon, position: i + 1, price: p.fiyat, itemOffered: { ...sablon.itemOffered, name: p.ad } }));
      s.textContent = JSON.stringify(veri);
    } catch (e) {}
  };

  const uygula = liste => {
    document.querySelectorAll("[data-canli]").forEach(e => e.remove());
    const ekler = [];
    liste.filter(k => k.fiyat > 0).sort((a, b) => (a.sira || 0) - (b.sira || 0)).forEach(k => {
      const p = PAKETLER.find(x => x.slug === k.slug);
      if (p) {
        p.htmlAd ??= p.ad;
        p.fiyat = tl(k.fiyat);
        if (k.ad) p.ad = k.ad;
        if (k.nokta >= 0) p.nokta = k.nokta;
        if (k.aciklama) p.aciklama = k.aciklama;
        paketYaz(p);
      }
      else if (k.ad && /^ek-[a-z0-9-]+$/.test(k.slug)) { yeniPaket(k); ekler.push(k); }
    });
    semaYaz(ekler);
  };

  const basla = () => {
    // önce son bilinen fiyatlar, sonra güncel liste
    try { uygula(JSON.parse(localStorage.getItem(ONBELLEK) || "[]")); } catch (e) {}
    fetch(ADRES)
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(v => {
        const liste = (v.documents || []).map(coz);
        uygula(liste);
        try { localStorage.setItem(ONBELLEK, JSON.stringify(liste)); } catch (e) {}
      })
      .catch(() => {});
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", basla);
  else basla();
})();
