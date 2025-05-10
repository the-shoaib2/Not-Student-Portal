"use client"

import React from 'react';

interface PageTitleProps {
  title: string;
  icon?: React.ReactNode; // Now accepts any React node for icon
}

const PageTitle: React.FC<PageTitleProps> = ({ title, icon }) => {
  return (
    <div className="border-b border-gray-300 text-center bg-gradient-to-r from-teal-100 via-white to-teal-100 shadow-lg shadow-teal-500/5 flex items-center justify-center gap-2 py-2">
      {icon && <div className="h-6 w-6 text-teal-600 drop-shadow-sm">{icon}</div>}
      <h1 className="text-lg md:text-2xl font-bold text-teal-700 tracking-wide drop-shadow-lg">
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;