import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  // Log incoming request
  console.log('[API Route] Received request:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  });

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  try {
    // Get target URL
    const path = req.nextUrl.pathname.replace(/^\/(?:api|proxy)/, '');
    const url = new URL(path, API_BASE_URL).href;
    
    console.log('[API Route] Processing request:', {
      originalUrl: req.url,
      cleanPath: path,
      targetUrl: url,
      method: req.method,
      headers: Object.fromEntries(req.headers.entries())
    });

    // Get request body for non-GET requests
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const contentType = req.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = await req.text();
        console.log('[API Route] Request body:', body);
      }
    }

    // Forward the request with all headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    // Copy other important headers from the original request
    const forwardHeaders = ['authorization', 'user-agent'];
    for (const header of forwardHeaders) {
      const value = req.headers.get(header);
      if (value) headers.set(header, value);
    }

    console.log('[API Route] Forwarding request:', {
      url,
      method: req.method,
      headers: Object.fromEntries(headers.entries()),
      body: body ? JSON.parse(body) : undefined
    });

    const response = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    // Handle response
    const responseText = await response.text();
    console.log('[API Route] Received response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText
    });

    // Try to parse response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      // If not JSON, wrap in an error object
      if (!response.ok) {
        data = { 
          error: response.statusText || 'Request failed',
          message: responseText,
          status: response.status
        };
      } else {
        data = { message: responseText };
      }
    }

    // Get response headers
    const responseHeaders = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    });

    // Copy relevant headers from the API response
    const headersToForward = ['content-type', 'authorization'];
    for (const header of headersToForward) {
      const value = response.headers.get(header);
      if (value) responseHeaders.set(header, value);
    }

    // Return response
    return NextResponse.json(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('[API Route] Error:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : String(error),
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
        },
      }
    );
  }
}
