import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { registeredCourseService } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import PageTitle from '../components/PageTitle';

export interface SemesterInfo {
  semesterId: string;
  semesterYear: number;
  semesterName: string;
}

interface CourseRoutine {
  roomNo: string;
  day: string;
  levelTerm: string;
  timeSlot: string;
  teacher: string;
}

interface RegisteredCourse {
  routine: CourseRoutine;
  courseCode: string;
  courseTitle: string;
  credit: number;
  section: string;
  teacher: string;
  advised: boolean;
  regClearance: boolean;
}

const RegisteredCourse: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<SemesterInfo | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const [semesters, setSemesters] = useState<SemesterInfo[]>([]);
  const [semesterLoading, setSemesterLoading] = useState(true);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        setSemesterLoading(true);
        
        const res = await registeredCourseService.getSemesterList();
        
        if (!res || res.length === 0) {
          console.error('No semesters found.');
          return;
        }

        // Sort semesters by year (descending) and then by semester name
        const sortedSemesters = res.sort((a: SemesterInfo, b: SemesterInfo) => {
          if (b.semesterYear !== a.semesterYear) {
            return b.semesterYear - a.semesterYear;
          }
          // Custom semester order: Fall > Summer > Spring > Short
          const semesterOrder: Record<string, number> = { 'Fall': 4, 'Summer': 3, 'Spring': 2, 'Short': 1 };
          return (semesterOrder[b.semesterName] ?? 0) - (semesterOrder[a.semesterName] ?? 0);
        });

        setSemesters(sortedSemesters);
      } catch (err) {
        console.error('Error fetching semesters:', err);
      } finally {
        setSemesterLoading(false);
      }
    };

    fetchSemesters();
  }, []);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      if (!selectedSemester) return;

      try {
        setLoading(true);
        
        const selectedSemId = selectedSemester.semesterId;
        const res = await registeredCourseService.getRegisteredCourses(selectedSemId);
        
        if (!res || res.length === 0) {
          console.error('No courses found for this semester.');
          setRegisteredCourses([]);
          return;
        }
        
        setRegisteredCourses(res);
      } catch (err) {
        console.error('Error fetching registered courses:', err);
        setRegisteredCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredCourses();
  }, [selectedSemester]);

  if (semesterLoading) {
    return <div className="flex gap-2 animate-pulse my-4 justify-center">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="h-8 w-24 bg-gray-200 rounded" />
      ))}
    </div>;
  }

  if (loading || !selectedSemester) {
    return (
      <Card className="shadow-sm overflow-hidden animate-in fade-in-50 duration-500 max-w-3xl mx-auto">
        <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <CardTitle className="h-5 w-32 sm:h-6 sm:w-48 bg-gray-200 rounded-md animate-pulse mx-auto" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border border-teal-100 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Routine</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Course Code</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Course Title</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Credit</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Section</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Teacher</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Advised</TableHead>
                  <TableHead className="h-5 sm:h-7 bg-teal-600 text-white text-center border border-teal-200 px-0.5 sm:px-1 text-xs sm:text-xs whitespace-nowrap">Reg Clearance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="w-24 sm:w-36"><div className="h-3 w-16 sm:h-4 sm:w-24 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-3 w-10 sm:h-4 sm:w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-3 w-10 sm:h-4 sm:w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-3 w-10 sm:h-4 sm:w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
                    <TableCell><div className="h-3 w-10 sm:h-4 sm:w-16 bg-gray-200 rounded-md animate-pulse mx-auto" /></TableCell>
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

  return (
    <div>
      <PageTitle title="Registered Courses" />
      <Card className="shadow-sm overflow-hidden max-w-4xl mx-auto animate-in fade-in-50 duration-500">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm sm:text-base font-medium text-teal-700 border-b pb-1 sm:pb-2">Registered Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center my-4 space-y-4">
            <select
              value={selectedSemester?.semesterId || ''}
              onChange={(e) => {
                const selectedSem = semesters.find(sem => sem.semesterId === e.target.value);
                if (selectedSem) setSelectedSemester(selectedSem);
              }}
              className="w-64 px-4 py-2 rounded border border-teal-300 text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="" disabled>Select a Semester</option>
              {semesters.map(sem => (
                <option key={sem.semesterId} value={sem.semesterId}>
                  {sem.semesterName} {sem.semesterYear}
                </option>
              ))}
            </select>
          </div>

          {selectedSemester && (
            <div>
              <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Course Routine</h3>
                <div className="overflow-x-auto rounded-md border border-teal-100 bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 text-xs whitespace-nowrap">Room No</TableHead>
                        <TableHead className="h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 text-xs whitespace-nowrap">Day</TableHead>
                        <TableHead className="h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 text-xs whitespace-nowrap">Level Term</TableHead>
                        <TableHead className="h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 text-xs whitespace-nowrap">Time Slot</TableHead>
                        <TableHead className="h-7 bg-teal-600 text-white text-center border border-teal-200 px-1 text-xs whitespace-nowrap">Teacher</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {registeredCourses.length > 0 ? (
                      registeredCourses.map((course, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? "bg-teal-50 hover:bg-teal-100 transition" : "bg-white hover:bg-teal-100 transition"}>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.routine.roomNo || 'N/A'}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.routine.day || 'N/A'}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.routine.levelTerm || 'N/A'}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.routine.timeSlot || 'N/A'}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.routine.teacher || 'N/A'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-400 py-6 text-sm">
                          No course routine available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2">Registered Course List</h3>
              <div className="overflow-x-auto rounded-md border border-teal-100 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center border border-teal-200 px-1 text-xs whitespace-nowrap bg-teal-600 text-white">Course Code</TableHead>
                      <TableHead className="text-center border border-teal-200 px-1 text-xs whitespace-nowrap bg-teal-600 text-white">Course Title</TableHead>
                      <TableHead className="text-center border border-teal-200 px-1 text-xs whitespace-nowrap bg-teal-600 text-white">Credit</TableHead>
                      <TableHead className="text-center border border-teal-200 px-1 text-xs whitespace-nowrap bg-teal-600 text-white">Section</TableHead>
                      <TableHead className="text-center border border-teal-200 px-1 text-xs whitespace-nowrap bg-teal-600 text-white">Teacher</TableHead>
                      <TableHead className="text-center border border-teal-200 px-1 text-xs whitespace-nowrap bg-teal-600 text-white">Advised</TableHead>
                      <TableHead className="text-center border border-teal-200 px-1 text-xs whitespace-nowrap bg-teal-600 text-white">Reg Clearance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registeredCourses.length > 0 ? (
                      registeredCourses.map((course, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? "bg-teal-50 hover:bg-teal-100 transition" : "bg-white hover:bg-teal-100 transition"}>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.courseCode}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.courseTitle}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.credit}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.section}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.teacher}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.advised ? 'Yes' : 'No'}</TableCell>
                          <TableCell className="text-center border border-teal-100 px-1 py-0.5 text-xs">{course.regClearance ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-400 py-6 text-sm">
                          No registered courses available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            </div>
        </CardContent>
      </Card>
    );
}

export default RegisteredCourse;