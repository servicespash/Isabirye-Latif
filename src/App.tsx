import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion, Variants } from 'motion/react';
import { AppWrapper } from './components/AppWrapper';
import { CymaticSensoryLayer } from './components/CymaticSensoryLayer';
import { Helmet } from 'react-helmet-async';
import { MotionProvider } from './context/MotionContext';
import { ThemeProvider } from './context/ThemeContext';
import { useFluidGridManager } from './engine/FluidGridManager';
import { useRouteTracking } from './hooks/useRouteTracking';
import { useRoutePrefetch } from './hooks/useRoutePrefetch';
import { useAnalytics } from './hooks/useAnalytics';
import { useLongPress } from './hooks/useLongPress';
import { useAppContext } from './hooks/useAppContext';
import { CymaticLoader } from './components/CymaticLoader';
import TemplatePageView from './pages/TemplatePageView';

// Sovereign Additions
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CymaticCursor } from './components/CymaticCursor';
import { KeyboardNavigation } from './components/KeyboardNavigation';
import { SovereignInquiryModal } from './components/SovereignInquiryModal';
import { CommandPalette } from './components/CommandPalette';
import { DevSeoChecklist } from './components/DevSeoChecklist';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';

// Real Page Components
const Home = React.lazy(() => import('./pages/Home'));
const Manifesto = React.lazy(() => import('./pages/Manifesto'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Resonance = React.lazy(() => import('./pages/Resonance'));
const Creative = React.lazy(() => import('./pages/Creative'));
const Creatives = React.lazy(() => import('./pages/Creatives'));
const Study = React.lazy(() => import('./pages/Study'));
const Learning = React.lazy(() => import('./pages/Learning'));
const ForSchools = React.lazy(() => import('./pages/ForSchools'));
const ForTeams = React.lazy(() => import('./pages/ForTeams'));
const HowItWorks = React.lazy(() => import('./pages/HowItWorks'));
const ComplianceProtocol = React.lazy(() => import('./pages/ComplianceProtocol'));
const Transparency = React.lazy(() => import('./pages/Transparency'));
const Socials = React.lazy(() => import('./pages/Socials'));
const StackAudit = React.lazy(() => import('./pages/StackAudit'));
const TwinEngines = React.lazy(() => import('./pages/TwinEngines'));
const Showcase = React.lazy(() => import('./pages/Showcase'));
const TemplateBrowser = React.lazy(() => import('./pages/TemplateBrowser'));
const Settings = React.lazy(() => import('./pages/Settings'));

import { AppProvider } from './context/AppContext';

// ============================================================================
// METAMORPHIC CORE ARCHITECTURE // ISABIRYE LATIF CORE ENTRY
// ============================================================================

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.98, filter: 'blur(4px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { 
      type: 'spring', 
      stiffness: 280, 
      damping: 24, 
      mass: 0.8,
      staggerChildren: 0.08 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -12, 
    scale: 0.98, 
    filter: 'blur(4px)',
    transition: { duration: 0.25, ease: 'easeInOut' } 
  }
};

interface SEOMetadata {
  title: string;
  description: string;
  image: string;
}

const SEO_MAP: Record<string, SEOMetadata> = {
  '/': {
    title: 'Cymatic Study | Institutional Sovereign Infrastructure',
    description: 'Sovereign, resonant, and high-performance digital infrastructure for education and institutional synchronization.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/manifesto': {
    title: 'Cymatic Study | Manifesto',
    description: 'The ideological framework and design philosophies underpinning Cymatic digital structures and aesthetic values.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/projects': {
    title: 'Cymatic Study | Projects & Case Studies',
    description: 'Deep dive into projects structured with mathematical spacing, elite performance benchmarks, and beautiful visuals.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/showcase': {
    title: 'Cymatic Study | High-Fidelity Showcase',
    description: 'Browse our specialized, premium, high-converting digital templates tailored for corporate enterprise, non-profits, and minimalist direction.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
  },
  '/resonance': {
    title: 'Cymatic Study | Resonance & Spatial Frequencies',
    description: 'Interactive canvas simulating sand particles under tone generator resonance. Explore mathematics in visual wave patterns.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
  },
  '/creative': {
    title: 'Cymatic Study | Creative Laboratories',
    description: 'Exploring custom geometric alignments, typographic tracking, and high-fidelity experimental design.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/creatives': {
    title: 'Cymatic Study | Creative Hub Directory',
    description: 'Directory of modern creative practitioners, minimalist studios, and structural builders.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/study': {
    title: 'Cymatic Study | Research & Papers',
    description: 'Institutional research papers, mathematical proofs, and frequency visualization experiments.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
  },
  '/for-schools': {
    title: 'Cymatic Study | Educational Licensing',
    description: 'Sovereign design systems and interactive frequency instruments engineered for modern school curricula.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/for-teams': {
    title: 'Cymatic Study | Enterprise Coordination',
    description: 'Unify your research teams and developers under one cohesive, mathematically synchronized design standard.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/how-it-works': {
    title: 'Cymatic Study | Structural Integration Protocols',
    description: 'Understand how frequency patterns are translated directly to digital render engines and CSS grids.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/learning': {
    title: 'Cymatic Study | Academy & Tutorials',
    description: 'Curated modules covering grid systems, responsive layout physics, and audio tone generators.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/legal': {
    title: 'Cymatic Study | Compliance & Data Security Protocol',
    description: 'Detailed security parameters, offline-first data safety measures, and transparent operational practices.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/transparency': {
    title: 'Cymatic Study | Open-Source Audit Ledger',
    description: 'Verifiable open ledger of operational costs, hosting parameters, and package audits.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/stack': {
    title: 'Cymatic Study | Sovereign Stack & Infrastructure Audit',
    description: 'Comprehensive hardware and software layout powering our high-performance client experience.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/socials': {
    title: 'Cymatic Study | Official Handles & Feeds',
    description: 'Join the community on official channels. Sync with developers, researchers, and creators.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/twin-engines': {
    title: 'Cymatic Study | Twin Engines Optimization',
    description: 'Our rendering optimizations: twin virtual engines balancing fluid simulation and layout reactivity.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  },
  '/settings': {
    title: 'Cymatic Study | Terminal & Sensory Settings',
    description: 'Configure interactive canvas physics, typography scaling, cursor behavior, and color palettes.',
    image: 'https://cymatichub.xyz/apple-touch-icon.png'
  }
};

const getDynamicMetadata = (pathname: string): SEOMetadata => {
  if (SEO_MAP[pathname]) {
    return SEO_MAP[pathname];
  }

  // Handle dynamic showcase templates (e.g. /showcase/template1 or /template/template1)
  const templateMatch = pathname.match(/^\/(showcase|template)\/(template[1-5])$/);
  if (templateMatch) {
    const templateId = templateMatch[2];
    if (templateId === 'template1') {
      return {
        title: 'Cymatic Hub | Education & Training Portal',
        description: 'Elite educational learning academy template focusing on structured syllabus alignment, dynamic visualizers, and interactive course resources.',
        image: 'https://cymatichub.xyz/media/photo1.png'
      };
    } else if (templateId === 'template2') {
      return {
        title: 'Apex Venture | Strategy & Capital Advisory',
        description: 'Premium corporate advisory template designed to structure secure venture growth, execute mergers, and organize executive briefs.',
        image: 'https://cymatichub.xyz/media/photo2.png'
      };
    } else if (templateId === 'template3') {
      return {
        title: 'Sora Studio | Minimalist Creative Direction',
        description: 'Bespoke minimalist portfolio template built for creative directors, architectural practices, and visual branding agencies.',
        image: 'https://cymatichub.xyz/media/photo1.png'
      };
    } else if (templateId === 'template4') {
      return {
        title: 'Hope Rise | Non-Profit Foundation Portal',
        description: 'Transparency-first non-profit donation portal template optimized to inspire donations and detail direct field projects.',
        image: 'https://cymatichub.xyz/media/photo4.png'
      };
    } else if (templateId === 'template5') {
      return {
        title: 'IL Nature & Game Park Tours | Wild Expeditions & Eco-Safaris',
        description: 'Premier eco-tourism lodges, game reserve expeditions, and wildlife conservation safaris with booking and itinerary management.',
        image: 'https://cymatichub.xyz/media/photo3.png'
      };
    } else if (templateId === 'template6') {
      return {
        title: 'NeuroSync AI | Autonomous Intelligence & Neural Pulse Systems',
        description: 'Enterprise neural networks, autonomous agents, and real-time resonance processing architected by Isabirye Latif.',
        image: 'https://cymatichub.xyz/media/photo1.png'
      };
    } else if (templateId === 'template7') {
      return {
        title: 'IL Game park and Nature Tours | Cymatic Hub Ecosystem for template7',
        description: 'Premier eco-tourism lodges, game reserve expeditions, and wildlife conservation safaris with booking and itinerary management.',
        image: 'https://cymatichub.xyz/media/photo3.png'
      };
    }
  }

  return SEO_MAP['/'];
};

const TemplateBrowserWrapper = () => {
  const { templateId: rawTemplateId } = useParams();
  const navigate = useNavigate();
  
  const templateId = rawTemplateId ? rawTemplateId.split('ref=')[0].replace(/[?&]/g, '') : '';

  useEffect(() => {
    if (rawTemplateId && rawTemplateId.includes('ref=')) {
      const cleanId = rawTemplateId.split('ref=')[0].replace(/[?&]/g, '');
      const refVal = rawTemplateId.split('ref=')[1];
      navigate(`/template/${cleanId}?ref=${refVal}`, { replace: true });
    }
  }, [rawTemplateId, navigate]);

  return <TemplateBrowser key={templateId} />;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  useRouteTracking();
  useAnalytics(); // Initialize analytics page view & interaction tracker

  const currentMetadata = getDynamicMetadata(location.pathname);
  const currentUrl = `https://cymatichub.xyz${location.pathname}`;

  return (
    <>
      <Helmet>
        <title>{currentMetadata.title}</title>
        <meta name="description" content={currentMetadata.description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={currentMetadata.title} />
        <meta property="og:description" content={currentMetadata.description} />
        <meta property="og:image" content={currentMetadata.image} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentMetadata.title} />
        <meta name="twitter:description" content={currentMetadata.description} />
        <meta name="twitter:image" content={currentMetadata.image} />
      </Helmet>

      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Home /></motion.div>} />
        <Route path="/manifesto" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Manifesto /></motion.div>} />
        <Route path="/projects" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Projects /></motion.div>} />
        <Route path="/showcase" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Showcase /></motion.div>} />
        <Route path="/showcase/:templateId" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><TemplateBrowserWrapper /></motion.div>} />
        <Route path="/template/:templateId" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><TemplateBrowserWrapper /></motion.div>} />
        <Route path="/template1" element={<TemplatePageView />} />
        <Route path="/template2" element={<TemplatePageView />} />
        <Route path="/template3" element={<TemplatePageView />} />
        <Route path="/template4" element={<TemplatePageView />} />
        <Route path="/template5" element={<TemplatePageView />} />
        <Route path="/template6" element={<TemplatePageView />} />
        <Route path="/template7" element={<TemplatePageView />} />
        <Route path="/resonance" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Resonance /></motion.div>} />
        <Route path="/creative" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Creative /></motion.div>} />
        <Route path="/creatives" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Creatives /></motion.div>} />
        <Route path="/study" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Study /></motion.div>} />
        <Route path="/for-schools" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ForSchools /></motion.div>} />
        <Route path="/for-teams" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ForTeams /></motion.div>} />
        <Route path="/how-it-works" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><HowItWorks /></motion.div>} />
        <Route path="/learning" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Learning /></motion.div>} />
        <Route path="/legal" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ComplianceProtocol /></motion.div>} />
        <Route path="/transparency" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Transparency /></motion.div>} />
        <Route path="/stack" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><StackAudit /></motion.div>} />
        <Route path="/socials" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Socials /></motion.div>} />
        <Route path="/twin-engines" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><TwinEngines /></motion.div>} />
        <Route path="/settings" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Settings /></motion.div>} />
        
        <Route path="*" element={
          <div className="py-12 text-center font-mono">
            <span className="text-xs text-red-500 block mb-2">[ERROR_404 // ROUTE_MISALIGNED]</span>
            <span className="text-[10px] text-[var(--color-text-secondary)]">TARGET SPACE DEVIATED FROM BLUEPRINT RECOGNITION</span>
          </div>
        } />
      </Routes>
    </AnimatePresence>
    </>
  );
};

const AtmosphereManager: React.FC = () => {
  const context = useAppContext();
  const toggle = context?.toggleDegasAtmosphere;
  const active = context?.degasAtmosphereActive ?? false;

  useLongPress(() => {
    if (toggle) toggle();
  }, 600, true);

  if (!active) return null;
  return <CymaticSensoryLayer />;
};

export const App: React.FC = () => {
  const { resonance } = useFluidGridManager();
  
  // Prefetch critical routes for instantaneous navigation
  useRoutePrefetch(['/study', '/stack', '/resonance', '/manifesto', '/legal']);
  
  return (
    <>
      <Helmet>
        <title>Cymatic Study | Institutional Sovereign Infrastructure</title>
        <meta name="description" content="Sovereign, resonant, and high-performance digital infrastructure for education and institutional synchronization." />
      </Helmet>
      <Router>
        <MotionProvider>
          <AppProvider>
            <ThemeProvider resonance={resonance}>
              <AppWrapper>
                <OfflineStatusBanner />
                <ScrollProgressBar />
                <CymaticCursor />
                <KeyboardNavigation />
                <SovereignInquiryModal />
                <CommandPalette />
                <DevSeoChecklist />
                <AtmosphereManager />
                <Suspense fallback={<CymaticLoader />}>
                  <AnimatedRoutes />
                </Suspense>
              </AppWrapper>
            </ThemeProvider>
          </AppProvider>
        </MotionProvider>
      </Router>
    </>
  );
};

export default App;
