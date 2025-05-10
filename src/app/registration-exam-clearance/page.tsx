'use client';

import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import type { SemesterExamClearance } from '@/services/proxy-api';
import SemesterExamClearanceTab from '@/components/exam/SemesterExamClearanceTab';
import { examService } from '@/services/proxy-api';
import { ClipboardList } from 'lucide-react';

const RegistrationExamClearance: React.FC = () => {
  const [data, setData] = useState<SemesterExamClearance[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    examService.getSemesterExamClearance()
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch(() => {
        if (mounted) setData([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full">
        <PageTitle 
          title={"Registration/Exam Clearance"}
          icon= { <ClipboardList />}
        />
      </div>
      <div className="p-3 sm:p-5 mt-6 flex justify-center w-full">
        <div className="max-w-5xl w-full">
          <SemesterExamClearanceTab data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default RegistrationExamClearance;
