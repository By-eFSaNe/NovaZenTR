import React, { useState } from 'react';
import { PROJECTS, ProjectItem, CONTACT_INFO } from '../data/engineeringData';
import { Sparkles, ArrowRight, MapPin, Ruler } from 'lucide-react';
import { AnimatedTabs } from './ui/animated-tabs';

export const ProjectShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'all' | '3d-building' | 'drone' | 'lidar'>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem>(PROJECTS[0]);

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projeler" className="py-24 sm:py-32 relative bg-[#070b14] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/60 border border-nova-500/40 text-xs font-mono text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UYGULAMA & PROJE PORTFOLYOSU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Seçkin 3B Modelleme ve Harita Projeleri
            </h2>
          </div>

          {/* Filter Tabs using AnimatedTabs */}
          <AnimatedTabs
            activeTab={filter}
            onChange={(id) => setFilter(id as any)}
            tabs={[
              { id: 'all', label: 'Tüm Projeler' },
              { id: '3d-building', label: '3B Bina & BIM' },
              { id: 'drone', label: 'İHA Fotogrametri' },
              { id: 'lidar', label: 'Lazer & Kübaj' },
            ]}
          />
        </div>

        {/* Featured Project Showcase & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Selected Project Hero (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0a0f1d] border border-slate-800 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="relative h-64 sm:h-84 rounded-2xl overflow-hidden mb-6 border border-slate-700/80 group">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-bold backdrop-blur-xl shadow-lg">
                  {activeProject.categoryLabel}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300 backdrop-blur-xl shadow-lg">
                  {activeProject.accuracy}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-nova-400 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeProject.location}</span>
                <span>•</span>
                <Ruler className="w-3.5 h-3.5" />
                <span>{activeProject.area}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{activeProject.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">{activeProject.description}</p>

              {/* Stats pill list */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6">
                {activeProject.stats.map((st, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xs text-slate-400 font-mono">{st.label}</div>
                    <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono mt-0.5">{st.value}</div>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.deliverables.map((del, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {del}
                    </span>
                  ))}
                </div>

                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
                >
                  <span>Benzer Proje Teklifi Al</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Project List / Thumbnails (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {filteredProjects.map((p) => {
              const isActive = activeProject.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setActiveProject(p)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isActive
                      ? 'bg-[#0f172a] border-cyan-500/70 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/50'
                      : 'bg-[#0a0f1d]/70 hover:bg-[#0d1424] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-700">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                        {p.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{p.area}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white truncate">{p.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{p.location}</p>

                    <div className="mt-2 text-[11px] font-mono text-emerald-400 font-medium">
                      {p.accuracy}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
