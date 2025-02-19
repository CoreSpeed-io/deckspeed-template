import { notFound } from 'next/navigation';
import SlideLayout from '@/components/SlideLayout';
import dynamic from 'next/dynamic';

interface PageProps {
  params: {
    pageNumber: string;
  };
}

export default function SlidePage({ params }: PageProps) {
  const pageNumber = parseInt(params.pageNumber);

  // Validate page number
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  // Dynamically import the slide content based on page number
  const SlideContent = dynamic(() =>
    import(`@/slides/${pageNumber}`).catch(() => notFound())
  );

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
      <SlideLayout>
        <SlideContent />
      </SlideLayout>
    </div>
  );
} 