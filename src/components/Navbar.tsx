import React, { useState, useRef, useEffect } from 'react';
import { Menu, User } from 'lucide-react';
import UserCard from '@/components/UserCard';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex items-center justify-between h-12 relative">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-teal-700/50 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            {/* Hide portal text */}
          </div>

          {/* Centered user name */}
          {isAuthenticated && user?.name && (
            <div className="absolute left-1/2 transform -translate-x-1/2 text-base  truncate max-w-xs text-center">
              {user.name}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <div className="relative">
                <UserCard />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
