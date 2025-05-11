"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Camera, ArrowRight as ArrowRightIcon, Edit } from 'lucide-react';
import { StudentInfo } from '@/services/proxy-api';
import { PhotographInfo } from '@/services/proxy-api';
import Base64ImageCard from '@/components/ImageView';

interface ProfileCardProps {
  studentInfo?: StudentInfo | null;
  photograph?: PhotographInfo | null;
  loading?: {
    photograph: boolean;
  };
  useBase64Card?: boolean;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  studentInfo, 
  photograph, 
  loading = { photograph: false },
  useBase64Card = false,
  className = ''
}) => {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push('/profile-update');
  };

  const getBase64Data = () => {
    if (!photograph?.photoUrl) return { base64: '', format: 'jpeg' };
    
    // Extract base64 and format from data URL
    const match = photograph.photoUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (match) {
      return { base64: match[2], format: match[1] };
    }

    return { base64: '', format: 'jpeg' }; 
  };

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className="relative w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 lg:w-36 lg:h-44 xl:w-40 xl:h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg group transition-all duration-300">
        {loading.photograph ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : photograph?.photoUrl ? (
          useBase64Card ? (
            <Base64ImageCard 
              base64Data={getBase64Data().base64} 
              format={getBase64Data().format} 
            />
          ) : (
            <Image 
              src={photograph.photoUrl}
              alt={studentInfo?.studentName || 'Student Photo'} 
              width={200}
              height={200}
              className="w-full h-full object-cover transition-all duration-300"
              crossOrigin="anonymous"
              loading="lazy"
            />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 space-y-2 transition-all duration-300">
            <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 transition-all duration-300" />
            <span className="text-sm sm:text-base">No Photo</span>
          </div>
        )}
      </div>
      <Button 
        variant="default" 
        size="sm" 
        className="bg-teal-600 hover:bg-teal-800 text-white group flex items-center justify-center w-full max-w-[140px] mx-auto relative transition-all duration-300"
        onClick={handleEditProfile}
      >
        <span className="absolute left-4 transition-all duration-300 group-hover:translate-x-1">
          <Edit className="h-4 w-4 group-hover:opacity-0 transition-opacity duration-300 inline-block mr-2" />
          Edit Profile
        </span>
        <ArrowRightIcon className="absolute right-4 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default ProfileCard;
