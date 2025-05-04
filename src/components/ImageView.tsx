import React from "react";
import { Card, CardContent } from "../components/ui/card";

interface Base64ImageCardProps {
  base64Data: string; // Just the base64 string, no prefix
  format: string;     // e.g., 'png', 'jpeg', 'jpg', 'heic'
}

const Base64ImageCard: React.FC<Base64ImageCardProps> = ({ base64Data, format }) => {
  const dataUri = `data:image/${format};base64,${base64Data}`;

  return (
    <Card className="max-w-sm mx-auto rounded-2xl shadow-md p-4">
      <CardContent className="flex items-center justify-center">
        <img
          src={dataUri}
          alt="Base64 Preview"
          className="object-contain max-h-64 w-full"
        />
      </CardContent>
    </Card>
  );
};

export default Base64ImageCard;
