import { notFound } from 'next/navigation';
import SlideLayout from '@/components/SlideLayout';
import dynamic from 'next/dynamic';
import mapping from '@/slides/metadata.json';
import './print.css';
import type { SlideMetadata } from '@/types/slides';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const slideMapping = mapping as SlideMetadata;

  // Validate ID exists in mapping
  if (!slideMapping.slides[id]) {
    return {
      title: slideMapping.title,
      description: slideMapping.description
    };
  }

  const slideInfo = slideMapping.slides[id];
  
  return {
    title: `${slideInfo.title} | ${slideMapping.title}`,
    description: slideInfo.description
  };
}

export default async function SlidePage({ params }: PageProps) {
  const { id } = await params;
  const slideMapping = mapping as SlideMetadata;

  // Validate ID exists in mapping
  if (!slideMapping.slides[id]) {
    notFound();
  }

  const slideInfo = slideMapping.slides[id];

  // Dynamically import the slide content based on ID
  const SlideContent = dynamic(() =>
    import(`@/slides/${id}`).catch(() => notFound())
  );

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4 print:p-0">
      <SlideLayout 
        paperSize={slideMapping.paperSize}
        orientation={slideMapping.orientation}
        title={slideInfo.title}
        description={slideInfo.description}
      >
        <SlideContent />
      </SlideLayout>
    </div>
  );
}
