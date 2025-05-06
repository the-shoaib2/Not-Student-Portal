import React, { useState } from 'react';
import RegisteredCourseTabs, { SemesterInfo } from '../components/profile/RegisteredCourseTabs';
import PageTitle from '../components/PageTitle';

const RegisteredCourse: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<SemesterInfo | null>(null);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <PageTitle title="Registered Courses" icon="BookOpen" />
      <RegisteredCourseTabs
        selectedSemesterId={selectedSemester?.semesterId}
        onSemesterSelect={setSelectedSemester}
      />
      {selectedSemester && (
        <div className="mt-6 text-center text-teal-700">
          <h2 className="text-lg font-semibold">Selected Semester: {selectedSemester.semesterName}</h2>
          {/* Here you can load and show the registered courses for the selected semester */}
        </div>
      )}
    </div>
  );
};

export default RegisteredCourse;