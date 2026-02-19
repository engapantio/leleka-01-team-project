// app/api/auth/session/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
//import { isAxiosError } from 'axios';
import { backendApi } from '../../api';
//import { logErrorResponse } from '@/utils/logger';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  // const sessionid = cookieStore.get('sessionid')?.value;

  if (accessToken) {
    return NextResponse.json({ success: true });
  }

  if (refreshToken) {
    try {
      console.log('Cookies:', cookieStore.getAll());
      console.log('RefreshToken:', refreshToken);
      const apiRes = await backendApi.post(
        'auth/refresh/',
        {},
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        }
      );
      const setCookie = apiRes.headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
          if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
          if (parsed.sessionid) cookieStore.set('sessionid', parsed.sessionid, options);
        }
      }
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  }

  return NextResponse.json({ success: false });
}
