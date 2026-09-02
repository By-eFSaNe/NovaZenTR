import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';

export const FloatingContact: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 flex items-center justify-center shadow-xl backdrop-blur-md transition-all transform hover:-translate-y-1"
          aria-label="Yukarı Çık"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Direct Phone Quick Call */}
      <a
        href={`tel:${CONTACT_INFO.phone}`}
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-xs font-mono text-slate-200 shadow-xl backdrop-blur-md transition-all transform hover:-translate-y-1"
      >
        <Phone className="w-4 h-4 text-cyan-400" />
        <span className="hidden sm:inline font-semibold">{CONTACT_INFO.phoneFormatted}</span>
      </a>

      {/* WhatsApp Floating CTA with Pulse */}
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-2xl shadow-emerald-600/40 transition-all transform hover:scale-105"
        aria-label="WhatsApp ile İletişime Geç"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold font-sans tracking-wide">WhatsApp Teklif Hattı</span>
      </a>
    </div>
  );
};
