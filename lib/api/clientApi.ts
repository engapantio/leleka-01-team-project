import { nextServer } from './api';
import { User } from '@/types/user';

export interface LoginDetails {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

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
  const response = await nextServer.patch<User>('/users/current', formData, {
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

export const getJourneyByWeekAndTab = async (
  weekNumber: number,
  tab: Tab
) => {
  const response = await nextServer.get<JourneyBaby | JourneyMom>(
    `/weeks/${weekNumber}/${tab}`
  );
  return response.data;
};