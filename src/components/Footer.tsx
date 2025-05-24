"use client"
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-1 text-sm text-center mt-auto">
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <p> {new Date().getFullYear()} Daffodil International University. All Rights Reserved.</p>
        <div className="flex space-x-4">
          <Link href="/terms-and-conditions" className="text-xs hover:text-white hover:underline transition-colors">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="text-xs hover:text-white hover:underline transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
