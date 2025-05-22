"use client";

import React from 'react';
import PageTitle from '@/components/PageTitle';
import { useAuth } from '@/contexts/AuthContext';
import { Award } from 'lucide-react';
import { ComingSoonCard } from '@/components/coming-soon/coming-soon-card';


const AlumniCardApplyComponent: React.FC = () => {
  const { user } = useAuth();


  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="w-full">
        <PageTitle
          title={"Alumni Card Apply"}
          icon={<Award />}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
        <ComingSoonCard
          title="Alumni Card Application"
          description="We're working on making it easier for our alumni to apply for their alumni cards. Stay tuned for updates!"
          expectedLaunch="Q3 2025"
        />
      </div>
    </div>
  );
};

const   AlumniCardApplyPage = () => {
  return <AlumniCardApplyComponent />;
};

export default AlumniCardApplyPage;
