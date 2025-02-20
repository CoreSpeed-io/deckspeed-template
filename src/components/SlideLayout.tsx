import React from 'react';

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
  const size = PAPER_SIZES[paperSize];
  const { width, height } = orientation === 'portrait' ? size : { width: size.height, height: size.width };
  const aspectRatio = `${width}/${height}`;

  return (
    <div
      id="slide-layout"
      className="bg-white shadow-lg"
      style={{
        width: `${width}mm`,
        height: `${height}mm`,
        maxHeight: '90vh',
        aspectRatio,
        transform: 'scale(var(--scale))',
        transformOrigin: 'center center',
        ['--scale' as string]: `min(1, min((90vh - 2rem)/${height}mm, (100vw - 2rem)/${width}mm))`,
      }}
    >
      {children}
    </div>
  );
};

export default SlideLayout; 