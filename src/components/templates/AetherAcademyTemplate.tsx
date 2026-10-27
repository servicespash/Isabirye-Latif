import React from 'react';
import { BookOpen, Award, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AetherAcademyTemplate: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30">
              AA
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block text-white">Aether Academy</span>
              <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">Higher Education & Research</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#academics" className="hover:text-white transition-colors">Academics</a>
            <a href="#research" className="hover:text-white transition-colors">Research</a>
            <a href="#admissions" className="hover:text-white transition-colors">Admissions</a>
            <a href="#campus" className="hover:text-white transition-colors">Campus Life</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/showcase" className="text-xs font-mono text-slate-400 hover:text-white">← Back to Showcase</Link>
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
              Apply Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/40 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" /> Accredited Institution of Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Shaping Tomorrow's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Pioneers & Scholars</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-sans">
              Welcome to Aether Academy, where rigorous academic inquiry meets cutting-edge technological innovation. Explore world-class programs designed for future leaders.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2">
                Explore Programs <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl font-bold uppercase tracking-wider text-xs hover:border-slate-700 transition-all">
                Virtual Campus Tour
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-video md:aspect-square rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop" 
                alt="Aether Academy Campus"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Fall Semester Enrollment</h4>
                  <p className="text-xs text-slate-400">Applications open for undergraduate & graduate tracks</p>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 border-y border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-black text-white">99.4%</div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Graduate Placement</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-black text-white">45:1</div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Research Grants ($M)</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-black text-white">120+</div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Global Partners</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-black text-white">14:1</div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">Student-Faculty Ratio</div>
          </div>
        </div>
      </section>

      {/* Academic Pillars */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-blue-400">Faculties of Distinction</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Rigorous Programs Built for Impact</h3>
          <p className="text-slate-400 text-sm">Choose from world-class disciplines engineered to solve complex global challenges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 hover:border-blue-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Computer Science & AI</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Advanced machine learning, distributed systems, and quantum computing laboratories.</p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> AI Ethics & Governance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Neural Architecture Labs</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 hover:border-blue-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Quantum Economics</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Financial modeling, sovereign monetary design, and behavioral game theory.</p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Macro-Model Simulations</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Empirical Trade Analysis</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 hover:border-blue-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Biosystems Engineering</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Synthetic biology, genetic sequencing, and regenerative environmental systems.</p>
            <ul className="space-y-2 pt-2 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Clean Energy Bio-Reactors</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cellular Regeneration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-mono text-slate-500">
            © 2026 Aether Academy. Powered by Cymatic Architecture.
          </div>
          <Link to="/showcase" className="text-xs font-mono text-blue-400 hover:underline">
            Return to Isabirye Latif Portfolio Showcase
          </Link>
        </div>
      </footer>
    </div>
  );
};
