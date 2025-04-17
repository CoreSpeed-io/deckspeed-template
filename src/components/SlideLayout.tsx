import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { DeckMetadata, Orientation, PaperSize } from "../types/slides";
import { PAPER_SIZES } from "../types/slides";
import metadata from "../slides/metadata.json";

// Typed metadata for type safety
const typedMetadata = metadata as DeckMetadata;

// Sort slides by their order for navigation
const sortedSlides = Object.entries(typedMetadata.order)
  .sort((a, b) => a[1] - b[1])
  .map(([id]) => id);

interface SlideLayoutProps {
  slideId: string;
  children: React.ReactNode;
  paperSize?: PaperSize;
  orientation?: Orientation;
  title?: string;
  description?: string;
  isThumbnail?: boolean;
}

const SlideLayout = ({
  slideId: _slideId,
  children,
  paperSize = "A4",
  orientation = "landscape",
  title,
  description: _description,
  isThumbnail = false,
}: SlideLayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Get the original size definition
  const size = PAPER_SIZES[paperSize];
  // Determine if the paper size is naturally portrait or landscape
  const isPaperSizePortrait = size.width / size.height < 1;
  // Calculate dimensions based on natural orientation and requested orientation
  const { width, height } = 
    // If natural orientation matches requested orientation, use as is
    (isPaperSizePortrait && orientation === "portrait") || 
    (!isPaperSizePortrait && orientation === "landscape")
      ? size
      : { width: size.height, height: size.width };
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
        const scaleX = (containerRect.width - padding * 2) /
          (width * 3.7795275591);
        const scaleY = (containerRect.height - padding * 2) /
          (height * 3.7795275591);
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
      style={isThumbnail ? { overflow: "hidden" } : {}}
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
          transformOrigin: "center center",
          opacity: isScaled ? 1 : 0,
          transition: "opacity 0.1s ease-in-out",
          ...(isThumbnail ? {} : {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }),
        }}
        title={title}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideLayout;

// Export the sortedSlides for use in other components
export { sortedSlides };
