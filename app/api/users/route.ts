import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { backendApi } from '../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/utils/logger';

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();

    // const accessToken = cookieStore.get('accessToken')?.value;
    // const refreshToken = cookieStore.get('refreshToken')?.value;

<<<<<<< HEAD
        const contentType = request.headers.get('content-type') || '';
        
        let body;
        const headers: Record<string, string> = {
            Cookie: cookieStore.toString()
        };

        // Check if request is FormData
        if (contentType.includes('multipart/form-data')) {
            body = await request.formData();
        } else {
            body = await request.json();
            headers['Content-Type'] = 'application/json';
        }
        
        const response = await backendApi.patch('/users', body, {
            headers
        })
        
        return NextResponse.json({data: response.data, success: true}, {status: 200})
    } catch (error){
        console.error(error)
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
=======
    // if (!accessToken && !refreshToken) {
    //   return NextResponse.json({ error: 'Unauthorized ' }, { status: 401 });
    // }

    const body = await request.json();

    const response = await backendApi.patch('/users', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json({ data: response.data }, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
>>>>>>> main
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
