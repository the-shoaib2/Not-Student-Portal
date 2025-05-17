"use client"

import React, { Suspense } from 'react';
import { GraduationCap, BookOpen, Calendar, Building2, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const Home: React.FC = () => {
  const router = useRouter();
  const quickLinks = [
    { 
      icon: <GraduationCap size={20} />,
      title: 'Academic',
      description: 'View your academic progress and results',
      href: '/academic'
    },
    { 
      icon: <BookOpen size={20} />,
      title: 'Library',
      description: 'Access digital library resources',
      href: '/library'
    },
    { 
      icon: <Calendar size={20} />,
      title: 'Calendar',
      description: 'Check academic calendar and events',
      href: '/calendar'
    },
    { 
      icon: <Building2 size={20} />,
      title: 'Hall',
      description: 'Manage residential hall services',
      href: '/hall'
    },
    { 
      icon: <Briefcase size={20} />,
      title: 'Career',
      description: 'Explore internship and job opportunities',
      href: '/career'
    },
  ];

  const QuickLinksContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quickLinks.map((link, index) => (
        <button
          key={index}
          onClick={() => router.push(link.href)}
          className="bg-white rounded-md shadow p-3 hover:shadow-md transition-shadow duration-300 cursor-pointer flex items-start space-x-3 hover:bg-gray-50"
        >
          <div className="p-2 bg-teal-100 rounded-md text-teal-600">
            {link.icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">{link.title}</h3>
            <p className="text-sm text-gray-600">{link.description}</p>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <main className="flex-grow p-4 pt-10">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="relative mb-4 bg-gradient-to-r from-sky-300 to-emerald-300 rounded-lg shadow p-4 sm:p-6 md:p-8 text-center overflow-hidden">
          {/* Silver Gradient N.O.T. Overlay */}
          <h1 className="absolute inset-0 flex items-center justify-center text-[80px] sm:text-[120px] md:text-[180px] font-extrabold text-transparent bg-gradient-to-r from-[#C0C0C0] via-[#DCDCDC] to-[#C0C0C0] bg-clip-text opacity-70 pointer-events-none leading-none">
            N O T
          </h1>
          {/* Logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 relative z-10">
          <Image
  src="/diuLogo.png"
  alt="DIU Logo"
  fill
  sizes="(max-width: 768px) 100vw, 33vw"
  className="object-contain"
/>

          </div>
          {/* Text Content */}
          <div className="relative z-10 space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-gray-700">Not Our Technology (NOT)</p>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Welcome to Student Portal</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-700">Access all your academic resources in one place</p>
          </div>
        </div>

        {/* Quick Links Grid with Suspense */}
        <Suspense fallback={<Skeleton />}> 
          <QuickLinksContent />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
