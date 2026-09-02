import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/engineeringData';
import { Phone, Mail, Globe, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*NOVA ZEN İLETİŞİM FORMU MESAJI*
--------------------------------
👤 *İsim:* ${formData.name}
📞 *Telefon:* ${formData.phone}
✉️ *E-Posta:* ${formData.email}
📌 *Konu:* ${formData.subject}
💬 *Mesaj:* ${formData.message}`;

    window.open(`https://wa.me/905435750380?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <section id="iletisim" className="py-24 sm:py-32 relative bg-[#04070d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/60 border border-nova-500/40 text-xs font-mono text-cyan-400 mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>İLETİŞİM & LOKASYON</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Mühendislik Desteği & Proje Talebi İçin Ulaşın
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                3B bina modelleme, drone fotogrametrisi, lazer tarama veya imar kadastro projeleriniz için doğrudan Harita Mühendisi Mustafa Kale ile görüşebilirsiniz.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex items-center gap-4 p-4.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500 transition-all group shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-nova-900/80 border border-nova-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Doğrudan Telefon Hattı</div>
                  <div className="text-base font-bold text-white font-mono group-hover:text-cyan-300">
                    {CONTACT_INFO.phoneFormatted}
                  </div>
                </div>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500 transition-all group shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">WhatsApp 7/24 Hızlı Mesaj</div>
                  <div className="text-base font-bold text-emerald-400 font-mono">
                    {CONTACT_INFO.phoneFormatted}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 p-4.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500 transition-all group shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-nova-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Kurumsal E-Posta</div>
                  <div className="text-base font-bold text-white font-mono group-hover:text-cyan-300">
                    {CONTACT_INFO.email}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Web & Hizmet Bölgesi</div>
                  <div className="text-sm font-semibold text-white">
                    {CONTACT_INFO.domain} • {CONTACT_INFO.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Direct Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#090e1b] border border-slate-800 rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Hızlı Mesaj Gönderin</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Aşağıdaki formu doldurarak projenizin detaylarını bize iletebilirsiniz.
            </p>

            {sent && (
              <div className="p-4 mb-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mesajınız hazırlandı ve WhatsApp üzerinden aktarılıyor. Teşekkür ederiz.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Adınız Soyadınız / Firma *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ahmet Yılmaz / Mimarlık Ltd."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Telefon Numaranız *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="05XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    E-Posta Adresiniz
                  </label>
                  <input
                    type="email"
                    placeholder="ornek@sirketiniz.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Proje Konusu
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: 3B Bina Modelleme & Röleve"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Mesajınız & Proje İhtiyacınız *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Projenizin konumu, büyüklüğü ve talep ettiğiniz formatlar hakkında bilgi verin..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-nova-600 to-cyan-600 hover:from-nova-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Mesajı Gönder</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
