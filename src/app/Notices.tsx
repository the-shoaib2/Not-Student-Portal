import React from 'react';

const Notices: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notices</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">No notices available at the moment</h2>
            <p className="text-gray-500">Please check back later for updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notices; 