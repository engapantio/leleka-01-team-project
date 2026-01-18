import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '@/app/api/api';
import { DiaryEntry } from '@/types/diary';

export async function GET() {
  const cookieStore = await cookies();

  const res = await backendApi.get('/diaries', {
    headers: { Cookie: cookieStore.toString() },
  });

  return NextResponse.json(res.data);
}

export async function POST(
  request: Request
): Promise<NextResponse> {
  try {
    const body = await request.json();

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll()
      .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
      .join('; ');

    const res = await backendApi.post<DiaryEntry>('/diaries', body, {
      headers: { Cookie: cookieHeader },
    });

    console.log(`Diary entry created successfully`);

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Post API error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: 'Failed to create diary entry' },
      { status: 500 }
    );
  }
}
