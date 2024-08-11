'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Pencil } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const fieldColors = {
    'Tech': '#AA8FF8',
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
  const params = useParams();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      if (status === 'loading') return;

      let username = params.username;
      
      if (!username || username === 'undefined') {
        if (session?.user?.username) {
          username = session.user.username;
          router.replace(`/user/${username}`);
        } else if (session?.user?.name) {
          username = session.user.name;
          router.replace(`/user/${username}`);
        } else {
          console.error('No valid username available');
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(`/api/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfileData();
  }, [params.username, session, status, router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <Navbar />
      {status === "loading" || loading ? (
        <LoadingSkeleton />
      ) : !profileData ? (
        <div className="flex-grow flex items-center justify-center">User not found</div>
      ) : (
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-20">
            <div className="flex items-center mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[#333333] mr-6">
                <Image 
                  src={profileData.image || '/avatar.jpg'}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profileData.profile?.displayName || profileData.name || profileData.username || 'Not found'}</h1>
                <p className="text-gray-400 text-sm mb-2">@{profileData.username}</p>
                <div className="flex items-center space-x-4">
                  <span className="bg-[#333333] text-[#2D9CDB] px-3 py-1 rounded text-sm">
                    🎉 {profileData.hiresRating || 0} hires
                  </span>
                  {profileData.profile?.field && (
                    <span 
                      className="font-medium bg-[#333333] px-3 py-1 rounded text-sm"
                      style={{ color: fieldColors[profileData.profile.field] || '#FFFFFF' }}
                    >
                      {profileData.profile.field}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-[#2D9CDB]">About Me</h2>
                {session?.user?.name === profileData.username && (
                  <Link href="/settings" passHref>
                    <button 
                      className="text-gray-400 text-xs flex items-center hover:text-gray-300 focus:outline-none transition-colors duration-200 bg-[#333333] px-3 py-1.5 rounded"
                    >
                      <Pencil size={12} className="mr-1.5" />
                      Edit Profile
                    </button>
                  </Link>
                )}
              </div>
              <div className="py-4">
                <p className={`text-gray-${profileData.profile?.aboutMe === 'Add a brief description about yourself' ? '400' : '300'}`}>
                  {profileData.profile?.aboutMe || 'Add a brief description about yourself'}
                </p>
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}