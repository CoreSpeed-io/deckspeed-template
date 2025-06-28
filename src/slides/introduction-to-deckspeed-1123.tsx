// This is an introductory slide that introduces the DeckSpeed platform and its core features.
// It is only for demo purposes. Please remove it before making your own presentation unless user asks for it.

import type { SlideMetadata } from '@/types/slides';

export const metadata: SlideMetadata = {
  title: "Welcome to DeckSpeed",
  description: "A blank slide to start your presentation"
};

export default function Slide() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-4xl text-center px-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to DeckSpeed</h1>
      </div>
    </div>
  );
} 