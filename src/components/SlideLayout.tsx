"use client"

import React, { useEffect, useRef, useState } from 'react';
import { PaperSize, Orientation, PAPER_SIZES } from '@/types/slides';

interface SlideLayoutProps {
  children: React.ReactNode;
  paperSize?: PaperSize;
  orientation?: Orientation;
  title?: string;
  description?: string;
  isThumbnail?: boolean;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  paperSize = 'A4',
  orientation = 'landscape',
  title,
  description,
  isThumbnail = false
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
      
      if (isThumbnail) {
        // For thumbnails, use the maximum scale to completely fill the container
        // This may crop some content but eliminates white bezels
        const scaleX = containerRect.width / (width * 3.7795275591); // Convert mm to px
        const scaleY = containerRect.height / (height * 3.7795275591);
        
        // Use the larger scale to ensure full coverage
        const newScale = Math.max(scaleX, scaleY);
        setScale(newScale);
      } else {
        // For regular slides, maintain the padding and limit to scale 1
        const padding = 16; // 1rem padding for regular slides
        const scaleX = (containerRect.width - padding * 2) / (width * 3.7795275591);
        const scaleY = (containerRect.height - padding * 2) / (height * 3.7795275591);
        const newScale = Math.min(1, Math.min(scaleX, scaleY));
        setScale(newScale);
      }
      
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
  }, [width, height, isScaled, isThumbnail]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={isThumbnail ? { overflow: 'hidden' } : {}}
    >
      <div
        ref={slideRef}
        id="slide-layout"
        className="bg-white"
        style={{
          width: `${width}mm`,
          height: `${height}mm`,
          aspectRatio,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          opacity: isScaled ? 1 : 0,
          transition: 'opacity 0.1s ease-in-out',
          ...(isThumbnail ? {} : { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' })
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
