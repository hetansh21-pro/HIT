import React from 'react';

interface HitLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
}

export const HitLogo: React.FC<HitLogoProps> = ({
  className = '',
  size = 'hero',
}) => {
  // Size presets preserving exact aspect ratio 607 : 444
  const sizeMap = {
    xs: 'h-6 w-auto',
    sm: 'h-9 w-auto',
    md: 'h-16 w-auto',
    lg: 'h-24 w-auto',
    hero: 'w-64 sm:w-80 md:w-96 h-auto',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* 
        Exact logo from uploaded image with:
        - Background removed (100% transparent)
        - Colors opposite: Letters H, I, T in #fe1743 (original red background color)
        - Top diagonal slash of I in #eeff41 (signature neon yellow)
        - Exact same font, geometry, cut angle, and proportions
      */}
      <img
        src="/hit-logo-opposite.png"
        alt="HIT Logo"
        className={`${sizeMap[size]} object-contain drop-shadow-xs`}
        loading="eager"
      />
    </div>
  );
};
