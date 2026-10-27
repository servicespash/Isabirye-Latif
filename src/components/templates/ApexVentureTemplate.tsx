import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ApexVentureTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-neutral-950 font-black text-xl">
              AV
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block text-white">Apex Venture</span>
              <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase">Strategic Advisory & Capital</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#insights" className="hover:text-white transition-colors">Insights</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/showcase" className="text-xs font-mono text-neutral-400 hover:text-white">← Back to Showcase</Link>
            <button className="px-5 py-2.5 bg-amber-500 text-neutral-950 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all">
              Client Portal
            </button>
          </div>
        </div>
      </header>

      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">
            <TrendingUp className="w-4 h-4" /> Enterprise Valuation & Scaling
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Unlocking Growth Through <span className="text-amber-500">Rigorous Strategy</span>
          </h1>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
            Apex Venture advises market-leading enterprises and high-growth funds on transformative mergers, capital allocation, and operational excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-amber-500 text-neutral-950 rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-all flex items-center gap-2">
              Schedule Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Active Mandates</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-white">Series C Expansion Round</h4>
                <p className="text-xs text-neutral-400">Fintech Infrastructure • $45M Target</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">85% Funded</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-white">Cross-Border M&A Advisory</h4>
                <p className="text-xs text-neutral-400">Logistics & Supply Chain • $120M Val</p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Due Diligence</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-800 bg-neutral-950 py-12 text-center text-xs font-mono text-neutral-500">
        © 2026 Apex Venture. All rights reserved. • <Link to="/showcase" className="text-amber-500 hover:underline">Portfolio Showcase</Link>
      </footer>
    </div>
  );
};
