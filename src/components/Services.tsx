import React, { useState } from 'react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { BorderBeam } from './ui/border-beam';
import { Box, Plane, Layers, MapPin, Calculator, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';

export const Services: React.FC = () => {
  const [lodLevel, setLodLevel] = useState<'LOD 200' | 'LOD 300' | 'LOD 350' | 'LOD 400'>('LOD 350');
  const [droneAlt, setDroneAlt] = useState(80);

  return (
    <section id="hizmetler" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/60 border border-nova-500/40 text-xs font-mono text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>21ST.DEV MÜHENDİSLİK MATRİSİ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              3B Modelleme ve İleri Harita Mühendisliği Çözümleri
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
            Mustafa Kale liderliğinde, en son lazer tarama, drone fotogrametrisi ve BIM yazılım ekosistemleriyle milimetrik doğrulukta proje teslimatı.
          </p>
        </div>

        {/* 21st.dev Bento Grid */}
        <BentoGrid>
          {/* Bento Item 1: Premier 3D Building Modelling (Span 2 Cols) */}
          <BentoGridItem
            className="md:col-span-2 bg-gradient-to-br from-[#0c1628] via-[#091120] to-[#060a14] border-cyan-500/40"
            badge="ÖNE ÇIKAN UZMANLIK"
            icon={<Box className="w-6 h-6 text-cyan-400" />}
            subtitle="BIM & AS-BUILT SAYISALLAŞTIRMA"
            title="3 Boyutlu Bina Çizimi & Sayısal Modelleme"
            description="Mevcut ve projelendirilen yapıların mimari, statik ve kadastral verilerini en son CAD/BIM standartlarında 3 boyutlu dijital ikizlere dönüştürüyoruz. Kat irtifakı, röleve ve ruhsat projeleri için milimetrik 3B çizimler üretiyoruz."
            header={
              <div className="relative p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LOD Seviyesi & Detay Standartları</span>
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {lodLevel} Aktif
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {(['LOD 200', 'LOD 300', 'LOD 350', 'LOD 400'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLodLevel(lvl)}
                      className={`py-2 px-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                        lodLevel === lvl
                          ? 'bg-gradient-to-r from-nova-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  {lodLevel === 'LOD 200' && '› Genel kütle ve hacim geometrisi, şematik kat alanları.'}
                  {lodLevel === 'LOD 300' && '› Doğru konumlandırılmış duvarlar, kapı/pencereler ve döşemeler.'}
                  {lodLevel === 'LOD 350' && '› Taşıyıcı kolonlar, kirişler, mekanik boşluklar ve cephe röleveleri.'}
                  {lodLevel === 'LOD 400' && '› İmalat ve montaj seviyesinde milimetrik birleşim detayları & donatılar.'}
                </div>
              </div>
            }
            footer={
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {['Revit (.rvt)', 'AutoCAD 3D', 'IFC Standard', '3D DXF'].map((fmt, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                      {fmt}
                    </span>
                  ))}
                </div>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
                >
                  <span>3B Bina Teklifi Al</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            }
          />

          {/* Bento Item 2: Drone & UAV Photogrammetry (Span 1 Col) */}
          <BentoGridItem
            badge="İHA & FOTOGRAMETRİ"
            icon={<Plane className="w-6 h-6 text-nova-400" />}
            subtitle="SANTİMETRE ALTI DOĞRULUK"
            title="İHA (Drone) Haritalama & Ortofoto"
            description="RTK/PPK entegre profesyonel insansız hava araçları ile yüzlerce hektarlık alanın ortofoto ve sayısal yüzey modellerini 1-2 gün içinde üretiyoruz."
            header={
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Uçuş İrtifası:</span>
                  <strong className="text-cyan-400 font-bold">{droneAlt} m</strong>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={droneAlt}
                  onChange={(e) => setDroneAlt(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Yer Örnekleme (GSD):</span>
                  <span className="text-emerald-400 font-semibold">{(droneAlt * 0.022).toFixed(1)} cm/px</span>
                </div>
              </div>
            }
            footer={
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-400">GeoTIFF / DEM / DTM</span>
                <a href={CONTACT_INFO.whatsappUrl} className="text-cyan-400 font-semibold hover:text-white flex items-center gap-1">
                  <span>İncele</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            }
          />

          {/* Bento Item 3: Lidar & Laser Scanning (Span 1 Col) */}
          <BentoGridItem
            badge="LAZER TARAMA"
            icon={<Layers className="w-6 h-6 text-cyan-300" />}
            subtitle="TERRESTRIAL & MOBILE LIDAR"
            title="3D Lazer Tarama & Nokta Bulutu"
            description="Milyonlarca lazer koordinat noktası ile tarihi eserlerin, fabrikaların ve tünellerin eksiksiz 3B nokta bulutunu çıkarıyoruz."
            header={
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Ölçüm Hızı:</span>
                  <span className="text-cyan-300">1.000.000 nokta/sn</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Mesafe Hassasiyeti:</span>
                  <span className="text-emerald-400">± 1.0 mm</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Format:</span>
                  <span className="text-white">LAS / LAZ / E57 / PTS</span>
                </div>
              </div>
            }
            footer={
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-400">LIDAR Röleve</span>
                <a href={CONTACT_INFO.whatsappUrl} className="text-cyan-400 font-semibold hover:text-white flex items-center gap-1">
                  <span>Teklif Al</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            }
          />

          {/* Bento Item 4: Cadastre & Zoning (Span 2 Cols) */}
          <BentoGridItem
            className="md:col-span-2"
            badge="RESMİ & TEKNİK KADASTRO"
            icon={<MapPin className="w-6 h-6 text-emerald-400" />}
            subtitle="MEVZUATA TAM UYUMLU"
            title="İmar Uygulamaları, Parselasyon, İfraz & Tevhid"
            description="3194 Sayılı İmar Kanunu 18. Madde uygulamaları, parselasyon, ifraz (ayırma), tevhid (birleştirme), yola terk, irtifak hakkı tesisi ve cins değişikliği işlemlerinde anahtar teslim resmi tescil dosyaları hazırlıyoruz."
            header={
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-cyan-400 font-bold">18. Madde</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">İmar Parselasyonu & Dağıtım Cetveli</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-cyan-400 font-bold">İfraz & Tevhid</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Ayırma, Birleştirme & Yola Terk</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-cyan-400 font-bold">Aplikasyon & Sınır</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Köşe Noktası Çakımı & Kroki</div>
                </div>
              </div>
            }
            footer={
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs text-slate-400">Netcad (.NCZ) & Kadastro Tescil Dosyası</span>
                <a href={CONTACT_INFO.whatsappUrl} className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white">
                  <span>Kadastro Dosyası Danışmanlığı</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            }
          />

          {/* Bento Item 5: Volume & Earthworks / High Precision (Span 3 Cols) */}
          <BentoGridItem
            className="md:col-span-3 bg-[#080d19]"
            badge="HACİM & DEFORMASYON"
            icon={<Calculator className="w-6 h-6 text-amber-400" />}
            subtitle="ŞANTİYE, MADEN & BARAJ HESAPLAMALARI"
            title="Kübaj & Hacim Hesapları ve Hassas Deformasyon Takibi"
            description="Kazı ve dolgu miktarlarını milimetrik hesaplıyor, iki yüzey arası 3B fark modeli ve resmi onaylı kübaj raporları sunuyoruz. Yüksek yapılarda, köprü ve viyadüklerde milimetrik oturma ve deplasman takibi yapıyoruz."
            header={
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-slate-400 text-[11px]">Kazı / Dolgu Doğruluğu</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">± %0.2</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-slate-400 text-[11px]">Hassas Nivelman</div>
                  <div className="text-lg font-bold text-cyan-400 mt-1">0.3 mm / km</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-slate-400 text-[11px]">Kesit Çıkarımı</div>
                  <div className="text-lg font-bold text-white mt-1">Enkesit & Boykesit</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-slate-400 text-[11px]">Rapor Formatı</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">PDF / Excel / CAD</div>
                </div>
              </div>
            }
            footer={
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-400 font-mono">
                  Şantiye hakedişlerine hazır, bağımsız denetim onaylı hacim sertifikaları.
                </div>
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-nova-600 to-cyan-600 hover:from-nova-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2"
                >
                  <span>Hacim & Kübaj Teklifi Alın</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
};
