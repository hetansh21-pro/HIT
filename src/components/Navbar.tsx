import React from 'react';
import { HitLogo } from './HitLogo';
import { MessageSquare, RotateCcw, Calendar, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  onReturnIntro: () => void;
  onOpenAuditModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReturnIntro,
  onOpenAuditModal,
  soundEnabled,
  onToggleSound,
}) => {
  const handleWhatsApp = () => {
    sound.playClick();
    const msg = encodeURIComponent("Hi HIT team, I'd like to discuss automating our business processes.");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070B14]/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between relative">
        {/* Left: Brand / Return to Intro */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              sound.playClick();
              onReturnIntro();
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
            title="Click to view fullscreen logo screen"
          >
            <HitLogo size="sm" showBackground={true} className="transition-transform group-hover:scale-105" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black text-white tracking-tight">HIT</span>
                <span className="text-[10px] font-mono text-[#DFFF00] bg-slate-800 px-1.5 py-0.2 rounded font-bold">
                  AI SYSTEMS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI for Traditional Businesses
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onReturnIntro();
            }}
            className="hidden md:flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded-md hover:bg-slate-800/50 transition-colors ml-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Full Intro</span>
          </button>
        </div>

        {/* Center Name & Subtitle Badge */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#DFFF00]/40 shadow-lg shadow-[#DFFF00]/5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFFF00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DFFF00]"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-[#DFFF00]">HETANSH</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-300">PROCESS AUTOMATION</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#DFFF00]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleWhatsApp}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 px-3.5 py-2 rounded-xl transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Us</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenAuditModal();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-[#FF1E42] hover:bg-[#E01536] px-3.5 sm:px-4 py-2 rounded-xl shadow-lg shadow-red-950/50 transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Book AI Audit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
