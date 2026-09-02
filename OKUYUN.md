# Pilot Garage Çorlu Kervancı Oto Center — web sitesi

Statik site. Derleme adımı yok, dosyaları olduğu gibi sunucuya atmanız yeterli.

## Dosya yapısı

```
index.html        Anasayfa
hizmetler.html    Hizmetler + kontrol noktaları listesi
paketler.html     10 paket, karşılaştırma tablosu, paket kapsamları
galeri.html       Bayi fotoğrafları + cihaz parkuru
kurumsal.html     Hakkımızda, çalışma ilkeleri, Pilot Garage bayiliği
iletisim.html     Randevu formu, harita, çalışma saatleri, SSS
assets/style.css  Tüm stiller
assets/site.js    Ayarlar, paket verisi, ikon seti, form ve akordeon davranışı
gorseller/        Bayi fotoğrafları (şu an boş)
```

## Neyi nereden değiştirirsiniz

| Ne | Nerede |
|---|---|
| Telefon, WhatsApp, adres, konum | `assets/site.js` → `SITE` nesnesi |
| Paket adı, nokta sayısı, fiyat, açıklama | `paketler.html` (kartlar) ve `assets/site.js` → `PAKETLER` (form listesi) |
| Galeri fotoğrafları | `assets/site.js` → `GALERI` |
| Renkler, yazı tipi ölçüleri | `assets/style.css` → `:root` |

Telefon/WhatsApp/yol tarifi bağlantıları HTML'de sabit yazılmaz; `data-tel`,
`data-wa`, `data-map` işaretleri üzerinden `SITE` nesnesinden doldurulur.
Yani numara değişirse tek bir yeri düzenlemeniz yeter.

## Yayına alırken

1. Google Search Console'a ekleyin, sitemap yerine sayfa sayısı az olduğu için
   doğrudan URL gönderimi yeterli.
2. `<link rel="canonical">` etiketlerini gerçek alan adınıza göre ekleyin.
3. Sayfaların içindeki JSON-LD (`AutoRepair`) şeması hazır; Google'ın
   Rich Results Test aracıyla doğrulayabilirsiniz.
4. Logo: header'daki geçici SVG işareti gerçek Pilot Garage logosuyla
   değiştirin (`.brand-mk` içindeki svg).
