import { cookies, } from "next/headers";
import { NextResponse } from "next/server";
import { backendApi } from "../api";



export async function PATCH(request: Request) {
    try {
        const cookieStore = await cookies()
        
        const accessToken = cookieStore.get('accessToken')?.value
        const refreshToken = cookieStore.get('refreshToken')?.value

        if (!accessToken && !refreshToken) {
            return NextResponse.json(
                { error: 'Unauthorized '},
                {status: 401}
            )
        }

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
    }
}