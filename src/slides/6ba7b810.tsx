export default function Slide() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-rows-2 gap-8 h-1/2">
        <div className="flex items-center justify-center">
          <h2 className="text-5xl font-bold text-gray-800">Slide 2 Title</h2>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-xl text-gray-600">This is the content of Slide 2.</p>
        </div>
      </div>
    </div>
  );
} 