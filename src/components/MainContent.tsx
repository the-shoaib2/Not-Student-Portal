import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Home from '../app/Home.tsx';
import Login from '../app/Login.tsx';
import Result from '../app/Result.tsx';
import Notices from '../app/Notices.tsx';
import CertificateVerify from '../app/CertificateVerify.tsx';
import Internship from '../app/Internship.tsx';
import Hall from '../app/Hall.tsx';
import StudentApplication from '../app/StudentApplication.tsx';
import Calendar from '../app/Calendar.tsx';
import Library from '../app/Library.tsx';
import SkillJobs from '../app/SkillJobs.tsx';
import Dashboard from '../app/Dashboard.tsx';
import Profile from '../app/Profile.tsx';
import ProfileUpdate from '../app/ProfileUpdate.tsx';
import PasswordChange from '../app/PasswordChange.tsx';
import PaymentLedger from '../app/PaymentLedger.tsx';
import PaymentScheme from '../app/PaymentScheme.tsx';
import RegistrationExamClearance from '../app/RegistrationExamClearance.tsx';
import RegisteredCourse from '../app/RegisteredCourse.tsx';
import LiveResult from '../app/LiveResult.tsx';
import TeachingEvaluation from '../app/TeachingEvaluation.tsx';
import AlumniProfessional from '../app/AlumniProfessional.tsx';
import ConvocationApply from '../app/ConvocationApply.tsx';
import CertificateTranscriptApply from '../app/CertificateTranscriptApply.tsx';
import OnlineExam from '../app/OnlineExam.tsx';
import Laptop from '../app/Laptop.tsx';
import Career from '../app/Career.tsx';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const MainContent: React.FC = () => {
  return (
    <div className="flex-grow">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/result" element={<Result />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/certificate-verify" element={<CertificateVerify />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/hall" element={<Hall />} />
        <Route path="/student-application" element={<StudentApplication />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/library" element={<Library />} />
        <Route path="/skill-jobs" element={<SkillJobs />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile-update" element={<ProtectedRoute><ProfileUpdate /></ProtectedRoute>} />
        <Route path="/password-change" element={<ProtectedRoute><PasswordChange /></ProtectedRoute>} />
        <Route path="/payment-ledger" element={<ProtectedRoute><PaymentLedger /></ProtectedRoute>} />
        <Route path="/payment-scheme" element={<ProtectedRoute><PaymentScheme /></ProtectedRoute>} />
        <Route path="/registration-exam-clearance" element={<ProtectedRoute><RegistrationExamClearance /></ProtectedRoute>} />
        <Route path="/registered-course" element={<ProtectedRoute><RegisteredCourse /></ProtectedRoute>} />
        <Route path="/live-result" element={<ProtectedRoute><LiveResult /></ProtectedRoute>} />
        <Route path="/teaching-evaluation" element={<ProtectedRoute><TeachingEvaluation /></ProtectedRoute>} />
        <Route path="/alumni-professional" element={<ProtectedRoute><AlumniProfessional /></ProtectedRoute>} />
        <Route path="/convocation-apply" element={<ProtectedRoute><ConvocationApply /></ProtectedRoute>} />
        <Route path="/certificate-transcript-apply" element={<ProtectedRoute><CertificateTranscriptApply /></ProtectedRoute>} />
        <Route path="/online-exam" element={<ProtectedRoute><OnlineExam /></ProtectedRoute>} />
        <Route path="/laptop" element={<ProtectedRoute><Laptop /></ProtectedRoute>} />
        <Route path="/career" element={<ProtectedRoute><Career /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default MainContent;