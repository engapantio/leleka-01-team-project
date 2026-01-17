import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '@/app/api/api';

export async function GET() {
  const cookieStore = await cookies();

  const res = await backendApi.get('/diaries', {
    headers: { Cookie: cookieStore.toString() },
  });

  return NextResponse.json(res.data);
}
