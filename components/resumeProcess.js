import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const IPhoneEmoji = ({ name, size = 20 }) => (
  <Image 
    src={`/emojis/${name}.png`} 
    alt={name} 
    width={size} 
    height={size}
    className="inline-block"
  />
);

const EmojiDisplay = ({ name, size = 20 }) => {
  const isMobile = useIsMobile();
  const emojiMap = {
    'rocket': '🚀',
    'party_popper': '🎉',
    'x': '❌',
    'page_facing_up': '📄',
    'thumbs_up': '👍',
    'speech_balloon': '💬',
    'check_mark': '✅'
  };

  if (isMobile) {
    return (
      <span style={{ fontSize: `${size}px` }} role="img" aria-label={name}>
        {emojiMap[name] || ''}
      </span>
    );
  } else {
    return <IPhoneEmoji name={name} size={size} />;
  }
};

const ResumeProcessComponent = () => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const stages = [
    "Uploading resume...",
    "Parsing document...",
    "Extracting key information...",
    "Analyzing skills and experience...",
    "Generating keyword suggestions...",
    "Optimizing for ATS compatibility...",
    "Finalizing your enhanced profile..."
  ];

  const resetProcess = useCallback(() => {
    console.log("Resetting process");
    setProgress(0);
    setCurrentStage(0);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    let timer;
    const stageProgress = 100 / stages.length;

    const updateProgress = () => {
      if (currentStage < stages.length - 1) {
        setCurrentStage(prevStage => prevStage + 1);
        setProgress(prevProgress => prevProgress + stageProgress);
      } else {
        setProgress(100);
        setIsComplete(true);
        console.log("Process complete");
      }
    };

    if (!isComplete) {
      timer = setTimeout(updateProgress, Math.random() * 1000 + 500);
    } else {
      timer = setTimeout(resetProcess, 3000); // Reset after 3 seconds
    }

    return () => clearTimeout(timer);
  }, [currentStage, isComplete, stages.length, resetProcess]);

  return (
    <div className="w-full md:w-[30%] bg-bg-card rounded-lg p-6 text-center mb-8 md:mb-0">
      <div className="w-16 h-16 bg-primary text-bg rounded-full text-2xl font-bold flex items-center justify-center mx-auto mb-4">
        1
      </div>
      <h3 className="text-xl font-semibold mb-2">
        Upload Your Resume <EmojiDisplay name="page_facing_up" size={24} />
      </h3>
      <p className="text-gray-300 mb-4">Share your resume anonymously with our community.</p>
      
      <div className="bg-bg-secondary rounded-lg p-4 mt-4">
        <div className="text-sm mb-3">
          {isComplete ? "Resume processing complete!" : "Analyzing and uploading your resume..."}
        </div>
        <div className="w-full bg-input-bg h-1.5 rounded-full mb-2 overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs opacity-80 h-4"> {/* Fixed height to prevent layout shift */}
          {isComplete ? (
            <span className="flex items-center justify-center animate-bounce">
              Success <EmojiDisplay name="check_mark" size={16} />
            </span>
          ) : (
            stages[currentStage]
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeProcessComponent;