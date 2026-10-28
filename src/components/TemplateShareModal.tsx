import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Globe, QrCode, Sparkles, Send, MessageCircle, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface TemplateShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    id: string;
    title: string;
    category: string;
    description: string;
    path: string;
  } | null;
}

export const TemplateShareModal: React.FC<TemplateShareModalProps> = ({ isOpen, onClose, template }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!template) return null;

  // Build branded share URL with ref and UTM tracking
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://latty-portfolio.web.app';
  const shareUrl = `${baseUrl}/template/${template.id}?ref=isabirye_latif_hub&utm_source=template_share&utm_medium=social`;
  const message = `Check out "${template.title}" — a professional ${template.category} blueprint engineered by Isabirye Latif (Cymatic Evolution). Explore the live immersive preview here:`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${template.title} | Isabirye Latif Blueprints`,
          text: message,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleSocialShare = (platform: 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'facebook' | 'reddit' | 'email' | 'sms') => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(message);
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'reddit':
        url = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(template.title)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(`Professional Template: ${template.title}`)}&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
      case 'sms':
        url = `sms:?body=${encodedText}%20${encodedUrl}`;
        break;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-lg bg-[#090D1A] rounded-3xl border border-blue-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <header className="h-16 bg-[#111625] border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    Share Blueprint <Sparkles className="w-3 h-3 text-amber-400" />
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Isabirye Latif Branded Distribution</span>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Template card preview snippet */}
              <div className="bg-[#111625] border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-sm shrink-0">
                  {template.title.slice(0, 2).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white font-bold text-sm truncate">{template.title}</h4>
                  <p className="text-slate-400 text-xs truncate">{template.description}</p>
                  <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mt-1 uppercase">{template.category}</span>
                </div>
              </div>

              {/* Branded Link Box */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 flex items-center justify-between">
                  <span>Branded Secure Share URL</span>
                  <span className="text-blue-400 lowercase">utm + ref encoded</span>
                </label>
                <div className="flex items-center gap-2 bg-[#111625] border border-slate-800 rounded-xl p-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full bg-transparent text-slate-300 text-xs font-mono px-2 py-1 outline-none truncate"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 shadow-lg shadow-blue-600/20"
                  >
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
              </div>

              {/* QR Code Handoff Toggle */}
              <div className="flex items-center justify-between bg-[#111625] border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-xs block">Mobile Handoff QR</span>
                    <span className="text-[10px] text-slate-400 font-mono">Instant cross-device preview</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono font-bold transition-all"
                >
                  {showQR ? 'Hide QR' : 'Show QR'}
                </button>
              </div>

              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl space-y-3 shadow-inner"
                >
                  <QRCodeSVG value={shareUrl} size={150} />
                  <span className="text-[10px] font-mono text-slate-700 font-bold uppercase tracking-wider">Scan to open {template.title}</span>
                </motion.div>
              )}

              {/* All Possible Social & Messaging Platforms */}
              <div className="space-y-3">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Share on All Platforms</label>
                <div className="grid grid-cols-4 gap-2.5">
                  <button
                    onClick={() => handleSocialShare('whatsapp')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('telegram')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <Send className="w-4 h-4 text-blue-400" />
                    <span>Telegram</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('twitter')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <span className="text-sky-400 font-black text-sm">𝕏</span>
                    <span>Twitter/X</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('linkedin')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <span className="text-blue-500 font-black text-sm">in</span>
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <span className="text-blue-600 font-black text-sm">f</span>
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('reddit')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <span className="text-orange-500 font-black text-sm">r/</span>
                    <span>Reddit</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('email')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>Email</span>
                  </button>
                  <button
                    onClick={() => handleSocialShare('sms')}
                    className="py-3 bg-[#111625] hover:bg-[#1A2238] border border-slate-800 rounded-xl text-slate-200 hover:text-white text-[11px] font-mono font-bold transition-all flex flex-col items-center gap-1.5 shadow"
                  >
                    <span className="text-emerald-400 font-bold text-sm">SMS</span>
                    <span>Text/SMS</span>
                  </button>
                </div>
              </div>

              {/* Native Web Share fallback / trigger */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full py-3.5 bg-[#171E30] hover:bg-[#202A45] border border-slate-700 text-white rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Globe className="w-4 h-4 text-blue-400" /> Open Device Share Sheet
                </button>
              )}
            </div>

            {/* Footer watermark */}
            <footer className="h-12 bg-[#111625] border-t border-slate-800 flex items-center justify-center px-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
              © 2026 Isabirye Latif • Cymatic Evolution Protocol
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
