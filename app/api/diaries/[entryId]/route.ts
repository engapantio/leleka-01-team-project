import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '@/app/api/api';
import type { DiaryEntry } from '@/types/diary';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ entryId: string }> }
): Promise<NextResponse> {
  const { entryId } = await context.params;

  try {

    const cookieStore = await cookies();

    const cookieHeader = cookieStore.getAll()
      .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
      .join('; ');
    const res = await backendApi.delete<DiaryEntry>(`/diaries/${entryId}`, {
      headers: { Cookie: cookieHeader },
    });

    console.log(`Diary entry ${entryId} deleted successfully`);

    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Delete API error:', error.message);
    } else {
      console.error('Delete API error:', error);
    }

    return NextResponse.json(
      { message: 'Failed to delete diary entry' },
      { status: 500 }
    );
  }
}
