import type { SlideMetadata } from '@/types/slides';

export const metadata: SlideMetadata = {
  title: "How DeckSpeed Works",
  description: "Step-by-step explanation of the DeckSpeed presentation creation process"
};

export default function Slide() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-5xl w-full px-12">
        <h2 className="text-4xl font-bold text-indigo-800 mb-12 text-center">How DeckSpeed Works</h2>
        
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md relative">
            <div className="absolute -top-5 -left-5 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-2">Describe Your Idea</h3>
            <p className="text-gray-600">Simply tell DeckSpeed what you want to present about in plain language</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md relative">
            <div className="absolute -top-5 -left-5 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-2">AI Creates Your Deck</h3>
            <p className="text-gray-600">Our AI generates a complete presentation with beautiful slides and content</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md relative">
            <div className="absolute -top-5 -left-5 bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-2">Customize & Export</h3>
            <p className="text-gray-600">Fine-tune your presentation and export it in your preferred format</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-xl text-indigo-700 font-medium">Ready in minutes, not hours!</p>
        </div>
      </div>
    </div>
  );
} 