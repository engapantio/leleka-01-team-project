import type { DiaryEntry } from '@/types/diary';
import { nextServer } from './api';

/**
 * Payload для створення / оновлення запису щоденника
 */
export type DiaryEntryRequestPayload = {
  title: string;
  description: string;
  emotions: string[];
  date: string; // YYYY-MM-DD
};

/**
 * Створити новий запис щоденника
 */
export const createDiaryEntry = async (
  payload: DiaryEntryRequestPayload
): Promise<DiaryEntry> => {
  const res = await nextServer.post<DiaryEntry>('/diaries', payload);
  return res.data;
};

/**
 * Оновити існуючий запис щоденника
 */
export const updateDiaryEntry = async (
  entryId: string,
  payload: Partial<DiaryEntryRequestPayload>
): Promise<DiaryEntry> => {
  const res = await nextServer.patch<DiaryEntry>(
    `/diaries/${entryId}`,
    payload
  );
  return res.data;
};
