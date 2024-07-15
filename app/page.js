'use client'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShieldAlt, faChartLine, faGlobe } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import Navbar from '@/components/navbar';
import ResumeProcessComponent from '@/components/resumeProcess';
import RatingCardComponent from '@/components/ratingCard';
import FeedbackCardComponent from '@/components/feedback';
import Footer from '@/components/footer';
import Particles from '@/components/particles';

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

export default function Home() {
  const [votes, setVotes] = useState({ tip: 37, template: 28, ai: 22 });
  const [rejects, setRejects] = useState({ tip: 5, template: 3, ai: 7 });
  const [itemStates, setItemStates] = useState({
    tip: { voted: false, rejected: false },
    template: { voted: false, rejected: false },
    ai: { voted: false, rejected: false }
  });
  const buttonRefs = useRef({});

  const initialVotes = useRef(votes);
  const initialRejects = useRef(rejects);

  const triggerConfetti = useCallback((buttonEl) => {
    const rect = buttonEl.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const createCircularConfetti = (angle) => {
      const radians = angle * (Math.PI / 180);
      const x = buttonCenterX + Math.cos(radians) * 20;
      const y = buttonCenterY + Math.sin(radians) * 20;

      confetti({
        particleCount: 1,
        startVelocity: 10,
        spread: 360,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight
        },
        colors: ['#3498db'],
        shapes: ['circle'],
        scalar: 0.5,
        ticks: 50,
        gravity: 0.5,
        decay: 0.8,
      });
    };

    for (let angle = 0; angle < 360; angle += 15) {
      createCircularConfetti(angle);
    }
  }, []);

  const handleVote = useCallback((item) => {
    setItemStates(prev => {
      const newState = { ...prev[item], voted: !prev[item].voted, rejected: false };
      return { ...prev, [item]: newState };
    });

    setVotes(prev => {
      const newVoteCount = prev[item] === initialVotes.current[item] && !itemStates[item].voted
        ? prev[item] + 1
        : initialVotes.current[item];
      return { ...prev, [item]: newVoteCount };
    });

    setRejects(prev => ({ ...prev, [item]: initialRejects.current[item] }));

    if (!itemStates[item].voted && buttonRefs.current[item]) {
      triggerConfetti(buttonRefs.current[item]);
    }
  }, [itemStates, triggerConfetti]);

  const handleReject = useCallback((item) => {
    setItemStates(prev => {
      const newState = { ...prev[item], rejected: !prev[item].rejected, voted: false };
      return { ...prev, [item]: newState };
    });

    setRejects(prev => {
      const newRejectCount = prev[item] === initialRejects.current[item] && !itemStates[item].rejected
        ? prev[item] + 1
        : initialRejects.current[item];
      return { ...prev, [item]: newRejectCount };
    });

    setVotes(prev => ({ ...prev, [item]: initialVotes.current[item] }));
  }, [itemStates]);
  

  return (
    <>
      <Head>
        <title>ResumeSwipe - Collaborative Resume Review Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <main className="bg-bg text-text">
        <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen flex items-center relative">
          <Particles />
          <div className="flex flex-col lg:flex-row items-center justify-between w-full relative z-10">
            <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
                Create resumes recruiters{' '}
                <span className="underline decoration-primary decoration-dashed decoration-3 underline-offset-4">
                  actually
                </span>{' '}
                like reading
              </h1>
              <p className="text-xl lg:text-xl mb-10 max-w-2xl mx-auto lg:mx-0">
                Collect feedback from other users, curate your resume, get hired.
              </p>
              <Link
                href="/register"
                className="bg-primary hover:bg-blue-600 text-bg font-bold py-4 px-8 rounded-lg transition-colors text-lg inline-block"
              >
                Get Feedback Now
              </Link>
              <p className="text-sm text-gray-500 mt-8">Your perfect resume. 100% free.</p>
            </div>
            <div className="lg:w-1/2 bg-bg-card rounded-xl p-8 shadow-lg max-w-xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg uppercase tracking-wider font-semibold">Hire or pass</h3>
                <span className="bg-secondary text-bg text-sm font-bold py-2 px-3 rounded-full flex items-center">
                  Get Hired <EmojiDisplay name="rocket" size={20} />
                </span>
              </div>
              {[
                { title: 'Software Developer Resume', key: 'tip', desc: 'Developer with 5+ years in full-stack web development...' },
                { title: 'Marketing Specialist Resume', key: 'template', desc: 'Results-driven marketer with expertise in digital campaigns...' },
                { title: 'Data Analyst Resume', key: 'ai', desc: 'Analytical professional skilled in Python, Data visualization...' }
              ].map((item) => (
                <div key={item.key} className="mb-6 pb-6 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-lg">{item.title}</span>
                    <div className="flex items-center space-x-2">
                      <button 
                        ref={el => buttonRefs.current[item.key] = el}
                        onClick={() => handleVote(item.key)}
                        className={`rounded-full py-2 px-4 text-base flex items-center transition-colors duration-300 ease-in-out bg-bg hover:bg-bg ${
                          itemStates[item.key].voted ? 'border-2 border-primary' : 'border-2 border-transparent'
                        }`}
                      >
                        <span>{votes[item.key]}</span>
                        <span 
                          className="ml-2 transition-transform duration-300 ease-in-out"
                          style={{ transform: itemStates[item.key].voted ? 'scale(1.1)' : 'scale(1)' }}
                        >
                          <EmojiDisplay name="party_popper" size={20} />
                        </span>
                      </button>
                      <button 
                        onClick={() => handleReject(item.key)}
                        className={`rounded-full py-2 px-4 text-base flex items-center transition-colors duration-300 ease-in-out bg-bg hover:bg-bg ${
                          itemStates[item.key].rejected ? 'border-2 border-red-500' : 'border-2 border-transparent'
                        }`}
                      >
                        <span>{rejects[item.key]}</span>
                        <span 
                          className="ml-2 transition-transform duration-300 ease-in-out"
                          style={{ transform: itemStates[item.key].rejected ? 'scale(1.1)' : 'scale(1)' }}
                        >
                          <EmojiDisplay name="x" size={20} />
                        </span>
                      </button>
                    </div>
                  </div>
                  <p className="text-base text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* "How It Works" section - Now using bg-bg-section1 */}
      <section className="bg-bg-section1 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="flex flex-wrap justify-between">
            <ResumeProcessComponent />
            <RatingCardComponent />
            <FeedbackCardComponent />
          </div>
        </div>
      </section>

      {/* "Why use ResumeSwipe?" section - Now using bg-bg-section2 */}
      <section className="bg-bg-section2 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why use ResumeSwipe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: faUsers,
                title: 'Community Feedback',
                desc: 'Get valuable insights from a diverse pool of professionals and recruiters.'
              },
              {
                icon: faShieldAlt,
                title: 'Anonymous Reviews',
                desc: 'Receive honest feedback while maintaining your privacy.'
              },
              {
                icon: faChartLine,
                title: 'Continuous Improvement',
                desc: 'Track your resumes performance and refine it based on actionable advice.'
              },
              {
                icon: faGlobe,
                title: 'Global Perspective',
                desc: 'Gain insights from professionals around the world in various industries.'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-bg-card rounded-lg p-6 text-center hover:transform hover:-translate-y-2 transition-transform">
                <div className="mb-4">
                  <FontAwesomeIcon icon={feature.icon} className="text-primary text-5xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}