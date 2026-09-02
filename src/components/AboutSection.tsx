import React, { useState } from 'react';
import { CONTACT_INFO, FAQ_LIST } from '../data/engineeringData';
import { ShieldCheck, Award, Download, UserCheck, ChevronDown, Phone } from 'lucide-react';
import { Card3D } from './ui/card-3d';

export const AboutSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const downloadVCard = () => {
    const element = document.createElement('a');
    const file = new Blob([CONTACT_INFO.vCard], { type: 'text/vcard;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Mustafa_Kale_NovaZen_HaritaMuhendisi.vcf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="hakkimizda" className="py-24 sm:py-32 relative bg-[#060a13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left: 3D Tilt Business Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md">
              <Card3D className="border-cyan-500/50 shadow-2xl shadow-blue-950/50">
                <div className="p-1 bg-gradient-to-br from-cyan-500/40 via-nova-600/30 to-slate-800 rounded-[28px]">
                  <div className="rounded-[26px] overflow-hidden bg-slate-950 relative">
                    <img
                      src="/assets/business_card.png"
                      alt="Mustafa Kale Harita Mühendisi Kartvizit"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </Card3D>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <button
                type="button"
                onClick={downloadVCard}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-cyan-500/60 text-cyan-300 text-xs font-mono font-semibold shadow-xl hover:bg-cyan-950 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Rehbere Kaydet (vCard)</span>
              </button>

              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono font-semibold hover:border-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Hemen Ara</span>
              </a>
            </div>
          </div>

          {/* Right: Bio & Engineering Ethics (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/60 border border-nova-500/40 text-xs font-mono text-cyan-400 mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>KURUCU HARİTA MÜHENDİSİ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Mustafa Kale
            </h2>
            <p className="text-lg font-mono text-cyan-400 mt-1 mb-6">
              Harita Mühendisi / 3B Modelleme & Lidar Uzmanı
            </p>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Nova Zen Mühendislik</strong>, geleneksel haritacılık disiplinini en son 3 boyutlu lazer tarama, İHA drone fotogrametrisi ve BIM sayısal yapı modelleme teknolojileriyle harmanlayarak sektöre çağdaş bir vizyon getirmektedir.
              </p>
              <p>
                Mimarlık ofisleri, inşaat taahhüt firmaları, belediyeler ve özel mülk sahipleri için; bina kat irtifakı ve as-built 3D modellerinden yüzlerce hektarlık sayısal arazi ve ortofoto haritalara kadar her ölçekte <strong>milimetrik doğruluk ve resmi mevzuat güvencesi</strong> ile çalışıyoruz.
              </p>
            </div>

            {/* Guarantees Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400 shrink-0 shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Resmi & Tescilli Mühendislik</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Harita ve Kadastro Mühendisleri Odası (HKMO) ve T.C. mevzuatlarına tam uyumlu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-950 border border-blue-800 text-nova-400 shrink-0 shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">LOD 300+ BIM Seviyesi</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Revit, AutoCAD ve IFC formatlarında tüm disiplinlerle sorunsuz entegre 3B veri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-16 border-t border-slate-800/80">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Sıkça Sorulan Sorular
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Harita mühendisliği, 3 boyutlu modelleme ve teslim süreçleri hakkında merak edilenler.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_LIST.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-all shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 text-slate-200 font-semibold text-sm sm:text-base hover:text-cyan-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4 bg-slate-950/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
