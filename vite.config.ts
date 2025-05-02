/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { ProxyOptions } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL.trim(),
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.error('[Proxy Error]', err);
            });
            proxy.on('proxyReq', (proxyReq, req) => {
              // Log the full URL being requested
              const fullUrl = new URL(req.url || '', env.VITE_API_BASE_URL.trim()).href;
              console.log('[Proxy Request]', req.method, fullUrl);
              
              // Set proper headers
              proxyReq.setHeader('Accept', 'application/json');
              proxyReq.setHeader('Content-Type', 'application/json');
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('[Proxy Response]', proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
  };
});
