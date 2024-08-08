'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Pencil } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/LoadingSpinner';

const fieldColors = {
    'Tech': '#2196F3',
    'Finance': '#4CAF50',
    'Healthcare': '#E91E63',
    'Education': '#9C27B0',
    'Marketing': '#F578B5',
    'Engineering': '#FF9800',
    'Design': '#00BCD4',
    'Sales': '#FFC107',
    'Hospitality': '#795548'
  };

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  const aboutMe = session?.user?.profile?.aboutMe || 'Add a brief description about yourself';
  const field = session?.user?.profile?.field || '';

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-4 max-w-2xl mx-auto mt-20">
          <div className="flex items-center mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#2D9CDB] mr-6">
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
                {field && (
                  <span 
                    className="font-medium bg-[#333333] px-3 py-1 rounded-full text-sm"
                    style={{ color: fieldColors[field] || '#FFFFFF' }}
                  >
                    {field}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-[#2D9CDB]">About Me</h2>
              <Link href="/settings" passHref>
                <button 
                  className="text-gray-400 text-xs flex items-center hover:text-gray-300 focus:outline-none transition-colors duration-200 bg-[#333333] px-3 py-1.5 rounded-full"
                >
                  <Pencil size={12} className="mr-1.5" />
                  Edit Profile
                </button>
              </Link>
            </div>
            <div className="py-4">
              <p className={`text-gray-${aboutMe === 'Add a brief description about yourself' ? '400' : '300'}`}>
                {session.user.profile?.aboutMe}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}