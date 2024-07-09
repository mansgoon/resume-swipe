'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-bg-nav shadow-md backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold text-primary">
            <Image src="/logo.png" alt="ResumeSwipe Logo" width={38} height={38} className="mr-2" />
            ResumeSwipe
          </Link>
          <ul className="hidden md:flex space-x-8">
            {['Browse', 'Upload', 'Leaderboards', 'Contact'].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-text hover:text-primary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <button 
            className={`hamburger-menu md:hidden ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {isMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMenu}></div>}

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {['Browse', 'Upload', 'Leaderboards', 'Contact'].map((item) => (
            <li key={item}>
              <Link href={`/${item.toLowerCase()}`} className="text-text hover:text-primary transition-colors" onClick={toggleMenu}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .hamburger-menu {
          cursor: pointer;
          width: 30px;
          height: 20px;
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1004;
          background: none;
          border: none;
          padding: 0;
        }

        .hamburger-menu span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          background: var(--text-color);
          border-radius: 3px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: .25s ease-in-out;
        }

        .hamburger-menu span:nth-child(1) { top: 0px; }
        .hamburger-menu span:nth-child(2), .hamburger-menu span:nth-child(3) { top: 8px; }
        .hamburger-menu span:nth-child(4) { top: 16px; }

        .hamburger-menu.open span:nth-child(1) { top: 8px; width: 0%; left: 50%; }
        .hamburger-menu.open span:nth-child(2) { transform: rotate(45deg); }
        .hamburger-menu.open span:nth-child(3) { transform: rotate(-45deg); }
        .hamburger-menu.open span:nth-child(4) { top: 8px; width: 0%; left: 50%; }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1002;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -70%;
          width: 70%;
          height: 100vh;
          background-color: var(--nav-bg);
          padding: 80px 20px 20px;
          transition: right 0.3s ease-in-out;
          z-index: 1003;
        }

        .mobile-menu.open { right: 0; }

        .mobile-menu ul {
          list-style-type: none;
        }

        .mobile-menu ul li {
          margin-bottom: 20px;
        }

        .mobile-menu ul li a {
          color: var(--text-color);
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default Navbar;