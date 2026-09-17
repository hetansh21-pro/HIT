import React from 'react';

// Geometric brand shapes matching user's uploaded reference images exactly:
// 1. Neon Yellow Triangular Polygon on Left (TOP half side)
// 2. Tilted Red Diamond on Right Edge

interface BrandGeometricAccentsProps {
  animateIntro?: boolean;
}

export const BrandGeometricAccents: React.FC<BrandGeometricAccentsProps> = ({
  animateIntro = false,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Left Neon-Yellow Polygon (Matching media_1789568764761.png in Top Half) */}
      <div
        className={`absolute left-0 top-16 sm:top-20 w-28 sm:w-40 md:w-48 pointer-events-none ${
          animateIntro ? 'animate-yellow-shape-intro' : ''
        }`}
      >
        <svg
          viewBox="0 0 160 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M 0 32 L 158 126 L 38 276 L 0 216 Z"
            fill="#EEFF41"
          />
        </svg>
      </div>

      {/* 2. Right Red Tilted Square / Diamond (Matching media_1789568773550.png) */}
      <div
        className={`absolute right-0 bottom-14 sm:bottom-auto sm:top-[380px] w-36 h-36 sm:w-56 sm:h-56 translate-x-[36%] rotate-[38deg] bg-[#FE1743] pointer-events-none ${
          animateIntro ? 'animate-red-shape-intro' : ''
        }`}
        style={{
          boxShadow: '0 4px 20px -2px rgba(254, 23, 67, 0.2)',
        }}
      ></div>
    </div>
  );
};
