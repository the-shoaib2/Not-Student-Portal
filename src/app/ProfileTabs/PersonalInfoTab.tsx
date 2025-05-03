import React, { memo } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { StudentInfo, PhotographInfo } from '../../services/api';

interface PersonalInfoTabProps {
  studentInfo: StudentInfo | null;
  photograph: PhotographInfo | null;
  loading: boolean;
}


const PersonalInfoTabComponent: React.FC<PersonalInfoTabProps> = ({ studentInfo, loading }) => {
  if (loading || !studentInfo) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="shadow-sm overflow-hidden">
            <CardHeader className="p-3 sm:p-4 bg-gray-50 border-b">
              <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent className="p-3 sm:p-4 space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full sm:w-3/5 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Personal Information</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Full Name:</span> 
            <span className="font-medium text-gray-800">{studentInfo.firstName} {studentInfo.lastName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Gender:</span> 
            <span className="font-medium text-gray-800">{studentInfo.sex || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Date of Birth:</span> 
            <span className="font-medium text-gray-800">
              {studentInfo.birthDate ? new Date(studentInfo.birthDate).toLocaleDateString() : 'Not provided'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Blood Group:</span> 
            <span className="font-medium text-gray-800">{studentInfo.bloodGroup || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Religion:</span> 
            <span className="font-medium text-gray-800">{studentInfo.religion || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Nationality:</span> 
            <span className="font-medium text-gray-800">{studentInfo.nationality || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
            <span className="text-sm text-gray-500">Marital Status:</span> 
            <span className="font-medium text-gray-800">{studentInfo.maritalStatus || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Contact Information</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-col gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Email:</span> 
            <span className="font-medium text-gray-800 break-all">{studentInfo.email || 'Not provided'}</span>
          </div>
          <div className="flex flex-col gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Alternative Email:</span> 
            <span className="font-medium text-gray-800 break-all">{studentInfo.emailAlternative || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Mobile:</span> 
            <span className="font-medium text-gray-800">{studentInfo.mobile || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
            <span className="text-sm text-gray-500">Phone:</span> 
            <span className="font-medium text-gray-800">{studentInfo.workPhone || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Academic Information</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Department:</span> 
            <span className="font-medium text-gray-800">{studentInfo.departmentName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Program:</span> 
            <span className="font-medium text-gray-800">{studentInfo.programName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Batch:</span> 
            <span className="font-medium text-gray-800">{studentInfo.batchNo || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Semester:</span> 
            <span className="font-medium text-gray-800">{studentInfo.semesterName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
            <span className="text-sm text-gray-500">Credits Completed:</span> 
            <span className="font-medium text-gray-800">{studentInfo.completedCredits || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Additional Information</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Passport No:</span> 
            <span className="font-medium text-gray-800">{studentInfo.passportNo || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">National ID:</span> 
            <span className="font-medium text-gray-800">{studentInfo.nationality ? studentInfo.nationality + ' ID' : 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
            <span className="text-sm text-gray-500">Birth Certificate No:</span> 
            <span className="font-medium text-gray-800">Not provided</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const PersonalInfoTab = memo(PersonalInfoTabComponent);
export default memo(PersonalInfoTabComponent);
