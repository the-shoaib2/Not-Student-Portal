import { NextRequest, NextResponse } from 'next/server';

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

// Helper function to handle CORS preflight requests
function handleCors() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Helper function to build headers
function buildHeaders(req: NextRequest) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  
  // Forward authorization header if present
  const authHeader = req.headers.get('Authorization');
  if (authHeader) {
    headers.set('Authorization', authHeader);
  }
  
  return headers;
}

// Helper function to clean path
function cleanPath(path: string) {
  return path.replace(/^\/(?:api|proxy)\//, '');
}

async function handleRequest(req: NextRequest, method: string) {
  try {
    const url = new URL(req.url);
    const path = cleanPath(url.pathname);
    const API_BASE_URL = process.env.API_BASE_URL || 'http://peoplepulse.diu.edu.bd:8189';
    const targetUrl = `${API_BASE_URL}/${path}`;

    const headers = buildHeaders(req);
    
    let body: string | null = null;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const jsonBody = await req.json();
        body = JSON.stringify(jsonBody);
      } catch {
        // Handle empty body
      }
    }

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      redirect: 'follow',
    });

    const responseData = await response.text();
    const responseHeaders = new Headers(corsHeaders);

    // Copy relevant response headers
    response.headers.forEach((value, key) => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // Try to parse as JSON, fallback to text
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
  } catch (error) {
    console.error('[Proxy Error]', error);
    return NextResponse.json(
      { message: 'Internal server error', error: String(error) },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(req: NextRequest) {
  if (req.method === 'OPTIONS') return handleCors();
  return handleRequest(req, 'GET');
}

export async function POST(req: NextRequest) {
  if (req.method === 'OPTIONS') return handleCors();
  return handleRequest(req, 'POST');
}

export async function PUT(req: NextRequest) {
  if (req.method === 'OPTIONS') return handleCors();
  return handleRequest(req, 'PUT');
}

export async function DELETE(req: NextRequest) {
  if (req.method === 'OPTIONS') return handleCors();
  return handleRequest(req, 'DELETE');
}