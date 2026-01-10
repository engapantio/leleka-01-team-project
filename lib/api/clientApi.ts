import { DiaryEntry, nextServer } from './api';
import { User } from '@/types/user';
import { FetchDiaryEntriesResponse } from './serverApi';

export interface RegistrationDetails {
  name: string;
  email: string;
  password: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export const register = async (registrationDetails: RegistrationDetails) => {
  const response = await nextServer.post<User>('/auth/register', registrationDetails);
  return response.data;
};

export const login = async (loginDetails: LoginDetails) => {
  const response = await nextServer.post<User>('/auth/login', loginDetails);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>('users/current');
  return response.data.success;
};


// Journey //

import { Tab, JourneyBaby, JourneyMom } from '@/types/journey';

export const getCurrentWeek = async () => {
  const response = await nextServer.get<{ weekNumber: number }>('/weeks/current');
  return response.data.weekNumber;
};

export const getJourneyByWeekAndTab = async (
  weekNumber: number,
  tab: Tab
) => {
  const response = await nextServer.get<JourneyBaby | JourneyMom>(
    `/weeks/${weekNumber}/${tab}`
  );
  return response.data;
};

//=================diary==========================>

export const fetchDiaryEntries = async (token: string): Promise<DiaryEntry[]> => {
  const res = await fetch("/api/diaries", {
    headers: {
      Authorization: `Bearer ${token}`
    }
});
if (!res.ok) {
  throw new Error("Не вдалося завантажити записи");
}
const data: FetchDiaryEntriesResponse = await res.json();
return data.entries;
};

export const fetchDiaryEntryById = async (token: string, entryId: string): Promise<DiaryEntry> => {
  const res = await fetch(`/api/diaries/${entryId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
});
  if (!res.ok) {
  throw new Error("Не вдалося завантажити записи");
  }
  return res.json();
}

export const deleteDiaryEntryById = async (token: string, entryId: string): Promise<DiaryEntry> => {
  const res = await nextServer.delete<DiaryEntry>(`/diary/${entryId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
});
  return res.data;
}

export const createDiaryEntry = async (token: string, title: string,
  description: string,
  emotions: string[]
): Promise<DiaryEntry> => {
  const res = await nextServer.post<DiaryEntry>("/diary", {
    title,
    description,
    emotions
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
});
  return res.data;
}
//<=================diary==========================