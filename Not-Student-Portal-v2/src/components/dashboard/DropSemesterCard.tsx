import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface DropSemesterCardProps {
  dropSemesters: any[];
}

export const DropSemesterCard: React.FC<DropSemesterCardProps> = ({ dropSemesters }) => {
  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b">
        <h2 className="text-base font-semibold text-orange-800">Drop Semester Information</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3">
        {dropSemesters && dropSemesters.length > 0 ? (
          <ul className="list-disc pl-5">
            {dropSemesters.map((semester, index) => (
              <li key={index} className="mb-2 text-sm text-gray-700">{semester.name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No drop semester information</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DropSemesterCard;
