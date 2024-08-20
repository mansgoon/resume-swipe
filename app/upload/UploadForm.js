'use client';

import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UploadForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!file || !title || !content) {
      setError('Please provide a title, content, and select a file to upload.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('description', description);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      const post = await response.json();
      router.push(`/browse`); // change later
    } catch (error) {
      console.error('Error uploading resume:', error);
      setError(error.message || 'Failed to upload resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-container">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="form-group mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full bg-[#333333] border border-bg-section1 rounded text-text p-2 focus:outline-none focus:border-[#3F3F3F] text-white placeholder:text-[#707070]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your resume post"
          required
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-300">
          Content
        </label>
        <textarea
          id="content"
          className="w-full bg-[#333333] border border-bg-section1 rounded text-text p-2 focus:outline-none focus:border-[#3F3F3F] text-white placeholder:text-[#707070]"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about your resume or ask for feedback"
          required
        ></textarea>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-300">
          Description (optional)
        </label>
        <textarea
          id="description"
          className="w-full bg-[#333333] border border-bg-section1 rounded text-text p-2 focus:outline-none focus:border-[#3F3F3F] text-white placeholder:text-[#707070]"
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional description or context for your resume"
        ></textarea>
      </div>
      <div className="form-group mb-6">
        <div
          id="file-drop-area"
          className="border-2 border-dashed border-[#444] rounded-lg p-8 text-center cursor-pointer bg-transparent hover:bg-[#2c2c2c] transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <Upload className="mx-auto text-[#2D9CDB] mb-4" size={48} />
          <p className="file-message text-lg mb-2 text-white">
            {file ? file.name : 'Drag and drop your resume here'}
          </p>
          <p className="text-sm text-gray-400">or click to select a file</p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary hover:bg-blue-600 text-bg font-bold rounded-lg transition-colors text-base py-2 px-4"
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </form>
  );
}