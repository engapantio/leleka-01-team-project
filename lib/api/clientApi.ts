import { nextServer } from './api';
import { DiaryEntry } from '../../types/diary';
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

export const editProfile = async (formData: FormData): Promise<User> => {
  const response = await nextServer.patch<User>('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Journey //

import { Tab, JourneyBaby, JourneyMom } from '@/types/journey';

export const getCurrentWeek = async () => {
  const response = await nextServer.get<{ weekNumber: number }>('/weeks/current');
  return response.data.weekNumber;
};

export const getJourneyByWeekAndTab = async (weekNumber: number, tab: Tab) => {
  const response = await nextServer.get<JourneyBaby | JourneyMom>(`/weeks/${weekNumber}/${tab}`);
  return response.data;
};

//=================diary==========================>

export const fetchDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const { data } = await nextServer.get<FetchDiaryEntriesResponse>('/diaries');
  return data.entries;
};

export const fetchDiaryEntryById = async (entryId: string): Promise<DiaryEntry> => {
  const { data } = await nextServer.get<DiaryEntry>(`/diaries/${entryId}`);
  return data;
};

export const deleteDiaryEntryById = async (entryId: string): Promise<DiaryEntry> => {
  const res = await nextServer.delete<DiaryEntry>(`/diary/${entryId}`);
  return res.data;
};

export const createDiaryEntry = async (
  title: string,
  description: string,
  emotions: string[]
): Promise<DiaryEntry> => {
  const res = await nextServer.post<DiaryEntry>('/diary', {
    title,
    description,
    emotions,
  });
  return res.data;
};
//<=================diary==========================
