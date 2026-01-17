import { cookies } from "next/headers"
import { backendApi } from "../../api"
import { NextResponse } from "next/server"

export async function PATCH(request: Request) {
    const cookiesStore = await cookies()

    const accessToken = cookiesStore.get('accessToken')?.value

    if (!accessToken) {
        return NextResponse.json(
            { error: 'Unauthorizate' },
            {status: 401}
        )
    }
    const formData = await request.formData()
    const avatarFile = formData.get('avatar') as File

    // навіщо перевірка?
    if (!avatarFile) {
      return NextResponse.json(
        { error: "Avatar file is required" },
        { status: 400 }
      );
    }

    const response = await backendApi.patch('/users/avatar', formData, {
        headers: {

            // "Content-Type": "multipart/form-data",
            Cookie: cookiesStore.toString()
        }

    })
    const avatarUrl = response.data

    if (!avatarUrl) {
      return NextResponse.json(
        { error: "Failed to get avatar URL from backend" },
        { status: 500 }
      );
    }
    return NextResponse.json({ avatarUrl }, { status: 200 });
}