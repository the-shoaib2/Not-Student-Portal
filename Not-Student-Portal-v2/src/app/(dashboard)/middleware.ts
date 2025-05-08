import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token');
  
  // Allow public routes in dashboard group
  const publicRoutes = ['/result', '/notices', '/certificate-verify', '/internship', '/hall', '/student-application', '/library', '/calendar', '/skill-jobs'];
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/(dashboard)/:path*',
};
