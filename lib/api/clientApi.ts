import { nextServer } from './api';
import { DiaryEntry } from '../../types/diary';
import { User } from '@/types/user';
import { FetchDiaryEntriesResponse } from './serverApi';
import { JourneyBaby, JourneyMom } from '@/types/journey';

export interface RegistrationDetails {
  name: string;
  email: string;
  password: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface RefreshTokensResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Register - sends to /api/auth/register which proxies to backend
 * Backend sends tokens in Set-Cookie headers
 * Frontend gets user from response body
 */
export const register = async (registrationDetails: RegistrationDetails) => {
  const response = await nextServer.post<User>('/auth/register', registrationDetails);
  return response.data;
};

/**
 * Login - sends to /api/auth/login which proxies to backend
 * Backend sends tokens in Set-Cookie headers
 * Frontend gets user from response body
 */
export const login = async (loginDetails: LoginDetails) => {
  const response = await nextServer.post<User>('/auth/login', loginDetails);
  return response.data;
};

/**
 * Logout - clears cookies on backend
 */
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

/**
 * Refresh tokens
 */
export const refreshTokens = async (refreshToken: string) => {
  const response = await nextServer.post('/auth/refresh', { refreshToken });
  return response;
};

/**
 * Get user
 */
export const getUser = async () => {
  const response = await nextServer.get<User>('users/current');
  return { status: response.status, user: response.data };
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

export const getCurrentWeek = async (): Promise<number> => {
  const response = await nextServer.get<{ weekNumber: number }>('/weeks/current');
  return response.data.weekNumber;
};

export const getBabyState = async (weekNumber: number): Promise<JourneyBaby> => {
  const response = await nextServer.get<JourneyBaby>(`/weeks/${weekNumber}/baby`);
  return response.data;
};

export const getMomState = async (weekNumber: number): Promise<JourneyMom> => {
  const response = await nextServer.get<JourneyMom>(`/weeks/${weekNumber}/mom`);
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
}
//<=================diary==========================


//=================profile=========================
interface UserRes {
  id: string
  name: string,
  email: string,
  gender: string,
  dueDate: string
  avatarUrl: string,
}

interface FormValuesForBackend {
    name: string
    gender: "boy" | "girl" | ""
    dueDate: string
}
export const updateProfile = async (data: FormValuesForBackend) => {
  const response = await nextServer.patch<UserRes>('/users', data)
  return (
    response.data
  )
}

export const uploadAvatar = async (avatarFile: FormData ) => {
  const res = await nextServer.patch('/users/avatar', avatarFile)
  return (
    res.data
  )
}