import { db, auth } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CymaticLayout } from '../components/CymaticLayout';
import { Monitor, Smartphone, Tablet, ExternalLink, ChevronLeft, LayoutGrid, Star, Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import templatesData from '../data/templates.json';
import { useAppContext } from '../hooks/useAppContext';
import { AdSenseBanner } from '../components/AdSenseBanner';

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

const getDeviceStyles = (currentDevice: DeviceType) => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return 'w-full h-full';
  }
  switch (currentDevice) {
    case 'desktop':
      return 'w-full h-full';
    case 'tablet':
      return 'w-[768px] h-[90vh] max-h-[900px] rounded-3xl border-8 border-gray-800 shadow-2xl';
    case 'mobile':
      return 'w-[375px] h-[80vh] max-h-[750px] rounded-3xl border-8 border-gray-800 shadow-2xl';
    default:
      return 'w-full h-full';
  }
};

export const TemplateBrowser: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { logPageView } = useAppContext();
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const activeTemplate = templates.find(t => t.id === templateId);

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

  if (!activeTemplate) {
    return (
      <CymaticLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <h1 className="text-4xl font-black text-white italic">Template Not Found</h1>
          <Link to="/showcase" className="px-8 py-3 bg-[var(--color-accent)] text-black rounded-xl font-bold uppercase tracking-widest text-xs">
            Return to Showcase
          </Link>
        </div>
      </CymaticLayout>
    );
  }

  return (
    <CymaticLayout
      seoTitle={`${activeTemplate.title} | Template Browser | Isabirye Latif`}
      seoDescription={activeTemplate.description}
      seoOgImage={activeTemplate.image}
    >
      <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px] bg-[#090D1A] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        {/* Top Control Bar */}
        <header className="h-14 bg-[#111625] border-b border-gray-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/showcase')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
            </button>
            <div className="h-4 w-[1px] bg-gray-800 mx-2"></div>
            <div>
              <span className="text-white font-black text-xs tracking-wider uppercase">{activeTemplate.title}</span>
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest leading-none">Live Simulation</p>
            </div>
          </div>

          {/* Template Switcher */}
          <div className="flex items-center gap-2">
            {templates.map(t => (
               <button 
                 key={t.id}
                 onClick={() => navigate(`/template/${t.id}`)}
                 className={`text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border transition-all ${
                    activeTemplate.id === t.id ? 'bg-[var(--color-accent)] text-black border-[var(--color-accent)]' : 'bg-transparent text-gray-500 border-gray-800 hover:text-white'
                 }`}
               >
                  {t.title}
               </button>
            ))}
          </div>

          {/* Device Responsive Simulators (Desktop only) */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-[#171E30] p-1 rounded-full border border-gray-800">
              <button
                onClick={() => setCurrentDevice('desktop')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentDevice === 'desktop' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentDevice('tablet')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentDevice === 'tablet' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentDevice('mobile')}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentDevice === 'mobile' ? 'text-blue-500 bg-blue-500/10' : 'text-gray-400 hover:text-white'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <button
                onClick={copyLink}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all relative"
                title="Copy Link"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied && <span className="absolute -top-6 bg-white text-black text-[8px] font-bold px-1 rounded">Copied!</span>}
              </button>
              <a
              href={activeTemplate.path}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Main Live Simulator Workspace */}
        <main className="flex-grow flex items-center justify-center relative overflow-hidden bg-[radial-gradient(circle_at_center,#111625_0%,#090D1A_100%)]">
          <div className="w-full h-full flex flex-col items-center justify-center overflow-auto scrollbar-hide">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTemplate.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`bg-white overflow-hidden flex flex-col relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${getDeviceStyles(currentDevice)}`}
              >
                
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
                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                      </div>
                      <div className="flex-grow max-w-[150px] mx-auto bg-white rounded-md text-[8px] text-gray-400 py-0.5 px-2 text-center truncate border border-gray-200 font-mono">
                        cymatichub.xyz/{activeTemplate.id}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="w-full h-full flex flex-col relative flex-grow">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#090D1A] z-10">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest animate-pulse">Loading Asset...</div>
                    </div>
                  )}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#090D1A] z-10">
                      <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest">Asset not found.</div>
                    </div>
                  )}
                  <iframe 
                    src={activeTemplate.path} 
                    className="w-full h-full border-none bg-white flex-grow"
                    title={`Preview of ${activeTemplate.title}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => { setIsLoading(false); setError(true); }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Info Section Below */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-[var(--color-accent)]" />
            Template Intel
          </h2>
          <div className="bg-[#111625] border border-gray-800 rounded-2xl p-6 space-y-4">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Technical Description</h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">{activeTemplate.description}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Category</h3>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">{activeTemplate.category}</span>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Deployment Phase</h3>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">{activeTemplate.phase}</span>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Industry</h3>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">{activeTemplate.industry}</span>
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Use Case</h3>
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">{activeTemplate.useCase}</span>
              </div>
              <div className="col-span-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Tech Stack</h3>
                <p className="text-sm text-gray-300 font-mono">{activeTemplate.techStack}</p>
              </div>
              
              <div className="col-span-2 pt-4 border-t border-gray-800 flex items-center justify-between">
                <div className="flex flex-col items-center gap-2">
                   <QRCodeSVG value={window.location.href} size={64} className="bg-white p-1 rounded" />
                   <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Mobile Preview</span>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                   <span className="text-[8px] text-gray-500 uppercase font-bold tracking-widest">Rate Template</span>
                   <div className="flex items-center gap-1">
                     {[1, 2, 3, 4, 5].map((star) => (
                       <Star
                         key={star}
                         className={`w-6 h-6 cursor-pointer ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                         onClick={() => handleRating(star)}
                       />
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Architecture</h2>
          <div className="bg-[#111625] border border-gray-800 rounded-2xl p-6 space-y-4">
             {activeTemplate.metrics && (
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Performance</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{activeTemplate.metrics.performance}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${activeTemplate.metrics.performance}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Accessibility</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{activeTemplate.metrics.accessibility}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${activeTemplate.metrics.accessibility}%` }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">SEO Integrity</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">{activeTemplate.metrics.seo}%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${activeTemplate.metrics.seo}%` }}></div>
                  </div>
               </div>
             )}
             <div className="pt-4 mt-4 border-t border-gray-800 space-y-4">
                <button 
                  onClick={() => navigate('/socials')}
                  className="w-full py-3 bg-[var(--color-accent)] text-black rounded-xl font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all"
                >
                  // Request_Deployment
                </button>
                <AdSenseBanner label="//_MULTIPLEX_TEMPLATE_RECOMMENDATION" />
             </div>
          </div>
        </div>
      </div>
    </CymaticLayout>
  );
};

export default TemplateBrowser;
