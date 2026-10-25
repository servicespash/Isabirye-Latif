import React, { useEffect } from 'react';
import { AdInsertionEngine, AdInsertionConfig } from '../services/AdInsertionEngine';

interface DynamicAdInjectorProps extends Omit<AdInsertionConfig, 'containerSelector'> {
  containerId: string;
  className?: string;
}

export const DynamicAdInjector: React.FC<DynamicAdInjectorProps> = ({
  containerId,
  client,
  slot,
  format,
  layoutKey,
  frequency = 3,
  targetTag = 'p',
  label = '//_MODULAR_DOM_AD_INJECTION',
  className = ''
}) => {
  useEffect(() => {
    // Run scan and injection after render and DOM mount
    const timer = setTimeout(() => {
      AdInsertionEngine.scanAndInject({
        containerSelector: `#${containerId}`,
        client,
        slot,
        format,
        layoutKey,
        frequency,
        targetTag,
        label
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [containerId, client, slot, format, layoutKey, frequency, targetTag, label]);

  return <div className={`dynamic-ad-anchor relative ${className}`} data-container-target={containerId} />;
};
