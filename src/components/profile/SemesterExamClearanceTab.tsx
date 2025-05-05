import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '../ui/table';

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

import { Check, X } from "lucide-react";

const statusIcon = (ok: boolean) => (
  ok ? <Check className="text-green-600 w-5 h-5 mx-auto" /> : <X className="text-gray-400 w-5 h-5 mx-auto" />
);

const SemesterExamClearanceTab: React.FC<SemesterExamClearanceTabProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500 max-w-3xl mx-auto">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse" />
        </CardHeader>
        <CardContent >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Semester</TableHead>
                  <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Registration</TableHead>
                  <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Midterm Exam</TableHead>
                  <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Final Exam</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="w-36"><div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show data
  return (
    <Card className="shadow-sm overflow-hidden max-w-4xl mx-auto animate-in fade-in-50 duration-500">
      <CardHeader className="pb-0" >
        <h2 className="text-sm sm:text-base font-medium  text-teal-700 border-b pb-1 sm:pb-2">Semester Exam Clearance Status</h2>
      </CardHeader>
      <CardContent className="p-2  sm:p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Semester</TableHead>
              <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Registration</TableHead>
              <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Midterm Exam</TableHead>
              <TableHead className="h-8 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-2 sm:px-1 text-sm sm:text-xs">Final Exam</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              [...data]
                .sort((a, b) => (b.semesterId > a.semesterId ? 1 : b.semesterId < a.semesterId ? -1 : 0))
                .map((row, idx) => (
                  <TableRow key={row.semesterId || idx} className={idx % 2 === 0 ? "bg-teal-50 hover:bg-teal-100 transition" : "bg-white hover:bg-teal-100 transition"}>
                    <TableCell className="font-medium text-teal-700 border border-teal-100 px-2 sm:px-1 py-1 sm:py-0.5 whitespace-nowrap text-sm sm:text-xs">{row.semesterName}</TableCell>
                    <TableCell className="text-center border border-teal-100 px-2 sm:px-1 py-1 sm:py-0.5 text-sm sm:text-xs">{statusIcon(row.registration)}</TableCell>
                    <TableCell className="text-center border border-teal-100 px-2 sm:px-1 py-1 sm:py-0.5 text-sm sm:text-xs">{statusIcon(row.midTermExam)}</TableCell>
                    <TableCell className="text-center border border-teal-100 px-2 sm:px-1 py-1 sm:py-0.5 text-sm sm:text-xs">{statusIcon(row.finalExam)}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400 py-6 text-sm sm:text-xs">No data found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SemesterExamClearanceTab;
