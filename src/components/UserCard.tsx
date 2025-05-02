import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const UserCard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };
  const confirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <User className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{user?.name}</h3>
            <p className="text-xs text-gray-500">ID: {user?.userName}</p>
            <p className="text-xs text-gray-500">Role: {user?.commaSeparatedRoles}</p>
          </div>
        </div>
        <div
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </div>
      </div>
      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center">
            <div className="flex flex-col items-center">
              <LogOut className="text-red-600 mb-2" size={32} />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Confirm Logout</h3>
              <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
              <div className="flex gap-3 justify-center">
                <button
                  className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
                  onClick={cancelLogout}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-medium shadow"
                  onClick={confirmLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard; 