import React from 'react';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import type { SemesterExamClearance, SemesterExamClearanceTabProps } from '@/services/proxy-api';

import { Check, X } from "lucide-react";

const statusIcon = (ok: boolean) => (
  ok ? <Check className="text-green-600 w-5 h-5 mx-auto" /> : <X className="text-red-500 w-5 h-5 mx-auto" />
);

const SemesterExamClearanceTab: React.FC<SemesterExamClearanceTabProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500 max-w-4xl mx-auto">
        <CardHeader className="p-2 sm:p-4 flex items-left">
          <CardTitle className="h-5 w-32 sm:h-6 sm:w-48 bg-gray-200 rounded-md animate-pulse ml-3 sm:ml-4" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto  border border-teal-100 bg-white w-full max-w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Semester</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Registration</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Midterm</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="w-24 sm:w-36"><div className="h-3 w-16 sm:h-4 sm:w-24 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-3 w-10 sm:h-4 sm:w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-3 w-10 sm:h-4 sm:w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-3 w-10 sm:h-4 sm:w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
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
        <CardTitle className="text-sm sm:text-base font-medium  text-teal-700 border-b pb-1 sm:pb-2">Semester Clearance Status</CardTitle>
      </CardHeader>
      <CardContent>
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-7 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Semester</TableHead>
              <TableHead className="h-7 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Registration</TableHead>
              <TableHead className="h-7 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Midterm</TableHead>
              <TableHead className="h-7 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              [...data]
                .sort((a, b) => (b.semesterId > a.semesterId ? 1 : b.semesterId < a.semesterId ? -1 : 0))
                .map((row, idx) => (
                  <TableRow key={row.semesterId || idx} className={idx % 2 === 0 ? "bg-teal-50 hover:bg-teal-100 transition" : "bg-white hover:bg-teal-100 transition"}>
                    <TableCell className="font-medium text-teal-700 border border-teal-100 px-1 sm:px-1 py-0.5 sm:py-0.5 whitespace-nowrap text-xs sm:text-xs">{row.semesterName}</TableCell>
                    <TableCell className="text-center border border-teal-100 px-1 sm:px-1 py-0.5 sm:py-0.5 text-xs sm:text-xs">{statusIcon(row.registration)}</TableCell>
                    <TableCell className="text-center border border-teal-100 px-1 sm:px-1 py-0.5 sm:py-0.5 text-xs sm:text-xs">{statusIcon(row.midTermExam)}</TableCell>
                    <TableCell className="text-center border border-teal-100 px-1 sm:px-1 py-0.5 sm:py-0.5 text-xs sm:text-xs">{statusIcon(row.finalExam)}</TableCell>
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
