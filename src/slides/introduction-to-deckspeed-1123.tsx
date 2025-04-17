import type { SlideMetadata } from '@/types/slides';

export const metadata: SlideMetadata = {
  title: "Introduction to DeckSpeed",
  description: "An overview of DeckSpeed's core features and value proposition"
};

export default function Slide() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl text-center px-8">
        <h1 className="text-6xl font-bold text-indigo-800 mb-6">DeckSpeed</h1>
        <p className="text-2xl text-gray-700 mb-10">Create beautiful slide decks with the power of AI</p>
        
        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Effortless Creation</h3>
            <p className="text-gray-600">Transform your ideas into professional presentations in seconds</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">Beautiful Design</h3>
            <p className="text-gray-600">Stunning templates and layouts that make your content shine</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">AI-Powered</h3>
            <p className="text-gray-600">Smart suggestions and content generation to save you time</p>
          </div>
        </div>
      </div>
    </div>
  );
} 