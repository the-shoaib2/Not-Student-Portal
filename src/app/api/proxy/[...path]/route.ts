import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.API_BASE_URL;

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

export async function GET(req: NextRequest) {
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

    // Forward the request with all headers
    const headers = new Headers(req.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    // Remove problematic headers
    ['host', 'connection'].forEach(header => {
      headers.delete(header);
    });

    // Create the request to forward
    const forwardRequest = new Request(targetUrl, {
      method: req.method,
      headers: headers,
      redirect: 'follow',
    });

    // Forward the request
    const response = await fetch(forwardRequest);

    // Get response data
    const responseData = await response.text();

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
  } catch (_error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    let path = url.pathname;
    path = path.replace(/^\/(?:api|proxy)\//, '');
    const targetUrl = `${API_BASE_URL}/${path}`;

    const headers = new Headers(req.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    ['host', 'connection'].forEach(header => {
      headers.delete(header);
    });

    let body: RequestBody | null = null;
    try {
      body = await req.json();
    } catch (error) {
      // Handle empty body
    }

    const forwardRequest = new Request(targetUrl, {
      method: req.method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
      redirect: 'follow',
    });

    const response = await fetch(forwardRequest);
    const responseData = await response.text();

    const responseHeaders = new Headers(corsHeaders);
    response.headers.forEach((value, key) => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    try {
      const jsonData = JSON.parse(responseData);
      return NextResponse.json(jsonData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch {
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }
  } catch (_error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    let path = url.pathname;
    path = path.replace(/^\/(?:api|proxy)\//, '');
    const targetUrl = `${API_BASE_URL}/${path}`;

    const headers = new Headers(req.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    ['host', 'connection'].forEach(header => {
      headers.delete(header);
    });

    let body: RequestBody | null = null;
    try {
      body = await req.json();
    } catch (error) {
      // Handle empty body
    }

    const forwardRequest = new Request(targetUrl, {
      method: req.method,
      headers: headers,
      body: body ? JSON.stringify(body) : null,
      redirect: 'follow',
    });

    const response = await fetch(forwardRequest);
    const responseData = await response.text();

    const responseHeaders = new Headers(corsHeaders);
    response.headers.forEach((value, key) => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    try {
      const jsonData = JSON.parse(responseData);
      return NextResponse.json(jsonData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch {
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }
  } catch (_error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    let path = url.pathname;
    path = path.replace(/^\/(?:api|proxy)\//, '');
    const targetUrl = `${API_BASE_URL}/${path}`;

    const headers = new Headers(req.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    ['host', 'connection'].forEach(header => {
      headers.delete(header);
    });

    const forwardRequest = new Request(targetUrl, {
      method: req.method,
      headers: headers,
      redirect: 'follow',
    });

    const response = await fetch(forwardRequest);
    const responseData = await response.text();

    const responseHeaders = new Headers(corsHeaders);
    response.headers.forEach((value, key) => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    try {
      const jsonData = JSON.parse(responseData);
      return NextResponse.json(jsonData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch {
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    }
  } catch (_error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

type RequestBody = Record<string, unknown>;
