'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import LoadingSpinner from '@/components/LoadingSpinner';

const Alert = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
  return (
    <div className={`border ${bgColor} px-4 py-3 rounded relative mb-4`} role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

const ButtonSpinner = () => (
  <div className="inline-block w-4 h-4 mr-2">
    <div className="w-4 h-4 rounded-full animate-spin
                    border-2 border-solid border-white border-t-transparent"></div>
  </div>
);

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [field, setField] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [accountMessage, setAccountMessage] = useState({ type: '', message: '' });
  const [profileMessage, setProfileMessage] = useState({ type: '', message: '' });
  const [isSubmittingAccount, setIsSubmittingAccount] = useState(false);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session?.user) {
      setEmail(session.user.email || '');
      setUsername(session.user.name || '');
      setDisplayName(session.user.profile?.displayName || '');
      setField(session.user.profile?.field || '');
      setAboutMe(session.user.profile?.aboutMe || '');
      setAvatarUrl(session.user.image || '');
    }
  }, [session]);

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setAccountMessage({ type: '', message: '' });
    setIsSubmittingAccount(true);
    try {
      const response = await fetch('/api/user/update-account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update account');
      }
  
      const data = await response.json();
      setAccountMessage({ type: 'success', message: 'Account updated successfully!' });
      await update(); // Update the session
    } catch (error) {
      console.error('Error updating account:', error);
      setAccountMessage({ type: 'error', message: error.message });
    } finally {
      setIsSubmittingAccount(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage({ type: '', message: '' });
    setIsSubmittingProfile(true);
    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName, field, aboutMe }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
  
      const data = await response.json();
      setProfileMessage({ type: 'success', message: 'Profile updated successfully!' });
      await update(); // Update the session
    } catch (error) {
      console.error('Error updating profile:', error);
      setProfileMessage({ type: 'error', message: error.message });
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/user/update-avatar', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update avatar');
      }

      const { image } = await response.json();
      setAvatarUrl(image);
      await update(); // Update the session
      setProfileMessage({ type: 'success', message: 'Avatar updated successfully!' });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      setProfileMessage({ type: 'error', message: error.message });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 py-4 mt-20">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 pr-0 md:pr-8 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <ul className="flex md:block space-x-2 md:space-x-0 md:space-y-2">
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setActiveSection('account')}
                  className={`w-full text-left py-2 px-4 rounded ${activeSection === 'account' ? 'bg-primary text-bg' : 'text-text hover:bg-bg-card'}`}
                >
                  Account
                </button>
              </li>
              <li className="flex-1 md:flex-none">
                <button 
                  onClick={() => setActiveSection('profile')}
                  className={`w-full text-left py-2 px-4 rounded ${activeSection === 'profile' ? 'bg-primary text-bg' : 'text-text hover:bg-bg-card'}`}
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-3/4 bg-bg-card p-6 rounded-lg">
            {activeSection === 'account' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                {accountMessage.message && (
                  <Alert message={accountMessage.message} type={accountMessage.type} />
                )}
                <form className="space-y-4" onSubmit={handleAccountSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-bg-section2 border border-bg-section1 rounded text-text" 
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <input 
                      type="text" 
                      id="username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 bg-bg-section2 border border-bg-section1 rounded text-text" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-primary text-bg px-4 py-2 rounded hover:bg-secondary transition duration-300 flex items-center"
                    disabled={isSubmittingAccount}
                  >
                    {isSubmittingAccount ? <ButtonSpinner /> : null}
                    {isSubmittingAccount ? 'Saving...' : 'Save Account Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                {profileMessage.message && (
                  <Alert message={profileMessage.message} type={profileMessage.type} />
                )}
                <form className="space-y-4" onSubmit={handleProfileSubmit}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-20 h-20">
                      <Image
                        src={avatarUrl || '/avatar.jpg'}
                        alt="Profile"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="bg-primary text-bg px-4 py-2 rounded hover:bg-secondary transition duration-300"
                        disabled={isUploadingAvatar}
                      >
                        {isUploadingAvatar ? <ButtonSpinner /> : null}
                        {isUploadingAvatar ? 'Uploading...' : 'Change Avatar'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="display-name" className="block mb-1">Display Name</label>
                    <input 
                      type="text" 
                      id="display-name" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-3 py-2 bg-bg-section2 border border-bg-section1 rounded text-text" 
                    />
                  </div>
                  <div>
                    <label htmlFor="field" className="block mb-1">Field</label>
                    <select 
                      id="field" 
                      className="w-full px-3 py-2 bg-bg-section2 border border-bg-section1 rounded text-text"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                    >
                      <option value="">Select your field</option>
                      <option value="Tech">Tech</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Sales">Sales</option>
                      <option value="Hospitality">Hospitality</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="about-me" className="block mb-1">About Me</label>
                    <textarea 
                      id="about-me" 
                      className="w-full px-3 py-2 bg-bg-section2 border border-bg-section1 rounded text-text" 
                      rows="4"
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-primary text-bg px-4 py-2 rounded hover:bg-secondary transition duration-300 flex items-center justify-center"
                    disabled={isSubmittingProfile}
                  >
                    {isSubmittingProfile ? <ButtonSpinner /> : null}
                    {isSubmittingProfile ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default SettingsPage;