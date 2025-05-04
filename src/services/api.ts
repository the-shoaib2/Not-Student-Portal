import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
import { proxyRequest } from './proxyUtils';
import { url } from 'inspector';

// Use proxy endpoint that will be handled by our Edge Function
const BASE_URL = '/proxy';

// Create API instance with configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 100000, // 100 seconds timeout
  withCredentials: true, // Required for cookies, authorization headers with HTTPS
});

// Add request interceptor to handle authentication and proxy
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get stored user data
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // Handle URL formatting
    if (config.url) {
      // Remove any leading slash to prevent double slashes
      config.url = config.url.replace(/^\/+/, '');

      // Log request details
      // console.log('[API] Making request:', {
      //   method: config.method?.toUpperCase(),
      //   url: `${BASE_URL}/${config.url}`,
      //   headers: config.headers,
      //   data: config.data
      // });
    }

    return config;
  },
  (error: AxiosError) => {
    // console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors and retry logic
api.interceptors.response.use(
  (response) => {
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
    if (!originalRequest || originalRequest._retry) {
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

// Auth Interfaces
export interface LoginCredentials {
  username: string;
  password: string;
  grecaptcha?: string;
}

export interface LoginResponse {
  accessToken: string;
  id: string;
  name: string;
  email: string;
  roles: string[];
  commaSeparatedRoles: string;
  deviceName: string;
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
  cgpa?: string | number; // Added cgpa property
  photoUrl?: string;
  // Additional fields from the detailed profile
  photoFile?: string;
  personId?: number;
  firstName?: string;
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
}

// Result Interfaces
export interface Semester {
  id: string;
  name: string;
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
export interface CGPAData {
  labels: string[];
  data: number[];
  // Add other CGPA graph related fields
}



// Auth Service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      // console.log('[Auth] Attempting login...');
      
      const response = await proxyRequest({
        method: 'POST',
        url: '/login',
        data: {
          ...credentials,
          deviceName: navigator.userAgent,
        }
      });

      // console.log('[Auth] Login response:', response);

      if (!response || !response.accessToken) {
        throw new Error('Invalid response: Missing access token');
      }

      const userData = {
        ...response,
        lastLoginTime: new Date().toISOString(),
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      return response;
    } catch (error) {
      // Clear auth data
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      // Re-throw the error
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/logout');
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  },

  changePassword: async (data: PasswordChangeRequest): Promise<void> => {
    await api.post('/passwordChange', data);
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await api.post('/resetForgotPassword/forgotPassword', data);
  },
};

// Profile Service
export const profileService = {
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
  getStudentInfo: async (): Promise<StudentInfo> => {
    try {
      const token = profileService.getAuthToken();
      
      const response = await proxyRequest({
        method: 'GET',
        url: '/profile/studentInfo',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': 'application/json'
        }
      });
      
      
      // if (!response) {
      //   console.warn('API returned empty response for student info');
      //   return {} as StudentInfo;
      // }
      
      return response;
    } catch (error) {
      // console.error('Error fetching student info:', error);
      // Return a default object with empty values to prevent UI errors
      return {} as StudentInfo;
    }
  },

  // Get student photograph
  getPhotograph: async (): Promise<PhotographInfo> => {

      const token = profileService.getAuthToken();
      const arrayBuffer = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/photograph',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          Accept: 'image/jpeg', 
        },
        responseType: 'arraybuffer', 
      });
      // Validate ArrayBuffer
      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        return { photoUrl: '', photoData: '' };
      }
      // Convert ArrayBuffer to base64 string in browser environment
      const uint8Array = new Uint8Array(arrayBuffer);
      let binaryString = '';
      for (let i = 0; i < uint8Array.byteLength; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
      }
      const photoBase64 = btoa(binaryString);
      // Validate base64 string
      if (!photoBase64 || photoBase64.length === 0) {
        return { photoUrl: '', photoData: '' };
      }
      const photoUrl = `data:image/jpeg;base64,${photoBase64}`;
      return { photoUrl, photoData: photoUrl };
    
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
          'Accept': 'application/json'
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
          'Accept': 'application/json'
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
          'Accept': 'application/json'
        }
      });
      
      return response || { permanentDistrictName: null, permanentDivisionName: null, permanentCountryName: null };
    // } catch (error) {
    //   console.error('Error fetching permanent address:', error);
    //   return { permanentDistrictName: null, permanentDivisionName: null, permanentCountryName: null };
    // }
  }
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

  getLiveResultSemesterList: async (): Promise<Semester[]> => {
    const response = await api.get<Semester[]>('/liveResult/semesterList');
    return response.data;
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

// Payment Service
export const paymentService = {
  getPaymentScheme: async (): Promise<PaymentScheme> => {
    const response = await api.get<PaymentScheme>('/paymentScheme');
    return response.data;
  },

  getPaymentLedger: async (): Promise<PaymentLedger> => {
    const response = await api.get<PaymentLedger>('/paymentLedger/paymentLedgerSummery');
    return response.data;
  },
};

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

// Dashboard Service
export const dashboardService = {

  getPaymentLedgerSummary: async (): Promise<PaymentData> => {
    // try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/paymentLedger/paymentLedgerSummery',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': 'application/json'
        },
        timeout: 45000,  // 45 seconds timeout
        maxRetries: 3,   // 3 retries
        retryDelay: 2000 // 2 seconds between retries
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

  getDropSemesterList: async (): Promise<any> => {
    // try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/dropSemester/dropSemesterList',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': 'application/json'
        },
        timeout: 45000,  // 45 seconds timeout
        maxRetries: 3,   // 3 retries
        retryDelay: 2000 // 2 seconds between retries
      });
      return response;
    // } catch (error) {
    //   console.error('Error fetching drop semester list:', error);
    //   return [];
    // }
  },

  getCGPAData: async (): Promise<CGPAData> => {
    // try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/dashboard/studentSGPAGraph',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': 'application/json'
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
  }
};