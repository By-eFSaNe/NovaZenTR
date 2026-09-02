import React from 'react';
import { WORKFLOW_STEPS, HARDWARE_SOFTWARE } from '../data/engineeringData';
import { Search, Radio, Cpu, CheckCircle2, ShieldCheck, Wrench, Laptop } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6 text-cyan-400" />,
  Radio: <Radio className="w-6 h-6 text-nova-400" />,
  Cpu: <Cpu className="w-6 h-6 text-cyan-300" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
};

export const WorkflowSection: React.FC = () => {
  return (
    <section id="surec" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/60 border border-nova-500/40 text-xs font-mono text-cyan-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MÜHENDİSLİK METODOLOJİSİ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Sahadan Modele: 4 Aşamalı Kusursuz İş Akışı
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Her projede milimetrik doğruluk ve mevzuata tam uygunluk garantisi ile çalışan sistemli mühendislik süreci.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 sm:p-8 rounded-[28px] bg-[#0a0f1d] border border-slate-800 hover:border-nova-500/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-blue-950/40"
            >
              {idx < WORKFLOW_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-[2px] bg-gradient-to-r from-nova-500 to-transparent z-10" />
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                    {iconMap[step.icon]}
                  </div>
                  <span className="text-3xl font-black font-mono text-slate-700 group-hover:text-cyan-400 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Standartlara Uyumlu</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Ecosystem */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12 rounded-[32px] bg-[#080d19] border border-slate-800/90 shadow-2xl overflow-hidden">
          <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />

          {/* Software */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-nova-900/80 border border-nova-500/40 text-cyan-400 shadow-md">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Yazılım ve Sayısallaştırma Altyapısı</h3>
                <p className="text-xs font-mono text-slate-400">Endüstri Standardı BIM & CAD Çözümleri</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HARDWARE_SOFTWARE.software.map((sw, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{sw}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-nova-900/80 border border-nova-500/40 text-cyan-400 shadow-md">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Donanım ve Saha Ölçme Parkuru</h3>
                <p className="text-xs font-mono text-slate-400">Yüksek Doğruluklu Jeodezik Cihazlar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HARDWARE_SOFTWARE.hardware.map((hw, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{hw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
