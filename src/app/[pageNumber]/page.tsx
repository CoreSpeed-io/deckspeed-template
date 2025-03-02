import { notFound } from 'next/navigation';
import SlideLayout from '@/components/SlideLayout';
import dynamic from 'next/dynamic';
import './print.css';

interface PageProps {
  params: {
    pageNumber: string;
  };
}

export default async function SlidePage({ params }: PageProps) {
  const pageNumber = parseInt((await params).pageNumber);

  // Validate page number
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  // Dynamically import the slide content based on page number
  const SlideContent = dynamic(() =>
    import(`@/slides/${pageNumber}`).catch(() => notFound())
  );

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4 print:p-0">
      <SlideLayout>
        <SlideContent />
      </SlideLayout>
    </div>
  );
} 