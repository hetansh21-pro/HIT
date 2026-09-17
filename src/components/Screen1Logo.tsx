import React, { useEffect } from 'react';
import { HitLogo } from './HitLogo';
import { BrandGeometricAccents } from './BrandGeometricAccents';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/sound';

interface Screen1LogoProps {
  onEnterScreen2: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Screen1Logo: React.FC<Screen1LogoProps> = ({
  onEnterScreen2,
  soundEnabled,
  onToggleSound,
}) => {
  const [canTransition, setCanTransition] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanTransition(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleTransition = () => {
    if (!canTransition) return;
    sound.playReveal();
    onEnterScreen2();
  };

  // Keyboard support: Space, Enter, or ArrowDown to proceed to Screen 2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleTransition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canTransition]);

  return (
    <div
      onClick={handleTransition}
      className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between items-center px-4 sm:px-6 py-5 sm:py-8 bg-white cursor-pointer select-none overflow-hidden transition-all duration-700"
    >
      {/* Exact Brand Shapes from User's Reference Images - Animated from full screen to sides */}
      <BrandGeometricAccents animateIntro={true} />

      {/* Top Bar on Screen 1 */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between">
        {/* Subtle Brand Tag */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF1E42] animate-pulse"></span>
          <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider sm:tracking-widest text-slate-400">
            HiT • PROCESS AUTOMATION
          </span>
        </div>

        {/* Top Right: Sound */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSound();
            }}
            className="p-2 sm:p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#FF1E42]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Screen 1 Center: Giant Full-Screen HIT Logo & Tagline with Reveal Animation */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center px-2 sm:px-4 max-w-3xl animate-logo-reveal">
        {/* Giant Fullscreen HIT Logo */}
        <div className="mb-6 sm:mb-10 transition-transform duration-500 transform hover:scale-105">
          <HitLogo size="hero" />
        </div>

        {/* Tagline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight text-slate-800 leading-tight mb-8 sm:mb-12 font-sans max-w-xl">
          We make work feel{' '}
          <span className="font-extrabold text-[#FF1E42]">
            automated
            <span className="text-[#DFFF00] font-black">.</span>
          </span>
        </h1>

        {/* Pure Hand-Drawn "HIT to see" */}
        <div className="relative inline-flex flex-col items-center group cursor-pointer select-none py-2 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.97]">
          <div className="relative flex items-center gap-3.5 sm:gap-5 font-hand text-5xl sm:text-7xl font-bold text-slate-800 group-hover:text-[#FF1E42] transition-colors duration-300">
            
            {/* The Word "HIT" with a Perfectly Shaped Red Marker Circle */}
            <span className="relative font-bold text-[#FF1E42] px-4 py-1.5 inline-flex items-center justify-center">
              <span>HIT</span>

              {/* Hand-drawn red marker circle */}
              <svg
                viewBox="0 0 140 70"
                fill="none"
                className="absolute -inset-2.5 sm:-inset-3.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none stroke-[#FF1E42] group-hover:scale-108 transition-transform duration-300 ease-out"
              >
                <path
                  d="M 28 26 C 22 10, 52 6, 82 8 C 114 10, 134 18, 135 36 C 136 55, 110 65, 74 65 C 36 65, 9 56, 8 37 C 7 18, 30 11, 48 10"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="100"
                  className="animate-draw-circle"
                />
              </svg>
            </span>

            {/* Hand-written "to see" text */}
            <span className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
              to see
            </span>

            {/* Hand-drawn sketched arrow */}
            <svg
              viewBox="0 0 48 24"
              fill="none"
              className="w-10 sm:w-14 h-6 sm:h-8 stroke-[#FF1E42] group-hover:translate-x-2.5 transition-transform duration-300 ease-out shrink-0"
            >
              <path
                d="M 4 12 C 16 11, 28 13, 42 12 M 32 4 C 36 8, 40 11, 44 12 C 40 13, 36 16, 32 20"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="100"
                className="animate-draw-arrow"
              />
            </svg>
          </div>

          {/* Hand-drawn squiggly sketch underline */}
          <svg
            viewBox="0 0 180 16"
            fill="none"
            className="w-52 sm:w-72 h-4 mt-2 stroke-[#FF1E42]"
          >
            <path
              d="M 6 10 C 35 4, 90 14, 172 7 C 120 12, 60 9, 14 12"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength="100"
              className="animate-draw-underline"
            />
          </svg>
        </div>
      </div>

      {/* Empty bottom spacer for perfect vertical balance */}
      <div className="h-6"></div>
    </div>
  );
};
