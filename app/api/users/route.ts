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

        const body = await request.json()
        
        const response = await backendApi.patch('/users', body, {
              headers: {
                Cookie: cookieStore.toString()
                }  
            }
                
        )
            return NextResponse.json({data: response.data, success: true}, {status: 200})
    } catch (error){
        console.error(error)
        return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
        );
    }
}