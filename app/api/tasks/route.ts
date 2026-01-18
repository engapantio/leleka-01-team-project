import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { backendApi } from '@/app/api/api';
import type { Task } from '@/types/task';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/utils/logger';

async function getCookieHeader() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return [
    accessToken ? `accessToken=${accessToken}` : null,
    refreshToken ? `refreshToken=${refreshToken}` : null,
  ]
    .filter(Boolean)
    .join('; ');
}

// GET
export async function GET() {
  try {
    const cookieHeader = await getCookieHeader();

    const response = await backendApi.get<{ date: string; tasks: Task[] }>('/tasks', {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(response.data.tasks, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



// ------------------- POST -------------------

export async function POST(request: Request) {
  try {
    const cookieHeader = await getCookieHeader();
    const body = (await request.json()) as Pick<Task, 'name' | 'date'>;

    console.log('POST /tasks body:', body);

    const response = await backendApi.post<Task>('/tasks', body, {
      headers: { Cookie: cookieHeader },
    });

    if (!response.data?.id) {
      console.error('Task not created, backend response:', response.data);
      return NextResponse.json({ error: 'Task not created', response: response.data }, { status: 500 });
    }

    console.log('Task created:', response.data);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH
export async function PATCH(request: Request) {
  try {
    const cookieHeader = await getCookieHeader();
    const body = (await request.json()) as { id: string } & Partial<Omit<Task, 'id'>>;
    const { id, ...payload } = body;

    if (!id) return NextResponse.json({ error: 'Task id is required' }, { status: 400 });

    const response = await backendApi.patch<Task>(`/tasks/${id}`, payload, {
      headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
