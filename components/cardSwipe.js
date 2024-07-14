import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SwipeableResumeCard = ({ onSwipe, onInfoClick }) => {
  const [exitX, setExitX] = useState(0);
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      setExitX(-250);
      controls.start({ x: -250, opacity: 0 });
      onSwipe('left');
    } else if (info.offset.x > 100) {
      setExitX(250);
      controls.start({ x: 250, opacity: 0 });
      onSwipe('right');
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="w-full aspect-[4/5] mb-5"
    >
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg w-full h-full">
        <iframe className="w-full h-full border-none" src="" title="Placeholder Resume"></iframe>
      </div>

      <div className="flex justify-center space-x-8 mt-5">
        <button onClick={() => onSwipe('left')} className="bg-[#1e1e1e] rounded-full w-16 h-16 flex justify-center items-center text-3xl cursor-pointer transition-transform duration-300 hover:scale-110 text-[#e74c3c]">✕</button>
        <button onClick={onInfoClick} className="bg-[#1e1e1e] rounded-full w-16 h-16 flex justify-center items-center text-3xl cursor-pointer transition-transform duration-300 hover:scale-110 text-[#3498db]">ℹ</button>
        <button onClick={() => onSwipe('right')} className="bg-[#1e1e1e] rounded-full w-16 h-16 flex justify-center items-center text-3xl cursor-pointer transition-transform duration-300 hover:scale-110 text-[#2ecc71]">♥</button>
      </div>
    </motion.div>
  );
};

export default SwipeableResumeCard;