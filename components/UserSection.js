'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const wasLoggedIn = localStorage.getItem('wasLoggedIn') === 'true';
    
    if (status === 'loading' && wasLoggedIn) {
      setShowSkeleton(true);
    } else {
      setShowSkeleton(false);
    }

    if (status === 'authenticated') {
      localStorage.setItem('wasLoggedIn', 'true');
    } else if (status === 'unauthenticated') {
      localStorage.removeItem('wasLoggedIn');
    }
  }, [status]);

  const handleLogout = async () => {
    localStorage.removeItem('wasLoggedIn');
    await signOut({ redirect: false });
    router.push('/');
  };

  if (showSkeleton) {
    return (
      <li>
        <div className="w-[38px] h-[38px] bg-gray-200 rounded-full animate-pulse"></div>
      </li>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <li>
        <Link href="/login" className="bg-primary hover:bg-blue-600 text-bg font-bold py-2 px-4 rounded-lg transition-colors text-base">
          Login
        </Link>
      </li>
    );
  }

  if (status === 'authenticated') {
    return (
      <li className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
    );
  }

  return null; // This should never be reached, but it's here for completeness
};

export default UserSection;