import { notFound } from 'next/navigation';
import SlideLayout from '@/components/SlideLayout';

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

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
      <SlideLayout>
        {/* page content */}
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">Slide {pageNumber}</h1>
        </div>
      </SlideLayout>
    </div>
  );
} 