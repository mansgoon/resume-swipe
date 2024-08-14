import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import UploadForm from './UploadForm';

export default function UploadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-bg-card rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-20">
          <h1 className="text-3xl font-bold text-center text-[#ffffff] mb-6">Upload Your Resume</h1>
          <UploadForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}