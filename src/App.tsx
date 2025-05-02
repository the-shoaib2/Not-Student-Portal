import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="flex flex-grow relative pt-16">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <MainContent />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;