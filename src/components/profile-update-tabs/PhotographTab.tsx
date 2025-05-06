import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { profileService, PhotographInfo } from '../../services/api';

const PhotographTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState<PhotographInfo | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const data = await profileService.getPhotograph();
        setPhoto(data);
      } catch (error) {
        console.error('Error fetching photograph:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, []);

  // Add upload logic as needed

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photograph</CardTitle>
      </CardHeader>
      <CardContent>
        {photo?.photoUrl ? (
          <img src={photo.photoUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
        ) : (
          <div>No photo available</div>
        )}
        {/* Add upload form here */}
        <Button className="mt-4">Upload New Photo</Button>
      </CardContent>
    </Card>
  );
};

export default PhotographTab;
