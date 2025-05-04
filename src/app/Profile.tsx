import React, { useState, useEffect } from 'react';
import { profileService, StudentInfo, PresentAddressInfo, PermanentAddressInfo, PhotographInfo, EducationInfo } from '../services/api';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';

// Import components directly
import { PersonalInfoTab } from './ProfileTabs/PersonalInfoTab';
import { GuardianInfoTab } from './ProfileTabs/GuardianInfoTab';
import { PresentAddressTab } from './ProfileTabs/PresentAddressTab';
import { PermanentAddressTab } from './ProfileTabs/PermanentAddressTab';
import { EducationTab } from './ProfileTabs/EducationTab';

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
  
  // We'll remove this duplicate definition since it's defined below
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Add debugging to see what data is being passed to the components
  useEffect(() => {
    if (studentInfo) {
      console.log('Profile component studentInfo state:', studentInfo);
    }
    if (photograph) {
      console.log('Profile component photograph state:', photograph);
    }
    if (presentAddress) {
      console.log('Profile component presentAddress state:', presentAddress);
    }
    if (permanentAddress) {
      console.log('Profile component permanentAddress state:', permanentAddress);
    }
  }, [studentInfo, photograph, presentAddress, permanentAddress]);
  
  // Force loading state to false after 3 seconds to ensure data is displayed
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
      console.log('Forced loading state to false after timeout');
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
          console.log('Student info received:', studentData);
          setStudentInfo(studentData);
        } catch (error: any) {
          console.error('Error fetching student info:', error);
          setErrors(prev => ({ ...prev, studentInfo: `Failed to load student information: ${error.message}` }));
        } finally {
          setLoading(prev => ({ ...prev, studentInfo: false }));
        }

        // Fetch photograph
        try {
          const photoData = await profileService.getPhotograph();
          if (photoData && photoData.photoUrl) {
            console.log('Photo data received:', {
              photoUrlLength: photoData.photoUrl.length,
              photoUrlStart: photoData.photoUrl.substring(0, 50) + '...'
            });
            setPhotograph(photoData);
          } else {
            console.error('No valid photograph data available');
            setErrors(prev => ({ ...prev, photograph: 'No valid photograph data available' }));
          }
        } catch (error: any) {
          console.error('Error fetching photograph:', error);
          setErrors(prev => ({ ...prev, photograph: `Failed to load photograph: ${error.message}` }));
        } finally {
          setLoading(prev => ({ ...prev, photograph: false }));
        }

        // Fetch present address
        try {
          const presentAddressData = await profileService.getPresentAddress();
          console.log('Present address received:', presentAddressData);
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
          console.log('Permanent address received:', permanentAddressData);
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
          console.log('Education info received:', educationData);
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

  // Display a full-page error if there are critical errors
  const hasCriticalErrors = errors.studentInfo && Object.keys(errors).length > 2;
  if (hasCriticalErrors) {
    return (
      <div className="p-6 text-red-500 text-center">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{errors.studentInfo}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 max-w-6xl mx-auto  from-gray-50 to-white min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Profile</h1>
        <p className="text-gray-600">View and manage your academic information</p>
      </div>
      {/* Profile Header */}
      <Card className="mb-8 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 sm:p-6 text-white">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="inline-block w-2 h-8 bg-white rounded-full mr-2"></span>
            Profile Overview
          </h2>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
            <div className="w-32 h-40 md:w-40 md:h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg relative group">
              {/* Photo container with 4:3 aspect ratio */}
              {loading.photograph ? (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              ) : photograph?.photoUrl ? (
                <img 
                  src={photograph.photoUrl}
                  alt={studentInfo?.studentName || 'Student Photo'} 
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  loading="lazy" /* Add lazy loading */
                  decoding="async" /* Optimize image decoding */
                  onError={(e) => {
                    // Extensive logging for image loading
                    console.group('Image Loading Error');
                    console.log('Original photoUrl:', photograph.photoUrl);
                    console.log('Original photoData:', photograph.photoData);
                    console.log('Current event target:', e.currentTarget);
                    
                    // Try with a different approach - create a new Image and set source
                    try {
                      const imgElement = e.currentTarget;
                      if (!imgElement) {
                        console.error('Image element not found');
                        console.groupEnd();
                        return;
                      }

                      const img = new Image();
                      img.onload = () => {
                        console.log('Image loaded via alternative method');
                        console.log('Alternative image src:', img.src);
                        imgElement.src = img.src;
                        console.groupEnd();
                      };
                      img.onerror = () => {
                        console.log('Alternative method also failed, using default');
                        imgElement.src = '/default-avatar.png';
                        console.groupEnd();
                      };
                      
                      // Validate photoData before setting
                      const photoDataToUse = photograph.photoData || '/default-avatar.png';
                      console.log('Attempting to load:', photoDataToUse);
                      img.src = photoDataToUse;
                    } catch (err) {
                      console.error('Error in alternative loading:', err);
                      const imgElement = e.currentTarget;
                      if (imgElement) {
                        imgElement.src = '/default-avatar.png';
                      }
                      console.groupEnd();
                    }
                  }}
                />
              ) : (
                <img 
                  src="/default-avatar.png"
                  alt="Default avatar" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
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
      
      {/* Error messages */}
      {Object.keys(errors).length > 0 && (
        <Card className="mb-8 border-2 border-red-200 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="bg-red-50 text-red-700 p-4">
            <h3 className="font-semibold mb-2">There were some errors loading your profile data:</h3>
            <ul className="list-disc pl-5">
              {Object.entries(errors).map(([key, message]) => (
                <li key={key}>{message}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* All profile information */}
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="inline-block w-1 h-6 bg-blue-600 rounded-full"></span>
            Profile Information
          </h2>
        </div>
        
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
              presentAddress={presentAddress || { presentDistrictName: 'Not Available', presentDivisionName: 'Not Available', presentCountryName: 'Not Available' }}
              loading={loading.studentInfo || loading.presentAddress} 
            />
            
            <PermanentAddressTab 
              studentInfo={studentInfo} 
              permanentAddress={permanentAddress || { permanentDistrictName: 'Not Available', permanentDivisionName: 'Not Available', permanentCountryName: 'Not Available' }}
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
