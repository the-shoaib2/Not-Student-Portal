import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const config = {
  runtime: 'edge',
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, User-Agent',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

export default async function handler(req: NextRequest) {
  // Log incoming request
  console.log('[API Route] Received request:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  });

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Get the path from the URL
    const url = new URL(req.url);
    let path = url.pathname;

    // Clean up the path
    if (path.startsWith('/api/')) {
      path = path.replace('/api/', '');
    } else if (path.startsWith('/proxy/')) {
      path = path.replace('/proxy/', '');
    }

    // Build target URL
    const targetUrl = `${API_BASE_URL}/${path}`;
    console.log('[API Route] Target URL:', targetUrl);

    // Get request body
    let body: string | undefined;
    if (!['GET', 'HEAD'].includes(req.method)) {
      const text = await req.text();
      if (text) {
        try {
          JSON.parse(text); // Validate JSON
          body = text;
        } catch (e) {
          console.error('[API Route] Invalid JSON body:', e);
          return NextResponse.json(
            { message: 'Invalid JSON body' },
            { status: 400, headers: corsHeaders }
          );
        }
      }
    }

    console.log('[API Route] Processing request:', {
      originalUrl: req.url,
      cleanPath: path,
      targetUrl: targetUrl,
      method: req.method,
      headers: Object.fromEntries(req.headers.entries())
    });

    // Forward the request with all headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    // Copy all headers from the original request
    req.headers.forEach((value, key) => {
      if (!['host', 'connection'].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    console.log('[API Route] Forwarding request:', {
      url: targetUrl,
      method: req.method,
      headers: Object.fromEntries(headers.entries()),
      body: body ? JSON.parse(body) : undefined
    });

    const response = await fetch(targetUrl, {
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

    // Merge CORS headers with response headers
    const responseHeaders = new Headers(corsHeaders);
    response.headers.forEach((value, key) => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // Return response
    return NextResponse.json(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('[API Route] Error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
