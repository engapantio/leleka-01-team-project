// lib/api/api.ts

import axios, { AxiosError } from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export type ApiError = AxiosError<{
  error: string;
}>;

export type Emotion = {
  id: string;
  title: string;
}

export type DiaryEntry = {
  id: string;
  userId: string;
  title: string;
  description: string;
    date: string;
  emotions: Emotion[];
  createdAt: string;
  updatedAt: string;
}