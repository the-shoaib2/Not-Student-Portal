import { proxyClient, proxyRequest } from './proxyUtils';

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

// Export proxyRequest directly
export { proxyRequest };

// Create API instance with configuration
const api = proxyClient;

// Add request interceptor to handle authentication and proxy
api.interceptors.request.use(
  async (config: any) => {
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
  (error: any) => {
    // console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors and retry logic
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
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

export interface SendResetCodeRequest {
  userId: string;
  method: 'email' | 'sms';
  type: 'code' | 'link';
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



// Auth Service
export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await proxyRequest({
        method: 'POST',
        url: '/login',
        data: {
          ...credentials,
        }
      });

      console.log('Login response:', response);

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
      await api.post('/logout');
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  },

  changePassword: async (data: PasswordChangeRequest): Promise<void> => {
    const token = profileService.getAuthToken();
    try {
      await api.post('/passwordChange', data, {
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

  forgotPassword: async (data: ForgotPasswordRequest): Promise<void> => {
    await api.post('/resetForgotPassword/forgotPassword', data);
  },

  findUser: async (data: FindUserRequest): Promise<FindUserResponse> => {
    try {
      const response = await api.post<FindUserResponse>('/findUser', data);
      return response.data;
    } catch (error: any) {
      let message = 'Failed to find user';
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      throw new Error(message);
    }
  },

  sendResetCode: async (data: SendResetCodeRequest): Promise<void> => {
    try {
      const response = await proxyRequest({
        method: 'POST',
        url: '/resetForgotPassword/sendResetCode',
        data
      });
      return response;
    } catch (error: any) {
      let message = 'Failed to send reset code';
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
  getPhotograph: async (): Promise<PhotographInfo> => {
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

  // Fetch photograph info
  getPhotographInfo: async (): Promise<any> => {
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
    return response;
  },

  // Update photograph info
  updatePhotographInfo: async (data: any): Promise<any> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'POST',
      url: '/profileUpdate/photograph',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      },
      data
    });
    return response;
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
    return response || [];
  },

  // Update education list
  updateEducationList: async (data: any): Promise<any> => {
    const token = profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'POST',
      url: '/profileUpdate/educationList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*'
      },
      data
    });
    return response;
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

  divisionList: async (): Promise<any | null> => {
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

      // console.log('Division List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching division list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch division list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  countryList: async (): Promise<any | null> => {
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

      // console.log('Country List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching country list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch country list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  //education
  education: async (): Promise<any | null> => {
    try {
      const token = profileService.getAuthToken();
      const response = await proxyRequest({
        method: 'GET',
        url: '/profileUpdate/education',
        headers: {
          Authorization: `Bearer ${token}`,
          accessToken: token,
          'Accept': '*/*'
        }
      });

      // console.log('Education Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching education:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch education: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  degreeList: async (): Promise<any | null> => {
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

      // console.log('Degree List Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching degree list:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch degree list: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  photograph: async (): Promise<any | null> => {
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

      // console.log('Photograph Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching photograph:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch photograph: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  insurance: async (): Promise<any | null> => {
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

      // console.log('Insurance Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching insurance:', error);
      // Throw a more descriptive error
      throw new Error(`Failed to fetch insurance: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  guardian: async (): Promise<any | null> => {
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

      // console.log('Guardian Response:', response);

      return response;
    } catch (error) {
      // console.error('Error fetching guardian:', error);
      // Throw a more descriptive error
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

  /**
   * Get routine for a specific course section
   */
  async getCourseRoutine(courseSectionId: string): Promise<any> {
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

  /**
   * Get registered courses for a semester
   */
  async getRegisteredCourses(semesterId: string): Promise<any[]> {
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
        'Accept': '*/*'
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

  getDropSemesterList: async (): Promise<any[]> => {
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
    // try {
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

  // --- Live Result APIs ---
  async getLiveResultSemesterList(): Promise<any[]> {
    const token = await profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: '/liveResult/semesterList',
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*',
      },
    });
    return response || [];
  },

  async getTevalSubmitCheck(courseSectionId: string): Promise<any> {
    const token = await profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/liveResult/tevalSubmitCheck?courseSectionId=${courseSectionId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*',
      },
    });
    return response || null;
  },

  async getLiveRegisteredCourseList(semesterId: string): Promise<any[]> {
    const token = await profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/liveResult/registeredCourseList?semesterId=${semesterId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*',
      },
    });
    return response || [];
  },

  async getLiveResult(courseSectionId: string): Promise<any> {
    const token = await profileService.getAuthToken();
    const response = await proxyRequest({
      method: 'GET',
      url: `/liveResult?courseSectionId=${courseSectionId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accessToken: token,
        'Accept': '*/*',
      },
    });
    return response || null;
  },
};