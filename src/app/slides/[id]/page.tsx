import { notFound } from 'next/navigation';
import SlideLayout from '@/components/SlideLayout';
import dynamic from 'next/dynamic';
import mapping from '@/slides/metadata.json';
import './print.css';
import type { DeckMetadata } from '@/types/slides';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const slideMapping = mapping as DeckMetadata;

  // Validate ID exists in mapping
  if (!slideMapping.order.hasOwnProperty(id)) {
    return {
      title: slideMapping.title,
      description: slideMapping.description
    };
  }

  // Since we don't have slide info with titles and descriptions,
  // we'll use the ID as part of the title
  return {
    title: `Slide ${slideMapping.order[id]} | ${slideMapping.title}`,
    description: slideMapping.description
  };
}

export default async function SlidePage({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { id } = await params;
  const slideMapping = mapping as DeckMetadata;
  const isThumbnail = (await searchParams).thumbnail === 'true';

  // Validate ID exists in mapping
  if (!slideMapping.order.hasOwnProperty(id)) {
    notFound();
  }

  // Since we don't have slide info with titles and descriptions,
  // we'll use the ID and position for display
  const slidePosition = slideMapping.order[id];
  const slideTitle = `Slide ${slidePosition}`;
  const slideDescription = `${slideMapping.title} - Slide ${slidePosition}`;

  // Dynamically import the slide content based on ID
  const SlideContent = dynamic(() =>
    import(`@/slides/${id}`).catch(() => notFound())
  );

  return (
    <div className={`w-full h-screen ${isThumbnail ? '' : 'flex items-center justify-center bg-gray-100 p-4'} print:p-0`}>
      <SlideLayout 
        paperSize={slideMapping.paperSize}
        orientation={slideMapping.orientation}
        title={slideTitle}
        description={slideDescription}
        isThumbnail={isThumbnail}
      >
        <SlideContent />
      </SlideLayout>
    </div>
  );
}
