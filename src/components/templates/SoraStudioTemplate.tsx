import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SoraStudioTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-widest text-sm uppercase text-purple-400">Sora Studio</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <a href="#work" className="hover:text-white transition-colors">Selected Work</a>
          <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#contact" className="hover:text-white transition-colors">Inquire</a>
        </nav>
        <Link to="/showcase" className="text-xs font-mono text-neutral-400 hover:text-white">← Showcase Directory</Link>
      </header>

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="max-w-4xl space-y-8 relative z-10">
          <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono tracking-[0.3em] uppercase">
            Spatial Architecture & Digital Art
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">
            Minimal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Exhibition</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Sora Studio constructs immersive digital environments and spatial brand narratives for world-class artists, architects, and visionaries.
          </p>
          <div className="pt-4 flex justify-center gap-6">
            <a href="#work" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2">
              Explore Archive <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-12 px-8 flex justify-between items-center text-xs font-mono text-neutral-500">
        <span>© 2026 Sora Studio. All rights reserved.</span>
        <Link to="/showcase" className="text-purple-400 hover:underline">Portfolio Showcase</Link>
      </footer>
    </div>
  );
};
