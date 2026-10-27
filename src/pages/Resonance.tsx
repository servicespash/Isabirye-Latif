import { useState, useEffect } from 'react';
import { CymaticLayout } from '../components/CymaticLayout';
import { ResonanceMap } from '../components/ResonanceMap';
import { CymaticInfrastructureMonitor } from '../components/CymaticInfrastructureMonitor';
import { SubdomainSeoAuditor } from '../components/SubdomainSeoAuditor';
import { Download, ExternalLink, Activity, Users, Check, Zap, Shield, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

interface SyncNode {
  id: string;
  name: string;
  role: string;
  status: 'SYNCHRONIZED' | 'SYNCING' | 'OFFLINE';
  lastPing: string;
  resonanceRating: number;
}

export const Resonance = () => {
  const [activeFrequency, setActiveFrequency] = useState<number>(432);
  const [pulseSpeed, setPulseSpeed] = useState<number>(1.5);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [attendanceNodes, setAttendanceNodes] = useState<SyncNode[]>([
    { id: '1', name: 'Isabirye Latif', role: 'Lead Resonance Architect', status: 'SYNCHRONIZED', lastPing: '0.2ms ago', resonanceRating: 100 },
    { id: '2', name: 'Sophia N.', role: 'Academic Coordinator', status: 'SYNCHRONIZED', lastPing: '1.4ms ago', resonanceRating: 96 },
    { id: '3', name: 'Derrick O.', role: 'Operations Lead', status: 'SYNCING', lastPing: 'Connecting...', resonanceRating: 88 },
    { id: '4', name: 'Sarah K.', role: 'Curriculum Evaluator', status: 'SYNCHRONIZED', lastPing: '4.2ms ago', resonanceRating: 94 },
    { id: '5', name: 'Alex M.', role: 'AI Integration Node', status: 'SYNCHRONIZED', lastPing: '1.1ms ago', resonanceRating: 98 },
  ]);

  const ATTENDANCE_PULSE_DATA = [
    { day: 'MON', rate: 85 },
    { day: 'TUE', rate: 92 },
    { day: 'WED', rate: 88 },
    { day: 'THU', rate: 95 },
    { day: 'FRI', rate: 80 },
  ];

  // Telemetry cycle
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Simulate slight variation in rating or ping speed to feel organic
      setAttendanceNodes((prev) =>
        prev.map((node) => {
          if (node.status === 'OFFLINE') return node;
          
          if (node.id === '3') {
            // Chance to synchronize
            const shouldSync = Math.random() > 0.6;
            return {
              ...node,
              status: shouldSync ? 'SYNCHRONIZED' : 'SYNCING',
              lastPing: shouldSync ? '1.8ms ago' : 'Connecting...',
              resonanceRating: shouldSync ? 91 : Math.floor(80 + Math.random() * 10),
            };
          }

          const ratingVariation = Math.floor((Math.random() - 0.5) * 4);
          const newRating = Math.max(90, Math.min(100, node.resonanceRating + ratingVariation));
          return {
            ...node,
            resonanceRating: newRating,
            lastPing: `${(Math.random() * 5).toFixed(1)}ms ago`,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <CymaticLayout>
      <div className="space-y-16">
        
        {/* HERO HEADER */}
        <header className="border-b border-[var(--color-border)] pb-8 sm:pb-12 pt-2 sm:pt-4 text-left">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-[var(--color-text-primary)] uppercase mt-2 break-words leading-[0.9]">
              Cymatic Resonance
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[var(--color-text-secondary)] font-sans max-w-3xl leading-relaxed">
              The institutional heartbeat for high-performance teams. Providing total operational clarity through real-time attendance tracking and synchronization telemetry—enabling elite organizations to execute with precision.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--color-accent)] text-black rounded-lg sm:rounded-xl font-bold uppercase tracking-widest text-[9px] sm:text-xs hover:opacity-90 transition-all shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]">
                // Deploy_System
                </button>
                <a 
                href="https://github.com/IsabiryeLatif/cymatic-evolution/releases"
                target="_blank"
                rel="noreferrer"
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white/5 border border-[var(--color-border)] rounded-lg sm:rounded-xl font-bold uppercase tracking-widest text-[9px] sm:text-xs hover:border-[var(--color-accent)] transition-all"
                >
                // Download_Console
                </a>
            </div>
          </div>
        </header>

        {/* FEATURES */}
        <section className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Total Clarity', icon: Zap, desc: 'Real-time telemetry showing exactly where focus and resources are distributed.' },
            { title: 'Meeting Orchestration', icon: Target, desc: 'Automated meeting flows that ensure every minute is spent on high-leverage outcomes.' },
            { title: 'Aligned Teams', icon: Users, desc: 'Synchronization engines that keep remote and hybrid teams moving in total unison.' }
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-white/5 border border-[var(--color-border)] rounded-2xl">
              <feature.icon className="w-8 h-8 text-[var(--color-accent)] mb-4" />
              <h3 className="text-xl font-black tracking-tighter mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* DOUBLE COLUMN PANELS */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* PANEL 1: LIVE RESONANCE WAVEFORM & ATTENDANCE SIMULATION */}
          <div className="xl:col-span-7 space-y-8">
            
            {/* OSCILLOSCOPE WAVE SIMULATION */}
            <section className="border border-[var(--color-border)] bg-black/40 p-6 rounded-2xl overflow-hidden relative">
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 px-3 py-1 border border-[var(--color-border)] rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[9px] font-mono text-emerald-400">TELEMETRY_LIVE</span>
              </div>
              
              <h3 className="text-xs font-mono font-bold text-[var(--color-accent)] tracking-widest mb-6 uppercase">
                // RESONANCE_OSCILLOSCOPE
              </h3>

              {/* Dynamic SVG Waveform */}
              <div className="w-full h-40 flex items-center justify-center bg-[#010103]/90 border border-[var(--color-border)]/50 rounded-xl relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  {/* Background Grid */}
                  <defs>
                    <pattern id="wave-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#wave-grid)" />
                  
                  {/* Dynamic Wave 1 */}
                  <path
                    d={`M 0,100 Q 200,${100 - activeFrequency / 5} 400,100 T 800,100`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="3"
                    className="opacity-90"
                    style={{
                      transformOrigin: 'center',
                      animation: `rotate-border ${10 / pulseSpeed}s linear infinite`,
                    }}
                  />
                  
                  {/* Dynamic Wave 2 */}
                  <path
                    d={`M 0,100 C 200,${100 + activeFrequency / 4} 400,${100 - activeFrequency / 3} 600,${100 + activeFrequency / 4} T 800,100`}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-70"
                    style={{
                      transformOrigin: 'center',
                      animation: `rotate-border ${15 / pulseSpeed}s linear infinite`,
                    }}
                  />
                </svg>

                <div className="absolute bottom-4 left-4 flex gap-4 text-[9px] font-mono text-slate-400">
                  <span>FREQ: <strong className="text-white">{activeFrequency} Hz</strong></span>
                  <span>VELOCITY: <strong className="text-white">{pulseSpeed}x</strong></span>
                </div>
              </div>

              {/* Resonance Map */}
              <div className="mt-8">
                <h3 className="text-xs font-mono font-bold text-[var(--color-accent)] tracking-widest mb-4 uppercase">
                  // RESONANCE_NETWORK_MAP
                </h3>
                <ResonanceMap />
              </div>

              {/* INFRASTRUCTURE MONITOR */}
              <div className="mt-8">
                <CymaticInfrastructureMonitor subdomain="resonance.cymatichub.xyz" />
              </div>

              {/* Wave controls */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-2">Tune Frequency: {activeFrequency}Hz</label>
                  <input
                    type="range"
                    min="100"
                    max="800"
                    value={activeFrequency}
                    onChange={(e) => setActiveFrequency(Number(e.target.value))}
                    className="w-full accent-[var(--color-accent)] cursor-pointer bg-slate-800 rounded-lg appearance-none h-1.5"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1">
                    <span>100Hz (Deep)</span>
                    <span>800Hz (Sharp)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-2">Pulse Rate: {pulseSpeed}x</label>
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.1"
                    value={pulseSpeed}
                    onChange={(e) => setPulseSpeed(Number(e.target.value))}
                    className="w-full accent-[#a855f7] cursor-pointer bg-slate-800 rounded-lg appearance-none h-1.5"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-1">
                    <span>0.5x (Subtle)</span>
                    <span>4.0x (Hyper)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 justify-end">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-3 py-1 text-xs font-sans font-semibold rounded uppercase border transition-all ${
                    isSimulating 
                      ? 'border-[#FDE047]/50 text-[#FDE047] bg-[#FDE047]/10' 
                      : 'border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {isSimulating ? 'Pause Simulation' : 'Start Simulation'}
                </button>
              </div>
            </section>

            {/* SYNC BOARD DETAILS */}
            <section className="border border-[var(--color-border)] bg-white/[0.01] p-6 rounded-2xl">
              <h3 className="text-xs font-sans font-bold text-[var(--color-accent)] tracking-wider mb-6 uppercase">
                System Orchestration Features
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-black/25">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-3">
                    <Activity className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-2">Real-Time Clarity</h4>
                  <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                    Zero latency telemetry feeds displaying precise team velocity, meeting structures, and deliverables.
                  </p>
                </div>

                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-black/25">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-2">Sovereign Logins</h4>
                  <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                    Completely decentralized or secure local keys validating credentials for absolute institutional safety.
                  </p>
                </div>

                <div className="p-4 border border-[var(--color-border)] rounded-xl bg-black/25">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-2">Offline Ready</h4>
                  <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                    Maintains full state in secure local databases when connection boundaries drop, auto-syncing on node recovery.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* PANEL 2: DOWNLOAD & COORD CONTROL HUB */}
          <div className="w-full xl:col-span-5 space-y-6">
            
            {/* DOWNLOAD GATEWAY PORTAL */}
            <div className="border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-bg-secondary)]/80 to-[var(--color-bg-primary)] p-6 rounded-3xl shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute -right-16 -bottom-16 w-40 h-40 rounded-full bg-[var(--color-accent)]/10 blur-3xl pointer-events-none"></div>
              
              <div>
                <h3 className="text-sm font-sans font-bold text-[var(--color-accent)] tracking-wide block mb-4 uppercase flex items-center gap-2">
                  <Shield className="w-4 h-4" /> System Authentication Gateway
                </h3>
                <div className="p-4 bg-white/5 rounded-2xl border border-[var(--color-border)]/20 font-mono text-[10px] space-y-2">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-white/40">AUTH_STATUS:</span>
                    <span className="text-green-400 font-bold tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      SECURED
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">CYM_SYNC_CODE:</span>
                    <span className="text-[var(--color-accent)] font-bold">#CYM-8824-XT-992</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-sans font-bold text-white tracking-wide block mb-4 uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[var(--color-accent)]" /> Attendance Pulse Registry
                </h3>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ATTENDANCE_PULSE_DATA}>
                      <Bar dataKey="rate" fill="var(--color-accent)" radius={[4, 4, 0, 0]} opacity={0.8} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={8} stroke="var(--color-text-secondary)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                {/* BUTTON: ENTER LIVE APP */}
                <a
                  href="https://resonance.cymatichub.xyz"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full group px-6 py-4 rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-accent)] text-black font-sans font-bold uppercase text-xs tracking-wider flex items-center justify-between hover:bg-transparent hover:text-[var(--color-accent)] transition-all duration-300 text-center shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)] hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)]"
                >
                  <span>Access Registry Core</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                {/* BUTTON: DOWNLOAD APK */}
                <a
                  href="https://github.com/IsabiryeLatif/cymatic-evolution/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full group px-6 py-4 rounded-2xl border border-[var(--color-border)] bg-white/5 text-[var(--color-text-primary)] font-sans font-bold uppercase text-xs tracking-wider flex items-center justify-between hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all duration-300 text-center"
                >
                  <span>Admin Sync Console</span>
                  <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform text-[var(--color-accent)]" />
                </a>
              </div>
            </div>

            {/* CYM SYNC PROTOCOL LOGIC INFO */}
            <div className="p-6 rounded-3xl border border-dashed border-[var(--color-border)]/30 bg-black/40 backdrop-blur-md">
                <h4 className="text-[10px] font-mono font-bold uppercase text-[var(--color-accent)] mb-2 tracking-[0.2em]">Institutional Sync Protocol</h4>
                <p className="text-[10px] text-[var(--color-text-secondary)] font-mono leading-relaxed italic opacity-70">
                  Data integrity is verified via the CYM Synchronization Code. Attendance pulses are recorded in real-time and mirrored across the institutional node network for absolute registry clarity.
                </p>
            </div>

            <SubdomainSeoAuditor subdomain="resonance.cymatichub.xyz" />

            {/* LIVE ATTENDANCE MONITOR TELEMETRY */}
            <div className="border border-[var(--color-border)] bg-black/20 p-6 rounded-2xl overflow-hidden">
              <h3 className="text-xs font-mono font-bold text-slate-400 tracking-widest block mb-4 uppercase">
                // TEAM_SYNCHRONIZATION_MONITOR
              </h3>
              
              <div className="space-y-3">
                {attendanceNodes.map((node) => (
                  <div 
                    key={node.id} 
                    className="p-3 border border-[var(--color-border)]/50 rounded-xl bg-black/10 flex items-center justify-between transition-all duration-300 hover:border-[var(--color-accent)]/45"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase truncate">{node.name}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          node.status === 'SYNCHRONIZED' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                        }`} />
                      </div>
                      <span className="text-[9px] text-[var(--color-text-secondary)] block uppercase mt-0.5">{node.role}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center justify-end space-x-1">
                        <span className="text-[9px] font-mono text-slate-400 uppercase">{node.status}</span>
                        {node.status === 'SYNCHRONIZED' && <Check className="w-3 h-3 text-emerald-400" />}
                      </div>
                      <span className="text-[8px] font-mono text-[var(--color-accent)] mt-0.5 block">{node.lastPing}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </CymaticLayout>
  );
};

export default Resonance;
