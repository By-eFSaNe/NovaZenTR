export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: '3d-building' | 'drone' | 'cadastre' | 'lidar';
  categoryLabel: string;
  location: string;
  area: string;
  accuracy: string;
  description: string;
  deliverables: string[];
  image: string;
  stats: { label: string; value: string }[];
}

export const CONTACT_INFO = {
  name: 'Mustafa Kale',
  title: 'Harita Mühendisi',
  company: 'NOVA ZEN MÜHENDİSLİK',
  slogan: '3 Boyutlu Harita, Sayısal Bina Modelleme & İleri Jeodezi Çözümleri',
  phone: '+90 543 575 0380',
  phoneFormatted: '+90 543 575 03 80',
  email: 'novazeninfo@gmail.com',
  website: 'www.novazentr.com',
  domain: 'novazentr.com',
  whatsappUrl: 'https://wa.me/905435750380?text=Merhaba%20Mustafa%20Bey,%20Nova%20Zen%20web%20sitenizden%20ula%C5%9F%C4%B1yorum.%20Projemiz%20i%C3%A7in%203B%20modelleme%20/%20harita%20hizmeti%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
  location: 'Türkiye Geneli Proje & Saha Ölçüm Hizmetleri',
  vCard: `BEGIN:VCARD
VERSION:3.0
N:Kale;Mustafa;;;
FN:Mustafa Kale - Harita Mühendisi
ORG:Nova Zen Mühendislik
TITLE:Harita Mühendisi / 3B Modelleme Uzmanı
TEL;TYPE=CELL,VOICE:+905435750380
EMAIL;TYPE=PREF,INTERNET:novazeninfo@gmail.com
URL:https://novazentr.com
NOTE:3 Boyutlu Bina Çizimi, Modelleme, Lidar, Drone Fotogrametrisi ve Harita Mühendislik Hizmetleri
END:VCARD`
};

export const STATS = [
  { value: '100%', label: 'Milimetrik Doğruluk', sub: 'RTK & Lazer Hassasiyeti' },
  { value: '3B BIM', label: 'Dijital İkiz & Modelleme', sub: 'IFC, DWG, 3D DXF, OBJ' },
  { value: '500+', label: 'Tamamlanan Saha & Büro Projesi', sub: 'Parsel, İmar & Yapı' },
  { value: '7/24', label: 'Hızlı Teklif & Mühendislik Desteği', sub: 'Doğrudan Mühendis İletişimi' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: '3d-bina-modelleme',
    title: '3B Bina Çizimi & Sayısal Yapı Modeli (3B-SYM)',
    subtitle: 'TKGM 3B-SYM, Kat İrtifakı & BIM LOD 350 Çözümleri',
    badge: 'Uzmanlık Alanı',
    description: 'Yeni veya mevcut yapıların mimari ve statik projelerini, Çevre ve Şehircilik Bakanlığı ile TKGM mevzuatlarına tam uyumlu 3 Boyutlu Sayısal Yapı Modeline (3B-SYM) ve BIM standartlarına dönüştürüyoruz. Yapı ruhsatı ve kat irtifakı için tescilli 3B modeller üretiyoruz.',
    iconName: 'Box',
    highlight: true,
    features: [
      'TKGM Onaylı 3 Boyutlu Sayısal Yapı Modeli (3B-SYM / CityGML / IFC)',
      'Yapı Ruhsatı & Kat İrtifakı / Mülkiyeti 3B Bağımsız Bölüm Çizimleri',
      'LOD 200 - LOD 400 Seviyesinde 3B BIM ve As-Built Modelleme',
      'Taşıyıcı Sistem, Kolon Aplikasyonu ve Aks Projeleri',
      '3D Lazer Tarama (LIDAR) Destekli Rölöve & Deformasyon Analizi'
    ],
    deliverables: ['3B-SYM (CityGML / IFC)', '3D DWG / DXF', 'Revit BIM (.RVT)', 'TKGM Tescil Raporu & PDF']
  },
  {
    id: 'fotogrametri-drone',
    title: 'İHA (Drone) & Fotogrametrik Harita',
    subtitle: 'Yüksek Çözünürlüklü Ortofoto & Sayısal Arazi Modeli',
    badge: 'Yüksek Teknoloji',
    description: 'RTK/PPK destekli profesyonel insansız hava araçlarımızla geniş alanların santimetre altı hassasiyetle ortomozaik haritalarını, sayısal yükseklik modellerini ve 3B yüzey topoğrafyasını çıkarıyoruz.',
    iconName: 'Plane',
    features: [
      'Yüksek Çözünürlüklü Ortofoto ve True-Orto Üretimi',
      'Sayısal Yüzey Modeli (DSM) ve Arazi Modeli (DTM)',
      'Geniş Alan Topoğrafik ve Halihazır Harita Çıkarımı',
      'Güneş Enerjisi (GES) ve Rüzgar (RES) Saha Modellemesi',
      'Zaman Serili Şantiye İlerleme & Deformasyon Takibi'
    ],
    deliverables: ['GeoTIFF Ortofoto', 'DEM / DTM Yükseklik Verisi', '1/1000 - 1/5000 Halihazır CAD', '3D Doku Kaplamalı Mesh']
  },
  {
    id: 'lazer-tarama-lidar',
    title: '3D Lazer Tarama & Nokta Bulutu (LIDAR)',
    subtitle: 'Milimetrik Hassasiyette Mekansal Veri Yakalama',
    badge: 'İleri Jeodezi',
    description: 'Milyonlarca lazer ölçüm noktası ile karmaşık binaların, tarihi eserlerin, endüstriyel tesislerin ve tünellerin eksiksiz 3 boyutlu nokta bulutunu üreterek bilgisayar ortamına aktarıyoruz.',
    iconName: 'Layers',
    features: [
      'Yersel ve Mobil 3D Lazer Tarama (Terrestrial / Mobile LIDAR)',
      'Nokta Bulutu (Point Cloud) Temizleme ve Sınıflandırma',
      'Nokta Bulutundan 2D Kesit, Plan ve 3B CAD/BIM Çıkarımı',
      'Tarihi Eser, Anıt ve Kültür Varlığı 3B Belgeleme',
      'Endüstriyel Tesis ve Borulama (Plant 3D) Modelleme'
    ],
    deliverables: ['LAS / LAZ / E57 Nokta Bulutu', '2B/3B CAD Çizimleri', 'Deformasyon Isı Haritası', '360° Sanal Tur']
  },
  {
    id: 'imar-ve-kadastro',
    title: 'İmar Uygulamaları & Kadastro Mühendisliği',
    subtitle: 'Mevzuata Tam Uyumlu Resmi ve Teknik Harita İşleri',
    badge: 'Mevzuat & Hukuk',
    description: '3194 Sayılı İmar Kanunu 18. Madde uygulamaları, parselasyon, ifraz (ayırma), tevhid (birleştirme), yola terk, irtifak hakkı tesisi ve cins değişikliği işlemlerinde anahtar teslim tescil dosyaları hazırlıyoruz.',
    iconName: 'MapPin',
    features: [
      '18. Madde İmar Uygulaması ve Dağıtım Cetvelleri',
      'İfraz (Ayırma), Tevhid (Birleştirme) ve Yola Terk Dosyaları',
      'Cins Değişikliği ve Kat İrtifakı / Mülkiyeti Altlıkları',
      'Sınır Tespiti (Aplikasyon) ve Parsel Köşe Noktası Çakımı',
      'Kamulaştırma ve Mülkiyet Haritaları Hazırlanması'
    ],
    deliverables: ['Resmi Kadastro Tescil Dosyası', 'Netcad (.NCZ) & DWG', 'Dağıtım ve Tahsis Cetvelleri', 'Aplikasyon Krokisi']
  },
  {
    id: 'kubaj-ve-hacim',
    title: 'Kübaj & Hacim Hesaplamaları',
    subtitle: 'Hafriyat, Dolgu, Maden ve Stok Sahası Hesapları',
    badge: 'Maliyet & Şantiye',
    description: 'Şantiyeler, maden ocakları ve baraj projelerinde hafriyat ve dolgu miktarlarını GNSS ve Drone ölçümleriyle milimetrik olarak modelliyor, bağımsız denetime hazır hacim raporları sunuyoruz.',
    iconName: 'Calculator',
    features: [
      'Kazı ve Dolgu Hacim (Kübaj) Hesaplamaları',
      'Maden Ocakları ve Stok Yığınlarının Periyodik Ölçümü',
      'Enkesit ve Boykesit Çıkarımı (Cross-Sections)',
      'İki Yüzey Arası Hacim Farkı Isı Haritaları',
      'Hakediş ve Resmi Kurum Onaylı Hacim Raporları'
    ],
    deliverables: ['Kübaj Hesap Raporu (PDF/Excel)', 'Enkesit / Boykesit Çizimleri', '3B Fark Yüzey Modeli', 'Hacim Sertifikası']
  },
  {
    id: 'hassas-olcme-deformasyon',
    title: 'Hassas Ölçümler & Deformasyon Takibi',
    subtitle: 'Total Station, Nivelman ve GNSS Ağ Çözümleri',
    badge: 'Yüksek Hassasiyet',
    description: 'Köprü, viyadük, yüksek bina, baraj ve tünel gibi kritik mühendislik yapılarındaki mikro milimetrik oturma, kayma ve deformasyonları periyodik yüksek hassasiyetli jeodezik ağlarla izliyoruz.',
    iconName: 'Compass',
    features: [
      'Statik ve RTK GNSS Jeodezik Ağ Kurulumu',
      'Hassas Geometrik ve Trigonometrik Nivelman',
      'Yapısal Deformasyon ve Oturma (Settlement) İzleme',
      'Kolon Düşeylik, Aks ve Temel Aplikasyonu',
      'Endüstriyel Makine ve Ray Hizalama Ölçümleri'
    ],
    deliverables: ['Periyodik Deformasyon Raporları', 'Grafiksel Vektör Analizleri', 'Aks ve Kot Ölçüm Krokileri', 'Resmi Onay Dosyası']
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: '3B Karma Yaşam Kuleleri BIM & As-Built Modelleme',
    category: '3d-building',
    categoryLabel: '3B Bina Modelleme',
    location: 'Modern Rezidans & Ticari Blok',
    area: '48.000 m² Kapalı Alan',
    accuracy: '± 3 mm Lazer Doğruluğu',
    description: '32 katlı çift kule rezidans projesinin lazer tarama verileri ile mimari, statik ve mekanik aksamlarının LOD 350 standardında 3 boyutlu dijital ikizi oluşturuldu.',
    deliverables: ['Revit BIM (.rvt)', '3D AutoCAD (.dwg)', 'IFC Modeli', '3D Kat Planları'],
    image: '/assets/brand_art.jpg',
    stats: [
      { label: 'Kat Sayısı', value: '32 Kat' },
      { label: 'Doğruluk', value: 'LOD 350' },
      { label: 'Nokta Sayısı', value: '1.2 Milyar' }
    ]
  },
  {
    id: 'p2',
    title: 'Drone ile 450 Hektar Sayısal Arazi & Ortofoto Üretimi',
    category: 'drone',
    categoryLabel: 'İHA Fotogrametri',
    location: 'Bölgesel İmar & Altyapı Sahası',
    area: '450 Hektar',
    accuracy: 'GSD: 1.8 cm/piksel',
    description: 'RTK destekli İHA uçuşları ile 450 hektarlık engebeli arazinin sayısal yüzey ve yükseklik modelleri üretilerek 1/1000 ölçekli halihazır harita altlığı hazırlandı.',
    deliverables: ['GeoTIFF True-Ortofoto', 'DEM / DTM Verisi', '1/1000 Halihazır CAD', 'Eş Yükselti Eğrileri'],
    image: '/assets/logo_dark.png',
    stats: [
      { label: 'Çözünürlük', value: '1.8 cm/px' },
      { label: 'Saha Büyüklüğü', value: '450 Ha' },
      { label: 'Yer Kontrol Noktası', value: '42 Nokta' }
    ]
  },
  {
    id: 'p3',
    title: 'Tarihi Külliye & Kemerli Yapı 3D Lazer Tarama Rölevesi',
    category: 'lidar',
    categoryLabel: 'Lazer Tarama & Lidar',
    location: 'Kültür Varlığı Restorasyon Projesi',
    area: '8.500 m² Röleve Sahası',
    accuracy: '± 1.5 mm Hassasiyet',
    description: 'Tarihi yapının tüm kubbe, tonoz, cephe ve kemer detayları karasal 3D lazer tarayıcı ile taranarak restorasyon kuruluna onaylı 3B mesh ve kesit projeleri teslim edildi.',
    deliverables: ['E57 Renkli Nokta Bulutu', '2B/3B Taş Röleveleri', 'Karakteristik Kesitler', '3D Yüzey Deformasyon Modeli'],
    image: '/assets/brand_art.jpg',
    stats: [
      { label: 'Tarama Pozisyonu', value: '64 İstasyon' },
      { label: 'Hassasiyet', value: '±1.5 mm' },
      { label: 'Teslim Formatı', value: 'E57 & DWG' }
    ]
  },
  {
    id: 'p4',
    title: 'Maden Ocağı Periyodik Kübaj & 3B Hacim Analizi',
    category: 'lidar',
    categoryLabel: 'Hacim & Kübaj',
    location: 'Açık Ocak İşletmesi',
    area: '120.000 m³ Kazı Sahası',
    accuracy: '± %0.3 Hacim Yanılgı Oranı',
    description: 'Aylık periyotlarla drone ve GNSS ölçümleri yapılarak iki yüzey arası kazı-dolgu miktarları 3 boyutlu fark modeli üzerinden raporlandı.',
    deliverables: ['Hacim Hesap Cetvelleri', '3B Fark Yüzey Haritası', 'Enkesit Paftaları', 'Resmi Onay Raporu'],
    image: '/assets/logo.png',
    stats: [
      { label: 'Toplam Hacim', value: '120.000 m³' },
      { label: 'Analiz Süresi', value: '24 Saat' },
      { label: 'Ölçüm Metodu', value: 'RTK Drone + GNSS' }
    ]
  }
];

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Keşif & Jeodezik Planlama',
    desc: 'Projenizin lokasyonu, hedef doğruluğu ve ihtiyaç duyulan CAD/BIM standartları analiz edilerek GNSS nirengi ağı planlanır.',
    icon: 'Search'
  },
  {
    step: '02',
    title: 'Yüksek Teknolojili Saha Ölçümü',
    desc: 'Lidar tarayıcılar, RTK GNSS ve yüksek çözünürlüklü İHA fotogrametri sistemleri ile sahada milimetrik veri toplanır.',
    icon: 'Radio'
  },
  {
    step: '03',
    title: '3B Modelleme & Sayısallaştırma',
    desc: 'Toplanan milyonlarca nokta bulutu filtrelenir; mimari, statik ve kadastral katmanlar 3 boyutlu CAD/BIM ortamında çizilir.',
    icon: 'Cpu'
  },
  {
    step: '04',
    title: 'Kalite Kontrol & Proje Teslimi',
    desc: 'Milimetrik doğruluk testlerinden geçen veriler; DWG, IFC, LAS, GeoTIFF ve resmi tescil formatlarında eksiksiz teslim edilir.',
    icon: 'CheckCircle2'
  }
];

export const HARDWARE_SOFTWARE = {
  software: [
    'Autodesk Revit (BIM)',
    'AutoCAD & Civil 3D',
    'Netcad GIS & İmar',
    'Agisoft Metashape Pro',
    'Leica Cyclone 3D',
    'CloudCompare & MeshLab',
    'QGIS / ArcGIS Enterprise'
  ],
  hardware: [
    'Profesyonel RTK/PPK İHA (Drone)',
    'Yüksek Hassasiyetli 3D Lazer Tarayıcı',
    'Çok Frekanslı GNSS / CORS Alıcıları',
    '1" Açı Hassasiyetli Robotik Total Station',
    'Dijital Hassas Nivo & İnvar Mira'
  ]
};

export const FAQ_LIST = [
  {
    q: 'TKGM 3 Boyutlu Sayısal Yapı Modeli (3B-SYM) nedir ve kimler için zorunludur?',
    a: '3B-SYM; Çevre, Şehircilik ve İklim Değişikliği Bakanlığı ile Tapu ve Kadastro Genel Müdürlüğü (TKGM) genelgeleri uyarınca, Yapı Ruhsatı ve Kat İrtifakı/Kat Mülkiyeti tesisi için mimari projelerden üretilmesi zorunlu kılınan akıllı 3B bina modelidir. Nova Zen Mühendislik olarak Harita Mühendisi Mustafa Kale yetkisinde CityGML ve IFC formatlarında resmi onaylı 3B-SYM modelleri üretiyoruz.'
  },
  {
    q: '3 Boyutlu Bina Modellemesi (BIM) neden gereklidir ve nerelerde kullanılır?',
    a: '3B Bina Modellemesi; yapının mevcut durumunu (as-built) milimetrik olarak dijital ortama aktarır. Kat irtifakı projelerinde bağımsız bölümlerin hatasız ayrılmasını, restorasyonlarda tarihi dokunun birebir korunmasını, tadilat ve kentsel dönüşüm süreçlerinde mimari/statik çakışmaların sıfıra indirilmesini sağlar.'
  },
  {
    q: 'Nova Zen hangi formatlarda 3B model ve harita teslimi yapmaktadır?',
    a: 'Müşterilerimizin yazılım ihtiyaçlarına göre; 3B-SYM (CityGML / IFC), AutoCAD (.DWG / .DXF), Revit / IFC (.RVT / .IFC), Lazer Nokta Bulutu (.LAS / .LAZ / .E57), 3D Mesh (.OBJ / .FBX), Ortofoto Harita (.GeoTIFF / .ECW) ve Netcad (.NCZ) formatlarında tam uyumlu teslimatlar yapıyoruz.'
  },
  {
    q: 'Drone ile harita ölçümü geleneksel ölçümden ne kadar hızlıdır?',
    a: 'Drone ve İHA fotogrametrisi; geleneksel yöntemlerle haftalar sürebilecek yüzlerce hektarlık alanın topoğrafyasını ve ortofotosunu 1-2 gün içerisinde santimetre altı hassasiyetle tamamlar. Zamandan ve bütçeden büyük tasarruf sağlar.'
  },
  {
    q: 'Projemiz için teklif alma süreci nasıl işler?',
    a: 'Sitemizdeki interaktif teklif formundan, doğrudan +90 543 575 0380 numaralı telefonumuzdan veya WhatsApp üzerinden projenizin ada/parselini, konumunu ve ihtiyaç duyduğunuz 3B modelleme/ölçüm detayını paylaştığınızda aynı gün içinde mühendislik teklifimizi hazırlıyoruz.'
  }
];
