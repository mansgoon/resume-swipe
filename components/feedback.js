import React, { useState, useEffect } from 'react';
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
    'speech_balloon': '💬'
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

const FeedbackCardComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);
  const messages = [
    "Great resume!",
    "Add more skills",
    "Love this resume",
    "Nice resume"
  ];
  const faces = [
    "/faces/face1.png",
    "/faces/face2.png",
    "/faces/face3.png",
    "/faces/face4.png"
  ];

  useEffect(() => {
    let messageIndex = 0;
    let expandTimer, contractTimer;

    const animateChat = () => {
      setIsExpanded(true);
      setCurrentMessage(messages[messageIndex]);

      expandTimer = setTimeout(() => {
        setIsExpanded(false);
        messageIndex = (messageIndex + 1) % messages.length;
        setCurrentFaceIndex(messageIndex);

        contractTimer = setTimeout(() => {
          animateChat();
        }, 2000);
      }, 4000);
    };

    animateChat();

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(contractTimer);
    };
  }, []);

  return (
    <div className="w-full md:w-[30%] bg-bg-card rounded-lg p-6 text-center mb-8 md:mb-0">
      <div className="w-16 h-16 bg-primary text-bg rounded-full text-2xl font-bold flex items-center justify-center mx-auto mb-4">
        3
      </div>
      <h3 className="text-xl font-semibold mb-2">
        Receive Feedback
      </h3>
      
      <p className="text-gray-300">Get detailed comments on what works and areas for improvement.</p>
      <div className="bg-bg-secondary rounded-lg p-3 my-3">
        <div className="relative w-48 h-10 mx-auto">
          <div className="absolute left-0 bottom-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden border-2 border-primary">
            <Image 
              src={faces[currentFaceIndex]}
              alt="Face"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div 
            className={`absolute left-12 bottom-0 bg-bg rounded-2xl transition-all duration-300 ${isExpanded ? 'w-[140px] p-3' : 'w-[45px] p-0'} h-[40px] overflow-hidden flex items-center justify-center`}
          >
            {isExpanded ? (
              <p className="text-gray-300 text-sm whitespace-nowrap">{currentMessage}</p>
            ) : (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        </div>
        <div className="text-xs opacity-80 mt-2">
          Provide or receive feedback.
        </div>
      </div>
    </div>
  );
};

export default FeedbackCardComponent;