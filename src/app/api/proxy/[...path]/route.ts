import { NextRequest, NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const API_BASE_URL = process.env.API_BASE_URL || 'http://peoplepulse.diu.edu.bd:8189';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, User-Agent',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

type ErrorResponse = {
  message: string;
  error?: string;
  status?: number;
};

// Helper function to handle CORS preflight requests
function handleCors() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Helper function to build headers
function buildHeaders(req: NextRequest): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  // Forward Authorization header if present
  const authHeader = req.headers.get('Authorization');
  if (authHeader) {
    headers['Authorization'] = authHeader;
  }

  // Forward accessToken header if present
  const accessToken = req.headers.get('accessToken');
  if (accessToken) {
    headers['accessToken'] = accessToken;
  }

  // Forward other important headers
  const userAgent = req.headers.get('user-agent');
  if (userAgent) {
    headers['User-Agent'] = userAgent;
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
    const targetUrl = `${API_BASE_URL}/${path}`;
    const searchParams = url.searchParams.toString();
    const finalUrl = searchParams ? `${targetUrl}?${searchParams}` : targetUrl;

    const headers = buildHeaders(req);
    
    let body: string | null = null;
    if (method !== 'GET' && method !== 'HEAD') {
      try {
        const jsonBody = await req.json();
        body = JSON.stringify(jsonBody);
      } catch (error) {
        console.warn('[Proxy Warning] Empty or invalid request body:', error);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      const response = await fetch(finalUrl, {
        method,
        headers,
        body,
        redirect: 'follow',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    console.error('[Proxy Error]', error);
    const errorResponse: ErrorResponse = {
      message: 'Failed to proxy request',
      error: error instanceof Error ? error.message : String(error),
      status: 502
    };
    return NextResponse.json(errorResponse, { status: 502, headers: corsHeaders });
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