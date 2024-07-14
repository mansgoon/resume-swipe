'use client'
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {

  return (
    <>
      <footer className="bg-bg-footer py-6 text-center">
        <div className="container mx-auto px-4">
          <p className="">&copy; 2024 ResumeSwipe. All rights reserved.</p>
          <div className="space-x-4">
            {/* Add social media links here */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;