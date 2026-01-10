import { nextServer } from './api';
import { User } from '@/types/user';

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
  const response = await nextServer.post<{ user: User }>('/auth/register', registrationDetails);
  return response.data.user;
};

export const login = async (loginDetails: LoginDetails) => {
  const response = await nextServer.post<{ user: User }>('/auth/login', loginDetails);
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>('users/current');
  return response.data.success;
};
