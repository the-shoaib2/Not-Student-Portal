import React, { useState, useEffect } from 'react';
import { resultService } from '../services/api';
import { Search, Loader, BookOpen, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Confetti } from '../components/magicui/confetti';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import PageTitle from '../components/PageTitle';

interface ResultProps {}

interface ResultData {
  semesterId: string;
  semesterName: string;
  semesterYear: number;
  studentId: string;
  courseId: string;
  customCourseId: string;
  courseTitle: string;
  totalCredit: number;
  grandTotal: number | null;
  pointEquivalent: number;
  gradeLetter: string;
  cgpa: number;
  blocked: string;
  blockCause: string | null;
  tevalSubmitted: string;
  teval: string;
  semesterAccountsClearance: string | null;
  // Additional fields for student info
  program?: string;
  studentName?: string;
  enrollmentSemester?: string;
  batch?: string;
}

interface StudentInfo {
  program: string;
  name: string;
  id: string;
  semesterName: string;
  batch: string;
  department: string;
  faculty: string;
  campus: string;
  programCredit: number;
  programType: string;
  currentSemester: string;
}

const Result: React.FC<ResultProps> = () => {
  const [studentId, setStudentId] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedSemesterName, setSelectedSemesterName] = useState('');
  const [semesters, setSemesters] = useState<any[]>([]);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [congratsDetails, setCongratsDetails] = useState({
    sgpa: 0,
    perfectGrades: false,
    message: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<ResultData[]>([]);
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    program: '',
    name: '',
    id: '',
    semesterName: '',
    batch: '',
    department: '',
    faculty: '',
    campus: '',
    programCredit: 0,
    programType: '',
    currentSemester: ''
  });
  const [studentInfoLoading, setStudentInfoLoading] = useState(false);
  const [studentInfoError, setStudentInfoError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Fetch semesters when component mounts
  useEffect(() => {
    let isSubscribed = true;

    const fetchSemesters = async () => {
      try {
        const response = await resultService.getSemesterList();
        if (isSubscribed) {
          // console.log('Semester list response:', response);
          setSemesters(response);
          setError(null);
        }
      } catch (err) {
        if (isSubscribed) {
          // console.error('Error fetching semesters:', err);
          setError('Failed to load semesters. Please try again later.');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchSemesters();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Fetch student info when student ID changes
  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (!studentId) {
        setStudentInfo({
          program: '',
          name: '',
          id: '',
          semesterName: '',
          batch: '',
          department: '',
          faculty: '',
          campus: '',
          programCredit: 0,
          programType: '',
          currentSemester: ''
        });
        setStudentInfoError(null);
        return;
      }
      
      setStudentInfoLoading(true);
      setStudentInfoError(null);
      
      try {
        const info = await resultService.getStudentInfo(studentId);
        if (!info) {
          throw new Error('Student not found');
        }
        
        setStudentInfo({
          program: info.programName || '',
          name: info.studentName || '',
          id: studentId,
          semesterName: info.semesterName || '',
          batch: info.batchNo?.toString() || '',
          department: info.departmentName || '',
          faculty: info.facultyName || '',
          campus: info.campusName || '',
          programCredit: info.programCredit || 0,
          programType: info.programType || '',
          currentSemester: info.semesterName || ''
        });
        setStudentInfoError(null);
      } catch (error) {
        console.error('Error fetching student info:', error);
        setStudentInfo({
          program: '',
          name: '',
          id: studentId,
          semesterName: '',
          batch: '',
          department: '',
          faculty: '',
          campus: '',
          programCredit: 0,
          programType: '',
          currentSemester: ''
        });
        setStudentInfoError('Failed to fetch student information. Please check the ID and try again.');
      } finally {
        setStudentInfoLoading(false);
      }
    };

    fetchStudentInfo();
  }, [studentId]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !semester) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsLoading(true);
      
      // Fetch student info first
      const info = await resultService.getStudentInfo(studentId);
      if (!info) {
        toast.error('Failed to fetch student information');
        return;
      }
      setStudentInfo({
        program: info.programName || '',
        name: info.studentName || '',
        id: studentId,
        semesterName: info.semesterName || '',
        batch: info.batchNo?.toString() || '',
        department: info.departmentName || '',
        faculty: info.facultyName || '',
        campus: info.campusName || '',
        programCredit: info.programCredit || 0,
        programType: info.programType || '',
        currentSemester: info.semesterName || ''
      });

      // Fetch result data
      const result = await resultService.getStudentResult(semester, studentId);
      if (!result || typeof result !== 'object') {
        toast.error('Invalid result data received');
        return;
      }

      // Handle the array of results
      const resultArray = Array.isArray(result) ? result : [result];
      
      // Transform the data to match the expected format
      const transformedResults = resultArray.map((result: any) => ({
        semesterId: result.semesterId,
        semesterName: result.semesterName,
        semesterYear: result.semesterYear,
        studentId: result.studentId,
        courseId: result.courseId,
        customCourseId: result.customCourseId,
        courseTitle: result.courseTitle,
        totalCredit: result.totalCredit,
        grandTotal: result.grandTotal,
        pointEquivalent: result.pointEquivalent,
        gradeLetter: result.gradeLetter,
        cgpa: result.cgpa,
        blocked: result.blocked,
        blockCause: result.blockCause,
        tevalSubmitted: result.tevalSubmitted,
        teval: result.teval,
        semesterAccountsClearance: result.semesterAccountsClearance
      }));

      setResultData(transformedResults as ResultData[]);
      setShowResults(true); // Show results after successful fetch
      setIsLoading(false);
      toast.success('Result loaded successfully!');
    } catch (error: any) {
      // console.error('Error fetching result:', error);
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load result';
      toast.error(errorMessage);
      setResultData([]);
      setStudentInfo({
        program: '',
        name: '',
        id: studentId,
        semesterName: '',
        batch: '',
        department: '',
        faculty: '',
        campus: '',
        programCredit: 0,
        programType: '',
        currentSemester: ''
      });
      setStudentInfoError('Failed to fetch student information. Please check the ID and try again.');
      setShowResults(false);
    }
  };

  const calculateTotalCredits = () => {
    return resultData.reduce((total, course) => total + course.totalCredit, 0);
  };

  const calculateSGPA = () => {
    const totalPoints = resultData.reduce((total, course) => {
      return total + (course.pointEquivalent * course.totalCredit);
    }, 0);
    const totalCredits = calculateTotalCredits();
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Title */}
      <PageTitle
        title="Academic Result"
        icon="Award"
        // subtitle="Powered by !DIU Portal"
      />
      {/* Form Section */}
      <div className="container mx-auto px-4 sm:px-4 md:px-3 py-3 sm:py-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-1.5 sm:p-2 md:p-4 mb-3 sm:mb-4">
          <h2 className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 text-gray-700 border-b pb-1 sm:pb-2">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 sm:gap-1 items-end mb-3 sm:mb-4">
            <div>
              <label htmlFor="studentId" className="block text-red-500 mb-1 text-xs sm:text-sm font-medium">Student Id *</label>
              <input 
                type="text" 
                id="studentId" 
                className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter your student ID"
              />
            </div>
            <div>
              <label htmlFor="semester" className="block text-red-500 mb-1 text-xs sm:text-sm font-medium">Select Semester *</label>
              <div className="relative">
                <select 
                  id="semester" 
                  className="w-full px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
                  value={semester}
                  onChange={(e) => {
                  setSemester(e.target.value);
                  const selectedSem = semesters.find(s => s.semesterId === e.target.value);
                  setSelectedSemesterName(selectedSem ? `${selectedSem.semesterName} ${selectedSem.semesterYear}` : '');
                }}
                >
                  <option value="">Select a semester</option>
                  {isLoading ? (
                    <option value="">Loading...</option>
                  ) : error ? (
                    <option value="">{error}</option>
                  ) : (
                    semesters.map((sem) => (
                      <option key={sem.semesterId} value={sem.semesterId}>
                        {sem.semesterName} {sem.semesterYear}
                      </option>
                    ))
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex justify-center py-2 px-2 sm:py-0 md:justify-start">
              <Button
                onClick={handleSubmit}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md transition duration-300 flex items-center shadow-sm w-full md:w-auto justify-center cursor-pointer gap-2 border border-teal-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-1" />
                )}
                {isLoading ? 'SHOWING RESULT' : 'SHOW RESULT'}
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between bg-pink-50 p-1.5 sm:p-2 rounded-md text-xs">
            <p className="text-pink-600 mb-2 sm:mb-0 text-center sm:text-left">
              Now you can get semester result through SMS. For getting Semester Result through SMS please click here to read
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-md flex items-center transition duration-300 shadow-sm whitespace-nowrap text-xs">
              <BookOpen className="h-4 w-4 mr-1" />
              INSTRUCTION
            </button>
          </div>
        </div>
        
        {/* Student Info */}
        <div className="bg-white rounded-lg shadow-sm p-1.5 sm:p-2 md:p-4 mb-3 sm:mb-4">
          <h2 className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 text-teal-700 border-b pb-1 sm:pb-2">Student Information</h2>
          <div className="space-y-2">
            {studentInfoLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ) : studentInfoError ? (
              <div className="text-red-500 text-xs py-2 bg-red-50 p-2 rounded-md">{studentInfoError}</div>
            ) : (
              <div className="bg-teal-50 p-1.5 sm:p-2 rounded-md text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-1 md:gap-2">
                  
                  
                  <div>
                    <span className="text-gray-600">Student ID: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.id}</span>
                  </div>                  
                  <div>
                    <span className="text-gray-600">Student Name: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Program: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.program}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Semester Name: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.semesterName}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Batch: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.batch}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Department: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.department}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Faculty: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.faculty}</span>
                  </div>
                  
                  <div>
                    <span className="text-gray-600">Campus: </span>
                    <span className="text-gray-800 font-medium">{studentInfo.campus}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Academic Result Table */}
        <div className="bg-white rounded-lg shadow-sm p-1.5 sm:p-2 md:p-4 mb-3 sm:mb-4">
          <h2 className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 text-teal-700 border-b pb-1 sm:pb-2">Academic Result {selectedSemesterName ? `of ${selectedSemesterName}` : ''}</h2>
          <div className="overflow-x-auto -mx-1.5 sm:-mx-2 px-1.5 sm:px-2">
            <div className="w-full inline-block min-w-full align-middle">
              <table className="min-w-full border border-teal-100 rounded-lg overflow-hidden text-[9px] sm:text-[10px] md:text-xs">
                <thead>
                  <tr>
                    <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1 text-left text-[9px] sm:text-xs whitespace-nowrap">Course Code</th>
                    <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1 text-left text-[9px] sm:text-xs whitespace-nowrap">Course Title</th>
                    <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1 text-left text-[9px] sm:text-xs whitespace-nowrap">Credit</th>
                    <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1 text-left text-[9px] sm:text-xs whitespace-nowrap">Grade</th>
                    <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1 text-left text-[9px] sm:text-xs whitespace-nowrap">Grade Point</th>
                  </tr>
                </thead>
                <tbody>
                  {!showResults ? (
                    <tr>
                      <td colSpan={5} className="px-1 sm:px-2 py-0.5 sm:py-1 text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>Please enter your Student ID and select a Semester to view your results.</p>
                      </td>
                    </tr>
                  ) : (
                    resultData.map((course, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-teal-50' : 'bg-white'}>
                        <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 whitespace-nowrap">{course.customCourseId}</td>
                        <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">{course.courseTitle}</td>
                        <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 whitespace-nowrap text-center">{course.totalCredit}</td>
                        <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium whitespace-nowrap text-center">{course.gradeLetter}</td>
                        <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 whitespace-nowrap text-center">{course.pointEquivalent}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {showResults && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 sm:gap-1 mt-2 sm:mt-3 text-center text-[9px] sm:text-[10px] md:text-xs">
                <div className="bg-purple-50 p-0.5 sm:p-1 md:p-2 rounded-md">
                  <p className="text-purple-700 font-medium">Total Credit Requirement: {studentInfo.programCredit || 148}</p>
                </div>
                <div className="bg-purple-50 p-0.5 sm:p-1 md:p-2 rounded-md">
                  <p className="text-purple-700 font-medium">Total Credits Taken: {calculateTotalCredits()}</p>
                </div>
                <div className="bg-purple-50 p-0.5 sm:p-1 md:p-2 rounded-md">
                  <p className="text-purple-700 font-medium">SGPA: {calculateSGPA()}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showResults && (
          <>
            {/* Teaching Evaluation Note */}
            <div className="bg-orange-50 p-3 rounded-lg shadow-sm mb-4 text-sm">
              <p className="text-gray-800 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500 mr-1 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>
                  <span className="font-bold">N.B. :</span> If you see Teaching Evaluation Pending in any course. Please complete 
                  <a href="#" className="text-orange-600 hover:underline ml-1">Teaching Evaluation.</a>
                </span>
              </p>
            </div>
          </>
        )}
        
        {/* UGC Grading System*/}
        <div className="bg-white rounded-lg shadow-sm p-1.5 sm:p-2 md:p-4 mb-3 sm:mb-4">
          <h2 className="text-sm sm:text-base font-medium mb-1.5 sm:mb-2 text-teal-700 border-b pb-1 sm:pb-2">UGC Uniform Grading System</h2>
          <div className="overflow-x-auto -mx-1.5 sm:-mx-2 px-1.5 sm:px-2">
            <table className="min-w-full border border-teal-100 rounded-lg overflow-hidden text-[9px] sm:text-[10px] md:text-xs">
              <thead>
                <tr>
                  <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1">Marks</th>
                  <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1">Letter Grade</th>
                  <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1">Grade Point</th>
                  <th className="bg-teal-600 text-white text-center border border-teal-200 px-1 sm:px-2 py-0.5 sm:py-1">Classification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-teal-50 hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">80-100%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">A+</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">4.00</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Outstanding</td>
                </tr>
                <tr className="bg-white hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">75-79%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">A</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">3.75</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Excellent</td>
                </tr>
                <tr className="bg-teal-50 hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">70-74%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">A-</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">3.50</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Very Good</td>
                </tr>
                <tr className="bg-white hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">65-69%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">B+</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">3.25</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Good</td>
                </tr>
                <tr className="bg-teal-50 hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">60-64%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">B</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">3.00</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Satisfactory</td>
                </tr>
                <tr className="bg-white hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">55-59%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">B-</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">2.75</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Above Average</td>
                </tr>
                <tr className="bg-teal-50 hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">50-54%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">C+</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">2.50</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Average</td>
                </tr>
                <tr className="bg-white hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">45-49%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">C</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">2.25</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Below Average</td>
                </tr>
                <tr className="bg-teal-50 hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">40-44%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">D</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">2.00</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Pass</td>
                </tr>
                <tr className="bg-white hover:bg-teal-100 transition">
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">00-39%</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200 font-medium">F</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">0.00</td>
                  <td className="px-1 sm:px-2 py-0.5 sm:py-1 border border-teal-200">Fail</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs mt-1 text-orange-500 text-center">Effective from Summer Semester 2007</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;