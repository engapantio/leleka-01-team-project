import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/auth', '/'];
const privateRoutes = ['/journey', '/diary', ];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // Redirect authenticated users away from auth pages
  if (publicRoutes.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect unauthenticated users to login
  if (privateRoutes.some(route => pathname.startsWith(route)) && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
