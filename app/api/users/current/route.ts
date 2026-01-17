import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/utils/logger';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await backendApi.get('users/current', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(data);
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
