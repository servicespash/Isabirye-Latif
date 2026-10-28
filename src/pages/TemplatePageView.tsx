import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import templatesData from '../data/templates.json';
import { ExternalLink, ArrowLeft, Share2 } from 'lucide-react';
import { TemplateShareModal } from '../components/TemplateShareModal';

export const TemplatePageView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const templateId = id || window.location.pathname.replace('/', '');
  const template = templatesData.find(t => t.id === templateId);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const path = template ? template.path : `/showcase/${templateId}/index.html`;

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col relative bg-white m-0 p-0">
      {/* Minimal floating return header */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2 md:gap-3 bg-black/90 backdrop-blur-md px-3 md:px-4 py-2 rounded-full border border-white/20 text-white shadow-2xl">
        <Link to="/showcase" className="flex items-center gap-1 text-[11px] md:text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white">
          <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Showcase</span>
        </Link>
        <span className="text-slate-600">|</span>
        <span className="text-[11px] md:text-xs font-mono text-blue-400 font-bold truncate max-w-[120px] md:max-w-none">{template?.title || templateId}</span>
        
        <button
          onClick={() => setIsShareOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shrink-0"
          title="Share Template"
        >
          <Share2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Share</span>
        </button>

        <a href={path} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white p-1" title="Open in new tab">
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Floating Mobile Share Action Button for Touch Browsers */}
      <div className="fixed bottom-6 right-6 z-[100] md:hidden">
        <button
          onClick={() => setIsShareOpen(true)}
          className="px-5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-mono font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-blue-400/40"
        >
          <Share2 className="w-4 h-4" /> Share Template
        </button>
      </div>

      {/* Full-screen original design render */}
      <iframe 
        src={path}
        className="w-full h-full border-none m-0 p-0 bg-white"
        title={template?.title || templateId}
      />

      <TemplateShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        template={template || {
          id: templateId,
          title: templateId,
          category: 'Blueprint',
          description: 'Professional web template blueprint.',
          path
        }}
      />
    </div>
  );
};

export default TemplatePageView;
