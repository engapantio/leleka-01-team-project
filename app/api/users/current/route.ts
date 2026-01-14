import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/utils/logger';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Неавторизовано' }, { status: 401 });
  }
  try {
    const response = await backendApi.get('users/current', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(
      { user: response.data },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
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
