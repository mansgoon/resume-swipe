'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/navbar';

const BrowsePage = () => {
  const [comments, setComments] = useState([
    { author: 'RecruiterJane', text: 'Great experience in web development! The project portfolio is particularly impressive, showcasing a wide range of skills and technologies.' },
    { author: 'TechGuru42', text: 'Impressive portfolio! I especially like the emphasis on scalable architecture and the use of modern frameworks. Its clear this candidate stays up-to-date with industry trends.' },
    { author: 'HRPro', text: 'Clean and well-structured resume. The layout makes it easy to quickly grasp the candidates key qualifications and achievements. I appreciate the concise bullet points under each role.' },
  ]);

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const commentsContainer = document.querySelector('.comments-container');
    if (commentsContainer) {
      commentsContainer.scrollTop = commentsContainer.scrollHeight;
    }
  }, [comments]);

  const swipeResume = (direction) => {
    alert(`Swiped ${direction}! Loading next resume...`);
  };

  const showResumeInfo = () => {
    alert("Showing more information about this resume...");
  };

  const viewMoreComments = () => {
    alert("Loading more comments...");
  };

  const addComment = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { author: 'You', text: newComment.trim() }]);
      setNewComment('');
    }
  };

  return (
    <>
      <Head>
        <title>ResumeSwipe - Browse Resumes</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-[#121212] text-[#e0e0e0] font-sans">
        <Navbar />

        <main className="pt-28 pb-10">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-4xl text-center mb-10 font-semibold">Swipe Resumes</h1>

            <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg mb-5 aspect-[4/5]">
              <iframe className="w-full h-full border-none" src="" title="Placeholder Resume"></iframe>
            </div>

            <div className="flex justify-center space-x-8 mb-5">
              <button onClick={() => swipeResume('left')} className="bg-[#1e1e1e] rounded-full w-16 h-16 flex justify-center items-center text-3xl cursor-pointer transition-transform duration-300 hover:scale-110 text-[#e74c3c]">✕</button>
              <button onClick={showResumeInfo} className="bg-[#1e1e1e] rounded-full w-16 h-16 flex justify-center items-center text-3xl cursor-pointer transition-transform duration-300 hover:scale-110 text-[#3498db]">ℹ</button>
              <button onClick={() => swipeResume('right')} className="bg-[#1e1e1e] rounded-full w-16 h-16 flex justify-center items-center text-3xl cursor-pointer transition-transform duration-300 hover:scale-110 text-[#2ecc71]">♥</button>
            </div>

            <div className="bg-[#1e1e1e] rounded-lg p-4 mb-10 shadow-md">
              <div className="comments-container max-h-[400px] overflow-y-auto mb-4 pr-2">
                {comments.map((comment, index) => (
                  <div key={index} className="mb-4">
                    <span className="font-semibold text-[#3498db]">{comment.author}</span>
                    <p className="text-[#e0e0e0] bg-[#2c2c2c] py-2 px-4 rounded-lg mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
              <span className="text-[#e0e0e0] cursor-pointer text-sm font-medium" onClick={viewMoreComments}>View more comments</span>
              <form className="flex flex-col sm:flex-row mt-4" onSubmit={addComment}>
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-grow bg-[#2c2c2c] border border-bg-section1 rounded focus:outline-none focus:border-[#3F3F3F] rounded-full py-2 px-4 text-[#e0e0e0] text-sm mb-2 sm:mb-0" 
                  placeholder="Add a comment..." 
                  required 
                />
                <button type="submit" className="bg-[#3498db] text-white rounded-full px-5 py-2 sm:ml-2 cursor-pointer transition-colors duration-300 hover:bg-[#2980b9] text-sm font-medium">Post</button>
              </form>
            </div>
          </div>
        </main>

        <footer className="bg-bg-footer py-6 text-center">
          <div className="container mx-auto px-4">
            <p className="">&copy; 2024 ResumeSwipe. All rights reserved.</p>
            <div className="space-x-4">
              {/* Add social media links here */}
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap');

        html {
          font-family: 'Poppins', sans-serif;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #121212;
          color: #e0e0e0;
        }

        .comments-container::-webkit-scrollbar {
          width: 8px;
        }
        .comments-container::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        .comments-container::-webkit-scrollbar-thumb {
          background-color: #3498db;
          border-radius: 4px;
        }
        .comments-container::-webkit-scrollbar-thumb:hover {
          background-color: #2980b9;
        }
      `}</style>
    </>
  );
};

export default BrowsePage;