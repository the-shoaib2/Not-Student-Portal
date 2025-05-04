import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Edit, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card';
import { StudentInfo } from '../../services/api';
import { PhotographInfo } from '../../services/api';
import Base64ImageCard from '../ImageView';

interface ProfilePictureCardProps {
  studentInfo?: StudentInfo | null;
  photograph?: PhotographInfo | null;
  loading?: {
    photograph: boolean;
  };
  useBase64Card?: boolean;
}

const ProfilePictureCard: React.FC<ProfilePictureCardProps> = ({ 
  studentInfo, 
  photograph, 
  loading = { photograph: false },
  useBase64Card = false
}) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile-update');
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
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="p-2 sm:p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b flex justify-center items-center">
        <h2 className="text-base font-semibold text-teal-800">Profile Picture</h2>
      </CardHeader>
      <CardContent className="p-2 sm:p-3 flex justify-center items-center">
        <div className="w-32 h-40 md:w-40 md:h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg relative group">
          {loading.photograph ? (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          ) : photograph?.photoUrl ? (
            useBase64Card ? (
              <Base64ImageCard 
                base64Data={getBase64Data().base64} 
                format={getBase64Data().format} 
              />
            ) : (
              <img 
                src={photograph.photoUrl}
                alt={studentInfo?.studentName || 'Student Photo'} 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                loading="lazy"
                decoding="async"
              />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-500 space-y-2">
              <Camera className="w-12 h-12 text-gray-400" />
              <span>No Photo</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4">
        <Button 
          variant="ghost" 
          className="text-gray-700 hover:bg-gray-100"
          onClick={handleEditProfile}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfilePictureCard;
