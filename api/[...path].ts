import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://software.diu.edu.bd:8189';

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
    const path = req.nextUrl.pathname.replace('/api', '');
    const url = new URL(path, API_BASE_URL).href;

    // Get request body for non-GET requests
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const contentType = req.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = await req.text();
        console.log('[API Route] Request body:', body);
      }
    }

    // Forward the request
    console.log('[API Route] Forwarding request to:', url);
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body,
    });

    // Get response data
    const responseText = await response.text();
    console.log('[API Route] Response:', {
      status: response.status,
      body: responseText
    });

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    // Return response
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      },
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
