"use client"
import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const UserCard: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
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

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5 text-red-600" />
              Confirm Logout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmLogout}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserCard;