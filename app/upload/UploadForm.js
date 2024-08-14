'use client';

import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

export default function UploadForm() {
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleKeywordInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newKeyword = e.target.value.trim();
      if (newKeyword && !keywords.includes(newKeyword)) {
        setKeywords([...keywords, newKeyword]);
        e.target.value = '';
      }
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

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
    // TODO: Implement file upload to Supabase bucket
    console.log('File:', file);
    console.log('Description:', description);
    console.log('Keywords:', keywords);
    // After successful upload, you can use window.location to redirect
    // window.location.href = '/profile';
  };

  return (
    <form onSubmit={handleSubmit} className="upload-container">
      <div className="form-group mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          className="w-full bg-[#333333] border border-bg-section1 rounded text-text p-2 focus:outline-none focus:border-[#3F3F3F] text-white placeholder:text-[#707070]"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., 'What am I doing wrong?'"
        ></textarea>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="keywords" className="block text-sm font-medium mb-2 text-gray-300">
          Keywords (separated by commas)
        </label>
        <input
          type="text"
          id="keywords"
          className="w-full bg-[#333333] border border-bg-section1 rounded text-text p-2 focus:outline-none focus:border-[#3F3F3F] text-white placeholder:text-[#707070]"
          onKeyDown={handleKeywordInput}
          placeholder="e.g., JavaScript, React, Node.js"
        />
        <div id="keywords-container" className="flex flex-wrap mt-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-[#2c2c2c] text-secondary px-2 py-1 rounded text-sm inline-block mr-2 mb-2 flex items-center"
            >
              {keyword}
              <button
                type="button"
                className="ml-1 focus:outline-none"
                onClick={() => removeKeyword(keyword)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
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
      >
        Upload Resume
      </button>
    </form>
  );
}