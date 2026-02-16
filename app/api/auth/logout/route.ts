import { NextResponse } from 'next/server';
import { backendApi } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/utils/logger';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || '';
    const refreshToken = cookieStore.get('refreshToken')?.value || '';
    const sessionid = cookieStore.get('sessionid')?.value || '';

    // Build safe Cookie string - skip empty
    const cookieParts = [];
    if (accessToken) cookieParts.push(`accessToken=${accessToken}`);
    if (refreshToken) cookieParts.push(`refreshToken=${refreshToken}`);
    if (sessionid) cookieParts.push(`sessionid=${sessionid}`);
    const cookieHeader = cookieParts.join('; ');

    await backendApi.post('auth/logout/', null, {
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }), // Only if non-empty
      },
    });

    // Delete only if exist
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionid');

    return NextResponse.json({ message: 'Вихід виконано успішно' }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
