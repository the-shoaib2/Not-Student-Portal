import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>('/login', credentials);
      
      // Store the entire user object in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('isAuthenticated', 'true');
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await api.post('/logout');

      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');

      return response.data;

    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
}; 