# DIU Student Portal Proxy Server

## Overview

This project implements a proxy server for the DIU Student Portal to handle API requests between the frontend and the backend server. The proxy server provides several benefits:

- **CORS Issues Resolution**: Eliminates cross-origin resource sharing problems
- **Enhanced Security**: Hides the actual API endpoint from client-side code
- **Request/Response Manipulation**: Allows for logging, transformation, and error handling
- **Authentication Management**: Centralizes token handling and authorization

## Implementation Details

### 1. Vite Proxy Configuration

The proxy server is implemented using Vite's built-in proxy functionality in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: process.env.API_BASE_URL,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
      secure: false,
    },
  },
},
```

This configuration forwards all requests from `/api/*` to the actual backend server defined in the `.env` file.

### 2. API Service Updates

The `api.ts` file has been updated to use the proxy endpoint instead of directly calling the backend server:

```typescript
const api = axios.create({
  baseURL: '/api', // This will be proxied to API_BASE_URL by Vite
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Additional interceptors have been added to handle authentication and common errors.

### 3. Proxy Middleware

A new `proxyMiddleware.ts` file provides additional functionality:

- Request/response logging
- Error handling
- Request/response transformation
- Custom proxy client for advanced use cases

## How It Works

1. Frontend makes API requests to `/api/*` endpoints
2. Vite's development server intercepts these requests
3. Requests are forwarded to the actual backend server (defined in `.env`)
4. Responses are returned to the frontend

## Usage

No changes are needed in your component code. Continue making API requests using the existing `api` instance from `src/services/api.ts`.

For advanced use cases, you can import the proxy middleware:

```typescript
import { proxyRequest } from '../services/proxyMiddleware';

// Example usage
const fetchData = async () => {
  try {
    const response = await proxyRequest('GET', '/some-endpoint', null, {
      'Custom-Header': 'value'
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```

## Development

To start the development server with the proxy enabled:

```bash
npm run dev
```

## Production

For production deployment, you'll need to configure your production server to handle the proxy functionality, as Vite's development server won't be available in production.

Options include:

1. Using a reverse proxy like Nginx or Apache
2. Implementing a server-side proxy with Node.js (Express, etc.)
3. Using a serverless function as an API proxy

## Troubleshooting

If you encounter issues with the proxy:

1. Check the browser console for error messages
2. Verify that the `.env` file contains the correct `API_BASE_URL` value
3. Ensure the backend server is running and accessible
4. Check for CORS headers in the backend response