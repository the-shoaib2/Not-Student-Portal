"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTitle from '@/components/PageTitle';
import { UserCircle2, BadgeAlert } from 'lucide-react'; // Assuming you have lucide-react for icons
import StudentIdCardFront from '@/components/student-id/student-id-card-front';
import StudentIdCardBack from '@/components/student-id/student-id-card-back';
  
const StudentIdCardPage: React.FC = () => {
  // Centralized student data
  const studentData = {
    // Front Card Data
    name: 'SHEIKH WASTI AHMED',
    program: 'B.A. in Eng',
    studentId: '024242000216134',
    regNo: '242-10-134',
    issueDate: '09-Jun-2024',
    expireDate: '30-Jun-2028',
    photoUrl: '/placeholder.svg?height=128&width=112', // Replace with actual or dynamic URL
    phone: '01307677930',
    bloodGroup: 'B-',
    // Back Card Data
    universityName: 'Daffodil International University',
    returnAddressLine1: 'Daffodil Smart City (DSC), Birulia,',
    returnAddressLine2: 'Savar, Dhaka-1216',
    contactPhone1: '+88 02 224441833-34',
    contactPhone2: '+88 09617901212',
    website: 'www.daffodilvarsity.edu.bd',
    email: 'info@daffodilvarsity.edu.bd',
  };

  return (
    <div className="w-full">
      <PageTitle title="Student ID Card" icon={<BadgeAlert />} />

     {/* Main Content */}
     <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6"> 
     <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Front Side */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Front Side</h2>
            <StudentIdCardFront 
              name={studentData.name}
              program={studentData.program}
              studentId={studentData.studentId}
              regNo={studentData.regNo}
              issueDate={studentData.issueDate}
              expireDate={studentData.expireDate}
              photoUrl={studentData.photoUrl}
              phone={studentData.phone}
              bloodGroup={studentData.bloodGroup}
            />
          </div>

          {/* Back Side */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Back Side</h2>
            <StudentIdCardBack 
              universityName={studentData.universityName}
              returnAddressLine1={studentData.returnAddressLine1}
              returnAddressLine2={studentData.returnAddressLine2}
              contactPhone1={studentData.contactPhone1}
              contactPhone2={studentData.contactPhone2}
              website={studentData.website}
              email={studentData.email}
            />
          </div>
        </div>



     </div>
    </div>
  );
};

export default StudentIdCardPage;
