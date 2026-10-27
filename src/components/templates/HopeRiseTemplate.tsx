import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HopeRiseTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50 font-sans selection:bg-emerald-500 selection:text-white">
      <header className="sticky top-0 z-50 bg-emerald-950/85 backdrop-blur-md border-b border-emerald-900/50 px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-emerald-950 font-black">
            HR
          </div>
          <span className="font-bold tracking-tight text-lg text-white">Hope Rise Foundation</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-emerald-300">
          <a href="#mission" className="hover:text-white transition-colors">Mission</a>
          <a href="#initiatives" className="hover:text-white transition-colors">Initiatives</a>
          <a href="#impact" className="hover:text-white transition-colors">Impact Report</a>
        </nav>
        <Link to="/showcase" className="text-xs font-mono text-emerald-300 hover:text-white">← Showcase Directory</Link>
      </header>

      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
            <Globe className="w-4 h-4" /> Global Community Development
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Empowering Communities Through <span className="text-emerald-400">Sustainable Aid</span>
          </h1>
          <p className="text-emerald-200/80 text-base md:text-lg leading-relaxed">
            Hope Rise connects donors directly with grassroots community projects, ensuring 100% transparency, measurable impact, and lasting empowerment.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-emerald-500 text-emerald-950 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-emerald-400 transition-all shadow-xl flex items-center gap-2">
              Support Initiative <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-emerald-900/40 border border-emerald-800/60 space-y-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Active Relief Metric</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-900">
              <div className="text-3xl font-black text-emerald-400">14.2M</div>
              <div className="text-xs text-emerald-300 font-mono uppercase mt-1">Meals Delivered</div>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-900">
              <div className="text-3xl font-black text-emerald-400">99.8%</div>
              <div className="text-xs text-emerald-300 font-mono uppercase mt-1">Direct Allocation</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-emerald-900/50 bg-emerald-950 py-12 px-8 flex justify-between items-center text-xs font-mono text-emerald-400/60">
        <span>© 2026 Hope Rise Foundation. All rights reserved.</span>
        <Link to="/showcase" className="text-emerald-300 hover:underline">Portfolio Showcase</Link>
      </footer>
    </div>
  );
};
