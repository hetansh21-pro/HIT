import React, { useState, useEffect } from 'react';
import { HitLogo } from './HitLogo';
import { Zap, ArrowDown, Volume2, VolumeX, MousePointerClick } from 'lucide-react';
import { sound } from '../utils/sound';

interface FullscreenIntroProps {
  onEnter: () => void;
}

export const FullscreenIntro: React.FC<FullscreenIntroProps> = ({ onEnter }) => {
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleStart = () => {
    sound.playReveal();
    setIsTransitioning(true);
    setTimeout(() => {
      onEnter();
    }, 450);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const state = sound.toggleSound();
    setSoundActive(state);
  };

  // Allow pressing Enter or Space to begin as well
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onClick={handleStart}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 cursor-pointer select-none transition-all duration-500 overflow-hidden bg-[#070B14] ${
        isTransitioning
          ? 'opacity-0 scale-95 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Red & Neon Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#FF1E42]/15 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-[#DFFF00]/10 rounded-full blur-[90px]"></div>

        {/* Subtle geometric dot grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(#94A3B8 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        ></div>
      </div>

      {/* Top Bar: Subtitle, Hetansh Badge & Sound Toggle */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E42] animate-ping"></span>
          <span className="text-xs font-mono font-semibold tracking-widest uppercase text-slate-400 hidden sm:inline">
            HIT AI SYSTEMS • 2026
          </span>
        </div>

        {/* Center Name Badge */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#DFFF00]/40 shadow-lg shadow-[#DFFF00]/5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFFF00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DFFF00]"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-[#DFFF00]">HETANSH</span>
          <span className="text-slate-600">•</span>
          <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-300">PROCESS AUTOMATION</span>
        </div>

        <button
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors backdrop-blur-md ml-auto"
          title={soundActive ? 'Mute sound' : 'Enable sound'}
        >
          {soundActive ? <Volume2 className="w-4 h-4 text-[#DFFF00]" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Center: Hero Logo & Value Statement */}
      <div className="flex flex-col items-center text-center my-auto z-10 max-w-3xl px-4">
        {/* Fullscreen Logo Presentation */}
        <div className="relative group mb-8">
          {/* Animated concentric ripples */}
          <div className="absolute -inset-4 bg-[#FF1E42]/20 rounded-full blur-xl group-hover:bg-[#FF1E42]/35 transition-all"></div>
          
          <div className="relative transition-transform duration-500 transform group-hover:scale-105">
            <HitLogo size="giant" showBackground={true} />
          </div>

          {/* Floating Neon Badge */}
          <div className="absolute -bottom-3 -right-3 bg-[#0B101D] border border-[#DFFF00]/40 text-[#DFFF00] text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-[#DFFF00]" />
            <span>AI WORKERS</span>
          </div>
        </div>

        {/* Company Title & Direct Pitch */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          AI Transformation for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Traditional Businesses
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mb-3">
          “We don’t sell AI. We find one expensive, repetitive process in your business and replace it with an AI-powered system.”
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium text-slate-400 mb-8">
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
            Excel ➔ AI
          </span>
          <span className="text-[#FF1E42]">•</span>
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
            WhatsApp ➔ Automation
          </span>
          <span className="text-[#FF1E42]">•</span>
          <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
            Manual Work ➔ Software
          </span>
        </div>

        {/* The Click / Tap Trigger */}
        <div className="relative inline-flex items-center">
          {/* Ripple animation around button */}
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#FF1E42] to-[#DFFF00] opacity-50 blur-sm animate-pulse"></span>
          
          <button
            onClick={handleStart}
            className="relative px-7 py-3.5 sm:px-9 sm:py-4 rounded-2xl bg-[#FF1E42] hover:bg-[#E01536] text-white font-bold text-sm sm:text-base flex items-center gap-3 shadow-2xl shadow-red-900/50 transition-all transform hover:scale-[1.03] active:scale-95"
          >
            <MousePointerClick className="w-5 h-5 text-[#DFFF00]" />
            <span>Tap Anywhere to Explore Questions</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="z-10 text-center text-xs text-slate-500 flex items-center gap-2">
        <span>Click anywhere or press Space to see client questions</span>
      </div>
    </div>
  );
};
