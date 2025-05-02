import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'http://software.diu.edu.bd:8189';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  // Handle CORS preflight requests
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
    // Get the target path and construct the URL
    const path = req.nextUrl.pathname.replace('/proxy', '');
    const url = new URL(path, API_BASE_URL).href;

    // Get the request body if present
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const contentType = req.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = await req.text();
      }
    }

    console.log(`[Proxy] ${req.method} ${url}`);
    if (body) console.log('[Proxy] Request Body:', body);

    // Forward the request
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body,
    });

    // Read and log the response
    const responseText = await response.text();
    console.log(`[Proxy] Response Status: ${response.status}`);
    console.log('[Proxy] Response Body:', responseText);

    // Parse the response if it's JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText };
    }

    // Return the response
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      },
    });
  } catch (error) {
    console.error('[Proxy Error]:', error);
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
