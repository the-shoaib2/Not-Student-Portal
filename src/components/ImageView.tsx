"use client"
import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface Base64ImageCardProps {
  base64Data?: string; // Just the base64 string, no prefix
  format?: string;     // e.g., 'png', 'jpeg', 'jpg', 'heic'
  loading?: boolean;   // Indicates if the image is still loading
  className?: string; // Additional CSS classes
}

const Base64ImageCard: React.FC<Base64ImageCardProps> = ({ 
  base64Data, 
  format = 'jpeg', 
  loading = false,
  className = ''
}) => {
  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-200 w-24 h-24 md:w-28 md:h-28 rounded-lg flex-shrink-0 ${className}`}></div>
    );
  }

  if (!base64Data) {
    return (
      <div className={`bg-gray-100 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg flex items-center justify-center text-gray-400 ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-sm sm:text-base">No Image</span>
        </div>
      </div>
    );
  }

  const dataUri = `data:image/${format};base64,${base64Data}`;

  return (
    <Card className={`max-w-sm mx-auto rounded-2xl shadow-md transition-all duration-300 ${className}`}>
      <CardContent className="flex items-center justify-center">
        <Image
          src={dataUri}
          alt="Base64 Preview"
          width={256}
          height={256}
          className="object-contain max-h-64 w-full"
        />
      </CardContent>
    </Card>
  );
};

export default Base64ImageCard;
