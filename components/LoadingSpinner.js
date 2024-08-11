import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#121212]">
      <div className="w-16 h-16 relative">
        <div className="w-full h-full rounded-full absolute
                        border-4 border-solid border-gray-200"></div>
        <div className="w-full h-full rounded-full animate-spin absolute
                        border-4 border-solid border-[#2D9CDB] border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;