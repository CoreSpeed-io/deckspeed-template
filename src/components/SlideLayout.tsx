"use client"

import React, { useEffect, useRef } from 'react';

// Standard paper sizes in millimeters
export const PAPER_SIZES = {
  'A4': { width: 210, height: 297 },
  'A3': { width: 297, height: 420 },
  'A5': { width: 148, height: 210 },
  'LETTER': { width: 215.9, height: 279.4 },
  'LEGAL': { width: 215.9, height: 355.6 },
  'TABLOID': { width: 279.4, height: 431.8 },
  'PRESENTATION': { width: 254, height: 190.5 }, // 4:3 aspect ratio
  'WIDE': { width: 320, height: 180 }, // 16:9 aspect ratio
} as const;

export type PaperSize = keyof typeof PAPER_SIZES;

interface SlideLayoutProps {
  children: React.ReactNode;
  paperSize?: PaperSize;
  orientation?: 'portrait' | 'landscape';
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  paperSize = 'A4',
  orientation = 'landscape'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const size = PAPER_SIZES[paperSize];
  const { width, height } = orientation === 'portrait' ? size : { width: size.height, height: size.width };
  const aspectRatio = `${width}/${height}`;

  useEffect(() => {
    const container = containerRef.current;
    const slide = slideRef.current;
    if (!container || !slide) return;

    const updateScale = () => {
      const containerRect = container.getBoundingClientRect();
      const padding = 16; // 1rem
      const scaleX = (containerRect.width - padding * 2) / (width * 3.7795275591); // Convert mm to px (1mm ≈ 3.7795275591px)
      const scaleY = (containerRect.height - padding * 2) / (height * 3.7795275591);
      const scale = Math.min(1, Math.min(scaleX, scaleY));
      slide.style.setProperty('--scale', scale.toString());
    };

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);
    updateScale(); // Initial scale update

    return () => {
      resizeObserver.disconnect();
    };
  }, [width, height]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
    >
      <div
        ref={slideRef}
        id="slide-layout"
        className="bg-white shadow-lg"
        style={{
          width: `${width}mm`,
          height: `${height}mm`,
          aspectRatio,
          transform: 'scale(var(--scale))',
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideLayout;
