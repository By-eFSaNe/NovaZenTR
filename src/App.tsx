import React, { useState, useEffect } from 'react';
import { ComingSoon3D } from './components/ComingSoon3D';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { Services } from './components/Services';
import { Studio3D } from './components/Studio3D';
import { ComparisonSlider } from './components/ComparisonSlider';
import { ProjectShowcase } from './components/ProjectShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { QuoteCalculator } from './components/QuoteCalculator';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingContact } from './components/FloatingContact';
import { Spotlight } from './components/ui/spotlight';
import { ShimmerButton } from './components/ui/shimmer-button';
import { STATS } from './data/engineeringData';
import { Box, ArrowRight, ChevronRight, Sparkles, EyeOff } from 'lucide-react';

export const App: React.FC = () => {
  const [showFullSite, setShowFullSite] = useState(false);

  useEffect(() => {
    // Check if URL query contains preview=full
    const params = new URLSearchParams(window.location.search);
    if (params.get('preview') === 'full') {
      setShowFullSite(true);
    }
  }, []);

  // Default: Show 3D Coming Soon / Maintenance page with all contact info
  if (!showFullSite) {
    return <ComingSoon3D />;
  }

  // Full site preview mode
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col selection:bg-nova-600 selection:text-white relative overflow-x-hidden">
      {/* Top Preview Mode Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-slate-950 font-mono font-bold text-xs py-2 px-4 flex items-center justify-between z-50 fixed top-0 left-0 right-0 shadow-lg">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
            <span>TAM SİTE ÖNİZLEME MODU (Ziyaretçiler varsayılan olarak Yakında sayfasını görmektedir)</span>
          </div>
          <button
            type="button"
            onClick={() => setShowFullSite(false)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-950 text-amber-300 hover:text-white text-xs font-semibold"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Yakında Sayfasına Dön</span>
          </button>
        </div>
      </div>

      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-35 pointer-events-none z-0" />

      {/* Floating Header (spaced down due to preview banner) */}
      <div className="pt-8">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* HERO SECTION with 21st.dev Spotlight */}
        <section id="hero" className="pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
          {/* Spotlight illumination */}
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0, 102, 255, 0.28)" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Tagline Pill */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/90 border border-nova-500/40 text-xs sm:text-sm font-mono text-cyan-300 shadow-2xl shadow-blue-950/50 backdrop-blur-xl mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-bold">MUSTAFA KALE • HARİTA MÜHENDİSİ</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">NOVA ZEN MÜHENDİSLİK</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
                Harita Mühendisliğinde <br className="hidden sm:inline" />
                <span className="metallic-blue-text">3 Boyutlu Gelecek:</span> <br />
                <span className="metallic-text">Sayısal Bina Çizimi & Modelleme</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                BIM seviyesinde <strong>3B bina modelleme (3B-SYM)</strong>, <strong>İHA drone fotogrametrisi</strong>, <strong>LIDAR nokta bulutu</strong> ve resmi imar-kadastro projelerinde milimetrik hassasiyet sunuyoruz.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#studyo">
                  <ShimmerButton
                    borderRadius="18px"
                    className="w-full sm:w-auto px-8 py-4 text-sm font-bold shadow-2xl shadow-blue-600/40"
                    background="linear-gradient(135deg, #0052cc 0%, #0066ff 60%, #00d2ff 100%)"
                  >
                    <Box className="w-4 h-4" />
                    <span>3B Stüdyoyu Canlı İnceleyin</span>
                    <ChevronRight className="w-4 h-4 opacity-80" />
                  </ShimmerButton>
                </a>

                <a
                  href="#teklif"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 font-semibold text-sm transition-all text-center shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Projeniz İçin Teklif Alın</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 3D WebGL Real-Time Hero Scene */}
            <div className="relative mt-8">
              <Hero3D />
            </div>

            {/* Stats Ticker */}
            <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((st, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl text-center hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:-translate-y-0.5"
                >
                  <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-400">
                    {st.value}
                  </div>
                  <div className="text-sm font-bold text-white mt-1.5">
                    {st.label}
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {st.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES 21ST.DEV BENTO GRID */}
        <Services />

        {/* 3D DIGITAL ENGINEERING STUDIO */}
        <section className="py-16 sm:py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Studio3D />
          </div>
        </section>

        {/* POINT CLOUD VS 3D MESH COMPARISON */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ComparisonSlider />
        </div>

        {/* PROJECTS SHOWCASE */}
        <ProjectShowcase />

        {/* WORKFLOW & TECHNOLOGY STACK */}
        <WorkflowSection />

        {/* QUOTE CALCULATOR STUDIO */}
        <QuoteCalculator />

        {/* ABOUT MUSTAFA KALE & 3D TILT CARD & FAQ */}
        <AboutSection />

        {/* CONTACT & LOCATION */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating Contact CTAs */}
      <FloatingContact />
    </div>
  );
};

export default App;
