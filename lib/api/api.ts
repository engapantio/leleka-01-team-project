// lib/api/api.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Include cookies in requests
});

// Request interceptor - Add Authorization header from cookies
nextServer.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Cookies are automatically included with withCredentials: true
    // No need to manually add Authorization header here
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor - Handle 401 errors
nextServer.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = false;

    //   try {
    //     // Try to refresh token
    //     // Backend will set new cookies via Set-Cookie header
    //     await nextServer.post('/auth/refresh', null);

    //     // Retry original request with new token (in cookies)
    //     return nextServer(originalRequest);
    //   } catch (refreshError) {
    //     // Refresh failed, redirect to login
    //     if (typeof window !== 'undefined') {
    //       window.location.href = '/auth/login';
    //     }
    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
  }
);

export type ApiError = AxiosError<{
  error: string;
}>;
