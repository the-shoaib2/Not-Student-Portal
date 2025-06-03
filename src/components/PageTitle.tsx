"use client"

import React from 'react';

interface PageTitleProps {
  title: string;
  icon?: React.ReactNode; // Now accepts any React node for icon
}

const PageTitle: React.FC<PageTitleProps> = ({ title, icon }) => {
  return (
    <div className="w-full bg-gradient-to-r from-teal-100 via-white to-teal-100 shadow-lg shadow-teal-500/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-1">
          {icon && <div className="h-6 w-6 text-teal-600 drop-shadow-sm">{icon}</div>}
          <h1 className="text-lg md:text-2xl font-bold text-teal-700 tracking-wide drop-shadow-lg">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;