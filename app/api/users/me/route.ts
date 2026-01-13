import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { backendApi } from '../../api';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();

    // Отримуємо токени з кукі
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken && !refreshToken) {
      // Якщо немає жодного токена — відразу 401
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Формуємо заголовок Cookie для бекенду
    const cookieHeader = cookieStore.getAll()
      .map(c => `${c.name}=${c.value}`)
      .join('; ');

    // Запит до бекенду для отримання користувача
    const res = await backendApi.get('users/current', {
      headers: { Cookie: cookieHeader }
    });

    return NextResponse.json(res.data);

  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
