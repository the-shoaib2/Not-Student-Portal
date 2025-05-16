import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, ArrowRight as ArrowRightIcon, Edit, Car } from 'lucide-react';
import Base64ImageCard from '@/components/ImageView';
import { Card, CardContent,CardTitle, CardHeader, CardFooter } from '@/components/ui/card';



const NoticCard = () => {



  return (
    <Card className="flex flex-col items-center space-y-2">
      <div className="relative w-32 h-40 md:w-40 md:h-48 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-lg group">

      </div>
    </Card>
  );
};

export default NoticCard;
