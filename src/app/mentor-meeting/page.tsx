"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/contexts/AuthContext';
import { Users } from 'lucide-react';
import { ComingSoonCard } from '@/components/coming-soon/coming-soon-card';


const MentorMeetingComponent: React.FC = () => {
  const { user } = useAuth();


  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="w-full">
        <PageTitle
          title={"Mentor Meeting"}
          icon={<Users />}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
        <ComingSoonCard
          title="Mentor Meeting Feature"
          description="We're working hard to bring you the best mentor meeting experience."
          expectedLaunch="Q3 2025"
        />
      </div>
    </div>
  );
};

const MentorMeetingPage = () => {
  return <MentorMeetingComponent />;
};

export default MentorMeetingPage;
