import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { AxiosError } from 'axios';
import { nextServer } from './api';
import { backendApi } from '@/app/api/api';
import { User, editProfileData } from '@/types/user';
import { JourneyBaby, JourneyMom } from '@/types/journey';
import { DiaryEntry } from '@/types/diary';
import { FullWeekData } from '@/types/journey';

/**
 * Refresh tokens
 * This function inlines the logic from /api/auth/check to avoid HTTP calls
 */
export const checkSession = async () => {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get('accessToken')?.value;
  const refreshToken = cookiesStore.get('refreshToken')?.value;

  // If access token exists, session is valid
  if (accessToken) {
    return {
      data: { success: true },
      headers: {},
    };
  }

  // If refresh token exists, try to refresh
  if (refreshToken) {
    try {
      const apiRes = await backendApi.post('auth/refresh', {
        refreshToken,
      });
      
      const setCookie = apiRes.headers['set-cookie'];
      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };
          if (parsed.accessToken) {
            cookiesStore.set('accessToken', parsed.accessToken, options);
          }
          if (parsed.refreshToken) {
            cookiesStore.set('refreshToken', parsed.refreshToken, options);
          }
        }
        return {
          data: { success: true },
          headers: {},
        };
      }
    } catch (error) {
      // If refresh token is invalid or expired (401/403), return failure instead of throwing
      // This allows proxy.ts to handle it gracefully (redirect to login)
      if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
        console.log('Refresh token invalid or expired');
        return {
          data: { success: false },
          headers: {},
        };
      }
      // For other errors, log and rethrow
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  // No tokens available
  return {
    data: { success: false },
    headers: {},
  };
};

/**
 * Get user
 */
export const getUser = async () => {
  const cookiesStore = await cookies();
  const { data } = await nextServer.get<User>('users/current', {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });
  return data;
};

/**
 * Edit user
 */

export const editProfile = async (data: editProfileData) => {
  const cookieStore = await cookies();
  const res = await nextServer.patch('/users', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

// Journey //
export const getCurrentWeek = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get<{ weekNumber: number }>('weeks/current', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getCurrentWeekPublic = async (): Promise<FullWeekData> => {
  const { data } = await nextServer.get<FullWeekData>('/weeks/1');
  return data;
};

export const getBabyState = async (weekNumber: number) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<JourneyBaby>(`weeks/${weekNumber}/baby`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const getMomState = async (weekNumber: number) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<JourneyMom>(`weeks/${weekNumber}/mom`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

//=================diary==========================>
export interface FetchDiaryEntriesResponse {
  entries: DiaryEntry[];
}

export const fetchDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<FetchDiaryEntriesResponse>('/diaries', {
    headers: {
      Cookie: cookieStore.toString(),
      
    },
  });
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

  return res.data.entries;
};

export const fetchDiaryEntryById = async (entryId: string): Promise<DiaryEntry> => {
  const cookieStore = cookies();

  const res = await nextServer.get<DiaryEntry>(`/diaries/${entryId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

//<=================diary==========================