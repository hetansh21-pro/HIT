import React from 'react';
import { HitLogo } from './HitLogo';
import { MessageSquare, ArrowUp, Calendar } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onReturnIntro: () => void;
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReturnIntro, onOpenAuditModal }) => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    sound.playClick();
    const msg = encodeURIComponent("Hello HIT Systems, I want to discuss automating our business processes.");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <footer className="w-full bg-[#050810] border-t border-slate-800/80 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <HitLogo size="md" showBackground={true} />
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">HIT AI SYSTEMS</h3>
              <p className="text-xs text-slate-400">
                AI Transformation for Boring, Cash-Generating Traditional Businesses
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Implementation Desk</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenAuditModal();
              }}
              className="flex items-center gap-2 text-xs font-bold text-white bg-[#FF1E42] hover:bg-[#E01536] px-4 py-2.5 rounded-xl shadow-lg shadow-red-950/40 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 1-Day Audit</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            “Tell us what your employees do manually. We’ll show you what AI can replace.”
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onReturnIntro();
              }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Replay Fullscreen Intro
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
