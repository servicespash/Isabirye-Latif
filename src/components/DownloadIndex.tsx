import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Download } from 'lucide-react';

interface DownloadLog {
  appType: string;
  version: string;
  timestamp: string;
}

interface Release {
  tag_name: string;
  published_at: string;
}

export const DownloadIndex: React.FC = () => {
  const [downloads, setDownloads] = useState<Record<string, number>>({});
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const path = 'downloads';
      try {
        const [downloadsSnap, releasesRes] = await Promise.all([
          getDocs(collection(db, path)),
          fetch('/api/v1/releases')
            .then(res => {
              if (!res.ok) return [];
              return res.json().catch(() => []);
            })
            .catch(() => [])
        ]);

        const counts: Record<string, number> = {};
        downloadsSnap.forEach((doc) => {
          const data = doc.data() as DownloadLog;
          const key = `${data.appType}-${data.version}`;
          counts[key] = (counts[key] || 0) + 1;
        });
        setDownloads(counts);
        
        if (Array.isArray(releasesRes)) {
          setReleases(releasesRes.map(r => ({
            tag_name: r.tag_name,
            published_at: new Date(r.published_at).toLocaleDateString()
          })));
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-12 p-6 glass-card border border-[var(--color-border)] rounded-3xl animate-pulse">
        <div className="h-4 w-48 bg-white/10 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-8 bg-white/5 rounded"></div>
          <div className="h-8 bg-white/5 rounded"></div>
          <div className="h-8 bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-12 space-y-8">
      {/* Latest Release Quick Access */}
      {releases.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['study', 'resonance'].map((app) => (
            <div key={app} className="p-6 rounded-3xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold text-[var(--color-accent)] uppercase tracking-widest">
                  LATEST RELEASE STABLE
                </h4>
                <span className="text-[10px] font-mono text-white/40">{releases[0].tag_name}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                Deploy the latest high-compliance binary for {app === 'study' ? 'Educational Synchronization' : 'Institutional Telemetry'}.
              </p>
              <a 
                href={`/api/v1/download?appType=${app}&version=${releases[0].tag_name}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-black font-mono text-[10px] font-bold rounded-xl uppercase tracking-tighter hover:bg-[var(--color-accent)]/80 transition-all active:scale-95"
              >
                <Download className="w-3 h-3" />
                Download V{releases[0].tag_name}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Historical Release Index */}
      <div className="p-6 glass-card border border-[var(--color-border)] rounded-3xl overflow-hidden">
        <h3 className="text-sm font-black text-white uppercase tracking-tight mb-6">DOWNLOAD METRICS INDEX</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px] text-slate-400 min-w-[500px]">
            <thead>
              <tr className="border-b border-white/10 uppercase">
                <th className="p-3">Version</th>
                <th className="p-3">Release Date</th>
                <th className="p-3">Study Downloads</th>
                <th className="p-3">Resonance Downloads</th>
              </tr>
            </thead>
            <tbody>
              {releases.length > 0 ? (
                releases.map((release) => (
                  <tr key={release.tag_name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-3 text-white font-bold">{release.tag_name}</td>
                    <td className="p-3">{release.published_at}</td>
                    <td className="p-3">
                      <span className="text-cyan-400 font-bold">{downloads[`study-${release.tag_name}`] || 0}</span>
                    </td>
                    <td className="p-3">
                      <span className="text-purple-400 font-bold">{downloads[`resonance-${release.tag_name}`] || 0}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 italic">
                    No verified releases found in registry.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
