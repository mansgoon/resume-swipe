'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-32"> {/* Added pt-32 for top padding */}
        <div className="max-w-md mx-auto bg-bg-card rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-text">Create an Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-text font-bold mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-text font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-text font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-text font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-bg font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-card"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-text">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
          </p>
          <p className="mt-4 text-sm text-text text-center text-[#888]">
            By registering, you agree to ResumeSwipe's{' '}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;