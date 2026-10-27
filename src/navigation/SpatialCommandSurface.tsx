import React from 'react';
import { Link } from 'react-router-dom';

interface SpatialCommandSurfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpatialCommandSurface: React.FC<SpatialCommandSurfaceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] w-screen h-screen bg-[var(--color-bg-primary)]/98 backdrop-blur-3xl p-6 md:p-16 flex flex-col justify-between pointer-events-auto overflow-y-auto transition-all duration-500">
      
      {/* 1. MASTER SURFACE CONTROL BAR */}
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto border-b border-[var(--color-border)] pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-sans font-semibold tracking-widest text-[#00f2fe] uppercase">System Orbital Navigation</span>
          <span className="text-[9px] font-mono text-[var(--color-text-secondary)] uppercase">Latif Architect Core</span>
        </div>
        <button 
          onClick={onClose}
          className="px-6 py-2 rounded-full border border-[var(--color-border)] text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-primary)] hover:border-[#00f2fe] hover:text-[#00f2fe] transition-all duration-300"
        >
          Close Matrix
        </button>
      </div>

      {/* 2. THE MAIN PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto my-auto py-12">
        
        {/* HOME */}
        <Link to="/" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#00f2fe] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#00f2fe] mb-2 tracking-widest">NODE 01</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Home</h3>
        </Link>

        {/* ORIGIN (Manifesto) */}
        <Link to="/manifesto" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#4facfe] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#4facfe] mb-2 tracking-widest">NODE 02</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Origin</h3>
        </Link>

        {/* PROJECTS */}
        <Link to="/projects" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#7f00ff] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#7f00ff] mb-2 tracking-widest">NODE 03</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Projects</h3>
        </Link>

        {/* CREATIVES */}
        <Link to="/creatives" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#00f2fe] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#00f2fe] mb-2 tracking-widest">NODE 04</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Creatives</h3>
        </Link>

        {/* LEARNING */}
        <Link to="/learning" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#4facfe] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#4facfe] mb-2 tracking-widest">NODE 05</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Learning</h3>
        </Link>

        {/* SOCIALS */}
        <Link to="/socials" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#7f00ff] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#7f00ff] mb-2 tracking-widest">NODE 06</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Socials</h3>
        </Link>

        {/* CYMATIC STUDY */}
        <Link to="/study" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#00f2fe] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#00f2fe] mb-2 tracking-widest">NODE 07</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Cymatic Study</h3>
        </Link>

        {/* CYMATIC RESONANCE */}
        <Link to="/resonance" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#a855f7] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#a855f7] mb-2 tracking-widest">NODE 08</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Cymatic Resonance</h3>
        </Link>

        {/* TWIN ENGINES */}
        <Link to="/twin-engines" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#00f2fe] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#00f2fe] mb-2 tracking-widest">NODE 09</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Twin Engines</h3>
        </Link>

        {/* SETTINGS */}
        <Link to="/settings" onClick={onClose} className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30 hover:border-[#f59e0b] transition-all duration-500">
          <div className="text-[9px] font-mono text-[#f59e0b] mb-2 tracking-widest">NODE 10</div>
          <h3 className="text-2xl font-bold uppercase tracking-wider text-[var(--color-text-primary)] group-hover:translate-x-2 transition-transform duration-300">Settings</h3>
        </Link>
      </div>

      {/* 3. FOOTER SIGN-OFF SYSTEM */}
      <div className="w-full max-w-7xl mx-auto border-t border-[var(--color-border)] pt-6 flex justify-between items-center text-[9px] font-mono text-[var(--color-text-secondary)] uppercase tracking-widest">
        <span>Staging Node | Kampala Core</span>
        <span>© 2026 ISABIRYE LATIF</span>
      </div>

    </div>
  );
};
