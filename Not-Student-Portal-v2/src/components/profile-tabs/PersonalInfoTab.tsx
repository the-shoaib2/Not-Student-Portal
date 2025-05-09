import React, { memo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { StudentInfo, PhotographInfo } from '@/services/api';

interface PersonalInfoTabProps {
  studentInfo: StudentInfo | null;
  photograph: PhotographInfo | null;
  loading: boolean;
}

const PersonalInfoTabComponent: React.FC<PersonalInfoTabProps> = ({ studentInfo, loading }) => {
  if (loading || !studentInfo) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3">
          <div className="space-y-4">
            {[...Array(4)].map((_, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <div className="h-5 w-40 bg-gray-100 rounded-md animate-pulse mb-2" />
                {[...Array(sectionIndex === 0 ? 6 : 4)].map((_, rowIndex) => (
                  <div key={rowIndex} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <h2 className="text-base font-semibold text-teal-800">Student Information</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Personal Information</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Full Name</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.firstName} {studentInfo.lastName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Gender</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.sex || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Date of Birth</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">
                {studentInfo.birthDate ? new Date(studentInfo.birthDate).toLocaleDateString() : 'Not provided'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Blood Group</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.bloodGroup || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Religion</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.religion || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Nationality</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.nationality || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Marital Status</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.maritalStatus || 'Not provided'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Contact Information</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Email</TableCell>
              <TableCell className="font-medium text-gray-800 break-all">{studentInfo.email || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Alternative Email</TableCell>
              <TableCell className="font-medium text-gray-800 break-all">{studentInfo.emailAlternative || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Mobile</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.mobile || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Phone</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.workPhone || 'Not provided'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Academic Information</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Department</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.departmentName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Program</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.programName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Batch</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.batchNo || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Semester</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.semesterName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Credits Completed</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.completedCredits || 'Not provided'}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Additional Information</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Passport No</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.passportNo || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">National ID</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.nationality ? studentInfo.nationality + ' ID' : 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Birth Certificate No</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">Not provided</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const PersonalInfoTab = memo(PersonalInfoTabComponent);
export default memo(PersonalInfoTabComponent);
