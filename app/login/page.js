'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push('/'); // Redirect to home page
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-32">
        <div className="max-w-md mx-auto bg-bg-card rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-text">Welcome Back</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="usernameOrEmail" className="block text-text font-bold mb-2">Username or Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#333] border border-[#555] rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-text"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-text font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#333] border border-[#555] rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-text"
                required
              />
            </div>
            <div className="mb-6 text-left">
              <Link href="/forgot-password" className="text-white hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-bg font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-card"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <p className="mt-4 text-center text-text">
            Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline">Sign up</Link>
          </p>
          <div className="mt-6 text-center text-text">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-bg-card text-gray-500">OR</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button
              onClick={() => handleOAuthSignIn('google')}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-text bg-bg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Google
            </button>
            {/* You can add more OAuth providers here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;