import React, { useState } from 'react';
import { useHubService } from '../hooks/useHubService';

export const HubPortal: React.FC = () => {
  const { projects, chatMessages, sendMessage, submitProject } = useHubService();
  const [input, setInput] = useState('');

  return (
    <div className="grid grid-cols-12 gap-4 text-[var(--color-text-primary)]">
      
      {/* PBL TRACKER */}
      <section className="col-span-12 lg:col-span-7 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/10 backdrop-blur-md">
        <h2 className="text-lg font-sans font-bold uppercase tracking-tight mb-4">Active Projects</h2>
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
              <h3 className="font-bold text-sm">{p.title}</h3>
              <p className="text-[10px] text-[var(--color-text-secondary)]">{p.description}</p>
              
              <div className="mt-2 flex items-center justify-between">
                <button 
                  onClick={() => submitProject(p.id)}
                  disabled={!!p.status}
                  className={`px-3 py-1 font-bold uppercase text-[9px] rounded-lg transition-all ${
                    p.status ? 'bg-gray-500 cursor-not-allowed' : 'bg-[var(--color-accent)] text-black hover:brightness-110'
                  }`}
                >
                  {p.status ? `Status: ${p.status.toUpperCase()}` : 'Submit'}
                </button>
                {p.grade && <span className="font-mono text-[10px] text-[var(--color-accent)]">Grade: {p.grade}%</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI CHAT MONITOR */}
      <section className="col-span-12 lg:col-span-5 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)]/10 backdrop-blur-md flex flex-col h-[400px]">
        <h2 className="text-lg font-sans font-bold uppercase tracking-tight mb-4">AI Tutor Monitor</h2>
        <div className="flex-1 overflow-y-auto space-y-2 mb-3">
          {chatMessages.map(m => (
            <div key={m.id} className={`p-2 rounded-lg text-[11px] ${m.sender === 'student' ? 'bg-[var(--color-accent)]/20 ml-auto' : 'bg-white/10'}`}>
              {m.content}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 bg-white/5 border border-[var(--color-border)] rounded-lg text-[11px]"
            placeholder="Ask..."
          />
          <button onClick={() => { sendMessage(input); setInput(''); }} className="px-3 bg-[var(--color-accent)] text-black font-bold rounded-lg text-[11px]">Send</button>
        </div>
      </section>
    </div>
  );
};
