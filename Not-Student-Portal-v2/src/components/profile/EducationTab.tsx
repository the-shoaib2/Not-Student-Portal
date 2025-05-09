import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StudentInfo, EducationInfo } from '@/services/api';

interface EducationTabProps {
  studentInfo: StudentInfo | null;
  educationInfo: EducationInfo[] | null;
  loading: boolean;
}

const EducationTabComponent: React.FC<EducationTabProps> = ({ studentInfo, educationInfo, loading }) => {
  if (loading || !studentInfo) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3">
          <div className="space-y-4">
            <div className="h-5 w-full bg-gray-100 rounded-md animate-pulse" />
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex space-x-4 py-2">
                {[...Array(8)].map((_, cellIndex) => (
                  <div key={cellIndex} className="h-4 flex-1 bg-gray-200 rounded-md animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasEducationInfo = educationInfo && educationInfo.length > 0;

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 col-span-1 lg:col-span-2">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <h2 className="text-base font-semibold text-teal-800 flex items-center gap-2">
          Education and Training
        </h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <div className="overflow-x-auto" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(13, 148, 136, 0.5) rgba(13, 148, 136, 0.1)'
          }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-semibold">Degree</TableHead>
                <TableHead className="text-xs font-semibold">Degree Name</TableHead>
                <TableHead className="text-xs font-semibold">Institute</TableHead>
                <TableHead className="text-xs font-semibold">University/Board</TableHead>
                <TableHead className="text-xs font-semibold">Passing Year</TableHead>
                <TableHead className="text-xs font-semibold">Grade/Class/Division</TableHead>
                <TableHead className="text-xs font-semibold">Marks/CGPA</TableHead>
                <TableHead className="text-xs font-semibold">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasEducationInfo ? (
                educationInfo.map((edu, index) => (
                  <TableRow key={edu.id || index}>
                    <TableCell className="text-sm text-center">{edu.degree || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-center">{edu.major || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-center">{edu.institute || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-center">N/A</TableCell>
                    <TableCell className="text-sm text-center">{edu.passingYear || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-center">N/A</TableCell>
                    <TableCell className="text-sm text-center">{edu.result || 'N/A'} {edu.scale ? `(${edu.scale})` : ''}</TableCell>
                    <TableCell className="text-sm text-center">{edu.duration ? `${edu.duration} years` : 'N/A'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                    No education information available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export const EducationTab = memo(EducationTabComponent);
export default memo(EducationTabComponent);