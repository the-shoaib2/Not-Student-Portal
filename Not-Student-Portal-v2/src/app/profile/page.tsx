'use client';

import { useEffect, useState } from 'react';
import { profileService } from '@/services/api';
import type { StudentInfo, PresentAddressInfo, PermanentAddressInfo, EducationInfo } from '@/services/api';
import PageTitle from '@/components/PageTitle';
import ImageView from '@/components/ImageView';

export default function ProfilePage() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [presentAddress, setPresentAddress] = useState<PresentAddressInfo | null>(null);
  const [permanentAddress, setPermanentAddress] = useState<PermanentAddressInfo | null>(null);
  const [educationList, setEducationList] = useState<EducationInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [info, present, permanent, education] = await Promise.all([
          profileService.getStudentInfo(),
          profileService.getPresentAddress(),
          profileService.getPermanentAddress(),
          profileService.getEducationList()
        ]);

        setStudentInfo(info);
        setPresentAddress(present);
        setPermanentAddress(permanent);
        setEducationList(education);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!studentInfo) {
    return <div>No profile data found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Student Profile" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Photo */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <ImageView
              base64Data={studentInfo.photoUrl}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Basic Information */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <p className="text-gray-600">Semester</p>
                <p className="font-medium">{studentInfo.semesterName}</p>
              </div>
              <div>
                <p className="text-gray-600">CGPA</p>
                <p className="font-medium">{studentInfo.cgpa || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{studentInfo.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Mobile</p>
                <p className="font-medium">{studentInfo.mobile || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Present Address</h3>
                <div className="space-y-2">
                  <p>{studentInfo.presentHouse}</p>
                  <p>{studentInfo.presentStreet}</p>
                  <p>{studentInfo.presentCity}</p>
                  <p>{presentAddress?.presentDistrictName}</p>
                  <p>{presentAddress?.presentDivisionName}</p>
                  <p>{presentAddress?.presentCountryName}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Permanent Address</h3>
                <div className="space-y-2">
                  <p>{studentInfo.permanentHouse}</p>
                  <p>{studentInfo.permanentStreet}</p>
                  <p>{studentInfo.permanentCity}</p>
                  <p>{permanentAddress?.permanentDistrictName}</p>
                  <p>{permanentAddress?.permanentDivisionName}</p>
                  <p>{permanentAddress?.permanentCountryName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education History */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Education History</h2>
            <div className="space-y-4">
              {educationList.map((education) => (
                <div key={education.id} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-medium">{education.institute}</h3>
                  <p>{education.degree} in {education.major}</p>
                  <p>Result: {education.result} (Scale: {education.scale})</p>
                  <p>Passing Year: {education.passingYear}</p>
                  <p>Duration: {education.duration}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 