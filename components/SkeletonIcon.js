import React from 'react';

const SkeletonIcon = ({ size = 38 }) => (
  <div 
    style={{ width: `${size}px`, height: `${size}px` }} 
    className="rounded-full bg-[#333333] relative overflow-hidden"
  >
    <div className="absolute inset-0 skeleton-pulse"></div>
  </div>
);

export default SkeletonIcon;