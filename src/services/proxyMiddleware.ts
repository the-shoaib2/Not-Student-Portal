/**
 * Proxy Middleware for DIU Student Portal
 * 
 * This middleware provides additional functionality for the proxy server:
 * - Request/response logging
 * - Error handling
 * - Request/response transformation
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Create a custom axios instance for the proxy
const proxyClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 100000, // 100 seconds timeout
});

// Request interceptor for logging and transformation
proxyClient.interceptors.request.use(
  (config) => {
    // Log outgoing requests (in development only)
    // if (false) {
    //   console.log(`[Proxy] Request: ${config.method?.toUpperCase()} ${config.url}`);
    // }
    
    return config;
  },
  (error) => {
    console.error('[Proxy] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
proxyClient.interceptors.response.use(
  (response) => {
    // Log successful responses (in development only)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Proxy] Response: ${response.status} from ${response.config.url}`);
    }
    
    return response;
  },
  (error: AxiosError) => {
    // Log error responses
    console.error(`[Proxy] Error: ${error.message}`, {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });
    
    return Promise.reject(error);
  }
);

/**
 * Proxy request handler
 * @param request The original request
 * @param additionalConfig Additional axios config to merge
 * @returns Promise with the response
 */
export const proxyRequest = async (
  method: string,
  url: string,
  data?: any,
  headers?: Record<string, string>,
  params?: Record<string, any>
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
    params
  };
  
  try {
    return await proxyClient(config);
  } catch (error) {
    // You can implement custom error handling here
    // For example, retry logic, fallback responses, etc.
    // console.error('[Proxy] Request failed:', error);
    throw error;
  }
};

// Export the proxy client for direct use
export default proxyClient;