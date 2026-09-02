import React from 'react';
import { CONTACT_INFO, SERVICES } from '../data/engineeringData';
import { Phone, Mail, Globe, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#03050a] border-t border-slate-900 text-slate-400 text-xs font-sans relative overflow-hidden">
      {/* Top Footer Gradient Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-nova-500 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Slogan (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 p-1 flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Nova Zen Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl tracking-wider text-white">
                  NOVA<span className="text-cyan-400">ZEN</span>
                </span>
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  Mühendislik & 3B Harita
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Harita Mühendisi Mustafa Kale yönetiminde 3 Boyutlu Bina Modelleme (BIM), İHA Drone Fotogrametrisi, Lidar Lazer Tarama ve İmar Kadastro Mühendislik Hizmetleri.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HKMO Mevzuatına Tam Uyumlu</span>
            </div>
          </div>

          {/* Quick Services (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white uppercase font-mono tracking-wider text-xs">
              Mühendislik Hizmetleri
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#hizmetler"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-nova-500">›</span>
                    <span>{srv.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-white uppercase font-mono tracking-wider text-xs">
              İletişim & Lokasyon
            </h4>
            <div className="space-y-2.5 font-mono">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{CONTACT_INFO.phoneFormatted}</span>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-nova-400 shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </a>

              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>www.novazentr.com</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{CONTACT_INFO.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-xs"
              >
                <span>WhatsApp Üzerinden Teklif Al</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Nova Zen Mühendislik • Mustafa Kale. Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://novazentr.com" className="hover:text-slate-300">novazentr.com</a>
            <span>•</span>
            <span>3B Harita & BIM Çözümleri</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
