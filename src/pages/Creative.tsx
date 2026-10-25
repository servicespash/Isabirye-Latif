import { useState } from 'react';
import { CymaticLayout } from '../components/CymaticLayout';

const STATIC_HEIGHTS = [45, 80, 20, 60, 95, 30, 75, 40, 85, 50, 90, 15, 65, 35, 70, 55, 100, 25, 80, 40];

export const Creative = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <CymaticLayout>
      <div className="space-y-16">
        <header className="border-b border-[var(--color-border)] pb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter text-[var(--color-text-primary)]">CREATIVE EXECUTION</h1>
            <p className="mt-2 text-[var(--color-text-secondary)] font-mono text-sm">SONIC LAB ACTIVE SYNC</p>
        </header>

        {/* Interactive Wave Simulation */}
        <div className="flex flex-col items-center gap-8">
          <div className="flex justify-between items-end gap-1.5 h-32 w-full max-w-3xl">
              {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-sm transition-all duration-300 ${isPlaying ? 'bg-[var(--color-accent)] animate-pulse' : 'bg-[var(--color-border)]'}`} 
                    style={{ height: isPlaying ? `${STATIC_HEIGHTS[i]}%` : '10%' }} 
                  />
              ))}
          </div>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-8 py-3 bg-[var(--color-accent)] text-black font-bold uppercase rounded-full hover:brightness-110 transition-all font-mono text-xs tracking-widest"
          >
            {isPlaying ? 'PAUSE STREAM' : 'INITIALIZE STREAM'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
                <h3 className="font-mono text-sm text-[var(--color-accent)] uppercase tracking-widest mb-4">STUDIO NOTES</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    Currently fine-tuning the modular synthesis engine. The wave simulation represents active telemetry data pulled from the core resonance engine. 
                </p>
            </div>
            <div className="glass-card p-8">
                <h3 className="font-mono text-sm text-[var(--color-accent)] uppercase tracking-widest mb-4">ACTIVE TRACK</h3>
                <p className="text-[var(--color-text-primary)] font-bold">GHETTO ANTHEM VLOG REMIX 01</p>
                <p className="text-[var(--color-text-secondary)] mt-2 font-mono text-xs">BPM: 128 | KEY: Dm</p>
            </div>
        </div>
      </div>
    </CymaticLayout>
  );
};

export default Creative;
