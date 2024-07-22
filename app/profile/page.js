'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    setAboutMe('Add a brief description about yourself');
  }, []);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    // Here you would typically save the changes to the backend
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-8 max-w-2xl mx-auto mt-8">
          <div className="flex items-center mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[#2D9CDB] mr-6">
              <Image 
                src={session?.user?.image || '/avatar.jpg'}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{session?.user?.name || 'Not found'}</h1>
              <div className="flex items-center space-x-4">
                <span className="bg-[#333333] text-[#2D9CDB] px-3 py-1 rounded-full text-sm">
                  🎉 {session?.user?.hiresRating} hires
                </span>
                <span className="text-[#E0E0E0] bg-[#333333] px-3 py-1 rounded-full text-sm">Finance</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#2D9CDB]">About Me</h2>
              <button 
                onClick={handleEditProfile}
                className="bg-[#333333] hover:bg-[#444444] text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                {isEditing ? 'Save' : 'Edit Profile'}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-full h-32 p-2 border border-[#333333] rounded bg-[#252525] text-white"
              />
            ) : (
              <div className="bg-[#252525] p-4 rounded">
                <span className="text-[#2D9CDB] text-4xl">+</span>
                <p className="text-[#888888] mt-2">{aboutMe}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}