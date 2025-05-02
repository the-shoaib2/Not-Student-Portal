/**
 * Proxy Utilities for DIU Student Portal
 * 
 * This file provides utility functions for working with the proxy server.
 */

import axios from 'axios';

// Constants
export const PROXY_BASE = '/proxy';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://software.diu.edu.bd:8189';

// Create a proxy client instance
export const proxyClient = axios.create({
  baseURL: PROXY_BASE,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
proxyClient.interceptors.request.use(
  async (config) => {
    // Log request details
    // console.log('[Proxy] Request:', {
    //   method: config.method?.toUpperCase(),
    //   url: `${config.baseURL}${config.url}`,
    //   headers: config.headers,
    //   data: config.data
    // });
    return config;
  },
  (error: any) => {
    // console.error('[Proxy] Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
proxyClient.interceptors.response.use(
  (response) => {
    // console.log('[Proxy] Response:', {
    //   status: response.status,
    //   data: response.data
    // });
    return response;
  },
  (error: any) => {
    // console.error('[Proxy] Response Error:', {
    //   status: error.response?.status,
    //   data: error.response?.data,
    //   message: error.message
    // });
    return Promise.reject(error);
  }
);

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
  headers = {}
}: {
  method: string;
  url: string;
  data?: any;
  headers?: Record<string, string>;
}) => {
  try {
    const response = await proxyClient.request({
      method,
      url,
      data,
      headers: {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || error.message);
    }
    throw error;
  }
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
    // console.error('[Proxy] Health check failed:', error);
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
    targetUrl: import.meta.env.VITE_API_BASE_URL,
    isProxyEnabled: true,
  };
};