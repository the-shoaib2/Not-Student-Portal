import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { profileService, EducationInfo } from '../../services/api';

const EducationListTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [education, setEducation] = useState<EducationInfo[]>([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await profileService.getEducationList();
        setEducation(data);
      } catch (error) {
        console.error('Error fetching education list:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education List</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {education.map((edu, idx) => (
            <li key={idx}>{edu.degree} - {edu.institute} ({edu.passingYear})</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EducationListTab;