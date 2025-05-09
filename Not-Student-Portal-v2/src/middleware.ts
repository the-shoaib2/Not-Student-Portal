import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow NextAuth.js API routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Define public routes that don't require authentication
  const publicRoutes = ['/login', '/result', '/notices', '/certificate-verify'];
  
  // Check if current route is public
  if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get auth token from cookies
  const token = request.cookies.get('next-auth.session-token')?.value;
  const isAuth = !!token;

  // If user is not authenticated, redirect to login with return URL
  if (!isAuth) {
    // Decode the URL before redirecting
    const decodedPath = decodeURIComponent(request.nextUrl.pathname);
    const from = decodedPath + request.nextUrl.search;
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', encodeURIComponent(from));
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login']
}