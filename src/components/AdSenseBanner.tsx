import React, { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  client = 'ca-pub-6513032451507520',
  slot = '1234567890',
  format = 'auto',
  layoutKey,
  className = '',
  style = {},
  label = '//_MONETIZATION_NODE_ADSENSE'
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error adsbygoogle is injected by AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense push error:', err);
    }
  }, []);

  return (
    <div className={`my-4 p-3 bg-[var(--color-bg-secondary)]/30 border border-[var(--color-border)] rounded-xl overflow-hidden text-center relative adsbygoogle-no-auto-ads ${className}`} style={style}>
      <div className="text-[8px] font-mono tracking-widest text-[var(--color-text-secondary)] mb-2 uppercase opacity-60">
        {label}
      </div>
      <div className="min-h-[90px] w-full flex items-center justify-center bg-black/20 rounded-lg relative">
        <ins
          ref={adRef}
          className="adsbygoogle w-full block"
          style={{ display: 'block', ...style }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          data-full-width-responsive="true"
        />
        {/* Fallback indicator in preview / development before ad loads */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-[10px] font-mono text-[var(--color-text-secondary)]">
          [ADSENSE_RESONANCE_SLOT]
        </div>
      </div>
    </div>
  );
};
