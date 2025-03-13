"use client"

import React, { useEffect, useRef, useState } from 'react';
import { PaperSize, Orientation, PAPER_SIZES } from '@/types/slides';

interface SlideLayoutProps {
  children: React.ReactNode;
  paperSize?: PaperSize;
  orientation?: Orientation;
  title?: string;
  description?: string;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  paperSize = 'A4',
  orientation = 'landscape',
  title,
  description
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const size = PAPER_SIZES[paperSize];
  const { width, height } = orientation === 'portrait' ? size : { width: size.height, height: size.width };
  const aspectRatio = `${width}/${height}`;

  const [isScaled, setIsScaled] = useState(false);
  const [scale, setScale] = useState(0);

  // Calculate initial scale before render
  useEffect(() => {
    const container = containerRef.current;
    const slide = slideRef.current;
    if (!container || !slide) return;

    const updateScale = () => {
      const containerRect = container.getBoundingClientRect();
      const padding = 16; // 1rem
      const scaleX = (containerRect.width - padding * 2) / (width * 3.7795275591); // Convert mm to px (1mm ≈ 3.7795275591px)
      const scaleY = (containerRect.height - padding * 2) / (height * 3.7795275591);
      const newScale = Math.min(1, Math.min(scaleX, scaleY));
      setScale(newScale);
      slide.style.setProperty('--scale', newScale.toString());
      
      if (!isScaled) {
        setIsScaled(true);
      }
    };

    // Run immediately
    updateScale();

    // Also set up observer for future resizes
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [width, height, isScaled]);

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
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          opacity: isScaled ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
        }}
        title={title}
        aria-description={description}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideLayout;
