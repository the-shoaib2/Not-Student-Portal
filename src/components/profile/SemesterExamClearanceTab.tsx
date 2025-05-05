import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Table, TableBody, TableRow, TableCell, TableHead } from '../ui/table';

export interface SemesterExamClearance {
  studentId: string | null;
  semesterId: string;
  semesterName: string;
  registration: boolean;
  midTermExam: boolean;
  finalExam: boolean;
}

interface SemesterExamClearanceTabProps {
  data: SemesterExamClearance[] | null;
  loading: boolean;
}

const SemesterExamClearanceTab: React.FC<SemesterExamClearanceTabProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3">
          <div className="space-y-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50">
                <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <h2 className="font-semibold text-lg">Semester Exam Clearance</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Semester</TableCell>
              <TableCell>Registration</TableCell>
              <TableCell>Mid-Term</TableCell>
              <TableCell>Final Exam</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.semesterId}>
                  <TableCell>{row.semesterName}</TableCell>
                  <TableCell>
                    {row.registration ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-red-500 font-semibold">✘</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.midTermExam ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-red-500 font-semibold">✘</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.finalExam ? (
                      <span className="text-green-600 font-semibold">✔</span>
                    ) : (
                      <span className="text-red-500 font-semibold">✘</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">No data found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SemesterExamClearanceTab;
