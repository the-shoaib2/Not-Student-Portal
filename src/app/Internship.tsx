import React from 'react';

const Internship: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Internship Opportunities</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">Available Internships</h2>
            <p className="text-gray-500">No internship opportunities available at the moment.</p>
          </div>
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">Internship Guidelines</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
              <li>Minimum duration: 3 months</li>
              <li>Must be related to your field of study</li>
              <li>Requires approval from department</li>
              <li>Final report submission required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Internship; 