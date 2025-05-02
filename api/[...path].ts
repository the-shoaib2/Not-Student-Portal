import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://software.diu.edu.bd:8189';

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
  // console.log('[API Route] Received request:', {
  //   method: req.method,
  //   url: req.url,
  //   headers: Object.fromEntries(req.headers.entries())
  // });

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
    path = path.replace(/^\/(?:api|proxy)\//, '');

    // Build target URL
    const targetUrl = `${API_BASE_URL}/${path}`;
    // console.log('[API Route] Target URL:', targetUrl);

    // console.log('[API Route] Processing request:', {
    //   originalUrl: req.url,
    //   cleanPath: path,
    //   targetUrl: targetUrl,
    //   method: req.method,
    //   headers: Object.fromEntries(req.headers.entries())
    // });

    // Forward the request with all headers
    const headers = new Headers(req.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    // Remove problematic headers
    ['host', 'connection'].forEach(header => {
      headers.delete(header);
    });

    // Get request body for POST/PUT/PATCH methods
    let body: RequestBody | null = null;
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      try {
        body = await req.json();
      } catch (error) {
        // console.error('[API Route] Error parsing request body:', error);
      }
    }

    // Create the request to forward
    const forwardRequest = new Request(targetUrl, {
      method: req.method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
      redirect: 'follow',
    });

    // console.log('[API Route] Forwarding request:', {
    //   url: targetUrl,
    //   method: req.method,
    //   headers: Object.fromEntries(headers.entries())
    // });

    // Forward the request
    const response = await fetch(forwardRequest);

    // Get response data
    const responseData = await response.text();
    // console.log('[API Route] Received response:', {
    //   status: response.status,
    //   statusText: response.statusText,
    //   headers: Object.fromEntries(response.headers.entries()),
    //   body: responseData
    // });

    // Prepare response headers
    const responseHeaders = new Headers(corsHeaders);
    response.headers.forEach((value, key) => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // Try to parse response as JSON
    try {
      const jsonData = JSON.parse(responseData);
      return NextResponse.json(jsonData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch {
      // If not JSON, return as text
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }
  } catch (error) {
    // console.error('[API Route] Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

type RequestBody = Record<string, unknown>;
