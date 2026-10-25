import React, { useState } from 'react';
import { Printer, ExternalLink, HelpCircle } from 'lucide-react';

export const PrintButton = () => {
  const [inIframe] = useState(() => {
    try {
      return typeof window !== 'undefined' && window.self !== window.top;
    } catch {
      return true;
    }
  });
  const [showIframeModal, setShowIframeModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inIframe) {
      setShowIframeModal(true);
      return;
    }

    try {
      window.print();
    } catch (err) {
      console.warn('[Print API Sandbox Blocked]:', err);
      setError('Blocked by sandbox. Open in new tab.');
      setTimeout(() => setError(null), 4000);
    }
  };

  const handleOpenInNewTab = () => {
    setShowIframeModal(false);
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={handlePrint}
        className="kinetic-rail-thick p-3 rounded-full bg-[var(--color-bg-secondary)]/90 backdrop-blur-md text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] border border-neutral-800 transition-all duration-500 pointer-events-auto shrink-0 shadow-xl flex items-center justify-center gap-2"
        title="Print Page (High-Fidelity PDF/Paper Export)"
        id="sovereign-print-trigger"
      >
        <Printer className="w-4 h-4" />
        <span className="hidden md:inline px-1.5 text-[10px] font-bold uppercase tracking-[0.35em]">PRINT</span>
        </button>

        {/* Iframe Safe Fallback Popover */}
        {showIframeModal && (
        <div className="absolute right-0 bottom-full mb-3 w-72 p-4 rounded-xl border border-[var(--color-accent)]/30 bg-[#09090b]/95 backdrop-blur-md text-white shadow-2xl pointer-events-auto z-50 font-mono text-[10px] space-y-3">
          <div className="flex items-start gap-2 text-[var(--color-accent)]">
            <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block uppercase tracking-wider">SANDBOX ISOLATION</span>
              <span className="text-neutral-400 text-[8px] leading-relaxed block">
                Browser sandboxing inside the editor preview iframe prevents calling the native Print/PDF dialog directly.
              </span>
            </div>
          </div>
          
          <div className="text-[8px] text-neutral-500 leading-normal uppercase">
            Major Use: Generates a highly optimized, high-contrast, black-and-white CV/resume print layout from this portfolio, removing interactive elements and adding print-specific section page breaks.
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleOpenInNewTab}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-black font-extrabold text-[9px] uppercase transition-all cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open in New Tab</span>
            </button>
            <button
              onClick={() => setShowIframeModal(false)}
              className="py-1.5 px-2.5 rounded bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 font-bold text-[9px] uppercase transition-all cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute right-0 bottom-full mb-3 w-48 bg-red-950/90 border border-red-500 text-red-200 text-[9px] font-mono p-2 rounded shadow-xl text-center pointer-events-auto z-50">
          {error}
        </div>
      )}
    </div>
  );
};

