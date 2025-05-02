/**
 * Proxy Utilities for DIU Student Portal
 * 
 * This file provides utility functions for working with the proxy server.
 */

import proxyClient from './proxyMiddleware';

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
    console.error('[Proxy] Health check failed:', error);
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

/**
 * Helper function to determine if a request should use the proxy
 * @param url The URL to check
 * @returns Boolean indicating if the proxy should be used
 */
export const shouldUseProxy = (url: string): boolean => {
  // Skip proxy for local resources
  if (url.startsWith('/assets/') || url.startsWith('/public/')) {
    return false;
  }
  
  // Skip proxy for external URLs (those that include http:// or https://)
  if (url.match(/^https?:\/\//)) {
    return false;
  }
  
  return true;
};