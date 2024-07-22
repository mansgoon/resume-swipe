'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { register } from '@/app/actions/auth';
import PasswordInput from '@/components/passwordInput';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const result = await register(formData.username, formData.email, formData.password);
    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => router.push('/login'), 3000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-32"> {/* Added pt-32 for top padding */}
        <div className="max-w-md mx-auto bg-bg-card rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-text">Create an Account</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-text font-bold mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#333] border border-[#555] rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-text"
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
                className="w-full px-3 py-2 bg-[#333] border border-[#555] rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-text"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-text font-bold mb-2">Password</label>
              <PasswordInput
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-text font-bold mb-2">Confirm Password</label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;