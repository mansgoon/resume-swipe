import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicCarousel = dynamic(() => import('./DynamicCarousel'), { ssr: false });

const ResumeSwiper = () => {
  const boardRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleExpand = () => {
    alert("Expand functionality to be implemented");
  };

  return (
    <div className="relative">
      <div 
        id="board" 
        ref={boardRef} 
        className="rounded-lg overflow-hidden shadow-lg mb-5 aspect-[4/5]"
      >
        {/* Plain skeleton container for server-side rendering */}
        {!isClient && (
          <div className="w-full h-full bg-[#1e1e1e] rounded-lg"></div>
        )}
        {isClient && <DynamicCarousel boardRef={boardRef} />}
      </div>
      <button 
        onClick={handleExpand}
        className="absolute top-2 right-2 bg-bg-card text-secondary rounded px-2 py-1 flex justify-center items-center text-xs font-medium cursor-pointer transition-transform duration-300 hover:scale-110 z-40"
      >
        Expand 🔎
      </button>
    </div>
  );
};

export default ResumeSwiper;