import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Tab, JourneyBaby, JourneyMom } from '@/types/journey';
import { DiaryEntry } from '@/types/diary';

export const checkSession = async () => {
  const cookiesStore = await cookies();
  const response = await nextServer.get('users/current', {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });
  return response;
};

// Journey //
export const getCurrentWeek = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get<{ weekNumber: number }>('/weeks/current', {
       headers: {
      Cookie: cookieStore.toString(),
    },
    });
  return response.data.weekNumber;
};

export const getJourneyByWeekAndTab = async (
  weekNumber: number,
  tab: Tab
) => {
    const cookieStore = await cookies();

  const response = await nextServer.get<JourneyBaby | JourneyMom>(
    `/weeks/${weekNumber}/${tab}`, {
       headers: {
      Cookie: cookieStore.toString(),
    },
    }
  );
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

//<=================diary==========================lfd
