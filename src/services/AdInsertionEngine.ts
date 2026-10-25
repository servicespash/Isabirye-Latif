/**
 * Professional AdInsertionEngine
 * Scans DOM containers dynamically for structural breakpoints (paragraphs, sections, grid items)
 * and injects AdSense units cleanly without UI clutter or layout shifts.
 */

export interface AdInsertionConfig {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  layoutKey?: string;
  frequency?: number; // Inject every N elements
  containerSelector: string;
  targetTag?: string;
  label?: string;
}

export class AdInsertionEngine {
  private static injectedAdsCount = 0;

  /**
   * Scans a container in the DOM and injects responsive ad slots after natural structural intervals.
   */
  public static scanAndInject(config: AdInsertionConfig): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const {
      client = 'ca-pub-6513032451507520',
      slot = '1234567890',
      format = 'auto',
      layoutKey,
      frequency = 3,
      containerSelector,
      targetTag = 'p',
      label = '//_MODULAR_AD_NODE'
    } = config;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const targets = Array.from(container.querySelectorAll(targetTag));
    if (targets.length === 0) return;

    // Iterate through targets at specified frequency intervals
    for (let i = frequency - 1; i < targets.length; i += frequency) {
      const targetElement = targets[i];
      if (!targetElement || targetElement.parentElement !== container) continue;

      // Skip if already has an ad inserted nearby or marked with no-auto-ads
      if (
        targetElement.nextElementSibling?.classList?.contains('dynamic-ad-container') ||
        targetElement.closest('.adsbygoogle-no-auto-ads')
      ) {
        continue;
      }

      this.injectAdNode(targetElement, { client, slot, format, layoutKey, label });
    }
  }

  private static injectAdNode(
    referenceNode: Element,
    options: { client: string; slot: string; format: string; layoutKey?: string; label: string }
  ): void {
    try {
      const adWrapper = document.createElement('div');
      adWrapper.className = 'dynamic-ad-container my-6 p-3 bg-[#090D1A]/60 border border-slate-800/80 rounded-xl overflow-hidden text-center relative adsbygoogle-no-auto-ads';
      adWrapper.setAttribute('data-ad-injected', String(++this.injectedAdsCount));

      const labelDiv = document.createElement('div');
      labelDiv.className = 'text-[8px] font-mono tracking-widest text-slate-500 mb-2 uppercase opacity-60';
      labelDiv.textContent = options.label;
      adWrapper.appendChild(labelDiv);

      const innerBox = document.createElement('div');
      innerBox.className = 'min-h-[90px] w-full flex items-center justify-center bg-black/30 rounded-lg relative overflow-hidden';

      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle w-full block';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', options.client);
      ins.setAttribute('data-ad-slot', options.slot);
      ins.setAttribute('data-ad-format', options.format);
      if (options.layoutKey) {
        ins.setAttribute('data-ad-layout-key', options.layoutKey);
      }
      ins.setAttribute('data-full-width-responsive', 'true');
      innerBox.appendChild(ins);

      const placeholderText = document.createElement('div');
      placeholderText.className = 'absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-[9px] font-mono text-slate-400';
      placeholderText.textContent = '[ADSENSE_RESONANCE_NODE]';
      innerBox.appendChild(placeholderText);

      adWrapper.appendChild(innerBox);

      // Insert cleanly into DOM after reference node
      referenceNode.parentNode?.insertBefore(adWrapper, referenceNode.nextSibling);

      // Safely push to adsbygoogle queue
      if (typeof window !== 'undefined') {
        // @ts-expect-error adsbygoogle is injected by AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.warn('AdInsertionEngine injection warning:', err);
    }
  }
}
