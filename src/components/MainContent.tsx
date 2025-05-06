import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Skeleton } from './Skeleton';

// Lazy load all components
const Home = lazy(() => import('../app/Home.tsx'));
const Login = lazy(() => import('../app/Login.tsx'));
const Result = lazy(() => import('../app/Result.tsx'));
const Notices = lazy(() => import('../app/Notices.tsx'));
const CertificateVerify = lazy(() => import('../app/CertificateVerify.tsx'));
const Internship = lazy(() => import('../app/Internship.tsx'));
const Hall = lazy(() => import('../app/Hall.tsx'));
const StudentApplication = lazy(() => import('../app/StudentApplication.tsx'));
const Calendar = lazy(() => import('../app/Calendar.tsx'));
const Library = lazy(() => import('../app/Library.tsx'));
const SkillJobs = lazy(() => import('../app/SkillJobs.tsx'));
const Dashboard = lazy(() => import('../app/Dashboard.tsx'));
const Profile = lazy(() => import('../app/Profile.tsx'));
const ProfileUpdate = lazy(() => import('../app/ProfileUpdate.tsx'));
const PasswordChange = lazy(() => import('../app/PasswordChange.tsx'));
const PaymentLedger = lazy(() => import('../app/PaymentLedger.tsx'));
const PaymentScheme = lazy(() => import('../app/PaymentScheme.tsx'));
const RegistrationExamClearance = lazy(() => import('../app/RegistrationExamClearance.tsx'));
const RegisteredCourse = lazy(() => import('../app/RegisteredCourse.tsx'));
const LiveResult = lazy(() => import('../app/LiveResult.tsx'));
const TeachingEvaluation = lazy(() => import('../app/TeachingEvaluation.tsx'));
const AlumniProfessional = lazy(() => import('../app/AlumniProfessional.tsx'));
const ConvocationApply = lazy(() => import('../app/ConvocationApply.tsx'));
const CertificateTranscriptApply = lazy(() => import('../app/CertificateTranscriptApply.tsx'));
const OnlineExam = lazy(() => import('../app/OnlineExam.tsx'));
const Laptop = lazy(() => import('../app/Laptop.tsx'));
const Career = lazy(() => import('../app/Career.tsx'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return !isAuthenticated ? <>{children}</> : <Navigate to={location.state?.from?.pathname || '/'} replace />;
};

// Wrap component with Suspense for lazy loading
const LazyComponent = ({ component: Component }: { component: React.ComponentType }) => (
  <Suspense fallback={<Skeleton />}>
    <Component />
  </Suspense>
);

const MainContent: React.FC = () => {
  return (
    <div className="flex-grow">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LazyComponent component={Home} />} />
        <Route path="/login" element={<PublicRoute><LazyComponent component={Login} /></PublicRoute>} />
        <Route path="/result" element={<LazyComponent component={Result} />} />
        <Route path="/notices" element={<LazyComponent component={Notices} />} />
        <Route path="/certificate-verify" element={<LazyComponent component={CertificateVerify} />} />
        <Route path="/internship" element={<LazyComponent component={Internship} />} />
        <Route path="/hall" element={<LazyComponent component={Hall} />} />
        <Route path="/student-application" element={<LazyComponent component={StudentApplication} />} />
        <Route path="/calendar" element={<LazyComponent component={Calendar} />} />
        <Route path="/library" element={<LazyComponent component={Library} />} />
        <Route path="/skill-jobs" element={<LazyComponent component={SkillJobs} />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><LazyComponent component={Dashboard} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><LazyComponent component={Profile} /></ProtectedRoute>} />
        <Route path="/profile-update" element={<ProtectedRoute><LazyComponent component={ProfileUpdate} /></ProtectedRoute>} />
        <Route path="/password-change" element={<ProtectedRoute><LazyComponent component={PasswordChange} /></ProtectedRoute>} />
        <Route path="/payment-ledger" element={<ProtectedRoute><LazyComponent component={PaymentLedger} /></ProtectedRoute>} />
        <Route path="/payment-scheme" element={<ProtectedRoute><LazyComponent component={PaymentScheme} /></ProtectedRoute>} />
        <Route path="/registration-exam-clearance" element={<ProtectedRoute><LazyComponent component={RegistrationExamClearance} /></ProtectedRoute>} />
        <Route path="/registered-course" element={<ProtectedRoute><LazyComponent component={RegisteredCourse} /></ProtectedRoute>} />
        <Route path="/live-result" element={<ProtectedRoute><LazyComponent component={LiveResult} /></ProtectedRoute>} />
        <Route path="/teaching-evaluation" element={<ProtectedRoute><LazyComponent component={TeachingEvaluation} /></ProtectedRoute>} />
        <Route path="/alumni-professional" element={<ProtectedRoute><LazyComponent component={AlumniProfessional} /></ProtectedRoute>} />
        <Route path="/convocation-apply" element={<ProtectedRoute><LazyComponent component={ConvocationApply} /></ProtectedRoute>} />
        <Route path="/certificate-transcript-apply" element={<ProtectedRoute><LazyComponent component={CertificateTranscriptApply} /></ProtectedRoute>} />
        <Route path="/online-exam" element={<ProtectedRoute><LazyComponent component={OnlineExam} /></ProtectedRoute>} />
        <Route path="/laptop" element={<ProtectedRoute><LazyComponent component={Laptop} /></ProtectedRoute>} />
        <Route path="/career" element={<ProtectedRoute><LazyComponent component={Career} /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default MainContent;