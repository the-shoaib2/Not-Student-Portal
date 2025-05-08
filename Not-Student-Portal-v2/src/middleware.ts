import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow NextAuth.js API routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Get auth token from cookies
  const token = request.cookies.get('next-auth.session-token')?.value;
  const isAuth = !!token;

  // If user is authenticated and trying to access login
  if (isAuth && request.nextUrl.pathname === '/login') {
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is not authenticated and trying to access protected routes
  if (!isAuth && !request.nextUrl.pathname.startsWith('/login')) {
    // Get the current path to redirect back after login
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }

    // Redirect to login with return URL
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login']
}