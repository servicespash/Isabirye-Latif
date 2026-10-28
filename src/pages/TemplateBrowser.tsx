import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CymaticLayout } from '../components/CymaticLayout';
import { Monitor, Smartphone, Tablet, ExternalLink, ChevronLeft, Copy, ShieldCheck, RotateCcw, Maximize2, LayoutGrid, Star, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import templatesData from '../data/templates.json';
import { useAppContext } from '../hooks/useAppContext';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { AetherAcademyTemplate } from '../components/templates/AetherAcademyTemplate';
import { ApexVentureTemplate } from '../components/templates/ApexVentureTemplate';
import { ILNatureTemplate } from '../components/templates/ILNatureTemplate';
import { TemplateShareModal } from '../components/TemplateShareModal';

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
  industry: string;
  techStack: string;
  useCase: string;
}

const templates: TemplateDef[] = templatesData;

const getSystemDeviceKind = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const TemplateBrowser: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { logPageView } = useAppContext();
  const [currentDevice, setCurrentDevice] = useState<DeviceType>(getSystemDeviceKind);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [, setKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const activeTemplate = templates.find(t => t.id === templateId);

  // System device tracking via window resize
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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (activeTemplate) {
      logPageView('template_browser', activeTemplate.id);
    }
  }, [activeTemplate, logPageView]);

  const [rating, setRating] = useState<number>(0);

  const handleRating = async (newRating: number) => {
    if (!activeTemplate) return;
    setRating(newRating);
    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'templateRatings'), {
          templateId: activeTemplate.id,
          rating: newRating,
          userId: auth.currentUser.uid
        });
      } catch (e) {
        console.error('Error adding rating:', e);
      }
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setKey(prev => prev + 1);
  };

  if (!activeTemplate) {
    return (
      <CymaticLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <h1 className="text-4xl font-black text-white tracking-tight">Template Not Found</h1>
          <p className="text-slate-400 font-mono text-sm">The requested conceptual blueprint does not exist in the registry.</p>
          <Link to="/showcase" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
            Return to Showcase
          </Link>
        </div>
      </CymaticLayout>
    );
  }

  return (
    <CymaticLayout
      seoTitle={`${activeTemplate.title} | Immersive Preview | Isabirye Latif`}
      seoDescription={activeTemplate.description}
      seoOgImage={activeTemplate.image}
    >
      <div className={`flex flex-col bg-[#090D1A] rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-[200] h-[calc(100vh-2rem)]' : 'h-[calc(100vh-160px)] min-h-[650px]'}`}>
        
        {/* Professional Browser Control Bar with System Device Tracking */}
        <header className="h-14 bg-[#111625] border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/showcase')}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Directory</span>
            </button>
            <div className="h-4 w-[1px] bg-slate-800 mx-1"></div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <div>
                <span className="text-white font-bold text-xs tracking-wide">{activeTemplate.title}</span>
                <span className="text-[9px] text-slate-400 font-mono ml-2 px-2 py-0.5 rounded bg-slate-800/60 uppercase">{activeTemplate.category}</span>
              </div>
            </div>
          </div>

          {/* Center URL Address Bar Simulation with System Device Kind indicator */}
          <div className="hidden lg:flex items-center gap-2 bg-[#090D1A] border border-slate-800 rounded-lg px-4 py-1.5 w-96 text-slate-400 text-xs font-mono justify-between">
            <div className="flex items-center gap-2 truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">latty-studio.dev/{activeTemplate.id}</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 uppercase font-mono font-bold shrink-0">
              {currentDevice} mode
            </span>
          </div>

          {/* Template Switcher Pills */}
          <div className="hidden xl:flex items-center gap-1.5">
            {templates.map(t => (
               <button 
                 key={t.id}
                 onClick={() => navigate(`/template/${t.id}`)}
                 className={`text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md transition-all ${
                    activeTemplate.id === t.id ? 'bg-blue-600 text-white font-bold shadow' : 'bg-[#171E30] text-slate-400 hover:text-white'
                 }`}
               >
                  {t.title.split(' ')[0]}
               </button>
            ))}
          </div>

          {/* Controls: System-tracked Device Viewports & Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReload}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
              title="Reload Simulator"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="hidden md:flex items-center gap-1 bg-[#171E30] p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => handleDeviceSelect('desktop')}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                  currentDevice === 'desktop' ? 'text-blue-400 bg-blue-500/10 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View (System Tracked)"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDeviceSelect('tablet')}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                  currentDevice === 'tablet' ? 'text-blue-400 bg-blue-500/10 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet View (System Tracked)"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDeviceSelect('mobile')}
                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all ${
                  currentDevice === 'mobile' ? 'text-blue-400 bg-blue-500/10 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View (System Tracked)"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {isManualOverride && (
              <button
                onClick={() => { setIsManualOverride(false); setCurrentDevice(getSystemDeviceKind()); }}
                className="text-[9px] font-mono text-amber-400 hover:underline px-2"
                title="Reset to automatic system tracking"
              >
                Auto
              </button>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsShareOpen(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all relative"
              title="Share Branded Link"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
            </button>

            <button
              onClick={copyLink}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all relative"
              title="Copy Raw Share Link"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied && <span className="absolute -top-7 bg-white text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded shadow">Copied!</span>}
            </button>

            <a
              href={activeTemplate.path}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Main Immersive Full-Screen Native Component Workspace */}
        <main className="flex-grow flex flex-col relative overflow-y-auto bg-white p-0">
          {activeTemplate.id === 'template1' ? (
            <AetherAcademyTemplate />
          ) : activeTemplate.id === 'template2' ? (
            <ApexVentureTemplate />
          ) : activeTemplate.id === 'template7' ? (
            <ILNatureTemplate />
          ) : (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-12 bg-slate-900 text-white space-y-6">
              <h2 className="text-4xl font-black uppercase tracking-tight">{activeTemplate.title}</h2>
              <p className="text-slate-400 text-center max-w-xl text-base">{activeTemplate.description}</p>
              <a 
                href={activeTemplate.path} 
                target="_blank" 
                rel="noreferrer" 
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-wider text-xs hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/30 flex items-center gap-2"
              >
                Launch Professional Self Page ↗
              </a>
            </div>
          )}
        </main>
      </div>

      {/* AdSense Monetization Slot */}
      <div className="my-6">
        <AdSenseBanner label="//_MULTIPLEX_TEMPLATE_RECOMMENDATION" />
      </div>

      {/* Comprehensive Intel & Architecture Section */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-blue-400" />
            Blueprint Specification & Intel
          </h2>
          <div className="bg-[#111625] border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">Executive Summary</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-sans">{activeTemplate.description}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">Industry Domain</h4>
                <span className="text-xs font-mono text-blue-400 font-semibold">{activeTemplate.industry}</span>
              </div>
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">Deployment Phase</h4>
                <span className="text-xs font-mono text-emerald-400 font-semibold">{activeTemplate.phase}</span>
              </div>
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">Primary Use Case</h4>
                <span className="text-xs font-mono text-purple-400 font-semibold">{activeTemplate.useCase}</span>
              </div>
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">Tech Stack Architecture</h4>
                <span className="text-xs font-mono text-amber-400 font-semibold">{activeTemplate.techStack}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className="bg-white p-2 rounded-xl shadow-inner">
                   <QRCodeSVG value={window.location.href} size={72} />
                 </div>
                 <div>
                   <span className="text-xs font-bold text-white block">Mobile Handoff</span>
                   <span className="text-[10px] text-slate-400 font-mono">Scan QR code to test on device</span>
                 </div>
              </div>
              
              <div className="flex flex-col items-center sm:items-end gap-2">
                 <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Rate Blueprint Quality</span>
                 <div className="flex items-center gap-1.5 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                   {[1, 2, 3, 4, 5].map((star) => (
                     <Star
                       key={star}
                       className={`w-5 h-5 cursor-pointer transition-colors ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                       onClick={() => handleRating(star)}
                     />
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Performance Audit</h2>
          <div className="bg-[#111625] border border-slate-800 rounded-2xl p-6 space-y-6">
             {activeTemplate.metrics && (
               <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300">Performance Index</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{activeTemplate.metrics.performance}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${activeTemplate.metrics.performance}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300">Accessibility Compliance</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{activeTemplate.metrics.accessibility}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${activeTemplate.metrics.accessibility}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300">SEO Score</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">{activeTemplate.metrics.seo}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${activeTemplate.metrics.seo}%` }}></div>
                    </div>
                  </div>
               </div>
             )}

             <div className="pt-4 border-t border-slate-800">
                <button 
                  onClick={() => navigate('/socials')}
                  className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-mono font-bold uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                >
                  // Request Custom Build
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Share & Action Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[180] bg-[#111625]/95 backdrop-blur-md border border-blue-500/30 rounded-2xl p-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
            {activeTemplate.title.slice(0, 2).toUpperCase()}
          </div>
          <div className="truncate">
            <span className="text-white font-bold text-xs block truncate">{activeTemplate.title}</span>
            <span className="text-[10px] text-emerald-400 font-mono">Mobile Handoff Ready</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsShareOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </div>

      <TemplateShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        template={activeTemplate}
      />
    </CymaticLayout>
  );
};

export default TemplateBrowser;
