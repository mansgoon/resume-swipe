import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicCarousel = dynamic(() => import('./DynamicCarousel'), { ssr: false });

const ResumeSwiper = () => {
  const boardRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10; // Number of resumes to fetch at a time

  useEffect(() => {
    setIsClient(true);
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/fetch-resumes?limit=${limit}&offset=${offset}`);
      if (!response.ok) throw new Error('Failed to fetch resumes');
      const data = await response.json();
      setResumes(prevResumes => [...prevResumes, ...data]);
      setOffset(prevOffset => prevOffset + data.length);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = (resumeId) => {
    alert(`Expand functionality for resume ${resumeId} to be implemented`);
  };

  const handleSwipedAll = () => {
    fetchResumes(); // Fetch more resumes when all current ones have been swiped
  };

  return (
    <div className="relative">
      <div 
        id="board" 
        ref={boardRef} 
        className="rounded-lg overflow-hidden shadow-lg mb-5 aspect-[4/5]"
      >
        {!isClient && (
          <div className="w-full h-full bg-[#1e1e1e] rounded-lg"></div>
        )}
        {isClient && (
          <DynamicCarousel 
            boardRef={boardRef} 
            resumes={resumes} 
            onExpand={handleExpand}
            onSwipedAll={handleSwipedAll}
          />
        )}
      </div>
    </div>
  );
};

export default ResumeSwiper;