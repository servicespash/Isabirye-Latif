import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface GatewayCardProps {
  title: string;
  narrative: string;
  functionality: string;
  intent: string;
  path: string;
  actionText: string;
}

export const GatewayCard: React.FC<GatewayCardProps> = ({ 
  title, narrative, functionality, intent, path, actionText 
}) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/10 backdrop-blur-xl shadow-xl flex flex-col justify-between"
    >
      <div className="space-y-4">
        <h3 className="text-3xl font-black uppercase tracking-tighter text-[var(--color-text-primary)]">{title}</h3>
        
        <div className="space-y-3">
          <p className="text-sm font-sans italic text-[var(--color-text-secondary)]">"{narrative}"</p>
          <div className="border-t border-[var(--color-border)] pt-4 space-y-2">
            <p className="text-xs font-sans font-semibold uppercase text-[var(--color-accent)] tracking-wide">Function</p>
            <p className="text-sm text-[var(--color-text-primary)]">{functionality}</p>
          </div>
          <div className="pt-2 space-y-2">
            <p className="text-xs font-sans font-semibold uppercase text-[var(--color-accent)] tracking-wide">Intent</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{intent}</p>
          </div>
        </div>
      </div>

      <Link 
        to={path}
        className="mt-8 inline-block w-full py-4 text-center border border-[var(--color-accent)] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-accent)] hover:text-black transition-all"
      >
        {actionText}
      </Link>
    </motion.div>
  );
};
