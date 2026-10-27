import React from 'react';
import { useParams, Link } from 'react-router-dom';
import templatesData from '../data/templates.json';
import { ExternalLink, ArrowLeft } from 'lucide-react';

export const TemplatePageView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const templateId = id || window.location.pathname.replace('/', '');
  const template = templatesData.find(t => t.id === templateId);

  const path = template ? template.path : `/showcase/${templateId}/index.html`;

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col relative bg-white m-0 p-0">
      {/* Minimal floating return header */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white shadow-2xl opacity-80 hover:opacity-100 transition-opacity">
        <Link to="/showcase" className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white">
          <ArrowLeft className="w-3.5 h-3.5" /> Showcase
        </Link>
        <span className="text-slate-600">|</span>
        <span className="text-xs font-mono text-blue-400 font-bold">{template?.title || templateId}</span>
        <a href={path} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white" title="Open in new tab">
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Full-screen original design render */}
      <iframe 
        src={path}
        className="w-full h-full border-none m-0 p-0 bg-white"
        title={template?.title || templateId}
      />
    </div>
  );
};

export default TemplatePageView;
