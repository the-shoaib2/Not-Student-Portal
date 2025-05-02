import React, { useState } from 'react';

const Result: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [semester, setSemester] = useState('');

  return (
    <div className="bg-gray-100 min-h-screen">
     
      {/* Page Title */}
      <div className="border-b border-gray-300 py-4 text-center bg-white">
        <h1 className="text-xl font-medium">Academic Result</h1>
      </div>

      {/* Form Section */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-4">
          <div className="mb-2 md:mb-0">
            <label htmlFor="studentId" className="block text-red-500 mb-1">Student Id *</label>
            <input 
              type="text" 
              id="studentId" 
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500 w-64"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          <div className="mb-2 md:mb-0">
            <label htmlFor="semester" className="block text-red-500 mb-1">Select Semester *</label>
            <div className="relative">
              <select 
                id="semester" 
                className="border-b border-gray-400 focus:outline-none focus:border-blue-500 w-64 appearance-none pr-8"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="">Select a semester</option>
                <option value="Spring 2023">Spring 2023</option>
                <option value="Fall 2022">Fall 2022</option>
                <option value="Summer 2022">Summer 2022</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            SHOW RESULT
          </button>
        </div>

        <div className="flex items-center mb-4">
          <p className="text-pink-600 text-sm">
            Now you can get semester result through SMS. For getting Semester Result through SMS please click here to read
          </p>
          <button className="bg-pink-500 text-white text-xs px-3 py-1 ml-2 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            INSTRUCTION
          </button>
        </div>

        {/* Student Info and UGC Grading System */}
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-medium mb-4">Student Info</h2>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Program</span>
                </div>
                <div>
                  <span className="text-gray-600">Name of Student</span>
                </div>
                <div>
                  <span className="text-gray-600">Student Id</span>
                </div>
                <div>
                  <span className="text-gray-600">Enrollment</span>
                </div>
                <div>
                  <span className="text-gray-600">Batch</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">UGC Uniform Grading System</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="bg-teal-500 text-white px-2 py-1 text-sm">Marks</th>
                      <th className="bg-teal-500 text-white px-2 py-1 text-sm">Grade</th>
                      <th className="bg-teal-500 text-white px-2 py-1 text-sm">Grade Point</th>
                      <th className="bg-teal-500 text-white px-2 py-1 text-sm">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-teal-50">
                      <td className="px-2 py-1 border border-teal-200">80-100%</td>
                      <td className="px-2 py-1 border border-teal-200">A+</td>
                      <td className="px-2 py-1 border border-teal-200">4.00</td>
                      <td className="px-2 py-1 border border-teal-200">Outstanding</td>
                    </tr>
                    <tr className="bg-teal-100">
                      <td className="px-2 py-1 border border-teal-200">75-79%</td>
                      <td className="px-2 py-1 border border-teal-200">A</td>
                      <td className="px-2 py-1 border border-teal-200">3.75</td>
                      <td className="px-2 py-1 border border-teal-200">Excellent</td>
                    </tr>
                    <tr className="bg-teal-50">
                      <td className="px-2 py-1 border border-teal-200">70-74%</td>
                      <td className="px-2 py-1 border border-teal-200">A-</td>
                      <td className="px-2 py-1 border border-teal-200">3.50</td>
                      <td className="px-2 py-1 border border-teal-200">Very Good</td>
                    </tr>
                    <tr className="bg-teal-100">
                      <td className="px-2 py-1 border border-teal-200">65-69%</td>
                      <td className="px-2 py-1 border border-teal-200">B+</td>
                      <td className="px-2 py-1 border border-teal-200">3.25</td>
                      <td className="px-2 py-1 border border-teal-200">Good</td>
                    </tr>
                    <tr className="bg-teal-50">
                      <td className="px-2 py-1 border border-teal-200">60-64%</td>
                      <td className="px-2 py-1 border border-teal-200">B</td>
                      <td className="px-2 py-1 border border-teal-200">3.00</td>
                      <td className="px-2 py-1 border border-teal-200">Satisfactory</td>
                    </tr>
                    <tr className="bg-teal-100">
                      <td className="px-2 py-1 border border-teal-200">55-59%</td>
                      <td className="px-2 py-1 border border-teal-200">B-</td>
                      <td className="px-2 py-1 border border-teal-200">2.75</td>
                      <td className="px-2 py-1 border border-teal-200">Above Average</td>
                    </tr>
                    <tr className="bg-teal-50">
                      <td className="px-2 py-1 border border-teal-200">50-54%</td>
                      <td className="px-2 py-1 border border-teal-200">C+</td>
                      <td className="px-2 py-1 border border-teal-200">2.50</td>
                      <td className="px-2 py-1 border border-teal-200">Average</td>
                    </tr>
                    <tr className="bg-teal-100">
                      <td className="px-2 py-1 border border-teal-200">45-49%</td>
                      <td className="px-2 py-1 border border-teal-200">C</td>
                      <td className="px-2 py-1 border border-teal-200">2.25</td>
                      <td className="px-2 py-1 border border-teal-200">Below Average</td>
                    </tr>
                    <tr className="bg-teal-50">
                      <td className="px-2 py-1 border border-teal-200">40-44%</td>
                      <td className="px-2 py-1 border border-teal-200">D</td>
                      <td className="px-2 py-1 border border-teal-200">2.00</td>
                      <td className="px-2 py-1 border border-teal-200">Pass</td>
                    </tr>
                    <tr className="bg-teal-100">
                      <td className="px-2 py-1 border border-teal-200">00-39%</td>
                      <td className="px-2 py-1 border border-teal-200">F</td>
                      <td className="px-2 py-1 border border-teal-200">0.00</td>
                      <td className="px-2 py-1 border border-teal-200">Fail</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs mt-1 text-orange-500">Effective from Summer Semester 2007</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Result Table */}
        <div className="bg-white border border-gray-300 p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Academic Result of :</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full mb-4">
              <thead>
                <tr>
                  <th className="bg-teal-500 text-white px-4 py-2 text-left">Course Code</th>
                  <th className="bg-teal-500 text-white px-4 py-2 text-left">Course Title</th>
                  <th className="bg-teal-500 text-white px-4 py-2 text-left">Credit</th>
                  <th className="bg-teal-500 text-white px-4 py-2 text-left">Grade</th>
                  <th className="bg-teal-500 text-white px-4 py-2 text-left">Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {/* Course rows will be populated dynamically */}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between text-purple-700 font-medium">
            <p>Total Credit Requirement: </p>
            <p>Total Credits Taken : 0</p>
            <p>SGPA : </p>
          </div>
        </div>

        {/* Teaching Evaluation Note */}
        <div className="mb-4">
          <p className="text-gray-800">
            <span className="font-bold">N.B. :</span> If you see Teaching Evaluation Pending in any course. Please complete 
            <a href="#" className="text-orange-600 hover:underline">Teaching Evaluation.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;