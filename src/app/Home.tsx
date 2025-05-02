import React from 'react';
import { GraduationCap, BookOpen, Calendar, Building2, Briefcase } from 'lucide-react';

const Home: React.FC = () => {
  const quickLinks = [
    { icon: <GraduationCap size={20} />, title: 'Academic', description: 'View your academic progress and results' },
    { icon: <BookOpen size={20} />, title: 'Library', description: 'Access digital library resources' },
    { icon: <Calendar size={20} />, title: 'Calendar', description: 'Check academic calendar and events' },
    { icon: <Building2 size={20} />, title: 'Hall', description: 'Manage residential hall services' },
    { icon: <Briefcase size={20} />, title: 'Career', description: 'Explore internship and job opportunities' },
  ];

  return (
    <main className="flex-grow p-6">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-4 bg-gradient-to-r from-sky-300 to-emerald-300 rounded-lg shadow p-4 text-center">
          <div className="w-20 h-20 mx-auto mb-3">
            <img 
              src="/diuLogo.png" 
              alt="DIU Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Student Portal</h1>
          <p className="text-base text-gray-700">Access all your academic resources in one place</p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <div 
              key={index}
              className="bg-white rounded-md shadow p-3 hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-teal-100 rounded-md text-teal-600">
                  {link.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">{link.title}</h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home; 