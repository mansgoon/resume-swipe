import React, { useState, useEffect, useCallback, useRef } from 'react';
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

const RatingCardComponent = () => {
  const initialCounts = { hire: 28, pass: 3 };
  const [votes, setVotes] = useState(initialCounts);
  const [itemStates, setItemStates] = useState({
    hire: { voted: false },
    pass: { voted: false }
  });
  const buttonRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setVotes(prev => {
        let newHire = prev.hire;
        let newPass = prev.pass;

        // 80% chance to increment 'hire'
        if (Math.random() < 0.8 && newHire < 99) {
          newHire += 1;
        }

        // 5% chance to increment 'pass'
        if (Math.random() < 0.05 && newPass < 99) {
          newPass += 1;
        }

        // Check if either count has reached 99
        if (newHire >= 99 || newPass >= 99) {
          return { ...initialCounts };
        }

        return {
          hire: newHire,
          pass: newPass
        };
      });
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleVote = useCallback((item) => {
    setItemStates(prev => {
      const newState = { ...prev[item], voted: !prev[item].voted };
      return { ...prev, [item]: newState };
    });

    setVotes(prev => {
      let newVoteCount = prev[item] + (itemStates[item].voted ? -1 : 1);
      
      // Check if the new count would be 99 or higher
      if (newVoteCount >= 99) {
        return { ...initialCounts };
      }

      return { ...prev, [item]: newVoteCount };
    });
  }, [itemStates]);

  return (
    <div className="w-full md:w-[30%] bg-bg-card rounded-lg p-6 text-center mb-8 md:mb-0">
      <div className="w-16 h-16 bg-primary text-bg rounded-full text-2xl font-bold flex items-center justify-center mx-auto mb-4">
        2
      </div>
      <h3 className="text-xl font-semibold mb-2">
        Get Rated <EmojiDisplay name="thumbs_up" size={24} />
      </h3>
      
      <p className="text-gray-300">Other users review your resume with a "Hire" or "Pass" rating.</p>
      <div className="bg-bg-secondary rounded-lg p-3 my-3">
        <div className="flex justify-center items-center space-x-2 mb-2">
          <button 
            ref={el => buttonRefs.current.hire = el}
            onClick={() => handleVote('hire')}
            className={`rounded-full py-2 px-4 text-base flex items-center transition-colors duration-300 ease-in-out bg-bg hover:bg-bg ${
              itemStates.hire.voted ? 'border-2 border-primary' : 'border-2 border-transparent'
            }`}
          >
            <span>{votes.hire}</span>
            <span 
              className="ml-2 transition-transform duration-300 ease-in-out"
              style={{ transform: itemStates.hire.voted ? 'scale(1.1)' : 'scale(1)' }}
            >
              <EmojiDisplay name="party_popper" size={20} />
            </span>
          </button>
          <button 
            ref={el => buttonRefs.current.pass = el}
            onClick={() => handleVote('pass')}
            className={`rounded-full py-2 px-4 text-base flex items-center transition-colors duration-300 ease-in-out bg-bg hover:bg-bg ${
              itemStates.pass.voted ? 'border-2 border-red-500' : 'border-2 border-transparent'
            }`}
          >
            <span>{votes.pass}</span>
            <span 
              className="ml-2 transition-transform duration-300 ease-in-out"
              style={{ transform: itemStates.pass.voted ? 'scale(1.1)' : 'scale(1)' }}
            >
              <EmojiDisplay name="x" size={20} />
            </span>
          </button>
        </div>
        <div className="text-xs opacity-80">
          Users are reviewing your resume
        </div>
      </div>
    </div>
  );
};

export default RatingCardComponent;