import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CymaticLayout } from '../components/CymaticLayout';
import { SystemHeartbeat } from '../components/SystemHeartbeat';
import { FAQ } from '../components/FAQ';
import { useStats } from '../hooks/useStats';
import { Activity, ExternalLink, ArrowRight, Cpu, Globe, GraduationCap, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { tsParticles } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

export default function Home() {
  const { stats } = useStats();

  useEffect(() => {
    loadSlim(tsParticles).then(() => {
      tsParticles.load("tsparticles", {
        particles: {
          number: { value: 80 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 2 },
          move: { enable: true, speed: 1, direction: "none", random: false, straight: false, outModes: "out" },
          links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 }
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 100, duration: 0.4 } }
        },
        background: { color: "transparent" }
      });
    });
  }, []);

  return (
    <CymaticLayout>
      <div id="tsparticles" className="fixed inset-0 -z-10" />
      <div className="w-full space-y-16 py-4">
        
        {/* HERO: THE ARCHITECT'S MANIFESTO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-[var(--color-accent)] text-xs font-semibold tracking-wider uppercase">
              Cymatic Engines Evolution Identity Verified
            </motion.div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Isabirye Latif<br/>
              <span className="italic font-normal text-[var(--color-text-secondary)] text-2xl md:text-3xl">Solo Architect of Evolution.</span>
            </h1>
            <div className="space-y-6 border-l-2 border-[var(--color-accent)] pl-6">
              <p className="font-sans text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                Engineering the Cymatic Engines Evolution ecosystem. I orchestrate purposeful digital environments that transform complex operational challenges into unified, intentional realities through uncompromising technical execution and architectural resilience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/study" className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-xl font-bold uppercase tracking-wider text-xs hover:opacity-90 transition-all shadow-md">
                  Access Cymatic Study
                </Link>
                <Link to="/resonance" className="px-6 py-3 bg-white/5 border border-[var(--color-border)] rounded-xl font-bold uppercase tracking-wider text-xs hover:border-[var(--color-accent)] transition-all">
                  Explore Cymatic Resonance
                </Link>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="border border-[var(--color-border)] p-2 shadow-2xl"
          >
            <img src="/media/photo1.png" alt="Isabirye Latif - Solo Architect" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" referrerPolicy="no-referrer" />
          </motion.div>
        </section>

        {/* SITE STATISTICS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border border-[var(--color-border)] rounded-2xl bg-[var(--color-bg-secondary)]/10">
          <div className="text-center space-y-2">
            <div className="text-3xl font-mono font-bold text-[var(--color-accent)]">{stats.visitors}</div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">Visitors</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-mono font-bold text-[var(--color-accent)]">{stats.views}</div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">Views</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-mono font-bold text-[var(--color-accent)]">{stats.downloads}</div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">Downloads</div>
          </div>
        </section>

        {/* THE TWIN ENGINES OF CYMATIC EVOLUTION */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-mono text-[9px] uppercase tracking-wider"
            >
              <Cpu className="w-3 h-3 animate-pulse text-cyan-400" />
              <span>Sovereign Architecture Integration</span>
            </motion.div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              The Twin Engines
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans max-w-2xl mx-auto">
              Our ecosystem is powered by two distinct, specialized operational engines. Cymatic Study orchestrates syllabus tracking and learning sync, while Cymatic Resonance registers precision attendance and tracks collective team energy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ENGINE A: CYMATIC HUB */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group p-8 rounded-3xl border border-cyan-500/20 bg-black/40 hover:bg-cyan-950/5 backdrop-blur-xl relative flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-300" />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/25">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-cyan-400 block tracking-widest">// SYSTEM_NODE_01</span>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">Cymatic Study</h3>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The primary study register and syllabus node router. Students and educators track Project-Based Learning (PBL) benchmarks and synchronize academic progress in a secure environment.
                </p>

                {/* Micro simulator */}
                <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/15 space-y-2.5 font-mono text-[10px]">
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-1.5">
                    <span>Target Syllabus:</span>
                    <span className="text-cyan-400 font-bold uppercase">S3 Biology & Math</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 border-b border-white/5 pb-1.5">
                    <span>Interactive PBL Nodes:</span>
                    <span className="text-emerald-400 font-bold">100% Offline-Synced</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Task Registry Stream:</span>
                    <span className="text-yellow-400 font-bold">Live Sync Enabled</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block">// Core Blueprints</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5 p-2 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      <span>Syllabus Router</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                      <span>PBL Metrics</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-8">
                <Link 
                  to="/study" 
                  className="px-6 py-3 bg-cyan-500 text-black font-mono text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-cyan-400 text-center flex items-center justify-center gap-2 transition-all active:scale-95 flex-1"
                >
                  <span>Access Study Node</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a 
                  href="https://study.cymatichub.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  referrerPolicy="no-referrer"
                  className="px-6 py-3 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-cyan-400/10 text-center flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>study.cymatichub.xyz</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400/50" />
                </a>
              </div>
            </motion.div>

            {/* ENGINE B: CYMATIC RESONANCE */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="group p-8 rounded-3xl border border-purple-500/20 bg-black/40 hover:bg-purple-950/5 backdrop-blur-xl relative flex flex-col justify-between transition-all duration-300 hover:border-purple-400/40"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-all duration-300" />
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/25">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-purple-400 block tracking-widest">// SYSTEM_NODE_02</span>
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">Cymatic Resonance</h3>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The institutional pulse and team telemetry grid. Precision attendance registration, operational team velocity monitoring, and sound frequency alignment simulations to foster resonance.
                </p>

                {/* Wave simulator */}
                <div className="p-4 rounded-xl bg-black/50 border border-purple-500/15 space-y-2.5 font-mono text-[10px]">
                  <div className="h-10 flex items-center justify-center relative border-b border-white/5 pb-1.5 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 300 40" preserveAspectRatio="none">
                      <path
                        d="M 0,20 Q 75,-5 150,20 T 300,20"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                      <path
                        d="M 0,20 C 75,35 150,5 225,35 T 300,20"
                        fill="none"
                        stroke="#c084fc"
                        strokeWidth="0.75"
                        strokeDasharray="2 2"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Alignment Frequency:</span>
                    <span className="text-purple-400 font-bold uppercase">432Hz - 528Hz</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Registry Cryptography:</span>
                    <span className="text-emerald-400 font-bold">Local-First Handshake</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold block">// Core Blueprints</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5 p-2 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle className="w-3 h-3 text-purple-400" />
                      <span>Clarity Registry</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-2 bg-white/5 rounded-lg border border-white/5">
                      <CheckCircle className="w-3 h-3 text-purple-400" />
                      <span>Wave Oscilloscope</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-8">
                <Link 
                  to="/resonance" 
                  className="px-6 py-3 bg-purple-600 text-white font-mono text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-purple-500 text-center flex items-center justify-center gap-2 transition-all active:scale-95 flex-1"
                >
                  <span>View Resonance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a 
                  href="https://resonance.cymatichub.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  referrerPolicy="no-referrer"
                  className="px-6 py-3 border border-purple-500/30 text-purple-400 font-mono text-[10px] font-bold rounded-xl uppercase tracking-wider hover:bg-purple-400/10 text-center flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>resonance.cymatichub.xyz</span>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400/50" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="border-t border-[var(--color-border)] pt-16">
          <FAQ />
        </section>

        <section className="border-t border-[var(--color-border)] pt-20">
          <SystemHeartbeat />
        </section>
      </div>
    </CymaticLayout>
  );
}
