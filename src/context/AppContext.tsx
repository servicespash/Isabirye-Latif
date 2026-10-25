import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { branding } from '../config/branding';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AppContext } from './AppContextType';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentBranding, setCurrentBranding] = useState(() => {
    const saved = localStorage.getItem('app_branding');
    try {
      return saved ? { ...branding, ...JSON.parse(saved) } : branding;
    } catch {
      return branding;
    }
  });

  const updateBranding = (newBranding: Partial<typeof branding>) => {
    const updated = { ...currentBranding, ...newBranding };
    setCurrentBranding(updated);
    localStorage.setItem('app_branding', JSON.stringify(updated));
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const saved = localStorage.getItem('showcase_category');
    return (saved && saved !== 'undefined') ? saved : 'All';
  });

  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(() => {
    const saved = localStorage.getItem('active_template_id');
    return (saved && saved !== 'undefined') ? saved : null;
  });

  const [degasAtmosphereActive, setDegasAtmosphereActive] = useState<boolean>(false);
  const toggleDegasAtmosphere = useCallback(() => {
    setDegasAtmosphereActive(prev => !prev);
  }, []);

  useEffect(() => {
    localStorage.setItem('showcase_category', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (activeTemplateId) {
      localStorage.setItem('active_template_id', activeTemplateId);
    } else {
      localStorage.removeItem('active_template_id');
    }
  }, [activeTemplateId]);

  const logPageView = useCallback(async (pageId: string, templateId?: string) => {
    const path = 'analytics_page_views';
    try {
      await addDoc(collection(db, path), {
        pageId,
        templateId: templateId || activeTemplateId || 'main',
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }, [activeTemplateId]);

  // Listen for messages from iframes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NAVIGATE_TO') {
        const { pageId, templateId } = event.data;
        logPageView(pageId, templateId);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [logPageView]);

  return (
    <AppContext.Provider value={{
      branding: currentBranding,
      updateBranding,
      selectedCategory,
      setSelectedCategory,
      activeTemplateId,
      setActiveTemplateId,
      logPageView,
      degasAtmosphereActive,
      toggleDegasAtmosphere
    }}>
      {children}
    </AppContext.Provider>
  );
};
