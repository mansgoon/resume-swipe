import React from 'react';
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const Leaderboards = () => {
  return (
    <div className="font-sans bg-bg text-text min-h-screen flex flex-col">
        <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="browse-container">
          {/* Search Bar */}
          <div className="search-bar mb-6">
            <input type="text" placeholder="Search" className="w-full p-2 bg-bg-card text-text border border-bg-section1 rounded focus:outline-none focus:border-[#3F3F3F]" />
          </div>

          {/* Filters */}
          <div className="filters mb-6">
            <div className="filter-group">
              <span className="font-semibold mr-2">Industry:</span>
              <select className="p-2 bg-bg-card text-text bg-bg-section2 border border-bg-section1 rounded focus:outline-none focus:border-primary">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
              </select>
            </div>
          </div>

          {/* Resume List */}
          <div className="resume-list space-y-6">
            {[
              { name: 'John Doe', title: 'Software Engineer', experience: '5 years experience in full-stack development', tags: ['JavaScript', 'React', 'Node.js'], votes: 42, user: 'johndoe', comments: 15, days: 2 },
              { name: 'Jane Smith', title: 'UX Designer', experience: '3 years experience in creating user-centered designs', tags: ['Figma', 'UI/UX', 'Prototyping'], votes: 28, user: 'janesmith', comments: 8, days: 1 },
              { name: 'Mike Johnson', title: 'Data Scientist', experience: '7 years experience in machine learning and data analytics', tags: ['Python', 'Machine Learning', 'SQL'], votes: 35, user: 'mikej', comments: 20, days: 3 },
              { name: 'Emily Brown', title: 'Marketing Manager', experience: '4 years experience in digital marketing and brand strategy', tags: ['Digital Marketing', 'SEO', 'Content Strategy'], votes: 19, user: 'emilybrown', comments: 6, days: 4 },
            ].map((resume, index) => (
              <div key={index} className="resume-card bg-bg-card shadow-md rounded-lg p-6 flex">
                <div className="vote-buttons flex flex-col items-center mr-4">
                  <button className="text-gray-400 hover:text-primary transition-colors"><ArrowUp size={24} /></button>
                  <span className="text-xl font-semibold my-2">{resume.votes}</span>
                  <button className="text-gray-400 hover:text-primary transition-colors"><ArrowDown size={24} /></button>
                </div>
                <div className="resume-content flex-1">
                  <h3 className="text-xl font-semibold text-primary">{resume.name} - {resume.title}</h3>
                  <p className="text-text mt-2">{resume.experience}</p>
                    <div className="tags mt-3 flex flex-wrap gap-2">
                    {resume.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag bg-[#2c2c2c] text-secondary px-2 py-1 rounded text-sm inline-block">
                        {tag}
                        </span>
                    ))}
                    </div>
                  <div className="resume-meta mt-4 text-sm text-gray-400">
                    Posted {resume.days} day{resume.days !== 1 ? 's' : ''} ago by @{resume.user} | {resume.comments} comment{resume.comments !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination mt-8 flex justify-center space-x-4">
            <button className="flex items-center justify-center text-text hover:text-primary transition-colors bg-bg-card border border-bg-section1 rounded-md px-4 py-2 w-32">
                <ChevronLeft size={20} className="mr-2" />
                <span>Previous</span>
            </button>
            <button className="flex items-center justify-center text-text hover:text-primary transition-colors bg-bg-card border border-bg-section1 rounded-md px-4 py-2 w-32">
                <span>Next</span>
                <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboards;