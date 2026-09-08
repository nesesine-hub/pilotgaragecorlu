# Proje devir notu — Pilot Garage Çorlu web sitesi

Bu dosyayı Claude Code'da ilk mesaj olarak yapıştır. Sonrasında sohbete
normal devam edebilirsin.

---

## Proje

Pilot Garage Çorlu Oto Ekspertiz Kervancı Oto Center için kurumsal web sitesi.
Statik HTML/CSS/JS — derleme adımı, bağımlılık veya build aracı yok.

- **Depo:** `github.com/nesesine-hub/pilotgaragecorlu` (public)
- **Yayın:** GitHub Pages, `main` / root
- **Alan adı:** `pilotgaragecorlu.tr` (Natro'da kayıtlı, DNS Cloudflare'da)
- **Cloudflare:** A kayıtları GitHub Pages IP'lerine, `www` CNAME
  `nesesine-hub.github.io`, hepsi **DNS only** (proxy kapalı — açılırsa
  GitHub sertifikası bozulur)

## İşletme bilgileri (NAP — her yerde birebir aynı yazılmalı)

```
Pilot Garage Çorlu Oto Ekspertiz Kervancı Oto Center
Önerler Mah. Ulubatlı Hasan Cad. No: 1/BH
Kervancı & Haliloğulları Oto Center, B Blok, 9 No'lu Bağımsız Bölüm
59850 Çorlu / Tekirdağ
0546 713 66 56
Her gün 24 saat açık
Google: 4,9 / 77 değerlendirme
Konum: 41.139714, 27.871995
Place ID: ChIJ3xcATprhtBQR6YqEN_6ETvA
```

## Dosya yapısı

```
index.html          Anasayfa (hero + boya haritası SVG, fotoğraf bandı, süreç, popüler paketler, yorumlar)
hizmetler.html      9 hizmet kartı + kontrol noktaları akordeonu
paketler.html       10 paket, karşılaştırma tablosu, paket kapsamları
galeri.html         11 fotoğraf, tıklayınca büyüyen ızgara
kurumsal.html       Hakkımızda, çalışma ilkeleri, Pilot Garage bayiliği
iletisim.html       Randevu formu, harita, çalışma saatleri, SSS
404.html            Kendi içinde stil taşır, asset yoluna bağımlı değil
assets/style.css    Tüm stiller
assets/site.js      SITE ayarları, ikon sprite, lightbox, form, akordeon
gorseller/          Logo, favicon, og-image, 11 fotoğraf (her biri 800px + 1600px WebP)
robots.txt, sitemap.xml, .nojekyll, .gitignore, README.md, OKUYUN.md
```

## Mimari kararlar — bunları bozma

1. **Telefon/WhatsApp/harita linkleri HTML'de sabit yazılı.** Üzerine
   `data-tel`, `data-wa`, `data-map` işaretleri var; `site.js` bunları
   `SITE` nesnesinden yeniden dolduruyor. Amaç: JS yüklenmezse bile
   bütün CTA'lar çalışsın. Yeni buton eklerken ikisini birden yaz.
2. **Header/footer her sayfada tekrarlı, JS ile enjekte edilmiyor.**
   Menü linklerinin SEO'da görünmesi için bilinçli tercih.
3. **Sabit aksiyon çubuğu (`.dock`)** her sayfada, ekranda daima duruyor:
   Ara (kırmızı, 8 saniyede bir yumuşak halka animasyonu) · Yol tarifi ·
   WhatsApp · Randevu al (kırmızı).
4. **Palet:** Pilot Garage kurumsal kırmızı `#E1121C`, siyah `#15171B`,
   beyaz. Rapor semantiği: yeşil orijinal, amber boyalı, kırmızı değişen.
   Font: Archivo (Google Fonts, wdth ekseni kullanılıyor).
5. **Görseller WebP, iki boyutta.** `ad-k.webp` = 800px (ızgara),
   `ad.webp` = 1600px (büyütme). Dosya adları SEO uyumlu, hepsinde
   açıklayıcı `alt` var.
6. Sayfa başlıkları 60 karakteri geçmesin diye kısa tutuldu; resmî tam ad
   schema `name`, footer başlığı ve `og:site_name` içinde birebir geçiyor.

## Yapılandırılmış veri (JSON-LD)

Her sayfada `AutoRepair`. Ayrıca: `FAQPage` (iletisim), `OfferCatalog`
10 paketin fiyatıyla (paketler), `BreadcrumbList` (alt sayfalar),
`ImageGallery` (galeri).

## Tamamlananlar

- Site yayında, alan adı bağlı, HTTPS aktif
- Google Search Console: doğrulandı, sitemap gönderildi, 6 sayfa için
  dizine ekleme talebi yapıldı
- Bing Webmaster Tools: 6 URL + sitemap gönderildi
- Gerçek logo, favicon seti, gerçek fotoğraflı paylaşım görseli
- 11 bayi fotoğrafı siteye yerleşti

## Bekleyen işler

1. **Google İşletme Profili sahipliği** — profil doğrulanmış ama yönetim
   yetkisi bayide değil. Merkeze yetki talebi maili gönderildi, cevap
   bekleniyor. Bu çözülmeden fotoğraf yükleme, hizmet/fiyat girme ve
   yorumlara cevap yazma yapılamıyor.
2. **Apple Business Connect ve Yandex İşletmem kaydı** — ikisi de işletme
   telefonuna gelen doğrulama kodu istiyor.
3. **Instagram / Facebook biyografisine site linki**
4. **Google Ads** — kurulacaksa önce dönüşüm takibi (telefon ve WhatsApp
   tıklamalarını olay olarak göndermek) eklenmeli.
5. Fotoğraflarda **59 AOS 118** plakası okunuyor; izinli araç değilse
   bulanıklaştırılacak.

## İlk yapılacak

Repoyu klonla, `git status` ile temiz olduğunu doğrula. Değişiklikleri
doğrudan commit'leyip push edebilirsin.
