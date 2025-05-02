import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User } from 'lucide-react';
import UserCard from './UserCard';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [showUserCard, setShowUserCard] = useState(false);
  const userCardRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userCardRef.current && !userCardRef.current.contains(event.target as Node)) {
        setShowUserCard(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-2">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-teal-700/50 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <h1 className="ml-4 text-xl font-semibold">!Student Portal</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-teal-700/50 rounded-lg transition-colors duration-200">
              <Bell size={20} />
            </button>
            {isAuthenticated && (
              <div className="relative" ref={userCardRef}>
                <button 
                  onClick={() => setShowUserCard(!showUserCard)}
                  className="p-2 hover:bg-teal-700/50 rounded-lg transition-colors duration-200"
                >
                  <User size={20} />
                </button>
                {showUserCard && <UserCard />}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;