import React from 'react';
import { motion } from 'motion/react';
import { CymaticSEO } from './CymaticSEO';
import { useCymaticTheme } from '../context/ThemeContext';
import { Navbar } from './Navbar';
import { CymaticFooter } from './CymaticFooter';
import { RepoRail } from './RepoRail';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { ResonanceAtmosphere } from './ResonanceAtmosphere';

import { Breadcrumbs } from './Breadcrumbs';
import { ReadingTimeBadge } from './ReadingTimeBadge';

const UIFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useCymaticTheme();

  return (
    <div 
      className={`relative h-screen w-full flex flex-col overflow-x-hidden ${theme}`}
    >
      
      {/* ATMOSPHERIC BACKGROUND SYSTEM */}
      <div className="fixed inset-0 z-0 pointer-events-none print-hidden">
        <ResonanceAtmosphere />
      </div>

      {/* STICKY NAVIGATION */}
      <div className="sticky top-0 w-full z-[100] pb-4 bg-[var(--color-bg-primary)]/5 backdrop-blur-sm print-hidden">
        <Navbar />
      </div>
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* SIDEBAR */}
        <aside className="hidden md:block w-20 shrink-0 border-r border-[var(--color-border)]/50 overflow-y-auto">
          <RepoRail />
        </aside>

        {/* FLUID EDITORIAL CONTAINER */}
        <main className="flex-1 w-full pt-4 pb-20 px-2 sm:px-4 md:px-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full bg-[var(--color-bg-secondary)]/10 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
            <div className="w-full tracking-normal antialiased">
              {/* PRINT-ONLY OFFICIAL HEADER */}
              <div className="print-header">
                <div className="print-header-brand">
                  <h1>Isabirye Latif // Cymatic Engines Evolution</h1>
                  <p>Solo Architect & Systems Infrastructure</p>
                </div>
                <div className="print-header-meta">
                  <p>VERIFIED ARCHITECTURAL NODE</p>
                  <p>https://cymatichub.xyz</p>
                  <p>EXPORT DATE: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
              </div>

              <Breadcrumbs />
              <ReadingTimeBadge content={children} />
              {children}
              
              <div className="print-footer">
                <div className="print-footer-info">
                  <p><strong>Isabirye Latif (Latty Adams)</strong></p>
                  <p>Solo Architect & Resonance Engineer // Cymatic Engines Evolution</p>
                  <p>https://cymatichub.xyz | Kampala, Uganda | contact@cymatichub.xyz</p>
                </div>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://cymatichub.xyz" alt="QR Code to Cymatic Study" className="print-qr-code" loading="lazy" referrerPolicy="no-referrer" />
              </div>

              <CymaticFooter />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


interface CymaticLayoutProps {
  children: React.ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  seoOgImage?: string;
}

export const CymaticLayout: React.FC<CymaticLayoutProps> = ({ 
  children, 
  seoTitle, 
  seoDescription, 
  seoOgImage 
}) => {
  useDocumentMetadata();

  return (
    <>
      <CymaticSEO 
        title={seoTitle} 
        description={seoDescription} 
        ogImage={seoOgImage} 
      />
      <UIFrame>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </UIFrame>
    </>
  );
};
