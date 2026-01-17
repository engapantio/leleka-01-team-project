import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '@/app/api/api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/utils/logger';

interface WeekNumberParams {
  params: Promise<{ weekNumber: string }>;
}

export async function GET(request: NextRequest, { params }: WeekNumberParams) {
  try {
    const cookieStore = await cookies();
    const { weekNumber } = await params;
    const weekNum = Number(weekNumber);

    // if (isNaN(weekNum) || weekNum < 1 || weekNum > 40) {
    //   return NextResponse.json(
    //     { error: 'Invalid weekNumber. Must be between 1 and 40' },
    //     { status: 400 }
    //   );
    // }

    const res = await backendApi.get(`weeks/${weekNum}/baby`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 });
  }
}
