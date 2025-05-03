import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { proxyRequest } from './proxyUtils';

// Use proxy endpoint that will be handled by our Edge Function
const BASE_URL = '/proxy';

// Create API instance with configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
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

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    // Log successful response
    // console.log('[API] Response received:', {
    //   status: response.status,
    //   url: response.config.url,
    //   data: response.data
    // });
    return response;
  },
  (error: AxiosError) => {
    // Log detailed error information
    // console.error('[API] Request failed:', {
    //   status: error.response?.status,
    //   statusText: error.response?.statusText,
    //   data: error.response?.data,
    //   message: error.message,
    //   url: error.config?.url,
    //   method: error.config?.method
    // });

    if (error.response?.status === 401) {
      // Clear stored data on authentication error
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
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
}

// Result Interfaces
export interface Semester {
  id: string;
  name: string;
}

export interface Result {
  semesterId: string;
  studentId: string;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credit: number;
    grade: string;
    gradePoint: number;
  }>;
  sgpa: number;
  cgpa: number;
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
  getStudentInfo: async (): Promise<StudentInfo> => {
    const response = await api.get<StudentInfo>('/profile/studentInfo');
    return response.data;
  },
};

// Result Service
export const resultService = {
  getSemesterList: async (): Promise<Semester[]> => {
    try {
      const response = await api.get<Semester[]>('/result/semesterList');
      return response.data;
    } catch (error) {
      console.error('Error fetching semester list:', error);
      throw error;
    }
  },

  getLiveResultSemesterList: async (): Promise<Semester[]> => {
    const response = await api.get<Semester[]>('/liveResult/semesterList');
    return response.data;
  },

  getStudentResult: async (semesterId: string, studentId: string): Promise<Result> => {
    try {
      const response = await api.get<Result>('/result', {
        params: {
          semesterId,
          studentId,
          grecaptcha: ''
        }
      });
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format');
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching student result:', error);
      throw error;
    }
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

// Dashboard Service
export const dashboardService = {
  
  getDropSemesterList: async () => {
    const response = await api.get('/dropSemester/dropSemesterList');
    return response.data;
  },

  getCGPAData: async (): Promise<CGPAData> => {
    const response = await api.get<CGPAData>('/dashboard/studentSGPAGraph');
    return response.data;
  },
};