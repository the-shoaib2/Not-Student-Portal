import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || 'http://peoplepulse.diu.edu.bd:8189';

const proxyClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, User-Agent',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400',
};

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const path = params.path.join('/');
    const searchParams = new URL(req.url).searchParams;
    const targetUrl = `${API_BASE_URL}/${path}`;

    const response = await proxyClient.get(path, {
      params: Object.fromEntries(searchParams),
      headers: {
        ...Object.fromEntries(req.headers),
        host: new URL(API_BASE_URL).host,
      }
    });

    const responseHeaders = new Headers(corsHeaders);
    Object.keys(response.headers).forEach(key => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, response.headers[key]);
      }
    });

    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error('[Proxy] Error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const path = params.path.join('/');
    const body = await req.json();
    
    const response = await proxyClient.post(path, body, {
      headers: {
        ...Object.fromEntries(req.headers),
        host: new URL(API_BASE_URL).host,
      }
    });

    const responseHeaders = new Headers(corsHeaders);
    Object.keys(response.headers).forEach(key => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, response.headers[key]);
      }
    });

    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error('[Proxy] Error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500, headers: corsHeaders }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const path = params.path.join('/');
    const body = await req.json();
    
    const response = await proxyClient.put(path, body, {
      headers: {
        ...Object.fromEntries(req.headers),
        host: new URL(API_BASE_URL).host,
      }
    });

    const responseHeaders = new Headers(corsHeaders);
    Object.keys(response.headers).forEach(key => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, response.headers[key]);
      }
    });

    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error('[Proxy] Error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const path = params.path.join('/');
    const searchParams = new URL(req.url).searchParams;
    const targetUrl = `${API_BASE_URL}/${path}`;

    const response = await proxyClient.delete(path, {
      params: Object.fromEntries(searchParams),
      headers: {
        ...Object.fromEntries(req.headers),
        host: new URL(API_BASE_URL).host,
      }
    });

    const responseHeaders = new Headers(corsHeaders);
    Object.keys(response.headers).forEach(key => {
      if (!['access-control-allow-origin'].includes(key.toLowerCase())) {
        responseHeaders.set(key, response.headers[key]);
      }
    });

    return NextResponse.json(response.data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error('[Proxy] Error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500, headers: corsHeaders }
    );
  }
}