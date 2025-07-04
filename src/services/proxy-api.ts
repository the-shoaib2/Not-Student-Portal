import { proxyClient, proxyRequest } from '@/services/proxyUtils';
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';



// Auth Interfaces
export interface LoginCredentials {
  username: string;
  password: string;
  grecaptcha?: string;
}

export interface LoginRequest {
  studentId: string;
  password: string;
  deviceName: string;
}

export interface LoginResponse {
  accessToken: string;
  id: string;
  studentId: string;
  name: string;
  userName: string;
  email: string;
  roles: string[];
  commaSeparatedRoles: string;
  deviceName: string;
  lastLoginTime: string;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  email: string;
  phone: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface FindUserRequest {
  email: string;
}

export interface FindUserResponse {
  userId: string;
  maskedEmail: string;
  maskedPhone: string;
  name: string;
  avatar?: string;
  recoveryMethods: {
    email?: {
      options: ('code' | 'link')[];
    };
    sms?: boolean;
  };
}



// Profile Interfaces
export interface StudentInfo {
  studentId: string;
  fkCampus: string;
  campusName: string;
  studentName: string;
  batchId: string;
  batchNo: number;
  programCredit: number;
  programId: string;
  programName: string;
  progShortName: string;
  programType: string;
  deptShortName: string;
  departmentName: string;
  facultyName: string;
  facShortName: string;
  semesterId: string;
  semesterName: string;
  shift: string;
  completedCredits: string;
  cgpa?: string | number;
  photoUrl?: string;
  // Additional fields from the detailed profile
  photoFile?: string;
  personId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  nickName?: string;
  sex?: string;
  bloodGroup?: string;
  birthDate?: string;
  religion?: string;
  email?: string;
  mobile?: string;
  presentHouse?: string;
  presentStreet?: string;
  presentCity?: string;
  preDisId?: number;
  preDivisionId?: number;
  preCountryCode?: string;
  presentDistrict?: string;
  presentCountry?: string;
  presentZipCode?: string;
  presentPhone?: string;
  permanentHouse?: string;
  permanentStreet?: string;
  permanentCity?: string;
  perDisId?: number;
  permanentDistrict?: string;
  permanentCountry?: string;
  permanentZipCode?: string;
  permanentPhone?: string;
  fatherName?: string;
  motherName?: string;
  maritalStatus?: string;
  passportNo?: string;
  nationality?: string;
  voterId?: string;
  tin?: string;
  notes?: string;
  workPhone?: string;
  placeOfBirth?: string;
  socialNetId?: string;
  fatherMobile?: string;
  fatherEmail?: string;
  fatherOccupation?: string;
  fatherDesignation?: string;
  fatherEmployerName?: string;
  fatherAnnualIncome?: number;
  motherMobile?: string;
  motherEmail?: string;
  motherOccupation?: string;
  motherDesignation?: string;
  motherEmployerName?: string;
  motherAnnualIncome?: number;
  parentAddress?: string;
  localGuardianName?: string;
  localGuardianMobile?: string;
  localGuardianEmail?: string;
  localGuardianRelation?: string;
  localGuardianAddress?: string;
  bearEduExpense?: string;
  prePostOffice?: string;
  prePoliceStation?: string;
  perPostOffice?: string;
  perPoliceStation?: string;
  emailAlternative?: string;
  hostelAddress?: string;
  messAddress?: string;
  otherAddress?: string;
  waverPercent?: string | null;
  waverSemester?: string | null;
}

export interface PresentAddressInfo {
  presentDistrictName: string | null;
  presentDivisionName: string | null;
  presentCountryName: string | null;
}

export interface PermanentAddressInfo {
  permanentDistrictName: string | null;
  permanentDivisionName: string | null;
  permanentCountryName: string | null;
}

export interface EducationInfo {
  id: string;
  institute: string;
  degree: string;
  major: string;
  result: string;
  scale: string;
  passingYear: string;
  duration: string;
}

export interface PhotographInfo {
  photoUrl: string;
  photoData: string;
  image?: string;
}

export type PhotographInfoOrNull = PhotographInfo | null;

// Result Interfaces
export interface Semester {
  semesterId: string;
  semesterYear: number;
  semesterName: string;
}

export interface Result {
  semesterId: string;
  semesterName: string;
  semesterYear: number;
  studentId: string;
  courseId: string;
  customCourseId: string;
  courseTitle: string;
  totalCredit: number;
  grandTotal: number | null;
  pointEquivalent: number;
  gradeLetter: string;
  cgpa: number;
  blocked: string;
  blockCause: string | null;
  tevalSubmitted: string;
  teval: string;
  semesterAccountsClearance: string | null;
}

// Payment Interfaces
export interface PaymentScheme {
  // Add payment scheme fields
  id: string;
  amount: number;
  dueDate: string;
  description: string;
}

export interface PaymentLedger {
  // Add payment ledger fields
  transactions: Array<{
    date: string;
    description: string;
    debit: number;
    credit: number;
    balance: number;
  }>;
}

// Dashboard Interfaces
// SGPA Data Interface
export interface SGPAData {
  semester: string;
  sgpa: number;
};

export interface CGPAData {
  labels: string[];
  data: number[];
  sgpaData: SGPAData[];
  // Add other CGPA graph related fields
}

// Payment Scheme Interface
export interface PaymentScheme {
  schemeId: number
  headDescription: string
  paymentAmount: number
  multiple: string
  courseType: string
}

// Payment Data Interfaces
export interface PaymentData {
  totalCredit: number;
  totalDebit: number;
  totalOther: number;
}

export interface PaymentSummary {
  totalPaid: string;
  totalPayable: string;
  totalDue: string;
  totalOthers: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

interface ErrorResponse {
  message: string;
  status: number;
}

// Add specific types for API responses
interface ApiError {
  responseMessage?: string;
  message?: string;
  status?: number;
}

interface ApiSuccess<T> {
  data: T;
  message?: string;
  status: number;
}

// Add type for request body
interface RequestBody {
  [key: string]: unknown;
}

// Add type for metadata
export interface ActivityMetadata {
  userAgent?: string;
  screenResolution?: string;
  pageLoadTime?: number;
  referrer?: string;
  [key: string]: unknown;
}

// Add type for form data
export interface FormData {
  [key: string]: string | number | boolean | null;
}

// Consolidated PhotographResponse interface
export interface PhotographResponse {
  photoUrl: string;
  photoData: string;
  image?: string;
  success?: boolean;
  message?: string;
  error?: string;
}

// Add type for API call metadata
interface ApiCallMetadata {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  metadata?: ActivityMetadata;
}

// Add type for login metadata
interface LoginMetadata {
  studentId?: string;
  email?: string;
  name?: string;
  sessionDuration?: number;
}

// Add type for logout metadata
interface LogoutMetadata {
  reason?: string;
  timestamp?: Date;
  [key: string]: unknown;
}

// Add type for activity data
interface ActivityData {
  type: string;
  details: Record<string, unknown>;
  timestamp: Date;
  metadata?: ActivityMetadata;
}

// Add type for user config
interface UserConfig {
  enabled: {
    pageViews: boolean;
    buttonClicks: boolean;
    formSubmissions: boolean;
    apiCalls: boolean;
    loginLogout: boolean;
    formInputs: boolean;
    visitTime: boolean;
  };
}

// Add type for activity tracker
interface ActivityTracker {
  getInstance(): ActivityTracker;
  getUserConfig(userId: string): Promise<UserConfig>;
  updateActivityConfig(userId: string, config: UserConfig): Promise<void>;
  trackPageView(path: string, metadata?: ActivityMetadata): Promise<void>;
  trackButtonClick(elementId: string, path: string, metadata?: ActivityMetadata): Promise<void>;
  trackFormSubmission(formId: string, path: string, formData: FormData, metadata?: ActivityMetadata): Promise<void>;
  trackFormInput(formId: string, path: string, inputName: string, inputValue: string, metadata?: ActivityMetadata): Promise<void>;
  trackApiCall(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', path: string, metadata?: ActivityMetadata): Promise<void>;
  trackLogin(username: string, metadata?: LoginMetadata): Promise<void>;
  trackLogout(metadata?: LogoutMetadata): Promise<void>;
}

// Semester Exam Clearance Interfaces
export interface SemesterExamClearance {
  studentId: string | null;
  semesterId: string;
  semesterName: string;
  registration: boolean;
  midTermExam: boolean;
  finalExam: boolean;
}

export interface SemesterExamClearanceTabProps {
  data: SemesterExamClearance[] | null;
  loading: boolean;
}


export interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

export interface Student {
  email: string
  name: string
  studentId: string
  semesterId: string
  personId: number
  batchNo: number
  programId: string
}

export interface PaymentSummaryData {
  totalCredit: number
  totalDebit: number
  totalOther: number
}

export interface PaymentLedgerItem {
  transactionDate: string;
  semesterId: string;
  collectedBy: string | null;
  headDescription: string;
  debit: number;
  credit: number;
  others: number;
  showLedger: string;
}

export interface DivisionListResponse {
  id: string;
  name: string;
}

export interface CountryListResponse {
  id: string;
  name: string;
}

export interface EducationResponse {
  id: string;
  institute: string;
  degree: string;
  major: string;
  result: string;
  scale: string;
  passingYear: string;
  duration: string;
}

export interface DegreeListResponse {
  id: string;
  name: string;
}



export interface InsuranceResponse {
  id: string;
  policyNumber: string;
  provider: string;
  coverage: string;
  expiryDate: string;
}

export interface GuardianResponse {
  id: string;
  name: string;
  relation: string;
  contact: string;
  address: string;
}

export interface CourseRoutine {
  courseId: string;
  courseTitle: string;
  section: string;
  schedule: Array<{
    day: string;
    time: string;
    room: string;
  }>;
}

export interface RegisteredCourse {
  courseId: string;
  courseTitle: string;
  credit: number;
  section: string;
  instructor: string;
}

export interface DropSemester {
  semesterId: string;
  semesterName: string;
  status: string;
}

export interface PaymentData {
  totalDue: number;
  totalPaid: number;
  balance: number;
}

export interface CGPAData {
  cgpa: number;
  creditsCompleted: number;
  creditsAttempted: number;
}

export interface Semester {
  id: string;
  name: string;
  year: number;
}

export interface TevalSubmitCheck {
  submitted: boolean;
  message: string;
}

export interface LiveResult {
  courseId: string;
  courseTitle: string;
  section: string;
  instructor: string;
  grade: string;
  marks: number;
}

export interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

export interface Course {
  customCourseId: string
  courseTitle: string
  courseSectionId: number
  advisedStatus: string
  designation: string
  employeeName: string
  regClearenc: string
  sectionName: string
  semesterId: string
  semesterName: string
  semesterYear: number
  studentId: string
  totalCredit: number
}

export interface CourseResult {
  att: number
  q1: number
  q2: number
  q3: number
  quiz: number
  mid1: number
  mid2: number
}
export interface Semester {
  semesterId: string
  semesterYear: number
  semesterName: string
}

export interface Student {
  email: string
  name: string
  studentId: string
  semesterId: string
  personId: number
  batchNo: number
  programId: string
}

export interface PaymentSummaryData {
  totalCredit: number
  totalDebit: number
  totalOther: number
}

export interface PaymentLedgerItem {
  transactionDate: string
  semesterId: string
  collectedBy: string | null
  headDescription: string
  debit: number
  credit: number
  others: number
  showLedger: string
}

// Mentor Meeting Interfaces
export interface MentorData {
  teacher_id: string;
  FIRST_NAME: string;
  EMAIL: string;
  MOBILE: string | null;
}

export interface Semester {
  semesterId: string;
  semesterYear: number;
  semesterName: string;
}

export interface MeetingWithStudent {
  id: string;
  semester_id: string;
  meeting_topic: string;
  meeting_instruction: string;
  meeting_remarks: string;
  teacher_id: string;
  student_id: string;
  next_meeting_date: string | null;
  next_meeting_time: string;
  meeting_file_location: string | null;
  created_date: number;
}

export interface MeetingWithGuardian {
  id: string;
  semester_id: string;
  meeting_topic: string;
  meeting_instruction: string;
  meeting_remarks: string;
  teacher_id: string;
  student_id: string;
  guardian_name: string;
  relation: string;
  mobile: string;
  email: string;
  next_meeting_date: string | null;
  next_meeting_time: string;
  meeting_file_location: string | null;
  created_date: number;
}

export interface MeetingWithCourseTeacher {
  id: string;
  semester_id: string;
  course_id: string;
  course_title: string;
  teacher_id: string;
  teacher_name: string;
  meeting_topic: string;
  meeting_instruction: string;
  meeting_remarks: string;
  next_meeting_date: string | null;
  next_meeting_time: string;
  meeting_file_location: string | null;
  created_date: number;
  status: 'pending' | 'completed' | 'cancelled';
}

// Export proxyRequest directly
export { proxyRequest };

// Create API instance with configuration
const api = proxyClient;

// Add request interceptor to handle authentication and proxy
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get stored user data
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set('Authorization', `Bearer ${user.accessToken}`);
    }

    // Handle URL formatting
    if (config.url) {
      // Remove any leading slash to prevent double slashes
      config.url = config.url.replace(/^\/+/, '');
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors and retry logic
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config;

    // Check if we should retry based on the endpoint
    const shouldRetry =
      originalRequest?.url?.includes('/result') ||
      originalRequest?.url?.includes('/studentInfo') ||
      originalRequest?.url?.includes('/semesterList');

    // Check if we've already retried
    if (!originalRequest || (originalRequest as any)._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      return Promise.reject(error);
    }

    if (shouldRetry) {
      // Add retry flag to request config
      (originalRequest as any)._retry = true;

      // Wait for a short delay before retrying
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(api(originalRequest));
        }, 1000);
      });
    }

    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await proxyRequest({
        method: 'POST',
        url: '/login',
        data: {
          ...credentials,
        }
      });

      if (process.env.DEV === 'development') {
        console.log('Login response:', response);
      }

      if (!response.accessToken) {
        // Check for specific error messages from the API
        if (response.responseMessage) {
          throw new Error(response.responseMessage);
        } else if (response.message) {
          throw new Error(response.message);
        } else {
          throw new Error('Invalid response: Missing access token');
        }
      }

      // Store user data and authentication state
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('isAuthenticated', 'true');

      return response;
    } catch (error: any) {
      // Clear auth data
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      // Extract error message from the response if available
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('An error occurred during login. Please try again.');
      }
    }
  },

  logout: async () => {
    try {
      await proxyRequest({
        method: 'POST',
        url: '/logout',
      });
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  },
  //  Forgot Password
  changePassword: async (data: PasswordChangeRequest): Promise<void> => {
    const token = profileService.getAuthToken();
    try {
      await proxyRequest({
        method: 'POST',
        url: '/passwordChange',
        data,
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
        }
      });
    } catch (error: any) {
      let message = 'Failed to change password';
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      throw new Error(message);
    }
  },

  // Forgot Password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    try {
      const response = await proxyRequest({
        method: 'POST',
        url: `/resetForgotPassword/forgotPassword?email=${data.email}`,
      });
      return response.data;
    } catch (error: any) {
      let message = 'Failed to send password reset link';
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      throw new Error(message);
    }
  },
};

// Profile Service
export const profileService = {
  /**
   * Get student photograph
   */
  getPhotograph: async (): Promise<PhotographInfoOrNull> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/photograph',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // Validate and process response
      if (!response) {
        throw new Error('No photograph data received');
      }

      // Handle 'file not found' case (base64 for 'file not found' is 'ZmlsZSBub3QgZm91bmQ=')
      if (response === 'ZmlsZSBub3QgZm91bmQ=' || response.photoUrl === 'ZmlsZSBub3QgZm91bmQ=') {
        return null;
      }

      // If response is already a base64 image or has a photoUrl
      if (response.image || response.photoUrl) {
        return {
          photoUrl: response.photoUrl || `data:image/jpeg;base64,${response.image}`,
          photoData: response.photoUrl || response.image
        };
      }

      // If response is a base64 string directly
      if (typeof response === 'string') {
        return {
          photoUrl: `data:image/jpeg;base64,${response}`,
          photoData: response
        };
      }

      throw new Error('Invalid photograph data format');
    } catch (error: any) {
      console.error('Error fetching photograph:', error);
      throw error;
    }
  },
  // Helper function to get auth token
  getAuthToken: () => {
    const userJson = localStorage.getItem('user');
    let token = '';
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        token = user.accessToken;
      } catch (error) {
        // console.error('Error parsing user data from localStorage:', error);
      }
    }
    return token;
  },

  // Get basic student information
  getStudentInfo: async (): Promise<StudentInfo | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profile/studentInfo',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Student Info Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching student info:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch student info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Get education list
  getEducationList: async (): Promise<EducationInfo[]> => {
    // try {
    const token = profileService.getAuthToken();

    const response = await proxyRequest({
      method: 'GET',
      url: '/profile/educationList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });

    return response || [];
    // } catch (error) {
    //   console.error('Error fetching education list:', error);
    //   return [];
    // }
  },

  // Get present address
  getPresentAddress: async (): Promise<PresentAddressInfo> => {
    // try {
    const token = profileService.getAuthToken();

    const response = await proxyRequest({
      method: 'GET',
      url: '/profile/presentAddress',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });

    return response || { presentDistrictName: null, presentDivisionName: null, presentCountryName: null };
    // } catch (error) {
    //   console.error('Error fetching present address:', error);
    //   return { presentDistrictName: null, presentDivisionName: null, presentCountryName: null };
    // }
  },

  // Get permanent address
  getPermanentAddress: async (): Promise<PermanentAddressInfo> => {
    // try {
    const token = profileService.getAuthToken();

    const response = await proxyRequest({
      method: 'GET',
      url: '/profile/permanentAddress',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });

    return response || { permanentDistrictName: null, permanentDivisionName: null, permanentCountryName: null };
    // } catch (error) {
    //   console.error('Error fetching permanent address:', error);
    //   return { permanentDistrictName: null, permanentDivisionName: null, permanentCountryName: null };
    // }
  },

  // Update student information
  updateStudentInfo: async (data: Partial<StudentInfo>): Promise<StudentInfo> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'PUT',
        url: '/profile/updateStudentInfo',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        },
        data
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to update student info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  // Fetch guardian info
  getGuardianInfo: async (): Promise<Partial<StudentInfo>> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/profileUpdate/guardian',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response;
  },

  // Update guardian info
  updateGuardianInfo: async (data: Partial<StudentInfo>): Promise<any> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'POST',
      url: '/profileUpdate/guardian',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      },
      data
    });
    return response;
  },

  // Update photograph info
  updatePhotographInfo: async (formData: globalThis.FormData): Promise<{ success: boolean; photoUrl?: string }> => {
    const token = profileService.getAuthToken();
    try {
      const response = await proxyRequest({
        method: 'POST',
        url: '/profileUpdate/photograph',
        data: formData,
        timeout: 120000,
        headers: {
          'Authorization': `Bearer ${token}`,
          'accessToken': token,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response;
    } catch (error: any) {
      console.error('Error in updatePhotographInfo:', error);
      
      if (error.response) {
        try {
          const errorData = typeof error.response.data === 'string' 
            ? JSON.parse(error.response.data) 
            : error.response.data;
          
          error.message = errorData.message || error.message;
          error.details = errorData;
        } catch (e) {
          console.error('Could not parse error response:', e);
        }
      } else if (error.request) {
        console.error('No response received. Request details:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
      
      throw error;
    }
  },

  // Fetch insurance info
  getInsuranceInfo: async (): Promise<any> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/profileUpdate/insurance',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response;
  },

  // Update insurance info
  updateInsuranceInfo: async (data: any): Promise<any> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'POST',
      url: '/profileUpdate/insurance',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      },
      data
    });
    return response;
  },

  // Fetch degree list
  getDegreeList: async (): Promise<any[]> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/profileUpdate/degreeList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response || [];
  },

  // Update degree list
  updateDegreeList: async (data: any): Promise<any> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'POST',
      url: '/profileUpdate/degreeList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      },
      data
    });
    return response;
  },

  // Fetch education list
  getEducationListUpdate: async (): Promise<any[]> => {
      const token = profileService.getAuthToken();
    const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/educationList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
        'Accept': '*/*'
        }
      });
    return response ;
  },


  //personal info

  personalInfo: async (): Promise<StudentInfo | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/personalInfo',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Personal Info Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching personal info:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch personal info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  updatePersonalInfo: async (): Promise<StudentInfo | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'POST',
        url: '/profileUpdate/personalInfo',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Personal Info Response:', response);

      return response;
    } catch (error) {
      // console.error('Error Updating personal info:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to Update personal info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  maritalStatusList: async (): Promise<any | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/maritalStatusList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Marital Status List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching marital status list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch marital status list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  bloodGroupList: async (): Promise<any | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/bloodGroupList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Blood Group List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching blood group list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch blood group list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  religionList: async (): Promise<any | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/religionList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Religion List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching religion list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch religion list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  //guardian info
  guardianInfo: async (): Promise<StudentInfo | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/guardian',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Guardian Info Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching guardian info:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch guardian info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },


  //Contact/Address
  contactAddress: async (): Promise<StudentInfo | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/contactAddress',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Contact Address Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching contact address:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch contact address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  districtList: async (): Promise<any | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/districtList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('District List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching district list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch district list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  divisionList: async (): Promise<DivisionListResponse[] | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/divisionList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch division list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  countryList: async (): Promise<CountryListResponse[] | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/countryList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch country list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  degreeList: async (): Promise<DegreeListResponse[] | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/degreeList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch degree list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  photograph: async (): Promise<PhotographResponse | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/photograph',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });
      return response as PhotographResponse;
    } catch (error) {
      console.error('Error fetching photograph:', error);
      return null;
    }
  },

  insurance: async (): Promise<InsuranceResponse | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/insurance',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch insurance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  guardian: async (): Promise<GuardianResponse | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/guardian',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch guardian: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },


};

// Result Service
export const resultService = {
  getSemesterList: async (): Promise<Semester[]> => {
    // try {
    const response = await api.get<Semester[]>('/result/semesterList');
    return response.data;
    // } catch (error) {
    // console.error('Error fetching semester list:', error);
    // throw error;
    // }
  },


  getStudentResult: async (semesterId: string, studentId: string): Promise<Result> => {
    // try {
    const response = await api.get<Result>('/result', {
      params: {
        semesterId,
        studentId,
        grecaptcha: ''
      }
    });
    // if (!response.data || typeof response.data !== 'object') {
    //   throw new Error('Invalid response format');
    // }
    return response.data;
    // } catch (error) {
    // console.error('Error fetching student result:', error);
    // throw error;
    // }
  },

  getStudentInfo: async (studentId: string): Promise<StudentInfo> => {
    const response = await api.get<StudentInfo>('/result/studentInfo', {
      params: { studentId }
    });
    return response.data;
  },
};


// Live Result Service
export const liveResultService = {

  getLiveResultSemesterList: async (): Promise<Semester[]> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/liveResult/semesterList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    if (process.env.DEV === 'development') {
      console.log("Fetched Semesters:", response)
    }
    return response;
  },

  getTevalSubmitCheck: async (courseSectionId: number): Promise<TevalSubmitCheck> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/liveResult/tevalSubmitCheck?courseSectionId=${courseSectionId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response;
  },

  getRegisteredCourseList: async (semesterId: string): Promise<Course[]> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/liveResult/registeredCourseList?semesterId=${semesterId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response;
  },

  getLiveResult: async (courseSectionId: number): Promise<CourseResult> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/liveResult?courseSectionId=${courseSectionId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response;
  },
};


// Payment Service
export const paymentService = {

  //Payment Scheme
  getPaymentScheme: async (): Promise<PaymentScheme[]> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/paymentScheme',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response;
  },

  //Payment Ledger
  getPaymentLedger: async (): Promise<PaymentLedger> => {
    const response = await proxyRequest({
      method: 'GET',
      url: '/paymentLedger/paymentLedgerSummery',
      headers: {
        Authorization: `Bearer ${profileService.getAuthToken()}`,
        accessToken: profileService.getAuthToken(),
        'Accept': '*/*'
      }
    });
    return response;
  },

  //Payment Ledger
  semesterList: async (): Promise<Semester[] | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/paymentLedger/semesterList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Semester List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching semester list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch semester list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  //Student info
  studentInfo: async (): Promise<Student | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/paymentLedger/studentInfo',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Student Info Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching student info:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch student info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  //payment ledger summery
  paymentLedgerSummery: async (): Promise<PaymentSummaryData | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/paymentLedger/paymentLedgerSummery',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Payment Ledger Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching payment ledger:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch payment ledger: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  paymentLedger: async (): Promise<PaymentLedgerItem[] | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/paymentLedger',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Payment Ledger Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching payment ledger:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch payment ledger: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  //Waiver list
  waiverList: async (): Promise<PaymentLedgerItem[] | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/paymentLedger/waiverList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Waiver List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching waiver list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch waiver list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  //Waiver details
  waiverDetails: async (waiverId: string): Promise<PaymentLedgerItem[] | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: `/paymentLedger/waiverDetails/${waiverId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Waiver Details Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching waiver details:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch waiver details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async getCourseRoutine(courseSectionId: string): Promise<{
    courseId: string;
    courseTitle: string;
    section: string;
    schedule: Array<{
      day: string;
      time: string;
      room: string;
    }>;
  }> {
    const response = await api.get(`/courseRoutine/${courseSectionId}`);
    return response.data;
  },

  async getRegisteredCourses(semesterId: string): Promise<Array<{
    courseId: string;
    courseTitle: string;
    credit: number;
    section: string;
    instructor: string;
  }>> {
    const response = await api.get(`/registeredCourses/${semesterId}`);
    return response.data;
  },

  async getLiveResultSemesterList(): Promise<Array<{
    semesterId: string;
    semesterName: string;
    semesterYear: number;
  }>> {
    const response = await api.get('/liveResultSemesterList');
    return response.data;
  },

  async getTevalSubmitCheck(courseSectionId: string): Promise<{
    submitted: boolean;
    message: string;
  }> {
    const response = await api.get(`/tevalSubmitCheck/${courseSectionId}`);
    return response.data;
  },

  async getLiveRegisteredCourseList(semesterId: string): Promise<Array<{
    courseId: string;
    courseTitle: string;
    section: string;
    instructor: string;
  }>> {
    const response = await api.get(`/liveRegisteredCourseList/${semesterId}`);
    return response.data;
  },

  async getLiveResult(courseSectionId: string): Promise<{
    courseId: string;
    courseTitle: string;
    section: string;
    instructor: string;
    grade: string;
    marks: number;
  }> {
    const response = await api.get(`/liveResult/${courseSectionId}`);
    return response.data;
  }
};



// Utility function for BDT formatting
export const formatBDT = (amount: number): string =>
  '৳' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Calculate payment summary
export const calculatePaymentSummary = (data: PaymentData): PaymentSummary => {
  const totalPaid = data.totalCredit;
  const totalPayable = data.totalDebit;
  const totalDue = totalPayable - totalPaid;
  const totalOthers = data.totalOther;

  return {
    totalPaid: formatBDT(totalPaid),
    totalPayable: formatBDT(totalPayable),
    totalDue: formatBDT(totalDue),
    totalOthers: formatBDT(totalOthers),
  };
};

// Registered Course Service
export const registeredCourseService = {
  /**
   * Get semester list for registered courses
   */
  async getSemesterList(): Promise<Array<{ semesterId: string; semesterYear: number; semesterName: string }>> {
    const token = await profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/registeredCourse/semesterList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*',
      },
    });
    return response || [];
  },
  getCourseRoutine: async (courseSectionId: string): Promise<CourseRoutine | null> => {
    const token = await profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/registeredCourse/routine?courseSectionId=${courseSectionId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*',
      },
    });
    return response || null;
  },
  getRegisteredCourses: async (semesterId: string): Promise<RegisteredCourse[]> => {
    const token = await profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/registeredCourse?semesterId=${semesterId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*',
      },
    });
    return response || [];
  },
};

// Exam Service
export const examService = {
  /**
   * Get semester exam clearance info
   */
  getSemesterExamClearance: async (): Promise<SemesterExamClearance[]> => {
    try {
      const token = await profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/accounts/semester-exam-clearance',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });
      return Array.isArray(response) ? response : [];
    } catch (error) {
      console.error('Error fetching semester exam clearance:', error);
      return [];
    }
  }
};

export const dashboardService = {
  getPaymentLedgerSummary: async (): Promise<PaymentData> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/paymentLedger/paymentLedgerSummery',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      },
      timeout: 45000,
      maxRetries: 3,
      retryDelay: 2000
    });
    return response;
    // } catch (error) {
    // console.error('Error fetching payment ledger summary:', error);
    // return {
    // totalCredit: 0,
    // totalDebit: 0,
    // totalOther: 0
    // };
    // }
  },
  getDropSemesterList: async (): Promise<DropSemester[]> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/dropSemester/dropSemesterList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        },
        timeout: 45000,  // 45 seconds timeout
        maxRetries: 3,   // 3 retries
        retryDelay: 2000 // 2 seconds between retries
      });
      return response || [];
    } catch (error) {
      console.error('Error fetching drop semester list:', error);
      return [];
    }
  },
  getCGPAData: async (): Promise<CGPAData> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/dashboard/studentSGPAGraph',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      },
      timeout: 45000,  // 45 seconds timeout
      maxRetries: 3,   // 3 retries
      retryDelay: 2000 // 2 seconds between retries
    });
    // if (!response || typeof response !== 'object') {
    //   throw new Error('Invalid response format');
    // }
    return response;
    // } catch (error) {
    //   console.error('Error fetching CGPA data:', error);
    //   throw error;
    // }
  },

};

// Mentor Meeting Service
export const mentorMeetingService = {
  // Get mentor details
  getMentorDetails: async (): Promise<MentorData> => {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/mentorMeeting/mentorDetails',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        },
      });
      return response;
  },

  // Get semester list
  getSemesterList: async (): Promise<Semester[]> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/mentorMeeting/semesterList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      }
    });
    return response;
  },

  // Get meetings with students for a semester
  getMeetingsWithStudents: async (semesterId: string): Promise<MeetingWithStudent[]> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: `/mentorMeeting/meetingWithStudentList?semesterId=${semesterId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching student meetings:', error);
      return [];
    }
  },

  // Get meetings with guardians for a semester
  getMeetingsWithGuardians: async (semesterId: string): Promise<MeetingWithGuardian[]> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: `/mentorMeeting/meetingWithGuardianList?semesterId=${semesterId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching guardian meetings:', error);
      return [];
    }
  },

  // Get pending meetings with course teachers for a semester
  getPendingMeetingsWithCourseTeachers: async (semesterId: string): Promise<MeetingWithCourseTeacher[]> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: `/mentorMeeting/meetingWithCourseTeacherListPending?semesterId=${semesterId}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching course teacher meetings:', error);
      return [];
    }
  }
};

// Transport Card Types
export interface TransportPackage {
  id: number;
  name: string;
  amount: string;
  startdate: string;
  expirydate: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface TransportApplication {
  id: number;
  user_id: string;
  user_name: string;
  user_email: string;
  phone: string;
  program: string;
  user_type: string;
  semester_type: string | null;
  image: string;
  location: string;
  package_id: number;
  startdate: string;
  expirydate: string;
  apply_amount: string;
  paid_amount: string;
  amount: string;
  payment_method: string;
  status: string;
  paymentstatus: string;
  created_at: string;
  updated_at: string;
  cardstatus: string;
  printed_at: string | null;
  delivery_at: string | null;
  remarks: string | null;
  package: TransportPackage;
}

export interface TransportUserInfo {
  studentId: string;
  semesterType: string;
}

// Transport Service
export const transportService = {
  // Get all transport card applications
  getTransportCards: async (): Promise<TransportApplication[]> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/bus/application-list',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': 'application/json'
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching transport cards:', error);
      return [];
    }
  },

  // Get available transport packages
  getTransportPackages: async (): Promise<TransportPackage[]> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/bus/package-list',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching transport packages:', error);
      return [];
    }
  },

  // Get user transport info
  getUserTransportInfo: async (): Promise<TransportUserInfo> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/bus/user-info',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': 'application/json'
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching user transport info:', error);
      throw error;
    }
  },

  // Apply for transport card
  applyForTransportCard: async (locationName: string, packageId: number, semesterTypeId: string): Promise<{ payment_1card: string; payment_link: string }> => {
    try {
      const token = profileService.getAuthToken();
      
      // Create the request URL with properly encoded parameters
      const queryParams = new URLSearchParams({
        locationName: locationName,  // Already formatted with + for spaces
        packageId: packageId.toString(),
        semesterTypeId: semesterTypeId
      }).toString();
      
      const requestUrl = `/bus/application-apply?${queryParams}`;
      
      console.log('Sending request to:', requestUrl);
      
      const response = await proxyRequest({
        method: 'GET',
        url: requestUrl,
        headers: {
          'Authorization': `Bearer ${token}`,
          'accessToken': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log('Transport card application response:', response);
      
      // Handle the response format we see in the working example
      if (response && response.message === 'success') {
        if (response.payment_link || response.payment_1card) {
          return {
            payment_link: response.payment_link,
            payment_1card: response.payment_1card
          };
        }
      }
      
      // Handle case where response is nested under data property
      if (response.data && response.data.message === 'success') {
        if (response.data.payment_link || response.data.payment_1card) {
          return {
            payment_link: response.data.payment_link,
            payment_1card: response.data.payment_1card
          };
        }
      }
      
      // If we get here, the response format is unexpected
      console.error('Unexpected response format:', response);
      throw new Error('Unexpected response format from server');
      
    } catch (error: any) {
      console.error('Error in applyForTransportCard:', {
        error,
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });
      
      let errorMessage = 'Failed to apply for transport card';
      
      if (error.response) {
        // If we have a response with data, use its message if available
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 400) {
          errorMessage = 'Invalid request. Please check your input and try again.';
        } else if (error.response.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Something happened in setting up the request
        errorMessage = error.message || 'An unexpected error occurred';
      }
      
      throw new Error(errorMessage);
    }
  },

  // Pay for transport card
  payTransportCard: async (applicationId: number): Promise<{ url: string }> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'POST',
        url: `/bus/pay?applicationId=${applicationId}`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Store the current URL in localStorage to redirect back after payment
      if (typeof window !== 'undefined') {
        localStorage.setItem('returnUrl', window.location.href);
      }
      
      return response;
    } catch (error) {
      console.error('Error initiating transport card payment:', error);
      throw error;
    }
  }
};