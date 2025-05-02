import React from 'react';

const SkillJobs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">skill.jobs</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">Job Listings</h2>
            <p className="text-gray-500">No job listings available at the moment.</p>
          </div>
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">Career Resources</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
              <li>Resume Writing Tips</li>
              <li>Interview Preparation</li>
              <li>Career Counseling</li>
              <li>Industry Insights</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Upcoming Events</h2>
            <p className="text-gray-500">No upcoming career events scheduled.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillJobs; 