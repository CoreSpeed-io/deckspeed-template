import { lazy, Suspense } from "react";
import { useSearch } from "@tanstack/react-router";
import metadata from "../slides/metadata.json";
import type {
  DeckMetadata,
  Orientation,
  PaperSize,
} from "../types/slides";
import SlideLayout from "./SlideLayout";
import "./print.css";

const typedMetadata = metadata as DeckMetadata;

export const Slide = ({ id, index }: { id?: string; index?: number }) => {
  let slideId = id;
  const slideIndex = index;

  const { thumbnail } = useSearch({
    from: slideId !== undefined
      ? `/by-id/${slideId}`
      : slideIndex !== undefined
      ? `/by-index/${slideIndex}`
      : "/",
  }) as { thumbnail?: boolean };

  // If we're looking up by index, find the corresponding ID
  if (index !== undefined) {
    const entries = Object.entries(typedMetadata.order);
    const matchingEntry = entries.find(
      ([_, orderIndex]) => orderIndex === index,
    );
    slideId = matchingEntry ? matchingEntry[0] : undefined;
  }

  if (!slideId) {
    return <div>Slide not found</div>;
  }

  // Dynamically import the slide component
  const SlideContent = lazy(() =>
    import(`../slides/${slideId}.tsx`).catch(() => ({
      default: () => <div>Error loading slide: {slideId}</div>,
    }))
  );

  return (
    <div
      className={`w-full h-screen ${
        thumbnail ? "" : "flex items-center justify-center bg-gray-100 p-4"
      } print:p-0`}
    >
      <SlideLayout
        slideId={slideId}
        paperSize={metadata.paperSize as PaperSize}
        orientation={metadata.orientation as Orientation}
        title={metadata.title}
        description={metadata.description}
        isThumbnail={thumbnail}
      >
        <Suspense fallback={<div />}>
          <SlideContent />
        </Suspense>
      </SlideLayout>
    </div>
  );
};
