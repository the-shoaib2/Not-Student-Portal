import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/result',
  '/notices',
  '/certificate-verify',
  '/',
  '/api/auth'
];

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/profile-update',
  '/password-change',
  '/payment-ledger',
  '/payment-scheme',
  '/registration-exam-clearance',
  '/registered-course',
  '/live-result',
  '/teaching-evaluation',
  '/alumni-professional',
  '/convocation-apply',
  '/certificate-transcript-apply',
  '/online-exam',
  '/laptop',
  '/routine',
  '/mentor-meeting',
  '/transport-card-apply',
  '/alumni-card-apply',
  '/internship',
  '/hall',
  '/student-application',
  '/library',
  '/calendar',
  '/skill-jobs',
  '/settings',
  '/student-id'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow NextAuth.js API routes
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Get auth token from cookies
  const token = request.cookies.get('token')?.value;
  const isAuth = !!token;

  // If it's a protected route and user is not authenticated
  if (isProtectedRoute && !isAuth) {
    // Create login URL with return path
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (isAuth && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};