import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Skeleton } from './Skeleton';

// Lazy load all components
const Home = lazy(() => import('../app/Home'));
const Login = lazy(() => import('../app/Login'));
const Result = lazy(() => import('../app/Result'));
const Notices = lazy(() => import('../app/Notices'));
const CertificateVerify = lazy(() => import('../app/CertificateVerify'));
const Internship = lazy(() => import('../app/Internship'));
const Hall = lazy(() => import('../app/Hall'));
const StudentApplication = lazy(() => import('../app/StudentApplication'));
const Calendar = lazy(() => import('../app/Calendar'));
const Library = lazy(() => import('../app/Library'));
const SkillJobs = lazy(() => import('../app/SkillJobs'));
const Dashboard = lazy(() => import('../app/Dashboard'));
const Profile = lazy(() => import('../app/Profile'));
const ProfileUpdate = lazy(() => import('../app/ProfileUpdate'));
const PasswordChange = lazy(() => import('../app/PasswordChange'));
const PaymentLedger = lazy(() => import('../app/PaymentLedger'));
const PaymentScheme = lazy(() => import('../app/PaymentScheme'));
const RegistrationExamClearance = lazy(() => import('../app/RegistrationExamClearance'));
const RegisteredCourse = lazy(() => import('../app/RegisteredCourse'));
const LiveResult = lazy(() => import('../app/LiveResult'));
const TeachingEvaluation = lazy(() => import('../app/TeachingEvaluation'));
const AlumniProfessional = lazy(() => import('../app/AlumniProfessional'));
const ConvocationApply = lazy(() => import('../app/ConvocationApply'));
const CertificateTranscriptApply = lazy(() => import('../app/CertificateTranscriptApply'));
const OnlineExam = lazy(() => import('../app/OnlineExam'));
const Laptop = lazy(() => import('../app/Laptop'));
const Career = lazy(() => import('../app/Career'));

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
    <div className="w-full">
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