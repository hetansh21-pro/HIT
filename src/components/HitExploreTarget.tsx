import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { HandArrowDown, HandArrowLeft } from './HandDrawnElements';

interface HitExploreTargetProps {
  onHit: () => void;
  label?: string;
  subLabel?: string;
  size?: 'md' | 'lg';
  showDoodle?: boolean;
}

export const HitExploreTarget: React.FC<HitExploreTargetProps> = ({
  onHit,
  label = 'Tap to explore',
  subLabel = 'HIT to see all details',
  size = 'lg',
  showDoodle = true,
}) => {
  const [isHitting, setIsHitting] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSuccess();
    setIsHitting(true);

    setTimeout(() => {
      onHit();
      setIsHitting(false);
    }, 380);
  };

  const dimensions = size === 'lg'
    ? {
        outer: 'w-20 h-20 sm:w-24 sm:h-24',
        middle: 'w-14 h-14 sm:w-16 sm:h-16',
        centerDot: 'w-4 h-4 sm:w-4.5 sm:h-4.5',
      }
    : {
        outer: 'w-16 h-16',
        middle: 'w-11 h-11',
        centerDot: 'w-3 h-3',
      };

  return (
    <div className="flex flex-col items-center select-none group cursor-pointer relative" onClick={handleClick}>
      
      {/* Hand-drawn doodle arrow pointing to target */}
      {showDoodle && (
        <div className="absolute -top-10 sm:-top-11 -right-24 sm:-right-28 hidden sm:flex items-center gap-1.5 text-slate-500 font-hand text-base select-none pointer-events-none">
          <span className="rotate-3 text-[#FF1E42] font-semibold">HIT to explore! ✍️</span>
          <HandArrowLeft className="w-5 h-5 text-[#FF1E42] -rotate-12 translate-y-1" />
        </div>
      )}

      {/* The Target Button Structure - Exactly Matching the Uploaded Image */}
      <button
        onClick={handleClick}
        className={`relative ${dimensions.outer} rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95 cursor-pointer focus:outline-none`}
        aria-label="HIT to see all details"
      >
        {/* 1. Outer Soft Glowing Ring */}
        <span
          className="absolute inset-0 rounded-full border border-red-200/80 bg-red-50/20 shadow-xs transition-all duration-300 group-hover:border-red-300 group-hover:bg-red-50/40"
        ></span>

        {/* Outer subtle animated ping pulse ring */}
        <span
          className="absolute inset-0 rounded-full border border-[#FF1E42]/40 animate-ping opacity-60 pointer-events-none"
        ></span>

        {/* 2. Middle Crisp White Circle with Red Outline */}
        <span
          className={`relative ${dimensions.middle} rounded-full border-2 sm:border-[2.5px] border-[#FF1E42] bg-white shadow-md shadow-red-500/10 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20 group-hover:scale-105`}
        >
          {/* 3. Center Solid Red Dot */}
          <span
            className={`${dimensions.centerDot} rounded-full bg-[#FF1E42] transition-transform duration-300 group-hover:scale-125 ${
              isHitting ? 'scale-150 animate-ping' : ''
            }`}
          ></span>
        </span>

        {/* Shockwave ripple expanding on hit */}
        {isHitting && (
          <span className="absolute inset-0 rounded-full border-2 border-[#FF1E42] animate-ripple pointer-events-none"></span>
        )}
      </button>

      {/* Label Matching the Image: "Tap to explore" */}
      <div className="mt-3 flex flex-col items-center">
        <span className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide group-hover:text-slate-900 transition-colors">
          {label}
        </span>
        {subLabel && (
          <span className="text-[11px] font-mono text-[#FF1E42] font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
            {subLabel} ➔
          </span>
        )}
      </div>
    </div>
  );
};
