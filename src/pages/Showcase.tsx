import React, { useState, useEffect } from 'react';
import { PopularityDashboard } from '../components/PopularityDashboard';
import { CymaticLayout } from '../components/CymaticLayout';
import { Monitor, Smartphone, Tablet, ExternalLink, X, LayoutGrid, Filter, Search, Copy, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import templatesData from '../data/templates.json';
import { AdSenseBanner } from '../components/AdSenseBanner';

import { useAppContext } from '../hooks/useAppContext';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface TemplateDef {
  id: string;
  title: string;
  category: string;
  purpose: string;
  description: string;
  path: string;
  image: string;
  metrics?: {
    performance: number;
    accessibility: number;
    seo: number;
  };
  phase: string;
}

const templates: TemplateDef[] = templatesData;
const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];
const PHASES = ['Research', 'Planning', 'Design', 'Deployed'];

const getSystemDeviceKind = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

const getDeviceStyles = (currentDevice: DeviceType) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return 'w-full h-full';
  }
  switch (currentDevice) {
    case 'desktop':
      return 'w-full h-full';
    case 'tablet':
      return 'w-[768px] h-[1024px] rounded-3xl border-8 border-gray-800 shadow-2xl';
    case 'mobile':
      return 'w-[375px] h-[812px] rounded-3xl border-8 border-gray-800 shadow-2xl';
    default:
      return 'w-full h-full';
  }
};

interface SimulatorModalProps {
  activeTemplateId: string | null;
  setActiveTemplateId: (id: string | null) => void;
}

const SimulatorModal: React.FC<SimulatorModalProps> = ({ activeTemplateId, setActiveTemplateId }) => {
  const { logPageView } = useAppContext();
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(getSystemDeviceKind);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const activeTemplate = templates.find(t => t.id === activeTemplateId);

  useEffect(() => {
    const handleResize = () => {
      if (!isManualOverride) {
        setCurrentDevice(getSystemDeviceKind());
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isManualOverride]);

  const handleDeviceSelect = (device: DeviceType) => {
    setIsManualOverride(true);
    setCurrentDevice(device);
  };

  useEffect(() => {
    if (activeTemplateId) {
      logPageView('template_preview', activeTemplateId);
    }
  }, [activeTemplateId, logPageView]);

  if (!activeTemplate) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#090D1A]/95 backdrop-blur-md">
      {/* Top Navigation & Control Bar */}
      <header className="h-16 bg-[#111625] border-b border-gray-800 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-white font-extrabold text-sm tracking-wider">CYMATIC <span className="text-blue-500">SHOWCASE</span></span>
            <p className="text-[10px] text-gray-500 font-medium leading-none">Template Simulation Environment ({currentDevice} mode)</p>
          </div>
        </div>

        {/* Template Selector Switcher */}
        <div className="hidden md:flex items-center gap-1 bg-[#171E30] p-1.5 rounded-xl border border-gray-800 overflow-x-auto">
          {templates.map((t, index) => (
            <button
              key={t.id}
              onClick={() => setActiveTemplateId(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTemplateId === t.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {index + 1}. {t.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Device Responsive Simulators (Desktop only) */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 bg-[#171E30] p-1.5 rounded-xl border border-gray-800 shrink-0">
            <button
              onClick={() => handleDeviceSelect('desktop')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                currentDevice === 'desktop' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'
              }`}
              title="Desktop View (System Tracked)"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeviceSelect('tablet')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                currentDevice === 'tablet' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'
              }`}
              title="Tablet View (System Tracked)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeviceSelect('mobile')}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                currentDevice === 'mobile' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'
              }`}
              title="Mobile View (System Tracked)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            {isManualOverride && (
              <button
                onClick={() => { setIsManualOverride(false); setCurrentDevice(getSystemDeviceKind()); }}
                className="text-[10px] font-mono text-amber-400 hover:underline px-2"
                title="Reset to automatic system tracking"
              >
                Auto
              </button>
            )}
            <a
              href={activeTemplate.path}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 ml-2 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          
          <button 
            onClick={() => setActiveTemplateId(null)}
            className="ml-2 px-3 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center gap-1.5 transition-all text-xs font-bold uppercase tracking-wider"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Live Simulator Workspace */}
      <main className="flex-grow p-4 md:p-6 flex items-center justify-center relative overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center overflow-auto">
          <motion.div 
            layoutId={`template-${activeTemplateId}`}
            className={`bg-white overflow-hidden flex flex-col relative transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${getDeviceStyles(currentDevice)}`}>
            
            {/* Simulated Device Browser Bar */}
            <AnimatePresence>
              {currentDevice !== 'desktop' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 32, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="h-8 bg-gray-100 border-b border-gray-200 px-4 flex items-center gap-2 shrink-0"
                >
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                  </div>
                  <div className="flex-grow max-w-[200px] mx-auto bg-white rounded-md text-[10px] text-gray-400 py-0.5 px-3 text-center truncate border border-gray-200">
                    cymatichub.xyz/{activeTemplate.id}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <iframe 
              src={activeTemplate.path} 
              className="w-full h-full border-none bg-white flex-grow"
              title={`Preview of ${activeTemplate.title}`}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export const Showcase: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    activeTemplateId, 
    setActiveTemplateId,
    logPageView 
  } = useAppContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'comparison'>('grid');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    try {
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    logPageView('showcase');
  }, [logPageView]);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(fav => fav !== id) 
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/showcase/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTemplates = templates.filter(t => {
      const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    const aFav = favorites.includes(a.id);
    const bFav = favorites.includes(b.id);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  const activeTemplate = templates.find(t => t.id === activeTemplateId);

  return (
    <CymaticLayout
      seoTitle={activeTemplate ? `${activeTemplate.title} | Template Showcase | Isabirye Latif` : undefined}
      seoDescription={activeTemplate ? activeTemplate.description : undefined}
      seoOgImage={activeTemplate ? activeTemplate.image : undefined}
    >
      <div className="py-8 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-mono font-bold text-white flex items-center gap-3">
            <LayoutGrid className="text-blue-500 w-8 h-8" />
            //_TEMPLATE_SHOWCASE
          </h1>
          <div className="flex gap-4">
             <div className="flex-grow">
               <p className="text-slate-400 font-mono text-sm max-w-2xl">
                 This showcase directory presents a collection of conceptual web design templates. These files are sourced from isolated design explorations and serve purely as foundational blueprints for client demonstrations.
               </p>
             </div>
             <div className="w-80">
                <PopularityDashboard />
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 pb-2">
            <div className="flex items-center gap-2 text-gray-500 mr-2 shrink-0">
                <Filter className="w-4 h-4" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">Filter</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-grow w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#111625] border border-gray-800 rounded-full py-2 pl-10 pr-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500 transition-all"
                />
            </div>
            
            <button
               onClick={() => setViewMode(viewMode === 'grid' ? 'comparison' : 'grid')}
               className="px-6 py-3 bg-[#111625] text-slate-300 border border-gray-800 rounded-full text-xs font-mono hover:border-blue-500"
            >
              Toggle {viewMode === 'grid' ? 'Comparison' : 'Grid'} View
            </button>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
                {categories.map((category) => (
                    <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all border ${
                        selectedCategory === category
                        ? 'bg-blue-600/10 text-blue-400 border-blue-500/30'
                        : 'bg-[#111625] text-slate-400 border-gray-800 hover:border-gray-600'
                    }`}
                    >
                    {category}
                    </button>
                ))}
            </div>
        </div>
        
        {/* Grid of Templates */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6" : "space-y-4"}>
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layoutId={`template-${template.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                transition={{ duration: 0.2 }}
                className={viewMode === 'grid' ? "bg-[#111625] border border-gray-800 rounded-2xl overflow-hidden flex flex-col group" : "bg-[#111625] border border-gray-800 rounded-xl p-4 flex gap-4"}
              >
                <div className="relative aspect-video bg-[#090D1A] border-b border-gray-800 overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-[#171E30] to-[#090D1A] relative overflow-hidden flex flex-col group/preview">
                     <img 
                       src={template.image} 
                       alt={template.title}
                       className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/preview:opacity-0 transition-opacity duration-500"
                       loading="lazy"
                       referrerPolicy="no-referrer"
                       onError={(e) => {
                         (e.target as HTMLImageElement).style.display = 'none';
                       }}
                     />
                     
                     <div className="absolute inset-0 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-700 pointer-events-none scale-110 group-hover/preview:scale-100 origin-center transition-transform">
                        <iframe 
                          src={template.path} 
                          className="w-[1280px] h-[720px] origin-top-left border-none"
                          style={{ 
                            transform: 'scale(0.3)',
                            width: '333.33%',
                            height: '333.33%' 
                          }}
                          title={`Mini preview of ${template.title}`}
                          scrolling="no"
                        />
                     </div>
                  </div>
                  
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-10 gap-3">
                      <button 
                        onClick={() => toggleFavorite(template.id)}
                        className={`p-3 rounded-xl transition-all ${favorites.includes(template.id) ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        title="Favorite"
                      >
                         <Heart className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => copyLink(template.id)}
                        className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all relative"
                        title="Copy Share Link"
                      >
                         <Copy className="w-5 h-5" />
                         {copiedId === template.id && (
                           <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                             Copied!
                           </span>
                         )}
                      </button>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-block px-2.5 py-1 rounded bg-gray-800 text-gray-400 text-[10px] font-mono font-bold tracking-wider uppercase">
                          {template.category}
                        </span>
                        <span className="inline-block px-2.5 py-1 rounded bg-blue-900/30 text-blue-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-blue-900/50">
                          {template.phase}
                        </span>
                      </div>
                      <h2 className="text-xl font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                        {template.title}
                        {favorites.includes(template.id) && <Heart className="inline w-4 h-4 ml-2 text-red-500 fill-red-500" />}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Visual Step-by-Step Initiative Timeline */}
                  <div className="mb-6 p-4 bg-[#090D1A]/60 rounded-xl border border-gray-800/50">
                    <div className="flex justify-between items-center relative">
                      {/* Connecting Line Background */}
                      <div className="absolute left-[6%] right-[6%] top-[10px] h-[2px] bg-gray-800/80 z-0" />
                      
                      {/* Active Progress Line */}
                      <div 
                        className="absolute left-[6%] top-[10px] h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 z-0 transition-all duration-500" 
                        style={{ 
                          width: `${Math.max(0, (PHASES.indexOf(template.phase) / (PHASES.length - 1)) * 88)}%` 
                        }}
                      />

                      {PHASES.map((phaseName, index) => {
                        const phaseIndex = PHASES.indexOf(template.phase);
                        const isCompleted = index < phaseIndex;
                        const isActive = index === phaseIndex;

                        return (
                          <div key={phaseName} className="flex flex-col items-center z-10 relative">
                            {/* Node Circle */}
                            <div 
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-mono font-bold transition-all duration-300 border ${
                                isActive 
                                  ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.4)] scale-110' 
                                  : isCompleted 
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                                    : 'bg-[#111625] text-slate-500 border-gray-800'
                              }`}
                            >
                              {isCompleted ? '✓' : index + 1}
                            </div>
                            {/* Node Label */}
                            <span 
                              className={`text-[8px] font-mono tracking-widest mt-1.5 uppercase ${
                                isActive 
                                  ? 'text-blue-400 font-bold' 
                                  : isCompleted 
                                    ? 'text-emerald-400/80' 
                                    : 'text-slate-500'
                              }`}
                            >
                              {phaseName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                    <div>
                      <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider mb-1">Purpose</p>
                      <p className="text-sm text-slate-300 font-sans leading-relaxed">
                        {template.purpose}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider mb-1">Description</p>
                      <p className="text-sm text-slate-400 font-sans leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                    {template.metrics && (
                      <div className="pt-4 mt-4 border-t border-gray-800">
                        <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-wider mb-2">Lighthouse Metrics</p>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex flex-col items-center p-2 bg-[#090D1A] rounded-lg border border-gray-800">
                            <span className="text-emerald-400 font-mono font-bold text-lg">{template.metrics.performance}</span>
                            <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest mt-1">Perf</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-[#090D1A] rounded-lg border border-gray-800">
                            <span className="text-emerald-400 font-mono font-bold text-lg">{template.metrics.accessibility}</span>
                            <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest mt-1">A11y</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-[#090D1A] rounded-lg border border-gray-800">
                            <span className="text-emerald-400 font-mono font-bold text-lg">{template.metrics.seo}</span>
                            <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest mt-1">SEO</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer Action */}
                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <button 
                        onClick={() => setActiveTemplateId(template.id)}
                        className="px-6 py-3 bg-blue-600 text-white font-mono font-bold text-sm rounded-xl shadow-xl shadow-blue-900/50 hover:bg-blue-500 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <Monitor className="w-4 h-4" />
                        Simulator
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* AdSense Monetization Banner */}
        <div className="pt-4">
          <AdSenseBanner label="//_TEMPLATE_SHOWCASE_SPONSOR" />
        </div>

      </div>

      <AnimatePresence>
        {activeTemplateId && (
          <SimulatorModal activeTemplateId={activeTemplateId} setActiveTemplateId={setActiveTemplateId} />
        )}
      </AnimatePresence>
    </CymaticLayout>
  );
};

export default Showcase;

