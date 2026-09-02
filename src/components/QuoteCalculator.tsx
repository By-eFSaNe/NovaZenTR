import React, { useState } from 'react';
import { Calculator, MessageSquare, Check, Building2, Map, Layers, FileCheck, CheckCircle2, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';
import { ShimmerButton } from './ui/shimmer-button';
import { BorderBeam } from './ui/border-beam';

export const QuoteCalculator: React.FC = () => {
  const [serviceType, setServiceType] = useState('3d-bina');
  const [projectScale, setProjectScale] = useState('medium');
  const [targetFormats, setTargetFormats] = useState<string[]>(['3D DWG', 'Revit BIM (.RVT)']);
  const [city, setCity] = useState('');
  const [parcelInfo, setParcelInfo] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleFormat = (fmt: string) => {
    if (targetFormats.includes(fmt)) {
      setTargetFormats(targetFormats.filter((f) => f !== fmt));
    } else {
      setTargetFormats([...targetFormats, fmt]);
    }
  };

  const getServiceLabel = () => {
    switch (serviceType) {
      case '3d-bina':
        return '3 Boyutlu Bina Çizimi & BIM Modelleme';
      case 'drone':
        return 'İHA (Drone) & Fotogrametrik Harita';
      case 'lidar':
        return '3D Lazer Tarama & Nokta Bulutu (LIDAR)';
      case 'imar':
        return 'İmar Uygulaması & Kadastro Tescil';
      case 'kubaj':
        return 'Kübaj & Hacim Hesaplaması';
      default:
        return 'Harita Mühendisliği Hizmeti';
    }
  };

  const getScaleLabel = () => {
    switch (projectScale) {
      case 'small':
        return 'Küçük Ölçek (1-3 Kat / 1.000 m² altı / 5 Hektar)';
      case 'medium':
        return 'Orta Ölçek (4-10 Kat / 1.000 - 10.000 m² / 5-50 Hektar)';
      case 'large':
        return 'Büyük & Endüstriyel Ölçek (10+ Kat / 10.000 m²+ / 50+ Hektar)';
      default:
        return 'Standart';
    }
  };

  const getEstimatedDays = () => {
    if (projectScale === 'small') return '1-2 İş Günü';
    if (projectScale === 'medium') return '3-5 İş Günü';
    return '5-10 İş Günü';
  };

  const generateWhatsAppMessage = () => {
    const text = `*NOVA ZEN MÜHENDİSLİK - PROJE TEKLİF TALEBİ*
----------------------------------------
📍 *Hizmet Türü:* ${getServiceLabel()}
📐 *Proje Ölçeği:* ${getScaleLabel()}
⏱️ *Hedef Teslimat:* ${getEstimatedDays()}
📂 *İstenen Formatlar:* ${targetFormats.join(', ') || 'Belirtilmedi'}
🗺️ *Şehir / Konum:* ${city || 'Belirtilmedi'}
🏷️ *Ada / Parsel Bilgisi:* ${parcelInfo || 'Belirtilmedi'}
📝 *Açıklama & Not:* ${notes || 'Mühendislik teklifi rica ediyoruz.'}
----------------------------------------
_Bu talep www.novazentr.com üzerinden oluşturulmuştur._`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = generateWhatsAppMessage();
    window.open(`https://wa.me/905435750380?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="teklif" className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#090e1b] border-2 border-nova-500/40 rounded-[36px] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/80 border border-nova-500/40 text-xs font-mono text-cyan-400 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>21ST.DEV AKILLI TEKLİF & METRAJ SİSTEMİ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projeniz İçin 3B Modelleme ve Harita Teklifi Oluşturun
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Aşağıdaki adımları seçerek doğrudan Harita Mühendisi Mustafa Kale'ye detaylı talep iletebilirsiniz.
            </p>
          </div>

          {submitted && (
            <div className="p-4 mb-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-3 shadow-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Teklif talebiniz WhatsApp mesajı olarak oluşturuldu. Harita Mühendisi Mustafa Kale en kısa sürede dönüş sağlayacaktır.</span>
            </div>
          )}

          <form onSubmit={handleWhatsAppSubmit} className="space-y-8">
            {/* Step 1: Select Service */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                1. Hizmet Türünü Seçin
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: '3d-bina', label: '3B Bina Çizimi & 3B-SYM (BIM)', icon: Building2 },
                  { id: 'drone', label: 'İHA & Fotogrametri', icon: Map },
                  { id: 'lidar', label: 'Lazer Tarama (LIDAR)', icon: Layers },
                  { id: 'imar', label: 'İmar & Kadastro', icon: FileCheck },
                  { id: 'kubaj', label: 'Kübaj & Hacim Hesabı', icon: Calculator },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = serviceType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setServiceType(item.id)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-nova-600/30 border-cyan-400 text-white shadow-lg ring-1 ring-cyan-400'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Project Scale */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  2. Proje Büyüklüğü & Tahmini Süre
                </label>
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Tahmini Teslimat: {getEstimatedDays()}</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'small', label: 'Küçük Ölçek', desc: '1-3 Kat / <1.000 m² / <5 Ha' },
                  { id: 'medium', label: 'Orta Ölçek', desc: '4-10 Kat / 1.000-10.000 m² / 5-50 Ha' },
                  { id: 'large', label: 'Büyük Ölçek', desc: '10+ Kat / 10.000 m²+ / 50+ Ha' },
                ].map((sc) => (
                  <button
                    type="button"
                    key={sc.id}
                    onClick={() => setProjectScale(sc.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      projectScale === sc.id
                        ? 'bg-nova-600/30 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{sc.label}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">{sc.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Desired Deliverable Formats */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                3. Talep Edilen Teslim Formatları
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  'TKGM 3B-SYM (CityGML)',
                  '3D DWG',
                  'Revit BIM (.RVT)',
                  'IFC Modeli',
                  'Lazer Nokta Bulutu (.LAS / .E57)',
                  'GeoTIFF Ortofoto',
                  'Netcad (.NCZ)',
                  'Kübaj & Hacim Raporu',
                  'Resmi Kadastro Tescil Dosyası',
                ].map((fmt) => {
                  const isChecked = targetFormats.includes(fmt);
                  return (
                    <button
                      type="button"
                      key={fmt}
                      onClick={() => toggleFormat(fmt)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all ${
                        isChecked
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-semibold'
                          : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Check className={`w-3.5 h-3.5 ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
                      <span>{fmt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Location & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Şehir / İlçe:
                </label>
                <input
                  type="text"
                  placeholder="Örn: İstanbul / Kadıköy"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Ada / Parsel (Varsa):
                </label>
                <input
                  type="text"
                  placeholder="Örn: 104 Ada / 12 Parsel"
                  value={parcelInfo}
                  onChange={(e) => setParcelInfo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Proje Detayları & Notlar:
                </label>
                <textarea
                  rows={3}
                  placeholder="Yapının mevcut durumu, hedef teslim süresi veya varsa özel teknik şartname notlarınız..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-800">
              <div className="w-full sm:w-auto flex-1">
                <ShimmerButton
                  type="submit"
                  borderRadius="18px"
                  className="w-full py-4 text-sm font-bold"
                  background="linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%)"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Teklifi WhatsApp İle İlet (Anında Cevap)</span>
                </ShimmerButton>
              </div>

              <a
                href={`mailto:${CONTACT_INFO.email}?subject=Nova%20Zen%20Proje%20Teklif%20Talebi&body=${encodeURIComponent(
                  `Hizmet: ${getServiceLabel()}\nÖlçek: ${getScaleLabel()}\nFormatlar: ${targetFormats.join(', ')}\nŞehir: ${city}\nAda/Parsel: ${parcelInfo}\nNot: ${notes}`
                )}`}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs text-center transition-all"
              >
                E-Posta İle Gönder
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
