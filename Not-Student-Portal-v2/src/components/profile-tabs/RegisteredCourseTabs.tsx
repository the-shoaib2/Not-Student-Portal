import React, { useEffect, useState } from 'react';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { registeredCourseService } from '@/services/proxy-api';

export interface SemesterInfo {
  semesterId: string;
  semesterYear: number;
  semesterName: string;
}

interface RegisteredCourseTabsProps {
  onSemesterSelect: (semester: SemesterInfo) => void;
  selectedSemesterId?: string;
}

const RegisteredCourseTabs: React.FC<RegisteredCourseTabsProps> = ({ onSemesterSelect, selectedSemesterId }) => {
  const [semesters, setSemesters] = useState<SemesterInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    registeredCourseService.getSemesterList()
      .then(res => {
        setSemesters(res || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load semesters.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex gap-2 animate-pulse my-4 justify-center">{[...Array(3)].map((_, idx) => <div key={idx} className="h-8 w-24 bg-gray-200 rounded" />)}</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center my-4">{error}</div>;
  }
  if (!semesters.length) {
    return <div className="text-gray-400 text-center my-4">No semesters found.</div>;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center my-4">
      {semesters.map(sem => (
        <button
          key={sem.semesterId}
          className={`px-4 py-2 rounded border text-sm font-medium transition-all ${selectedSemesterId === sem.semesterId ? 'bg-teal-600 text-white border-teal-700' : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-50'}`}
          onClick={() => onSemesterSelect(sem)}
        >
          {sem.semesterName}
        </button>
      ))}
    </div>
  );
};

export default RegisteredCourseTabs;
