import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    />
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-4 bg-gray-200 animate-pulse h-40 rounded-lg w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-100 rounded-md h-24 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
};