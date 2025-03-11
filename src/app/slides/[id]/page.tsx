import { notFound } from 'next/navigation';
import SlideLayout from '@/components/SlideLayout';
import dynamic from 'next/dynamic';
import mapping from '@/slides/mapping.json';
import './print.css';
import type { SlideMapping } from '@/types/slides';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function SlidePage({ params }: PageProps) {
  const { id } = await params;
  const slideMapping = mapping as SlideMapping;

  // Validate ID exists in mapping
  if (!slideMapping.slides[id]) {
    notFound();
  }

  // Dynamically import the slide content based on ID
  const SlideContent = dynamic(() =>
    import(`@/slides/${id}`).catch(() => notFound())
  );

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4 print:p-0">
      <SlideLayout>
        <SlideContent />
      </SlideLayout>
    </div>
  );
} 