import React from 'react';

const LoadingSkeleton = () => (
  <div className="flex-grow container mx-auto px-4 py-8">
    <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-20">
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#333333] mr-6 relative overflow-hidden">
          <div className="absolute inset-0 skeleton-pulse"></div>
        </div>
        <div className="space-y-2 flex-grow">
          <div className="h-8 bg-[#333333] rounded w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 skeleton-pulse"></div>
          </div>
          <div className="h-4 bg-[#333333] rounded w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 skeleton-pulse"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-6 bg-[#333333] rounded w-24 relative overflow-hidden">
              <div className="absolute inset-0 skeleton-pulse"></div>
            </div>
            <div className="h-6 bg-[#333333] rounded w-24 relative overflow-hidden">
              <div className="absolute inset-0 skeleton-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-8 bg-[#333333] rounded w-40 relative overflow-hidden">
          <div className="absolute inset-0 skeleton-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-[#333333] rounded relative overflow-hidden">
            <div className="absolute inset-0 skeleton-pulse"></div>
          </div>
          <div className="h-4 bg-[#333333] rounded relative overflow-hidden">
            <div className="absolute inset-0 skeleton-pulse"></div>
          </div>
          <div className="h-4 bg-[#333333] rounded w-5/6 relative overflow-hidden">
            <div className="absolute inset-0 skeleton-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;