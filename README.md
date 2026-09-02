# Nova Zen Mühendislik - Harita Mühendisliği & 3B Modelleme Web Sitesi

Harita Mühendisi **Mustafa Kale** ve **Nova Zen Mühendislik** için geliştirilmiş, 3 boyutlu WebGL Three.js mimarisiyle donatılmış, logo ve kartvizit renk paletiyle tam uyumlu, modern kurumsal web sitesi.

---

## 🌟 Öne Çıkan Özellikler

- **Logo & Kartvizit Uyumlu Cyber/Mühendislik Teması**: Carbon Dark (`#06080e`), Nova Electric Blue (`#0066ff`, `#00d2ff`) ve Krom/Gümüş metalik efektler.
- **İnteraktif 3D Three.js Hero Sahnesi**: 360° dönebilen 3B mimari kuleler, lazer tarama düzlemi, GNSS uydu ağı ve anlık jeodezik koordinat HUD (ITRF96 / EPSG:5256).
- **İnteraktif 3B CAD / BIM Vizörü**: Katları patlatma (explode view), taşıyıcı kolonları ve metraj akslarını inceleme, parsel sınırlarını görüntüleme.
- **LIDAR vs 3B Model Karşılaştırma Kaydırıcısı**: Ham nokta bulutu ile nihai 3B BIM modelini canlı kaydırıcı ile kıyaslama.
- **Kapsamlı Harita Mühendisliği Hizmetleri**:
  1. 3 Boyutlu Bina Çizimi & Sayısal Modelleme (BIM / As-Built / LOD 350)
  2. İHA (Drone) & Fotogrametrik Harita (True-Ortofoto & DTM/DEM)
  3. 3D Lazer Tarama & Nokta Bulutu (LIDAR)
  4. İmar Uygulamaları, Parselasyon, İfraz, Tevhid & Kadastro
  5. Kübaj & Hacim Hesaplamaları (Kazı / Dolgu)
  6. Hassas Deformasyon & GNSS / Nivelman Ölçümleri
- **Hızlı Teklif & WhatsApp Entegrasyonu**: Kullanıcının proje türü ve alanını seçerek anında WhatsApp veya e-posta ile ön teklif oluşturabildiği hesaplayıcı.
- **Mustafa Kale Profil & Dijital Kartvizit**: Tek tıkla vCard (.vcf) rehbere kaydetme ve kartvizit erişimi.
- **GoDaddy & GitHub Pages Uyumlu**: `novazentr.com` için hazır `CNAME` ve otomatik GitHub Actions CI/CD dağıtım dosyası (`.github/workflows/deploy.yml`).

---

## 🛠️ Yerel Geliştirme (Local Development)

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Canlı üretim derlemesi alın (dist/ klasörü oluşturur)
npm run build

# Derlemeyi önizleyin
npm run preview
```

---

## 🚀 GitHub Pages & novazentr.com Dağıtım Adımları

Mevcut GitHub deponuza yükleyip yayına almak için:

```bash
git init
git add .
git commit -m "Nova Zen 3D Harita & Bina Modelleme Sitesi"
git branch -M main
git remote add origin <GITHUB_REPO_URL_ADRESINIZ>
git push -u origin main --force
```

GitHub Repository ayarlarından (**Settings -> Pages -> Build and deployment**):
- **Source**: `GitHub Actions` seçtiğinizde `.github/workflows/deploy.yml` dosyası otomatik olarak her push işleminde siteyi derleyip `novazentr.com` alan adınıza canlı yayına alacaktır.
- `public/CNAME` dosyası içinde `novazentr.com` tanımlanmış olup GoDaddy DNS yönlendirmenizle tam uyumludur.

---

## 📞 İletişim Bilgileri

* **Harita Mühendisi**: Mustafa Kale
* **Telefon / WhatsApp**: [+90 543 575 03 80](tel:+905435750380)
* **E-Posta**: [novazeninfo@gmail.com](mailto:novazeninfo@gmail.com)
* **Web**: [www.novazentr.com](https://novazentr.com)
