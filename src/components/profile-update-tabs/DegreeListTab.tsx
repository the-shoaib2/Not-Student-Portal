import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { profileService, EducationInfo } from '../../services/api';

const DegreeListTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [degrees, setDegrees] = useState<EducationInfo[]>([]);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const data = await profileService.getEducationList();
        setDegrees(data);
      } catch (error) {
        console.error('Error fetching degree list:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDegrees();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Degree List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {degrees.map((deg, idx) => (
            <li key={idx}>{deg.degree} - {deg.institute} ({deg.passingYear})</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default DegreeListTab;