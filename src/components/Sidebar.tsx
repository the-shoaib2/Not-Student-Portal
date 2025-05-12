import React, { useState, useCallback } from 'react';
import { X, Home, LogIn, User, UserPlus, KeyRound, FileText, FileCheck, BookOpen, Calendar, Bell, Briefcase, Building2, Laptop, ClipboardList, Users, Award, MonitorCheck, CreditCard, Layers, GraduationCap, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  icon: JSX.Element;
  text: string;
  path: string;
  category: string;
  showWhenAuthenticated?: boolean;
  public?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Add optimized navigation handler
  const handleNavigation = useCallback((path: string) => {
    toggleSidebar();
    router.push(path);
  }, [router, toggleSidebar]);

  const menuItems: MenuItem[] = [
    { icon: <LogIn size={20} />, text: 'Log in', path: '/login', category: 'General', showWhenAuthenticated: false, public: true },
    { icon: <Home size={20} />, text: 'Home', path: '/', category: 'General', showWhenAuthenticated: true },
    { icon: <ClipboardList size={20} />, text: 'Dashboard', path: '/dashboard', category: 'General', showWhenAuthenticated: true },
    { icon: <User size={20} />, text: 'Profile', path: '/profile', category: 'Profile', showWhenAuthenticated: true },
    { icon: <UserPlus size={20} />, text: 'Profile Update', path: '/profile-update', category: 'Profile', showWhenAuthenticated: true },
    { icon: <KeyRound size={20} />, text: 'Password Change', path: '/password-change', category: 'Profile', showWhenAuthenticated: true },
    { icon: <CreditCard size={20} />, text: 'Payment Ledger', path: '/payment-ledger', category: 'Academics', showWhenAuthenticated: true },
    { icon: <Layers size={20} />, text: 'Payment Scheme', path: '/payment-scheme', category: 'Academics', showWhenAuthenticated: true },
    { icon: <ClipboardList size={20} />, text: 'Registration/Exam Clearance', path: '/registration-exam-clearance', category: 'Academics', showWhenAuthenticated: true },
    { icon: <ClipboardList size={20} />, text: 'Registered Course', path: '/registered-course', category: 'Academics', showWhenAuthenticated: true },
    { icon: <GraduationCap size={20} />, text: 'Live Result', path: '/live-result', category: 'Academics', showWhenAuthenticated: true },
    { icon: <MonitorCheck size={20} />, text: 'Teaching Evaluation', path: '/teaching-evaluation', category: 'Academics', showWhenAuthenticated: true },
    { icon: <Users size={20} />, text: 'Alumni Professional', path: '/alumni-professional', category: 'Alumni', showWhenAuthenticated: true },
    { icon: <Award size={20} />, text: 'Convocation Apply', path: '/convocation-apply', category: 'Applications', showWhenAuthenticated: true },
    { icon: <FileCheck size={20} />, text: 'Certificate & Transcript Apply', path: '/certificate-transcript-apply', category: 'Applications', showWhenAuthenticated: true },
    { icon: <FileCheck size={20} />, text: 'Online Exam', path: '/online-exam', category: 'Academics', showWhenAuthenticated: true },
    { icon: <Laptop size={20} />, text: 'Laptop', path: '/laptop', category: 'Resources', showWhenAuthenticated: true },
    { icon: <ClipboardList size={20} />, text: 'Routine', path: '/routine', category: 'Academics', showWhenAuthenticated: true },
    { icon: <Users size={20} />, text: 'Mentor Meeting', path: '/mentor-meeting', category: 'Academics', showWhenAuthenticated: true },
    { icon: <GraduationCap size={20} />, text: 'Result', path: '/result', category: 'Academics', showWhenAuthenticated: true, public: true },
    { icon: <Bell size={20} />, text: 'Notices', path: '/notices', category: 'General', showWhenAuthenticated: true, public: true },
    { icon: <FileCheck size={20} />, text: 'Digital Certificate', path: '/certificate-verify', category: 'Applications', showWhenAuthenticated: true, public: true },
    { icon: <CreditCard size={20} />, text: 'Transport Card Apply', path: '/transport-card-apply', category: 'Applications', showWhenAuthenticated: true },
    { icon: <Briefcase size={20} />, text: 'Internship', path: '/internship', category: 'Applications', showWhenAuthenticated: true, public: true },
    { icon: <Building2 size={20} />, text: 'Hall Portal', path: '/hall', category: 'Resources', showWhenAuthenticated: true, public: true },
    { icon: <FileText size={20} />, text: 'Student Application', path: '/student-application', category: 'Applications', showWhenAuthenticated: true, public: true },
    { icon: <Award size={20} />, text: 'Alumni Card Apply', path: '/alumni-card-apply', category: 'Alumni', showWhenAuthenticated: true },
    { icon: <BookOpen size={20} />, text: 'Library', path: '/library', category: 'Resources', showWhenAuthenticated: true, public: true },
    { icon: <Calendar size={20} />, text: 'Academic Calendar', path: '/calendar', category: 'Resources', showWhenAuthenticated: true, public: true },
    { icon: <Briefcase size={20} />, text: 'skill.jobs', path: '/skill-jobs', category: 'Resources', showWhenAuthenticated: true, public: true },
    { icon: <LogOut size={20} />, text: 'Logout', path: '/logout', category: 'General', showWhenAuthenticated: true },
  ];

  const filteredMenuItems = menuItems.filter(item => {
    // Remove Login item when user is authenticated
    if (isAuthenticated && item.text === 'Log in') {
      return false;
    }
    return item.public || (isAuthenticated ? item.showWhenAuthenticated : !item.showWhenAuthenticated);
  });


  // Group menu items by category, excluding Logout
  const categorizedMenu: { [category: string]: MenuItem[] } = {};
  let logoutItem: MenuItem | undefined = undefined;
  filteredMenuItems.forEach(item => {
    if (item.text === 'Logout') {
      logoutItem = item;
      return;
    }
    if (!categorizedMenu[item.category]) {
      categorizedMenu[item.category] = [];
    }
    categorizedMenu[item.category].push(item);
  });

  // Handle logout confirmation
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutDialog(true);
  };
  const confirmLogout = () => {
    setShowLogoutDialog(false);
    logout();
    toast.success('Logged out successfully');
    toggleSidebar();
    router.push('/login');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-teal-600 to-blue-900 text-white w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-xl overflow-hidden flex flex-col z-50`}
      >
        <div className="flex justify-between items-center px-4 p-1.5 border-b border-teal-500/30 sticky top-0 bg-teal-600 ">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-teal-700/50 rounded-full transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="py-2 flex-1 overflow-y-auto p-1 sidebar-scrollbar" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(13, 148, 136, 0.5) rgba(13, 148, 136, 0.1)'
        }}>

          {Object.entries(categorizedMenu).map(([category, items]) => (
            <div key={category} className="mb-2">
              <div className="px-4 py-1 text-xs font-semibold uppercase text-teal-200 tracking-wider opacity-80">
                {category}
              </div>
              {items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link 
                    key={item.text}
                    href={item.path}
                    className={`flex items-center space-x-3 px-4 py-2 hover:bg-teal-700/50 transition-colors duration-200 rounded ${isActive ? 'bg-teal-800 font-bold' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.path);
                    }}
                  >
                    <span className="text-teal-300">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        {logoutItem && (
          <div className="p-4 mt-auto">
            <button
              className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-700/50 transition-colors duration-200 rounded bg-red-600 font-bold text-white justify-center focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleLogout}
            >
              <span>{(logoutItem as MenuItem).icon}</span>
              <span className="text-sm">{(logoutItem as MenuItem).text}</span>
            </button>
          </div>
        )}
      </aside>

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
    </>
  );
};

export default Sidebar;