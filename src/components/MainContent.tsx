"use client"
import React from 'react';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex-1 overflow-auto">
      <div className="w-full">
        {children}
      </div>
    </main>
  );
};

export default MainContent;