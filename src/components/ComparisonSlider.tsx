import React, { useState, useRef } from 'react';
import { Layers, Sparkles, CheckCircle2, Sliders, Scan, Cpu, Building2, Map, ShieldCheck } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';

export type ComparisonMode = 'lidar_bim' | 'drone_dem' | 'cad_3bsym';

export const ComparisonSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeMode, setActiveMode] = useState<ComparisonMode>('lidar_bim');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const modesData = {
    lidar_bim: {
      tag: 'LAZER TARAMA & DİJİTAL İKİZ',
      title: 'Ham LIDAR Nokta Bulutundan BIM Yapı Modeline',
      desc: 'Milyonlarca lazer koordinat noktasını filtreleyerek LOD 350 standardında parametrik 3B yapı modeline dönüştürüyoruz.',
      leftBadge: 'HAM LAZER NOKTA BULUTU (LIDAR)',
      leftSub: 'Yoğunluk: 1.850 pt/m² • Hassasiyet: ±1.5 mm',
      rightBadge: 'NİHAİ 3B BIM & CAD DİJİTAL İKİZ',
      rightSub: 'LOD 350 • IFC / RVT / 3D DWG Uyumlu',
      leftImg: '/assets/logo_dark.png',
      rightImg: '/assets/brand_art.jpg',
    },
    drone_dem: {
      tag: 'İHA FOTOGRAMETRİ & SAYISAL ARAZİ',
      title: 'Drone True-Ortofoto ile Sayısal Yükseklik Modeli',
      desc: 'RTK santimetre altı hava fotoğraflarından yüksek çözünürlüklü DTM/DEM topoğrafik yüzey çıkarımı.',
      leftBadge: 'TRUE-ORTOFOTO HARİTA (GSD 1.8 cm)',
      leftSub: 'RTK/PPK GNSS Bağlantılı Hava Fotoğrafı',
      rightBadge: 'SAYISAL YÜKSEKLİK MODELİ (DEM / DTM)',
      rightSub: 'Eş Yükselti Eğrileri & Eğim Haritası',
      leftImg: '/assets/brand_art.jpg',
      rightImg: '/assets/logo_dark.png',
    },
    cad_3bsym: {
      tag: 'TKGM & BELEDİYE MEVZUATI',
      title: '2B Mimari Ruhsat Projesinden 3B-SYM Modeline',
      desc: 'İki boyutlu mimari ve statik paftaları, Çevre ve Şehircilik Bakanlığı ile TKGM tescilli 3B Sayısal Yapı Modeline çeviriyoruz.',
      leftBadge: '2B MİMARİ / STATİK RUHSAT ÇİZİMİ',
      leftSub: 'DWG Kat Planları & Kesitler',
      rightBadge: 'TKGM TESCİLLİ 3B-SYM MODELİ (CityGML)',
      rightSub: 'Kat İrtifakı & Bağımsız Bölüm Tesciline Hazır',
      leftImg: '/assets/logo.png',
      rightImg: '/assets/brand_art.jpg',
    },
  };

  const current = modesData[activeMode];

  return (
    <section id="karsilastirma" className="py-20 sm:py-28 relative">
      <div className="w-full bg-[#080d19] border border-slate-800 rounded-[36px] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
        <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/60 border border-nova-500/30 text-xs font-mono text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{current.tag}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {current.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-400 mt-2.5 max-w-2xl">
              {current.desc}
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl shrink-0">
            <button
              type="button"
              onClick={() => setActiveMode('lidar_bim')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeMode === 'lidar_bim'
                  ? 'bg-gradient-to-r from-nova-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>LIDAR ↔ BIM</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('drone_dem')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeMode === 'drone_dem'
                  ? 'bg-gradient-to-r from-nova-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>İHA ↔ DEM</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('cad_3bsym')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeMode === 'cad_3bsym'
                  ? 'bg-gradient-to-r from-nova-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>2B CAD ↔ 3B-SYM</span>
            </button>
          </div>
        </div>

        {/* Interactive Comparison Viewport */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative h-[440px] sm:h-[540px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-slate-700/80 shadow-2xl bg-black"
          style={{ touchAction: 'none' }}
        >
          {/* Under layer: Finished 3D BIM / Vector Model (Right Side) */}
          <div className="absolute inset-0 bg-[#060a12] flex items-center justify-center overflow-hidden">
            <img
              src={current.rightImg}
              alt={current.rightBadge}
              className="w-full h-full object-cover filter contrast-110 brightness-100"
            />
            
            {/* Subtle engineering grid overlay on right side */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,102,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,102,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Right Badge */}
            <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-xl border border-emerald-500/40 px-4 py-2.5 rounded-2xl text-right shadow-2xl z-10 pointer-events-none">
              <div className="flex items-center justify-end gap-1.5 text-xs font-mono font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{current.rightBadge}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {current.rightSub}
              </div>
            </div>

            {/* Bottom Right Specs */}
            <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-400 pointer-events-none hidden sm:block">
              <span className="text-cyan-400">●</span> Format: <strong>CityGML / IFC / DWG</strong>
            </div>
          </div>

          {/* Top layer: Raw Point Cloud / Scan (Left Side, clipped by sliderPos) */}
          <div
            className="absolute inset-0 bg-[#04060a] overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={current.leftImg}
              alt={current.leftBadge}
              className="w-full h-full object-cover filter contrast-140 hue-rotate-190 brightness-110"
            />

            {/* Simulated Animated LiDAR Scan Beam */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.18),transparent_70%)] pointer-events-none animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 pointer-events-none animate-scan" />

            {/* Synthetic Point Cloud Matrix Dots */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(0,210,255,0.35)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-45" />

            {/* Left Badge */}
            <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 px-4 py-2.5 rounded-2xl shadow-2xl z-10 pointer-events-none">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300">
                <Scan className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '9s' }} />
                <span>{current.leftBadge}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {current.leftSub}
              </div>
            </div>

            {/* Bottom Left Specs */}
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-mono text-slate-400 pointer-events-none hidden sm:block">
              <span className="text-emerald-400">●</span> Sensör: <strong>3D Terrestrial Laser Scanner</strong>
            </div>
          </div>

          {/* Vertical Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-nova-600 shadow-[0_0_25px_rgba(0,210,255,1)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Drag Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/70 cursor-ew-resize">
              <Sliders className="w-4 h-4 text-cyan-300 rotate-90" />
            </div>
          </div>

          {/* Center Bottom Helper Prompt */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-slate-800 backdrop-blur-xl px-4 py-1.5 rounded-full text-[11px] font-mono text-slate-300 pointer-events-none shadow-2xl flex items-center gap-2 z-10 whitespace-nowrap">
            <span className="text-cyan-400 animate-pulse">◀</span>
            <span>Kıyaslamak için sürükleyin</span>
            <span className="text-cyan-400 animate-pulse">▶</span>
          </div>
        </div>

        {/* Feature Cards below slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-nova-900/60 text-cyan-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">Otomatik Nokta Sınıflandırma</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Gürültü, bitki örtüsü ve araçlar filtrelenir; temiz yapı geometrisi izole edilir.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-nova-900/60 text-cyan-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">TKGM & Mevzuat Uyumu</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Kat irtifakı ve yapı ruhsatı için 3B-SYM CityGML standartlarında tescil garantisi.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-nova-900/60 text-cyan-400 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">LOD 200 - LOD 350 BIM</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Revit, AutoCAD 3D ve IFC formatlarında taşıyıcı akslar ve bağımsız bölümler.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSlider;
