import { createContext } from 'react';
import { branding } from '../config/branding';

export interface AppContextType {
  branding: typeof branding;
  updateBranding: (newBranding: Partial<typeof branding>) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  activeTemplateId: string | null;
  setActiveTemplateId: (id: string | null) => void;
  logPageView: (pageId: string, templateId?: string) => Promise<void>;
  degasAtmosphereActive: boolean;
  toggleDegasAtmosphere: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
