/**
 * Proxy Utilities for DIU Student Portal
 * 
 * This file provides utility functions for working with the proxy server.
 */

import axios from 'axios';

// Constants
export const PROXY_BASE = '/api/proxy';
export const API_BASE_URL = process.env.API_BASE_URL || 'http://peoplepulse.diu.edu.bd:8189';

// Create a proxy client instance
const proxyClient = axios.create({
  baseURL: PROXY_BASE,
  timeout: 30000, // Increased timeout to 30 seconds
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle auth headers
proxyClient.interceptors.request.use((config) => {
  // Get auth token from localStorage if available
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user.accessToken) {
          config.headers['Authorization'] = `Bearer ${user.accessToken}`;
          config.headers['accessToken'] = user.accessToken;
        }
      } catch (error) {
        console.warn('[Proxy] Error parsing user data:', error);
      }
    }
  }
  return config;
});

// Add request interceptor
proxyClient.interceptors.request.use(
  (config) => {
    // Add any request-specific headers or modifications
    return config;
  },
  (error) => {
    console.error('[Proxy] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
proxyClient.interceptors.response.use(
  // (response) => {
    // console.log('[Proxy] Response:', {
    //   status: response.status,
    //   data: response.data
    // });
  (response) => {
    return response;
  },
  (error) => {
    console.error('[Proxy] Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Export the proxy client and request function
export { proxyClient };

// Health check function
export const checkProxyHealth = async (): Promise<{ status: string; message: string; data?: any }> => {
  try {
    const response = await proxyClient.get('/health');
    const responseData = response.data || {};
    return {
      status: 'ok',
      message: 'Proxy server is working correctly',
      ...responseData
    };
  } catch (error) {
    console.error('[Proxy] Health check failed:', error);
    return {
      status: 'error',
      message: 'Proxy server is not working correctly'
    };
  }
};

/**
 * Helper function to determine if a request should use the proxy
 * @param url The URL to check
 * @returns Boolean indicating if the proxy should be used
 */
export const shouldUseProxy = (url: string): boolean => {
  // Skip proxy for local resources and external URLs
  return !url.match(/^(\/assets\/|\/public\/|https?:\/\/)/);
};

/**
 * Make a proxied request to the API
 * @param method The HTTP method
 * @param url The URL to request
 * @param data The request body (for POST, PUT, PATCH)
 * @param headers Additional headers
 */
export const proxyRequest = async ({
  method,
  url,
  data,
  headers = {},
  responseType,
  timeout = 30000,  // Default 30 seconds
  maxRetries = 3,   // Maximum number of retries
  retryDelay = 1000 // Initial retry delay in milliseconds
}: {
  method: string;
  url: string;
  data?: any;
  headers?: Record<string, string>;
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}) => {
  const makeRequest = async (retryCount: number = 0): Promise<any> => {
    try {
      const response = await proxyClient.request({
        method,
        url,
        data,
        responseType,
        timeout,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers
        }
      });
      
      // If responseType is blob or arraybuffer, return the data as an ArrayBuffer
      if (responseType === 'blob' || responseType === 'arraybuffer') {
        console.group('Proxy Request ArrayBuffer');
        console.log('Response type:', responseType);
        console.log('Response data:', response.data);
        console.log('Response data type:', typeof response.data);
        console.log('Response data instanceof ArrayBuffer:', response.data instanceof ArrayBuffer);
        console.groupEnd();
        return response.data;
      }
      // Otherwise just return the data
      return response.data;
    } catch (error: any) {
      // If it's a network error or timeout, retry
      if (
        error instanceof Error && 
        (error as any).code === 'ECONNABORTED' || (error as any).code === 'ERR_NETWORK'
      ) {
        if (retryCount < maxRetries) {
          // Exponential backoff
          const delay = retryDelay * Math.pow(2, retryCount);
          console.warn(`[Proxy] Request failed. Retrying in ${delay}ms...`, error.message);
          
          await new Promise(resolve => setTimeout(resolve, delay));
          return makeRequest(retryCount + 1);
        }
      }
      
      // If max retries reached or different error, throw
      if (error instanceof Error && error.message) {
        throw new Error(error.message);
      }
      throw error;
    }
  };

  return makeRequest();
};

/**
 * Check if the proxy server is working correctly
 * @returns Promise with the status of the proxy server
 */
export const checkProxyStatus = async (): Promise<{ status: string; message: string }> => {
  try {
    // Make a simple request to test the proxy
    await proxyClient.get('/health-check');
    return {
      status: 'success',
      message: 'Proxy server is working correctly',
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Proxy server is not working correctly',
    };
  }
};

/**
 * Get the current proxy configuration
 * @returns The current proxy configuration
 */
export const getProxyConfig = () => {
  return {
    baseUrl: '/api',
    targetUrl: process.env.API_BASE_URL,
    isProxyEnabled: true,
  };
};