"use client"

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import { LoadingBar } from '../components/LoadingBar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative h-full">
      <LoadingBar />
      <div className="flex h-full absolute top-0 left-0 right-0 bottom-0">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-col flex-1 w-0">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 flex flex-col">
          <MainContent>{children}</MainContent>
        </div>
        <Footer />
      </div>
      </div>
    </div>
  );
}
