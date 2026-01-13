import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/utils/logger';

interface WeekNumberProps {
  params: Promise<{ weekNumber: string }>;
}

export async function GET(request: NextRequest, { params }: WeekNumberProps) {
  try {
    const cookieStore = await cookies();
    const { weekNumber } = await params;
    const { data } = await backendApi.get(`weeks/${weekNumber}/mom`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
    });
    
    return NextResponse.json(data);

  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 500 });
  }
}