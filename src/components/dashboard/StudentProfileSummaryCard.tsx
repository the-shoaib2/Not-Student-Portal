import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card';
import { Table, TableBody, TableRow, TableCell } from '../ui/table';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { StudentInfo } from '../../services/api';
import { ArrowRightIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface StudentProfileSummaryCardProps {
  studentInfo: StudentInfo | null;
  loading?: boolean;
}

const StudentProfileSummaryCard: React.FC<StudentProfileSummaryCardProps> = ({
  studentInfo,
  loading = false,
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b flex justify-between items-center">
          <h2 className="text-base font-semibold text-teal-800">Loading Profile</h2>
          <Skeleton className="w-16 h-16 rounded-full" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3">
          <Table>
            <TableBody>
              {[1, 2, 3, 4].map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs text-gray-500 w-1/3">
                    <Skeleton className="h-4 w-3/4" />
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }



  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
        <h2 className="text-base font-semibold text-teal-800 ">Personal Information</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Name</TableCell>
              <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                {studentInfo?.firstName || 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Birth Date</TableCell>
              <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                {studentInfo?.birthDate ? new Date(studentInfo.birthDate).toLocaleDateString() : 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Mobile</TableCell>
              <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                {studentInfo?.mobile || 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Blood Group</TableCell>
              <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                {studentInfo?.bloodGroup || 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Father's Name</TableCell>
              <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                {studentInfo?.fatherName || 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500 w-1/3">Mother's Name</TableCell>
              <TableCell className="text-sm font-medium text-gray-800 w-2/3">
                {studentInfo?.motherName || 'N/A'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-xs text-gray-500">Alternative Email</TableCell>
              <TableCell className="font-medium text-gray-800 break-all">
                {studentInfo?.emailAlternative || 'Not provided'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="p-2 sm:p-3 border-t flex justify-end">
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => navigate('/profile')}
          className="bg-teal-600 hover:bg-teal-800 text-white group"
        >
          More Details
          <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentProfileSummaryCard;
