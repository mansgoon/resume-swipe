'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Pencil } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState('Add a brief description about yourself');
  const { data: session, status } = useSession();

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
        <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-8 max-w-2xl mx-auto mt-20">
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
              <h1 className="text-2xl font-bold mb-2">{session?.user?.name || 'Not found'}</h1>
              <div className="flex items-center space-x-4">
                <span className="bg-[#333333] text-[#2D9CDB] px-3 py-1 rounded-full text-sm">
                  🎉 {session?.user?.hiresRating || 0} hires
                </span>
                <span className="text-[#F578B5] font-medium bg-[#333333] px-3 py-1 rounded-full text-sm">
                  Finance
                </span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-[#2D9CDB]">About Me</h2>
              <button 
                onClick={handleEditProfile}
                className="text-gray-400 text-xs flex items-center hover:text-gray-300 focus:outline-none transition-colors duration-200 bg-[#333333] px-3 py-1.5 rounded-full"
              >
                <Pencil size={12} className="mr-1.5" />
                Edit Profile
              </button>
            </div>
            <div className="bg-[#252525] p-8 rounded-md flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#2D9CDB] flex items-center justify-center mb-4">
                <span className="text-[#252525] text-2xl font-medium">+</span>
              </div>
              <p className="text-gray-400 text-center">{aboutMe}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}