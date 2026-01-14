import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { nextServer } from '@/lib/api/api';

export async function GET() {
  const cookieStore = await cookies();

  const res = await nextServer.get('/weeks/current', {
    headers: { Cookie: cookieStore.toString() },
  });

  return NextResponse.json(res.data);
}
