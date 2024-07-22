import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#2D9CDB]"></div>
    </div>
  );
};

export default LoadingSpinner;