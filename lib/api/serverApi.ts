import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User, editProfileData } from '@/types/user';
import { JourneyBaby, JourneyMom } from '@/types/journey';
import { DiaryEntry } from '@/types/diary';
import { FullWeekData } from '@/types/journey';

/**
 * Refresh tokens
 */
export const checkSession = async () => {
  const cookiesStore = await cookies();
  const response = await nextServer.get('/auth/check', {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });
  return response.data.success;
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
  const cookieStore = cookies();
  const res = await nextServer.get<FetchDiaryEntriesResponse>('/diaries', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data.entries;
};

export const fetchDiaryEntryById = async (entryId: string): Promise<DiaryEntry> => {
  const cookieStore = cookies();

  const res = await nextServer.get<DiaryEntry>(`/diary/${entryId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

//<=================diary==========================
