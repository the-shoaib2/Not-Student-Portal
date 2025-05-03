import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { StudentInfo } from '../../services/api';

interface GuardianInfoTabProps {
  studentInfo: StudentInfo | null;
  loading: boolean;
}

const GuardianInfoTabComponent: React.FC<GuardianInfoTabProps> = ({ studentInfo, loading }) => {
  if (loading || !studentInfo) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="shadow-sm overflow-hidden">
            <div className="p-3 sm:p-4 bg-gray-100 border-b">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="p-3 sm:p-4 space-y-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-1 border-b border-gray-100">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full sm:w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Father's Information</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Name:</span> 
            <span className="font-medium text-gray-800">{studentInfo.fatherName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Mobile:</span> 
            <span className="font-medium text-gray-800">{studentInfo.fatherMobile || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Email:</span> 
            <span className="font-medium text-gray-800 break-all">{studentInfo.fatherEmail || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Occupation:</span> 
            <span className="font-medium text-gray-800">{studentInfo.fatherOccupation || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Designation:</span> 
            <span className="font-medium text-gray-800">{studentInfo.fatherDesignation || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Employer:</span> 
            <span className="font-medium text-gray-800">{studentInfo.fatherEmployerName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
            <span className="text-sm text-gray-500">Annual Income:</span> 
            <span className="font-medium text-gray-800">
              {studentInfo.fatherAnnualIncome ? `${studentInfo.fatherAnnualIncome.toLocaleString()} BDT` : 'Not provided'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Mother's Information</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Name:</span> 
            <span className="font-medium text-gray-800">{studentInfo.motherName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Mobile:</span> 
            <span className="font-medium text-gray-800">{studentInfo.motherMobile || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Email:</span> 
            <span className="font-medium text-gray-800 break-all">{studentInfo.motherEmail || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Occupation:</span> 
            <span className="font-medium text-gray-800">{studentInfo.motherOccupation || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Designation:</span> 
            <span className="font-medium text-gray-800">{studentInfo.motherDesignation || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Employer:</span> 
            <span className="font-medium text-gray-800">{studentInfo.motherEmployerName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
            <span className="text-sm text-gray-500">Annual Income:</span> 
            <span className="font-medium text-gray-800">
              {studentInfo.motherAnnualIncome ? `${studentInfo.motherAnnualIncome.toLocaleString()} BDT` : 'Not provided'}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 md:col-span-2">
        <CardHeader className="p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
          <h2 className="text-lg font-bold text-teal-800">Local Guardian Information</h2>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Name:</span> 
            <span className="font-medium text-gray-800">{studentInfo.localGuardianName || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Relation:</span> 
            <span className="font-medium text-gray-800">{studentInfo.localGuardianRelation || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Mobile:</span> 
            <span className="font-medium text-gray-800">{studentInfo.localGuardianMobile || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1 border-b border-gray-100">
            <span className="text-sm text-gray-500">Email:</span> 
            <span className="font-medium text-gray-800 break-all">{studentInfo.localGuardianEmail || 'Not provided'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-1">
            <span className="text-sm text-gray-500">Address:</span> 
            <span className="font-medium text-gray-800">{studentInfo.localGuardianAddress || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const GuardianInfoTab = memo(GuardianInfoTabComponent);
export default memo(GuardianInfoTabComponent);
