import React, { useState, useEffect } from 'react';
import { profileService, StudentInfo, PresentAddressInfo, PermanentAddressInfo, PhotographInfo, EducationInfo } from '../services/api';
import { Card, CardContent, CardHeader } from '../components/ui/card';
// Removed unused Button import
import ProfilePictureCard from '../components/profile/ProfilePictureCard';
import PageTitle from '../components/PageTitle';

// Import components directly
import { PersonalInfoTab } from '../components/profile/PersonalInfoTab';
import { GuardianInfoTab } from '../components/profile/GuardianInfoTab';
import { PresentAddressTab } from '../components/profile/PresentAddressTab';
import { PermanentAddressTab } from '../components/profile/PermanentAddressTab';
import { EducationTab } from '../components/profile/EducationTab';

// Skeleton component for profile header
const ProfileHeaderSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-200 rounded-full flex-shrink-0" />
      <div className="space-y-3 flex-grow w-full max-w-md text-center md:text-left">
        <div className="h-7 md:h-8 w-3/4 bg-gray-200 rounded mx-auto md:mx-0" />
        <div className="h-4 md:h-5 w-1/2 bg-gray-200 rounded mx-auto md:mx-0" />
        <div className="h-4 md:h-5 w-2/3 bg-gray-200 rounded mx-auto md:mx-0" />
      </div>
    </div>
  </div>
);

const InfoCardSkeleton = () => (
  <Card className="w-full h-full">
    <CardHeader className="pb-2">
      <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />
    </CardHeader>
    <CardContent className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </CardContent>
  </Card>
);

const ContentSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
    {[...Array(4)].map((_, i) => (
      <InfoCardSkeleton key={i} />
    ))}
  </div>
);

const ProfileComponent: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [photograph, setPhotograph] = useState<PhotographInfo | null>(null);
  const [presentAddress, setPresentAddress] = useState<PresentAddressInfo | null>(null);
  const [permanentAddress, setPermanentAddress] = useState<PermanentAddressInfo | null>(null);
  const [educationInfo, setEducationInfo] = useState<EducationInfo[] | null>(null);
  const [loading, setLoading] = useState({
    studentInfo: true,
    photograph: true,
    educationList: true,
    presentAddress: true,
    permanentAddress: true
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof typeof loading, string>>>({});

  // Log errors for debugging
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.warn('Profile page errors:', errors);
    }
  }, [errors]);

  // This is a fallback in case the API calls don't properly set loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading({
        studentInfo: false,
        photograph: false,
        educationList: false,
        presentAddress: false,
        permanentAddress: false
      });
      // console.log('Forced loading state to false after timeout');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Fetch all profile data
  useEffect(() => {
    // Create a single async function to handle all API calls
    const fetchAllData = async () => {
      try {
        // Fetch student info
        try {
          const studentData = await profileService.getStudentInfo();
          // console.log('Student info received:', studentData);
          setStudentInfo(studentData);
        } catch (error: any) {
          // console.error('Error fetching student info:', error);
          setErrors(prev => ({ ...prev, studentInfo: `Failed to load student information: ${error.message}` }));
        } finally {
          setLoading(prev => ({ ...prev, studentInfo: false }));
        }

        // Fetch photograph
        try {
          const photoData = await profileService.getPhotograph();
          // console.log('Raw photo data received:', photoData);
          // console.log('Photo data type:', typeof photoData);
          // console.log('Photo data keys:', Object.keys(photoData));
          
          // More robust validation
          const isValidPhotoData = photoData && 
            (typeof photoData === 'object') && 
            (photoData.photoUrl || photoData.image);
          
          if (isValidPhotoData) {
            const validPhotoUrl = photoData.photoUrl || 
              (photoData.image ? `data:image/jpeg;base64,${photoData.image}` : '');
            
            // console.log('Processed photo URL:', validPhotoUrl);
            
            if (validPhotoUrl) {
              setPhotograph({ photoUrl: validPhotoUrl, photoData: validPhotoUrl });
            } else {
              console.warn('No valid photo URL could be constructed');
              setErrors(prev => ({ ...prev, photograph: 'Unable to process photograph data' }));
            }
          } else {
            console.warn('Invalid or empty photograph data');
            setErrors(prev => ({ ...prev, photograph: 'No valid photograph data available' }));
          }
        } catch (error: any) {
          console.error('Comprehensive error fetching photograph:', {
            message: error.message,
            name: error.name,
            stack: error.stack,
            responseData: error.response?.data
          });
          setErrors(prev => ({ ...prev, photograph: `Failed to load photograph: ${error.message}` }));
        } finally {
          setLoading(prev => ({ ...prev, photograph: false }));
        }

        // Fetch present address
        try {
          const presentAddressData = await profileService.getPresentAddress();
          // console.log('Present address received:', presentAddressData);
          setPresentAddress(presentAddressData);
        } catch (error: any) {
          console.error('Error fetching present address:', error);
          setErrors(prev => ({ ...prev, presentAddress: `Failed to load present address: ${error.message}` }));
        } finally {
          setLoading(prev => ({ ...prev, presentAddress: false }));
        }

        // Fetch permanent address
        try {
          const permanentAddressData = await profileService.getPermanentAddress();
          // console.log('Permanent address received:', permanentAddressData);
          setPermanentAddress(permanentAddressData);
        } catch (error: any) {
          console.error('Error fetching permanent address:', error);
          setErrors(prev => ({ ...prev, permanentAddress: `Failed to load permanent address: ${error.message}` }));
        } finally {
          setLoading(prev => ({ ...prev, permanentAddress: false }));
        }

        // Fetch education info
        try {
          const educationData = await profileService.getEducationList();
          // console.log('Education info received:', educationData);
          setEducationInfo(educationData);
        } catch (error: any) {
          console.error('Error fetching education info:', error);
          setErrors(prev => ({ ...prev, educationList: `Failed to load education information: ${error.message}` }));
        } finally {
          setLoading(prev => ({ ...prev, educationList: false }));
        }
      } catch (error) {
        console.error('General error in data fetching:', error);
      }
    };

    // Execute the fetch function
    fetchAllData();
  }, []);

  // Check if all data is loading
  const isLoading = loading.studentInfo || loading.photograph || loading.educationList || loading.presentAddress || loading.permanentAddress;



  return (
    <div className="p-3 sm:p-5 max-w-6xl mx-auto  from-gray-50 to-white min-h-screen">
      {/* Page Title */}
      <PageTitle 
        title="Student Profile" 
        icon="UserCircle2" 
        subtitle="View and manage your academic information" 
      />
      {/* Profile Header */}
      <Card className="mb-8 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-6 text-white">
          <h2 className="text-xl sm:text-xl font-bold flex gap-2">
            Profile Overview
          </h2>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
            <ProfilePictureCard 
              studentInfo={studentInfo} 
              photograph={photograph}
              loading={loading}
            />
            <div className="flex-grow text-center md:text-left">
              {loading.studentInfo ? (
                <ProfileHeaderSkeleton />
              ) : (
                <>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">{studentInfo?.studentName}</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">Student ID: <span className="font-semibold text-gray-800">{studentInfo?.studentId}</span></p>
                  <p className="text-sm sm:text-base text-gray-600">Program: <span className="font-semibold text-gray-800">{studentInfo?.programName}</span></p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      
      
      {/* All profile information */}
      <div className="space-y-8 animate-fadeIn">
        {/* <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Profile Information
          </h2>
        </div> */}
        
        {/* Personal Information Section */}
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-in fade-in-50 duration-500">
            <PersonalInfoTab 
              studentInfo={studentInfo} 
              photograph={photograph} 
              loading={loading.studentInfo || loading.photograph} 
            />
            
            <GuardianInfoTab 
              studentInfo={studentInfo} 
              loading={loading.studentInfo} 
            />
            
            <PresentAddressTab 
              studentInfo={studentInfo} 
              presentAddress={presentAddress} 
              loading={loading.studentInfo || loading.presentAddress} 
            />
            
            <PermanentAddressTab 
              studentInfo={studentInfo} 
              permanentAddress={permanentAddress} 
              loading={loading.studentInfo || loading.permanentAddress} 
            />

            <EducationTab
              studentInfo={studentInfo}
              educationInfo={educationInfo}
              loading={loading.studentInfo || loading.educationList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Export both as default (for lazy loading) and named export (for direct imports)
export const Profile = ProfileComponent;
export default ProfileComponent;
