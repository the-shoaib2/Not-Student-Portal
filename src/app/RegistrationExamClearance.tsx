import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import SemesterExamClearanceTab, { SemesterExamClearance } from '../components/profile/SemesterExamClearanceTab';
import { examService } from '../services/api';

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
          title="Registration/Exam Clearance" 
          icon="ClipboardList"
          //  subtitle="Check your semester-wise clearance status"
        />
      </div>
      <div className="mt-6">
        <SemesterExamClearanceTab data={data} loading={loading} />
      </div>
    </div>
  );
};

export default RegistrationExamClearance;
