import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, ShieldCheck, Activity } from 'lucide-react';

export const OfflineStatusBanner: React.FC = () => {
  const [showStatus, setShowStatus] = useState(() => 
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => {
      setJustReconnected(true);
      setShowStatus(true);

      // Hide the "reconnected" notification after 4 seconds
      const timer = setTimeout(() => {
        setShowStatus(false);
        setJustReconnected(false);
      }, 4000);

      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setJustReconnected(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-0 inset-x-0 z-[9999] pointer-events-none"
        >
          <div className="max-w-[90rem] mx-auto px-4 py-3 sm:px-12 md:px-20">
            {justReconnected ? (
              // Reconnected Handshake Banner
              <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-emerald-500/30 bg-[#061c14]/95 text-emerald-100 shadow-2xl backdrop-blur-md pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg animate-pulse">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-[10px]">
                    <span className="font-bold text-emerald-400 block uppercase tracking-wider">CONNECTION RESTORED SUCCESSFULLY</span>
                    <span className="text-emerald-500/80 uppercase">SOVEREIGN NETWORK TERMINAL SYNC STABILIZED. COHORT ENGINES SECURE.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 font-mono text-[8px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/20 text-emerald-400">
                  <Activity className="w-2.5 h-2.5 animate-pulse" />
                  <span>ONLINE ACTIVE</span>
                </div>
              </div>
            ) : (
              // Offline Alert Banner
              <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-red-500/30 bg-[#1f0d0d]/95 text-red-100 shadow-2xl backdrop-blur-md pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-red-500/20 text-red-400 rounded-lg animate-bounce">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div className="font-mono text-[10px]">
                    <span className="font-bold text-red-400 block uppercase tracking-wider">WARNING: UNREACHABLE NODE DETECTION</span>
                    <span className="text-red-500/80 uppercase">SYSTEM IS RUNNING IN OFFLINE ISOLATION MODE. CHECK ENVIRONMENT ACCESS INTERFACE.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 font-mono text-[8px] px-2 py-0.5 rounded bg-red-950/80 border border-red-500/20 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>ISOLATED CACHED</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
