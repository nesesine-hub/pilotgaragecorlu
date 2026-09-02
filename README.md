# Pilot Garage Çorlu Kervancı Oto Center

Çorlu oto ekspertiz bayisinin kurumsal web sitesi. Statik HTML/CSS/JS — derleme adımı,
bağımlılık ve build aracı yok. Depoyu GitHub Pages'e bağlamak yeterli.

Canlı: _(yayına aldıktan sonra buraya adresi yazın)_

---

## Dosya yapısı

```
index.html          Anasayfa
hizmetler.html      Hizmetler + kontrol noktaları listesi
paketler.html       10 paket, karşılaştırma tablosu, paket kapsamları
galeri.html         Bayi fotoğrafları + cihaz parkuru
kurumsal.html       Hakkımızda, çalışma ilkeleri, Pilot Garage bayiliği
iletisim.html       Randevu formu, harita, çalışma saatleri, SSS
404.html            GitHub Pages özel hata sayfası
assets/style.css    Tüm stiller
assets/site.js      Ayarlar, paket verisi, ikon seti, davranışlar
gorseller/          Bayi fotoğrafları
robots.txt          Arama motoru yönergesi
sitemap.xml         Site haritası
.nojekyll           GitHub Pages'in Jekyll işlemesini kapatır
```

## Yayına alma (GitHub Pages)

```bash
cd pilotgarage-corlu
git init
git add .
git commit -m "Pilot Garage Çorlu Kervancı Oto Center web sitesi"
git branch -M main
git remote add origin git@github.com:KULLANICI/pilotgarage-corlu.git
git push -u origin main
```

Ardından depoda **Settings → Pages**:

- **Source:** `Deploy from a branch`
- **Branch:** `main` / `/ (root)`
- Kaydedin. Bir iki dakika içinde `https://KULLANICI.github.io/pilotgarage-corlu/` yayında olur.

### Alan adı bağlamak

1. Settings → Pages → **Custom domain** alanına alan adını yazın, kaydedin.
   GitHub depoya otomatik bir `CNAME` dosyası oluşturur.
2. Alan adı sağlayıcısında DNS kaydı:
   - `www` için: `CNAME` → `KULLANICI.github.io`
   - Kök alan adı için: `A` kayıtları → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
3. DNS yayıldıktan sonra **Enforce HTTPS** kutusunu işaretleyin.

### Yayından sonra yapılacaklar

- `robots.txt` ve `sitemap.xml` içindeki `ALAN-ADINIZ` yazan yerleri gerçek adresle değiştirin.
- Her HTML dosyasının `<head>` bölümüne canonical ekleyin:
  `<link rel="canonical" href="https://alanadiniz/sayfa.html">`
- Google Search Console'a ekleyip `sitemap.xml` adresini gönderin.
- Google Business profilindeki web sitesi alanını bu adresle güncelleyin.

> **Not:** Alt dizinde yayınlarsanız (`KULLANICI.github.io/depo-adi/`) sayfa
> bağlantıları göreli olduğu için sorunsuz çalışır. Tek istisna `404.html`
> içindeki `/` bağlantısıdır; alt dizinde yayınlıyorsanız onu `/depo-adi/`
> yapın.

---

## Neyi nereden değiştirirsiniz

| Ne | Nerede |
|---|---|
| Telefon, WhatsApp, adres, konum | `assets/site.js` → `SITE` |
| Paket adı, nokta sayısı, fiyat | `paketler.html` (kartlar) + `assets/site.js` → `PAKETLER` (form listesi) |
| Galeri fotoğrafları | `gorseller/` klasörü + `assets/site.js` → `GALERI` |
| Renkler ve tipografi | `assets/style.css` → `:root` |
| Logo | Her HTML'de `.brand-mk` içindeki geçici SVG |

Telefon, WhatsApp ve yol tarifi bağlantıları HTML'e sabit yazılmaz. `data-tel`,
`data-wa`, `data-map` işaretleri üzerinden `SITE` nesnesinden doldurulur — numara
değişirse tek satır düzenlemek yeter.

## Teknik notlar

- Bağımlılık yok. Tek dış kaynak Google Fonts (Archivo).
- Her sayfada `AutoRepair` JSON-LD şeması var; Rich Results Test ile doğrulanabilir.
- Randevu formu sunucuya veri göndermez, girilenleri hazır bir WhatsApp mesajına çevirir.
- `prefers-reduced-motion` desteklenir, akordeonlar `aria-expanded` ile erişilebilir.
