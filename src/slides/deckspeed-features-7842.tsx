import type { SlideMetadata } from '@/types/slides';

export const metadata: SlideMetadata = {
  title: "DeckSpeed Features",
  description: "Detailed overview of key features and benefits of using DeckSpeed"
};

export default function Slide() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <div className="max-w-5xl w-full px-12">
        <h2 className="text-4xl font-bold text-indigo-800 mb-10 text-center">Why Choose DeckSpeed?</h2>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Create complete presentations in minutes instead of hours</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable Templates</h3>
                <p className="text-gray-600">Choose from dozens of professionally designed templates</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Collaboration</h3>
                <p className="text-gray-600">Share and collaborate with your team in real-time</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Formatting</h3>
                <p className="text-gray-600">AI automatically formats your content for maximum impact</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 