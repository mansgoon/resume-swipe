'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  const navItems = ['Browse', 'Upload', 'Leaderboards'];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-bg-nav shadow-md backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-bold text-primary">
            <Image src="/logo.png" alt="ResumeSwipe Logo" width={38} height={38} className="mr-2" />
            <span className='text-[#e5e7eb]'>resume</span>swipe
          </Link>
          <ul className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="text-text hover:text-primary transition-colors">
                  {item}
                </Link>
              </li>
            ))}
            {session ? (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                <div className="w-[38px] h-[38px] rounded-full overflow-hidden">
                  <Image
                    src={session.user.image || '/avatar.jpg'}
                    alt="User Avatar"
                    width={38}
                    height={38}
                    className="object-cover w-full h-full"
                  />
                </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-md shadow-lg py-1">
                    <Link href={`/user/${session.user.name}`} className="block px-4 py-2 text-sm text-text hover:bg-primary hover:text-bg">Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-text hover:bg-primary hover:text-bg">Settings</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-primary hover:text-bg">Logout</button>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link href="/login" className="bg-primary hover:bg-blue-600 text-bg font-bold py-2 px-4 rounded-lg transition-colors text-base">
                  Login
                </Link>
              </li>
            )}
          </ul>
          <button 
            className="md:hidden z-50 relative w-10 h-10 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">Menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile menu */}
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-bg-nav z-40 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className="text-text hover:text-primary transition-colors text-lg font-medium"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
            {session ? (
              <>
                <li>
                  <Link href={`/user/${session.user.name}`} className="text-text hover:text-primary transition-colors text-lg font-medium" onClick={toggleMenu}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-text hover:text-primary transition-colors text-lg font-medium" onClick={toggleMenu}>
                    Settings
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-text hover:text-primary transition-colors text-lg font-medium w-full text-left">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="bg-primary hover:bg-blue-600 text-bg font-bold py-2 px-4 rounded-lg transition-colors text-base w-full inline-block text-center"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;