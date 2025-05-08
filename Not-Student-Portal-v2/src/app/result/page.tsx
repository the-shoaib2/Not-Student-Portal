'use client';

import { useEffect, useState } from 'react';
import type { Semester, Result, StudentInfo,resultService } from '@/services/api';
import PageTitle from '@/components/PageTitle';

export default function ResultPage() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await resultService.getSemesterList();
        setSemesters(response);
        if (response.length > 0) {
          setSelectedSemester(response[0].id);
        }
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };

    fetchSemesters();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!selectedSemester) return;

      setLoading(true);
      try {
        const [resultResponse, studentResponse] = await Promise.all([
          resultService.getStudentResult(selectedSemester, studentInfo?.studentId || ''),
          resultService.getStudentInfo(studentInfo?.studentId || '')
        ]);

        setResults(Array.isArray(resultResponse) ? resultResponse : [resultResponse]);
        setStudentInfo(studentResponse);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedSemester, studentInfo?.studentId]);

  const calculateSGPA = (results: Result[]) => {
    if (!results.length) return 0;

    const totalPoints = results.reduce((sum, result) => sum + (result.pointEquivalent * result.totalCredit), 0);
    const totalCredits = results.reduce((sum, result) => sum + result.totalCredit, 0);

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Academic Results" />

      {/* Semester Selection */}
      <div className="mb-6">
        <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
          Select Semester
        </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {semesters.map((semester) => (
            <option key={semester.id} value={semester.id}>
              {semester.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Student Information */}
          {studentInfo && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Student Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-600">Student ID</p>
                  <p className="font-medium">{studentInfo.studentId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{studentInfo.studentName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Program</p>
                  <p className="font-medium">{studentInfo.programName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Department</p>
                  <p className="font-medium">{studentInfo.departmentName}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.courseId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.courseId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.courseTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.totalCredit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.gradeLetter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.pointEquivalent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SGPA Summary */}
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Semester Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600">SGPA</p>
                <p className="text-2xl font-bold">{calculateSGPA(results).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold">
                  {results.reduce((sum, result) => sum + result.totalCredit, 0)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Total Points</p>
                <p className="text-2xl font-bold">
                  {results.reduce((sum, result) => sum + (result.pointEquivalent * result.totalCredit), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 