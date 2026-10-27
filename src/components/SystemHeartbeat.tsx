import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSystemTelemetry } from '../hooks/useSystemTelemetry';

const Metric: React.FC<{ label: string; value: string | number; unit?: string; trigger: boolean }> = ({ label, value, unit, trigger }) => (
  <div className={`flex flex-col border-b border-[var(--color-border)] pb-2 mb-2 transition-all duration-300 ${trigger ? 'scale-105 text-[var(--color-accent)]' : ''}`}>
    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">{label}</span>
    <div className="font-mono text-xl font-black text-[var(--color-text-primary)]">
      {value}<span className="text-xs font-normal ml-1 text-[var(--color-accent)]">{unit}</span>
    </div>
  </div>
);

export const SystemHeartbeat: React.FC = () => {
  const { latency, nodeEfficiency, syncPulse, uptime } = useSystemTelemetry();
  const location = useLocation();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setTrigger(true), 0);
    const endTimer = setTimeout(() => setTrigger(false), 300);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [location]);

  return (
    <div className="glass-card p-6 w-full max-w-sm rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">System Heartbeat</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase text-[var(--color-text-secondary)]">Operational</span>
        </div>
      </div>
      <Metric label="Latency" value={latency} unit="ms" trigger={trigger} />
      <Metric label="Node Efficiency" value={nodeEfficiency} unit="%" trigger={trigger} />
      <Metric label="Sync Pulse" value={syncPulse} unit="Hz" trigger={trigger} />
      <Metric label="Uptime" value={uptime} trigger={trigger} />
    </div>
  );
};
