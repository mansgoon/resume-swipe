import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute
                        border border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute
                        border border-solid border-[#2D9CDB] border-t-transparent
                        shadow-md"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;