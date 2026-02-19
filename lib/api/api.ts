// lib/api/api.ts

import axios, { AxiosError } from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Include cookies in requests
});

export type ApiError = AxiosError<{
  error: string;
}>;
