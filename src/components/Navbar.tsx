import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';
import { ShimmerButton } from './ui/shimmer-button';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '3B Modelleme', href: '#hero' },
    { name: 'Hizmetler', href: '#hizmetler' },
    { name: '3B Stüdyo', href: '#studyo' },
    { name: 'LIDAR Karşılaştırma', href: '#karsilastirma' },
    { name: 'Projeler', href: '#projeler' },
    { name: 'İş Akışı', href: '#surec' },
    { name: 'Hakkımızda', href: '#hakkimizda' },
    { name: 'İletişim', href: '#iletisim' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06080e]/85 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl shadow-blue-950/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <a href="#" className="flex items-center gap-3.5 group">
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 p-1.5 flex items-center justify-center overflow-hidden shadow-xl group-hover:border-cyan-400 transition-all duration-300">
            <img
              src="/assets/logo.png"
              alt="Nova Zen Mühendislik Logo"
              className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nova-600/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-white">
                NOVA<span className="text-cyan-400">ZEN</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-nova-900/90 text-cyan-300 border border-nova-500/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                3B BIM
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 tracking-widest uppercase">
              Harita & Sayısal Modelleme
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-950/70 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-xl shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 text-xs font-mono text-slate-200 transition-all hover:border-cyan-400 shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{CONTACT_INFO.phoneFormatted}</span>
          </a>

          <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <ShimmerButton
              borderRadius="12px"
              className="px-4 py-2 text-xs font-bold"
              background="linear-gradient(135deg, #0052cc 0%, #0066ff 60%, #00d2ff 100%)"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Teklif Al (WhatsApp)</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </ShimmerButton>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          aria-label="Menü"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#06080e]/98 border-b border-slate-800 px-6 py-6 backdrop-blur-2xl transition-all shadow-2xl">
          <div className="flex flex-col space-y-3 font-medium text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-slate-300 hover:text-cyan-400 border-b border-slate-800/60 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-600 font-mono">›</span>
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono text-sm"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{CONTACT_INFO.phoneFormatted}</span>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-sm shadow-xl"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp ile Hızlı Teklif Al</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
