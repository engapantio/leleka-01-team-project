import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from './lib/api/serverApi';

const publicRoutes = ['/auth', '/onboarding'];
const privateRoutes = ['/journey', '/diary', '/profile'];

export async function proxy(request: NextRequest) {
  const cookiesStore = await cookies();
  const { pathname } = request.nextUrl;
  const accessToken = cookiesStore.get('accessToken')?.value;
  const refreshToken = cookiesStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      const data = await checkSession();
      const setCookie = data.headers['set-cookie'];
      if (setCookie) {
        const cookiesArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookie of cookiesArray) {
          const parsed = parse(cookie);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) {
            cookiesStore.set('accessToken', parsed.accessToken, options);
          }
          if (parsed.refreshToken) {
            cookiesStore.set('refreshToken', parsed.refreshToken, options);
          }
        }
        if (isPublicRoute) {
          return NextResponse.redirect(new URL('/', request.url), {
            headers: {
              Cookie: cookiesStore.toString(),
            },
          });
        }
        if (isPrivateRoute) {
          return NextResponse.next({
            headers: {
              Cookie: cookiesStore.toString(),
            },
          });
        }
      }
    }
    if (isPublicRoute) {
      return NextResponse.next();
    }
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Allow onboarding even for authenticated users
  if (pathname === '/onboarding') {
    return NextResponse.next();
  }
  
  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/auth/:path*', '/journey', '/diary', '/onboarding'],
};
