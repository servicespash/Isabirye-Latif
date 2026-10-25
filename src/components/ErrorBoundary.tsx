import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CYMATIC_CORE_CRASH:", error, errorInfo);
    // Specifically log the component stack
    console.error("Component Stack:", errorInfo.componentStack);

    // Recover from dynamic import failures or stale module cache by reloading the page
    const errorStr = String(error?.message || error);
    if (
      errorStr.includes('Failed to fetch dynamically imported module') ||
      errorStr.includes('Importing a module script failed') ||
      errorStr.includes('dynamic import') ||
      errorStr.includes('Loading chunk') ||
      errorStr.includes('Cannot read properties of null')
    ) {
      const hasReloadedKey = 'cymatic-chunk-fail-reload';
      const lastReload = sessionStorage.getItem(hasReloadedKey);
      const now = Date.now();
      
      // Prevent infinite reload loops
      if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
        sessionStorage.setItem(hasReloadedKey, String(now));
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => {
            regs.forEach(r => r.unregister());
          });
        }
        if ('caches' in window) {
          caches.keys().then(keys => {
            keys.forEach(k => caches.delete(k));
          });
        }
        console.warn("Stale module or dynamic chunk failure detected. Purging cache and reloading...");
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
    }
  }

  private handleReset = () => {
    sessionStorage.removeItem('cymatic-chunk-fail-reload');
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(r => r.unregister());
      });
    }
    if ('caches' in window) {
      caches.keys().then(keys => {
        keys.forEach(k => caches.delete(k));
      });
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-8 bg-[#050505] text-[var(--color-text-primary)] font-mono selection:bg-red-500 selection:text-white">
          <div className="max-w-xl w-full border border-red-500/20 rounded-2xl p-6 bg-[#090D1A]/60 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-pulse" />
            
            <div className="flex items-center gap-2 text-red-500 text-[10px] tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>[SYSTEM_CRITICAL_FAILURE // CORE_CRASH]</span>
            </div>
            
            <h2 className="text-lg font-black uppercase tracking-tight mb-2">Resonance Realignment Required</h2>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6">
              A dynamic module or routing asset failed to load cleanly. This usually occurs when the infrastructure is redeployed or restarted, causing a stale client-side session.
            </p>

            <div className="p-4 bg-black/40 border border-gray-800 rounded-lg text-[10px] text-red-400 mb-6 overflow-x-auto whitespace-pre-wrap max-h-40 font-mono leading-relaxed">
              {String(this.state.error?.message || this.state.error || 'Unknown operational deviation.')}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
              >
                Reload Context
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[var(--color-text-primary)] rounded-lg border border-gray-800 text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
              >
                Return to Base Command
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

