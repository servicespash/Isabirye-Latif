import React, { useState } from 'react';
import { CymaticLayout } from '../components/CymaticLayout';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Briefcase, Code, Sparkles, Filter, Share2, Copy, Check, Send } from 'lucide-react';
import { ProjectMetrics } from '../components/ProjectMetrics';
import { DownloadIndex } from '../components/DownloadIndex';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  featured?: boolean;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'open-source-blueprints',
    title: 'Cymatic Blueprints (Open Source)',
    category: 'Open Source',
    description: 'Technical blueprints and public open-source code repositories providing verifiable evidence of Cymatic Study systems and architectural infrastructure.',
    tech: ['React', 'TypeScript', 'Node.js', 'System Architecture'],
    featured: true,
  },
  {
    id: 'cymatic-study',
    title: 'Cymatic Study',
    category: 'Infrastructure',
    description: 'High-performance real-time telemetry server and socket orchestration nodes powering low-latency user synchronization.',
    tech: ['Node.js', 'WebSockets', 'Cloud SQL', 'Firebase'],
    featured: true,
  },
  {
    id: 'pdf-engine',
    title: 'PDF Engine',
    category: 'Tooling',
    description: 'Automated high-fidelity document compiler designed for massive scalable academic syllabus and resume exports.',
    tech: ['React', 'TypeScript', 'PDFKit', 'Esbuild'],
    featured: true,
  },
  {
    id: 'sci-matic',
    title: 'Sci-Matic',
    category: 'STEM',
    description: 'Interactive STEM instruction system integrating physical formulas with custom-rendered audio/visual graphics.',
    tech: ['React', 'D3.js', 'Katex', 'Vite'],
    featured: false,
  },
  {
    id: 'sonic-lab',
    title: 'Sonic Lab',
    category: 'Creative',
    description: 'Microtonal polyphonic synthesizer playing physical-modeling guitar arrays and resonance feedback waveforms in real-time.',
    tech: ['Web Audio API', 'Tailwind', 'Framer Motion'],
    featured: true,
  },
  {
    id: 'sensory-grid',
    title: 'Sensory Grid',
    category: 'Art',
    description: 'Fluid simulation canvas mapping complex mathematical coordinates into interactive, high-frame-rate pixel aesthetics.',
    tech: ['HTML Canvas', 'Math Physics', 'CSS Variables'],
    featured: false,
  },
  {
    id: 'pash-media',
    title: 'Pash Media Studio',
    category: 'Media',
    description: 'Responsive, highly scalable asset-delivery pipeline for modern multimedia and graphic layout representations.',
    tech: ['Vite', 'PostCSS', 'Adaptive Compression'],
    featured: false,
  },
];

const CATEGORIES = ['ALL', 'OPEN SOURCE', 'INFRASTRUCTURE', 'TOOLING', 'STEM', 'CREATIVE', 'ART', 'MEDIA'];

interface ProjectCardProps {
  project: ProjectItem;
  idx: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx }) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const projectUrl = `https://cymatichub.xyz/projects#${project.id}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Primary clipboard write failed, trying fallback:', err);
      // Fallback for iframe restrictions
      const textArea = document.createElement("textarea");
      textArea.value = projectUrl;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy text: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleTwitterShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Explore the ${project.title} system built by Isabirye Latif (Latty Adams) on the Cymatic Evolution portal:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(projectUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLinkedInShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(projectUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      whileHover={{ y: -6, scale: 1.012, transition: { duration: 0.2, ease: 'easeOut' } }}
      transition={{ duration: 0.3, delay: idx * 0.05 }}
      className="group relative"
      id={project.id}
    >
      {/* Visual Highlight wrapper for featured systems */}
      {project.featured && (
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-[var(--color-accent)] to-amber-500 opacity-20 blur-sm group-hover:opacity-40 transition duration-1000" />
      )}

      <div className="relative h-full flex flex-col justify-between glass-card p-6 md:p-8 hover:border-[var(--color-accent)] transition-all duration-300">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-accent)] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-2 py-0.5 rounded">
              {project.category}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-widest text-amber-400 animate-pulse">
                <Sparkles className="w-3 h-3" />
                <span>Core Module</span>
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-black text-[var(--color-text-primary)] uppercase tracking-tight">
            {project.title}
          </h3>
          
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[var(--color-border)]/40 space-y-4">
          <ProjectMetrics projectId={project.id} />

          {/* Built-with tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tag) => (
              <span 
                key={tag} 
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/20 text-[var(--color-text-secondary)] font-mono text-[9px]"
              >
                <Code className="w-2.5 h-2.5 text-[var(--color-accent)]" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Action Row */}
          <div className="relative flex justify-end items-center pt-2">
            <button
              onClick={() => setIsShareOpen(!isShareOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/50 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 text-[9px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-secondary)] hover:text-white transition-all duration-300 pointer-events-auto"
            >
              <Share2 className="w-3 h-3 text-[var(--color-accent)]" />
              <span>Share</span>
            </button>

            <AnimatePresence>
              {isShareOpen && (
                <>
                  {/* Backdrop for easy closing */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsShareOpen(false)} 
                  />
                  
                  {/* Dropdown panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 bottom-full mb-2 z-20 w-44 rounded-xl border border-neutral-800 bg-[#0c0c0e] p-2.5 shadow-2xl space-y-1.5 font-mono text-[9px]"
                  >
                    <div className="px-2 py-1 text-neutral-500 uppercase tracking-widest border-b border-neutral-900 mb-1 font-bold">
                      Institutional Share
                    </div>
                    
                    {/* Copy Link */}
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-all text-left"
                    >
                      <span className="flex items-center gap-2">
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[var(--color-accent)]" />}
                        <span>{copied ? 'COPIED!' : 'COPY LINK'}</span>
                      </span>
                    </button>

                    {/* Share on X */}
                    <button
                      onClick={handleTwitterShare}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-all text-left"
                    >
                      <Send className="w-3.5 h-3.5 text-[#00f2fe]" />
                      <span>SHARE ON X</span>
                    </button>

                    {/* Share on LinkedIn */}
                    <button
                      onClick={handleLinkedInShare}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-all text-left"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-[#0a66c2]" />
                      <span>SHARE LINKEDIN</span>
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects = selectedCategory === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(project => project.category.toUpperCase() === selectedCategory);

  // Helper to count projects per category
  const getCategoryCount = (categoryName: string) => {
    if (categoryName === 'ALL') return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter(p => p.category.toUpperCase() === categoryName).length;
  };

  return (
    <CymaticLayout>
      <div className="space-y-12 pb-16">
        {/* Page Title & Intro */}
        <div className="border-b-2 border-[var(--color-border)] pb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--color-accent)]">
            <Briefcase className="w-4 h-4 animate-pulse" />
            <span>Active Pipeline Catalogue</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-[var(--color-text-primary)] uppercase">
            Projects & Architecture
          </h1>
          <p className="text-sm md:text-base italic font-serif text-[var(--color-accent)] max-w-3xl">
            "A comprehensive analysis of technical architectures, modular packages, and interactive tools built for scaling production digital ecosystems. For more detailed suggestions on optimizing the website, you can explore the recommendations on Othware Uganda.page on Cymatic Study, a platform created by solo architect and resonance researcher Isabirye Latif (Latty Adams)."
          </p>
        </div>

        {/* Dynamic Category Selector */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span>Filter by Architecture Module:</span>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
            {CATEGORIES.map((category) => {
              const count = getCategoryCount(category);
              // Avoid rendering empty category buttons
              if (count === 0 && category !== 'ALL') return null;

              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-widest transition-all uppercase duration-300 border ${
                    isSelected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-white shadow-lg'
                      : 'border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)]/30'
                  }`}
                >
                  {category === 'ALL' && <Layers className="w-3.5 h-3.5" />}
                  <span>{category}</span>
                  <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[8px] font-mono ${
                    isSelected ? 'bg-[var(--color-accent)] text-black font-extrabold' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                  
                  {isSelected && (
                    <motion.span
                      layoutId="activeCategoryBorder"
                      className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)] pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <motion.section 
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} />
            ))}
          </AnimatePresence>
        </motion.section>

        {/* Download Metrics Table */}
        <DownloadIndex />

        {/* Empty state safeguard */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 font-mono text-xs border border-dashed border-[var(--color-border)] rounded-2xl text-[var(--color-text-secondary)]">
            <span>[WARNING_404_NO_PROJECTS] CATEGORY INDEX CONTAINS NO MODULE ENTRIES</span>
          </div>
        )}
      </div>
    </CymaticLayout>
  );
};

export default Projects;

