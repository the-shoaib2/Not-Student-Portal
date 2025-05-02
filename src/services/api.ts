import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { shouldUseProxy } from './proxyUtils';

// API base URL based on environment
const BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_BASE_URL // Use direct URL in production
  : '/api'; // Use proxy in development

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
  (config: InternalAxiosRequestConfig) => {
    // Add authentication token if available
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.accessToken) {
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // Handle URL formatting
    if (config.url) {
      // Remove any leading slash to prevent double slashes
      config.url = config.url.replace(/^\/+/, '');

      // Log request in development
      if (import.meta.env.DEV) {
        console.log(`[API] ${config.method?.toUpperCase()} ${BASE_URL}/${config.url}`);
      }
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    } else if (status === 403) {
      console.error('[API] Forbidden access:', error);
    } else if (status === 404) {
      console.error('[API] Resource not found:', error);
    } else if (status && status >= 500) {
      console.error('[API] Server error:', error);
    }
    return Promise.reject(error);
  }
);

// Auth Interfaces
export interface LoginCredentials {
  username: string;
  password: string;
  grecaptcha: string;
}

export interface LoginResponse {
  name: string;
  message: string;
  accessToken: string;
  userName: string;
  commaSeparatedRoles: string;
  deviceName: string;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

// Profile Interfaces
export interface StudentInfo {
  studentId: string;
  name: string;
  program: string;
  batch: string;
  shift: string;
  email: string;
  phone: string;
  // Add other profile fields as needed
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
      const response = await api.post<LoginResponse>('/login', {
        ...credentials,
        deviceName: navigator.userAgent,
      });

      if (!response.data || !response.data.accessToken) {
        throw new Error('Invalid response: Missing access token');
      }

      const userData = {
        ...response.data,
        lastLoginTime: new Date().toISOString(),
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      return response.data;
    } catch (error) {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
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
    const response = await api.get<Semester[]>('/result/semesterList');
    return response.data;
  },

  getLiveResultSemesterList: async (): Promise<Semester[]> => {
    const response = await api.get<Semester[]>('/liveResult/semesterList');
    return response.data;
  },

  getStudentResult: async (semesterId: string, studentId: string): Promise<Result> => {
    const response = await api.get<Result>('/result', {
      params: {
        semesterId,
        studentId,
        grecaptcha: ''
      }
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