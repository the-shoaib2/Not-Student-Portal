"use client"
import React, { memo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { StudentInfo } from '@/services/api';

interface GuardianInfoTabProps {
  studentInfo: StudentInfo | null;
  loading: boolean;
}

const GuardianInfoTabComponent: React.FC<GuardianInfoTabProps> = ({ studentInfo, loading }) => {
  if (loading || !studentInfo) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3">
          <div className="space-y-4">
            {[...Array(3)].map((_, sectionIndex) => (
              <div key={sectionIndex} className="space-y-3">
                <div className="h-5 w-40 bg-gray-100 rounded-md animate-pulse mb-2" />
                {[...Array(6)].map((_, rowIndex) => (
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
        <h2 className="text-base font-semibold text-teal-800">Guardian Information</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Father's Information</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Name</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.fatherName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Mobile</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.fatherMobile || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Email</TableCell>
              <TableCell className="font-medium text-gray-800 break-all">{studentInfo.fatherEmail || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Occupation</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.fatherOccupation || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Designation</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.fatherDesignation || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Employer</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.fatherEmployerName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Annual Income</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">
                {studentInfo.fatherAnnualIncome ? `${studentInfo.fatherAnnualIncome.toLocaleString()} BDT` : 'Not provided'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Mother's Information</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Name</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.motherName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Mobile</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.motherMobile || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Email</TableCell>
              <TableCell className="font-medium text-gray-800 break-all">{studentInfo.motherEmail || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Occupation</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.motherOccupation || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Designation</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.motherDesignation || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Employer</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.motherEmployerName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Annual Income</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">
                {studentInfo.motherAnnualIncome ? `${studentInfo.motherAnnualIncome.toLocaleString()} BDT` : 'Not provided'}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-xs text-gray-500 font-semibold bg-gray-50" colSpan={2}>Local Guardian Information</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Name</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.localGuardianName || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Relation</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.localGuardianRelation || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Mobile</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.localGuardianMobile || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Email</TableCell>
              <TableCell className="font-medium text-gray-800 break-all">{studentInfo.localGuardianEmail || 'Not provided'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Address</TableCell>
              <TableCell className="text-sm font-medium text-gray-800">{studentInfo.localGuardianAddress || 'Not provided'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const GuardianInfoTab = memo(GuardianInfoTabComponent);
export default memo(GuardianInfoTabComponent);
