import React from 'react';

// Hand-drawn SVG doodle elements with live drawing appear effects

export const HandArrowDown: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    className={`stroke-current overflow-visible ${className}`}
  >
    <path
      d="M 8 4 C 18 6, 24 16, 20 26 M 15 22 L 20 26 L 25 21"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1"
      className="animate-draw-arrow-svg"
    />
  </svg>
);

export const HandArrowLeft: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    className={`stroke-current overflow-visible ${className}`}
  >
    <path
      d="M 28 16 C 20 15, 12 17, 6 16 M 12 10 L 6 16 L 12 22"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1"
      className="animate-draw-arrow-svg"
    />
  </svg>
);

export const HandArrowRight: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    className={`stroke-current overflow-visible ${className}`}
  >
    <path
      d="M 4 16 C 12 15, 20 17, 26 16 M 20 10 L 26 16 L 20 22"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1"
      className="animate-draw-arrow-svg"
    />
  </svg>
);

export const HandUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-24 h-4',
  color = '#FF1E42',
}) => (
  <svg
    viewBox="0 0 120 16"
    fill="none"
    className={`overflow-visible ${className}`}
  >
    <path
      d="M 4 11 C 24 6, 60 14, 116 8 C 80 12, 40 10, 10 13"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      pathLength="1"
      className="animate-draw-line"
    />
  </svg>
);

export const HandCircle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#FE1743',
}) => (
  <svg
    viewBox="0 0 160 48"
    fill="none"
    preserveAspectRatio="none"
    className={`absolute pointer-events-none -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] overflow-visible ${className}`}
  >
    <path
      d="M 18 24 C 15 10, 48 4, 100 5 C 145 6, 156 15, 154 27 C 151 39, 122 44, 78 45 C 34 46, 7 40, 6 24 C 5 11, 35 4, 82 4"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1"
      className="animate-draw-circle-svg"
    />
  </svg>
);

export const HandDoodleStar: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-[#FF1E42]' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`stroke-current overflow-visible ${className}`}>
    <path
      d="M12 2L13.5 9L20 10L14.5 14L16 21L11.5 16.5L6 20L8 13.5L3 9.5L9.5 9L12 2Z"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1"
      className="animate-draw-line"
    />
  </svg>
);
