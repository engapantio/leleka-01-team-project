import { nextServer } from './api';
import { DiaryEntry } from '../../types/diary';
import { User, editProfileData } from '@/types/user';
import { FetchDiaryEntriesResponse } from './serverApi';
import { JourneyBaby, JourneyMom, FullWeekData } from '@/types/journey';
import { FormValuesForBackend } from '@/components/ProfileEditForm/ProfileEditForm';

export interface RegistrationDetails {
  name: string;
  email: string;
  password: string;
}

export interface LoginDetails {
  email: string;
  password: string;
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
export const checkSession = async () => {
  const response = await nextServer.get('/auth/check');
  return response.data.success;
};

/**
 * Get user
 */
export const getUser = async () => {
  const { data } = await nextServer.get<User>('users/current');
  return data;
};

export const editProfile = async (data: editProfileData): Promise<User> => {
  const response = await nextServer.patch<User>('/users', data);
  return response.data;
};

// Journey //

export const getCurrentWeek = async (): Promise<FullWeekData> => {
  const response = await nextServer.get<FullWeekData>('/weeks/current');
  return response.data;
};

export const getCurrentWeekPublic = async (): Promise<FullWeekData> => {
  const { data } = await nextServer.get<FullWeekData>('/weeks/1');
  return data;
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
  const res = await nextServer.delete<DiaryEntry>(`/diaries/${entryId}`);
  return res.data;
};

//<=================diary==========================

//=================profile=========================

export const updateProfile = async (data: FormValuesForBackend) => {
  const response = await nextServer.patch<User>('/users', data);
  return response.data;
};

export const uploadAvatar = async (avatarFile: FormData) => {
  const res = await nextServer.patch('/users/avatar', avatarFile);
  return res.data;
};
